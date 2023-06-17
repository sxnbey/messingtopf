<?php
namespace System;

include_once "Config.php";

class getCurrentUser extends Config{
    
    public function getCurrentUserId($username){
        $sql = $this->pdo->prepare('SELECT id FROM users WHERE username =?');
        $sql->execute([$username]);
        $user = $sql->fetch();
        return $user['id'];
    }
}