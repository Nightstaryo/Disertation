<?php

/*

@Author James Fishleigh
*/

class Tarrif extends Endpoint
{
  /*Set sql to set from database*/
    protected function initialiseSQL() {
		  $db = new Database("db/db.db");
        $sql = "SELECT tarrif_id,tarrif_time,tarrif_day,tarrif_price
                FROM tarrif
		";
				   $this->setSQL($sql);
        $sqlParams = [];
	if (isset($where)) {
            $sql .= $where;
        }
		$this->setSQL($sql);
        $this->setSQLParams($sqlParams);
		
		 
    }
	
}

?>