<?php

session_start();

include '../check.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Admin</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"> -->
  <link rel="stylesheet" href="admin_home.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="admin_home.js" defer></script>
  <script type="text/javascript">
        var session_username = '<?php echo $session_name;?>';
        var session_email = '<?php echo $session_email;?>';
  </script>
</head>
<body>



<h1 id="welcome_message" class="blinking"></h1>


<div class="contents">
  <div class="col-md-6 quarter box"></div>
  <div class="col-md-6 quarter box"></div>
  <div class="col-md-6 quarter box"></div>
  <div class="col-md-6 quarter box"></div>
</div>


</body>
</html>