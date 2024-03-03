import cats from './cats';
import state, {PAGE} from './states';
import render from './renders';

const rootEl = document.querySelector('#root');

function addProducts(state, rootEl){
    rootEl.addEventListener('click', e => {
        if(e.target.classList.contains('add__btn')){
            const index = e.target.dataset.index;
            const cat = cats[index];
            
            state.cart[cat.name] = state.cart[cat.name] + 1 || 1;

            getTotalQty(state);
            getTotalSum(state);
            render(state, rootEl);

            return;
        }
    });
};

function changeQuantity(state, rootEl){
    rootEl.addEventListener('click', e => {
        if(e.target.classList.contains('increase__btn')){
            const name = e.target.dataset.name;
            state.cart[name] += 1;

            getTotalQty(state);
            getTotalSum(state);
            render(state, rootEl);

            return;
        }

        if(e.target.classList.contains('decrease__btn')){
            const name = e.target.dataset.name;
            if(state.cart[name] <= 1){
                delete state.cart[name];
            }

            state.cart[name] -= 1;

            getTotalQty(state);
            getTotalSum(state);
            render(state, rootEl);

            return;
        }
    })
};

function changePage(state, rootEl){
    rootEl.addEventListener('click', e => {
        if(e.target.classList.contains('view-cart__btn')){
            state.page = PAGE.CART;
        }

        if(e.target.classList.contains('hide-cart__btn')){
            state.page = PAGE.PRODUCTS;
        }

        render(state, rootEl);
    })
};

function checkout(state, rootEl){
    rootEl.addEventListener('click', e => {
        if(e.target.classList.contains('checkout__btn')){
            state.page = PAGE.PRODUCTS;
            state.cart = [];
            state.totalSum = 0;
            state.totalQty = 0;
        }

        render(state, rootEl);
    })
}

// get total quantity of items in cart
function getTotalQty(state){
    let totalQty = 0;
    
    cats.map(cat => {
        if(state.cart[cat.name]){
            totalQty += state.cart[cat.name];
        }
    })

    state.totalQty = totalQty;
};

// get total sum of price of items in cart
function getTotalSum(state){
    let totalSum = 0;
    cats.map(cat => {
        if(state.cart[cat.name]){
            const number = state.cart[cat.name];
            totalSum += number*cat.price;
        }
    })

    state.totalSum = totalSum.toFixed(2);
}

render(state, rootEl);

addProducts(state, rootEl);

changeQuantity(state, rootEl);

changePage(state, rootEl);

checkout(state, rootEl);