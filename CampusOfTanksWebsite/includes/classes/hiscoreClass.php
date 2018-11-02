<?php
// connecting to the database with the config.php
$sql = "SELECT (`username`, `score`) FROM users ORDER BY score LIMIT 10";
$conn = mysqli_connect("florisoosterdijk.nl:3306", "floridk175_cot", "sjonnie", "floridk175_cot");

mysqli_query($conn,$sql);

if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
if (!$result) {
	echo "you are fucked.. ";
}
else {
	echo " result " 
}
?>