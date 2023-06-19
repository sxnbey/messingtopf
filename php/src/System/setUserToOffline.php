<?php
namespace System;

include_once "Config.php";

class setUserToOffline extends Config{

    public function setUserToOffline($username){
        $sql = "UPDATE users SET status = 'Offline' WHERE id =  ?";
        $this->pdo->prepare($sql)->execute([$username]);
    }
}