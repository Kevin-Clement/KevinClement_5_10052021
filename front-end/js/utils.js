function getBasket() {
    let basket = localStorage.getItem("article");
    if (basket == undefined)
    return []
    else
    return JSON.parse(basket)
}

let articleInLocalStorage = getBasket()
let totalSum = 0;
let totalQuantity = 0;

function sumPrice() {
    articleInLocalStorage.forEach((article) => {
        totalSum += article.price;
    });
    return totalSum;
}

function sumQuantity() {
    articleInLocalStorage.forEach((optionsProduct) => {
        totalQuantity += optionsProduct.quantity;
    });
    return totalQuantity;
}

function watchValidity(elt, condition) {
    elt.oninput = (e) => {
        if (condition(e)) 
            validInputElt(e.target);
    }

    elt.onblur = (e) => {
        if (!condition(e)) 
            invalidInputElt(e.target);
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