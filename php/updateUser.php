<?php
$dbh = new PDO('mysql:host=localhost;dbname=SuperSquireDB', 'SuperSquireUser', 'SuperSquire2016', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')); 

$updateUser = $dbh->prepare('UPDATE User SET hiScore=?, herringClicked=?, arrowsBlocked=?, herringsSeen=? WHERE username = ?');
$updateUser->execute(array($_POST['hiScore'], $_POST['herringClicked'], $_POST['arrowsBlocked'], $_POST['herringsSeen'], $_POST['username']));
?>