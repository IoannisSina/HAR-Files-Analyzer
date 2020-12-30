<?php 

session_start();
include '../check.php';
require_once '../login-register/connection.php';
$files_get = file_get_contents("php://input");
$data = json_decode($files_get, true);




try{
  
    //DATA TO BULK INSERT FOR TABLE ENTRIES
    $sql = array();
    $headers_arr = array();
    $mail = '"'.$data[2].'"';
    $city = '"'.$data[0]['city'].'"';
    $up_lat = $data[0]['lat'];
    $up_lon = $data[0]['lon'];
    $isp = '"'.$data[0]['isp'].'"';
    $id = "NULL";

    //Variables for headers
    $header_id = "NULL";
    $req_header_type = '"'."REQUEST".'"';
    $res_header_type = '"'."RESPONSE".'"'; 

    //SELECT max id from db 
    $select_query = "SELECT MAX(id) FROM entries";
    $result = $con->query($select_query);
    $max_id = (int)$result->fetch_assoc()['MAX(id)'] + 1;

    //foreach entry
    foreach( $data[1] as $entry ) {
      $ip = '"'.$entry['serverIPAddress'].'"';
      $temp_date = date_create($entry['startedDateTime']);
      $date = '"'.date_format($temp_date,"Y-m-d H:i:s").'"';
      $lat = $entry['coords'][0];
      $lon = $entry['coords'][1];
      $wait = $entry['timings']['wait'];
      $method = '"'.$entry['request']['method'].'"';
      $url = '"'.$entry['request']['url'].'"';
      $status = '"'.$entry['response']['status'].'"';
      $text = '"'.$entry['response']['statusText'].'"';
      $temp_arr = array($mail, $id, $ip, $date, $lat, $lon, $wait, $method, $url, $status, $text, $city, $up_lat, $up_lon, $isp);
      $sql[] = "(".implode(', ', $temp_arr).")";

      //For every entry insert its request headers
      foreach( $entry['request']['headers'] as $req_header){
        $req_header_name = '"'.$req_header['name'].'"';
        $req_header_value = "'".$req_header['value']."'";
        $req_header_temp = array($max_id, $header_id, $req_header_name, $req_header_value, $req_header_type);
        $headers_arr[] = "(".implode(', ', $req_header_temp).")";
      }
      
      //For every entry insert its response headers
      foreach( $entry['response']['headers'] as $res_header){
        $res_header_name = '"'.$res_header['name'].'"';
        $res_header_value = "'".$res_header['value']."'";
        $res_header_temp = array($max_id, $header_id, $res_header_name, $res_header_value, $res_header_type);
        $headers_arr[] = "(".implode(', ', $res_header_temp).")";
      }
      
      $max_id++;

    }

    $temp_query_entries = "INSERT INTO entries VALUES ";
    $final_query_entries = $temp_query_entries.implode(', ', $sql);
    $rv = $con-> query($final_query_entries);
    //var_dump($final_query_entries);
    if(!$rv) throw new Exception();

    $temp_query_headers = "INSERT INTO headers VALUES ";
    $final_query_headers = $temp_query_headers.implode(', ', $headers_arr);
    $rv = $con-> query($final_query_headers);
    //var_dump($final_query_headers);
    if(!$rv) throw new Exception();

    //get last insertion_date
    $update_query = "UPDATE user SET last_insertion = CURRENT_TIMESTAMP";
    $rv = $con-> query($update_query);
    //var_dump($final_query_entries);
    if(!$rv) throw new Exception();

    //END OF DATA TO INSERT
    $counter_query = "SELECT COUNT(*), last_insertion FROM user INNER JOIN entries ON user.email = entries.user_email where email = ?";
    $stmt = $con -> prepare($counter_query);
    $stmt->bind_param("s", $_SESSION['email']);
    $rv = $stmt->execute();
    $stmt->store_result();
    //var_dump($final_query_entries);
    if(!$rv) throw new Exception();

    if($stmt->num_rows > 0){
            
      $stmt->bind_result($entries_inserted, $last_insertion_date);
      $stmt->fetch();
    }
    $arr = array($entries_inserted, $last_insertion_date);
    // $_SESSION['entries_inserted'] = $entries_inserted;
    // $_SESSION['last_insertion_date'] = $last_insertion_date;
    //send data back to JS in order to 
    echo json_encode($arr);
  }
  catch( Exception $e) {
    echo "$e";
  }

mysqli_close($con);

?>