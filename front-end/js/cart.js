const productCart = document.getElementById("products-tablebody");

//Si le panier est vide 
if (articleInLocalStorage === null || articleInLocalStorage == 0) {
    const emptyCart = `
    <tr id="title-cart-empty" class="col-12 mx-auto">
        <td></td>
        <td class="text-center">Votre panier est vide</td>
        <td></td>
    </tr>`;
    productCart.innerHTML = emptyCart;
} else {
    let structureCart = [];
    //Ajout de tous les articles du localStorage avec une boucle for
    for (i = 0; i < articleInLocalStorage.length; i++) {
        structureCart += `
        <tr class="col-12">
            <td class="text-center"><strong>${articleInLocalStorage[i].name}</strong></td>
            <td class="text-center">1</td>
            <td class="text-center">${(articleInLocalStorage[i].price)}.00 €</td>
            <td class="text-center removeArticle"><button class="btn-trash" aria-label="bouton poubelle suppression"><i class="fas fa-trash-alt"></button></td>
        </tr>`;
    };
    productCart.innerHTML = structureCart;

    //Calcul total quantité
    sumQuantity();

    //Calcul somme total panier
    sumPrice();
    
    document.getElementById("products-footer").innerHTML = `
    <tr class="col-12">
        <td class="text-center font-weight-bolder totalsum text-uppercase">Total</td>
        <td class="text-center font-weight-bolder">${totalQuantity / 2}</td>
        <td class="text-center totalsum"><strong>${totalSum}.00€</strong></td>
        <td></td>
    </tr>`;

};

//*********************Bouton supprimer************************
//Selection du bouton
let removeArticle = document.querySelectorAll(".removeArticle");

for (let k = 0; k < removeArticle.length; k++) {
    removeArticle[k].addEventListener("click", (e) => {
        // evite le rechargement de la page
        e.preventDefault();
        //Suppression grace a l'id de l'article
        let removeIdSelect = articleInLocalStorage[k].theId;
        // Ici Methode filter garde tous les elements qui remplissent différent de removeIdSelect
        articleInLocalStorage = articleInLocalStorage.filter(elt => elt.theId !== removeIdSelect);
        // stringify() convertit une valeur JavaScript en chaîne JSON et envoie dans la key "article" du localStorage
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

function watchValidity(elt, condition) {
    elt.oninput = (e) => {
        if (condition(e)) {
            validInputElt(e.target);
        }
    }
    
    elt.onblur = (e) => {
        if (!condition(e)) {
            invalidInputElt(e.target);
            return alert("Veuillez remplir les champs correctements avant de valider la commande");
        }
    }
};

function validInputElt(elt) {
    elt.style.border = 'solid 1px green';
    elt.style.boxShadow = '#00800066 0px 0px 4px';
};

function invalidInputElt(elt) {
    elt.style.border = 'solid 1px red';
    elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px';
};

/***************Envoi formulaire serveur*****************/

let addEventListenerBtnOrder = document.getElementById("btnOrder").onclick = (e) => {
    e.preventDefault();

    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const inputZip = document.getElementById("inputZip").value;
    const email = document.getElementById("email").value;
    
    if (articleInLocalStorage == null || articleInLocalStorage == 0) {
        return alert("Veuillez sélectionner un article avant de valider la commande");
    };

    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address + ' ' + inputZip,
            city: city,
            email: email
        },
        products: articleInLocalStorage.map(item => item.theId)
    };

    const requestArticles = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
    };

    fetch("http://localhost:3000/api/cameras/order", requestArticles)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            window.location.href = `order.html?id=${json.orderId}`
        })
        .catch(() => {
            alert(error)
        })

};