<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

// $data = json_decode($files_get, true);


$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';
$isp_array = array();
$type_array = array();
try{
    // SQL query for isps and Content types
    $query_isps = "SELECT DISTINCT(isp) from entries";
    $result = $con->query($query_isps);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){

        while($row = $result->fetch_assoc()) {
            
            $isp_array[] = $row['isp'];
        }
    }
    //----------------------------------------------------------------------
    $query_types = "SELECT DISTINCT(value) from headers where name = 'content-type'";
    $result = $con->query($query_types);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){

        while($row = $result->fetch_assoc()) {
            
            $type_array[] = $row['value'];
        }
    }
}
catch(Exception $e) {
    echo "Query failed";
}
echo json_encode(array($isp_array, $type_array));


mysqli_close($con);


?>