<!doctype html>
<html class="no-js" lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lexi Sterio - Graphic Designer</title>
    <link rel="stylesheet" href="css/foundation.min.css">
    <link rel="stylesheet" href="css/app.css">
  </head>
  <body>
    <h1>hello</h1>

<?php
$user = 'root';
$password = 'root';
$db = 'portfolio_db';
$host = 'localhost';
$port = 8889;

$link = mysqli_connect(
   "$host:$port",
   $user,
   $password
);
$db_selected = mysqli_select_db(
   $db,
   $link
);

$sql = "SELECT * FROM copy";
$result = mysqli_query($link, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        echo "id: " . $row["id"]. " - body: " . $row["body"]. "<br>";
    }
} else {
    echo "0 results";
}

mysqli_close($conn);

echo "<p>bye</p>";

?>
</body>
</html>
