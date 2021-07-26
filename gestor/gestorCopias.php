<?php

require '../conexion/conexionEmail.php';
require '../php/email_Copias.php';

try {

    $profesor_email = $_GET['profesor_email'];
    $profesor_nombre = $_GET['profesor_nombre'];
    $solicitud_cantidad_carta = $_GET['solicitud_cantidad_carta'];
    $solicitud_cantidad_oficio = $_GET['solicitud_cantidad_oficio'];
    $solicitud_cantidad_estudiantes = $_GET['solicitud_cantidad_estudiantes'];

    $Copias = new Email_Copias();
    $rs = $Copias->email_Copias($profesor_email, $profesor_nombre,
                                $solicitud_cantidad_carta,
                                $solicitud_cantidad_oficio,
                                $solicitud_cantidad_estudiantes);
        
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