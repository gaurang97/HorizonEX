<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$name = $_POST["name"];

$servername = "127.0.0.1:3308";
$username = "root";
$password = "gaurang";
$dbName = "raildb";

$conn = mysqli_connect($servername,$username,$password,$dbName);
if($conn->connect_error)
{
    die("connection failed" . $conn->connect_error);
} 

$sql = 'INSERT INTO  user values("' . $name . '")';




if($conn->query($sql) === TRUE)
{
  $outp = "Inserted" . $name;
  echo json_encode($outp);
  
} 
else{
    echo json_encode("Error" . $conn->error);

}

$conn->close();


?>