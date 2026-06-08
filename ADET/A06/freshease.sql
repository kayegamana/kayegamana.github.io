-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2025 at 04:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freshease`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryID` int(4) NOT NULL,
  `name` varchar(30) NOT NULL,
  `image` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryID`, `name`, `image`) VALUES
(1, 'Fruits', 'imgs/productCategory1.png'),
(2, 'Vegetables', 'imgs/productCategory2.png'),
(3, 'Seafood', 'imgs/productCategory3.png'),
(4, 'Meat', 'imgs/productCategory4.png');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productID` int(4) NOT NULL,
  `categoryID` int(4) NOT NULL,
  `name` varchar(30) NOT NULL,
  `isAvailable` varchar(6) NOT NULL DEFAULT 'true',
  `code` varchar(20) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productID`, `categoryID`, `name`, `isAvailable`, `code`, `image`) VALUES
(1, 1, 'Green Apple', 'true', 'GRNAPPL', 'imgs/fruits/fruit1.jpg'),
(2, 1, 'Red Fuji Apple', 'true', 'RDFJAPPL', 'imgs/fruits/fruit2.jpg'),
(3, 1, 'Premium Avocado', 'false', 'PAVCD', 'imgs/fruits/fruit3.jpg'),
(4, 1, 'Banana Lacatan', 'true', 'BNNLCT', 'imgs/fruits/fruit4.jpg'),
(5, 1, 'Banana Latundan', 'true', 'BNNLTND', 'imgs/fruits/fruit5.jpg'),
(6, 1, 'Banana Saba', 'true', 'BNNSB', 'imgs/fruits/fruit6.jpg'),
(7, 1, 'Dragonfruit', 'true', 'DRGNFRT', 'imgs/fruits/fruit7.jpg'),
(8, 1, 'Durian', 'true', 'DRN', 'imgs/fruits/fruit8.jpg'),
(9, 1, 'Green Muscat Grapes', 'true', 'GRNMGPS', 'imgs/fruits/fruit9.jpg'),
(10, 1, 'Guyabano', 'false', 'GYBA', 'imgs/fruits/fruit10.jpg'),
(11, 1, 'Lemon', 'true', 'LEM', 'imgs/fruits/fruit11.jpg'),
(12, 1, 'Mango Green Large', 'true', 'MNGGRNL', 'imgs/fruits/fruit12.jpg'),
(13, 1, 'Mango Ripe Large', 'true', 'MNGRPL', 'imgs/fruits/fruit13.jpg'),
(14, 1, 'Orange Medium-Large', 'true', 'ORNGML', 'imgs/fruits/fruit14.jpg'),
(15, 1, 'Pineapple Premium', 'true', 'PNPLEP', 'imgs/fruits/fruit15.jpg'),
(16, 1, 'Watermelon Seedless', 'true', 'WTMLNSDL', 'imgs/fruits/fruit16.jpg'),
(17, 2, 'Ampalaya Long', 'true', 'AMPLYL', 'imgs/vegetables/vegetable1.jpg'),
(18, 2, 'Baguio Beans', 'true', 'BGIOBN', 'imgs/vegetables/vegetable2.jpg'),
(19, 2, 'Bell Pepper Green', 'true', 'BLLPGRN', 'imgs/vegetables/vegetable3.jpg'),
(20, 2, 'Bell Pepper Red', 'true', 'BLLPRD', 'imgs/vegetables/vegetable4.jpg'),
(21, 2, 'Calamansi', 'true', 'CLMS', 'imgs/vegetables/vegetable5.jpg'),
(22, 2, 'Camote Violet', 'true', 'CMTVLT', 'imgs/vegetables/vegetable6.jpg'),
(23, 2, 'Capsicum Yellow', 'true', 'CPSMYLLW', 'imgs/vegetables/vegetable7.jpg'),
(24, 2, 'Carrot', 'true', 'CRRT', 'imgs/vegetables/vegetable8.jpg'),
(25, 2, 'Cucumber Regular', 'true', 'CCMBRR', 'imgs/vegetables/vegetable9.jpg'),
(26, 2, 'Eggplant Regular', 'true', 'EPLNTR', 'imgs/vegetables/vegetable10.jpg'),
(27, 2, 'Gabi Sigang', 'true', 'GBSG', 'imgs/vegetables/vegetable11.jpg'),
(28, 2, 'Garlic', 'true', 'GRLC', 'imgs/vegetables/vegetable12.jpg'),
(29, 2, 'Ginger', 'true', 'GNGR', 'imgs/vegetables/vegetable13.jpg'),
(30, 2, 'Lettuce Green Ice', 'false', 'LTCGRNI', 'imgs/vegetables/vegetable14.jpg'),
(31, 2, 'Onion Red', 'true', 'ONNRD', 'imgs/vegetables/vegetable15.jpg'),
(32, 2, 'Pechay Tagalog', 'true', 'PHYTGLG', 'imgs/vegetables/vegetable16.jpg'),
(33, 2, 'Sayote', 'true', 'SYT', 'imgs/vegetables/vegetable17.jpg'),
(34, 2, 'Sili Labuyo', 'true', 'SLLBY', 'imgs/vegetables/vegetable18.jpg'),
(35, 3, 'Alumahan', 'true', 'ALMHN', 'imgs/seafoods/seafood1.jpg'),
(36, 3, 'Bangus Dagupan', 'true', 'BNGDGP', 'imgs/seafoods/seafood2.jpg'),
(37, 3, 'Hasa Hasa', 'true', 'HSHS', 'imgs/seafoods/seafood3.jpg'),
(38, 3, 'Hito', 'false', 'HTO', 'imgs/seafoods/seafood4.jpg'),
(39, 3, 'Salay Ginto', 'true', 'SLYGNT', 'imgs/seafoods/seafood5.jpg'),
(40, 3, 'Salmon Belly Strips', 'true', 'SLNBSTRP', 'imgs/seafoods/seafood6.jpg'),
(41, 3, 'Samaral', 'true', 'SMRL', 'imgs/seafoods/seafood7.jpg'),
(42, 3, 'Sapsap Premium', 'true', 'SPSPP', 'imgs/seafoods/seafood8.jpg'),
(43, 3, 'Shrimp Small', 'false', 'SHMRPS', 'imgs/seafoods/seafood9.jpg'),
(44, 3, 'Tahong Medium', 'true', 'THGM', 'imgs/seafoods/seafood10.jpg'),
(45, 3, 'Talakitok Oblong', 'true', 'TLKTKO', 'imgs/seafoods/seafood11.jpg'),
(46, 3, 'Tawilis', 'true', 'TWLS', 'imgs/seafoods/seafood12.jpg'),
(47, 3, 'Tilapia', 'true', 'TILP', 'imgs/seafoods/seafood13.jpg'),
(48, 3, 'Squid Medium', 'true', 'SQDMD', 'imgs/seafoods/seafood14.jpg'),
(49, 3, 'Yellow Fin', 'true', 'YLLWFN', 'imgs/seafoods/seafood15.jpg'),
(50, 4, 'Beef Brisket Cubes', 'true', 'BFBRTCB', 'imgs/meats/meat1.jpg'),
(51, 4, 'Beef Buto Buto', 'true', 'BFBTBT', 'imgs/meats/meat2.jpg'),
(52, 4, 'Beef Ribeye', 'true', 'BFRBY', 'imgs/meats/meat3.jpg'),
(53, 4, 'Beef Sirloin Strips', 'true', 'BFSRNSTRP', 'imgs/meats/meat4.jpg'),
(54, 4, 'Chicken Breast', 'true', 'CHCKBRST', 'imgs/meats/meat5.jpg'),
(55, 4, 'Chicken Drumstick', 'true', 'CHCKDRMST', 'imgs/meats/meat6.jpg'),
(56, 4, 'Chicken Quarter Cut', 'true', 'CHCKQTCT', 'imgs/meats/meat7.jpg'),
(57, 4, 'Chicken Wings', 'false', 'CHCKWNGS', 'imgs/meats/meat8.jpg'),
(58, 4, 'Pork Chop', 'true', 'PRKCHP', 'imgs/meats/meat9.jpg'),
(59, 4, 'Pork Front Pata Sliced', 'true', 'PRKFPSLC', 'imgs/meats/meat10.jpg'),
(60, 4, 'Pork Liempo Slices', 'true', 'PRKLSLC', 'imgs/meats/meat11.jpg'),
(61, 4, 'Pork Tenderloin Cubes', 'true', 'PRKTCBS', 'imgs/meats/meat12.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `productweights`
--

CREATE TABLE `productweights` (
  `productWeightID` int(4) NOT NULL,
  `productID` int(4) NOT NULL,
  `name` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productweights`
--

INSERT INTO `productweights` (`productWeightID`, `productID`, `name`, `code`, `price`) VALUES
(1, 1, '1KG', 'W-1KG', 494),
(2, 1, '3KG', 'W-3KG', 1406),
(3, 1, '5KG', 'W-5KG', 2220),
(4, 2, '1KG', 'W-1KG', 317),
(5, 2, '3KG', 'W-3KG', 903),
(6, 2, '5KG', 'W-5KG', 1425),
(7, 3, '1KG', 'W-1KG', 1500),
(8, 3, '3KG', 'W-3KG', 4275),
(9, 3, '5KG', 'W-5KG', 6750),
(10, 4, '1KG', 'W-1KG', 164),
(11, 4, '3KG', 'W-3KG', 466),
(12, 4, '5KG', 'W-5KG', 734),
(13, 5, '1KG', 'W-1KG', 77),
(14, 5, '3KG', 'W-3KG', 219),
(15, 5, '5KG', 'W-5KG', 345),
(16, 6, '1KG', 'W-1KG', 100),
(17, 6, '3KG', 'W-3KG', 283),
(18, 6, '5KG', 'W-5KG', 447),
(19, 7, '1KG', 'W-1KG', 659),
(20, 7, '3KG', 'W-3KG', 1875),
(21, 7, '5KG', 'W-5KG', 2965),
(22, 8, '1KG', 'W-1KG', 500),
(23, 8, '3KG', 'W-3KG', 1022),
(24, 8, '5KG', 'W-5KG', 1611),
(25, 9, '1KG', 'W-1KG', 845),
(26, 9, '3KG', 'W-3KG', 2404),
(27, 9, '5KG', 'W-5KG', 3803),
(28, 10, '1KG', 'W-1KG', 229),
(29, 10, '3KG', 'W-3KG', 655),
(30, 10, '5KG', 'W-5KG', 1032),
(31, 11, '1KG', 'W-1KG', 317),
(32, 11, '3KG', 'W-3KG', 903),
(33, 11, '5KG', 'W-5KG', 1425),
(34, 12, '1KG', 'W-1KG', 288),
(35, 12, '3KG', 'W-3KG', 818),
(36, 12, '5KG', 'W-5KG', 1294),
(37, 13, '1KG', 'W-1KG', 288),
(38, 13, '3KG', 'W-3KG', 818),
(39, 13, '5KG', 'W-5KG', 1294),
(40, 14, '1KG', 'W-1KG', 310),
(41, 14, '3KG', 'W-3KG', 884),
(42, 14, '5KG', 'W-5KG', 1395),
(43, 15, '1KG', 'W-1KG', 138),
(44, 15, '3KG', 'W-3KG', 392),
(45, 15, '5KG', 'W-5KG', 619),
(46, 16, '1KG', 'W-1KG', 132),
(47, 16, '3KG', 'W-3KG', 378),
(48, 16, '5KG', 'W-5KG', 595),
(49, 17, '250G', 'W-250G', 83),
(50, 17, '500G', 'W-500G', 165),
(51, 17, '1KG', 'W-1KG', 297),
(52, 18, '250G', 'W-250G', 99),
(53, 18, '500G', 'W-500G', 188),
(54, 18, '1KG', 'W-1KG', 356),
(55, 19, '250G', 'W-250G', 139),
(56, 19, '500G', 'W-500G', 264),
(57, 19, '1KG', 'W-1KG', 500),
(58, 20, '250G', 'W-250G', 199),
(59, 20, '500G', 'W-500G', 378),
(60, 20, '1KG', 'W-1KG', 716),
(61, 21, '250G', 'W-250G', 45),
(62, 21, '500G', 'W-500G', 86),
(63, 21, '1KG', 'W-1KG', 162),
(64, 22, '250G', 'W-250G', 50),
(65, 22, '500G', 'W-500G', 99),
(66, 22, '1KG', 'W-1KG', 178),
(67, 23, '250G', 'W-250G', 265),
(68, 23, '500G', 'W-500G', 504),
(69, 23, '1KG', 'W-1KG', 954),
(70, 24, '250G', 'W-250G', 80),
(71, 24, '500G', 'W-500G', 159),
(72, 24, '1KG', 'W-1KG', 286),
(73, 25, '250G', 'W-250G', 68),
(74, 25, '500G', 'W-500G', 135),
(75, 25, '1KG', 'W-1KG', 243),
(76, 26, '250G', 'W-250G', 80),
(77, 26, '500G', 'W-500G', 159),
(78, 26, '1KG', 'W-1KG', 286),
(79, 27, '250G', 'W-250G', 65),
(80, 27, '500G', 'W-500G', 124),
(81, 27, '1KG', 'W-1KG', 234),
(82, 28, '250G', 'W-250G', 65),
(83, 28, '500G', 'W-500G', 124),
(84, 28, '1KG', 'W-1KG', 234),
(85, 29, '250G', 'W-250G', 99),
(86, 29, '500G', 'W-500G', 188),
(87, 29, '1KG', 'W-1KG', 356),
(88, 30, '250G', 'W-250G', 138),
(89, 30, '500G', 'W-500G', 275),
(90, 30, '1KG', 'W-1KG', 495),
(91, 31, '250G', 'W-250G', 49),
(92, 31, '500G', 'W-500G', 93),
(93, 31, '1KG', 'W-1KG', 176),
(94, 32, '250G', 'W-250G', 65),
(95, 32, '500G', 'W-500G', 124),
(96, 32, '1KG', 'W-1KG', 234),
(97, 33, '250G', 'W-250G', 38),
(98, 33, '500G', 'W-500G', 75),
(99, 33, '1KG', 'W-1KG', 135),
(100, 34, '250G', 'W-250G', 238),
(101, 34, '500G', 'W-500G', 451),
(102, 34, '1KG', 'W-1KG', 855),
(103, 35, '500G', 'W-500G', 375),
(104, 35, '1KG', 'W-1KG', 713),
(105, 35, '3KG', 'W-3KG', 2025),
(106, 36, '500G', 'W-500G', 178),
(107, 36, '1KG', 'W-1KG', 338),
(108, 36, '3KG', 'W-3KG', 959),
(109, 37, '500G', 'W-500G', 345),
(110, 37, '1KG', 'W-1KG', 656),
(111, 37, '3KG', 'W-3KG', 1863),
(112, 38, '500G', 'W-500G', 118),
(113, 38, '1KG', 'W-1KG', 224),
(114, 38, '3KG', 'W-3KG', 635),
(115, 39, '500G', 'W-500G', 285),
(116, 39, '1KG', 'W-1KG', 542),
(117, 39, '3KG', 'W-3KG', 1539),
(118, 40, '500G', 'W-500G', 275),
(119, 40, '1KG', 'W-1KG', 523),
(120, 40, '3KG', 'W-3KG', 1485),
(121, 41, '500G', 'W-500G', 375),
(122, 41, '1KG', 'W-1KG', 713),
(123, 41, '3KG', 'W-3KG', 2025),
(124, 42, '500G', 'W-500G', 445),
(125, 42, '1KG', 'W-1KG', 846),
(126, 42, '3KG', 'W-3KG', 2403),
(127, 43, '500G', 'W-500G', 425),
(128, 43, '1KG', 'W-1KG', 807),
(129, 43, '3KG', 'W-3KG', 2295),
(130, 44, '500G', 'W-500G', 120),
(131, 44, '1KG', 'W-1KG', 227),
(132, 44, '3KG', 'W-3KG', 647),
(133, 45, '500G', 'W-500G', 393),
(134, 45, '1KG', 'W-1KG', 746),
(135, 45, '3KG', 'W-3KG', 2123),
(136, 46, '500G', 'W-500G', 165),
(137, 46, '1KG', 'W-1KG', 314),
(138, 46, '3KG', 'W-3KG', 891),
(139, 47, '500G', 'W-500G', 113),
(140, 47, '1KG', 'W-1KG', 214),
(141, 47, '3KG', 'W-3KG', 608),
(142, 48, '500G', 'W-500G', 373),
(143, 48, '1KG', 'W-1KG', 708),
(144, 48, '3KG', 'W-3KG', 2010),
(145, 49, '500G', 'W-500G', 313),
(146, 49, '1KG', 'W-1KG', 594),
(147, 49, '3KG', 'W-3KG', 1688),
(148, 50, '500G', 'W-500G', 325),
(149, 50, '1KG', 'W-1KG', 618),
(150, 50, '3KG', 'W-3KG', 878),
(151, 51, '500G', 'W-500G', 265),
(152, 51, '1KG', 'W-1KG', 504),
(153, 51, '3KG', 'W-3KG', 716),
(154, 52, '500G', 'W-500G', 398),
(155, 52, '1KG', 'W-1KG', 756),
(156, 52, '3KG', 'W-3KG', 2145),
(157, 53, '500G', 'W-500G', 365),
(158, 53, '1KG', 'W-1KG', 694),
(159, 53, '3KG', 'W-3KG', 986),
(160, 54, '500G', 'W-500G', 148),
(161, 54, '1KG', 'W-1KG', 280),
(162, 54, '3KG', 'W-3KG', 797),
(163, 55, '500G', 'W-500G', 148),
(164, 55, '1KG', 'W-1KG', 280),
(165, 55, '3KG', 'W-3KG', 797),
(166, 56, '500G', 'W-500G', 148),
(167, 56, '1KG', 'W-1KG', 280),
(168, 56, '3KG', 'W-3KG', 797),
(169, 57, '500G', 'W-500G', 148),
(170, 57, '1KG', 'W-1KG', 280),
(171, 57, '3KG', 'W-3KG', 797),
(172, 58, '500G', 'W-500G', 275),
(173, 58, '1KG', 'W-1KG', 523),
(174, 58, '3KG', 'W-3KG', 743),
(175, 59, '500G', 'W-500G', 268),
(176, 59, '1KG', 'W-1KG', 508),
(177, 59, '3KG', 'W-3KG', 1442),
(178, 60, '500G', 'W-500G', 279),
(179, 60, '1KG', 'W-1KG', 530),
(180, 60, '3KG', 'W-3KG', 753),
(181, 61, '500G', 'W-500G', 295),
(182, 61, '1KG', 'W-1KG', 560),
(183, 61, '3KG', 'W-3KG', 797);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `productweights`
--
ALTER TABLE `productweights`
  ADD PRIMARY KEY (`productWeightID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `productweights`
--
ALTER TABLE `productweights`
  MODIFY `productWeightID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
