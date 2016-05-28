<?php
//PDO code sourced by from the PHP documentation website
//http://php.net/docs.php
$dbh = new PDO('mysql:host=localhost;dbname=SuperSquireDB', 'SuperSquireUser', 'SuperSquire2016', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')); 

//Prepares and execute an SQL query to get the top 5 scores
$selectLeaderboard = $dbh->prepare('SELECT userName, hiScore FROM User ORDER BY hiScore DESC LIMIT 5');
$selectLeaderboard->execute();
$topFive = $selectLeaderboard->fetchAll(PDO::FETCH_ASSOC);

//Echoes the top 5 scores back as a JSON object
header('Content-type: application/json');
echo json_encode($topFive);
?>
