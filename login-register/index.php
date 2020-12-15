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
    <title>Login</title>
    <link rel="stylesheet" href="./login.css">
    <script type="text/javascript">
    var session_message = '<?php echo $session_mess;?>';
    </script>
    <script src="login.js" defer></script>
</head>

<body>
    <div class="login">
        <h1 class="blinking">Login</h1>
        <p id="message"></p>
        <form action="login.php" method="post">
            <input type="text" id="username" name="username" placeholder="Username" class="form-group" required><br>
            <input type="password" name="password" placeholder="Password" id="Password" class="form-group" required>
            <input type="submit" class="buttons" value="Login">
        </form>

        <form id="reg_form" action="register_page.php">
            <input type="submit" class="buttons" value="Register">
        </form>
        <label id="show_pass_label" for="User">Show password</label>
        <input type="checkbox" onclick="showpass()">

    </div>
</body>

</html>