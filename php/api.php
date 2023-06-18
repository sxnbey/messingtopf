<?php
session_start();
include_once 'src/System/getAllInfo.php';

$info = new \System\getAllInfo();

$username = $_SESSION['username'];
$data = $info->allNeededInfo($username); 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
echo json_encode($data);