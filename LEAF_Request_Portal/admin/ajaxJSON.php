<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
    JSON index for legacy ajax endpoints
    Date Created: August 13, 2009

*/

error_reporting(E_ALL & ~E_NOTICE);

include __DIR__ . '/../globals.php';
include __DIR__ . '/../Login.php';
include __DIR__ . '/../db_mysql.php';

$db = new DB($db_config->dbHost, $db_config->dbUser, $db_config->dbPass, $db_config->dbName);
$db_phonebook = new DB($config->phonedbHost, $config->phonedbUser, $config->phonedbPass, $config->phonedbName);
unset($db_config);

$login = new Login($db_phonebook, $db);
$login->setBaseDir('../');

$login->loginUser();
if (!$login->checkGroup(1))
{
    echo 'You must be in the administrator group to access this section.';
    exit();
}

$action = isset($_GET['a']) ? $_GET['a'] : '';

switch ($action) {
    case 'mod_groups_getMembers':
        require __DIR__ . '/Group.php';

        $group = new Group($db, $login);

        echo json_encode($group->getMembers($_GET['groupID']));

        break;
    case 'directory_lookup':
        require __DIR__ . '/../VAMC_Directory.php';
        $dir = new VAMC_Directory();
        $results = $dir->search($_GET['query']);

        echo json_encode($results);

        break;
    default:
        /*
        echo "Action: $action<br /><br />Catchall...<br /><br />POST: <pre>";
        print_r($_POST);
        echo "</pre><br /><br />GET:<pre>";
        print_r($_GET);
        echo "</pre><br /><br />FILES:<pre>";
        print_r($_FILES);
        echo "</pre>";
        */
        break;
}
