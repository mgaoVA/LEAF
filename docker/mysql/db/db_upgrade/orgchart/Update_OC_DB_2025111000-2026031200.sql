START TRANSACTION;


ALTER TABLE `employee` CHANGE `userName` `userName` varchar(255) NOT NULL AFTER `empUID`;
ALTER TABLE `employee_data` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;
ALTER TABLE `employee_data_history` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;
ALTER TABLE `group_data` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;

ALTER TABLE `group_data_history` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;
ALTER TABLE `position_data` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;
ALTER TABLE `position_data_history` CHANGE `author` `author` varchar(255) NOT NULL AFTER `data`;
ALTER TABLE `relation_employee_backup` CHANGE `approverUserName` `approverUserName` varchar(255) NOT NULL AFTER `approved`;


UPDATE `settings` SET `data` = '2026031200' WHERE `settings`.`setting` = 'dbversion';


COMMIT;


/**** Revert DB *****
START TRANSACTION;

ALTER TABLE `employee` CHANGE `userName` `userName` varchar(50) NOT NULL AFTER `empUID`;
ALTER TABLE `employee_data` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;
ALTER TABLE `employee_data_history` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;
ALTER TABLE `group_data` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;

ALTER TABLE `group_data_history` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;
ALTER TABLE `position_data` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;
ALTER TABLE `position_data_history` CHANGE `author` `author` varchar(50) NOT NULL AFTER `data`;
ALTER TABLE `relation_employee_backup` CHANGE `approverUserName` `approverUserName` varchar(50) NOT NULL AFTER `approved`;

UPDATE `settings` SET `data` = '2025111000' WHERE `settings`.`setting` = 'dbversion';

COMMIT;
*/