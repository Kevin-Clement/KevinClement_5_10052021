
//************************fonction main qui s'execute des le chargement de la page****************

(async function () {
    //On attend les données avec await de la promesse fetch
    const articles = await getArticles()

    for (article of articles) {
        displayArticles(article)
    }
})()

//**********************************Récupération des articles**************************************

function getArticles() {
    //On return tout le fetch qui est une promesse
    return fetch("http://localhost:3000/api/cameras")
        //transformation en json
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récupération de tous les articles
        .then(function (articles) {
            return articles
        })
        //Au cas ou il ne marche pas
        .catch(function (error) {
            alert(error)
        })
}

//*******************************Affichage de tous les articles dans la page*************************

function displayArticles(article) {
    document.getElementById("articles").innerHTML += `
        <div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-4 mb-4 pt-3 pb-3 shadow">
            <a href="/front-end/product.html?${article._id}" class="card text-decoration-none text-reset">
                <div class="card-img">
                    <img class="card-img-top" src="${article.imageUrl}" alt="">
                </div>
                <div class="card-body">
                    <h5 class="card-title"><strong>${article.name}</strong> ${(article.price)/100}.00 €</h5>
                    <p class="card-text">${article.description}</p>
                </div>
            </a>
        </div>`
}

