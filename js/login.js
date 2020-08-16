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


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    windows.location.href = "inicio.html";
}

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
