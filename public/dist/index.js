webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

setTimeout(function () {
    $.ajax({
        url: '/user.action',
        method: 'get',
        success: function success(arr) {
            console.log(arr);
            var liStr = arr.map(function (ele) {
                return '<li>' + ele + '</li>';
            }).join('');
            $('#root').html(liStr);
        },
        error: function error(_error) {
            console.log(_error);
        }
    });
    $.ajax({
        url: '/list.action',
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(['name', 'ldq']),
        success: function success(arr) {
            console.log(arr);
            var liStr = arr.map(function (ele) {
                return '<li>' + ele + '</li>';
            }).join('');
            $('#shop').html(liStr);
        },
        error: function error(_error2) {
            console.log(_error2);
        }
    });
}, 1000);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[2]);
//# sourceMappingURL=index.js.map