-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: prod
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `parentId` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(30) DEFAULT NULL,
  `flexData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Top Cosmetics',NULL,NULL,'2022-09-08 14:27:45',NULL,'2022-09-09 14:27:45',NULL,NULL),(2,'Editor\'s Favorite Housewares',NULL,NULL,'2022-09-09 14:27:45',NULL,'2022-09-09 14:27:45',NULL,NULL),(3,'Top 100 in Supermarket',NULL,NULL,'2022-09-09 14:27:45',NULL,'2022-09-09 14:27:45',NULL,NULL),(4,'Today Picks',NULL,NULL,'2022-09-09 14:27:45',NULL,'2022-09-09 14:27:45',NULL,NULL),(5,'Top in Japan',1,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(6,'Top in Korea',1,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(7,'Top in US',1,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(8,'Latest Chairs',2,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(9,'Colouful Tables',2,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(10,'Latest Utensils',2,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(11,'All Meats',3,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL),(12,'Soft Drinks',3,NULL,'2022-09-09 14:30:05',NULL,'2022-09-09 14:30:05',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `rolesId` int DEFAULT '2',
  `username` varchar(100) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(30) DEFAULT NULL,
  `expiredAt` datetime DEFAULT NULL,
  `flexData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'apple','chan',2,'applechan',NULL,NULL,'2022-09-10 15:58:48',NULL,'2022-09-10 15:58:48',NULL,NULL,NULL),(2,'calvin','law',1,'calvinlaw',NULL,NULL,'2022-09-10 15:58:48',NULL,'2022-09-10 15:58:48',NULL,NULL,NULL);
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `html` text,
  `categoryId` int DEFAULT NULL,
  `imageUrlList` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(30) DEFAULT NULL,
  `flexData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'face wash 50ml',NULL,5,NULL,'2022-09-09 15:06:02',NULL,'2022-09-09 15:06:02',NULL,NULL),(2,'SKII face wash 50 ml',NULL,NULL,NULL,'2022-09-09 15:06:02',NULL,'2022-09-09 15:06:02',NULL,NULL),(3,'Beef Australia 500g',NULL,11,NULL,'2022-09-09 15:06:02',NULL,'2022-09-09 15:06:02',NULL,NULL),(4,'ABC Cream Soda 500 ml',NULL,12,NULL,'2022-09-09 15:06:02',NULL,'2022-09-09 15:06:02',NULL,NULL),(8,'face wash 50mls',NULL,5,NULL,'2022-09-10 07:05:59',NULL,'2022-09-10 07:05:59',NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotion`
--

DROP TABLE IF EXISTS `promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(30) DEFAULT NULL,
  `flexData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotion`
--

LOCK TABLES `promotion` WRITE;
/*!40000 ALTER TABLE `promotion` DISABLE KEYS */;
/*!40000 ALTER TABLE `promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(30) DEFAULT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(30) DEFAULT NULL,
  `flexData` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user',NULL,'2022-09-10 15:21:17',NULL,'2022-09-10 15:21:17',NULL,NULL),(2,'admin',NULL,'2022-09-10 15:21:17',NULL,'2022-09-10 15:21:17',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-12 17:55:30
