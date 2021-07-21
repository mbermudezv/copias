<?php

require '../conexion/conexionBD.php';
require '../sql/insert/insertSolicitud.php';

try {

    $profesor_Id = $_POST['profesor_Id'];
    $solicitud_cantidad_carta = $_POST['solicitud_cantidad_carta'];
    $solicitud_cantidad_oficio = $_POST['solicitud_cantidad_oficio'];
    $solicitud_cantidad_estudiantes = $_POST['solicitud_cantidad_estudiantes'];
 
    $Insert = new InsertSolicitud();
    $rs = $Insert->insertSolicitud($profesor_Id, 
                                    $solicitud_cantidad_carta,
                                    $solicitud_cantidad_oficio,
                                    $solicitud_cantidad_estudiantes);
        
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