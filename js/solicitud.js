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
  
  let jsonData = [];
  let profesor = 0;

  jsonData = JSON.parse(window.sessionStorage.getItem('sesion'));

  profesor = jsonData[0]["profesor_Id"];

  let btnIngresar = document.getElementById("btnGuardar");
  btnIngresar.disabled = true;
  btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  let spinner = document.getElementById("spinner");

  //notificar();

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

     
    let jsonData = [];
    jsonData = JSON.parse(window.sessionStorage.getItem('sesion'));
  
    //console.log(jsonData[0]["profesor_email"]);
    let profesor_email = jsonData[0]["profesor_email"];
    let profesor_nombre = jsonData[0]["profesor_nombre"] + " " + 
                          jsonData[0]["profesor_primer_apellido"] + " " + 
                          jsonData[0]["profesor_segundo_apellido"];

    fetch('../gestor/gestorCopias.php?'
          + new URLSearchParams({profesor_email: profesor_email, profesor_nombre: profesor_nombre}))
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