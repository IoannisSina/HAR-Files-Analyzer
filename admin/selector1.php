<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';

$files_get = file_get_contents("php://input");
$data = json_decode($files_get, true);


$labels = array();
$values = array();
$label = "";
//CASE FOR 1.A 1.b 1.c 1.d 1.e 1.f// 
switch ($data) {

    case "users":
        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_user = "SELECT count(*) FROM user WHERE property='user'";
            $result = $con->query($query_user);
            $number_of_users = (int)$result->fetch_assoc()["count(*)"];
            if(!$result) throw new Exception();
        }
        catch(Exception $e) {
            echo "Query failed!";
        }
        $labels[] = "Number of users";
        $values[] = $number_of_users;
        $label = "Numbers of users";
        break;

    case "entriestype":

        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_method = "SELECT count(*), request_method FROM entries GROUP BY request_method";
            $result = $con->query($query_method);
            if(!$result) throw new Exception();
            $to_return = array();

            if($result->num_rows > 0){
        
                while($row = $result->fetch_assoc()) {
                    $labels[] = $row['request_method'];
                    $values[] = $row['count(*)'];
                }
            }
        }
        catch(Exception $e) {
            echo "Query failed!";
        }
        $label = "Entries by type";
        
        break;

    case "entriesstatus":

        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_status = "SELECT count(*), response_status FROM entries GROUP BY response_status";
            $result = $con->query($query_status);
            if(!$result) throw new Exception();
            $to_return = array();

            if($result->num_rows > 0){
        
                while($row = $result->fetch_assoc()) {
                    
                    $labels[] = $row['response_status'];
                    $values[] = $row['count(*)'];
                }
            }
        }
        catch(Exception $e) {
            echo "Query failed!";
        }
        $label = "Entries by status";
        break;

    case "domains":

        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_url = "SELECT count(distinct(request_url)) as number FROM entries";
            $result = $con->query($query_url);
            $number_of_url = (int)$result->fetch_assoc()["number"];
            if(!$result) throw new Exception();
        }
        catch(Exception $e) {
            echo "Query failed!";
        }
        $labels[] = "Number of URLs";
        $values[] = $number_of_url;
        $label = "Number of URLs";
        break;

    case "isp":

        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_isp = "SELECT count(distinct(isp)) as number FROM entries";
            $result = $con->query($query_isp);
            $number_of_isp = (int)$result->fetch_assoc()["number"];
            if(!$result) throw new Exception();
        }
            
        catch(Exception $e) {
            echo "Query failed!";
        }
        $labels[] = "Number of Distinct ISP";
        $values[] = $number_of_isp;
        $label = "Number of ISP's";
        break;

    case "age":

        try{
            // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
            $query_age = "SELECT a.value as content_type, AVG(b.value) as average FROM headers AS a INNER JOIN headers AS b ON a.entry_id = b.entry_id WHERE a.name = 'content-type' and b.name = 'age' GROUP BY content_type";
            $result = $con->query($query_age);
            if(!$result) throw new Exception();
            $to_return = array();

            if($result->num_rows > 0){
        
                while($row = $result->fetch_assoc()) {
                    
                    $labels[] = $row['content_type'];
                    $values[] = round ( $row['average'], 2); 
                }
            }
        }
        catch(Exception $e) {
            echo "Query failed!";
        }
        $label = "Average age per content-type";
        break;

}

echo json_encode(array($labels, $values, $label));
mysqli_close($con);
?>