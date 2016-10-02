-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Paź 2016, 22:02
-- Wersja serwera: 10.1.16-MariaDB
-- Wersja PHP: 5.6.24

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
-- Struktura tabeli dla tabeli `klient`
--

CREATE TABLE `klient` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `pesel` int(11) NOT NULL,
  `birthday` date NOT NULL,
  `phone` int(11) NOT NULL,
  `city` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `postCode` int(11) NOT NULL,
  `street` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `home` int(11) NOT NULL,
  `flat` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pokoje`
--

CREATE TABLE `pokoje` (
  `ID` int(11) NOT NULL,
  `Numer` int(11) NOT NULL,
  `Ilosc-Osob` int(11) NOT NULL,
  `Typ` varchar(255) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rabat`
--

CREATE TABLE `rabat` (
  `ID` int(11) NOT NULL,
  `Nazwa` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Kod-Promocyjny` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Wartosc-Znizki` int(11) NOT NULL,
  `Rodzaj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `rezerwacje`
--

CREATE TABLE `rezerwacje` (
  `ID` int(11) NOT NULL,
  `Sposob-Zaplaty` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Od-Kiedy` date NOT NULL,
  `Do-Kiedy` date NOT NULL,
  `Data-Zaplaty` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `usluga`
--

CREATE TABLE `usluga` (
  `ID` int(11) NOT NULL,
  `Nazwa` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Cena` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `usluga-klient`
--

CREATE TABLE `usluga-klient` (
  `ID` int(11) NOT NULL,
  `Sposob-Zaplaty` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Data-Zamowienia` date NOT NULL,
  `Ilosc` int(11) NOT NULL,
  `Data-Zaplaty` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `klient`
--
ALTER TABLE `klient`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `pokoje`
--
ALTER TABLE `pokoje`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rabat`
--
ALTER TABLE `rabat`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `rezerwacje`
--
ALTER TABLE `rezerwacje`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usluga`
--
ALTER TABLE `usluga`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `usluga-klient`
--
ALTER TABLE `usluga-klient`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `klient`
--
ALTER TABLE `klient`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `pokoje`
--
ALTER TABLE `pokoje`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `rabat`
--
ALTER TABLE `rabat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `rezerwacje`
--
ALTER TABLE `rezerwacje`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `usluga`
--
ALTER TABLE `usluga`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `usluga-klient`
--
ALTER TABLE `usluga-klient`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
