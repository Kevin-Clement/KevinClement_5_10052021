let articleQuantity = getBasket();
const quantityCart = document.querySelector(".quantityCart");

if (articleQuantity != 0){
    quantityCart.classList.add("activeQuantityCart");
    quantityCart.innerHTML = `${sumQuantity()}`;
};