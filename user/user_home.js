const welcome_message = document.getElementById('welcome_message');
const submit_btn = document.getElementById('submit');
const file_selector = document.getElementById('har_selector');
var selected_file = null;
var dict_response = {};
var number_of_batches = 0;


welcome_message.innerHTML = "Welcome " + session_username;
if (session_message != "") alert(session_message);
if (session_entries_inserted != "") document.getElementById("entries_inserted").innerHTML = "Entries inserted: " + session_entries_inserted;
if (session_last_insertion_date == "") document.getElementById("last_insertion").innerHTML = "Last insertion: There are no insertions";
else document.getElementById("last_insertion").innerHTML = "Last insertion: " + session_last_insertion_date;



function check_extension(f_name) {
    let arr = f_name.split(".");
    if (arr[arr.length - 1] == "har") return true;
    return false;
};

//When user chooses a file
file_selector.addEventListener('change', (event) => {
    selected_file = event.target.files;
    if (check_extension(selected_file[0]['name']))
        document.getElementById('selected_file_name').innerHTML = selected_file[0]['name'];
    else
        alert("Please select a HAR file!");
});

//clean request and response headers
function clean_headers(hdrs) {
    let header_fields = ["content-type", "cache-control", "pragma", "expires", "age", "last-modified", "host"];
    let temp_hdr = []
    hdrs.forEach(element => { if (header_fields.includes(element['name'])) temp_hdr.push(element); });
    return temp_hdr;
};

//keep only domain from URL
//https://www.google.com/ => ['https:', '', 'www.google.com']
function keep_domain(url) {
    let arr = url.split("/");
    return arr[2];
};

function clean_har(obj) {
    obj = obj.map(({ startedDateTime, timings, serverIPAddress, request, response }) => ({ startedDateTime, timings, serverIPAddress, request, response }));
    //keep only non-sensitive
    //for all entries do
    obj = obj.map(function(element) {

        element['timings'] = { "wait": element['timings']['wait'] };
        element['request'] = { "method": element['request']['method'], "url": keep_domain(element['request']['url']), "headers": element['request']['headers'] };
        element['response'] = { "status": element['response']['status'], "statusText": element['response']['statusText'], "headers": element['response']['headers'] };
        //clean headers of request and response with function
        element['request']['headers'] = clean_headers(element['request']['headers']);
        element['response']['headers'] = clean_headers(element['response']['headers']);
        return element;
    });
    return obj;
};

//download HAR if user selects local save
//use 'a' element and 'click' it when sumbit is clicked
function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
};

function clean_ip(ip) {
    //console.log(element['serverIPAddress'].slice(1, element['serverIPAddress'].length - 1));


    //IPV4 case
    if (ip.includes(".")) ip = ip.split(":")[0];
    else {
        if (ip.includes("::")) ip = ip.split("::")[0] + "::";
    }
    return ip;

};

//------------FUNCTIONS FOR INSERTION-----------------------------------
//WARNING: ----------------CALLBACK HELL :( ----------------------------

function user_info(cleaned_entries) {
    //get user's IP and info we need
    const xml_user_info = new XMLHttpRequest();
    xml_user_info.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //call server IPS and pass user_info and cleaned_entries
            servers_ips(JSON.parse(this.responseText), cleaned_entries);
        }
    }
    xml_user_info.open("GET", "http://ip-api.com/json/?fields=status,lat,lon,city,country,isp", true);
    xml_user_info.send(null);
};

function servers_ips(user_resp, cleaned_entries) {

    let seen_ips = [];
    //Get unique ip of all servers in the HAR file
    cleaned_entries.map(function(element) {

        //clean ip from [,] to save it to the database without them
        element['serverIPAddress'] = element['serverIPAddress'].replace("[", "").replace("]", "");

        //keep distinct cleaned IPS in order to send less requests tp the API
        let cleaned_ip = clean_ip(element['serverIPAddress']);
        if (!seen_ips.includes(cleaned_ip) && cleaned_ip != "") seen_ips.push(cleaned_ip);
    });

    let bacthes = Math.ceil(seen_ips.length / 100);
    //check if length < 100
    if (seen_ips.length > 100) {

        let split = []
        let i = 0;
        while (i < seen_ips.length) {
            split.push(seen_ips[i]);
            if (split.length == 100 || i == seen_ips.length - 1) {
                //call send batch for every split
                send_batch(split, cleaned_entries, user_resp, bacthes);
                split = [];
            }
            i++;
        }

    } else {
        //called when initial list's length is under 100
        send_batch(seen_ips, cleaned_entries, user_resp, bacthes);
    }

};

function send_batch(split, cleaned_entries, user_resp, bacthes) {

    //send the request to the API
    const xml_servers_info = new XMLHttpRequest();
    xml_servers_info.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Result array
            push_lat_lng(JSON.parse(this.responseText), cleaned_entries, user_resp, bacthes);
            //for every entry of the batch push lat lon
        }
    };
    let endpoint = "http://ip-api.com/batch?fields=query,lat,lon";
    xml_servers_info.open('POST', endpoint, true);
    let data = JSON.stringify(split);
    xml_servers_info.send(data);
};

function push_lat_lng(resp, cleaned_entries, user_resp, bacthes) {

    number_of_batches++;
    //push lat lng in the global dictionary
    for (let i = 0; i < resp.length; i++) {
        let temp = [];
        temp.push(resp[i]['lat']);
        temp.push(resp[i]['lon']);
        //dict_response[seen_ips[i]] = temp;
        dict_response[clean_ip(resp[i]['query'])] = temp;
    }

    //run when the batch is the last
    if (number_of_batches == bacthes) {
        cleaned_entries.map(element => {
            if (element['serverIPAddress'] == "")
                element['coords'] = ["NULL", "NULL"];
            else
                element['coords'] = dict_response[clean_ip(element['serverIPAddress'])];

        });
        number_of_batches = 0;
        send_to_db(cleaned_entries, user_resp);
    }

};


function send_to_db(cleaned_entries, user_resp) {
    //prepare and send to DB though PHP
    let to_send = [];
    to_send.push(user_resp);
    to_send.push(cleaned_entries);
    to_send.push(session_email);

    const xml_to_send = new XMLHttpRequest();
    xml_to_send.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            update_labels(JSON.parse(this.responseText));
        }
    };

    xml_to_send.open("POST", "http://localhost/project_web/user/user_insert_entries.php", true);
    xml_to_send.setRequestHeader("Content-type", "application/json");
    xml_to_send.send(JSON.stringify(to_send));

};

function update_labels(resp) {
    alert("Successful insertion!");
    document.getElementById("entries_inserted").innerHTML = "Entries inserted: " + resp[0];
    document.getElementById("last_insertion").innerHTML = "Last insertion: " + resp[1];
    //send_request(true);
};




submit_btn.onclick = function() {
    //read HAR file as txt
    if (selected_file) {
        let file_name = selected_file[0]['name'];
        if (check_extension(file_name)) {
            let reader = new FileReader();
            reader.readAsText(selected_file[0], "UTF-8");

            //Read as txt
            reader.onload = function(evt) {
                //JSON to clean HAR file
                let obj = JSON.parse(evt.target.result);
                try {
                    let cleaned_obj = clean_har(obj['log']['entries']);
                    let stringed_json = JSON.stringify(cleaned_obj, null, 3);
                    //if user selects local save of HAR
                    if (document.getElementById('local_save').checked) {
                        //stringify the entries in a 'pretty' way 
                        download(stringed_json, "cleaned_" + file_name, 'text/plain');
                        alert("Your file was cleaned and downloaded successfully");
                        //if user selects to save in database
                    } else {
                        //call function for user info and continue
                        user_info(cleaned_obj);
                    }
                } catch (error) {
                    alert("Your file's format is not supported!");
                }

            }
            reader.onerror = function(evt) {
                alert("Error reading file");
            }
        } else {
            //file is not har
            alert("Select a HAR file!");
        }
    } else {
        // if no file is selected or its not har
        alert("Please select a file!");
    }
};