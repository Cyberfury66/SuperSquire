<?php
$dbh = new PDO('mysql:host=localhost;dbname=SuperSquireDB', 'SuperSquireUser', 'SuperSquire2016', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')); 

$selectLeaderboard = $dbh->prepare('SELECT userName, hiScore FROM User ORDER BY hiScore DESC LIMIT 5');
$selectLeaderboard->execute();
$topFive = $selectLeaderboard->fetchAll(PDO::FETCH_ASSOC);

header('Content-type: application/json');
echo json_encode($topFive);
?>