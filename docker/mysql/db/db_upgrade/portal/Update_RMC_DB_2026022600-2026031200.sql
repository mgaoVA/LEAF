START TRANSACTION;

ALTER TABLE `action_history` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `recordID`;
ALTER TABLE `approvals` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `recordID`;
ALTER TABLE `data` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `timestamp`;
ALTER TABLE `data_extended` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `timestamp`;
ALTER TABLE `data_history` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `timestamp`;

ALTER TABLE `email_tracker` CHANGE `userID` `userID` VARCHAR(255) AFTER `recordID`;
ALTER TABLE `notes` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `timestamp`;
ALTER TABLE `process_query` CHANGE `userID` `userID` VARCHAR(255) AFTER `id`;
ALTER TABLE `records` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `serviceID`;
ALTER TABLE `service_chiefs` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `serviceID`;
ALTER TABLE `service_chiefs` CHANGE `backupID` `backupID` VARCHAR(255) NOT NULL DEFAULT '' AFTER `userID`;

ALTER TABLE `signatures` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `signerPublicKey`;
ALTER TABLE `tags` CHANGE `userID` `userID` VARCHAR(255) NOT NULL AFTER `timestamp`;
ALTER TABLE `users` CHANGE `userID` `userID` VARCHAR(255) NOT NULL;
ALTER TABLE `users` CHANGE `backupID` `backupID` VARCHAR(255) NOT NULL DEFAULT '' AFTER `groupID`;


UPDATE `settings` SET `data` = '2026031200' WHERE `settings`.`setting` = 'dbversion';

COMMIT;


/**** Revert DB *****
START TRANSACTION;

ALTER TABLE `action_history` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `recordID`;
ALTER TABLE `approvals` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `recordID`;
ALTER TABLE `data` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `timestamp`;
ALTER TABLE `data_extended` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `timestamp`;
ALTER TABLE `data_history` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `timestamp`;

ALTER TABLE `email_tracker` CHANGE `userID` `userID` VARCHAR(50) AFTER `recordID`;
ALTER TABLE `notes` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `timestamp`;
ALTER TABLE `process_query` CHANGE `userID` `userID` VARCHAR(50) AFTER `id`;
ALTER TABLE `records` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `serviceID`;
ALTER TABLE `service_chiefs` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `serviceID`;
ALTER TABLE `service_chiefs` CHANGE `backupID` `backupID` VARCHAR(50) NOT NULL DEFAULT '' AFTER `userID`;

ALTER TABLE `signatures` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `signerPublicKey`;
ALTER TABLE `tags` CHANGE `userID` `userID` VARCHAR(50) NOT NULL AFTER `timestamp`;
ALTER TABLE `users` CHANGE `userID` `userID` VARCHAR(50) NOT NULL;
ALTER TABLE `users` CHANGE `backupID` `backupID` VARCHAR(50) NOT NULL DEFAULT '' AFTER `groupID`;


UPDATE `settings` SET `data` = '2026022600' WHERE `settings`.`setting` = 'dbversion';

COMMIT;
*/