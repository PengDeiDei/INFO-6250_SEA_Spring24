/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/renders.js":
/*!************************!*\
  !*** ./src/renders.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function renders(state, rootEl) {
  if (!state.username && !state.word) {
    rootEl.innerHTML = "\n            <div class=\"login__page\">\n                <label class=\"login__lbl\">\n                    <span> Username: </span>\n                    <input id=\"username\" type=\"text\" placeholder=\"Enter Your Username\"/>\n                </label>\n                <button class=\"login__btn\"> Login </button>\n            </div>\n        ";
  } else {
    rootEl.innerHTML = "\n            <div class=\"data__page\">\n                <div class=\"data__display\"> \n                    <span> Welcome, ".concat(state.username, "! </span>\n                    <span> Your word is: ").concat(state.word, " </span>\n                </div>\n                <div class=\"data__update\">\n                    <span> New Word: </span>\n                    <input id=\"word\" type=\"text\"/>\n                    <button class=\"update__btn\"> Submit </button>\n                </div>\n                <div class=\"data__logout\">\n                    <button class=\"logout__btn\"> Logout </button>\n                </div>\n            </div>\n        ");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renders);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchNewWord: () => (/* binding */ fetchNewWord),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },
    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}
function fetchLogout() {
  return fetch('/api/session/', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch('/api/session/')["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchWord() {
  return fetch('/api/word/')["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchNewWord(word) {
  return fetch('/api/word/', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/states.js":
/*!***********************!*\
  !*** ./src/states.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   err_msg: () => (/* binding */ err_msg)
/* harmony export */ });
var err_msg = {
  'network-error': 'Please check your network connection!',
  'required-username': 'Username is empty or invalid! Please enter your username again!',
  'auth-insufficient': 'Invalid username! Username cannot be "dog"!',
  'auth-missing': 'User is not logged in!',
  'required-word': 'New word is empty! Please enter again!',
  'invalid-word': 'Please enter valid word!'
};
var state = {
  username: '',
  word: ''
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./states */ "./src/states.js");
/* harmony import */ var _renders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renders */ "./src/renders.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");



var rootEl = document.querySelector('#root');
var errorEl = document.querySelector('#error');
function login() {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('login__btn')) {
      var username = document.querySelector('#username').value;
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function () {
        displayWord();
      })["catch"](function (err) {
        errorEl.innerHTML = "<p>".concat(_states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error], "</p>");
        return;
      });
    }
  });
}
function logout() {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('logout__btn')) {
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].username = '';
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].word = '';
        errorEl.innerHTML = '';
        (0,_renders__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
      })["catch"](function (err) {
        errorEl.innerHTML = "<p>".concat(_states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error], "</p>");
        return;
      });
    }
  });
}
function displayWord() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchWord)().then(function (response) {
    var username = response.username,
      storedWord = response.storedWord;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].username = username;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].word = storedWord;
    errorEl.innerHTML = '';
    (0,_renders__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    errorEl.innerHTML = "<p>".concat(_states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error], "</p>");
    return;
  });
}
function getSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (response) {
    var username = response.username;
    if (username) {
      displayWord();
    }
    (0,_renders__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    errorEl.innerHTML = "<p>".concat(_states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error], "</p>");
    if (err.error == 'auth-missing' && !_states__WEBPACK_IMPORTED_MODULE_0__["default"].username) {
      errorEl.innerHTML = "";
    }
    (0,_renders__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  });
}
function setNewWord() {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('update__btn')) {
      var newWord = document.querySelector('#word').value;
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchNewWord)(newWord).then(function () {
        displayWord();
      })["catch"](function (err) {
        errorEl.innerHTML = "<p>".concat(_states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error], "</p>");
        return;
      });
    }
  });
}
getSession();
login();
logout();
setNewWord();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map