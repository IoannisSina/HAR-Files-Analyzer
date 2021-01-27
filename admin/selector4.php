<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';
$temp = array();
$emails = array();
$final = array();
try{
    // SQL query for user emails
    $user_emails = "SELECT email FROM user WHERE property = 'USER'";
    $result = $con->query($user_emails);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()) {

            $emails[] = $row["email"];
            
        }
    }
    //SQL query for the IP Requests
    //first email
    $mail = '"'.$emails[0].'"';
    $user_request = "(SELECT email, COUNT(serverIPAddress) as count, serverIPAddress as SIP, latitude, longitude, user.username as usr, upload_latitude, upload_longitude 
    FROM entries INNER JOIN user on user_email = user.email WHERE user_email = ".$mail." AND latitude is not null GROUP BY serverIPAddress)";
    for($i = 1; $i < count($emails) ; $i++){
        $mail = '"'.$emails[$i].'"';
        
        $user_request .=  " UNION (SELECT email, COUNT(serverIPAddress) as count, serverIPAddress as SIP, latitude, longitude, user.username as usr, upload_latitude, upload_longitude 
        FROM entries INNER JOIN user on user_email = user.email WHERE user_email = ".$mail." AND latitude is not null GROUP BY serverIPAddress)";
    }
    
    
    $result = $con->query($user_request);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()) {
            $final[] = $row;
        }
    }
}
catch(Exception $e) {
    echo "Query failed";
}

echo json_encode($final);
mysqli_close($con);


?>