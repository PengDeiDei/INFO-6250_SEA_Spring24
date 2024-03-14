/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cats.js":
/*!*********************!*\
  !*** ./src/cats.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var cats = [{
  name: "Fluffball",
  imgURL: "http://placekitten.com/150/150?image=1",
  price: 0.99
}, {
  name: "Jort",
  imgURL: "http://placekitten.com/150/150?image=2",
  price: 3.14
}, {
  name: "Maru",
  imgURL: "http://placekitten.com/150/150?image=3",
  price: 2.73
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cats);

/***/ }),

/***/ "./src/renders.js":
/*!************************!*\
  !*** ./src/renders.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./states */ "./src/states.js");
/* harmony import */ var _cats__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cats */ "./src/cats.js");


var CATFACE = "&#128049"; // cat face emoji in html

var catsHtml = _cats__WEBPACK_IMPORTED_MODULE_1__["default"].map(function (cat, index) {
  return "\n        <div class=\"cat__card\">\n            <h2 class=\"cat__name\">".concat(cat.name, "</h2>\n            <img class=\"cat__img\" alt=\"\" \n                src=").concat(cat.imgURL, "/>\n            <span class=\"cat__price\">Price: $").concat(cat.price, "</span>\n            <button class=\"cat__btn add__btn\" data-index=").concat(index, ">Add to Cart</button>\n        </div>\n    ");
}).join('');
function renderProducts(state, rootEl) {
  rootEl.innerHTML = "\n        <header> \n            <h1 class=\"header__title\">Cats List</h1>\n        </header>\n        <nav class=\"cart__page\">\n            <div class=\"cart__container\">\n                <button class=\"cart__btn view-cart__btn\">\n                    View Cart ".concat(CATFACE, " ").concat(state.totalQty ? state.totalQty : "", "\n                </button>\n            </div>\n        </nav>\n        <div class=\"product__page\"> \n            ").concat(catsHtml, "\n        </div>\n    ");
}
;
function renderCart(state, rootEl) {
  var cartHtml = _cats__WEBPACK_IMPORTED_MODULE_1__["default"].map(function (cat) {
    if (state.cart[cat.name]) {
      var currentTotal = (cat.price * state.cart[cat.name]).toFixed(2);
      return "\n                <li class=\"cart__item\">\n                    <img class=\"item__img\" alt=\"\" \n                        src=".concat(cat.imgURL, "/>\n                    <div class=\"item__info\"> \n                        <h2 class=\"item__name\">").concat(cat.name, "</h2>\n                        <span class=\"item__price\">Price: $").concat(cat.price, "</span>\n                        <span class=\"item__number\">Quantity: ").concat(state.cart[cat.name], "</span>\n                        <span class=\"item__total\">Sub-Total: ").concat(currentTotal, "</span>\n                    </div>\n                    <div class=\"cart__btn-group\">\n                        <button class=\"cart__btn increase__btn\" data-name=").concat(cat.name, "> + </button>\n                        <button class=\"cart__btn decrease__btn\" data-name=").concat(cat.name, "> - </button>\n                    </div>\n                </li>\n            ");
    }
  }).join('');
  if (cartHtml == '') {
    cartHtml = "\n            <li class=\"cart__item cart__empty-notice\"> \n                <span>Nothing in the cart</span>\n            </li>\n        ";
  }
  rootEl.innerHTML = "\n        <header> \n            <h1 class=\"header__title\">Cats List</h1>\n        </header>\n        <nav class=\"cart__page\">\n            <div class=\"cart__container\">\n                <button class=\"cart__btn hide-cart__btn\">\n                    Hide Cart ".concat(CATFACE, " ").concat(state.totalQty ? state.totalQty : "", "\n                </button>\n                <ul class=\"cart__list\">\n                    ").concat(cartHtml, "\n                    <li class=\"cart__item cart__totalSum\">\n                        <span>Total: $").concat(state.totalSum, "</span>\n                    </li>\n                    <button class=\"cart__btn checkout__btn\"> Checkout </button>\n                </ul>\n            </div>\n        </nav>\n        <div class=\"product__page\">\n            ").concat(catsHtml, "\n        </div>\n    ");
}
;
function render(state, rootEl) {
  if (state.page == _states__WEBPACK_IMPORTED_MODULE_0__.PAGE.PRODUCTS) {
    renderProducts(state, rootEl);
  }
  if (state.page == _states__WEBPACK_IMPORTED_MODULE_0__.PAGE.CART) {
    renderCart(state, rootEl);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/states.js":
/*!***********************!*\
  !*** ./src/states.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PAGE: () => (/* binding */ PAGE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var PAGE = {
  PRODUCTS: "products",
  CART: "cart"
};
var states = {
  page: PAGE.PRODUCTS,
  cart: [],
  totalSum: 0,
  totalQty: 0
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (states);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cats__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cats */ "./src/cats.js");
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./states */ "./src/states.js");
/* harmony import */ var _renders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renders */ "./src/renders.js");



var rootEl = document.querySelector('#root');
function addProducts(state, rootEl) {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('add__btn')) {
      var index = e.target.dataset.index;
      var cat = _cats__WEBPACK_IMPORTED_MODULE_0__["default"][index];
      state.cart[cat.name] = state.cart[cat.name] + 1 || 1;
      getTotalQty(state);
      getTotalSum(state);
      (0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(state, rootEl);
      return;
    }
  });
}
;
function changeQuantity(state, rootEl) {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('increase__btn')) {
      var name = e.target.dataset.name;
      state.cart[name] += 1;
      getTotalQty(state);
      getTotalSum(state);
      (0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(state, rootEl);
      return;
    }
    if (e.target.classList.contains('decrease__btn')) {
      var _name = e.target.dataset.name;
      if (state.cart[_name] <= 1) {
        delete state.cart[_name];
      }
      state.cart[_name] -= 1;
      getTotalQty(state);
      getTotalSum(state);
      (0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(state, rootEl);
      return;
    }
  });
}
;
function changePage(state, rootEl) {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('view-cart__btn')) {
      state.page = _states__WEBPACK_IMPORTED_MODULE_1__.PAGE.CART;
    }
    if (e.target.classList.contains('hide-cart__btn')) {
      state.page = _states__WEBPACK_IMPORTED_MODULE_1__.PAGE.PRODUCTS;
    }
    (0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(state, rootEl);
  });
}
;
function checkout(state, rootEl) {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('checkout__btn')) {
      state.page = _states__WEBPACK_IMPORTED_MODULE_1__.PAGE.PRODUCTS;
      state.cart = [];
      state.totalSum = 0;
      state.totalQty = 0;
    }
    (0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(state, rootEl);
  });
}

// get total quantity of items in cart
function getTotalQty(state) {
  var totalQty = 0;
  _cats__WEBPACK_IMPORTED_MODULE_0__["default"].map(function (cat) {
    if (state.cart[cat.name]) {
      totalQty += state.cart[cat.name];
    }
  });
  state.totalQty = totalQty;
}
;

// get total sum of price of items in cart
function getTotalSum(state) {
  var totalSum = 0;
  _cats__WEBPACK_IMPORTED_MODULE_0__["default"].map(function (cat) {
    if (state.cart[cat.name]) {
      var number = state.cart[cat.name];
      totalSum += number * cat.price;
    }
  });
  state.totalSum = totalSum.toFixed(2);
}
(0,_renders__WEBPACK_IMPORTED_MODULE_2__["default"])(_states__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
addProducts(_states__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
changeQuantity(_states__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
changePage(_states__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
checkout(_states__WEBPACK_IMPORTED_MODULE_1__["default"], rootEl);
})();

/******/ })()
;
//# sourceMappingURL=cart.js.map