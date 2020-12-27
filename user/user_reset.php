<?php

session_start();
$session_name =(isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email =(isset($_SESSION['email']))?$_SESSION['email']:'';
require_once '../login-register/connection.php';

if($_POST['field'] == "user_form"){
    
    if($_POST['newusername'] == $_POST['confusername']){
        try{
            $sqlQuery = "UPDATE user SET username = ? WHERE email = ?";
            $stmt = $con -> prepare($sqlQuery);
            $stmt->bind_param("ss",  $_POST['newusername'], $session_email);
            $rv = $stmt->execute();
            if($rv){
                $_SESSION['username'] = $_POST['newusername'];
                $_SESSION['message'] = "Username updated successfully";
                header('location: user_home.php');
                exit();
            }

        }catch(Exception $e) {
            echo $sql . "<br>" . $e->getMessage();
        }
    }
}else{
    
    try{
        $sqlQuery = "SELECT password FROM user WHERE email = ?";
        $stmt = $con -> prepare($sqlQuery);
        $stmt->bind_param("s", $session_email);
        $rv = $stmt->execute();
        $stmt->store_result();
        
        
        if(!$rv){
            $_SESSION['message'] = "Something went wrong";
            header('location: user_reset_credentials.php');
            exit();
        }
        if($stmt->num_rows > 0){
            
            $stmt->bind_result($temp_password);
            $stmt->fetch();
            
            if(password_verify($_POST['oldpassword'], $temp_password)){

                $pass_length = strlen($_POST['newpassword']);
                $at_least_one_Uppercase = preg_match("#[A-Z]+#", $_POST['newpassword'] );
                $at_least_one_number = preg_match("#[0-9]+#", $_POST['newpassword'] );
                $at_least_one_special = preg_match("#\W+#", $_POST['newpassword'] ); 
                
                if($at_least_one_Uppercase && $at_least_one_number && $at_least_one_special && $pass_length >= 8 && $_POST['newpassword'] == $_POST['confpassword']){
        
                    //if there is no other user with same credentials and password is ok insert new user
                    try{
                        $sqlQuery = "UPDATE user SET password = ? WHERE email = ?";
                        $stmt = $con -> prepare($sqlQuery);
                        $stmt->bind_param("ss",  password_hash($_POST['newpassword'], PASSWORD_BCRYPT), $session_email);
                        $rv = $stmt->execute();
                        if($rv){
                            $_SESSION['message'] = "Password updated successfully";
                            header('location: user_home.php');
                            exit();
                        }
                    }
                    catch(Exception $e) {
                        echo $sql . "<br>" . $e->getMessage();
                    }
                }else{
                    $_SESSION['message'] = "Password must conatin at least 8 characters one Capital, one number and one special character and must be equal to Confirm Password!";
                    header('location: user_reset_credentials.php');
                    exit();
                }
            }else{
                $_SESSION['message'] = "Old password is wrong!";
                header('location: user_reset_credentials.php');
                exit();
            }
        }

    }catch(Exception $e) {
        echo $sql . "<br>" . $e->getMessage();
    }
    
}


?>