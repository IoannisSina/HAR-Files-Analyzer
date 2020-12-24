<?php 

require_once '../login-register/connection.php';
$files_get = file_get_contents("php://input");
$data = json_decode($files_get, true);

try{
    $query = "INSERT INTO entries VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $con -> prepare($query);
    //DATA TO INSERT FOR TABLE ENTRIES
    $mail = "johnsina304@yahoo.com";
    $id = NULL;
    $ip = $data[1][0]['serverIPAddress'];
    $date = $data[1][0]['startedDateTime'];
    $lat = $data[1][0]['coords'][0];
    $lon = $data[1][0]['coords'][1];
    $wait = $data[1][0]['timings']['wait'];
    $method = $data[1][0]['request']['method'];
    $url = $data[1][0]['request']['url'];
    $status = $data[1][0]['response']['status'];
    $text = $data[1][0]['response']['statusText'];
    $city = $data[0]['city'];
    $up_lat = $data[0]['lat'];
    $up_lon = $data[0]['lon'];
    $isp = $data[0]['isp'];
    //END OF DATA TO INSERT
    $stmt->bind_param("sissdddssissdds",$mail, $id, $ip, $date, $lat, $lon, $wait, $method, $url, $status, $text, $city, $up_lat, $up_lon, $isp);
    var_dump($stmt);
    //$stmt->execute();
    //var_dump("hellooooo");
    //var_dump($mail, $id, $ip, $date, $lat, $lon, $wait, $method, $url, $status, $text, $city, $up_lat, $up_lon, $isp);
  }
  catch(PDOException $e) {
    var_dump($e->getMessage());
  }
$stmt->close();
mysqli_close($con);
//var_dump($myJSON[0]["status"]);



?>