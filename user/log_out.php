<?php
    session_start();
    if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] == TRUE){
        session_unset(); 
        session_destroy();
        header('location: ../login-register/index.php');
        exit();
    }
?>