<?php
session_start();
$session_name =(isset($_SESSION['username']))?$_SESSION['username']:'';
echo '<h1 style="color: white;"> Welcome User, ' . $_SESSION['username'] . '!</h1>';
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
        <label>HAR document to upload:</label>
        <input type="file" name="fileToUpload" id="fileToUpload">
        <button id="submit" type="button">Submit</button>
        <!-- <form action="upload.php" method="post" enctype="multipart/form-data">>
            <input type="submit" value="Upload HAR" name="submit">
        </form> -->
    </div>
</body>

</html>