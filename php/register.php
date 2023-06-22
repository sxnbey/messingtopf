<?php
session_start();

include_once 'src/System/insertingNewAccount.php';
include_once 'src/System/getCurrentUser.php';

$error = false;
$errorText;

//check if both password inputs are same
if($_POST['password'] === $_POST['password2']){
    //check if password is atleast 8 characters long
    if(strlen($_POST['password']) > 7){
        $insertNewAccountClass = new \System\insertingNewAccount;
        $getCurrentUser = new \System\getCurrentUser;
        $username = $_POST['username'];
        $password = $_POST['password'];
        $insertNewAccountClass->insertNewAccount($username,$password);
        $currentUser = $getCurrentUser->getCurrentUserId($username);
        $_SESSION['username'] = $currentUser;
        header('Location: homePage.php');
    }
    else{
        $error = true;
        $errorText = "Das Passwort ist zu kurz.";
    }
}
else{
    $error = true;
    $errorText = "Die Passwörter sind nicht identisch.";
}

//send back to register page
if($error === true){
    $_SESSION['error'] = $errorText;
    header('Location: ..\index.php');
}