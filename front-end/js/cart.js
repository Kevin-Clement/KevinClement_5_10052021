//Variable articleInLocalStorage dans laquelle on met les keys values dans le localStorage
let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));

const productCart = document.getElementById("products-tablebody");

//Si le panier est vide 
if (articleInLocalStorage === null || articleInLocalStorage == 0) {
    const emptyCart = `
    <tr id="title-cart-empty" class="col-12 mx-auto">
        <td></td>
        <td class="text-center">Votre panier est vide</td>
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
            <td class="text-center removeArticle"><button class="btn-trash" aria-label="bouton poubelle suppression"><i class="fas fa-trash-alt"></button></td>
        </tr>`;

    }

    if (i == articleInLocalStorage.length) {
        productCart.innerHTML = structureCart;
    }

    //Calcul total quantité
    let totalQuantity = 0;
    articleInLocalStorage.forEach((optionsProduct) => {
        totalQuantity += optionsProduct.quantity;
    });

    //Calcul somme total panier
    let totalSum = 0;
    articleInLocalStorage.forEach((article) => {
        totalSum += article.price;
    });

    document.getElementById("products-footer").innerHTML = `
    <tr class="col-12">
        <td class="text-center font-weight-bolder totalsum text-uppercase">Total</td>
        <td class="text-center font-weight-bolder">${totalQuantity}</td>
        <td class="text-center totalsum"><strong>${totalSum}.00€</strong></td>
        <td></td>
    </tr>`;

}

//*********************Bouton supprimer************************
//Selection du bouton

let removeArticle = document.querySelectorAll(".removeArticle");
// console.log(removeArticle);

for (let k = 0; k < removeArticle.length; k++) {
    removeArticle[k].addEventListener("click", (e) => {
        e.preventDefault();

        let removeIdSelect = articleInLocalStorage[k].theId;
        // attention probleme suppression de tous les memes id 
        articleInLocalStorage = articleInLocalStorage.filter(elt => elt.theId !== removeIdSelect);
        console.log(articleInLocalStorage)

        // stringify() convertit une valeur JavaScript en chaîne JSON et envoie dans la key "article" du localStorage
        localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
        window.location.reload();
    })
}

//Vider le panier
let removeCart = document.querySelector(".removeCart");

removeCart.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
})

// On écoute le bouton btnOrder
let addEventListenerBtnOrder = document.getElementById("btnOrder").onclick = (e) => {
    e.preventDefault()
    sendOrder()

}

function sendOrder() {
    const lastName = document.getElementById("lastName").value
    const firstName = document.getElementById("firstName").value
    const address = document.getElementById("adress").value
    const city = document.getElementById("city").value
    const inputState = document.getElementById("inputState").value
    const inputZip = document.getElementById("inputZip").value
    const email = document.getElementById("email").value

    const nameRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ,.'-]+$/i
    const addressRegex = /^[a-zA-Zàâçéèêëîïôûùüÿñæœ0-9\s,.'-]{3,}$/
    const zipRegex = /[0-9]{5}/g
    const emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/

    if (!(
            nameRegex.test(firstName) &&
            nameRegex.test(lastName) &&
            addressRegex.test(address) &&
            nameRegex.test(city) &&
            nameRegex.test(inputState) &&
            zipRegex.test(inputZip) &&
            emailRegex.test(email)
        )) {
        alert("Veuillez remplir les champs correctements avant de valider la commande")
        return
    }

    if (articleInLocalStorage == null || articleInLocalStorage == 0 ) {
        alert("Veuillez sélectionner un article avant de valider la commande")
        return
    }

    const order = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address + ' ' + inputZip,
            city: city,
            email: email
        },
        products: articleInLocalStorage.map(item => item.theId)

    }
    console.log(order)

    const requestArticles = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
    }


    fetch("http://localhost:3000/api/cameras/order", requestArticles)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            window.location.href = `order.html?${json.orderId}`
        })
        .catch(() => {
            alert(error)
        })

}