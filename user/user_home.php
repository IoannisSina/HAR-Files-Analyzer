<?php

session_start();

include '../check.php';

$session_name = (isset($_SESSION['username']))?$_SESSION['username']:'';
$session_email = (isset($_SESSION['email']))?$_SESSION['email']:'';
$session_entries_inserted = (isset($_SESSION['entries_inserted']))?$_SESSION['entries_inserted']:'';
$session_last_insertion_date = (isset($_SESSION['last_insertion_date']))?$_SESSION['last_insertion_date']:'';

if(isset($_SESSION['message'])){
    $session_message = $_SESSION['message'];
    unset($_SESSION['message']);
} else $session_message = "";

?>

<!DOCTYE html>

<html>
<head>
    <meta charset="utf-8">
    <title>user_insert_entries</title>
    <link rel="stylesheet" href="user_home.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"/>

    <script type="text/javascript">
        var session_username = '<?php echo $session_name;?>';
        var session_email = '<?php echo $session_email;?>';
        var session_message = '<?php echo $session_message;?>';
        var session_entries_inserted = '<?php echo $session_entries_inserted;?>';
        var session_last_insertion_date = '<?php echo $session_last_insertion_date;?>';
    </script>
    <script src="user_heatmap.js" defer></script>
    <script src="user_home.js" defer></script>
    <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"></script> 
    <script src="https://cdn.jsdelivr.net/npm/heatmapjs@2.0.2/heatmap.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/leaflet-heatmap@1.0.0/leaflet-heatmap.js"></script>
</head>
<body>
    <div id="page_wrap">
        <div class="outer_div">
            <h1 class="blinking" id="welcome_message"></h1>
            <div class ="inner_div">
                <h2 id="upload_message">UPLOAD HAR FILE</h2>
                <input id="har_selector" type="file" name="fileToUpload" accept=".har">
                <p id="selected_file_name"></p><br>
                
                <div id="save">
                    <label id="save_label">Save:</label>
                    <input id="local_save" type="radio" name="save_file" checked>
                    <label for="local">Local</label>
                    <input type="radio" name="save_file" value="database">
                    <label for="database">Database</label>
                </div>
                
                <button class="buttons" id="submit" type="button">Submit</button>
            </div>
            <div class="inner_div" id="second_inner_div">
                <h2 id="upload_message">STATISTICS</h2>
                <label id="entries_inserted"></label><br><br>
                <label id="last_insertion"></label>
            </div>
            <div class="inner_div" id="third_inner_div">
                <form id="change_form" name="reset_password" action="user_reset_credentials.php">
                    <input class="forms" type="submit" value="Change Password/Username">
                </form>
                <form name="log_out" action="log_out.php">
                    <input class="forms" type="submit" value="Logout">
                </form>
            </div>
        </div>
        <div id="no_entries"></div>
        <div id="mapid"></div>
    </div>
    
</body>

</html>