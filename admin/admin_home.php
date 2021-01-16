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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
  
  <link rel="stylesheet" href="admin_home.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
  <script src="selector1.js" defer></script>
  <script src="selector3.js" defer></script>
  <script src="selector2.js" defer></script>
  
  <script type="text/javascript">
        var session_username = '<?php echo $session_name;?>';
        var session_email = '<?php echo $session_email;?>';
  </script>
</head>
<body>

<h1 id="welcome_message" class="blinking"></h1>
<hr style="height:1px;border-width:0;background-color:red">
<div id="box-1">
    <select name="choices_1" id="selector-1" class="selectpicker">
      <option value="users">#Users</option>
      <option value="entriestype">Entries By Type</option>
      <option value="entriesstatus">Entries By Status</option>
      <option value="domains">Distinct Domains</option>
      <option value="isp">Distinct ISP</option>
      <option value="age">Avg. Age</option>
    </select>
    <canvas id="selector_1_pie" height = 100></canvas>
</div>
<hr style="height:1px;border-width:0;background-color:red">
<!--------------------------------------------------------------------------------------------------------------------------------------------------->

<div id="box-1">
  <div class="inner_2" id="contenttype">
    <select title='Content Type' multiple="multiple" name="selector_contenttype" id="selector_contenttype" class="selectpicker selectors_2"  data-live-search="true">
    </select>
  </div>
  <div class="inner_2" id="days">
    <select title='Days' multiple="multiple" name="selector_days" id="selector_days" class="selectpicker selectors_2"  data-live-search="true">
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
    </select>
  </div>
  <div class="inner_2" id="httpmethod">
    <select title='HTTP Method' multiple="multiple" name="selector_httpmethod" id="selector_httpmethod" class="selectpicker selectors_2"  data-live-search="true">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="HEAD">HEAD</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
        <option value="OPTIONS">OPTIONS</option>
    </select>
  </div>
  <div class="inner_2" id="isp">
    <select title='ISP' multiple="multiple" name="selector_isp" id="selector_isp" class="selectpicker selectors_2"  data-live-search="true">
    </select>
  </div>
  <div class="inner_2" id="filter">
    <button class="buttons" id="submit" type="button">Filter</button>
  </div>
  <div class="inner_2" id="clear_div">
    <button class="buttons" id="clear" type="button">Clear all</button>
  </div>
  <div class="inner_2" id="select_all_div">
    <button class="buttons" id="select_all" type="button">Select all</button>
  </div>
  <canvas id="graph_2" height = 100></canvas>
</div>
<!--------------------------------------------------------------------------------------------------------------------------------------------------->
<hr style="height:1px;border-width:0;background-color:red">
<div id="box-1">
  <div class="inner_2" id="contenttype_3_div">
    <select title='Content Type' multiple="multiple" name="selector_contenttype_3" id="selector_contenttype_3" class="selectpicker selectors_3"  data-live-search="true">
    </select>
  </div>
  <div class="inner_2" id="isp_3_div">
    <select title='ISP' multiple="multiple" name="selector_isp_3" id="selector_isp_3" class="selectpicker selectors_3"  data-live-search="true">
    </select>
  </div>

  <div class="buttons_div" id="filter_div_3">
    <button class="buttons" id="submit_3" type="button">Filter</button>
  </div>
  <div class="buttons_div" id="clear_div_3">
    <button class="buttons" id="clear_3" type="button">Clear all</button>
  </div>
  <div class="buttons_div" id="select_all_div_3">
    <button class="buttons" id="select_all_3" type="button">Select all</button>
  </div>

  <canvas id="graph_3" height = 100></canvas>
</div>

</body>
</html>