const new_username = document.getElementById('newusername');
const conf_username = document.getElementById('confusername');
const new_password = document.getElementById('newpassword');
const conf_password = document.getElementById('confpassword');

if (session_message != "") alert(session_message);

conf_password.onkeyup = function() {
    conf_password.style.backgroundColor = 'red';
    document.getElementById("message2").innerHTML = "Confirm Password must be equal to New Password!";
    if (conf_password.value == new_password.value) {
        conf_password.style.backgroundColor = "green";
        document.getElementById("message2").innerHTML = "";
    }
}

new_password.onkeyup = function() {
    new_password.style.backgroundColor = 'red';
    let upperCaseLetters = /[A-Z]/g; //at_least_one_UPPERCASE
    let numbers = /[0-9]/g; //at_least_one_NUMBER
    let special = /\W|_/g; //at_least_one_special_character
    document.getElementById("message2").innerHTML = "Password must conatin at least 8 characters one Capital, one number and one special character!";
    if (new_password.value.length >= 8 && new_password.value.match(upperCaseLetters) && new_password.value.match(numbers) && new_password.value.match(special)) {
        new_password.style.backgroundColor = "green";
        document.getElementById("message2").innerHTML = "";
    }
}

conf_username.onkeyup = function() {
    conf_username.style.backgroundColor = 'red';
    document.getElementById("message1").innerHTML = "Confirm and New Username must be the same!";
    if (conf_username.value == new_username.value) {
        conf_username.style.backgroundColor = "green";
        document.getElementById("message1").innerHTML = "";
    }
}

function check_usernames(user_form) {
    if (user_form['newusername'].value == user_form['confusername'].value) {
        return true;
    }
    document.getElementById("message1").innerHTML = "Confirm and New Username must be the same!";
    return false;
}

function check_passwords(user_form) {

    let upperCaseLetters = /[A-Z]/g; //at_least_one_UPPERCASE
    let numbers = /[0-9]/g; //at_least_one_NUMBER
    let special = /\W|_/g; //at_least_one_special_character
    if (user_form['newpassword'].value.length >= 8 && user_form['newpassword'].value.match(upperCaseLetters) && user_form['newpassword'].value.match(numbers) && user_form['newpassword'].value.match(special) && user_form['newpassword'].value == user_form['confpassword'].value) {
        return true;
    }
    alert("Password must conatin at least 8 characters one Capital, one number and one special character and must be equal to Confirm Password");
    return false;
}