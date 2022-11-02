import { postOrder } from './Services/articleApiService.js';

let articleInLocalStorage = getBasket();
const productCartBody = document.getElementById("products-tablebody");
const productCartFooter = document.getElementById("products-footer");


if (articleInLocalStorage != 0) {
    let structureCart = [];
    //Ajout de tous les articles du localStorage avec une boucle for
    for (let i = 0; i < articleInLocalStorage.length; i++) {
        structureCart += `
        <tr class="col-12">
            <td class="text-center"><strong>${articleInLocalStorage[i].name}</strong></td>
            <td class="text-center">1</td>
            <td class="text-center">${(articleInLocalStorage[i].price)}.00 €</td>
            <td class="text-center removeArticle"><button class="btn-trash" aria-label="bouton poubelle suppression"><i class="fas fa-trash-alt"></button></td>
        </tr>`;
    };
    productCartBody.innerHTML = structureCart;

    productCartFooter.innerHTML = `
    <tr class="col-12">
        <td class="text-center font-weight-bolder totalsum text-uppercase">Total</td>
        <td class="text-center font-weight-bolder">${sumQuantity() /2}</td>
        <td class="text-center totalsum"><strong>${sumPrice()}.00€</strong></td>
        <td></td>
    </tr>`;
        
} else {
        productCartBody.innerHTML = `
    <tr id="title-cart-empty" class="col-12 mx-auto">
        <td></td>
        <td class="text-center">Votre panier est vide</td>
        <td></td>
    </tr>`;
};


let removeArticle = document.querySelectorAll(".removeArticle");
for (let k = 0; k < removeArticle.length; k++) {
    removeArticle[k].addEventListener("click", () => {
        
        let removeIdSelect = articleInLocalStorage[k].articleId;

        articleInLocalStorage = articleInLocalStorage.filter(elt => elt.articleId !== removeIdSelect);

        localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
        window.location.reload();
    });
};

//Vider le panier
let removeCart = document.querySelector(".removeCart");

removeCart.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
});

/************FORMULAIRE ************/

const nameRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ,.'-]+$/i;
const zipRegex = /[0-9]{5}(-[0-9]{4})?/;
const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
const addressRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ0-9\s,.'-]{3,}$/;

// Validité des inputs
watchValidity(document.getElementById('firstName'), (e) => nameRegex.test(e.target.value));
watchValidity(document.getElementById('lastName'), (e) => nameRegex.test(e.target.value));
watchValidity(document.getElementById('email'), (e) => emailRegex.test(e.target.value));
watchValidity(document.getElementById('address'), (e) => addressRegex.test(e.target.value));
watchValidity(document.getElementById('inputZip'), (e) => zipRegex.test(e.target.value));
watchValidity(document.getElementById('inputState'), (e) => nameRegex.test(e.target.value));
watchValidity(document.getElementById('city'), (e) => nameRegex.test(e.target.value));


/***************Envoi formulaire serveur*****************/

document.getElementById("btnOrder").onclick = (e) => {
    e.preventDefault();

    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const inputZip = document.getElementById("inputZip").value;
    const email = document.getElementById("email").value;

    if (articleInLocalStorage == 0)
        return alert("Veuillez sélectionner un article avant de valider la commande");

    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address + ' ' + inputZip,
            city: city,
            email: email
        },
        products: articleInLocalStorage.map(item => item.articleId)
    };

    postOrder(order);
};

