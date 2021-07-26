<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

header('Content-Type: text/html; charset=UTF-8');

class Email_Copias
{
    private $correo;
    private $passemail;
       	
	function __construct()
	{
                
        $correo = Email;
        $passemail = Email_PASS;
        $this->correo = $correo;
        $this->passemail = $passemail;
        
    }

    public function email_Copias($profesor_email, 
                                $profesor_nombre,
                                $solicitud_cantidad_carta,
                                $solicitud_cantidad_oficio,
                                $solicitud_cantidad_estudiantes) 
    {
        
        $mail = new PHPMailer(true);
      
        try {

            $mail->Username = $this->correo;
            $mail->Password = $this->passemail;
    
            $mail->SMTPDebug = 0;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Host = "mail.wappcom.net";
            $mail->Port = 587;
            $mail->IsSMTP();
            $mail->SMTPAuth = true;
            $mail->setFrom($mail->Username,"Liceo Las Esperanzas");
            $mail->AddAddress($profesor_email);
            $mail->Subject = "Solicitud de Copias";

            $mail->Body .= "<head>
                                <meta http-equiv='Content-type' content='text/html; charset=utf-8'/>           
                                <style>
                                        html {
                                            overflow-y: auto;
                                        }
                                        
                                        img
                                        {
                                            max-width: 100%;
                                        }
                                        
                                        html, body {
                                            height: 100%;
                                        }
                                        
                                        body {
                                            margin: 0%;                                                                                                   
                                        }
                                        
                                        #container {
                                            display: flex;
                                        }
            
                                        table, th, td {
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                        }
                                </style>
                            </head>";
            $mail->Body .= "<img src=\"https://wappcom.net/servicopias/img/mail_EncabezadoCopias.png\" alt=\"\" width=\"100%\" height=\"100%\" />";
            $mail->Body .=  "<h3> Estimado Funcionario (a) </h3>";	
            $mail->Body .=  "<p> <b> El Sistema de Control de Copias </b> le informa:</p>";    
            $mail->Body .=  "<div id='container'> 
                                <table style='width:100%'>
                                    <tbody>
                                        <tr style='width:50%'>
                                            <th scope='row'>Solicitante</th>
                                            <td> ".$profesor_nombre." </td>
                                        </tr>
                                        <tr style='width:50%'>
                                            <th scope='row'>Estado de la solicitud</th>
                                            <td> <strong> En proceso de aprobaci&oacuten </strong> </td>
                                        </tr>
                                        <tr style='width:50%'>
                                            <th scope='row'>Cantidad de Estudiantes</th>
                                            <td> ".$solicitud_cantidad_estudiantes." </td>
                                        </tr>
                                        <tr style='width:50%'>
                                            <th scope='row'>Cantidad de Copias tama&ntilde;o Carta</th>
                                            <td> ".$solicitud_cantidad_carta." </td>
                                        </tr>
                                        <tr style='width:50%'>
                                            <th scope='row'>Cantidad de Copias tama&ntilde;o Oficio</th>
                                            <td> ".$solicitud_cantidad_oficio." </td>
                                        </tr>

                                    </tbody> 
                                </table> 
                            </div>
                            <br/>";                   
            $mail->Body .= "<img src=\"https://wappcom.net/servicopias/img/email_PieCopias.png\" alt=\"\" width=\"100%\" height=\"100%\" />";
            $mail->IsHTML(true);
            $mail->Send();

        } catch (\Throwable $th) {
            //throw $th;
            return $th;
        }
        
        return "notificacion enviada a " .$profesor_email;  
    }
    
}

?>