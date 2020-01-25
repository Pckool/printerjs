(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["elementPrinter"] = factory();
	else
		root["elementPrinter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/element-printer.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/element-printer.ts":
/*!********************************!*\
  !*** ./src/element-printer.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function PrintHtmlElement() {\r\n    function printElement(element, opts) {\r\n        var elementHtml = element.outerHTML;\r\n        _print(elementHtml, opts);\r\n    }\r\n    function printHtml(html, opts) {\r\n        _print(html, opts);\r\n    }\r\n    function _print(html, _opts) {\r\n        var opts = {\r\n            printMode: _opts ? _opts.printMode : undefined || '',\r\n            pageTitle: _opts ? _opts.pageTitle : undefined || '',\r\n            templateString: _opts ? _opts.templateString : undefined || '',\r\n            popupProperties: _opts ? _opts.popupProperties : undefined || '',\r\n            stylesheets: _opts ? _opts.stylesheets : undefined || null,\r\n            styles: _opts ? _opts.styles : undefined || null\r\n        };\r\n        var markup = _getMarkup(html, opts);\r\n        var printWindow;\r\n        var printIframe;\r\n        var printDocument;\r\n        var printElementID;\r\n        var DOM = document;\r\n        if (opts.printMode.toLowerCase() === 'popup') {\r\n            printWindow = window.open('about:blank', 'printElementWindow', opts.popupProperties);\r\n            printDocument = printWindow.document;\r\n        }\r\n        else {\r\n            printElementID = 'printElement_' + (Math.round(Math.random() * 99999)).toString();\r\n            printIframe = document.createElement('iframe');\r\n            printIframe.setAttribute('id', printElementID);\r\n            printIframe.setAttribute('src', 'about:blank');\r\n            printIframe.setAttribute('frameBorder', '0');\r\n            printIframe.setAttribute('scrolling', 'no');\r\n            printIframe.setAttribute('style', 'position:fixed;bottom:100%;right:100%;');\r\n            DOM.body.appendChild(printIframe);\r\n            printDocument = (printIframe.contentWindow || printIframe.contentDocument);\r\n            if (printDocument.document) {\r\n                printDocument = printDocument.document;\r\n            }\r\n            printIframe = DOM.frames ? DOM.frames[printElementID] : DOM.getElementById(printElementID);\r\n            printWindow = printIframe.contentWindow || printIframe;\r\n        }\r\n        focus();\r\n        printDocument.open();\r\n        setTimeout(function () {\r\n            printDocument.write(markup);\r\n            printDocument.close();\r\n        });\r\n        _callPrint(printWindow, printIframe);\r\n    }\r\n    function _callPrint(printWindow, iframe) {\r\n        if (printWindow && printWindow.printPage) {\r\n            printWindow.printPage();\r\n            if (iframe) {\r\n                document.body.removeChild(iframe);\r\n            }\r\n        }\r\n        else {\r\n            setTimeout(function () {\r\n                _callPrint(printWindow, iframe);\r\n            }, 50);\r\n        }\r\n    }\r\n    function _getBaseHref() {\r\n        var port = (window.location.port) ? ':' + window.location.port : '';\r\n        return window.location.protocol + '//' + window.location.hostname + port + window.location.pathname;\r\n    }\r\n    function _getMarkup(elementHtml, opts) {\r\n        var template = opts.templateString;\r\n        var templateRegex = new RegExp(/{{\\s*printBody\\s*}}/gi);\r\n        var stylesheets;\r\n        var styles;\r\n        var html = [];\r\n        if (template && templateRegex.test(template)) {\r\n            elementHtml = template.replace(templateRegex, elementHtml);\r\n        }\r\n        html.push('<html><head><title>' + (opts.pageTitle || '') + '</title>');\r\n        if (opts.stylesheets) {\r\n            stylesheets = Array.isArray(opts.stylesheets) ? opts.stylesheets : [opts.stylesheets];\r\n        }\r\n        else {\r\n            stylesheets = Array.prototype.slice\r\n                .call(document.getElementsByTagName('link'))\r\n                .map(function (link) {\r\n                return link.href;\r\n            });\r\n        }\r\n        stylesheets.forEach(function (href) {\r\n            html.push('<link rel=\"stylesheet\" href=\"' + href + '\">');\r\n        });\r\n        if (opts.styles) {\r\n            styles = Array.isArray(opts.styles) ? opts.styles : [opts.styles];\r\n        }\r\n        else {\r\n            styles = Array.prototype.slice\r\n                .call(document.getElementsByTagName('style'))\r\n                .map(function (style) {\r\n                return style.innerHTML;\r\n            });\r\n        }\r\n        styles.forEach(function (style) {\r\n            html.push('<style type=\"text/css\">' + style + '</style>');\r\n        });\r\n        html.push('<base href=\"' + _getBaseHref() + '\" />');\r\n        html.push('</head><body class=\"pe-body\">');\r\n        html.push(elementHtml);\r\n        html.push('<script type=\"text/javascript\">function printPage(){focus();print();' + ((opts.printMode.toLowerCase() == 'popup') ? 'close();' : '') + '}</script>');\r\n        html.push('</body></html>');\r\n        return html.join('');\r\n    }\r\n    return {\r\n        printElement: printElement,\r\n        printHtml: printHtml\r\n    };\r\n}\r\n;\r\nmodule.exports = PrintHtmlElement();\r\n\n\n//# sourceURL=webpack://elementPrinter/./src/element-printer.ts?");

/***/ })

/******/ });
});