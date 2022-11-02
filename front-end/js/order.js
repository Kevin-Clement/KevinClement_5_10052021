const orderId = new URL(window.location.href).searchParams.get('id');

document.getElementById("commandId").innerHTML = `${orderId}`;

document.getElementById("totalPrice").innerHTML = `${sumPrice()}.00 €`;

// On clear le localstorage
if (window.location.href != orderId) {
    localStorage.clear();
};