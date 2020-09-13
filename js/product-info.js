//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

let product = [];
let comments = [];


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
        console.log(e.target.value);
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




