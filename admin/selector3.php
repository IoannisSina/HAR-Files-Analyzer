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

if($data[2] == 'a'){

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
    $step = end($to_return_3) - $to_return_3[0];
    $labels = array();
    $labels[] = array($to_return_3[0], $step/10);
    $data = array(0,0,0,0,0,0,0,0,0,0);
    for($x = 1; $x < 10; $x++){

    $labels[] =  array((($step/10)*$x) + 1 ,($step/10)* ($x+1));
    }

    for($j = 0; $j < count($to_return_3); $j++){
        
        for($k = 0; $k < count($labels); $k++){

            if( $labels[$k][0] <= $to_return_3[$j] && $to_return_3[$j] <= $labels[$k][1] ){
                $data[$k] += 1;
                break;
            }
        }
        
    }

    for($h = 0; $h < count($labels); $h++){
        $str_label = strval($labels[$h][0]) . '-' . strval($labels[$h][1]);
        $labels[$h] = $str_label;
    }
}elseif($data[2] == 'b'){

}else{
    $labels = array("public", "private", "no-cache", "no-store");
    $data = array(0,0,0,0);
    try{
        // SQL query for isps and Content types
        $query_3_2 = "SELECT value FROM `headers` INNER JOIN entries on entry_id = id 
        WHERE entries.isp IN ('$isps_3') AND name='cache-control' 
        AND headers.entry_id IN(SELECT entry_id FROM headers WHERE name='content-type' and value IN ('$content_type_3')) 
        AND (value LIKE '%private%' OR value LIKE '%public%' OR value LIKE '%no-cache%' OR value LIKE '%no-store%')";
        $result = $con->query($query_3_2);
        if(!$result) throw new Exception();
        

        if($result->num_rows > 0){
            
            while($row = $result->fetch_assoc()) {

                //$exploded_arr = explode( ",", $row['value']);

                
                for($j = 0; $j < count($labels); $j++){
                    if(strpos($row['value'], $labels[$j]) !== false){
                        $data[$j] += 1;
                    }
                }
                
                // $temp[] = $exploded_arr;
                        
               
            }
        }
        //----------------------------------------------------------------------
    }
    catch(Exception $e) {
        echo "Query failed";
    }
    
}


echo json_encode(array($labels, $data));
mysqli_close($con);

?>