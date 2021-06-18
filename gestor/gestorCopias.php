<?php

require '../conexion/conexion.php';
require '../php/email_Copias.php';

try {

    $Copias = new Email_Copias();
    $rs = $Copias->email_Copias();
        
    echo "Listo!";

    $Copias = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Copias = null;
    //echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>