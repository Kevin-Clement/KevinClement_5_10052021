let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));
let totalSum = 0;
let totalQuantity = 0;

    function sumPrice(){
        articleInLocalStorage.forEach((article) => {
            totalSum += article.price;
        });
    }
    function sumQuantity(){
        articleInLocalStorage.forEach((optionsProduct) => {
            totalQuantity += optionsProduct.quantity;
        });
    }

