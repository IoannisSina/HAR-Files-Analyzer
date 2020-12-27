<?php 

session_start();
$session_name =(isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email =(isset($_SESSION['email']))?$_SESSION['email']:'';
if(isset($_SESSION['message'])){
    $session_message = $_SESSION['message'];
    unset($_SESSION['message']);
} else $session_message = "";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Reset credentials</title>
    <link rel="stylesheet" href="user_reset_credentials.css">
    <script type="text/javascript">
        var session_message = '<?php echo $session_message;?>';
    </script>
    <script type="text/javascript" src="user_reset_credentials.js" defer></script>
</head>

<body>
    <div class="reset">
        <h1 class="blinking">Reset Username</h1>
        <form name="user_form" onsubmit="return check_usernames(this);" action="user_reset.php" method="post">
            <input class = "form" type="text" id="newusername" name="newusername"  placeholder="New Username" required><br>
            <input class = "form" type="text" id="confusername" name="confusername"  placeholder="Confirm Username" required><br>
            <input class = "buttons" type="submit" name="resetusername" value="Save Changes" class="btn btn-info">
            <input type="hidden" name="field" value="user_form"/>
        </form>
        <p class="message" id="message1"></p>
    </div>
    <div class="reset" id="pass_div">
        <h1 class="blinking">Reset Password</h1>
        <form name="password_form" onsubmit="return check_passwords(this);" action="user_reset.php" method="post">
            <input class = "form" type="password" id="oldpassword" name="oldpassword"  placeholder="Old password" required><br>
            <input class = "form" type="password" id="newpassword" name="newpassword"  placeholder="New password" required><br>
            <input class = "form" type="password" id="confpassword" name="confpassword"  placeholder="Confirm password" required><br>
            <input class = "buttons" type="submit" name="resetpassword" value="Save Changes" class="btn btn-info">
            <input type="hidden" name="field" value="password_form"/>
        </form>
        <p class="message" id="message2"></p>
    </div>
</body>

</html>