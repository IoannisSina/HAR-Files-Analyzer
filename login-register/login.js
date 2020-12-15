//show message after register or fail login
var mess = document.getElementById("message");
mess.innerHTML = session_message;

function showpass() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}