<?php
namespace System;

include_once "Config.php";

class checkIfCorrectCredentials extends Config{

    public function getCorrectUserId($username) {
        $sql = $this->pdo->prepare('SELECT id FROM users WHERE username =?');
        $sql->execute([$username]);
        $user = $sql->fetch();
        if($user === false) {
            return false;
        }
        else{
            return $user['id'];
        }
    }
}