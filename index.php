<?php
//Code from WorkShop10 
//Run the autoloader
require_once __DIR__ . "/vendor/autoload.php";

session_start();
//create google client
$client = new Google\Client();
//
$client->setAuthConfig("client_secret.json");

$client->addScope("https://www.googleapis.com/auth/userinfo.email");

if (isset($_SESSION["access_token"]) && $_SESSION["access_token"]) {
    $client->setAccessToken($_SESSION["access_token"]);

    echo "<h1> Authorised User</h1>";
    echo "<p>Only users who have had their google sign in credentials are authorised to see this page.</p>";
	echo "<p>Oauth translates user sign in to tokens. This token is then matched to a user account within the application and and provides acces to the website or application. </p>";
	echo "<p>OAuth 2.0 allows users to share specific data with an application while keeping their usernames, passwords, and other 
	information private. For example, an application can use OAuth 2.0 to obtain permission from users to store files in their Google Drives.  </p> ";
	echo "<p> </p>";
	echo "<p></p>";
	echo "<p></p>";
	echo "<p>The source code used has been developed by expanding on what was taught within the workshops</p>";
	echo "<p>https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow</p>";
	echo "<p>http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js</p>";
	echo "<p>http://maps.googleapis.com/maps/api/</p>";
	echo "<p>http://api.geonames.org/</p>";
	
    echo "<form action='index.php' method='post'>
			<input type='submit' name='signOut' value ='Sign Out'/>
			</form>";
} else {
    $redirect_uri = "http://w19012185.eastus.cloudapp.azure.com/oauth2callback.php";
    header("Location: " . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}
if ($_SERVER["REQUEST_METHOD"] == "POST" and isset($_POST["signOut"])) {
    $client->revokeToken($_SESSION["access_token"]);

    session_destroy();

    $redirect = "http://w19012185.eastus.cloudapp.azure.com/index.html";
    header("Location: " . filter_var($redirect, FILTER_SANITIZE_URL));
}

?>