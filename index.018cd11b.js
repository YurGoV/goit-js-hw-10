!function(){function e(e){return e&&e.__esModule?e.default:e}var n,t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={};Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e){return e&&e.constructor===Symbol?"symbol":typeof e};var i=/^\s+|\s+$/g,r=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,l=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,s=a||c||Function("return this")(),d=Object.prototype.toString,v=Math.max,g=Math.min,p=function(){return s.Date.now()};function m(n){var t=void 0===n?"undefined":e(o)(n);return!!n&&("object"==t||"function"==t)}function b(n){if("number"==typeof n)return n;if(function(n){return"symbol"==(void 0===n?"undefined":e(o)(n))||function(e){return!!e&&"object"==typeof e}(n)&&"[object Symbol]"==d.call(n)}(n))return NaN;if(m(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=m(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=n.replace(i,"");var a=u.test(n);return a||f.test(n)?l(n.slice(2),a?2:8):r.test(n)?NaN:+n}n=function(e,n,t){var o,i,r,u,f,l,a=0,c=!1,s=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function y(n){var t=o,r=i;return o=i=void 0,a=n,u=e.apply(r,t)}function h(e){return a=e,f=setTimeout(O,n),c?y(e):u}function j(e){var t=e-l;return void 0===l||t>=n||t<0||s&&e-a>=r}function O(){var e=p();if(j(e))return T(e);f=setTimeout(O,function(e){var t=n-(e-l);return s?g(t,r-(e-a)):t}(e))}function T(e){return f=void 0,d&&o?y(e):(o=i=void 0,u)}function w(){var e=p(),t=j(e);if(o=arguments,i=this,l=e,t){if(void 0===f)return h(l);if(s)return f=setTimeout(O,n),y(l)}return void 0===f&&(f=setTimeout(O,n)),u}return n=b(n)||0,m(t)&&(c=!!t.leading,r=(s="maxWait"in t)?v(b(t.maxWait)||0,n):r,d="trailing"in t?!!t.trailing:d),w.cancel=function(){void 0!==f&&clearTimeout(f),a=0,o=l=i=f=void 0},w.flush=function(){return void 0===f?u:T(p())},w};var y=document.querySelector("input#search-box");function h(e){if(1!==e.length){if(e.length>=2&&e.length<=10)return e.map((function(e){console.log(e.flags.svg,e.name)})),1===e.length&&""===e[0]?void console.log(0):void 0;console.log("more than 10 items!!!"),console.log(e)}else{var n=e[0],t=n.name,o=n.capital,i=n.population,r=n.flags,u=n.languages;console.log(t,o,i,r.svg,u)}}function j(e){console.log("oner"),console.log(e),console.log(e.length)}console.log(y),y.addEventListener("input",e(n)((function(e){(n=e,fetch("https://restcountries.com/v2/name/".concat(n.target.value.trim(),"?fields=name,capital,population,languages,flags")).then((function(e){return e.json()}))).then(h,j);var n}),1e3))}();
//# sourceMappingURL=index.018cd11b.js.map
