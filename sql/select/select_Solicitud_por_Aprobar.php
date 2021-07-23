<?php

class SelectdSolicitudes_por_Aprobar 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function solicitudes_por_Aprobar()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT profesor.profesor_Id, solicitud_cantidad_carta,
                                solicitud_cantidad_oficio, solicitud_fecha,
                                solicitud_monto, profesor.profesor_nombre,
                                profesor.profesor_primer_apellido, profesor.profesor_segundo_apellido 
                            FROM solicitud INNER JOIN
                                profesor ON
                                solicitud.profesor_Id = profesor.profesor_Id
                            WHERE solicitud_aprobada = 0"; 
                            
			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) 
			{
				$rs[] = [
					'solicitud_Id' => $row['solicitud_Id'],
                    'solicitud_fecha' => $row['solicitud_fecha'],                    
                    'solicitud_cantidad_carta' => $row['solicitud_cantidad_carta'],
                    'solicitud_cantidad_oficio' => $row['solicitud_cantidad_oficio'],
                    'solicitud_cantidad_estudiantes' => $row['solicitud_cantidad_estudiantes'],
                    'solicitud_monto' => $row['solicitud_monto'],
                    'profesor' => $row['profesor_nombre'] . " " . $row['profesor_primer_apellido'] . " " . $row['profesor_segundo_apellido']																		
				];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>