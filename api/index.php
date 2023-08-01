<?php
/*
Index that calls all the config files and changes the endpoint created based on the path name 

@Author James Fishleigh
*/
header("Content-Type: Application/json; charsetUTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
} 
define('SECRET', "i^^4Gw[l:#L],bmV@vF%?eXg(=J6yn"); 

include 'config/config.php';


if (!in_array($_SERVER['REQUEST_METHOD'], array("POST", "GET"))) {
    http_response_code(405);
    $output['error'] = $_SERVER['REQUEST_METHOD'] . " method not allowed";
}else{
$url=$_SERVER['REQUEST_URI'];
$path = parse_url($url)['path'];
 $path = str_replace("project/api","",$path);
try{
	switch($path){
			case '/base':
			case '/base':
			$endpoint = new Base();
			break;
			case '//devices':
			case '/device':
			$endpoint = new Devices();
			break;
				case '//auth':
			case '/auth':
			$endpoint = new Authentication();
			break;
			case '//tarrif':
			case '/tarrifs':
			$endpoint = new Tarrif();
			break;
			case '//signup':
			case '/signup':
			$endpoint = new SignUp();
			break;
		default:
			$endpoint = new ClientError("Path not found: " . $path, 404);
		}
	}
	catch(clientErrorException $e){
	$endpoint = new ClientError($e->getMessage(), $e->getCode());}
}
 
$response = $endpoint->getData();
echo json_encode($response);




?>