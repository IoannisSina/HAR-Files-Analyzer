<?php

session_start();

include '../check.php';
require_once '../login-register/connection.php';

// $session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
// $session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';

function find_max_age($block) {
    $has_max_age = FALSE;
    for($x=0 ; $x < count($block); $x++){
        
        if($block[$x]['name'] == "cache-control"){
            $exploded_arr = explode( "=", $block[$x]['value']);
            //in case max-age is not the last directive, explode at comma as well
            $GLOBALS['to_return_3'][] = intval(explode( ",", end($exploded_arr))[0]);
            $has_max_age = TRUE;
            break;
        }
        
        if($block[$x]['name'] == "expires") $temp_exp = $block[$x]['value'];
        else $temp_lm = $block[$x]['value'];
    }
    
    //$GLOBALS['to_return_3'][] = array($block);
    //if has_max_age is 0 we are sure that both are initialized
    //if one of them is unset, it means that max age = 0!! 
    if(!$has_max_age) {
        if(isset($temp_exp, $temp_lm)){
            $date = new DateTime($temp_exp);
            $date2 = new DateTime($temp_lm);

            $diff = $date->getTimestamp() - $date2->getTimestamp();
            // $date_exp = date_create($temp_exp);
            // $date_lm = date_create($temp_lm);
            // $calculated_age = date_diff($date_exp, $date_lm);
            if($diff < 0) $diff = 0;
            $GLOBALS['to_return_3'][] = $diff;
        }else $GLOBALS['to_return_3'][] = 0;
        
    }
};


$files_get = file_get_contents("php://input");
$data = json_decode($files_get, true);

$content_type_3 = join("','",$data[0]);
$isps_3 = join("','",$data[1]);
$to_return_3 = array();
$temp = array();
try{
    // SQL query for isps and Content types
    $query_3 = "SELECT entry_id, name, value FROM headers INNER JOIN entries on entry_id = id
    WHERE (value LIKE '%max-age%' OR name IN ('expires','last-modified')) AND 
    isp IN ('$isps_3') AND entry_id IN(SELECT entry_id FROM headers WHERE name='content-type' and value IN ('$content_type_3'))";
    $result = $con->query($query_3);
    if(!$result) throw new Exception();
    

    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()) {

            $temp[] = $row;
        }
    }
    //----------------------------------------------------------------------
}
catch(Exception $e) {
    echo "Query failed";
}

//take headers from same entry to calculate max age!!
$i = 0;
while($i < count($temp)) {
    $current_entry_id = $temp[$i]['entry_id'];
    $temp_block = array();
    $j = $i;
    while($j < count($temp) && $current_entry_id == $temp[$j]['entry_id']){

        $temp_block[] = $temp[$j];
        $j++;
    }
    find_max_age($temp_block);
    $i = $j;
}

//SORT ARRAY TO CREATE BUCKETS
sort($to_return_3);

for($x = 0; x <= count($to_return_3); $x += count($to_return_3))/10){

    // if($to_return_3[$x] < $x * count($to_return_3)/10) data[] = $to_return_3[$x];

    
}


echo json_encode($to_return_3);
mysqli_close($con);

?>