import {PAGE} from './states';
import cats from './cats';

const CATFACE = "&#128049"; // cat face emoji in html

const catsHtml = cats.map((cat, index) => {
    return `
        <div class="cat__card">
            <h2 class="cat__name">${cat.name}</h2>
            <img class="cat__img" alt="" 
                src=${cat.imgURL}/>
            <span class="cat__price">Price: $${cat.price}</span>
            <button class="cat__btn add__btn" data-index=${index}>Add to Cart</button>
        </div>
    `;
}).join('');

function renderProducts(state, rootEl){
    rootEl.innerHTML=`
        <header> 
            <h1 class="header__title">Cats List</h1>
        </header>
        <nav class="cart__page">
            <div class="cart__container">
                <button class="cart__btn view-cart__btn">
                    View Cart ${CATFACE} ${state.totalQty ? state.totalQty : ""}
                </button>
            </div>
        </nav>
        <div class="product__page"> 
            ${catsHtml}
        </div>
    `;
};

function renderCart(state, rootEl){
    let cartHtml = cats.map((cat) => {
        if(state.cart[cat.name]){
            const currentTotal = (cat.price * state.cart[cat.name]).toFixed(2);
            return `
                <li class="cart__item">
                    <img class="item__img" alt="" 
                        src=${cat.imgURL}/>
                    <div class="item__info"> 
                        <h2 class="item__name">${cat.name}</h2>
                        <span class="item__price">Price: $${cat.price}</span>
                        <span class="item__number">Quantity: ${state.cart[cat.name]}</span>
                        <span class="item__total">Sub-Total: ${currentTotal}</span>
                    </div>
                    <div class="cart__btn-group">
                        <button class="cart__btn increase__btn" data-name=${cat.name}> + </button>
                        <button class="cart__btn decrease__btn" data-name=${cat.name}> - </button>
                    </div>
                </li>
            `;
        }
    }).join('');

    if (cartHtml == ''){
        cartHtml = `
            <li class="cart__item cart__empty-notice"> 
                <span>Nothing in the cart</span>
            </li>
        `;
    }

    rootEl.innerHTML = `
        <header> 
            <h1 class="header__title">Cats List</h1>
        </header>
        <nav class="cart__page">
            <div class="cart__container">
                <button class="cart__btn hide-cart__btn">
                    Hide Cart ${CATFACE} ${state.totalQty ? state.totalQty : ""}
                </button>
                <ul class="cart__list">
                    ${cartHtml}
                    <li class="cart__item cart__totalSum">
                        <span>Total: $${state.totalSum}</span>
                    </li>
                    <button class="cart__btn checkout__btn"> Checkout </button>
                </ul>
            </div>
        </nav>
        <div class="product__page">
            ${catsHtml}
        </div>
    `;
};

function render(state, rootEl){
    if(state.page == PAGE.PRODUCTS){
        renderProducts(state, rootEl);
    }

    if(state.page == PAGE.CART){
        renderCart(state, rootEl);
    }
}

export default render;