<?php

class InsertSolicitud
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertSolicitud($profesor_Id, 
							$solicitud_cantidad_carta,
							$solicitud_cantidad_oficio,
							$solicitud_cantidad_estudiantes)
	{
		
		date_default_timezone_set('America/Costa_Rica');
		//$fecha = date_create('now')->format('Y-m-d');

		$fecha = date_create('now')->format('Y-m-d H:i:s');
		$solicitud_monto_carta = $solicitud_cantidad_carta * 11;
		$solicitud_monto_oficio = $solicitud_cantidad_oficio * 17;
		$solicitud_monto = $solicitud_monto_carta + $solicitud_monto_oficio;
		
		
		$sql = 'INSERT INTO solicitud 
					(solicitud_fecha, profesor_Id, 
					solicitud_cantidad_carta, 
					solicitud_cantidad_oficio,
					solicitud_cantidad_estudiantes,
					solicitud_monto)
				VALUES 
				(:solicitud_fecha, 
				:profesor_Id, 
				:solicitud_cantidad_carta,
				:solicitud_cantidad_oficio,
				:solicitud_cantidad_estudiantes,
				:solicitud_monto)';

		$stmt = $this->pdo->prepare($sql);
		
		$stmt->execute([
		':solicitud_fecha' => $fecha,
		':profesor_Id' => $profesor_Id,
		':solicitud_cantidad_carta' => $solicitud_cantidad_carta,
		':solicitud_cantidad_oficio' => $solicitud_cantidad_oficio,
		':solicitud_cantidad_estudiantes' => $solicitud_cantidad_estudiantes,
		':solicitud_monto' => $solicitud_monto
		]);
			
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>