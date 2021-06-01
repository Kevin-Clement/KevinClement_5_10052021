
(async function () {
    const theId = new URL(window.location.href).searchParams.get('id');
    return fetch(`http://localhost:3000/api/cameras/${theId}`)
    //transformation en json
    .then(function (httpBodyResponse) {
        return httpBodyResponse.json()
    })
    //Récupération de l'article
    .then(function (article) {
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
                    <button class="btn-infocart"id="btnAddCart" type="submit" name="btn">Ajoutez l'article au panier</button>
                </div>
            </div>
        </div>`;
        //********************************************PANIER ****************************************/

        // Récupération des informations du formulaire
        // Création Objet 
        
        let optionsProduct = {
            name: article.name,
            theId: article._id,
            quantity: 1,
            price: article.price / 100,
        };

        const popupConfirm = () => {
            if (window.confirm(
                `${article.name} au prix de ${article.price / 100}.00€ a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'acceuil ANNULER`)) {
                    window.location.href = "cart.html";
                } else {
                    window.location.href = "index.html";
                }
            };
            
        function addArticleInLocalStorage() {
            articleInLocalStorage.push(optionsProduct);
            localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
        };
        
        const userChoice = document.getElementById("btnAddCart");

        userChoice.addEventListener("click", () => {
            // Si il y a déjà des articles dans le localStorage
            //Condition True
            if (articleInLocalStorage) {
                addArticleInLocalStorage();
                popupConfirm();
            }
            // Si il n'y a pas d'articles dans le localStorage
            //Condition False
            else {
                articleInLocalStorage = [];
                addArticleInLocalStorage();
                popupConfirm();
            }
        });
    })

    .catch(function (error) {
        alert(error)
    })

})();

