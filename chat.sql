-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server-Version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server-Betriebssystem:        Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Exportiere Datenbank-Struktur für chat
CREATE DATABASE IF NOT EXISTS `chat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `chat`;

-- Exportiere Struktur von Tabelle chat.changelog
CREATE TABLE IF NOT EXISTS `changelog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.changelog: ~0 rows (ungefähr)

-- Exportiere Struktur von Tabelle chat.chats
CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_start` int(11) DEFAULT NULL,
  `user_id_second` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.chats: ~2 rows (ungefähr)
REPLACE INTO `chats` (`id`, `user_id_start`, `user_id_second`) VALUES
	(1, 66, 67),
	(2, 67, 68);

-- Exportiere Struktur von Tabelle chat.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_sender` int(11) DEFAULT NULL,
  `user_id_accepter` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.friends: ~2 rows (ungefähr)
REPLACE INTO `friends` (`id`, `user_id_sender`, `user_id_accepter`) VALUES
	(1, 67, 66),
	(2, 68, 67);

-- Exportiere Struktur von Tabelle chat.friends_requests
CREATE TABLE IF NOT EXISTS `friends_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('pending','seen','accepted') NOT NULL,
  `user_id_sender` int(11) DEFAULT NULL,
  `user_id_receiver` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.friends_requests: ~0 rows (ungefähr)

-- Exportiere Struktur von Tabelle chat.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `send_by_user_id` int(11) DEFAULT NULL,
  `send_at` timestamp NULL DEFAULT NULL,
  `seen` enum('yes','no') DEFAULT 'no',
  `deleted` enum('Y','N') DEFAULT 'N',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.messages: ~4 rows (ungefähr)
REPLACE INTO `messages` (`id`, `chat_id`, `message`, `send_by_user_id`, `send_at`, `seen`, `deleted`) VALUES
	(1, 1, 'test', 66, '2023-06-19 10:01:33', 'yes', 'N'),
	(2, 1, 'test123', 67, '2023-06-19 10:01:53', 'yes', 'N'),
	(3, 2, 'testing123', 68, '2023-06-19 10:07:44', 'yes', 'N'),
	(4, 2, 'a', 67, '2023-06-19 10:10:33', 'no', 'N');

-- Exportiere Struktur von Tabelle chat.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(50) DEFAULT NULL,
  `password` char(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `status` enum('Online','Offline','Abwesend') DEFAULT 'Online',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportiere Daten aus Tabelle chat.users: ~3 rows (ungefähr)
REPLACE INTO `users` (`id`, `username`, `password`, `created_at`, `status`) VALUES
	(66, 'senbey', 'passwort123', '2023-06-19 05:58:21', 'Online'),
	(67, 'czubik', 'test1234', '2023-06-19 07:36:16', 'Online'),
	(68, 'admin', 'password', '2023-06-19 09:16:42', 'Online');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
