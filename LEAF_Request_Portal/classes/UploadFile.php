<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
    Upload File Class
*/
include_once __DIR__ . '/../../libs/smarty/Smarty.class.php';
require_once '../VAMC_Directory.php';

class UploadFile
{
    private $db_tracker;
    private $login;

    public $fileId;
    public $fileName;
    public $fileSize;
    public $fileType;
    public $fileLocation; // JSON format
    public $uploadUser;
    public $firstUpload;
    public $lastUpdated;

    public function __construct($db, $login)
    {
        $this->db_tracker = $db;
        $this->login = $login;
        $this->fileId = 0;
        $this->fileName = '';
        $this->fileSize = 0;
        $this->fileType = '';
        $this->fileLocation = 0;
        $this->uploadUser = $login->getUserId();
        $this->firstUpload = time();
        $this->lastUpdated = time();
    }

    public function getAllUploadFileTypes() {
//        $vars = '';
//        $strSQL = "SELECT e.deleted FROM employee as e ".
//            "INNER JOIN employee_data ed on e.empUID = ed.empUID ".
//            "WHERE e.deleted = 0 ".
//            "AND ed.data=:emailAddress";
//        $res = $this->db_tracker->prepared_query($strSQL, $vars);
    }
}