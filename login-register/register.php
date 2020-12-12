<?php

//print_r ($_POST);
require_once 'connection.php';

$username = trim($_POST["username"]);
$password = trim($_POST["password"]);
$confirm_password = trim($_POST["confirm_password"]);
$email = trim($_POST["email"]);
$property = $_POST['property'];
//password encryption
$password_hash = password_hash($password, PASSWORD_BCRYPT);

//after submit check if there is a username already in
try{
  // Prepare our SQL, preparing the SQL statement will prevent SQL injection.
  $query = "SELECT username, email FROM user WHERE username = ? OR email=?";
  $stmt = $con -> prepare($query);
  $stmt->bind_param("ss", $username, $email);
  $stmt->execute();
  $stmt->store_result();
}
catch(PDOException $e) {
  echo $sql . "<br>" . $e->getMessage();
}

// if user with same username or password exists
// we are sure if it exists it will be only one
if($stmt->num_rows > 0){
  $stmt->bind_result($temp_user,$temp_email);
  $stmt->fetch();
  //stay on same page
  include 'register.html';
  if($username == $temp_user) echo 'USERNAME OR EMAIL ALREADY EXIST';
}else{
  //check password
  $pass_length = strlen($password);
  $at_least_one_Uppercase = preg_match("#[A-Z]+#", $password );
  $at_least_one_number = preg_match("#[0-9]+#", $password );
  $at_least_one_special = preg_match("#\W+#", $password ); 

  if ($at_least_one_Uppercase && $at_least_one_number && $at_least_one_special && $pass_length >= 8 && $password == $confirm_password){
    echo 'password OK';
    //if there is no other user with same credentials and password is ok insert new user
    try{
      $query = "INSERT INTO user VALUES (?,?,?,?)";
      $stmt = $con -> prepare($query);
      $stmt->bind_param("ssss", $username, $password_hash, $email, $property);
      $stmt->execute();
      echo 'Succesful insertion';
      //Go back to login page
      include 'index.html';
    }
    catch(PDOException $e) {
      echo $sql . "<br>" . $e->getMessage();
    }
  }
  else{
    include 'register.html';
    echo 'fail password';
  }

}




$stmt->close();
mysqli_close($con);
?>