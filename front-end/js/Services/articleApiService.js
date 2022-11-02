const ENDPOINT = "http://localhost:3000/api/cameras";

export default function getArticles() {
    return fetch(ENDPOINT)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then(
        data => data
    ).catch (err => console.log(err))
}

export function getArticle(articleId) {
    return fetch(`${ENDPOINT}/${articleId}`)
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((data) => data)
        .catch(err => console.log(err))
}

export function postOrder(order) {

    const requestArticles = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
    };

    fetch(`${ENDPOINT}/order`, requestArticles)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            window.location.href = `order.html?id=${json.orderId}`
        })
        .catch(() => {
            alert(error)
        })

}