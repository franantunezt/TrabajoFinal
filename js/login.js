//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function validateForm(){
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    if(password != "" && name != ""){
        window.location.href = "inicio.html";
    }
    else{
        alert("Campos vacios");
    }
}

document.addEventListener("DOMContentLoaded", function(e){

})
