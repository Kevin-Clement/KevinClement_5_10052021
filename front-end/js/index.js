//************************fonction main qui s'execute des le chargement de la page****************

(async function () {
    //On attend les données avec await de la promesse fetch
    const articles = await getArticles();
    for (article of articles) {
        displayArticles();
    }
})();

//**********************************Récupération des articles**************************************

function getArticles() {
    //On return tout le fetch qui est une promesse qui n'est pas encore résolue
    return fetch("http://localhost:3000/api/cameras")
        //Fonction qu'il execute a la récupération des données
        //transformation en json du paramètre
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récupération de tous les articles
        .then(function (articles) {
            return articles
        })
        //Au cas ou il ne marche pas (si l'API est down par exemple)
        .catch(function (error) {
            alert(error)
        })
};

function displayArticles() {
    document.getElementById("articles").innerHTML += `
        <div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-4 mb-4 pt-3 pb-3 shadow">
            <a href="/front-end/product.html?id=${article._id}" class="card text-decoration-none text-reset">
                <div class="card-img">
                    <img class="card-img-top" src="${article.imageUrl}" alt="">
                </div>
                <div class="card-body">
                    <p class="h5 card-title"><strong>${article.name}</strong> ${(article.price)/100}.00 €</p>
                    <p class="card-text">${article.description}</p>
                </div>
                <button class="col-lg-7 col-md-4 col-7 mt-2 mb-4 mx-auto btn-infocart">Plus d'informations</button>
            </a>
        </div>`;
}