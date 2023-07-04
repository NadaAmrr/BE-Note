-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2023 at 05:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asgmt5sequelize`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Sample Note 1 updated', 'This is a sample note. It contains some text and some bullet points updated.', '2023-06-27 14:20:55', '2023-06-27 15:14:57', 1),
(2, 'Sample Note 2', 'This is another sample note. It contains some more text and some checkboxes.', '2023-06-27 14:20:55', '2023-06-27 14:20:55', 1),
(4, 'Sample Note 3', 'This is a third sample note. It contains some important information about a task.', '2023-06-27 13:46:33', '2023-06-27 13:46:33', 3),
(5, 'Important Task', 'This is a note about an important task that needs to be completed.', '2023-06-27 16:06:48', '2023-06-27 16:06:48', 6),
(6, 'Sample Note 6', 'This is a sixth sample note. It contains some text and some quotes.', '2023-06-27 16:06:48', '2023-06-27 16:06:48', 5),
(7, 'Sample Note 7', 'This is a seventh sample note. It contains some text and some code snippets.', '2023-06-27 16:08:39', '2023-06-27 16:08:39', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `age`, `createdAt`, `updatedAt`) VALUES
(1, 'lara', 'lara@yahoo.com', '555', 30, '2023-06-26 23:03:55', '2023-06-27 14:43:25'),
(2, 'jana', 'jana@yahoo.com', '123', 21, '2023-06-26 23:06:16', '2023-06-27 15:05:33'),
(3, 'John', 'johndoe@example.com', 'password123', 24, '2023-06-26 23:07:48', '2023-06-26 23:07:48'),
(5, 'kerala', 'kerala@example.com', '123', 32, '2023-06-27 15:25:28', '2023-06-27 15:25:28'),
(6, 'Camila', 'camila@example.com', '123', 44, '2023-06-27 15:29:00', '2023-06-27 15:29:00'),
(8, ' John', 'johndose@example.com', 'password123', 24, '2023-06-27 15:03:11', '2023-06-27 15:03:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
