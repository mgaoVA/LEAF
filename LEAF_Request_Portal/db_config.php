<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
    Database config
    Date Created: November 23, 2009

    Central place to put database login information
    This should be kept outside of web accessible directories
*/

// require '../../../db_config.php';

ini_set('display_errors', 0); // Set to 1 to display errors

define('DATABASE_HOST', getenv('MYSQL_ROOT_HOST', true) ?: getenv('DATABASE_HOST'));
define('DATABASE_USERNAME', getenv('MYSQL_USER', true) ?: getenv('DATABASE_USERNAME'));
define('DATABASE_PASSWORD', getenv('MYSQL_PASSWORD', true) ?: getenv('DATABASE_PASSWORD'));
define('DATABASE_DB_DIRECTORY', getenv('MYSQL_DB', true) ?: getenv('DATABASE_DB_DIRECTORY'));
define('DATABASE_DB_ADMIN', getenv('APP_USER', true) ?: 'app_user');

class DB_Config
{
    public $dbHost = DATABASE_HOST;

    public $dbName = 'leaf_portal';

    public $dbUser = DATABASE_USERNAME;

    public $dbPass = DATABASE_PASSWORD;
}

class Config
{
    public $title = 'New LEAF Site';

    public $city = '';

    public $adminLogonName = 'tester';    // Administrator's logon name

    public $adPath = array('OU=myOU,DC=domain,DC=tld'); // Active directory path

    public static $uploadDir = './UPLOADS/';

    // Directory for user uploads
                                             // using backslashes (/), with trailing slash
    public static $orgchartPath = '../LEAF_Nexus'; // HTTP Path to orgchart with no trailing slash

    public static $orgchartImportTags = array('Academy_Demo1'); // Import org chart groups if they match these tags

    public $descriptionID = 16;    // indicator ID for description field

    public static $emailPrefix = 'Resources: ';              // Email prefix

    public static $emailCC = array();    // CCed for every email

    public static $emailBCC = array();    // BCCed for every email

    public $phonedbHost = DATABASE_HOST;

    public $phonedbName = 'leaf_users';

    public $phonedbUser = DATABASE_USERNAME;

    public $phonedbPass = DATABASE_PASSWORD; 
    
}
