var reg_pass = document.getElementById('pass');
var conf_pass = document.getElementById('confpass');


reg_pass.onkeyup = function() {
    var upperCaseLetters = /[A-Z]/g; //at_least_one_UPPERCASE
    var numbers = /[0-9]/g; //at_least_one_NUMBER
    var special = /\W|_/g; //at_least_one_special_character
    reg_pass.style.backgroundColor = "red";
    if (reg_pass.value.length >= 8 && reg_pass.value.match(upperCaseLetters) && reg_pass.value.match(numbers) && reg_pass.value.match(special)) {
        reg_pass.style.backgroundColor = "green";
    }
}

conf_pass.onkeyup = function() {
    conf_pass.style.backgroundColor = "red";
    if (reg_pass.value == conf_pass.value) conf_pass.style.backgroundColor = "green";
}


function check_all(register_form) {

    if (register_form['password'].value == register_form['confirm-password'].value) {
        console.log("OK");
        return true;
    } else {
        alert("FAIL");
    }
    return false;
}