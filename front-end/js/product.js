//Récupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;

//On Extrait l'id sans le ?

const theId = queryString_url_id.slice(1);
// console.log(theId);


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
            // console.log(article);
            document.getElementById("article").innerHTML = `
            <div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-2 mb-0 pt-3 pb-3 shadow">
                <div class="card text-decoration-none text-reset">
                    <div class="card-img">
                        <img class="card-img-top" src="${article.imageUrl}" alt="">
                    </div>
                </div>
            </div>
            <div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-2 mb-0 pt-3 pb-3 shadow">
                <div class="card text-decoration-none text-reset">
                    <div class="card-body pb-5">
                        <h5 class="card-title"><strong>${article.name}</strong> ${(article.price)/100}.00 €</h5>
                        <p class="card-text">${article.description}</p>
                        <form>
                            <label for="option">Choisir l'option : </label>
                                <select name="option" id="choix_option">
                                    ${article.lenses.map((lense)=>`
                                    <option value="">${lense}</option>
                                    `).join()}
                                </select>
                        </form>
                        <button id="btn" type="submit" name="btn">Ajoutez l'article au panier</button>
                    </div>
                </div>
            </div>`;
            //********************************************PANIER ****************************************/
            // Selection du bouton Ajouter au panier

            const userChoice = document.getElementById("btn");
            console.log(userChoice);

            // On écoute le bouton
            userChoice.addEventListener("click", (e) => {
                e.preventDefault();

                // Récupération des informations du formulaire
                // Création Objet 
                let optionsProduct = {
                    name: article.name,
                    theId: article._id,
                    quantity: 1,
                    price: article.price / 100,
                };
                console.log(optionsProduct)

                //****************Local storage****************/
                // parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript
                let articleInLocalStorage = JSON.parse(localStorage.getItem("article"));

                // popup confirm() pour soit aller au panier ou retourner à l'acceuil;
                const popupConfirm = () =>{
                    if(window.confirm( 
                        `${article.name} au prix de ${article.price / 100}.00€ a bien été ajouté au panier 
Consultez le panier OK ou revenir à l'acceuil ANNULER`)){
                        window.location.href = "panier.html";
                    }else{
                        window.location.href = "index.html";
                    }
                }
                // Si il y a déjà des articles dans le localStorage
                if (articleInLocalStorage) {
                    articleInLocalStorage.push(optionsProduct);
                    // stringify() convertit une valeur JavaScript en chaîne JSON
                    localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
                    console.log(articleInLocalStorage);
                    popupConfirm();
                }
                // Si il n'y a pas d'articles dans le localStorage
                else {
                    articleInLocalStorage = [];
                    articleInLocalStorage.push(optionsProduct);
                    localStorage.setItem("article", JSON.stringify(articleInLocalStorage));
                    console.log(articleInLocalStorage);
                    popupConfirm();
                }
            })
        })
        //Au cas ou il ne marche pas
        .catch(function (error) {
            alert(error)
        })
}