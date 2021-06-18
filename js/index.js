function notificar() {

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