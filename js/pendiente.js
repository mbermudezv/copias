window.onload = function() 
{ 
  
  selectPendienteGestor();

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

  if (solicitud_cantidad_estudiantes <= 0) {
      
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
    contenedorError.innerText ='La cantidad de estudiantes debe ser mayor a cero';
    mensajeModalParrafo.innerText ='Correjir el dato e intente de nuevo por favor';   
    
    $('#modalMensaje').modal('show');

    return false;

  }

  if (solicitud_cantidad_carta == 0 && solicitud_cantidad_oficio == 0) {
      
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
    contenedorError.innerText ='La cantidad de copias debe ser mayor a cero';
    mensajeModalParrafo.innerText ='Correjir el dato e intente de nuevo por favor';   
    
    $('#modalMensaje').modal('show');

    return false;

  }


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
              //notificar();
                            
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

function selectPendienteGestor() 
{
           
  $('#lista').empty(); 

  fetch('../gestor/gestorSolicitud_x_Aprobar.php')
  .then(function(response) {

      if(response.ok) {
          
          response.json().then(
              function(data) 
              {
                  let contenedorError = document.getElementById("mensaje");
                  contenedorError.innerHTML='';
                                                  
                  //console.log(data);
                  if (Object.keys(data).length>0) {

                      cargaDatosPantalla(data);
                      
                  } else {

                      let contenedorError = document.getElementById("mensaje");
                      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                              '<strong>Error! </strong>' +
                                              'No se encontraron datos </div>';                                                        
                  
                  }
          
              }).catch(function(error) {

                  let contenedorError = document.getElementById("mensaje");
                  contenedorError.innerHTML='<div class="alert alert-danger">' +
                                          '<strong>Error! </strong>' +
                                          'No hay respuesta del servidor . Verifique su conexión de internet ' + error.message +
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

function cargaDatosPantalla(data) 
{    
        
  data.forEach(obj => {       

      let fila = document.createElement('div');
      fila.id = "fila";
      fila.className = "form-group row justify-content-center";      
      
      let colNombre = document.createElement('div');
      colNombre.id = "profesor";
      colNombre.className = "col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3";
      let createATextNombre = document.createTextNode(obj.profesor);
      colNombre.appendChild(createATextNombre);

      let colCantidad = document.createElement('div');
      colCantidad.id = "cantidad";
      colCantidad.className = "col-1 col-sm-2 col-md-2 col-lg-1 col-xl-1";
      let createATextCantidad = document.createTextNode(obj.solicitud_cantidad_carta + obj.solicitud_cantidad_oficio);
      colCantidad.appendChild(createATextCantidad);

      let colMonto = document.createElement('div');
      colMonto.id = "cantidad";
      colMonto.className = "col-1 col-sm-2 col-md-2 col-lg-1 col-xl-1";
      let createATextMonto = document.createTextNode(obj.solicitud_cantidad_carta + obj.solicitud_cantidad_oficio);
      colMonto.appendChild(createATextMonto);
     
      fila.appendChild(colNombre);
      fila.appendChild(colCantidad);
      fila.appendChild(colMonto);

      document.getElementById('lista').appendChild(fila);        

  }); 

  return true;

}
