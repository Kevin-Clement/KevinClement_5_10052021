let quantityArticleInLocalStorage = JSON.parse(localStorage.getItem("article"));
let totalQuantity = 0;
if (quantityArticleInLocalStorage != null) {
    quantityArticleInLocalStorage.forEach((optionsProduct) => {
        totalQuantity += optionsProduct.quantity;
    });
}

let sum = document.querySelector(".quantityCart").innerHTML = `${totalQuantity}`;