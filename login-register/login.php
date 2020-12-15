<?php

session_start();

require_once 'connection.php';
//print_r($_POST);

$username = trim($_POST["username"]);
$password = trim($_POST["password"]); 

try{
    // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
    $query = "SELECT username, password, property FROM user WHERE username = ?";
    $stmt = $con -> prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
  }
  catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

// if user exists
if($stmt->num_rows > 0){
    $stmt->bind_result($user, $pass, $prop);
    $stmt->fetch();
    
    // Checking the hashed password
    if (password_verify($password, $pass)){
        
        session_regenerate_id();
        $_SESSION['loggedin'] = TRUE;
        $_SESSION['username'] = $_POST['username'];
        
        // check if person is user or admin and act properly
        if($prop == 'user'){
            header('location: ../user/user_home.php');
            exit();
        }else{
            header("location: ../admin/admin_home.html"); 
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