function notificar() {

    let jsonData = [];
    jsonData = JSON.parse(window.sessionStorage.getItem('sesion'));
  
    console.log(jsonData[0]["profesor_email"]);

    fetch('gestor/gestorCopias.php')
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