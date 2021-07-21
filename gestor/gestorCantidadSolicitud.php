<?php

require '../conexion/conexionBD.php';
require '../sql/select/select_SolicitudCantidad.php';

try {
              
    $Solicitudes = new SelectCantidadSolicitudes();        
    $rs = $Solicitudes->conCantidadSolicitudes();
              
    echo json_encode($rs);

    $Solicitudes = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Solicitudes = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>
