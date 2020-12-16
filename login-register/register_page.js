var reg_pass = document.getElementById('pass');
var conf_pass = document.getElementById('confpass');
var message_field = document.getElementById('message');
var is_pass_ok = false; 

if (session_message != "") message_field.innerHTML = session_message;

//runs everytime user changes register_password field
reg_pass.onkeyup = function() {
    var upperCaseLetters = /[A-Z]/g; //at_least_one_UPPERCASE
    var numbers = /[0-9]/g; //at_least_one_NUMBER
    var special = /\W|_/g; //at_least_one_special_character
    reg_pass.style.backgroundColor = 'red';
    if (reg_pass.value.length >= 8 && reg_pass.value.match(upperCaseLetters) && reg_pass.value.match(numbers) && reg_pass.value.match(special)) {
        reg_pass.style.backgroundColor = 'green';
        is_pass_ok = true;
    } else is_pass_ok = false;
}

//runs everytime user changes register_password_confirmation field
conf_pass.onkeyup = function() {
    conf_pass.style.backgroundColor = 'red';
    if (reg_pass.value == conf_pass.value) conf_pass.style.backgroundColor = "green";
}

//submit if password and conf password match
function check_passwords(register_form) {

    if (register_form['password'].value == register_form['confirm_password'].value && is_pass_ok) {
        return true;
    }
    else{
        if(!is_pass_ok) message_field.innerHTML = "Password must conatin at least 8 characters, one Capital, one number and one special character";
        else message_field.innerHTML = "Confirmation password must be the same as the Password";
        return false;
    }
}