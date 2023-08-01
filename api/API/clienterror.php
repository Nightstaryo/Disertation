<?php
class ClientError extends Endpoint
{
    /**
     * @param String $message - A message explaining the error
     * @param Int $code - the relevant http status code
     */
    public function __construct($message = "", $code = 400) {
     
        http_response_code($code);
 
        $this->setData( array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}

?>