<?php
/*
 * As a work of the United States government, this project is in the public domain within the United States.
 */

/*
    Index for everything
    Date: September 11, 2007

*/

error_reporting(E_ALL & ~E_NOTICE);

if (false)
{
    echo '<img src="../libs/dynicons/?img=dialog-error.svg&amp;w=96" alt="error" style="float: left" /><div style="font: 36px verdana">Site currently undergoing maintenance, will be back shortly!</div>';
    exit();
}

include __DIR__ . '/globals.php';
include __DIR__ . '/../libs/smarty/Smarty.class.php';
include __DIR__ . '/sources/Login.php';
include __DIR__ . '/db_mysql.php';

if (!class_exists('XSSHelpers'))
{
    include_once dirname(__FILE__) . '/../libs/php-commons/XSSHelpers.php';
}

header('X-UA-Compatible: IE=edge');

$db = new DB($config->dbHost, $config->dbUser, $config->dbPass, $config->dbName);

$login = new Orgchart\Login($db, $db);

$login->loginUser();
if (!$login->isLogin() || !$login->isInDB())
{
    echo 'Your login is not recognized.';
    exit;
}

$post_name = isset($_POST['name']) ? $_POST['name'] : '';
$post_password = isset($_POST['password']) ? $_POST['password'] : '';

$main = new Smarty;
$main->template_dir = __DIR__."/templates/";
$main->compile_dir = __DIR__."/templates_c/";
$t_login = new Smarty;
$t_login->template_dir = __DIR__."/templates/";
$t_login->compile_dir = __DIR__."/templates_c/";
$t_menu = new Smarty;
$t_menu->template_dir = __DIR__."/templates/";
$t_menu->compile_dir = __DIR__."/templates_c/";
$o_login = '';
$o_menu = '';
$tabText = '';

$action = isset($_GET['a']) ? XSSHelpers::xscrub($_GET['a']) : '';

function customTemplate($tpl)
{
    return file_exists("./templates/custom_override/{$tpl}") ? "custom_override/{$tpl}" : $tpl;
}

$main->assign('logo', '<img src="images/VA_icon_small.png" style="width: 80px" alt="VA logo" />');

$t_login->assign('name', XSSHelpers::sanitizeHTML($login->getName()));

$main->assign('useDojo', true);
$main->assign('useDojoUI', true);

switch ($action) {
    case 'navigator_service':
        require __DIR__ . '/sources/Group.php';
        $group = new Orgchart\Group($db, $login);
        $_GET['rootID'] = $group->getGroupLeader((int)$_GET['groupID']);
        // no break
    case 'navigator':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $main->assign('useDojoUI', false);

        $main->assign('javascripts', array('../libs/js/jsPlumb/dom.jsPlumb-min.js',
                                           'js/ui/position.js', ));
        require __DIR__ . '/sources/Position.php';
        $position = new Orgchart\Position($db, $login);

        $rootID = isset($_GET['rootID']) ? (int)$_GET['rootID'] : $position->getTopSupervisorID(1);
        $t_form->assign('rootID', $rootID);
        $t_form->assign('topPositionID', (int)$position->getTopSupervisorID(1));
        $t_form->assign('header', XSSHelpers::sanitizeHTML($_GET['header']));

        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
        $HTTP_HOST = XSSHelpers::sanitizeHTML(HTTP_HOST);
        $qrcodeURL = "{$protocol}://{$HTTP_HOST}" . urlencode($_SERVER['REQUEST_URI']);
        $main->assign('qrcodeURL', $qrcodeURL);
        $main->assign('stylesheets', array('css/editor.css'));
        $main->assign('stylesheets_print', array('css/editor_printer.css'));
        $main->assign('body', $t_form->fetch('navigator.tpl'));

        $tabText = '';

        break;
    case 'editor':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $main->assign('useDojoUI', true);

        $main->assign('javascripts', array('../libs/js/jsPlumb/dom.jsPlumb-min.js',
                                           'js/dialogController.js',
                                           'js/ui/position.js',
                                           'js/positionSelector.js', ));
        require __DIR__ . '/sources/Position.php';
        $position = new Orgchart\Position($db, $login);

        $rootID = isset($_GET['rootID']) ? (int)$_GET['rootID'] : 0;
        $t_form->assign('rootID', $rootID);
        $t_form->assign('topPositionID', (int)$position->getTopSupervisorID(1));
        $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);

        $t_form->assign('resolvedService', $position->getService($rootID));

        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http';
        $scrubbedHost = XSSHelpers::sanitizeHTML(HTTP_HOST);
        $qrcodeURL = "{$protocol}://{$scrubbedHost}" . urlencode($_SERVER['REQUEST_URI']);
        $main->assign('qrcodeURL', $qrcodeURL);
        $main->assign('stylesheets', array('css/editor.css',
                                           'css/positionSelector.css', ));
        $main->assign('stylesheets_print', array('css/editor_printer.css'));
        $main->assign('body', $t_form->fetch('editor.tpl'));

        $tabText = '';

        break;
    case 'view_employee':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);

        $main->assign('javascripts', array('js/nationalEmployeeSelector.js',
                                           'js/orgchartForm.js',
                                           'js/dialogController.js',
                                           'js/groupSelector.js',
                                           'js/positionSelector.js', ));
        $main->assign('stylesheets', array('css/view_employee.css',
                                           'css/view_position.css',
                                           'css/view_group.css',
                                           'css/employeeSelector.css',
                                           'css/groupSelector.css',
                                           'css/positionSelector.css', ));

        $empUID = isset($_GET['empUID']) ? (int)$_GET['empUID'] : 0;
        if ($empUID != 0)
        {
            require __DIR__ . '/sources/Employee.php';
            $employee = new Orgchart\Employee($db, $login);
            $summary = $employee->getSummary($empUID);

            $t_form->assign('empUID', $empUID);
            $t_form->assign('summary', $summary);
            $t_form->assign('groups', $employee->listGroups($empUID));
            $t_form->assign('userID', $_SESSION['userID']);
            $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
            $t_form->assign('is_admin', $login->getMembership()['groupID'][1]);

            $t_form->assign('ERM_site_resource_management', Orgchart\Config::$ERM_Sites['resource_management']);

            if (count($summary['employee']) > 0)
            {
                $main->assign('body', $t_form->fetch('view_employee.tpl'));
            }
            else
            {
                $main->assign('body', 'Employee does not exist');
            }
        }

        $tabText = 'Employee';

        break;
    case 'view_position':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);

        $main->assign('javascripts', array('js/nationalEmployeeSelector.js',
                                           'js/orgchartForm.js',
                                           'js/dialogController.js',
                                           'js/groupSelector.js',
                                           'js/positionSelector.js', ));
        $main->assign('stylesheets', array('css/view_position.css',
                                           'css/employeeSelector.css',
                                           'css/groupSelector.css',
                                           'css/positionSelector.css', ));

        $positionID = isset($_GET['positionID']) ? (int)$_GET['positionID'] : 0;
        if ($positionID != 0)
        {
            require __DIR__ . '/sources/Position.php';
            $position = new Orgchart\Position($db, $login);

            $summary = $position->getSummary($positionID);
            $t_form->assign('positionID', $positionID);
            $t_form->assign('positionSummary', $summary);
            $t_form->assign('positionPrivileges', $position->getUserPrivileges($positionID));
            $t_form->assign('groups', $position->listGroups($positionID));
            $t_form->assign('numEmployees', count($summary['employeeList']));
            //$t_form->assign('tags', $position->getAllTags($positionID));
            $t_form->assign('userID', $_SESSION['userID']);
            $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
            $t_form->assign('userDomain', $login->getDomain());
            $t_form->assign('ERM_site_resource_management', Orgchart\Config::$ERM_Sites['resource_management']);

            if (count($summary) > 0)
            {
                $main->assign('body', $t_form->fetch('view_position.tpl'));
            }
            else
            {
                $main->assign('body', 'Position does not exist');
            }
        }

        $tabText = 'Position #' . $positionID;

        break;
    case 'view_group':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);

        $main->assign('javascripts', array('js/positionSelector.js',
                                           'js/orgchartForm.js',
                                           'js/dialogController.js',
                                           'js/nationalEmployeeSelector.js', ));
        $main->assign('stylesheets', array('css/view_group.css',
                                           'css/positionSelector.css',
                                           'css/employeeSelector.css', ));

        $groupID = isset($_GET['groupID']) ? (int)$_GET['groupID'] : 0;
        if ($groupID != 0)
        {
            require __DIR__ . '/sources/Group.php';
            require __DIR__ . '/sources/Tag.php';
            $group = new Orgchart\Group($db, $login);
            $tag = new Orgchart\Tag($db, $login);
            $resGroup = $group->getGroup($groupID);
            $t_form->assign('groupID', $groupID);
            $t_form->assign('group', $resGroup);
            $t_form->assign('groupLeader', $group->getGroupLeader($groupID));
            $t_form->assign('groupPrivileges', $group->getUserPrivileges($groupID));
            $t_form->assign('tags', $group->getAllTags($groupID));
            $t_form->assign('tag_hierarchy', $tag->getAll());
            $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
            $t_form->assign('userDomain', $login->getDomain());

            if (count($resGroup) > 0)
            {
                $main->assign('body', $t_form->fetch('view_group.tpl'));
            }
            else
            {
                $main->assign('body', 'Group does not exist');
            }
        }

        $tabText = 'Group viewer';

        break;
    case 'browse_employee':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/employeeSelector.js', 'js/dialogController.js', 'js/orgchartForm.js'));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                                           'css/view_employee.css', ));
        $empUID = isset($_GET['empUID']) ? (int)$_GET['empUID'] : 0;

        require __DIR__ . '/sources/Employee.php';
        $employee = new Orgchart\Employee($db, $login);

        $t_form->assign('empUID', $empUID);
        $t_form->assign('summary', $employee->getSummary($empUID));
        $t_form->assign('userID', $_SESSION['userID']);
        $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);

        $main->assign('body', $t_form->fetch('browse_employee.tpl'));

        $tabText = 'Employees';

        break;
    case 'browse_position':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/positionSelector.js', 'js/dialogController.js', 'js/orgchartForm.js'));
        $main->assign('stylesheets', array('css/positionSelector.css',
                                           'css/view_position.css', ));
        $main->assign('body', $t_form->fetch('browse_position.tpl'));

        $tabText = 'Positions';

        break;
    case 'browse_group':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/groupSelector.js', 'js/dialogController.js', 'js/orgchartForm.js'));
        $main->assign('stylesheets', array('css/groupSelector.css',
                                           'css/view_group.css', ));
        $main->assign('body', $t_form->fetch('browse_group.tpl'));

        $tabText = 'Groups';

        break;
    case 'browse_search':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/employeeSelector.js',
                                           'js/positionSelector.js',
                                           'js/groupSelector.js',
                                           'js/dialogController.js',
                                           'js/orgchartForm.js', ));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                                           'css/view_employee.css',
                                           'css/positionSelector.css',
                                           'css/view_position.css',
                                           'css/groupSelector.css',
                                           'css/view_group.css', ));
        $main->assign('body', $t_form->fetch('browse_search.tpl'));

        $tabText = 'Search';

        break;
    case 'view_permissions':
        require __DIR__ . '/sources/Indicators.php';
        $indicators = new Orgchart\Indicators($db, $login);

        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/employeeSelector.js',
                                           'js/positionSelector.js',
                                           'js/groupSelector.js',
                                           'js/dialogController.js',
                                           'js/orgchartForm.js', ));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                                           'css/view_employee.css',
                                           'css/positionSelector.css',
                                           'css/view_position.css',
                                           'css/groupSelector.css',
                                           'css/view_group.css', ));

        $indicatorArray = $indicators->getIndicator((int)$_GET['indicatorID']);
        $indicatorArray = array_map('XSSHelpers::sanitizeHTML', $indicatorArray);

        $privilegesArray = $indicators->getPrivileges((int)$_GET['indicatorID']);
        foreach ($privilegesArray as $key => $val)
        {
            $privilegesArray[$key] = array_map('XSSHelpers::sanitizeHTML', $privilegesArray[$key]);
        }

        $t_form->assign('indicatorID', (int)$_GET['indicatorID']);
        $t_form->assign('UID', (int)$_GET['UID']);
        $t_form->assign('indicator', $indicatorArray);
        $t_form->assign('permissions', $privilegesArray);
        $t_form->assign('CSRFToken', XSSHelpers::xscrub($_SESSION['CSRFToken']));
        $main->assign('body', $t_form->fetch('view_permissions.tpl'));

        $tabText = 'Permission Editor';

        break;
    case 'view_group_permissions':
        require __DIR__ . '/sources/Group.php';
        $group = new Orgchart\Group($db, $login);

        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/employeeSelector.js',
                'js/positionSelector.js',
                'js/groupSelector.js',
                'js/dialogController.js',
                'js/orgchartForm.js', ));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                'css/view_employee.css',
                'css/positionSelector.css',
                'css/view_position.css',
                'css/groupSelector.css',
                'css/view_group.css', ));

        $groupID = isset($_GET['groupID']) ? (int)$_GET['groupID'] : 0;
        $t_form->assign('groupID', $groupID);
        $t_form->assign('groupTitle', $group->getTitle($groupID));
        $t_form->assign('permissions', $group->getPrivileges($groupID));
        $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
        $main->assign('body', $t_form->fetch('view_group_permissions.tpl'));

        $tabText = 'Permission Editor';

        break;
    case 'view_position_permissions':
        require __DIR__ . '/sources/Position.php';
        $position = new Orgchart\Position($db, $login);

        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        //$main->assign('useDojoUI', true);
        $main->assign('javascripts', array('js/employeeSelector.js',
                'js/positionSelector.js',
                'js/groupSelector.js',
                'js/dialogController.js',
                'js/orgchartForm.js', ));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                'css/view_employee.css',
                'css/positionSelector.css',
                'css/view_position.css',
                'css/groupSelector.css',
                'css/view_group.css', ));

        $positionID = isset($_GET['positionID']) ? (int)$_GET['positionID'] : 0;
        $t_form->assign('positionID', $positionID);
        $t_form->assign('positionTitle', $position->getTitle($positionID));
        $t_form->assign('permissions', $position->getPrivileges($positionID));
        $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
        $main->assign('body', $t_form->fetch('view_position_permissions.tpl'));

        $tabText = 'Permission Editor';

        break;
    case 'admin':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $main->assign('javascripts', array('js/employeeSelector.js',
                                            'js/positionSelector.js',
                                            'js/groupSelector.js',
                                            'js/dialogController.js',
                                            'js/orgchartForm.js', ));
        $main->assign('stylesheets', array('css/employeeSelector.css',
                                            'css/view_employee.css',
                                            'css/positionSelector.css',
                                            'css/view_position.css',
                                            'css/groupSelector.css',
                                            'css/view_group.css', ));

        $memberships = $login->getMembership();
        if (isset($memberships['groupID'][1]))
        {
            $main->assign('body', $t_form->fetch('view_admin.tpl'));
        }
        else
        {
            $main->assign('body', 'You require System Administrator level access to view this section.');
        }

        $tabText = 'System Administration';

        break;
    case 'summary':
            $t_form = new Smarty;
            $t_form->left_delimiter = '<!--{';
            $t_form->right_delimiter = '}-->';

            $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);

            $main->assign('body', $t_form->fetch(customTemplate('view_summary.tpl')));

        break;
    case 'about':
        $t_form = new Smarty;
        $t_form->left_delimiter = '<!--{';
        $t_form->right_delimiter = '}-->';

        $rev = $db->prepared_query("SELECT * FROM settings WHERE setting='dbversion'", array());
        $t_form->assign('dbversion', XSSHelpers::xscrub($rev[0]['data']));

        $main->assign('hideFooter', true);
        $main->assign('body', $t_form->fetch('view_about.tpl'));

        break;
    default:
//        $main->assign('useDojo', false);
        if ($login->isLogin())
        {
            $o_login = $t_login->fetch('login.tpl');

            $t_form = new Smarty;
            $t_form->template_dir = __DIR__."/templates/";
            $t_form->compile_dir = __DIR__."/templates_c/";
            $t_form->left_delimiter = '<!--{';
            $t_form->right_delimiter = '}-->';

            require __DIR__ . '/sources/Employee.php';
            $employee = new Orgchart\Employee($db, $login);
            require __DIR__ . '/sources/Position.php';
            $position = new Orgchart\Position($db, $login);

            $currentEmployee = $employee->lookupLogin($login->getUserID());
            $t_form->assign('employee', $currentEmployee);

            $employeePositions = $employee->getPositions($currentEmployee[0]['empUID']);

            $t_form->assign('employeePositions', $employeePositions);

            $resolvedService = $position->getService($employeePositions[0]['positionID']);
            $groupLeader = '';
            if (count($resolvedService) > 0)
            {
                require __DIR__ . '/sources/Group.php';
                $group = new Orgchart\Group($db, $login);

                $groupLeader = $group->getGroupLeader($resolvedService[0]['groupID']);
            }
            $t_form->assign('groupLeader', $groupLeader);

            $t_form->assign('is_admin', $login->getMembership()['groupID'][1]);

            $main->assign('javascripts', array('js/employeeSelector.js',
                                               'js/positionSelector.js',
                                               'js/groupSelector.js',
                                               'js/dialogController.js',
                                               'js/orgchartForm.js', ));
            $main->assign('stylesheets', array('css/employeeSelector.css',
                                               'css/view_employee.css',
                                               'css/positionSelector.css',
                                               'css/view_position.css',
                                               'css/groupSelector.css',
                                               'css/view_group.css', ));

            $t_form->assign('userID', $_SESSION['userID']);
            $t_form->assign('CSRFToken', $_SESSION['CSRFToken']);
            $main->assign('body', $t_form->fetch(customTemplate('view_homepage.tpl')));

            if ($action != 'menu' && $action != '')
            {
                $main->assign('status', 'The page you are looking for does not exist or may have been moved. Please update your bookmarks.');
            }
        }
        else
        {
            $t_login->assign('name', '');
            $main->assign('status', 'Your login session has expired, You must log in again.');
        }
        $o_login = $t_login->fetch('login.tpl');

        break;
}

$memberships = $login->getMembership();
$t_menu->assign('action', XSSHelpers::xscrub($action));
$t_menu->assign('isAdmin', $memberships['groupID'][1]);
$main->assign('login', $t_login->fetch('login.tpl'));
$o_menu = $t_menu->fetch('menu.tpl');
$main->assign('menu', $o_menu);
$tabText = $tabText == '' ? '' : $tabText . '&nbsp;';
$main->assign('tabText', $tabText);

$settings = $db->query_kv('SELECT * FROM settings', 'setting', 'data');
$main->assign('title', XSSHelpers::sanitizeHTMLRich($settings['heading'] == '' ? $config->title : $settings['heading']));
$main->assign('city', XSSHelpers::sanitizeHTMLRich($settings['subheading'] == '' ? $config->city : $settings['subheading']));
$main->assign('revision', XSSHelpers::xscrub($settings['version']));

if (!isset($_GET['iframe']))
{
    $main->display('main.tpl');
}
else
{
    $main->display('main_iframe.tpl');
}
