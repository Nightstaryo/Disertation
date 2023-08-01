<?php

/*

@Author James Fishleigh
*/

class Devices extends Endpoint
{
  /*Set sql to set from database*/
    protected function initialiseSQL() {
		  $db = new Database("db/db.db");
        $sql = "SELECT device_id,device_name,device_econsumption,device_reference, device_image_link
                FROM devices
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