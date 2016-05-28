<?php
//PDO code sourced by from the PHP documentation website
//http://php.net/docs.php
$dbh = new PDO('mysql:host=localhost;dbname=SuperSquireDB', 'SuperSquireUser', 'SuperSquire2016', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')); 

//SQL statement to update the user with whatever information is posted
$updateUser = $dbh->prepare('UPDATE User SET hiScore=?, herringClicked=?, arrowsBlocked=?, herringsSeen=? WHERE username = ?');
$updateUser->execute(array($_POST['hiScore'], $_POST['herringClicked'], $_POST['arrowsBlocked'], $_POST['herringsSeen'], $_POST['username']));
?>
