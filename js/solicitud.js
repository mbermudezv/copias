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