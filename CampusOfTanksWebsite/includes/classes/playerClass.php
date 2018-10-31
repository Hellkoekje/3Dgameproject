<?php
include('../config/config.php');


$userInput = $_POST['userInput'];
$sql = "INSERT INTO users(`username`, `score`, `tank`) VALUES ('$userInput','0','1')";
mysqli_query($conn,$sql);

header('Location: ../../Tanks.html');
?>