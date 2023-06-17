<?php
namespace System;

include_once "Config.php";

class insertingNewAccount extends Config{
    
    public function insertNewAccount($username, $password){
       $sql = 'INSERT INTO users (username, password, created_at) VALUES (?, ?, ?)';
       $this->pdo->prepare($sql)->execute([$username, $password, date("Y-m-d H:i:s")]);
    }
}