<?php

require '../conexion/conexionBD.php';
require '../sql/select/select_Usuario_x_email.php';

$email = $_GET['email'];

try {
              
    $Profesor = new SelectProfesorEmail();        
    $rs = $Profesor->selectProfesorEmail($email);
              
    echo json_encode($rs);

    $Profesor = null;
    $rs = null;
    
} 

catch (PDOException $e) 
{		

    $rs = null;
    $Profesor = null;
    echo json_encode(array("error" => $e->getMessage()));
    exit;

}

?>
