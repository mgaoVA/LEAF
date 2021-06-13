<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
    General configuration
    Date: August 9, 2011

    Central place to put org. chart config
    This should be kept outside of web accessible directories
*/

// require '../../../config.php';

// namespace Orgchart;

ini_set('display_errors', 1); // Set to 1 to display errors

define('UPLOAD_LOCATION', getenv('UPLOAD_LOCATION') ?: "./UPLOADS/");

class Config
{
    public $title = 'Organizational Chart';

    public $city = '';

    public $adminLogonName = DATABASE_DB_ADMIN;    // Administrator's logon name

    public $adPath = array('OU=Users,DC=va,DC=gov'); // Active directory paths

    public static $uploadDir = UPLOAD_LOCATION;

    // Directory for user uploads
    // using backslashes (/), with trailing slash

    public static $ERM_Sites = array('resource_management' => ''); // URL to ERM sites with trailing slash

    public $dbHost = DATABASE_HOST;
    public $dbName = DATABASE_DB_DIRECTORY;
    public $dbUser = DATABASE_USERNAME;
    public $dbPass = DATABASE_PASSWORD;

    public function __construct () {        
        error_log("*************  DB: {$this->dbName}  User: {$this->dbUser} Host: {$this->dbHost} ************");
    }
}
