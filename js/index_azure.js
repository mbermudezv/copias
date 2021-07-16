const myMSALObj = new msal.PublicClientApplication(msalConfig);

window.onload = function() 
{

  loadPage();     
  return true;

}

function loadPage() {
  
  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts === null) {
      //console.log("hola null accounts");
      return;

  } else if (currentAccounts.length > 1) {

      // Add choose account code here
      console.warn("Multiple accounts detected.");
      console.log(currentAccounts);

  } else if (currentAccounts.length === 1) {

      let username = currentAccounts[0].username;
      console.log(username);
      login(username); 
           
  }

}

function handleResponse(resp) {

  if (resp !== null) {
  
      let username = resp.account.username;
      console.log(username);
      login(username);           
      
  } else {

      loadPage();

  }

}

function signIn() {
  
  myMSALObj.loginPopup(loginRequest).then(handleResponse).catch(error => {
      console.error(error);
  });

}

function login(username) 
{
  
  let btnIngresar = document.getElementById("btnIngresar");
  btnIngresar.disabled = true;
  let contenedorError = document.getElementById("contenedorError");
  btnIngresar.innerHTML = '<span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  let spinner = document.getElementById("spinner");
  
  if (typeof username === 'undefined') {

    spinner.style.visibility = 'hidden';
    btnIngresar.innerText="Ingresar";
    btnIngresar.disabled = false;
    contenedorError.innerHTML='<div class="alert alert-danger">' +
                            '<strong>Error! </strong>' +
                                'al conectar con el servidor' +
                            '</div>';

    return false;                               
 }

  try {

  fetch('./gestor/gestorUsuario_x_email.php?'
  + new URLSearchParams({email: username}))
  .then(function(response) 
  {
          
    if(response.ok) 
    {

      response.json().then(function(data) 
      {
        
        //console.log(data);
       
        if (Object.keys(data).length>0){ 
                        
          window.sessionStorage.setItem('sesion', JSON.stringify(data));
          window.location.replace('./vistas/menu.html');

        } else {

              spinner.style.visibility = 'hidden';
              btnIngresar.innerText="Ingresar";
              btnIngresar.disabled = false;
              contenedorError.innerHTML='<div class="alert alert-danger">' +
                                      '<strong>Error! </strong>' +
                                          'No se encontró el usuario' +
                                      '</div>';                        
        }


      }).catch(function(error) 
                {
                  spinner.style.visibility = 'hidden';
                  btnIngresar.innerText="Ingresar";
                  btnIngresar.disabled = false;
                  contenedorError.innerHTML='<div class="alert alert-danger">' +
                                          '<strong>Error! </strong>' +
                                          'No hay respuesta del servidor MEP. Verifique su conexión de internet ' +
                                          '</div>';              
                });              
    }
  }).then().catch(function(error) 
                    {
                      spinner.style.visibility = 'hidden';
                      btnIngresar.innerText="Ingresar";
                      btnIngresar.disabled = false;
                      contenedorError.innerHTML='<div class="alert alert-danger">' +
                                              '<strong>Error! </strong>' +
                                                  'Hubo un problema con la petición Fetch de login: ' + error.message +
                                              '</div>';        
                    });


  } catch (error) {

    spinner.style.visibility = 'hidden';
    btnIngresar.innerText="Ingresar";
    btnIngresar.disabled = false;
    contenedorError.innerHTML='<div class="alert alert-danger">' +
                            '<strong>Error! </strong>' +
                                'Hubo un problema: ' + error.message +
                            '</div>';    
    
  }


  return true;
  
}