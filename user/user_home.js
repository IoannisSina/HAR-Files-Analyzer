var welcome_message = document.getElementById('welcome_message');
var submit_btn = document.getElementById('submit');
const file_selector = document.getElementById('har_selector');
var selected_file = null;

welcome_message.innerHTML = "Welcome, " + session_username;

function check_extension(f_name) {
    var arr = f_name.split(".");
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

submit_btn.onclick = function() {
    //read HAR file as txt
    if (selected_file) {
        var file_name = selected_file[0]['name'];
        if (check_extension(file_name)) {
            var reader = new FileReader();
            reader.readAsText(selected_file[0], "UTF-8");
            //Read as txt
            reader.onload = function(evt) {
                // console.log(evt.target.result);
                console.log("ok");
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