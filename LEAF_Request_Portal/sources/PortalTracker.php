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

    /**
     * Purpose: PortalTracker constructor when new created
     * @param $db
     * @param $login
     */
    public function __construct($db, $login) {
        $this->db = $db;
        $this->login = $login;
        $this->uploadFile = new UploadFile($db, $login);
    }

    /**
     * Purpose: Given file ID returns file information array
     * @param array $getFile - contains file_id, access_user
     * @return array - contains TODO
     */
    public function getFile($getFile = array()): array {
        $fileArr = array();

        return $fileArr;
    }

    /**
     * Purpose: Given file information, returns all data related to file
     * @param array $getFile - contains file_id
     * @return array - contains TODO
     */
    public function getFileData($getFile = array()): array {
        $name = '';

        return $name;
    }

    /**
     * Purpose: Given file information, return file name
     * @param array $getFile - contains file_id
     * @return string - string of file name
     */
    public function getFileName($getFile = array()): string {
        $fileName = '';

        return $fileName;
    }

    /**
     * Purpose: Given file information, return integer size of file in bytes
     * @param array $getFile - contains file_id
     * @return int - integer of file byte size (not KB, GB or T)
     */
    public function getFileSize($getFile = array()): int {
        $fileSize = 0;

        return $fileSize;
    }

    /**
     * Purpose: Given file information, return type of file
     * @param array $getFile - contains file_id
     * @return string - string type of file (ex. 'application/pdf')
     */
    public function getFileType($getFile = array()): string {
        $fileType = '';

        return $fileType;
    }

    /**
     * Purpose: Given file informaton, return location of file
     * @param array $getFile - contains file_id
     * @return string - string of file location on server
     */
    public function getFileLocation($getFile = array()): string {
        $fileLocation = '';

        return $fileLocation;
    }

    /**
     * Purpose: Given file information, return file's last updated date
     * @param array $getFile - contains file_id
     * @return DateTime - timestamp of last update date of file
     */
    public function getFileLastUpdatedDate($getFile = array()): DateTime {
        $updateDate = new DateTime();

        return $updateDate;
    }

    /**
     * Purpose: Given file information, return file's original upload user
     * @param array $getFile - contains file_id
     * @return string - string AD user ID of person originally uploaded file
     */
    public function getFileUploader($getFile = array()): string {
        $uploadUser = '';

        return $uploadUser;
    }

    /**
     * Purpose: Given file information, return storage status of given file
     * @param array $getFile - contains file_id
     * @return string - string of current storage status for file
     */
    public function getFileStorageStatus($getFile = array()): string {
        $storageStatus = '';

        return $storageStatus;
    }

    /**
     * Purpose: Given file, add to location on server and record information in DB
     * @param array $newFile - contains file, type, name, access_user
     * @return bool - true if uploaded, false if not
     */
    public function addFile($newFile = array()): bool {

        return true;
    }

    /**
     * Purpose: Given file criteria, return array of
     *          all files' information that fit that criteria
     * @param array $searchFile - contains name, type, location, access_user
     * @return array - array of all files match the criteria submitted
     */
    public function searchForFile($searchFile = array()): array {
        $searchResults = array();

        return $searchResults;
    }

    /**
     * Purpose: Given new location and file information, move file to new location
     * @param array $newLocation - contains: file_id, new_location, access_user
     * @return bool - true if file moved, false if not
     */
    public function moveFile($newLocation = array()): bool {
        $fileMoved = false;

        return $fileMoved;
    }

    /**
     * Purpose: Given file information, update file on server and record new info
     *          If file is new, add file and again record that info
     * @param array $updateFile - contains: file_id, file, name, size,
     *                            type, location, access_user
     * @return bool - true if updated, false if not
     */
    public function updateFile($updateFile = array()): bool {
        $fileUpdated = false;

        return $fileUpdated;
    }

    /**
     * Purpose: Modify the storage status of a file
     * @param array $storageFile - contains: file_id, storage_status, access_user
     * @return bool - true if storage type modified, else false
     */
    public function modifyStorageOfFile($storageFile = array()): bool {
        $storageChanged = false;

        return $storageChanged;
    }

    /**
     * Purpose: Given file information, delete file on servers and mark deleted in DB
     * @param array $deleteFile - contains: file_id, access_user
     * @return bool - true if deleted, false if not
     */
    public function deleteFile($deleteFile = array()): bool {
        $fileDeleted = false;

        return $fileDeleted;
    }


}