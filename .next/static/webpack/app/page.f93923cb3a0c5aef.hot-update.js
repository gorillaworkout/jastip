"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/ModalToggleSSR.tsx":
/*!*******************************************!*\
  !*** ./src/components/ModalToggleSSR.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/button */ \"(app-pages-browser)/./src/components/button.tsx\");\n/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modal */ \"(app-pages-browser)/./src/components/Modal.tsx\");\n/* harmony import */ var _utils_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/utils/firebase */ \"(app-pages-browser)/./src/utils/firebase.js\");\n/* harmony import */ var _features_orders_orderSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/features/orders/orderSlice */ \"(app-pages-browser)/./src/features/orders/orderSlice.ts\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ \"(app-pages-browser)/./node_modules/react-redux/dist/react-redux.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n// Main component with toggle logic\nconst ModalToggleSSR = (param)=>{\n    let { initialOpen } = param;\n    _s();\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch)();\n    const [isModalOpen, setIsModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialOpen);\n    const [order, setOrder] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null) // State to store a single order object\n    ;\n    const toggleModal = ()=>setIsModalOpen(!isModalOpen);\n    const handleSave = (orderData)=>{\n        // Update the order with the latest order data (single object)\n        setOrder(orderData);\n        dispatch((0,_features_orders_orderSlice__WEBPACK_IMPORTED_MODULE_5__.addOrder)(orderData));\n        (0,_utils_firebase__WEBPACK_IMPORTED_MODULE_4__.addPost)(orderData);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        console.log(order, \"order\") // Log the latest order\n        ;\n    }, [\n        order\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_button__WEBPACK_IMPORTED_MODULE_2__.Button, {\n                    onClick: toggleModal,\n                    className: \"hover:cursor-pointer\",\n                    children: isModalOpen ? \"Close Order\" : \"Add Order\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\projects\\\\jastip\\\\src\\\\components\\\\ModalToggleSSR.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    isOpen: isModalOpen,\n                    toggleModal: toggleModal,\n                    onSave: handleSave\n                }, void 0, false, {\n                    fileName: \"C:\\\\projects\\\\jastip\\\\src\\\\components\\\\ModalToggleSSR.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\projects\\\\jastip\\\\src\\\\components\\\\ModalToggleSSR.tsx\",\n            lineNumber: 45,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(ModalToggleSSR, \"7fi+yUuuFdmQnaOj/gL7uIxPQx8=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_6__.useDispatch\n    ];\n});\n_c = ModalToggleSSR;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ModalToggleSSR);\nvar _c;\n$RefreshReg$(_c, \"ModalToggleSSR\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL01vZGFsVG9nZ2xlU1NSLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUMyQztBQUNDO0FBQ2pCO0FBQ2U7QUFDYTtBQUNBO0FBZXZELG1DQUFtQztBQUNuQyxNQUFNTyxpQkFBZ0Q7UUFBQyxFQUFFQyxXQUFXLEVBQUU7O0lBQ3BFLE1BQU1DLFdBQVdILHdEQUFXQTtJQUU1QixNQUFNLENBQUNJLGFBQWFDLGVBQWUsR0FBR1gsK0NBQVFBLENBQVVRO0lBQ3hELE1BQU0sQ0FBQ0ksT0FBT0MsU0FBUyxHQUFHYiwrQ0FBUUEsQ0FBbUIsTUFBTSx1Q0FBdUM7O0lBRWxHLE1BQU1jLGNBQWMsSUFBTUgsZUFBZSxDQUFDRDtJQUUxQyxNQUFNSyxhQUFhLENBQUNDO1FBQ2xCLDhEQUE4RDtRQUM5REgsU0FBU0c7UUFFVFAsU0FBU0oscUVBQVFBLENBQUNXO1FBQ2xCWix3REFBT0EsQ0FBQ1k7SUFDVjtJQUVBZixnREFBU0EsQ0FBQztRQUNSZ0IsUUFBUUMsR0FBRyxDQUFDTixPQUFPLFNBQVMsdUJBQXVCOztJQUNyRCxHQUFHO1FBQUNBO0tBQU07SUFFVixxQkFDRTtrQkFDRSw0RUFBQ087OzhCQUNDLDhEQUFDakIsc0RBQU1BO29CQUFDa0IsU0FBU047b0JBQWFPLFdBQVU7OEJBQ3JDWCxjQUFjLGdCQUFnQjs7Ozs7OzhCQUVqQyw4REFBQ1AsOENBQUtBO29CQUFDbUIsUUFBUVo7b0JBQWFJLGFBQWFBO29CQUFhUyxRQUFRUjs7Ozs7Ozs7Ozs7OztBQUl0RTtHQTlCTVI7O1FBQ2FELG9EQUFXQTs7O0tBRHhCQztBQWdDTiwrREFBZUEsY0FBY0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9Nb2RhbFRvZ2dsZVNTUi50c3g/YzcxMCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxyXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ0AvY29tcG9uZW50cy9idXR0b24nXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL01vZGFsJ1xyXG5pbXBvcnQgeyBhZGRQb3N0IH0gZnJvbSAnQC91dGlscy9maXJlYmFzZSdcclxuaW1wb3J0IHsgYWRkT3JkZXIgfSBmcm9tICdAL2ZlYXR1cmVzL29yZGVycy9vcmRlclNsaWNlJ1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmludGVyZmFjZSBNb2RhbFRvZ2dsZVNTUlByb3BzIHtcclxuICBpbml0aWFsT3BlbjogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9yZGVyRGF0YSB7XHJcbiAgaWQ6c3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZ1xyXG4gIGFkZHJlc3M6IHN0cmluZ1xyXG4gIHBob25lOiBzdHJpbmdcclxuICByZWNlaXZlVGltZTogc3RyaW5nXHJcbiAgcHJpY2VQZXJLZzogc3RyaW5nXHJcbiAgdG90YWxLZzogc3RyaW5nXHJcbn1cclxuXHJcbi8vIE1haW4gY29tcG9uZW50IHdpdGggdG9nZ2xlIGxvZ2ljXHJcbmNvbnN0IE1vZGFsVG9nZ2xlU1NSOiBSZWFjdC5GQzxNb2RhbFRvZ2dsZVNTUlByb3BzPiA9ICh7IGluaXRpYWxPcGVuIH0pID0+IHtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gIGNvbnN0IFtpc01vZGFsT3Blbiwgc2V0SXNNb2RhbE9wZW5dID0gdXNlU3RhdGU8Ym9vbGVhbj4oaW5pdGlhbE9wZW4pXHJcbiAgY29uc3QgW29yZGVyLCBzZXRPcmRlcl0gPSB1c2VTdGF0ZTxPcmRlckRhdGEgfCBudWxsPihudWxsKSAvLyBTdGF0ZSB0byBzdG9yZSBhIHNpbmdsZSBvcmRlciBvYmplY3RcclxuXHJcbiAgY29uc3QgdG9nZ2xlTW9kYWwgPSAoKSA9PiBzZXRJc01vZGFsT3BlbighaXNNb2RhbE9wZW4pXHJcblxyXG4gIGNvbnN0IGhhbmRsZVNhdmUgPSAob3JkZXJEYXRhOiBPcmRlckRhdGEpID0+IHtcclxuICAgIC8vIFVwZGF0ZSB0aGUgb3JkZXIgd2l0aCB0aGUgbGF0ZXN0IG9yZGVyIGRhdGEgKHNpbmdsZSBvYmplY3QpXHJcbiAgICBzZXRPcmRlcihvcmRlckRhdGEpXHJcbiAgIFxyXG4gICAgZGlzcGF0Y2goYWRkT3JkZXIob3JkZXJEYXRhKSkgICAgXHJcbiAgICBhZGRQb3N0KG9yZGVyRGF0YSlcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhvcmRlciwgJ29yZGVyJykgLy8gTG9nIHRoZSBsYXRlc3Qgb3JkZXJcclxuICB9LCBbb3JkZXJdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RvZ2dsZU1vZGFsfSBjbGFzc05hbWU9XCJob3ZlcjpjdXJzb3ItcG9pbnRlclwiPlxyXG4gICAgICAgICAge2lzTW9kYWxPcGVuID8gJ0Nsb3NlIE9yZGVyJyA6ICdBZGQgT3JkZXInfVxyXG4gICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDxNb2RhbCBpc09wZW49e2lzTW9kYWxPcGVufSB0b2dnbGVNb2RhbD17dG9nZ2xlTW9kYWx9IG9uU2F2ZT17aGFuZGxlU2F2ZX0gLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8Lz5cclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vZGFsVG9nZ2xlU1NSIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQnV0dG9uIiwiTW9kYWwiLCJhZGRQb3N0IiwiYWRkT3JkZXIiLCJ1c2VEaXNwYXRjaCIsIk1vZGFsVG9nZ2xlU1NSIiwiaW5pdGlhbE9wZW4iLCJkaXNwYXRjaCIsImlzTW9kYWxPcGVuIiwic2V0SXNNb2RhbE9wZW4iLCJvcmRlciIsInNldE9yZGVyIiwidG9nZ2xlTW9kYWwiLCJoYW5kbGVTYXZlIiwib3JkZXJEYXRhIiwiY29uc29sZSIsImxvZyIsImRpdiIsIm9uQ2xpY2siLCJjbGFzc05hbWUiLCJpc09wZW4iLCJvblNhdmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/ModalToggleSSR.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/utils/firebase.js":
/*!*******************************!*\
  !*** ./src/utils/firebase.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addPost: function() { return /* binding */ addPost; }\n/* harmony export */ });\n/* harmony import */ var _config_firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/config/firebase */ \"(app-pages-browser)/./src/config/firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ addPost auto */ \n\nconst addPost = async (formData)=>{\n    const collectionRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_config_firebase__WEBPACK_IMPORTED_MODULE_0__.db, \"orders\");\n    const orderCollectionSnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(collectionRef);\n    const orderList = orderCollectionSnapshot.docs.map((doc)=>({\n            ...doc.data()\n        }));\n    await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)(collectionRef, {\n        id: \"\".concat(orderList.length + 1),\n        address: formData.address,\n        name: formData.name,\n        phone: formData.phone,\n        pricePerKg: formData.pricePerKg,\n        receiveTime: formData.receiveTime === \"\" ? \"19-21\" : formData.receiveTime,\n        totalKg: formData.totalKg\n    });\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9maXJlYmFzZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7NkRBRW9DO0FBQzBCO0FBRTlELE1BQU1JLFVBQVUsT0FBT0M7SUFDbkIsTUFBTUMsZ0JBQWdCSiw4REFBVUEsQ0FBQ0YsZ0RBQUVBLEVBQUU7SUFDckMsTUFBTU8sMEJBQTBCLE1BQU1KLDJEQUFPQSxDQUFDRztJQUM5QyxNQUFNRSxZQUFZRCx3QkFBd0JFLElBQUksQ0FBQ0MsR0FBRyxDQUFDQyxDQUFBQSxNQUFNO1lBQ3JELEdBQUdBLElBQUlDLElBQUksRUFBRTtRQUNmO0lBQ0YsTUFBTVgsMERBQU1BLENBQUNLLGVBQWU7UUFDeEJPLElBQUksR0FBd0IsT0FBckJMLFVBQVVNLE1BQU0sR0FBRztRQUMxQkMsU0FBU1YsU0FBU1UsT0FBTztRQUN6QkMsTUFBTVgsU0FBU1csSUFBSTtRQUNuQkMsT0FBTVosU0FBU1ksS0FBSztRQUNwQkMsWUFBWWIsU0FBU2EsVUFBVTtRQUMvQkMsYUFBYWQsU0FBU2MsV0FBVyxLQUFLLEtBQUssVUFBVWQsU0FBU2MsV0FBVztRQUN6RUMsU0FBU2YsU0FBU2UsT0FBTztJQUM3QjtBQUNKO0FBRW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9maXJlYmFzZS5qcz8xYjZlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXHJcblxyXG5pbXBvcnQge2RifSBmcm9tICdAL2NvbmZpZy9maXJlYmFzZSdcclxuaW1wb3J0IHthZGREb2MsIGNvbGxlY3Rpb24sIGdldERvY3N9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSdcclxuXHJcbmNvbnN0IGFkZFBvc3QgPSBhc3luYyAoZm9ybURhdGEpPT57XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uUmVmID0gY29sbGVjdGlvbihkYiwgJ29yZGVycycpXHJcbiAgICBjb25zdCBvcmRlckNvbGxlY3Rpb25TbmFwc2hvdCA9IGF3YWl0IGdldERvY3MoY29sbGVjdGlvblJlZilcclxuICAgIGNvbnN0IG9yZGVyTGlzdCA9IG9yZGVyQ29sbGVjdGlvblNuYXBzaG90LmRvY3MubWFwKGRvYz0+KHtcclxuICAgICAgICAuLi5kb2MuZGF0YSgpXHJcbiAgICAgIH0pKVxyXG4gICAgYXdhaXQgYWRkRG9jKGNvbGxlY3Rpb25SZWYsIHtcclxuICAgICAgICBpZDogYCR7b3JkZXJMaXN0Lmxlbmd0aCArIDF9YCxcclxuICAgICAgICBhZGRyZXNzOiBmb3JtRGF0YS5hZGRyZXNzLFxyXG4gICAgICAgIG5hbWU6IGZvcm1EYXRhLm5hbWUsXHJcbiAgICAgICAgcGhvbmU6Zm9ybURhdGEucGhvbmUsXHJcbiAgICAgICAgcHJpY2VQZXJLZzogZm9ybURhdGEucHJpY2VQZXJLZyxcclxuICAgICAgICByZWNlaXZlVGltZTogZm9ybURhdGEucmVjZWl2ZVRpbWUgPT09ICcnID8gJzE5LTIxJyA6IGZvcm1EYXRhLnJlY2VpdmVUaW1lLFxyXG4gICAgICAgIHRvdGFsS2c6IGZvcm1EYXRhLnRvdGFsS2dcclxuICAgIH0pXHJcbn1cclxuXHJcbiBleHBvcnQgeyBhZGRQb3N0IH0iXSwibmFtZXMiOlsiZGIiLCJhZGREb2MiLCJjb2xsZWN0aW9uIiwiZ2V0RG9jcyIsImFkZFBvc3QiLCJmb3JtRGF0YSIsImNvbGxlY3Rpb25SZWYiLCJvcmRlckNvbGxlY3Rpb25TbmFwc2hvdCIsIm9yZGVyTGlzdCIsImRvY3MiLCJtYXAiLCJkb2MiLCJkYXRhIiwiaWQiLCJsZW5ndGgiLCJhZGRyZXNzIiwibmFtZSIsInBob25lIiwicHJpY2VQZXJLZyIsInJlY2VpdmVUaW1lIiwidG90YWxLZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/firebase.js\n"));

/***/ })

});