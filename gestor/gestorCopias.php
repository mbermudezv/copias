<?php

require '../conexion/conexionEmail.php';
require '../php/email_Copias.php';

try {

    $profesor_email = $_GET['profesor_email'];
    $profesor_nombre = $_GET['profesor_nombre'];

    $Copias = new Email_Copias();
    $rs = $Copias->email_Copias($profesor_email, $profesor_nombre);
        
    echo $rs;

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