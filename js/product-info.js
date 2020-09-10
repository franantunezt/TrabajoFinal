//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productImages = document.getElementById("productImagesGallery")
            let productCost = document.getElementById("productCost");
            let productSold = document.getElementById("productSold");
            let productCategory = document.getElementById("productCategory")

            productNameHTML.innerHTML = product.name;
            productDescription.innerHTML = product.description;
            productImages.innerHTML = product.images;
            productCost.innerHTML = product.currency + ` ` + product.cost;
            productSold.innerHTML = product.soldCount;
            productCategory.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
          
        }
    });
});
