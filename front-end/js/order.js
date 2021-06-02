const orderId = new URL(window.location.href).searchParams.get('id');

document.getElementById("commandId").innerHTML = `${orderId}`;

sumPrice();
document.getElementById("totalPrice").innerHTML = `${totalSum}.00 €`;

// On clear le localstorage
if (window.location.href != orderId) {
    localStorage.clear();
};