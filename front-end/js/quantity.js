let articleQuantity = getBasket();

if (articleQuantity != 0){
    sumQuantity();
    document.querySelector(".quantityCart").classList.add("activeQuantityCart");
    document.querySelector(".quantityCart").innerHTML = `${totalQuantity}`;
};