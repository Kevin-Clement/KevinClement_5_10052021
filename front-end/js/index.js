
async function getArticles() {
    let articles = await fetch("http://localhost:3000/api/cameras")
    return await articles.json();
}

async function displayArticles() {
    await getArticles ()
    .then(function (resultAPI){
        const articles = resultAPI;
        console.table(articles);
        for (let article in articles) {
            document.getElementById("articles").innerHTML +=
                    `<div class="card col-lg-5 col-md-12 col-sm-12 col-12 mt-4 mb-4 pt-3 pb-3 shadow">
                    <a href="/front-end/product.html?id=${resultAPI[article]._id}" class="card text-decoration-none text-reset">
                        <div class="card-img">
                            <img class="card-img-top" src="${resultAPI[article].imageUrl}" alt="">
                        </div>
                        <div class="card-body">
                            <p class="h5 card-title"><strong>${resultAPI[article].name}</strong> ${(resultAPI[article].price)/100}.00 €</p>
                            <p class="card-text">${resultAPI[article].description}</p>
                        </div>
                        <button class=" mt-2 mb-4 mx-auto btn-infocart">Plus d'informations</button>
                    </a>
                </div>`
        }
    })
    .catch (function(error){
        return error;
    });
}

displayArticles();
