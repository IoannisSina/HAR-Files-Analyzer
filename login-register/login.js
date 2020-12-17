//show message after register or fail login
const message_field = document.getElementById("message");
message_field.innerHTML = session_message;
if (session_message == "Account created!") message_field.style.color = "green";

function showpass() {
    let x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}