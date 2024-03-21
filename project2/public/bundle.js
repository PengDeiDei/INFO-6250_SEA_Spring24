/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   renderMsg: () => (/* binding */ renderMsg)
/* harmony export */ });
function render(state, rootEl) {
  rootEl.innerHTML = "\n    ".concat(errorHtml(state), "\n    ").concat(loginHtml(state), "\n    ").concat(contentHtml(state), "\n    ");
}
function errorHtml(state) {
  return state.error ? "<div class=\"error\">\n        <p class=\"error__message\">".concat(state.error, "</p>\n    </div>") : '';
}
function loginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  if (state.isLoadingLogin) {
    return "\n        <div class=\"login\">\n            <label class=\"login__lbl\">\n                <span> Loading user's information... </span>\n            </label>\n        </div>\n        ";
  }
  return "\n        <div class=\"login\">\n            <label class=\"login__lbl\">\n                <span> Username: </span>\n                <input id=\"username\" type=\"text\" placeholder=\"Enter Your Username\"/>\n            </label>\n            <button class=\"login__btn\"> Login </button>\n        </div>\n    ";
}
function contentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  if (state.isLoadingMsg) {
    return "\n        <div class=\"content\">\n         <h2> Welcome, ".concat(state.username, "</h2>\n            <div class=\"data__display\">\n                <div class=\"messages__container\">\n                    <h3> Message Board</h3>  \n                    <span> Loading message... </span>\n                </div>\n                <div class=\"users__container\">\n                    <h3> Users Onlined </h3>\n                    <span> Loading onlined users...</span>\n                </div>\n            </div>\n            <div class=\"content__update\">\n                <span> New Message: </span>\n                <input id=\"message\" type=\"text\"/>\n                <button class=\"update__btn\"> Submit </button>\n            </div>\n            <div class=\"content__logout\">\n                <button class=\"logout__btn\"> Logout </button>\n            </div>\n        </div>\n        ");
  }
  return "\n    <div class=\"content\">\n        <h2> Welcome, ".concat(state.username, ".</h2>\n        <div class=\"content__display\">\n            <div class=\"messages__container\">\n                <h3> Message Board</h3> \n                ").concat(getMessageList(state), "\n            </div>\n            <div class=\"users__container\">\n                <h3> Users Onlined </h3>\n                ").concat(getUserList(state), "\n            </div>\n        </div>\n        <div class=\"content__update\">\n            <form class=\"update__form\">\n                <span> New Message: </span>\n                <input id=\"message\" type=\"text\"/>\n                <button type=\"submit\" class=\"update__btn\"> Submit </button>\n            </form>\n        </div>\n        <div class=\"content__logout\">\n            <button class=\"logout__btn\"> Logout </button>\n        </div>\n    </div>\n    ");
}
function getMessageList(state) {
  return "<ol class=\"messages__list\">" + Object.values(state.messages).map(function (message) {
    return "\n      <li class=\"message__item\">\n        <div class=\"message__container\">\n            <span class=\"message__username\">".concat(message.sender, "</span>\n            <span class=\"message__text\">").concat(message.text, "</span>\n        </div>\n      </li>\n    ");
  }).join('') + "</ol>";
}
function getUserList(state) {
  var uniqueUsername = {};
  Object.values(state.sessions).map(function (session) {
    var username = session.username;
    uniqueUsername[username] = uniqueUsername[username] + 1 || 1;
  });
  return "<ol class=\"users__list\">" + Object.keys(uniqueUsername).map(function (username) {
    return "\n      <li class=\"user__item\">\n            <span class=\"user__username\">".concat(username, "</span>\n      </li>\n    ");
  }).join('') + "</ol>";
}
function renderMsg(state, rootEl) {
  var messageEl = rootEl.querySelector('.messages__container');
  var userEl = rootEl.querySelector('.users__container');
  messageEl.innerHTML = "<h3> Message Board</h3> ".concat(getMessageList(state));
  userEl.innerHTML = " <h3> Users Onlined </h3> ".concat(getUserList(state));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
/* harmony export */   fetchMessage: () => (/* binding */ fetchMessage),
/* harmony export */   fetchNewMessage: () => (/* binding */ fetchNewMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
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
function fetchMessage() {
  return fetch('/api/message/')["catch"](function (err) {
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
function fetchNewMessage(message) {
  return fetch('/api/message/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message
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
  'required-username': 'Username is empty or invalid! Username should be less than 20 characters in length! Please enter your username again!',
  'auth-insufficient': 'Invalid username! Username cannot be "dog"!',
  'auth-missing': 'User is not logged in!',
  'required-word': 'New word is empty! Please enter again!'
};
var state = {
  username: '',
  messages: [],
  sessions: {},
  error: '',
  isLoadingLogin: false,
  isLoggedIn: false,
  isLoadingMsg: false
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
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");



var rootEl = document.querySelector('#root');
function getSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchSession)().then(function (response) {
    var username = response.username;
    if (username) {
      displayWord();
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
    if (err.error == 'auth-missing' && !_states__WEBPACK_IMPORTED_MODULE_0__["default"].username) {
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = "";
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
    return;
  });
}
function logout() {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('logout__btn')) {
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
        // set states to logged out
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].username = '';
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].messages = [];
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].sessions = {};
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = false;
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingLogin = false;
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = false;
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
      })["catch"](function (err) {
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
        return;
      });
    }
  });
}
function login() {
  rootEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('login__btn')) {
      var username = document.querySelector('#username').value;

      // set state to waiting to log in
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingLogin = true;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function () {
        // set states to logged in
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn = true;
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingLogin = false;
        displayMessage();
      })["catch"](function (err) {
        // set states to not logged in
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingLogin = false;
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
        return;
      });
    }
  });
}
function setNewMessage() {
  rootEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('update__form')) {
      var newMessage = document.querySelector('#message').value;
      (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchNewMessage)(newMessage).then(function () {
        displayMessage();
      })["catch"](function (err) {
        _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
        (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
        return;
      });
    }
  });
}
function displayMessage() {
  // set state to waiting to load message
  _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = true;
  _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
  (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessage)().then(function (response) {
    var username = response.username,
      storedMessages = response.storedMessages,
      storedSessions = response.storedSessions;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].username = username;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].messages = storedMessages;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].sessions = storedSessions;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = false;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
  })["catch"](function (err) {
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = false;
    _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
    return;
  });
}
function refreshMessages() {
  if (_states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoggedIn) {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessage)().then(function (response) {
      var username = response.username,
        storedMessages = response.storedMessages,
        storedSessions = response.storedSessions;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].username = username;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].messages = storedMessages;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].sessions = storedSessions;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = false;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = '';
      (0,_render__WEBPACK_IMPORTED_MODULE_1__.renderMsg)(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
    })["catch"](function (err) {
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].isLoadingMsg = false;
      _states__WEBPACK_IMPORTED_MODULE_0__["default"].error = _states__WEBPACK_IMPORTED_MODULE_0__.err_msg[err.error];
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_states__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
      return;
    });
  }
}
function pollMessages() {
  refreshMessages();
  setTimeout(pollMessages, 5000);
}
getSession();
login();
logout();
setNewMessage();
pollMessages();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map