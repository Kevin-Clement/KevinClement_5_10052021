let quantityArticleInLocalStorage = JSON.parse(localStorage.getItem("article"));
let totalQuantity = 0;

if (quantityArticleInLocalStorage === null || quantityArticleInLocalStorage == 0) {

    document.querySelector(".quantityCart").classList.remove("activeQuantityCart");

}else{

    quantityArticleInLocalStorage.forEach((optionsProduct) => {
        totalQuantity += optionsProduct.quantity;
    });
    document.querySelector(".quantityCart").classList.add("activeQuantityCart");
    
}

let sum = document.querySelector(".quantityCart").innerHTML = `${totalQuantity}`;