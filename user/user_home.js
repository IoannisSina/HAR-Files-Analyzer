const welcome_message = document.getElementById('welcome_message');
const submit_btn = document.getElementById('submit');
const file_selector = document.getElementById('har_selector');
var selected_file = null;


welcome_message.innerHTML = "Welcome " + session_username;

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


function user_ip() {
    //get user's IP and info we need
    let user_info = "";
    const xml_user_info = new XMLHttpRequest();
    xml_user_info.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            user_info = JSON.parse(this.responseText);
        }
    }
    xml_user_info.open("GET", "http://ip-api.com/json/?fields=status,lat,lon,city,country,isp", false);
    xml_user_info.send(null);

    return user_info;
};

function servers_ips(cleaned_entries) {

    const xml_servers_info = new XMLHttpRequest();
    let seen_ips = [];
    //Get unique ip of all servers in the HAR file
    cleaned_entries.map(function(element) {

        //clean ip from [,] to save it to the database without them
        element['serverIPAddress'] = element['serverIPAddress'].replace("[", "").replace("]", "");

        //keep distinct cleaned IPS in order to send less requests tp the API
        let cleaned_ip = clean_ip(element['serverIPAddress']);
        if (!seen_ips.includes(cleaned_ip) && cleaned_ip != "") seen_ips.push(cleaned_ip);
    });

    let dict_response = {};
    //prepare ips for request to API one request for 100 Ips
    let endpoint = "http://ip-api.com/batch?fields=query,lat,lon";
    xml_servers_info.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Result array
            let response = JSON.parse(this.responseText);
            //for every entry of the batch push lat lon
            for (let i = 0; i < response.length; i++) {
                let temp = [];
                temp.push(response[i]['lat']);
                temp.push(response[i]['lon']);
                //dict_response[seen_ips[i]] = temp;
                dict_response[clean_ip(response[i]['query'])] = temp;
            }
        }
    };

    //check if length < 100
    if (seen_ips.length > 100) {
        let split = []
        let i = 0;
        while (i < seen_ips.length) {
            split.push(seen_ips[i]);
            if (split.length == 100 || i == seen_ips.length - 1) {
                xml_servers_info.open('POST', endpoint, false);
                let data = JSON.stringify(split);
                xml_servers_info.send(data);
                split = [];
            }
            i++;
        }

    } else {
        xml_servers_info.open('POST', endpoint, false);
        let data = JSON.stringify(seen_ips);
        xml_servers_info.send(data);
    }
    //put coords in cleaned entries
    // console.log("Entries length:" + cleaned_entries.length);
    // console.log("Seen ips length:" + seen_ips.length);
    // let dict_length = Object.keys(dict_response).length;
    // console.log(dict_length);
    cleaned_entries.map(element => element['coords'] = dict_response[clean_ip(element['serverIPAddress'])]);
    return cleaned_entries;
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
                        const xml_to_send = new XMLHttpRequest();
                        //set users_info with info from request
                        let user_info = user_ip();
                        //set serves_info with info from request
                        let servers_info = servers_ips(cleaned_obj);
                        console.log(servers_info[0]);
                        //merge info to send
                        let to_send = [];
                        to_send.push(user_info);
                        to_send.push(servers_info);

                        xml_to_send.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                // Result array
                                console.log("Status: " + this.responseText);
                            }
                        };

                        xml_to_send.open("POST", "http://localhost/project_web/user/user.php");
                        xml_to_send.setRequestHeader("Content-type", "application/json");
                        xml_to_send.send(JSON.stringify(to_send));

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