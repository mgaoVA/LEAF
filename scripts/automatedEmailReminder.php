<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('timebracketcmd.php');
echo date('Y-m-d g:i:s a') . "\r\n";

try {

    // in the future stuff like this will be spun off through a different program.
    // Until then to keep thinks straight forward this could be done in individual files to be called.
    $test = new TimeBracketCmd('automatedEmailReminder.php');

    //$test->setRunAtExactTime('6 am');
    $test->setSleepTime(10);
    $test->run();
    echo 'end';
    echo date('Y-m-d g:i:s a') . "\r\n";

} catch (Exception $e) {
    echo sprintf("Message: %s \r\nFile: %s \r\nLine: %s \r\nTrace: %s\r\n", $e->getMessage(), $e->getFile(), $e->getLine(), $e->getTraceAsString());
}
