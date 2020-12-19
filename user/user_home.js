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
        keep_domain(element['request']['url'])
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

// function prepared_info(cleaned_entries) {

//     let seen_ips = [];

//     cleaned_entries.forEach(element => { element['serverIPAddress'] = element['serverIPAddress'].split("::")[0] + "::" })
//     cleaned_entries.forEach(element => { if (!seen_ips.includes(element['serverIPAddress'])) seen_ips.push(element['serverIPAddress']) });
//     console.log(seen_ips);

// };


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
                    } else {
                        var xml_ips_info = new XMLHttpRequest();
                        xml_ips_info.open("GET", "http://ip-api.com/json/?fields=status,lat,lon,city,country,isp");
                        xml_ips_info.send(null);
                        xml_ips_info.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    let response = JSON.parse(this.responseText);
                                    console.log(cleaned_obj);
                                    console.log(response);
                                }
                            }
                            // xml_ips_info.onreadystatechange = function() {
                            //     if (this.readyState == 4 && this.status == 200) {
                            //         var response = JSON.parse(this.responseText);
                            //         if (response.status == 'success') {
                            //             //send XMLHttpRequest to php file in oreder to insert HAR
                            //             const xml = new XMLHttpRequest();
                            //             // xml.onreadystatechange = function() { if (xml.readyState == 4 && xml.status == 200) console.log(xml.responseText); };
                            //             xml.open("POST", "http://localhost/project_web/user/user.php");
                            //             xml.setRequestHeader("Content-type", "application/json");
                            //             xml.send(stringed_json);
                            //         } else alert("Response failed!");

                        //     } else alert("Request failed!");
                        // }

                        //Sending request with no IP argument, by default, it returns info for sender's IP
                        //So the response contains the IP adress of the user

                        // let result = JSON.parse(xml_ips_info.responseText);

                    }
                } catch (error) {
                    // alert("Your file's format is not supported!");
                    alert(error);
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