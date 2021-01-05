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
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.css" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"> -->
  <link rel="stylesheet" href="admin_home.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="selector1.js" defer></script>
  <script src="selector2.js" defer></script>
  <script type="text/javascript">
        var session_username = '<?php echo $session_name;?>';
        var session_email = '<?php echo $session_email;?>';
  </script>
</head>
<body>



<h1 id="welcome_message" class="blinking"></h1>

<div class="contents">
  <div class="col-md-6 quarter box" id="box-1">
    <select name="choices_1" id="selector-1" class="selectpicker">
      <option value="users">#Users</option>
      <option value="entriestype">Entries By Type</option>
      <option value="entriesstatus">Entries By Status</option>
      <option value="domains">Distinct Domains</option>
      <option value="isp">Distinct ISP</option>
      <option value="age">Avg. Age</option>
    </select>
    <canvas id="selector_1_pie" height="110"></canvas>
  </div>
  <div class="col-md-6 quarter box" >
  <form id="form_2" action="selector2.php" method="post">
    <div id="inner_1">
      <select name="choices_2[]" class="selectpicker" id="selector-2" multiple data-live-search="true">
        <optgroup label="Content-type">
        </optgroup>
        <optgroup name="og_1" label="Day of week">
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </optgroup>
        <optgroup label="HTTP method type">
          <option value="sunday">kappa</option>
        </optgroup>
        <optgroup label="ISP">
        </optgroup>
      </select>
    </div>
    <input id="submit" type="submit" value="Filter">
  </form>

  </div>
  <div class="col-md-6 quarter box" id="box-3"></div>
  <div class="col-md-6 quarter box" id="box-4"></div>
</div>


</body>
</html>

<!-- <select name="choices_2[]" id="selector-2" multiple>
        <optgroup label="Content-type">
        </optgroup>
        <optgroup label="Day of week">
          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>
        </optgroup>
        <optgroup label="HTTP method type">
          <option value="saturday">jhvczxkjhjkhjkghsdfjklghfdgjklfdshk</option>
        </optgroup>
        <optgroup label="ISP">
        </optgroup>
      </select><br> -->
      
    <!-- </form> -->