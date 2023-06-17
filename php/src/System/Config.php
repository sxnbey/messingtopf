<?php
namespace System;

class Config{

    public function __construct(){
        $host = 'localhost';
        $db = 'chat';
        $username ='root';
        $password ='';

        $this->pdo = new \PDO('mysql:host=localhost;dbname=chat', 'root', '');
    }
}