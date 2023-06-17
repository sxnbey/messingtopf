<?php
session_start();

include_once 'src/System/getCurrentUser.php';
include_once 'src/System/checkIfCorrectCredentials.php';

$error = false;
$errorText;


$checkuser = new \System\checkIfCorrectCredentials();
$username = $_POST['username'];
$currentCredentials = $checkuser->getCorrectUserId($username);

if($currentCredentials === false) {
    $error = true;
    $errorText = 'Incorrect username or Password';
}
else{
    $getCurrentUser = new \System\getCurrentUser;
    $currentUser = $getCurrentUser->getCurrentUserId($username);
    $_SESSION['username'] = $currentUser;
    header('Location: homePage.php');
}

//send back to login page
if($error === true){
    $_SESSION['error'] = $errorText;
    header('Location: ..\loginPage.php');
}