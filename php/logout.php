<?php
session_start();

include_once 'src/System/setUserToOffline.php';

$insertNewAccountClass = new \System\setUserToOffline;
$username = $_SESSION['username'];
$insertNewAccountClass->setUserToOffline($username);
header('Location: ../loginPage.php');