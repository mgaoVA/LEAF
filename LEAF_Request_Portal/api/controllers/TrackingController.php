<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

require '../sources/PortalTracker.php';

if (!class_exists('XSSHelpers'))
{
    include_once dirname(__FILE__) . '/../../../libs/php-commons/XSSHelpers.php';
}

class TrackingController extends RESTfulResponse
{
    public $index = array();

    private $API_VERSION = 1;    // Integer

    private $db_track;
    private $login;
    private $tracker;

    /**
     * Purpose: Tracking API Construct
     * @param $db_tracking
     * @param $login
     */
    public function __construct($db_tracking, $login)
    {
        $this->db_track = $db_tracking;
        $this->login = $login;
        $this->tracker = new PortalTracker($db_tracking, $login);
    }

    /**
     * Purpose: Set get api for tracker
     * @param array $act
     * @return mixed|string
     * @throws Exception
     */
    public function get($act)
    {
        $tracker = $this->tracker;

        $this->index['GET'] = new ControllerMap();
        $cm = $this->index['GET'];

        // Get tracker version
        $this->index['GET']->register('tracker/version', function () {
            return $this->API_VERSION;
        });

        /**
         * FILE TRACKING SECTION
         */

        // Get file
        $this->index['GET']->register('tracker/file/[digit]', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);
            $getFile['access_user'] = $this->login->getUserId();

            return $this->tracker->getFile($getFile);
        });

        // Get all file info
        $this->index['GET']->register('tracker/file/[digit]/data', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileData($getFile);
        });

        // Get file name
        $this->index['GET']->register('tracker/file/[digit]/name', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileName($getFile);
        });

        // Get file size
        $this->index['GET']->register('tracker/file/[digit]/size', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileSize($getFile);
        });

        // Get file type
        $this->index['GET']->register('tracker/file/[digit]/type', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileType($getFile);
        });

        // Get file location
        $this->index['GET']->register('tracker/file/[digit]/location', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileLocation($getFile);
        });

        // Get date file created
        $this->index['GET']->register('tracker/file/[digit]/created', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileCreatedDate($getFile);
        });

        // Get date file updated
        $this->index['GET']->register('tracker/file/[digit]/updated', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileLastUpdatedDate($getFile);
        });

        // Get user who uploaded file information
        $this->index['GET']->register('tracker/file/[digit]/uploader', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileUploader($getFile);
        });

        // Get file storage status
        $this->index['GET']->register('tracker/file/[digit]/storage/status', function ($args) use ($tracker) {
            $getFile = array();

            $getFile['file_id'] = (int)($args[0]);

            return $this->tracker->getFileStorageStatus($getFile);
        });

        return $this->index['GET']->runControl($act['key'], $act['args']);
    }

    /**
     * Purpose: Tracker POST API registers
     * @param array $act
     * @return mixed|string
     */
    public function post($act) {

        $tracker = $this->tracker;

        /**
         * FILE POST ACTIONS
         */

        // Add file
        $this->index['POST']->register('tracker/file/add', function ($args) use ($tracker) {
            $newFile = array();
            // Get info about file before we pass to function
            $newFile['file'] = $_POST['file'];
            $newFile['type'] = XSSHelpers::xssafe($_POST['type']);
            $newFile['name'] = XSSHelpers::scrubFilename($_POST['name']);
            $newFile['access_user'] = $this->login->getUserId();

            return $tracker->addFile($newFile);
        });

        // Search for file
        $this->index['POST']->register('tracker/file/search', function ($args) use ($tracker) {
            $searchFile = array();
            // Get info about search
            $searchFile['name'] = XSSHelpers::xssafe($_POST['name']);
            $searchFile['type'] = XSSHelpers::xssafe($_POST['type']);
            $searchFile['location'] = XSSHelpers::xssafe($_POST['location']);
            $searchFile['access_user'] = XSSHelpers::xssafe($_POST['user_id']);

            return $tracker->searchForFile($searchFile);
        });

        // Move file
        $this->index['POST']->register('tracker/file/move', function ($args) use ($tracker) {
            $newLocation = array();

            $newLocation['file_id'] = (int)($_POST['file_id']);
            $newLocation['new_location'] = XSSHelpers::xssafe($_POST['new_location']);
            $newLocation['access_user'] = $this->login->getUserId();

            if (!empty($newLocation)) {
                return $tracker->moveFile($newLocation);
            } else {
                return false;
            }
        });

        // Update file and it's attributes (will track in file_access table)
        $this->index['POST']->register('tracker/file/update', function ($args) use ($tracker) {
            $updateFile = array();

            $updateFile['file_id'] = XSSHelpers::scrubFilename($_POST['file_id']);
            $updateFile['file'] = XSSHelpers::scrubFilename($_POST['file']);
            $updateFile['name'] = XSSHelpers::scrubFilename($_POST['name']);
            $updateFile['size'] = (int)($_POST['size']);
            $updateFile['type'] = XSSHelpers::xssafe(($_POST['type']));
            $updateFile['location'] = XSSHelpers::xssafe($_POST['location']);
            $updateFile['access_user'] = $this->login->getUserId();

             if (!empty($updateFile)) {
                return $tracker->updateFile($updateFile);
            } else {
                return false;
            }
        });

        // Update file storage status
        // Update file and it's attributes (will track in file_access table)
        $this->index['POST']->register('tracker/file/storage', function ($args) use ($tracker) {
            $storageFile = array();

            $storageFile['file_id'] = XSSHelpers::scrubFilename($_POST['file_id']);
            $storageFile['storage_status'] = XSSHelpers::xssafe($_POST['storage_status']);
            $storageFile['access_user'] = $this->login->getUserId();

            if (!empty($storageFile)) {
                return $tracker->modifyStorageOfFile($storageFile);
            } else {
                return false;
            }
        });

        return $this->index['POST']->runControl($act['key'], $act['args']);
    }

    /**
     * Purpose: Tracker DELETE API registers
     * @param array $act
     * @return mixed|string
     */
    public function delete($act) {

        $tracker = $this->tracker;

        // delete file
        $this->index['DELETE']->register('tracker/file/delete', function ($args) use ($tracker) {
            $deleteFile = array();

            $deleteFile['file_id'] = XSSHelpers::scrubFilename($_POST['file_id']);
            $deleteFile['access_user'] = $this->login->getUserId();

            if (!empty($deleteFile)) {
                return $tracker->deleteFile($deleteFile);
            } else {
                return false;
            }
        });

        return $this->index['DELETE']->runControl($act['key'], $act['args']);
    }
}