<?php

header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$dbName = "rails";

$conn = mysqli_connect($servername,$username,$password,$dbName);
if($conn->connect_error)
{
    die("connection failed" . $conn->connect_error);
} 

$sql = "SELECT * FROM result ";

$result = mysqli_query($conn , $sql);

if(mysqli_num_rows($result) > 0)
{
  $outp = array();
  $outp = $result->fetch_all(MYSQLI_ASSOC);  
  echo json_encode($outp);
  
} 
else{
    echo json_encode("0 result");

}

$conn->close();


?>