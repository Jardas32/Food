const storegCard = JSON.parse(localStorage.getItem(`cart`)) || [];
const total = document.querySelector(`.total`);
const cart = document.querySelector(`.cart`);
const count = document.querySelector(`.count`);
const priceTotal = document.querySelector(`.total span`);
const cartTitle = document.querySelector(`.cartTitle`);
const imgempt = document.querySelector(`.imgempty`);

count.innerHTML = storegCard.length;

if (storegCard.length <= 0) {
    total.style.display = `none`;
    imgempt.style.display = `block`;
}

if(storegCard.length > 0) {
    cartTitle.innerHTML = `Your cart`;
    imgempt.style.display = `none`;
}

function renderCard() {
    cart.innerHTML = ``;
    if (storegCard.length > 0) {
        storegCard.forEach((el, index) => {
            let { idcart, img, title, pricenumb, opis, quantity = 1 } = el;
            
            let newCard = document.createElement('div');
            newCard.setAttribute(`class`, `newCard`);
            newCard.innerHTML = `
                <div class="newCard">
                    <img class="imgcart" src="${img}" alt="">
                    <p class="titlecart">${title}</p>
                    <p class="pricecart" data-price="${pricenumb}">${pricenumb * quantity}$</p>
                    <p class="opiscart">${opis}</p>
                    <div class="counts">
                        <span class="spanMinus" data-minus="${idcart}">-</span>
                        <input class="inputcount" type="text" value="${quantity}" readonly>
                        <span class="spanPlus" data-plus="${idcart}">+</span>
                    </div>
                    <button data-index="${index}" class="btClosed">X</button>
                </div>
            `;
            cart.append(newCard);
        });
    }
    updateTotalPrice();
}

function updateTotalPrice() {
    let totalprice = storegCard.reduce((acc, item) => acc + item.pricenumb * (item.quantity || 1), 0);
    priceTotal.innerHTML = `${totalprice}$`;
}

cart.addEventListener('click', event => {
    if (event.target.classList.contains('spanPlus')) {
        let id = event.target.getAttribute('data-plus');
        let item = storegCard.find(el => el.idcart == id);

        if (item) {
            item.quantity = (item.quantity || 1) + 1;
            localStorage.setItem('cart', JSON.stringify(storegCard));
            renderCard();
        }
    }

    if (event.target.classList.contains('spanMinus')) {
        let id = event.target.getAttribute('data-minus');
        let item = storegCard.find(el => el.idcart == id);

        if (item && item.quantity > 1) {
            item.quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(storegCard));
            renderCard();
        }
        
    }
});

renderCard();

                    // Удаление товаров

document.onclick = (event) => {
    const cartPosition = event.target.getAttribute('data-index');
    if(event.target.classList.contains('btClosed') && cartPosition !== null) {
        storegCard.splice(cartPosition, 1);
        localStorage.setItem(`cart`, JSON.stringify(storegCard));
        renderCard();
        location.reload();
    }
};  
