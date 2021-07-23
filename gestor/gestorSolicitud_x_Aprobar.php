<?php

require '../conexion/conexionBD.php';
require '../sql/select/select_Solicitud_por_Aprobar.php';

try {
              
    $Solicitudes = new SelectdSolicitudes_por_Aprobar();        
    $rs = $Solicitudes->solicitudes_por_Aprobar();
              
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
