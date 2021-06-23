<?php

require '../conexion/conexionBD.php';
require '../sql/select/select_Usuario.php';

try {

    $Profesor = new SelectProfesor();        
    $rs = $Profesor->selectProfesor();
             
    echo json_encode($rs);

    $Profesor = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Profesor = null;
    //echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>
