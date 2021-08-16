<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
   Portal Tracker
   Purpose: API to track file upload, access, and other parameters

*/
include_once __DIR__ . '/../../libs/smarty/Smarty.class.php';
require_once 'UploadFile.php';
require_once '../VAMC_Directory.php';

class PortalTracker
{
    private $db;
    private $login;
    private $uploadFile;

    public function __construct($db, $login)
    {
        $this->db = $db;
        $this->login = $login;
        $this->uploadFile = new UploadFile($db, $login);
    }

}