<?php 

session_start();
include '../check.php';
require_once '../login-register/connection.php';
$files_get = file_get_contents("php://input");
$email = json_decode($files_get, true);

$data_heatmap = array();
$data_info = array();
$str_email = '"'.$email.'"';
try{
    $coords_query = "SELECT COUNT(*) as count, latitude, longitude, city, isp, upload_latitude, upload_longitude FROM entries where user_email = ".$str_email." and longitude is NOT NULL GROUP BY latitude, longitude, city ORDER BY COUNT(*) DESC";
    $result = $con->query($coords_query);
    // // if(!$rv) throw new Exception();
    // //var_dump($final_query_entries);
    
    if($result->num_rows > 0){
        
        while($row = $result->fetch_assoc()) {
            
            $array_heatmap= array(
            "lat" => $row['latitude'],
            "lng" => $row['longitude'],
            "count" => $row['count']
            );

            $array_info = array(
            "city" => $row['city'],
            "isp" => $row['isp'],
            "upload_latitude"  => $row['upload_latitude'],
            "upload_longtitude" => $row['upload_longitude'],
            );

            $data_heatmap[] = $array_heatmap;
            $data_info[] = $array_info;

        }
    }
    //CHECK IF THERE ARE ENTRIES IN DB
    if(!(empty($data_heatmap) || empty($data_info))){
        $to_send = array($data_heatmap, $data_info);
        echo json_encode($to_send);
    }
    

}catch( Exception $e) {
    echo "Failed to select!";
}
 ?>