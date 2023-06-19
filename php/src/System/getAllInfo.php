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
            return array('currentUser' => $userInfo, 'allChats' => $chatsInfo, 'friendsIds' => $friendsInfo, 'allUsersData' => $allUsers);
        }

        private function getUserInfo($username){
            $sql = $this->pdo->prepare("SELECT username, status, created_at FROM users WHERE id = ?");
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
            $sql = $this->pdo->prepare("SELECT id, username, created_at, status FROM users");
            $sql->execute();      
            $allUsersInfo = $sql->fetchAll();

            return $allUsersInfo; 
        }

        private function getLastMessage($username){
            $sql = $this->pdo->prepare("SELECT chats.id, message, send_by_user_id, send_at, seen, deleted FROM chats, messages WHERE chats.id = chat_id GROUP BY chat_id ORDER BY send_at ASC");
            $sql->execute();
            $chatsInfo = $sql->fetchAll();

            return $chatsInfo;
        }
    }