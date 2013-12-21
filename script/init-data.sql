-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 21. Dez 2013 um 02:25
-- Server Version: 5.5.27
-- PHP-Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `test`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `httpVerb` varchar(255) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Daten für Tabelle `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `httpVerb`, `uri`, `createdAt`, `updatedAt`) VALUES
(1, 'All users', 'get', '/api/users', '2013-12-20 18:49:45', '2013-12-20 18:49:45'),
(2, 'create new user', 'post', '/api/users', '2013-12-20 18:49:45', '2013-12-20 18:49:45'),
(3, 'Get specific user', 'get', '/api/users/:id', '2013-12-20 18:52:02', '2013-12-20 18:52:02'),
(4, 'Update user', 'put', '/api/users', '2013-12-20 18:52:02', '2013-12-20 18:52:02'),
(5, 'Delete a user', 'delete', '/api/users', '2013-12-20 18:52:31', '2013-12-20 18:52:31'),
(6, 'Get permissions by token', 'get', '/api/tokens/permissions', '2013-12-20 18:55:49', '2013-12-20 18:55:49'),
(7, 'Get all roles', 'get', '/api/roles', '2013-12-20 18:56:45', '2013-12-20 18:56:45'),
(8, 'Create a new role', 'post', '/api/roles', '2013-12-20 18:56:45', '2013-12-20 18:56:45'),
(9, 'Update a role', 'put', '/api/roles', '2013-12-20 18:57:18', '2013-12-20 18:57:18'),
(10, 'Delete a role', 'delete', '/api/roles', '2013-12-20 18:57:18', '2013-12-20 18:57:18'),
(11, 'Get permissions by role', 'get', '/api/roles/:rolename/permissions', '2013-12-20 18:59:24', '2013-12-20 18:59:24'),
(12, 'Add a new permission to a role', 'post', '/api/roles/:rolename/permissions', '2013-12-20 18:59:24', '2013-12-20 18:59:24'),
(13, 'Get all permissions', 'get', '/api/permissions', '2013-12-20 19:00:32', '2013-12-20 19:00:32'),
(14, 'Create a new permission', 'get', '/api/permissions', '2013-12-20 19:00:32', '2013-12-20 19:00:32');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `permissionsroles`
--

CREATE TABLE IF NOT EXISTS `permissionsroles` (
  `permissionId` int(11) NOT NULL DEFAULT '0',
  `roleId` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`permissionId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `permissionsroles`
--

INSERT INTO `permissionsroles` (`permissionId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2013-12-20 19:05:38', '2013-12-20 19:05:38'),
(2, 1, '2013-12-20 19:05:38', '2013-12-20 19:05:38'),
(3, 1, '2013-12-20 19:05:55', '2013-12-20 19:05:55'),
(4, 1, '2013-12-20 19:05:55', '2013-12-20 19:05:55'),
(5, 1, '2013-12-20 19:06:11', '2013-12-20 19:06:11'),
(6, 1, '2013-12-20 19:06:11', '2013-12-20 19:06:11'),
(7, 1, '2013-12-20 19:06:29', '2013-12-20 19:06:29'),
(8, 1, '2013-12-20 19:06:29', '2013-12-20 19:06:29'),
(9, 1, '2013-12-20 19:06:46', '2013-12-20 19:06:46'),
(10, 1, '2013-12-20 19:06:46', '2013-12-20 19:06:46'),
(11, 1, '2013-12-20 19:07:09', '2013-12-20 19:07:09'),
(12, 1, '2013-12-20 19:07:09', '2013-12-20 19:07:09'),
(13, 1, '2013-12-20 19:07:28', '2013-12-20 19:07:28'),
(14, 1, '2013-12-20 19:07:28', '2013-12-20 19:07:28');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2013-12-20 18:39:40', '2013-12-20 18:39:40');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `salt`, `createdAt`, `updatedAt`, `roleId`) VALUES
(1, 'admin', 'admin@gmail.com', '6wjPMA0suC9CiywMglHq2g==', 'blah', '2013-12-20 18:39:23', '2013-12-20 18:39:23', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userTokens`
--

CREATE TABLE IF NOT EXISTS `userTokens` (
  `token` varchar(255) NOT NULL DEFAULT '',
  `salt` varchar(255) DEFAULT NULL,
  `expiration` bigint(20) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `userTokens`
--

INSERT INTO `userTokens` (`token`, `salt`, `expiration`, `type`, `createdAt`, `updatedAt`, `userId`) VALUES
('sq2AALm3Gnm1PaEMaxdcTQ==', 'u6FwFx3B8P', 1387596259254, 'web', '2013-12-20 23:54:16', '2013-12-21 01:24:19', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
