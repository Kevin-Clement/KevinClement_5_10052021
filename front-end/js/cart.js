//Variable articleInLocalStorage dans laquelle on met les keys values dans le localStorage
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
// console.log(articleInLocalStorage);

const productCart = document.getElementById("products-tablebody");
console.log(productCart);

//Si le panier est vide 
if (articleInLocalStorage === null) {
    const emptyCart = `
    <tr id="title-cart-empty" class="col-12 mx-auto">
        <td></td>
        <td class="text-center">Le panier est vide</td>
        <td></td>
    </tr>`
    productCart.innerHTML = emptyCart;
} else {
    let structureCart = [];
    for (i = 0; i < articleInLocalStorage.length; i++){
        structureCart += `
        <tr class="col-12">
            <td class="text-center"><strong>${articleInLocalStorage[i].name}</strong></td>
            <td class="text-center">1</td>
            <td class="text-center">${(articleInLocalStorage[i].price)}.00 €</td>
        </tr>`;
    }
        if(i == articleInLocalStorage.length){
        productCart.innerHTML = structureCart;
    }
}


