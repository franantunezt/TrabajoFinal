//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getValue();
    saveProfile();

    // Obtengo la imagen al iniciar
    const recentImageDataUrl = localStorage.getItem("avatar");
    if(recentImageDataUrl){
        document.getElementById("imgPreview").setAttribute("src", recentImageDataUrl);
    }

    // Guardo imagen
    const avatarInput = document.getElementById("profileImg");

    avatarInput.onchange = (event) => {
        let avatarFile = event.target.files[0];
        let fr = new FileReader();
        fr.onload = function(){
            console.log(fr.result);
            document.getElementById("imgPreview").src = fr.result;
            localStorage.setItem("avatar", fr.result);
        }
        fr.readAsDataURL(avatarFile);
    }
});

// Funcion que guarda datos ingresados a localstorage
function saveProfile(){
    document.getElementById("btn").addEventListener("click", function(event){
        event.preventDefault();
        let profile = {
            name: document.getElementById("name").value,
            lastname: document.getElementById("lastname").value,
            age: document.getElementById("age").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
        }
        let profile_serialized = JSON.stringify(profile);
        localStorage.setItem("profile",profile_serialized);
        // console.log(localStorage);
        // console.log(profile_serialized);

        Swal.fire({
            position: 'center-center',
            icon: 'success',
            title: 'Cambios guardados',
            showConfirmButton: false,
            timer: 1500
        })

    });
}

// funcion que me trae los datos del locastorage
function getValue(){
    let storedProfile = localStorage.getItem("profile");
    // console.log(storedProfile)
    if(storedProfile != null){

        let profile_deserialized = JSON.parse(localStorage.getItem("profile"));
        // console.log(profile_deserialized);

        document.getElementById("name").value = profile_deserialized.name;
        document.getElementById("lastname").value = profile_deserialized.lastname;
        document.getElementById("age").value = profile_deserialized.age;
        document.getElementById("email").value = profile_deserialized.email;
        document.getElementById("phone").value = profile_deserialized.phone;
    }
}



// BACK UP
// const recentImageDataUrl = localStorage.getItem("recent-image");
//     if(recentImageDataUrl){
//         document.getElementById("imgPreview").setAttribute("src", recentImageDataUrl);
//     }
// document.getElementById("profileimg").addEventListener("change", function(){
//     console.log(this.files);
//     const reader = new FileReader();

//     reader.addEventListener("load", ()=>{
//         localStorage.setItem("profile",reader.result);
//         console.log(reader.result);
//     })

//     reader.readAsDataURL(this.files[0]);
// })
