const welcome_message = document.getElementById('welcome_message');
const submit_btn = document.getElementById('submit');
const file_selector = document.getElementById('har_selector');
var selected_file = null;

welcome_message.innerHTML = "Welcome " + session_username;

function check_extension(f_name) {
    let arr = f_name.split(".");
    if (arr[arr.length - 1] == "har") return true;
    return false;
}

//When user chooses a file
file_selector.addEventListener('change', (event) => {
    selected_file = event.target.files;
    if (check_extension(selected_file[0]['name']))
    document.getElementById('selected_file_name').innerHTML = selected_file[0]['name'];
    else
        alert("Please select a HAR file!");
});

//clean request and response headers
function clean_headers(hdrs){
    let header_fields = ["content-type", "cache-control", "pragma", "expires", "age", "last-modified", "host"];
    let temp_hdr = []
    hdrs.forEach(element => {if(header_fields.includes(element['name'])) temp_hdr.push(element);});
    return temp_hdr;
}

//keep only domain from URL
function keep_domain(url){
    let arr = url.split("/");
    return arr[2];
}

function clean_har(obj) {
    //obj[0]['response']['headers'] = obj['response']['headers'].map(({age, expires, host}) => ({age, expires, host}));
    obj = obj.map(({startedDateTime, timings, serverIPAddress, request, response}) => ({startedDateTime, timings, serverIPAddress, request, response}));
    obj = obj.map(function(element){
        element['timings'] = {"wait": element['timings']['wait']};
        element['request'] = {"method": element['request']['method'], "url": keep_domain(element['request']['url']), "headers": element['request']['headers']};
        element['response'] = {"status": element['response']['status'], "statusText": element['response']['statusText'], "headers": element['response']['headers']}
        //clean headers of request and response with function
        element['request']['headers'] = clean_headers(element['request']['headers']);
        element['response']['headers'] = clean_headers(element['response']['headers']);
        keep_domain(element['request']['url'])
        return element;
    });
    return obj;
    // let cleand_entries = [];
    // for (let i = 0; i < obj.length; i++) {

    //     let temp_entry = {};
    //     temp_entry['timings'] = {};
    //     temp_entry['request'] = {};
    //     temp_entry['request']['headers'] = [];
    //     temp_entry['response'] = {}
    //     temp_entry['response']['headers'] = {}
    //     temp_entry['startedDateTime'] = obj[i]['startedDateTime'];
    //     temp_entry['serverIPAddress'] = obj[i]['serverIPAddress'];
    //     temp_entry['timings']['wait'] = obj[i]['timings']['wait'];
    //     temp_entry['request']['method'] = obj[i]['request']['method'];
    //     temp_entry['request']['url'] = obj[i]['request']['url'];
    //     cleand_entries.push(temp_entry);
    // }
    // return cleand_entries;
};

submit_btn.onclick = function() {
    //read HAR file as txt
    if (selected_file) {
        var file_name = selected_file[0]['name'];
        if (check_extension(file_name)) {
            var reader = new FileReader();
            reader.readAsText(selected_file[0], "UTF-8");
            //Read as txt
            reader.onload = function(evt) {
                //JSON to clean HAR file
                var obj = JSON.parse(evt.target.result);
                var cleaned_obj = clean_har(obj['log']['entries']);
                console.log(cleaned_obj);
            }
            reader.onerror = function(evt) {
                document.getElementById("selected_file_name").innerHTML = "error reading file";
            }
        } else {
            //file is not har
            alert("Select a HAR file!");
        }
    } else {
        // if no file is selected or its not har
        alert("Please select a file!");
    }
}