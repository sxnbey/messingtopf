<?php
    namespace System;

    include "config.php";

    class getAllInfo extends Config{

        public function allNeededInfo($username){
            $userInfo = $this->getUserInfo($username);
            $chatsInfo = $this->getChatsInfo($username);
            $friendsInfo = $this->getFriendsList($username);
            $allUsers = $this->getAllUsers($username);
            $lastMessage = $this->getLastMessage($username);
            return array('currentUser' => $userInfo, 'allChats' => $chatsInfo, 'friendsIds' => $friendsInfo, 'allUsersData' => $allUsers, "lastMessage" => $lastMessage);
        }

        private function getUserInfo($username){
            $sql = $this->pdo->prepare("SELECT username, status, UNIX_TIMESTAMP(created_at) AS created_at FROM users WHERE id = ?");
            $sql->execute([$username]);
            $userInfo = $sql->fetch();

            return $userInfo;
        }

        private function getChatsInfo($username){
            $sql = $this->pdo->prepare("SELECT id, IF(user_id_start = ?, user_id_second, user_id_start) AS user_id FROM chats WHERE user_id_start = ? OR user_id_second = ?");
            $sql->execute([$username, $username, $username]);
            $chatsInfo = $sql->fetchAll();

            return $chatsInfo;
        }

        private function getFriendsList($username){
            $sql = $this->pdo->prepare("SELECT IF(user_id_accepter = ?, user_id_sender, user_id_accepter) AS user_id FROM friends, users WHERE users.id = user_id_sender AND (user_id_sender =? OR user_id_accepter =?)");
            $sql->execute([$username, $username, $username]);      
            $friendsInfo = $sql->fetchAll();

            return $friendsInfo;
        }

        private function getAllUsers($username){
            $sql = $this->pdo->prepare("SELECT id, username, UNIX_TIMESTAMP(created_at) AS created_at, status FROM users");
            $sql->execute();      
            $allUsersInfo = $sql->fetchAll();

            return $allUsersInfo; 
        }

        private function getLastMessage($username){
            $sql = $this->pdo->prepare("SELECT m1.chat_id AS chat_id, m1.message, m1.send_by_user_id, UNIX_TIMESTAMP(m1.send_at) AS send_at, m1.seen, m1.deleted
            FROM messages m1 LEFT JOIN messages m2
             ON (m1.chat_id = m2.chat_id AND m1.id < m2.id), chats c
            WHERE m1.chat_id = c.id AND m2.id IS NULL AND (c.user_id_start = $username OR c.user_id_second = $username);");
            $sql->execute();
            $chatsInfo = $sql->fetchAll();

            return $chatsInfo;
        }
    }