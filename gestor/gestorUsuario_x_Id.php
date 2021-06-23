<?php

require '../conexion/conexionBD.php';
require '../sql/select/select_Usuario_x_Id.php';

$id = $_GET['id'];

try {
              
    $Profesor = new SelectProfesorId();        
    $rs = $Profesor->selectProfesorId($id);
              
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
