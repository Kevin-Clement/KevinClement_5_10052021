const queryString_url_orderId = window.location.search;
const orderId = queryString_url_orderId.slice(1);
console.log(orderId)
//On récupere les infos des articles dans le localstorage
let totalPriceInLocalStorage = JSON.parse(localStorage.getItem("article"));
let totalPrice = 0;
//si il y a quelque chose dans le localstorage on additionne les prix
if (totalPriceInLocalStorage != null) {
    totalPriceInLocalStorage.forEach((optionsProduct) => {
        totalPrice += optionsProduct.price;
    });
    console.log(totalPrice)
}
// On clear le localstorage
if (window.location.href != queryString_url_orderId) {
    localStorage.clear();
}

document.getElementById("totalPrice").innerHTML = `${totalPrice}.00 €`

document.getElementById("commandId").innerHTML = `${orderId}`