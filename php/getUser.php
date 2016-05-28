<?php
//PDO code sourced by from the PHP documentation website
//http://php.net/docs.php
$dbh = new PDO('mysql:host=localhost;dbname=SuperSquireDB', 'SuperSquireUser', 'SuperSquire2016', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'UTF8\'')); 

//Prepares and execute an SQL query to get the user's information
//If the user is not already in the database, it creates another one
//echos the user's info back as a JSON object
$selectUser = $dbh->prepare('SELECT * FROM User WHERE username = ?');
if($selectUser ->execute(array($_POST['username'])) == "false") {
	$addUser = $dbh->prepare('INSERT INTO User(userName, hiScore, herringClicked, arrowsBlocked, herringsSeen) VALUES (?, 0, 0, 0, 0)');
	try {
		$addUser->execute(array($_POST['username']));
	} catch(Exception $e) {
		header('Content-type: application/json');
		echo json_encode(array($e->getMessage()));
	}
	if($selectUser ->execute(array($_POST['username'])) === "false") {
		header('Content-type: application/json');
		echo json_encode(array("Could not create user"));
	} else {
		$user = $selectUser ->fetchAll(PDO::FETCH_ASSOC);
		header('Content-type: application/json');
		echo json_encode($user);
	}
} else {
	$user = $selectUser ->fetchAll(PDO::FETCH_ASSOC);
	header('Content-type: application/json');
	echo json_encode($user);
}
?>
