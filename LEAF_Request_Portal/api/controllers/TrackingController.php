<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

require_once '../../classes/PortalTracker.php';

if (!class_exists('XSSHelpers')) {
    include_once dirname(__FILE__) . '/../../../libs/php-commons/XSSHelpers.php';
}

class TrackingController extends RESTfulResponse
{
    public $index = array();

    private $API_VERSION = 1;

    private $tracker;

    private $login;

    public function __construct($db, $login)
    {
        $this->tracker = new PortalTracker($db, $login);
        $this->login = $login;
    }

    public function get($act)
    {
        $tracker = $this->tracker;

        $this->index['GET'] = new ControllerMap();
        $this->index['GET']->register('tracker/version', function () {
            return $this->API_VERSION;
        });

        $this->index['GET']->register('tracker/upload/types', function ($args) use ($tracker) {
            $result = $tracker->getAllUploadFileTypes();

            // $result[$i]['categoryID'] = XSSHelpers::xscrub($result[$i]['categoryID']);

            return $result;
        });

}