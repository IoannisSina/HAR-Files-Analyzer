<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';

//$kappa1 = $_POST["choices_2"];
//$kappa2 = $_POST["password"];
print_r($_POST);

mysqli_close($con);
?>