<?php

$currDir = dirname(__FILE__);

include_once $currDir . '/../db_mysql.php';
include_once $currDir . '/../db_config.php';

require_once $currDir . '/../Email.php';
require_once $currDir . '/../VAMC_Directory.php';

// this is here until we fully test
ini_set('display_errors',1);
error_reporting(E_ALL);

// copied from FormWorkflow.php just to get us moved along.
$protocol = 'https';
$siteRoot = "{$protocol}://" . HTTP_HOST . dirname($_SERVER['REQUEST_URI']) . '/';

// allow us to control if this is in days or minutes
if (!empty($_GET['minutes'])) {
    $timeAdjustment = 60;
} else {
    $timeAdjustment = 60 * 60 * 24;
}

// this was what the random function I found used.
$comment = '';

$db_config = new DB_Config();
$db = new DB($db_config->dbHost, $db_config->dbUser, $db_config->dbPass, $db_config->dbName);
$getWorkflowStepsSQL = 'SELECT workflowID, stepID,stepTitle,stepData
FROM workflow_steps WHERE stepData LIKE \'%"AutomateEmailGroup":"true"%\';';
$getWorkflowStepsRes = $db->prepared_query($getWorkflowStepsSQL, []);

// do we have automated notification setup here
if (empty($getWorkflowStepsRes)) {
    // @todo: need to look at how other scripts output
    echo "No automated emails setup! \r\n";
    exit();
}
echo date('Y-m-d H:i:s')."\r\n";
// go over the selected events
foreach ($getWorkflowStepsRes as $workflowStep) {

    // get our data, we need to see how many days back we need to look.
    $eventDataArray = json_decode($workflowStep['stepData'], true, 3);

    // DateSelected * DaysSelected * what is a day anyway= how many days to bug this person.
    $daysago = $eventDataArray['AutomatedEmailReminders']['DaysSelected'];

    // pass ?current=asdasd to get the present time for testing purposes
    $intialDaysAgoTimestamp = time() - ($daysago * $timeAdjustment);

    echo "Working on step: {$workflowStep['stepID']}, Initial Notification: ".date('Y-m-d H:i:s',$intialDaysAgoTimestamp)."\r\n";

    // step id, I think workflow id is also needed here
    $getRecordVar = [':stepID' => $workflowStep['stepID'], ':lastNotified' => date('Y-m-d H:i:s',$intialDaysAgoTimestamp)];

    // get the records that have not been responded to, had actions taken on, in x amount of time and never been responded to
    $getRecordSql = 'SELECT records.recordID, records.title, records.userID, service 
        FROM records_workflow_state
        JOIN records ON records.recordID = records_workflow_state.recordID
        JOIN services USING(serviceID) 
        WHERE records_workflow_state.stepID = :stepID
        AND lastNotified <= :lastNotified
        AND initialNotificationSent = 0
        AND deleted = 0;';

    $getRecordResInitial = $db->prepared_query($getRecordSql, $getRecordVar);

    // make sure additional days selected is set, this will be a required field moving forward however there is a chance this could not be set.
    if(!empty($eventDataArray['AutomatedEmailReminders']['AdditionalDaysSelected'])) {
        
        $addldaysago = $eventDataArray['AutomatedEmailReminders']['AdditionalDaysSelected'];

        $additionalDaysAgoTimestamp = time() - ($addldaysago * $timeAdjustment);

        echo "Working on step: {$workflowStep['stepID']}, Additional Notification: ".date('Y-m-d H:i:s',$additionalDaysAgoTimestamp)."\r\n";

        // get the other entries
        $getRecordVar = [':stepID' => $workflowStep['stepID'], ':lastNotified' => date('Y-m-d H:i:s',$additionalDaysAgoTimestamp)];

    }

    // get the records that have not been responded to, had actions taken on, in x amount of time and never been responded to
    $getRecordSql = 'SELECT records.recordID, records.title, records.userID, service 
        FROM records_workflow_state
        JOIN records ON records.recordID = records_workflow_state.recordID
        JOIN services USING(serviceID) 
        WHERE records_workflow_state.stepID = :stepID
        AND lastNotified <= :lastNotified
        AND initialNotificationSent = 1
        AND deleted = 0;';

    $getRecordResAfter = $db->prepared_query($getRecordSql, $getRecordVar);

    $getRecordRes = array_merge($getRecordResInitial,$getRecordResAfter);
    // make sure we have records to work with
    if (empty($getRecordRes)) {
        // @todo: need to look at how other scripts output errors
        echo "There are no records to be notified for this step! \r\n";
        continue;
    }

    // go through each and send an email
    foreach ($getRecordRes as $record) {
        // send the email
        $email = new Email();

        // ive seen examples using the attachApproversAndEmail method and some had smarty vars and some did not.
        $title = strlen($record['title']) > 45 ? substr($record['title'], 0, 42) . '...' : $record['title'];

        // add in variables for the smarty template
        $email->addSmartyVariables(array(
            "daysSince" => $daysago,
            "truncatedTitle" => $title,
            "fullTitle" => $record['title'],
            "recordID" => $record['recordID'],
            "service" => $record['service'],
            "stepTitle" => $workflowStep['stepTitle'],
            "comment" => $comment,
            "siteRoot" => $siteRoot
        ));

        // need to get the emails sending to make sure this actually works!
        $email->attachApproversAndEmail($record['recordID'],\Email::AUTOMATED_EMAIL_REMINDER,$record['userID']);

        // update the notification timestamp, this could be moved to batch, just trying to get a prototype working
        $updateRecordsWorkflowStateVars = [
            ':recordID' => $record['recordID'],
            ':lastNotified' => date('Y-m-d H:i:s')
        ];
        $updateRecordsWorkflowStateSql = 'UPDATE records_workflow_state
                                            SET lastNotified=:lastNotified, initialNotificationSent=1
                                            WHERE recordID=:recordID';
        $db->prepared_query($updateRecordsWorkflowStateSql, $updateRecordsWorkflowStateVars);

        echo "Email sent for {$record['recordID']} \r\n";
    }
}