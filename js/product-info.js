//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


// PRODUCTO GALERIA

function showImagesGallery(array){

    htmlContentToAppend = `
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="` + array[0] +`" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="` + array[1] +`" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="` + array[2] +`" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="` + array[3] +`" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="` + array[4] +`" class="d-block w-100" alt="...">
        </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>
    `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            let product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescription = document.getElementById("productDescription");
            let productImages = document.getElementById("productImagesGallery")
            let productCost = document.getElementById("productCost");
            let productSold = document.getElementById("productSold");
            let productCategory = document.getElementById("productCategory")
            // let relatedProducts = document.getElementById("relatedProducts");

            productNameHTML.innerHTML = product.name;
            productDescription.innerHTML = product.description;
            productImages.innerHTML = product.images;
            productCost.innerHTML = product.currency + ` ` + product.cost;
            productSold.innerHTML = product.soldCount;
            productCategory.innerHTML = product.category;
            // relatedProducts.innerHTML = product.relatedProducts;


            function showRelatedProducts(){
                getJSONData(PRODUCTS_URL).then(function(resultObj){
                    if (resultObj.status === "ok"){

                        let htmlContentToAppend = "";
                        let relatedProducts = product.relatedProducts;
                        let productsInfo = resultObj.data;

                        for (let i = 0; i < relatedProducts.length; i++){
                            htmlContentToAppend += `
                            <div class="col-lg-3 col-md-4 col-6">
                                <div class="d-block mb-4 h-100">
                                    <h4>`+ productsInfo[relatedProducts[i]].name +`</h4>
                                    <a href="product-info.html"><img class="img-fluid img-thumbnail" src="` + productsInfo[relatedProducts[i]].imgSrc + `" alt=""></a>
                                </div>
                            </div>
                            `
                            
                        }
                        document.getElementById("relatedProductsContainer").innerHTML = htmlContentToAppend;                   

                    };
                });
            };

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProducts()

        
        }
    });
});




// COMENTARIOS

function showComments(array){

    function stars(score){

        let starScore = "";

        for(let i = 1; i<=5 ; i++){
            if (score >= i){
                starScore +=`<span class="fa fa-star checked"></span>
                `
            }else{
               starScore +=`<span class="fa fa-star"></span>
                `
            }
        }

        return starScore;
    }

    let commentsToAppend = "";

    for(let i = 0; i < array.length ; i++){

        commentsToAppend +=`
        <div class=""> 
            <p><Strong>` + array[i].user + `</strong>`+ ` -`+ array[i].dateTime + `<br> `+ stars(array[i].score) + `</p>
            <p>`+ array[i].description + `</p>
        </div>
        <hr>
        `
        document.getElementById("comments").innerHTML = commentsToAppend;
        
    }

}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data;

            showComments(commentsArray);
            
        }
    });

    let commentText = document.getElementById("commentText");
    let score = document.getElementById("score");
    let scoreValue;

    score.onchange = (e) => {
        scoreValue = e.target.value;
        // console.log(e.target.value);
    }

    document.getElementById("form_add_comment").addEventListener("submit", function(e){
        e.preventDefault();

        var date = new Date();

        const fakeComment = {
            dateTime: date.toISOString().split("T")[0] + ` `+ date.toLocaleTimeString(),
            description: commentText.value,
            score: scoreValue,
            user: localStorage.getItem("username"),
        }
        commentsArray.push(fakeComment);
        showComments(commentsArray)

    });


});