//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const CART_PRODUCTS = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let subtotal = 0;

// MUESTRA LOS PRODUCTOS
function showArticle(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        article = array[i];

        htmlContentToAppend += `
        <tr>
            <td><img src="`+ article.src +`" width="100px"></img> </td>
            <td>`+ article.name +` </td>
            <td><input type="number" min="1" max="100" value="`+ article.count +`" class="quantity" id="quantity"> </td>
            <td>`+article.currency + ` `+ article.unitCost +` </td>
            
        </tr>

        
        `
    }
    document.getElementById('items').innerHTML = htmlContentToAppend;
    
    // CANTIDAD DE PRODUCTO SELECCIONADO
    let cantidadProducto = document.getElementsByClassName("quantity");

    for(i=0; i < cantidadProducto.length; i++){
        let subtotalToAppend = "";
        console.log(cantidadProducto[i].value);
        let element = cantidadProducto[i]
        element.onchange = function(e){
            let cantidadtotalproducto = e.target.value
            console.log(cantidadtotalproducto)
            
            subtotalToAppend +=`
            <td id="subtotal">Subtotal: `+ article.unitCost * cantidadtotalproducto +`</td>

            `        
            document.getElementById("subtotal").innerHTML = subtotalToAppend;
        }
    }
};

function shipping(){
    document.getElementById
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        cartInfo = resultObj.data
        let article = cartInfo.articles

        showArticle(article);

    })
});