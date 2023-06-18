<?php
    namespace System;

    include "config.php";

    class getAllInfo extends Config{

        public function allNeededInfo($username){
            $userInfo = $this->getUserInfo($username);
            $chatsInfo = $this->getChatsInfo($username);
            $friendsInfo = $this->getFriendsList($username);
            return array('currentUser' => $userInfo, 'allChats' => $chatsInfo, 'friends' => $friendsInfo);
        }

        private function getUserInfo($username){
            $sql = $this->pdo->prepare("SELECT username FROM users WHERE id = ?");
            $sql->execute([$username]);
            $userInfo = $sql->fetch();

            return $userInfo;
        }

        private function getChatsInfo($username){
            $sql = $this->pdo->prepare("SELECT id FROM chats WHERE user_id_start = ? OR user_id_second =?");
            $sql->execute([$username, $username]);
            $chatsInfo = $sql->fetchAll();

            return $chatsInfo;
        }

        private function getFriendsList($username){
            $sql = $this->pdo->prepare("SELECT user_id_accepter FROM friends WHERE user_id_sender = ? OR user_id_accepter =?");
            $sql->execute([$username, $username]);
            $friendsInfo = $sql->fetchAll();

            return $friendsInfo;
        }
    }