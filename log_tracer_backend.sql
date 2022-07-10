-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: log_tracer_backend
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calendriers`
--

DROP TABLE IF EXISTS `calendriers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendriers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendriers`
--

LOCK TABLES `calendriers` WRITE;
/*!40000 ALTER TABLE `calendriers` DISABLE KEYS */;
/*!40000 ALTER TABLE `calendriers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrats`
--

DROP TABLE IF EXISTS `contrats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrats` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `terms` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrats`
--

LOCK TABLES `contrats` WRITE;
/*!40000 ALTER TABLE `contrats` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `incidents`
--

DROP TABLE IF EXISTS `incidents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `incidents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sujet` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_contrat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_serie_machine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_prestation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `issue_duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raison_issue_duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raison_assignation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priorite` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nature` enum('incident','intervention','autre') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'incident',
  `origine` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_tel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `incidents`
--

LOCK TABLES `incidents` WRITE;
/*!40000 ALTER TABLE `incidents` DISABLE KEYS */;
INSERT INTO `incidents` VALUES (1,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-21 12:00:00',NULL),(2,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-22 09:00:00',NULL),(3,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-22 09:00:00',NULL),(4,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-20 12:00:00',NULL),(5,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','fermé','en cours','basse','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-19 09:00:00',NULL),(6,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-18 09:00:00',NULL),(7,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-12 12:00:00',NULL),(8,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-13 09:00:00',NULL),(9,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-14 09:00:00',NULL),(10,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-15 12:00:00',NULL),(11,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','fermé','en cours','basse','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-16 09:00:00',NULL),(12,'visite curative','panne/serveur','maintenance systeme','444567','oolkj-9880-p','payante','5','','','','fermé','en cours','moyenne','intervention','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-17 09:00:00',NULL),(13,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','fermé','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-21 12:00:00',NULL),(15,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-22 09:00:00',NULL),(16,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-20 12:00:00',NULL),(17,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-19 09:00:00',NULL),(18,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-18 09:00:00',NULL),(19,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-12 12:00:00',NULL),(20,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-13 09:00:00',NULL),(21,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-14 09:00:00',NULL),(22,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-15 12:00:00',NULL),(23,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-16 09:00:00',NULL),(24,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-17 09:00:00',NULL),(25,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-21 12:00:00',NULL),(26,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-22 09:00:00',NULL),(28,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-20 12:00:00',NULL),(29,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-19 09:00:00',NULL),(30,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-18 09:00:00',NULL),(32,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-13 09:00:00',NULL),(33,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-14 09:00:00',NULL),(34,'panne serveur','panne/serveur','panne locale','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','haute','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-15 12:00:00',NULL),(35,'incident callcenter','panne/serveur','panne locale/surcharge','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','basse','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-16 09:00:00',NULL),(36,'Stockage cni server','panne/serveur','Stockage server down ','444567','oolkj-9880-p','payante','5','','','','ouvert','en cours','moyenne','incident','surcharge','CNI','55385474','cni@gmail.com','lotfi',1,'2022-04-17 09:00:00',NULL),(42,'panne generale steg sousse','Application/Software/Bios','generateur surchaufe','jjygghh-op','gjgjgj-_556','payante',NULL,NULL,NULL,NULL,'ouvert','initial','haute','incident','negligence','steg','55385474','steg@gmail.com','faysal',2,NULL,'2022-04-23 13:19:09');
/*!40000 ALTER TABLE `incidents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interventions`
--

DROP TABLE IF EXISTS `interventions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interventions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_serie_machine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom_machine` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raison_issue_duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `raison_assignation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priorite` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interventions`
--

LOCK TABLES `interventions` WRITE;
/*!40000 ALTER TABLE `interventions` DISABLE KEYS */;
/*!40000 ALTER TABLE `interventions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(8,'2019_08_19_000000_create_failed_jobs_table',1),(9,'2019_12_14_000001_create_personal_access_tokens_table',1),(10,'2022_03_16_073009_create_incidents_table',1),(11,'2022_03_16_123803_create_clients_table',1),(12,'2022_03_16_124604_create_contrats_table',1),(13,'2022_03_16_124641_create_reclamations_table',1),(14,'2022_04_21_075616_create_interventions_table',1),(15,'2022_04_21_084352_create_validations_table',1),(16,'2022_04_21_085350_create_calendriers_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `client_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` VALUES ('05b8ea92488360d2b1c43905eade11b0d72c757fe4de2f46c458e67f7600a2bb33fe1b4d95d3859e',1,1,'authToken','[]',0,'2022-05-24 22:08:59','2022-05-24 22:08:59','2023-05-24 23:08:59'),('10f2a03fbd7c544656fe0a9d4c339dc27b6b8d68dbaf7168f1a31fd74ffae1d259bdbdf1c24bd7d2',2,1,'authToken','[]',0,'2022-04-22 09:17:36','2022-04-22 09:17:36','2023-04-22 10:17:36'),('1454c2b886ef7c8eb63f1d2995b2dca83848824f9805a41d951d316d14467296e04ae7e240230b69',2,1,'authToken','[]',0,'2022-05-25 20:08:30','2022-05-25 20:08:30','2023-05-25 21:08:30'),('1c355cd3385271a6739dcc5cd3488b74fd49a0d804d33d95743ec02c1d48813be1649e7befd0af3b',2,1,'authToken','[]',0,'2022-04-23 13:07:36','2022-04-23 13:07:36','2023-04-23 14:07:36'),('2421dd351f2939bf9276d37b619181934b11fb93182fb004320730d2f6626b600b59daf1508d21fa',2,1,'authToken','[]',0,'2022-04-22 09:15:49','2022-04-22 09:15:49','2023-04-22 10:15:49'),('2b09baa068428727902cc9326bd534ccb82dff805995c4d7d7737c6c40bde367eeca73f0dbe39386',2,1,'authToken','[]',0,'2022-05-24 18:25:30','2022-05-24 18:25:30','2023-05-24 19:25:30'),('2daa2552657d2f7866bd3ee9f2f6ae0d1448095fedc6097399c360d6a4f29f7576f2bfbcf6d55cdd',2,1,'authToken','[]',0,'2022-04-22 07:06:22','2022-04-22 07:06:22','2023-04-22 08:06:22'),('31e23c8c127c6b22198bd9d009d7f0c0cf57b3c37ed704f6993266aef3044c4aca727e48c4f3f168',2,1,'authToken','[]',0,'2022-04-23 13:47:54','2022-04-23 13:47:54','2023-04-23 14:47:54'),('38eff16af608bcdf17172a544b60b72ef1f85c09533b30d77ceebcf87ad4d69095f9d5068ab1c88e',2,1,'authToken','[]',0,'2022-04-23 13:48:20','2022-04-23 13:48:20','2023-04-23 14:48:20'),('473343ca6d7035a0ac3716488d4f6ceb1ce9c8093c40cdf62919791e7058a8658576d6a84a2cf4a3',2,1,'authToken','[]',0,'2022-05-25 20:04:37','2022-05-25 20:04:37','2023-05-25 21:04:37'),('49aef9757e337e8c620773af16ba7a9e47bb54208a3de711042654c9a3d0c5bbcc81f7bd1e12cc1b',2,1,'authToken','[]',0,'2022-04-23 11:08:37','2022-04-23 11:08:37','2023-04-23 12:08:37'),('5a62a37c98901dc3349b8ba55f0700690b0782320eddbb1d5089c6cff0bfa1a012e9563df3ef119e',2,1,'authToken','[]',0,'2022-04-23 07:12:50','2022-04-23 07:12:50','2023-04-23 08:12:50'),('664310aa888db9e0bb15d44d6996ac6ec37432547d8e3d88257b3709c512ca4fe297bd1cd2c9ebaa',2,1,'authToken','[]',0,'2022-05-25 19:57:48','2022-05-25 19:57:48','2023-05-25 20:57:48'),('670ec98eb655ed2c1f66bcfe2fca97563cbc16c56d5dc26bd70ceb182e67f4d2a1a3b910dc79906a',2,1,'authToken','[]',0,'2022-04-22 09:15:18','2022-04-22 09:15:18','2023-04-22 10:15:18'),('78095a94b9c23d516077f4d139721f49c8dafb3bd4dedcc8487c0147557ae093b6943ebcfdd4a55a',2,1,'authToken','[]',0,'2022-05-23 16:25:17','2022-05-23 16:25:17','2023-05-23 17:25:17'),('78fa7aa965efe484e592d1f87cbea1111b7d94d4bb72ac2786ebd8d9d1af2f891579a139dd2832c1',2,1,'authToken','[]',0,'2022-05-25 20:11:52','2022-05-25 20:11:52','2023-05-25 21:11:52'),('79df5cdbdb8dca8d26e36ab4c52e259f4ba489110b1de1d68d39bc4ddca5f0ae4e11bf7322a0f48b',1,1,'authToken','[]',0,'2022-05-25 20:11:37','2022-05-25 20:11:37','2023-05-25 21:11:37'),('906254947a5aebfd51fe6e9a76ee651de473f3f28209e8bb1fe443c2ad39dccb340f80eb45b2cb15',2,1,'authToken','[]',0,'2022-05-25 19:58:01','2022-05-25 19:58:01','2023-05-25 20:58:01'),('9beaa619de3e967c34361bdd40465960e195622a42e8fec3d0f6394bb937a3c0df8c314eb944c203',2,1,'authToken','[]',0,'2022-04-22 12:32:43','2022-04-22 12:32:43','2023-04-22 13:32:43'),('a16f90561f87747b211f80f184cf0e50e02eb24cdf02e248f51bc9e189099d834fe033878ae6a992',1,1,'authToken','[]',0,'2022-05-25 20:29:55','2022-05-25 20:29:55','2023-05-25 21:29:55'),('c6f29602aa3f80b21e0ef5b3fd36101d6da3e00d51a22aa977c72f28ded22778c35592d80c6b937c',2,1,'authToken','[]',0,'2022-05-23 20:23:56','2022-05-23 20:23:56','2023-05-23 21:23:56'),('cae120791557775d019a2764cabbae3a98d5659e5dc6707ae0ad2d35b0ce5b4a99b81443f3d2c52b',1,1,'authToken','[]',0,'2022-05-25 19:58:21','2022-05-25 19:58:21','2023-05-25 20:58:21'),('ce30b71e1bed2b74a63f557c6bccf81c3972ce171f643d14a70bb2ba13c76664bfbe40d3f859b1ec',2,1,'authToken','[]',0,'2022-04-22 16:16:36','2022-04-22 16:16:36','2023-04-22 17:16:36'),('ced7b425b9c021726346cd631b86ad0ffe577ba60fb1c753bc812603a0cc2ddc5b7b77526a24e976',1,1,'authToken','[]',0,'2022-04-22 07:05:18','2022-04-22 07:05:18','2023-04-22 08:05:18'),('d213ab06306c2633782072a01091dc4e0b0c37d39143d44ef0115160d5148dad9afdb347619065c7',2,1,'authToken','[]',0,'2022-05-25 21:22:15','2022-05-25 21:22:15','2023-05-25 22:22:15'),('e0349609927cd4d87c3fc3bdd70966dd8261212d1e6d50127c6792d72a16b6c1bf1033bf0e7f1ee3',2,1,'authToken','[]',0,'2022-04-22 07:21:47','2022-04-22 07:21:47','2023-04-22 08:21:47'),('e098afac81d610ad5425d8c61b950c3596516a5796270371a6d412b13aab152a04e4a993bcc84031',2,1,'authToken','[]',0,'2022-05-24 18:59:25','2022-05-24 18:59:25','2023-05-24 19:59:25'),('e236ac4406ff97ff539e846bf215d2b9c0bda5549f09694629d741ee6003ee5260b28623c6278534',2,1,'authToken','[]',0,'2022-04-22 09:09:10','2022-04-22 09:09:10','2023-04-22 10:09:10'),('e6b5f9840d19ff4b47477405dbebade24101cc016a2af224b986e18931501ec1e3e72e3cb20362de',2,1,'authToken','[]',0,'2022-04-23 04:30:28','2022-04-23 04:30:28','2023-04-23 05:30:28'),('ea2893c96bad39e06650c2d3553418062aa01dc7fcc425f80568102cf3a86aa2b736f84705440784',1,1,'authToken','[]',0,'2022-05-25 20:00:46','2022-05-25 20:00:46','2023-05-25 21:00:46'),('ed07cbda26cd57045a3a678d6b6ade94ab748cb18985ccdca3c39567dacd440e2b36c479a24b2cb1',2,1,'authToken','[]',0,'2022-04-23 13:08:06','2022-04-23 13:08:06','2023-04-23 14:08:06'),('f6c03f197cd932f52467a73fe69fb72aa21993ebb0884be448de8f39c71b98ac4a0885129e483cdb',2,1,'authToken','[]',0,'2022-05-23 17:03:37','2022-05-23 17:03:37','2023-05-23 18:03:37'),('f815cadceee294b5b8e06617597d219bea21da193d1a7c4824b63e7483569f8abca95411d420a1b3',1,1,'authToken','[]',0,'2022-05-25 20:08:39','2022-05-25 20:08:39','2023-05-25 21:08:39'),('fb060c2fc600f0f094db5a8145a21d9591a540aaf156c10538685bc30dacd2510bb2ad4988b36104',2,1,'authToken','[]',0,'2022-04-23 11:12:03','2022-04-23 11:12:03','2023-04-23 12:12:03'),('ff1e25f57d816adc8ba332fda2abc012b4cdf9f0bab04f9e5859991c362ff8a934421e753e7efe9c',2,1,'authToken','[]',0,'2022-04-23 13:21:55','2022-04-23 13:21:55','2023-04-23 14:21:55');
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Laravel Personal Access Client','tYUel2EeGAeCf8LfIHZTNRe8xyv8N7KmFosgWzdH',NULL,'http://localhost',1,0,0,'2022-04-22 06:54:23','2022-04-22 06:54:23'),(2,NULL,'Laravel Password Grant Client','HOGnyQk4yJClNJPpLNLlzV8XAInS5OkRkmI17RPT','users','http://localhost',0,1,0,'2022-04-22 06:54:24','2022-04-22 06:54:24');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2022-04-22 06:54:24','2022-04-22 06:54:24');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamations`
--

DROP TABLE IF EXISTS `reclamations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamations`
--

LOCK TABLES `reclamations` WRITE;
/*!40000 ALTER TABLE `reclamations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reclamations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taches`
--

DROP TABLE IF EXISTS `taches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taches` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taches`
--

LOCK TABLES `taches` WRITE;
/*!40000 ALTER TABLE `taches` DISABLE KEYS */;
/*!40000 ALTER TABLE `taches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` enum('candy','globalnet','autre') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'globalnet',
  `phone1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Marwa','Hasnaoui','marwa@gmail.com','2022-04-01 23:00:00','$2y$10$7TZvZk7o9tUmIRLjyKXbXebPn1wC2VHtGKAHc0RW4MrASdd5OpDe2','tunis','user','globalnet','55385474',NULL,NULL,'2022-04-22 07:05:17','2022-04-22 07:05:17'),(2,'Oumayma','Ben Khelif','oumayma@gmail.com','2022-04-01 23:00:00','$2y$10$BPAb3KqP644Hfs5WmJcMLeBPGBfT7173UIcAcl0cTH6fJ3ZPyx3Wa','tunis','admin','globalnet','55385474',NULL,NULL,'2022-04-22 07:06:22','2022-04-22 07:06:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `validations`
--

DROP TABLE IF EXISTS `validations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `validations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `validations`
--

LOCK TABLES `validations` WRITE;
/*!40000 ALTER TABLE `validations` DISABLE KEYS */;
/*!40000 ALTER TABLE `validations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-25 23:53:18
