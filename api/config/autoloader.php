<?php
function autoloader($className) {
    $filename = "api\\" . strtolower($className) . ".php";
    $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
    if (is_readable($filename)) {
        include_once $filename;
    } else {
        exit("File not found: " . $className . " (" . $filename . ")");
    }
}