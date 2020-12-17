<?php
session_start();
if(isset($_SESSION['message'])){
    $session_mess = $_SESSION['message'];
    unset($_SESSION['message']);
}
else $session_mess = "";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Register</title>
    <link rel="stylesheet" href="register_page.css">
    <script type="text/javascript">
    var session_message = '<?php echo $session_mess;?>';
    </script>
    <script type="text/javascript" src="register_page.js" defer></script>
</head>

<body>
    <div class="register">
        <h1 class="blinking">Register</h1>
        <p id="message" >Provide your information to sign up!</p>
        <!-- onsumbit: run JS chech_all function before submission -->
        <form name="register_form" onsubmit="return check_passwords(this);" action="register.php" method="post">
            <label class="labels">Username:</label>
            <input type="text" id="username" name="username" class="form-group" required>

            <label class="labels">Password:</label>
            <input type="password" id="pass" name="password" class="form-group" required>


            <label class="labels">Confirm Password:</label>
            <input type="password" name="confirm_password" id="confpass" class="form-group" required>

            <label class="labels">Email:</label>
            <input type="email" name="email" class="form-group" required>

            <label class="labels">Property:</label><br>
            <!-- <input type="text" name="property" class="form-group" required> -->
            <div class="form-group">
                <input type="radio" name="property" value="admin" checked>
                <label class="labels" for="Admin">Admin</label><br>
                <input type="radio" name="property" value="user">
                <label class="labels" for="User">User</label><br>
            </div>


            <input type="submit" id="submit" value="Submit">
        </form>
    </div>
</body>

</html>