import getArticles from "./Services/articleApiService.js";

const articlesNode = document.getElementById("articles");
const articles = await getArticles();

const displayArticles = () => {
    
    articles.forEach(article => {
        articlesNode.innerHTML +=
                `<div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-4 mb-4 pt-3 pb-3 shadow">
                <a href="/front-end/product.html?id=${article._id}" class="card text-decoration-none text-reset">
                    <div class="card-img">
                        <img class="card-img-top" src="${article.imageUrl}" alt="">
                    </div>
                    <div class="card-body">
                        <p class="h5 card-title"><strong>${article.name}</strong> ${(article.price)/100}.00 €</p>
                        <p class="card-text">${article.description}</p>
                    </div>
                    <button class=" mt-2 mb-4 mx-auto btn-infocart">Plus d'informations</button>
                </a>
            </div>`
    });
}

displayArticles();

