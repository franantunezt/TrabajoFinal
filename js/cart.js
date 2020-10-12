//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const CART_PRODUCTS = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let subtotal;

// MUESTRA LOS PRODUCTOS
function showArticle(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        article = array[i];
        htmlContentToAppend += `
        <tr>
            <td><img src="`+ article.src +`" width="100px"></img> </td>
            <td>`+ article.name +` </td>
            <td><input type="number" min="1" max="100" value="`+ article.count +`" class="quantity form-control w-50" id="quantity"> </td>
            <td>`+article.currency + ` `+ article.unitCost +` </td>
        </tr>
        `
    }
    document.getElementById('items').innerHTML = htmlContentToAppend;
    
    // CANTIDAD DE PRODUCTO SELECCIONADO
    let cantidadProducto = document.getElementsByClassName("quantity");
    let subtotalToAppend = "";

    for(i=0; i < cantidadProducto.length; i++){
        
        console.log(cantidadProducto[i].value);

        const element = cantidadProducto[i]
        element.onchange = function(e){
            let cantidadtotalproducto = e.target.value
            subtotal = article.unitCost*cantidadtotalproducto
            console.log(cantidadtotalproducto)
            
            subtotalToAppend =`
            <td id="subtotal"><b>`+ subtotal +`<b></td>

            `        
            document.getElementById("subtotal").innerHTML= subtotalToAppend;
        }
    }
    
    
};

// Para indicar el shipping
function check(){
    let shippingStandard = document.getElementById("standard").checked;
    let shippingPremium = document.getElementById("premium").checked;
    let shippingExpress = document.getElementById("express").checked;

    let totalToAppend = "";
    let total = 0

    if(shippingStandard){
        total = subtotal*1.05
        console.log("standard")
    }else if(shippingPremium){
        total = subtotal*1.07
        console.log("premium")
    }else if(shippingExpress){
        total = subtotal*1.15
        console.log("express")
    }
    totalToAppend =`
        <div>`+ Math.round(total) +` </div>`

    document.getElementById("total").innerHTML = totalToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        cartInfo = resultObj.data
        let article = cartInfo.articles
        showArticle(article);
    })
});