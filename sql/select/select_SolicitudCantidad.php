<?php

class SelectCantidadSolicitudes 
{

    private $pdo;
       	
	function __construct()
	{

        $pdo = new \PDO(DB_Str, DB_USER, DB_PASS, 
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
                    
        $this->pdo = $pdo;        
        
    }

    function conCantidadSolicitudes()
    {        

        if ($this->pdo != null) {		
			
			$consultaSQL = "SELECT COUNT(*) AS cantidad FROM solicitud							
							WHERE solicitud_aprobada = 0"; 
                            
			$sql = $this->pdo->query($consultaSQL);

			$rs = [];

			while ($row = $sql->fetch(\PDO::FETCH_ASSOC)) 
			{
				$rs[] = [						
					'cantidad' => $row['cantidad']																		
				];
			}

            return $rs;

		}   

		$this->pdo = null;

    }
    
}

?>