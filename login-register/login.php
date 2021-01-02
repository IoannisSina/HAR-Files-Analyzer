<?php

session_start();

require_once 'connection.php';
//print_r($_POST);

$username = trim($_POST["username"]);
$password = trim($_POST["password"]); 

try{
    // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
    $query = "SELECT password, property, email FROM user WHERE username = ?";
    $stmt = $con -> prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
  }
  catch(Exception $e) {
    echo $sql . "<br>" . $e->getMessage();
}

// if user exists
if($stmt->num_rows > 0){
    $stmt->bind_result($pass, $prop, $email);
    $stmt->fetch();
    
    // Checking the hashed password
    if (password_verify($password, $pass)){
        
        //select count and last insertion date 
        //GET NUMBER OF ENTRIES
        $counter_query = "SELECT COUNT(*), last_insertion FROM user INNER JOIN entries ON user.email = entries.user_email where email = ?";
        $stmt = $con -> prepare($counter_query);
        $stmt->bind_param("s", $email);
        $rv = $stmt->execute();
        $stmt->store_result();
        //var_dump($final_query_entries);
        if(!$rv) throw new Exception();

        if($stmt->num_rows > 0){
                
          $stmt->bind_result($entries_inserted, $last_insertion_date);
          $stmt->fetch();
        }
        session_regenerate_id();
        $_SESSION['loggedin'] = TRUE;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        $_SESSION['entries_inserted'] = $entries_inserted;
        $_SESSION['last_insertion_date'] = $last_insertion_date;
        
        // check if person is user or admin and act properly
        if($prop == 'user'){
            header('location: ../user/user_home.php');
            exit();
        }else{
            header("location: ../admin/admin_home.php"); 
            //echo 'Welcome Admin, ' . $_SESSION['name'] . '!';
            exit();
        }

    }else {
        //STAY AT THE SAME PAGE
        //session_start();
        $_SESSION["message"] = "Incorrect Password";
        header("location: index.php");
        //echo "Incorrect password!";
        exit();
        //javascript
    }

}else{
    $_SESSION["message"] = "Incorrect username";
    header("location: index.php");
    // echo '<p> Incorrect Username </p>';
}
$stmt->close();
mysqli_close($con);

?>