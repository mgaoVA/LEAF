DROP DATABASE IF EXISTS leaf_portal_tracking;
CREATE DATABASE leaf_portal_tracking;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Create table `file_location`
--
DROP TABLE IF EXISTS leaf_portal_tracking.`file_location`;
CREATE TABLE leaf_portal_tracking.`file_location` (
    `location_id` int(10) unsigned NOT NULL AUTO_INCREMENT
        primary key,
    `location_hash` varchar(255) NOT NULL,
    `location_info` text NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

--
-- Create table `file_types`
--
DROP TABLE IF EXISTS leaf_portal_tracking.`file_types`;
CREATE TABLE leaf_portal_tracking.`file_types` (
    `type_id` int(10) unsigned NOT NULL AUTO_INCREMENT
       primary key,
    `name` varchar(80) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

--
-- Create table `file_uploads`
--
DROP TABLE IF EXISTS leaf_portal_tracking.`file_uploads`;
CREATE TABLE leaf_portal_tracking.`file_uploads` (
    `file_id` int(10) unsigned NOT NULL AUTO_INCREMENT
        primary key,
    `name` text NOT NULL,
    `size_bytes` int(11) NOT NULL,
    `type` int(10) unsigned NOT NULL,
    `location_id` int(10) unsigned NOT NULL,
    `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
    `last_updated` timestamp NOT NULL DEFAULT current_timestamp(),
    `upload_user` varchar(25) NOT NULL,
    CONSTRAINT `fk_file_location`
        FOREIGN KEY (location_id) REFERENCES leaf_portal_tracking.file_location (location_id),
    CONSTRAINT `fk_file_type`
        FOREIGN KEY (type) REFERENCES leaf_portal_tracking.file_types (type_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

COMMIT;

