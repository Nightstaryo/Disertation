<?php
/*
Endpoint is used by other classes to query the database by initialising the sql 

 @author James Fishleigh
*/
abstract class Endpoint 
{
    private $data;
    private $sql;
    private $sqlParams;

    public function __construct() {
/* Connect to db*/
        $db = new Database("db/db.db");
        $this->initialiseSQL();
	/* Set data from database querry*/
        $data = $db->executeSQL($this->sql, $this->sqlParams);
 
/*Put data in array for Json */
        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }
	
 /*Function to set SQL querry*/
    protected function setSQL($sql) {
        $this->sql = $sql;
    }
	 protected function getSQL() {
        return $this->sql;
    }
 
    protected function setSQLParams($params) {
        $this->sqlParams = $params;
    }
	protected function getSQLParams() {
        return $this->sqlParams;
    }
	/*Function for other classes to set SQL*/
    protected function initialiseSQL() {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }
 
 
    protected function setData($data) {
        $this->data = $data;
    }
 
    public function getData() {
        return $this->data;
    }
}
?>