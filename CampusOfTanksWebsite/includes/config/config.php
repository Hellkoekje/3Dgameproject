<?php
// Here we make connection with or online database.

$conn = mysqli_connect("florisoosterdijk.nl:3306", "floridk175_cot", "sjonnie", "floridk175_cot");

// if we dont get connection to the database this shows up errors with what is wrong. 
if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
?>
