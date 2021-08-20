<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

require '../classes/PortalTracker.php';

if (!class_exists('XSSHelpers'))
{
    include_once dirname(__FILE__) . '/../../../libs/php-commons/XSSHelpers.php';
}

class TrackingController extends RESTfulResponse
{
    public $index = array();

    private $API_VERSION = 1;    // Integer

    private $db;
    private $login;
    private $tracker;

    /**
     * Purpose: Tracking API Construct
     * @param $db
     * @param $login
     */
    public function __construct($db, $login)
    {
        $this->db = $db;
        $this->login = $login;
        $this->tracker = new PortalTracker($db, $login);
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

        // Get file search

        // Get all file info

        // Get file name

        // Get file size

        // Get file type

        // Get file location

        // Get date file created

        // Get date file updated

        // Get user who uploaded file information

        // Get file storage status

        return $this->index['GET']->runControl($act['key'], $act['args']);
    }

    /**
     * Purpose: Tracker POST API registers
     * @param array $act
     * @return mixed|string
     */
    public function post($act) {

        $tracker = $this->tracker;
        $login = $this->login;

        /**
         * FILE POST ACTIONS
         */

        // Add file
        $this->index['POST']->register('tracker/file/add', function ($args) use ($tracker) {
            $newFile = array();
            // Get info about file before we pass to function
            $newFile['file'] = $_POST['file'];
            $newFile['type'] = $_POST['type'];
            $newFile['name'] = XSSHelpers::scrubFilename($_POST['name']);


            return $this->tracker->addFile($newFile);
        });

        // Move file

        // Update file and/or file attributes

        // Update file storage status

        return $this->index['POST']->runControl($act['key'], $act['args']);
    }

    /**
     * Purpose: Tracker DELETE API registers
     * @param array $act
     * @return mixed|string
     */
    public function delete($act) {

        /**
         * FILE DELETE ACTIONS
         */

        // delete file

        return $this->index['DELETE']->runControl($act['key'], $act['args']);
    }
}