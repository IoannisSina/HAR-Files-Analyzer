<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';

$files_get = file_get_contents("php://input");
$data = json_decode($files_get, true);


// $sql = "SELECT * FROM headers WHERE name IN ('$content_types')";

//echo "$sql";

$content_types = join("','",$data[0]);
$days = join("','",$data[1]);
$method = join("','",$data[2]);
$isps = join("','",$data[3]);

$to_return = array();
try{
    
    $sql = "SELECT AVG(timings_wait) AS timings, HOUR(startedDateTime) as hour FROM entries INNER JOIN headers ON entries.id = headers.entry_id WHERE DAYNAME(startedDateTime) IN ('$days') AND request_method IN ('$method') AND isp IN ('$isps') AND headers.name = 'content-type' AND headers.value IN ('$content_types') GROUP BY hour";
    // SQL query for isps and Content types
    $result = $con->query($sql);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){
       $temp = array();
        while($row = $result->fetch_assoc()) {
            
            $temp[$row['hour']] = $row['timings'];
        }
    }
}
catch(Exception $e) {
    echo "Query failed";
}


for ($i = 0; $i <= 24; $i++) {
    if(isset($temp[$i])) $to_return[] = round($temp[$i], 6);
    else $to_return[] = 0;
}

echo json_encode($to_return);
mysqli_close($con);


?>