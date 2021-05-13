//Variable articleInLocalStorage dans laquelle on met les keys values dans le localStorage
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
// console.log(articleInLocalStorage);

const productCart = document.getElementById("products-tablebody");
// console.log(productCart);

//Si le panier est vide 
if (articleInLocalStorage === null || articleInLocalStorage == 0) {
    const emptyCart = `
    <tr id="title-cart-empty" class="col-12 mx-auto">
        <td></td>
        <td class="text-center">Le panier est vide</td>
        <td></td>
    </tr>`
    productCart.innerHTML = emptyCart;
} else {
    let structureCart = [];
    for (i = 0; i < articleInLocalStorage.length; i++) {
        structureCart += `
        <tr class="col-12">
            <td class="text-center"><strong>${articleInLocalStorage[i].name}</strong></td>
            <td class="text-center">1</td>
            <td class="text-center">${(articleInLocalStorage[i].price)}.00 €</td>
            <td class="text-center removeArticle"><button class="btn-trash"><i class="fas fa-trash-alt"></button></td>
        </tr>`;
    }
    if (i == articleInLocalStorage.length) {
        productCart.innerHTML = structureCart;
    }

}

//*********************Bouton supprimer************************
//Selection du bouton

let removeArticle = document.querySelectorAll(".removeArticle");
console.log(removeArticle);

for(let k = 0; k < removeArticle.length; k++){
    removeArticle[k].addEventListener("click",(e) =>{
        e.preventDefault();

        let removeIdSelect = articleInLocalStorage[k].theId;
        // attention probleme suppression de tous les memes id 
        articleInLocalStorage = articleInLocalStorage.filter( elt => elt.theId !== removeIdSelect);
        console.log(articleInLocalStorage)

        // stringify() convertit une valeur JavaScript en chaîne JSON et envoie dans la key "article" du localStorage
        localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
        window.location.reload();
    })
}

// removeArticle.addEventListener("click", () => {this.annulerArticle(i);})
// annulerArticle = (i) => {
//     articleInLocalStorage.splice(i, 1);
//     localStorage.clear();
//     // Mise à jour du nouveau panier avec suppression de l'article
//     localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
//     //Mise à jour de la page pour affichage de la suppression au client
//     window.location.reload();
// };


