<?php
namespace System;

include_once "Config.php";

class setUserToOnline extends Config{

    public function setUserToOnline($username){
        $sql = "UPDATE users SET status = 'Online' WHERE id =  ?";
        $this->pdo->prepare($sql)->execute([$username]);
    }
}