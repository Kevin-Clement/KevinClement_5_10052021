(async function () {
    const articleId = getArticleId();
    const articleData = await getArticle(articleId);
    console.log(articleData)
    displayArticle(articleData);
})();

function getArticleId() {
    return new URL(window.location.href).searchParams.get('id')
}

function getArticle(articleId) {
    return fetch(`http://localhost:3000/api/cameras/${articleId}`)
        //transformation en json
        .then((httpBodyResponse) => httpBodyResponse.json())
        //Récupération de l'article
        .then((articleData) => articleData)
        .catch(function (error) {
            alert(error)
        })
}

function displayArticle(article) {
    document.getElementById("articleName").innerHTML = `${article.name}`
    document.getElementById("article").innerHTML = `
    <div class="card justify-content-center col-lg-5 col-md-12 col-sm-12 col-12 mt-2 pt-3 pb-3 shadow">
        <div>
            <img class="card-img" src="${article.imageUrl}" alt="">
        </div>
    </div>
    <div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-2 pt-3 pb-3 shadow">
        <div class="card text-decoration-none text-reset">
            <div class="card-body pb-5">
                <p class="h5 card-title"><strong>${article.name}</strong> ${(article.price)/100}.00 €</p>
                <p class="card-text">${article.description}</p>
                <form>
                    <label for="option">Choisir l'option : </label>
                        <select name="option" id="choix_option">
                            ${article.lenses.map((lense)=>`
                            <option value="">${lense}</option>
                            `).join()}
                        </select>
                </form>
                <button class="btn-infocart" id="btnAddCart" type="submit" name="btn">Ajoutez l'article au panier</button>
            </div>
        </div>
        </div>`;
    //********************************************PANIER ****************************************/
    const userChoice = document.getElementById("btnAddCart");
    userChoice.addEventListener("click", () => {
        let articleInLocalStorage = getBasket();
        let optionsProduct = {
            name: article.name,
            articleId: article._id,
            quantity: 1,
            price: article.price / 100,
        };
        articleInLocalStorage.push(optionsProduct);
        localStorage.setItem("article", JSON.stringify(articleInLocalStorage));

        if (window.confirm(
                `${article.name} au prix de ${article.price / 100}.00€ a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'acceuil ANNULER`)) {
            window.location.href = "cart.html";
        } else {
            window.location.href = "index.html";
        }
    });

};