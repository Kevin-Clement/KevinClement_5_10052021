
function getBasket() {
    let basket = localStorage.getItem("article");
    if(basket == undefined){
        return [];
    }else{
        return JSON.parse(basket)
    }
}

let totalSum = 0;
let totalQuantity = 0;

function sumPrice(){
    let articleInLocalStorage = getBasket()
    articleInLocalStorage.forEach((article) => {
            totalSum += article.price;
        });
    }
    function sumQuantity(){
        let articleInLocalStorage = getBasket()
        articleInLocalStorage.forEach((optionsProduct) => {
            totalQuantity += optionsProduct.quantity;
        });
    }

