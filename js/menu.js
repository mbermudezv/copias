window.onload = function() 
{
 
    let userData = [];
    userData = window.sessionStorage.getItem('sesion');
    
    if (userData && userData.length>0) {

        let nombre = document.getElementById("nombre");
        
        let jsonData = [];

        jsonData = JSON.parse(userData);
        
        nombre.innerText =  jsonData[0]["profesor_nombre"] + " " + 
                            jsonData[0]["profesor_primer_apellido"] + " " + 
                            jsonData[0]["profesor_segundo_apellido"];
        
        let pendiente = document.getElementById("pendiente");

        //console.log(jsonData);

        if (jsonData[0]["admin"]!=="1") {         

          pendiente.href = "javascript:void(0)";

        } else {

          pendiente.href = "../vistas/pendiente.html";

        }
                
    }
    
    muestraCantidadSolicitudes();
   
    return true;
}

function muestraCantidadSolicitudes() 
{
  
      fetch('../gestor/gestorCantidadSolicitud.php').then(function(response) 
      {
  
        if(response.ok) {
    
          response.json().then(function(data) {
                  
           let solicitudes = document.getElementById("solicitudes");
           solicitudes.innerText= data[0].cantidad;         
             
            }).catch(function(error) {
    
                      let contenedorError = document.getElementById("mensaje");
                      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                              '<strong>Error! </strong>' +
                                              'No hay respuesta del servidor MEP. Verifique su conexión de internet ' + error.message +
                                              '</div>';
                });              
    
    
        } else {
                
                let contenedorError = document.getElementById("mensaje");           
                contenedorError.innerHTML='<div class="alert alert-danger">' +
                                        '<strong>Error! </strong>' +
                                            'No se pudo conectar con el servidor. Intente de nuevo.' +
                                        '</div>';
        }
    
      }).catch(function(error) {
        
              let contenedorError = document.getElementById("mensaje");         
              contenedorError.innerHTML='<div class="alert alert-danger">' +
                                      '<strong>Error! </strong>' +
                                          'Hubo un problema al conectar con el servidor: ' + error.message +
                                      '</div>';        
      }).then();
    
      return true;
    
    }
  