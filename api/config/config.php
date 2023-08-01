<?php
 /*
 Loads all the config files
 @Author James Fishleigh
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
 
include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandler');
 
include 'config/errorhandler.php';
set_error_handler('errorHandler');
 
include 'config/autoloader.php';
spl_autoload_register('autoloader');
?>