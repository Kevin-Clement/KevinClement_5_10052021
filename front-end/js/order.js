const orderId = new URL(window.location.href).searchParams.get('id');

document.getElementById("commandId").innerHTML = `${orderId}`;

//si il y a quelque chose dans le localstorage on additionne les prix
if (articleInLocalStorage != null) {
    sumPrice();
    document.getElementById("totalPrice").innerHTML = `${totalSum}.00 €`;
};

// On clear le localstorage
if (window.location.href != orderId) {
    localStorage.clear();
};

