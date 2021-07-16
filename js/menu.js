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