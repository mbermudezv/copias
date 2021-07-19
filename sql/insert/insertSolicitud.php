<?php

class InsertSolicitud
{
	private $pdo;
	
	function __construct()
	{
		$pdo = new \PDO(DB_Str, DB_USER, DB_PASS);

		$this->pdo = $pdo;
	}

	function insertSolicitud($profesor_Id)
	{
		
		date_default_timezone_set('America/Costa_Rica');

		$fecha = date_create('now')->format('Y-m-d H:i:s');
		//$fecha = date_create('now')->format('Y-m-d');		
		
		$sql = 'INSERT INTO solicitud (solicitud_fecha, profesor_Id) 
				VALUES (:solicitud_fecha, :profesor_Id)';

		$stmt = $this->pdo->prepare($sql);
		
		$stmt->execute([
		':solicitud_fecha' => $fecha,
		':profesor_Id' => $profesor_Id
		]);
			
		$stmt = null;

		$this->pdo = null;

		return true;
      
	}

}

?>