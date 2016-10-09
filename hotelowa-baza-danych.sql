-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas generowania: 10 Paź 2016, 00:05
-- Wersja serwera: 10.1.16-MariaDB
-- Wersja PHP: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `hotelowa-baza-danych`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pesel` varchar(11) COLLATE utf8_polish_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` int(11) NOT NULL,
  `city` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `post_code` int(11) NOT NULL,
  `street` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `home` int(11) NOT NULL,
  `flat` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `clients`
--

INSERT INTO `clients` (`id`, `name`, `last_name`, `pesel`, `birthday`, `phone`, `city`, `post_code`, `street`, `home`, `flat`, `email`, `photo`, `created`) VALUES
(1, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:13:07'),
(2, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:19:47'),
(3, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:27:16'),
(4, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:29:02'),
(5, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:40:27'),
(6, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:40:59'),
(7, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:41:16'),
(8, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'shitstorm.jpg', '2016-10-03 22:49:57'),
(9, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:50:26'),
(10, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:52:10'),
(11, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:54:53'),
(12, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:56:44'),
(13, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:57:22'),
(14, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 22:57:41'),
(15, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:00:44'),
(16, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:01:22'),
(17, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:06:13'),
(18, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:07:09'),
(19, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:07:26'),
(20, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:11:41'),
(21, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:17:56'),
(22, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:18:50'),
(23, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:34:37'),
(24, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:35:13'),
(25, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:35:17'),
(26, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:44:06'),
(27, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-03 23:49:36'),
(28, 'Michał Klemiato', 'Klemiato', '12345678910', '0555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', 'poka.jpg', '2016-10-04 00:19:42'),
(29, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:23:17'),
(30, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:28:45'),
(31, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:29:15'),
(32, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:29:46'),
(33, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:29:57'),
(34, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:30:24'),
(35, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:30:39'),
(36, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:32:43'),
(37, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:32:53'),
(38, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:34:10'),
(39, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:35:15'),
(40, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:35:55'),
(41, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:36:15'),
(42, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '526', 'pampi.com@gmail.com', 'żart.jpg', '2016-10-04 19:36:56'),
(43, 'Michał Klemiato', 'Klemiato', '12345678910', '5555-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'pampi.com@gmail.com', '', '2016-10-04 21:24:09'),
(44, 'Michał Klemiato', 'Klemiato', '12345567891', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'michalek.com@wp.pl', '', '2016-10-04 21:57:20'),
(45, 'Michał Klemiato', 'Klemiato', '12345678910', '0055-05-05', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'michalek.com@wp.pl', '', '2016-10-04 21:57:37'),
(46, 'Michał Klemiato', 'efhtethrter', '12345678910', '0000-00-00', 606214001, 'Dębnica Kaszubska', 76, 'Fabryczna', 606214001, '', 'michalek.com@wp.pl', '', '2016-10-04 22:36:40');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `client_service`
--

CREATE TABLE `client_service` (
  `id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_service` int(11) NOT NULL,
  `paid` datetime NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `client_service`
--

INSERT INTO `client_service` (`id`, `id_client`, `id_service`, `paid`, `created`) VALUES
(1, 1, 1, '0005-05-05 00:00:00', '2016-10-10 00:04:43');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `discounts`
--

CREATE TABLE `discounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `value` int(11) NOT NULL,
  `date_from` datetime NOT NULL,
  `date_to` datetime NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `discounts`
--

INSERT INTO `discounts` (`id`, `name`, `code`, `value`, `date_from`, `date_to`, `created`) VALUES
(1, '1', '1', 1, '0001-01-01 00:00:00', '0001-01-01 00:00:00', '2016-10-10 00:05:19');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `date_from` datetime NOT NULL,
  `date_to` datetime NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_room` int(11) NOT NULL,
  `paid` datetime NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `reservations`
--

INSERT INTO `reservations` (`id`, `date_from`, `date_to`, `id_client`, `id_room`, `paid`, `created`) VALUES
(5, '2016-10-05 00:00:00', '2016-10-27 00:00:00', 55, 5, '2016-10-12 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `count_of_people` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `created` datetime NOT NULL,
  `description` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `rooms`
--

INSERT INTO `rooms` (`id`, `number`, `count_of_people`, `type`, `created`, `description`, `price`) VALUES
(1, 1, 1, 'single', '2016-10-04 21:52:02', 'jednoosobowy ', 0),
(2, 1, 1, 'single', '2016-10-04 21:52:31', 'jednoosobowy ', 0),
(3, 1, 1, 'single', '2016-10-04 21:54:29', 'jednoosobowy ', 0),
(4, 1, 1, 'single', '2016-10-04 21:56:25', 'jednoosobowy ', 0),
(5, 1, 1, '1', '2016-10-04 21:58:46', ' ', 0),
(6, 1, 1, '1', '2016-10-04 22:32:56', ' 1', 1),
(7, 1, 1, '1', '2016-10-04 22:33:29', '1 ', 1.1),
(8, 10, 10, 'rtsry', '2016-10-07 21:02:53', ' tfiktd', 354);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `price` float NOT NULL COMMENT 'cena za dzień',
  `description` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `services`
--

INSERT INTO `services` (`id`, `name`, `price`, `description`, `created`) VALUES
(1, 'Michał Klemiato', 1, ' 1', '2016-10-04 22:17:14'),
(2, 'ty', 0, ' rth', '2016-10-04 22:28:31'),
(3, 'yery', 0, ' tyjktyj', '2016-10-04 22:37:04'),
(4, '3ty', 556, ' ethet', '2016-10-04 22:43:34'),
(5, 'lol', 476, ' uilkgyu', '2016-10-07 20:54:01'),
(6, '654', 655, ' 5466456', '2016-10-08 23:52:49'),
(7, '654', 655, ' 5466456', '2016-10-08 23:53:19'),
(8, '8', 8, ' 8', '0000-00-00 00:00:00'),
(9, '8', 8, ' 8', '0000-00-00 00:00:00'),
(10, '1', 1, ' 1', '0000-00-00 00:00:00'),
(11, '1', 1, ' 1', '2016-10-09 22:48:08');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_service`
--
ALTER TABLE `client_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `client_service`
--
ALTER TABLE `client_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT dla tabeli `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT dla tabeli `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT dla tabeli `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
