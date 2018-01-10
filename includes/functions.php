<?php
// do the connection first, then write a query
$user = "portfolio_test";
$pass = "lexistar";
$host = "lexisterioca.netfirmsmysql.com";
$db = "portfolio_db";
$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    error_log('sumpin done gone wrong, son');
    header("Location: /");
    exit;
}
error_log('connected, yo!');
// 1. do a select for all of the car data
//
// $myQuery = "SELECT * FROM mainmodel";
// $result = mysqli_query($conn, $myQuery);
// $rows = array();
//
// while ($row = mysqli_fetch_assoc($result)) {
//   $rows[] = $row;
// };
// echo back just the result set first
//var_dump($rows);
//echo $rows;
//echo json_encode($rows); // create a JSON object from the result set
// then echo back the JSON encoded result => after we set up the AJAX call in our .js file
//echo json_encode($rows);
//echo 'connected!';
//
//2. WRITE ANOTHER QUERY AND TEST IT IN THE BROWSER
//talk about get supervariable
if (isset($_GET["service"])) { // check to see if a query parameter exists
    $serviceId = $_GET["service"];
    // pass in the servicegd variable using the location bar in the browser (?servicegd=graphic_design)
    $myQuery = "SELECT service_description FROM services WHERE id = $serviceId";
    // send the query
    $result = mysqli_query($conn, $myQuery);
    // get the result
    $row = mysqli_fetch_assoc($result);
    // echo it back to whatever called it (the browser, to start)
    //var_dump($row);
    // and then encode it for the javascript AJAX call
    header("Content-Type: application/json;charset=utf-8");
    echo json_encode($row);
    exit;
};
if (isset($_POST["nameContact"])) {
    //Send email
    // The message
    $message = $_POST["contactMessage"];

// In case any of our lines are larger than 70 characters, we should use wordwrap()
    $message = wordwrap($message, 70, "\r\n");

    // Send
    mail($_POST['emailContact'], 'My portfolio contact', $message);

    //Go back to the homepage
    header("Location: ../contact.html");
    exit;
}
header("Location: /");
