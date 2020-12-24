-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 24, 2020 at 04:06 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `user_email` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `serverIPAddress` varchar(255) NOT NULL,
  `startedDateTime` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `timings_wait` double NOT NULL,
  `request_method` enum('GET','POST','PUT','HEAD','DELETE','PATCH','OPTIONS') NOT NULL,
  `request_url` varchar(255) NOT NULL,
  `response_status` int(11) NOT NULL,
  `response_statusText` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `upload_latitude` float NOT NULL,
  `upload_longitude` float NOT NULL,
  `isp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`user_email`, `id`, `serverIPAddress`, `startedDateTime`, `latitude`, `longitude`, `timings_wait`, `request_method`, `request_url`, `response_status`, `response_statusText`, `city`, `upload_latitude`, `upload_longitude`, `isp`) VALUES
('johnsina304@yahoo.com', 1, '2a00:1450:4001:800::2004', '2020-12-16T11:38:54.377Z', 50.1155, 8.68417, 164.7950000000368, 'GET', 'www.google.com', 200, '', 'Paros', 37.0903, 25.1516, 'OTEnet');

-- --------------------------------------------------------

--
-- Table structure for table `headers`
--

CREATE TABLE `headers` (
  `entry_id` int(11) NOT NULL,
  `header_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `type` enum('REQUEST','RESPONSE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `property` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `email`, `property`) VALUES
('sinakhs', '$2y$10$5avPE1UI4nCgrXkEqceFq.LuNZ26K4a3WS9VYH4PuIO4H5psPqWYe', 'johnsina304@yahoo.com', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `USER_EMAIL` (`user_email`);

--
-- Indexes for table `headers`
--
ALTER TABLE `headers`
  ADD PRIMARY KEY (`header_id`),
  ADD KEY `ENTRY_ID` (`entry_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `headers`
--
ALTER TABLE `headers`
  MODIFY `header_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `USER_EMAIL` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `headers`
--
ALTER TABLE `headers`
  ADD CONSTRAINT `ENTRY_ID` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
