const cardset = document.querySelectorAll(`.card`);
const storegCard = JSON.parse(localStorage.getItem(`cart`)) || [];
const count = document.querySelector(`.count`);
count.innerHTML = storegCard.length;


cardset.forEach(el => {
    // console.dir(cardset);
    let idcart = el.id;
    let img = el.childNodes[1].attributes.src.textContent;
    let title = el.childNodes[3].textContent;
    let price = el.childNodes[5].textContent;
    let opis = el.childNodes[7].textContent;
    let btadd = el.childNodes[11];

let pricenumb = parseInt(price.replace(/[^\d]/g, ""), 10);    

btadd.addEventListener(`click`, function() {
    let cards = {idcart, img, title, pricenumb, opis, quantity: 1};

    const cardstoreg = localStorage.getItem(`cart`) || "[]";
    let cart = JSON.parse(cardstoreg);
    
    const existCard = cart.findIndex(item => item.idcart === idcart);

if(existCard !== -1) {
    alert(`Такой товар уже добавлен!`);
    // cart[existCard].pricenumb += pricenumb;
}
else {
    cart.push(cards);
}
localStorage.setItem(`cart`, JSON.stringify(cart));
location.reload();
})

});

                //  Go--Up

const goup = document.querySelector(`.goup`);
goup.addEventListener(`click`, goUp);
window.addEventListener(`scroll`, trackScroll);

function trackScroll() {
    const offset = window.pageYOffset;
    const coord = document.documentElement.clientHeight;
    if(offset > coord) {
        goup.classList.add('goupclass');
    }else {
        goup.classList.remove('goupclass');
    }
};                

function goUp() {
    if(window.pageYOffset > 0) {  //  Остановка страницы
        window.scrollBy(0, -77);
        setTimeout(goUp, 0)
    }
};

                    // Навигационое меню

const features = document.querySelector('.features');
const about = document.querySelector(`.about`);
const menu = document.querySelector(`.menu`);
const contact = document.querySelector(`.contact`);
const home = document.querySelector(`.home`);

features.addEventListener('click', () => {
    document.querySelector('.features-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

about.addEventListener(`click`, () => {
    document.querySelector('.about-section').scrollIntoView({
        behavior: `smooth`,
        block: `start`
    })
});

menu.addEventListener(`click`, () => {
    document.querySelector('.menu-section').scrollIntoView({
        behavior: `smooth`,
        block: `start`
    })
});

contact.addEventListener(`click`, () => {
    document.querySelector('.contact-section').scrollIntoView({
        behavior: `smooth`,
        block: `start`
    })
});

home.addEventListener(`click`, () => {
    document.querySelector('.home-section').scrollIntoView({
        behavior: `smooth`,
        block: `start`
    })
});



