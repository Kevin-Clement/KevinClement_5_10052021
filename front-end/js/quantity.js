
if (articleInLocalStorage === null || articleInLocalStorage == 0) {

    document.querySelector(".quantityCart").classList.remove("activeQuantityCart");

}else{

    sumQuantity();
    document.querySelector(".quantityCart").classList.add("activeQuantityCart");
    document.querySelector(".quantityCart").innerHTML = `${totalQuantity}`;

};