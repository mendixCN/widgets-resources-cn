(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{506:function(e,n,r){},538:function(e,n,r){"use strict";r.r(n);r(5),r(9),r(10),r(23),r(17),r(49),r(14),r(6),r(27),r(13),r(35),r(11),r(36),r(37),r(21),r(4),r(15),r(7),r(18),r(8);var t=r(0),o=r.n(t),a=r(1),c=r.n(a),i=r(536);r(506);function u(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function f(e){return function(e){if(Array.isArray(e)){for(var n=0,r=new Array(e.length);n<e.length;n++)r[n]=e[n];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var p={value:c.a.string,placeholder:c.a.string,onChange:c.a.func.isRequired,onBlur:c.a.func,onFocus:c.a.func,onKeyDown:c.a.func,userData:c.a.arrayOf(c.a.object)},s=o.a.forwardRef((function(e,n){var r=e.value,t=void 0===r?"":r,a=e.onChange,c=e.onKeyDown,p=void 0===c?function(){}:c,s=e.onBlur,b=void 0===s?function(){}:s,y=e.onFocus,d=void 0===y?function(){}:y,g=e.placeholder,v=void 0===g?"":g,w=f(e.userData.map((function(e){return function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?u(Object(r),!0).forEach((function(n){l(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}({},e,{display:e.value})})));return o.a.createElement("div",{onMouseDown:function(e){return e.stopPropagation()}},o.a.createElement(i.b,{className:"mention",inputRef:n,value:t,onChange:a,onKeyDown:p,onBlur:b,onFocus:d,placeholder:v,allowSpaceInQuery:!0},o.a.createElement(i.a,{trigger:"@",data:w,displayTransform:function(e,n){return"@".concat(n)},renderSuggestion:function(e,n,r){return o.a.createElement(o.a.Fragment,null,r,o.a.createElement("div",{className:"email"},e.email))}})))}));s.propTypes=p;var b=s;n.default=b}}]);