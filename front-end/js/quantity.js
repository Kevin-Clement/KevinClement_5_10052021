let quantityArticleInLocalStorage = JSON.parse(localStorage.getItem("article"));
let totalQuantity = 0;
if (quantityArticleInLocalStorage != (null || 0)) {
    quantityArticleInLocalStorage.forEach((optionsProduct) => {
        totalQuantity += optionsProduct.quantity;
    });
    document.querySelector(".quantityCart").classList.add("activeQuantityCart");
}

let sum = document.querySelector(".quantityCart").innerHTML = `${totalQuantity}`;