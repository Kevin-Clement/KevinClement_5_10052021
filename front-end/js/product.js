//Récupération de la chaine de requête dans l'url en cours avec window.location 
//et la propriété search qui est la partie qui suit le ? inclut
const queryString_url_id = window.location.search;

//On Extrait l'id sans le ?
const theId = queryString_url_id.slice(1);

(async function () {
    //On attend les données avec await de la promesse fetch
    await getArticle()
})()

//**********************************Récupération de l'article**************************************

function getArticle() {
    //On return tout le fetch qui est une promesse
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
            // Selection du bouton Ajouter au panier

            const userChoice = document.getElementById("btnAddCart");

            // On écoute le bouton
            userChoice.addEventListener("click", (e) => {
                //methode preventDefault : action par défaut ne doit pas être prise en compte 
                //(réactualise pas la page ici)
                e.preventDefault();

                // Récupération des informations du formulaire
                // Création Objet 
                let optionsProduct = {
                    name: article.name,
                    theId: article._id,
                    quantity: 1,
                    price: article.price / 100,
                };
                // console.log(optionsProduct)

                //****************Local storage****************/
                //Variable articleInLocalStorage dans laquelle on met les keys values dans le localStorage
                // parse() converti les données au format JSON qui sont dans le localstorage en objet JS
                //Methode getItem renvoie la valeur associée à la clé passé en paramètre "article"
                let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));

                // popup confirm() pour soit aller au panier ou retourner à l'acceuil;
                const popupConfirm = () => {
                    if (window.confirm(
                            `${article.name} au prix de ${article.price / 100}.00€ a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'acceuil ANNULER`)) {
                        window.location.href = "cart.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
                // Fonction pour ajout article 
                const addArticleLocalStorage = () => {
                    //Ajout dans le tableau articleInLocalStorage de l'objet optionsProduct
                    articleInLocalStorage.push(optionsProduct);
                    // stringify() convertit une valeur JavaScript en chaîne JSON et envoie dans la key "article" du localStorage
                    //Methode setItem permet l'ajout à l'emplacement de stockage 
                    localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
                }
                // Si il y a déjà des articles dans le localStorage
                //Condition True
                if (articleInLocalStorage) {
                    addArticleLocalStorage();
                    console.log(articleInLocalStorage);
                    popupConfirm();
                }
                // Si il n'y a pas d'articles dans le localStorage
                //Condition False
                else {
                    articleInLocalStorage = [];
                    addArticleLocalStorage();
                    popupConfirm();
                }
            })
        })
        //Au cas ou il ne marche pas
        .catch(function (error) {
            alert(error)
        })
}