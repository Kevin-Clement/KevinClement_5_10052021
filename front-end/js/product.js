//Récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

//On Extrait l'id sans le ?

const theId = queryString_url_id.slice(1);
console.log(theId);

(async function () {
    //On attend les données avec await de la promesse fetch
    const article = await getArticle()
})()

//**********************************Récupération des articles**************************************

function getArticle() {
    //On return tout le fetch qui est une promesse
    return fetch(`http://localhost:3000/api/cameras/${theId}`)
        //transformation en json
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        //Récupération de l'article
        .then(function (article) {
            console.log(article);
            document.getElementById("article").innerHTML = `
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
        })
        //Au cas ou il ne marche pas
        .catch(function (error) {
            alert(error)
        })

}
