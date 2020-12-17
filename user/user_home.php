<?php
session_start();
$session_name =(isset($_SESSION['username']))?$_SESSION['username']:'';
?>

<!DOCTYE html>

<html>
<head>
    <meta charset="utf-8">
    <title>user_home</title>
    <link rel="stylesheet" href="user_home.css">
    <script type="text/javascript">
    var session_username = '<?php echo $session_name;?>';
    </script>
    <script src="user_home.js" defer></script>
</head>
    
    <div class="outer_div">
        <h1 class="blinking" id="welcome_message"></h1>
        <div class ="inner_div">
            <h2 id="upload_message">UPLOAD HAR FILE</h2>
            <input id="har_selector" type="file" name="fileToUpload" accept=".har">
            <p id="selected_file_name"></p><br>
            
            <div id="save">
                <label id="save_label">Save:</label>
                <input type="radio" name="save_file" checked>
                <label for="local">Local</label>
                <input type="radio" name="save_file" value="database">
                <label for="database">Database</label>
            </div>
            
            <button class="buttons" id="submit" type="button">Submit</button>
        </div>
    </div>
</body>

</html>