const myMSALObj = new msal.PublicClientApplication(msalConfig);

window.onload = function() 
{

  loadPage();     
  return true;

}

function loadPage() {
  
  const currentAccounts = myMSALObj.getAllAccounts();

  if (currentAccounts === null) {
      return;

  } else if (currentAccounts.length > 1) {

      // Add choose account code here
      console.warn("Multiple accounts detected.");

  } else if (currentAccounts.length === 1) {

      let username = currentAccounts[0].username;
      //console.log(username);
      login(username); 
           
  }

}

function handleResponse(resp) {

  if (resp !== null) {
  
      let username = resp.account.username;
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
  
  fetch('gestor/gestorUsuario_x_email.php?'
    + new URLSearchParams({email: username}))
  .then(function(response) 
  {
          
    if(response.ok) 
    {

      response.json().then(function(data) 
      {
        
        //console.log(data);
        window.sessionStorage.setItem('sesion', JSON.stringify(data));
        window.location.href = 'vistas/menu.html';
                     
      });
  
    }

  }).then();
  
  return true;
  
}