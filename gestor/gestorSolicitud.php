<?php

require '../conexion/conexionBD.php';
require '../sql/insert/insertSolicitud.php';

try {

    $profesor_Id = $_POST['profesor_Id'];

    $Insert = new InsertSolicitud();
    $rs = $Insert->insertSolicitud($profesor_Id);
        
    echo $rs;
    
    $Insert = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Insert = null;
    echo $e->getMessage();
    exit;

}

?>