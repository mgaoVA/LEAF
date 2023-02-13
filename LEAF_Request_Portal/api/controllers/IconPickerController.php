<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

require '../sources/IconPicker.php';

if (!class_exists('XSSHelpers'))
{
    include_once dirname(__FILE__) . '/../../../libs/php-commons/XSSHelpers.php';
}

class IconPickerController extends RESTfulResponse
{
    public $index = array();

    private $API_VERSION = 1;    // Integer

    private $iconPicker;

    private $db;

    private $login;

    /**
     * Construct
     * 
     * @param Db $db, Login $login
     */
    public function __construct($db, $login)
    {
        $this->login = $login;
        $this->iconPicker = new IconPicker($db, $login);
    }

    /**
     * Purpose: Return JSON data depending on endpoint string passed.
     * 
     * @param string $act
     * @return array
     */
    public function get($act): array
    {
        $db = $this->db;
        $login = $this->login;
        $iconPicker = $this->iconPicker;

        $this->index['GET'] = new ControllerMap();
        
        $this->index['GET']->register('iconPicker/list', function () use ($iconPicker) {
            return $iconPicker->getAllIcons();
        });
        
        return $this->index['GET']->runControl($act['key'], $act['args']);
    }

    /**
     * Purpose: Return JSON data depending on endpoint string passed.
     * 
     * @param string $act
     * @return array
     */
    // public function post($act): array
    // {
    //     $workflow = $this->iconPicker;

    //     $this->verifyAdminReferrer();

    //     $this->index['POST'] = new ControllerMap();
    //     $this->index['POST']->register('iconpicker', function ($args) {
    //     });

    //     return $this->index['POST']->runControl($act['key'], $act['args']);
    // }
}
