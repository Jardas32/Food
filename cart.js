const storegCard = JSON.parse(localStorage.getItem(`cart`) || []);
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

function quantityPrice() {
    let totalprice = storegCard.reduce((acc, item)  => {
        console.log(item.quantity)
        return acc + item.pricenumb * item.quantity;
      },0)
      
      priceTotal.textContent = `${totalprice}$`
}

function renderCard() {
    cart.innerHTML = ``;
    if (storegCard) {
        storegCard.forEach((el, index) => {
        let { idcart, img, title, pricenumb, opis, quantity = 1 } = el;
        let newCard = document.createElement('div');
            newCard.setAttribute(`class`, `newCard`);
            newCard.innerHTML = `
                <div id="${idcart}" class="newCard">
                    <img class="imgcart" src="${img}" alt="">
                    <p class="titlecart">${title}</p>
                    <p class="pricecart">${pricenumb * quantity}$</p>
                    <p class="opiscart">${opis}</p>
                    <div class="counts">
                        <span class="spanMinus" data-index="${index}">-</span>
                        <input class="inputcount" type="text" value="${quantity}" readonly>
                        <span class="spanPlus" data-index="${index}">+</span>
                    </div>
                    <button data-index="${index}" class="btClosed">X</button>
                </div>
            `;
            cart.append(newCard);
            
        });

    }
    quantityPrice();
    
}

cart.addEventListener('click', (event) => {
    const index = event.target.dataset.index;

    if(event.target.classList.contains('spanPlus')) {
        storegCard[index].quantity = (storegCard[index].quantity) + 1; 
    }
    else if(event.target.classList.contains('spanMinus')) {
        storegCard[index].quantity -= 1;
        
        if(storegCard[index].quantity <= 0) {
            storegCard.splice(index, 1)
            location.reload();
        }
    }
    localStorage.setItem('cart', JSON.stringify(storegCard))
    renderCard();
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
