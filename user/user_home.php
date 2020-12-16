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

    <div>
        <h1 id="welcome_message"></h1>
        <div class ="inner_div">
            <label>HAR document to upload:</label>
            <input class="buttons" id="har_selector" type="file" name="fileToUpload" id="fileToUpload" accept=".har">
            <p id="selected_file_name"></p>
            <button class="buttons" id="submit" type="button">Submit</button><br>
            <label>Save:</label><br>
            <input type="radio" name="save_file" checked>
            <label for="local">Local</label><br>
            <input type="radio" name="save_file" value="database">
            <label for="database">Database</label><br>
        </div>
    </div>
</body>

</html>