//show message after register or fail login
var message_field = document.getElementById("message");
message_field.innerHTML = session_message;
if (session_message == "Account created!") message_field.style.color = "green";

function showpass() {
    var x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}