<?php

function errorHandler($errno, $errstr, $errfile, $errline) {
    $output["message"] = "Error Detected: [$errno] $errstr file: $errfile line: $errline";
    echo json_encode($output);
}

?>