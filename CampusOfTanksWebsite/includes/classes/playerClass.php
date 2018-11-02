<?php
include('../config/config.php');

// we insert the username, score and the tank data to the online database. 
// We use the tank data for the picking of the tank. this is something for in the future. 

$userInput = $_POST['userInput'];
$sql = "INSERT INTO users(`username`, `score`, `tank`) VALUES ('$userInput','0','1')";
mysqli_query($conn,$sql);

header('Location: http://localhost/CampusOfTanks/CampusOfTanks/wwwroot/index.html');
?>