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
                
    } 
   
    return true;
}

function guardar() {
  
  const formData = new FormData();
  let jsonData = [];
  let profesor_Id = 0;
  let btnIngresar = document.getElementById("btnGuardar");
  let solicitud_cantidad_estudiantes = $('#solicitud_cantidad_estudiantes').val();
  let solicitud_cantidad_carta = $('#solicitud_cantidad_carta').val();
  let solicitud_cantidad_oficio = $('#solicitud_cantidad_oficio').val();

  jsonData = JSON.parse(window.sessionStorage.getItem('sesion'));  
  profesor_Id = jsonData[0]["profesor_Id"];
    
  btnIngresar.disabled = true;
  btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  let spinner = document.getElementById("spinner");
  
  formData.append('profesor_Id', profesor_Id);
  formData.append('solicitud_cantidad_carta', solicitud_cantidad_carta);
  formData.append('solicitud_cantidad_oficio', solicitud_cantidad_oficio);
  formData.append('solicitud_cantidad_estudiantes', solicitud_cantidad_estudiantes);
    
  fetch('../gestor/gestorSolicitud.php',{
    method: 'POST', 
    body: formData,     
    }).then(function(response) {

        if(response.ok) {

          response.text().then(function(data) 
          {  
              console.log(data);
              notificar();
                            
          }).catch(function(error) {

              spinner.style.visibility = 'hidden';
              btnIngresar.innerText="Enviar Solicitud";
              btnIngresar.disabled = false;

              let tituloMensaje = document.getElementById("tituloMensaje");
              tituloMensaje.innerText='';
          
              let contenedorError = document.getElementById("mensajeModal");
              contenedorError.innerText='';

              let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
              mensajeModalParrafo.innerText='';

              tituloMensaje.innerText = 'Hubo un inconveniente!';
              contenedorError.innerText ='Intente de nuevo!';
              mensajeModalParrafo.innerText ='No hubo respuesta del servidor MEP.';
            
              $('#modalMensaje').modal('show');

          })

        } else {

                spinner.style.visibility = 'hidden';
                btnIngresar.innerText="Enviar Solicitud";
                btnIngresar.disabled = false;

                let tituloMensaje = document.getElementById("tituloMensaje");
                tituloMensaje.innerText='';
            
                let contenedorError = document.getElementById("mensajeModal");
                contenedorError.innerText='';

                let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
                mensajeModalParrafo.innerText='';

                tituloMensaje.innerText = 'Hubo un inconveniente!';
                contenedorError.innerText ='No hay respuesta del servidor MEP!';
                mensajeModalParrafo.innerText ='Verifique su conexión de internet.';  
              
                $('#modalMensaje').modal('show');
        
        }

    })
    .catch(function(error) {

          spinner.style.visibility = 'hidden';
          btnIngresar.innerText="Enviar Solicitud";
          btnIngresar.disabled = false;

          let tituloMensaje = document.getElementById("tituloMensaje");
          tituloMensaje.innerText='';
      
          let contenedorError = document.getElementById("mensajeModal");
          contenedorError.innerText='';

          let mensajeModalParrafo = document.getElementById("mensajeModalParrafo");
          mensajeModalParrafo.innerText='';

          tituloMensaje.innerText = 'Hubo un inconveniente!';
          contenedorError.innerText ='Error al guardar la información!';
          mensajeModalParrafo.innerText = error.message;
          
          $('#modalMensaje').modal('show');
       
    }).then();
  
  spinner.style.visibility = 'hidden';
  btnIngresar.innerText="Enviar Solicitud";

  let tituloMensaje = document.getElementById("tituloMensajeGuardar");
  tituloMensaje.innerText='';

  let contenedorError = document.getElementById("mensajeModalGuardar");
  contenedorError.innerText='';

  let mensajeModalParrafo = document.getElementById("mensajeModalParrafoGuardar");
  mensajeModalParrafo.innerText='Se le enviará una notificación a su correo institucional';

  tituloMensaje.innerText = 'Ok!';
  contenedorError.innerText ='Se registró la solicitud!';      
  
  $('#modalMensajeGuardar').modal('show');  

  return true;
}

function notificar() {
    
    let solicitud_cantidad_estudiantes = $('#solicitud_cantidad_estudiantes').val();
    let solicitud_cantidad_carta = $('#solicitud_cantidad_carta').val();
    let solicitud_cantidad_oficio = $('#solicitud_cantidad_oficio').val();

    let jsonData = [];
    jsonData = JSON.parse(window.sessionStorage.getItem('sesion'));
  
    //console.log(jsonData[0]["profesor_email"]);
    let profesor_email = jsonData[0]["profesor_email"];
    let profesor_nombre = jsonData[0]["profesor_nombre"] + " " + 
                          jsonData[0]["profesor_primer_apellido"] + " " + 
                          jsonData[0]["profesor_segundo_apellido"];

    fetch('../gestor/gestorCopias.php?'
          + new URLSearchParams({profesor_email: profesor_email, 
                                profesor_nombre: profesor_nombre}))
    .then(function(response) {
    
      if(response.ok) {
    
          response.text().then(
              function(data) 
              {
          
                console.log(data);
           
              }).catch(function(error) {
    
                console.log(error);
    
              });              
    
      } 
    
    }).catch(function(error) {
    
        console.log(error);   
    
    }).then();
        
}