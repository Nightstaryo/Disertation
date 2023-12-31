<?php



class SignUp extends Endpoint{

    //Stores hashedPassword
    private $hashPassword;

    public function __construct(){

        //Connects to the DB
        $db = new Database("db/db.db");

        //Checks the request method is POST for security
        $this->validateRequestMethod("POST");

        //Check information is present
        $this->validateUserParameters();

        //Check if the user alreay exists
        $this->checkUserExists($db);

        //Hashes the password
        $this->hashPassword();

        //Initialise the SQL and query the DB
        $this->initialiseSQL();
        $queryResults = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        //Set the data to the query results
        $this->setData( array(
            "length" => 0,
            "message" => "Success",
            "data" => $queryResults
        ));

    }

    //Checks request method, if not POST return Client error exception with 405
    private function validateRequestMethod($method) {
        if ($_SERVER['REQUEST_METHOD'] != $method){
            throw new ClientErrorException("Invalid Request Method", 405);
        }
    }

    //Check all fileds are supplied and not empty, if error call 401
    private function validateUserParameters(){
        if (!isset($_POST['username']) 
	|| !isset($_POST['password'])) {
  
            throw new ClientErrorException("Missing Data", 401);
        }
        if (empty($_POST['username']) 
        || empty($_POST['password']))
      {
            throw new ClientErrorException("Data Empty", 401);
        }
    }

    //Runs SQL to check if the username is alreay used, if so return 401
    private function checkUserExists($db){
        $sql = "SELECT * FROM users WHERE username = :username";
        $this->setSQL($sql);
        $this->setSQLParams(['username'=>$_POST['username']]);
        $queryResults = $db->executeSQL($this->getSQL(), $this->getSQLParams());
        if(count($queryResults) > 0){
            throw new ClientErrorException("User Already Exists", 401);
        }
    }

    //Hashes the password
    private function hashPassword(){
        $this->hashPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
    }

    //Initialise the SQL to upload the new user into the DB
    protected function initialiseSQL(){
        $sql = "INSERT INTO users (username, password)
        VALUES (:username, :pass)";
        $this->setSQL($sql);
        $this->setSQLParams([
            'username'=>$_POST['username'],
            'pass'=>$this->hashPassword,
        ]);
    }
}