/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function webpackMissingModule() { throw new Error("Cannot find module \"/home/moha/dev/git/layers/\""); }());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = __webpack_require__(2);

var Canvas = function () {
    function Canvas(element) {
        var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
        var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;

        _classCallCheck(this, Canvas);

        this.element = document.createElement('div');
        this.element.style.position = 'relative';
        this.doc = element.ownerDocument;
        this.layers = [];
        this.width = width;
        this.height = height;
        element.appendChild(this.element);
    }

    _createClass(Canvas, [{
        key: 'addLayer',
        value: function addLayer(layer) {
            if (this.layers.indexOf(layer) > 0) return;
            layer.floor = this.layers.length;
            this.layers.push(layer);
            this.element.appendChild(layer.element);
            layer.width = this.w;
            layer.height = this.h;
            return layer;
        }
    }, {
        key: 'on',
        value: function on() {
            var _element;

            (_element = this.element).addEventListener.apply(_element, arguments);
        }
    }, {
        key: 'removeLayer',
        value: function removeLayer(layer) {
            if (this.layers.indexOf(layer) < 0) return;
            this.layers = this.layers.slice(0, layer.floor) + this.layers.slice(layer.floor).map(function (layer) {
                layer.floor--;
                return layer;
            });
            layer.destroy();
        }
    }, {
        key: 'layer',
        value: function layer(i) {
            return this.layers[i];
        }
    }, {
        key: 'width',
        get: function get() {
            return this.w;
        },
        set: function set(w) {
            this.w = w;
            this.element.style.width = w + 'px';
            this.layers.forEach(function (l) {
                return l.width = w;
            });
        }
    }, {
        key: 'height',
        get: function get() {
            return this.h;
        },
        set: function set(h) {
            this.h = h;
            this.element.style.height = h + 'px';
            this.layers.forEach(function (l) {
                return l.height = h;
            });
        }
    }]);

    return Canvas;
}();

module.exports = {
    Canvas: Canvas,
    Layer: Layer
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layer = function () {
    function Layer() {
        var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

        _classCallCheck(this, Layer);

        this.doc = doc;
        this.element = doc.createElement('canvas');
        this.element.style.position = 'absolute';
        this.context = this.element.getContext('2d');
        this._floor = null;
        this.width = 500;
        this.height = 300;
    }

    _createClass(Layer, [{
        key: 'on',
        value: function on() {
            var _element;

            (_element = this.element).addEventListener.apply(_element, arguments);
        }
    }, {
        key: 'drawImage',
        value: function drawImage(img, dx, dy) {
            this.context.drawImage(img, dx, dy);
        }
    }, {
        key: 'invert',
        value: function invert() {
            var img = new Uint8Array(this.buf);
            for (var k = 0; k < img.length; k++) {
                if (k % 4 !== 3) {
                    img[k] = 255 - img[k];
                }
            }this.buf = img.buffer;
            return this;
        }
    }, {
        key: 'convolution',
        value: function convolution(matrix) {
            var n = matrix.length;
            if (n % 2 === 0 || !matrix.every(function (line) {
                return line.length == n;
            })) return;
            var m = (n - 1) / 2;
            var sum = 0;
            matrix.forEach(function (l) {
                return l.forEach(function (e) {
                    return sum += Math.abs(e);
                });
            });
            matrix = matrix.map(function (l) {
                return l.map(function (e) {
                    return e / sum;
                });
            });
            var arr = new Uint8Array(4 * this.width * this.height);
            var img = new Uint8Array(this.buf);
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    arr[(i + this.width * j) * 4 + 3] = 255;
                    for (var r = 0; r < 3; r++) {
                        var acc = 0;
                        for (var p = -m; p <= m; p++) {
                            for (var q = -m; q <= m; q++) {
                                if (i + p < this.width, i + p > -1 && j + q < this.height, j + q > -1) {
                                    acc += img[(i + p + this.width * (j + q)) * 4 + r] * matrix[m + p][m + q];
                                }
                            }
                        }arr[(i + this.width * j) * 4 + r] = Math.floor(acc);
                    }
                }
            }this.buf = arr.buffer;
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.element.outerHTML = '';
        }
    }, {
        key: 'floor',
        get: function get() {
            return this._floor;
        },
        set: function set(f) {
            this.element.setAttribute('id', 'layer' + f);
            this._floor = f;
        }
    }, {
        key: 'buf',
        get: function get() {
            return this.context.getImageData(0, 0, this.width, this.height).data.buffer;
        },
        set: function set(buf) {
            var arr = new Uint8ClampedArray(buf);
            var ID = new ImageData(arr, this.width, this.height);
            this.context.putImageData(ID, 0, 0);
        }
    }, {
        key: 'height',
        get: function get() {
            return this.element.height;
        },
        set: function set(h) {
            this.element.height = h;
        }
    }, {
        key: 'width',
        get: function get() {
            return this.element.width;
        },
        set: function set(w) {
            this.element.width = w;
        }
    }, {
        key: 'opacity',
        set: function set(o) {
            this.element.style.opacity = o;
        },
        get: function get() {
            return this.element.style.opacity;
        }
    }, {
        key: 'blob',
        get: function get() {
            var _this = this;

            return new Promise(function (res) {
                return _this.element.toBlob(res);
            });
        }
    }]);

    return Layer;
}();

module.exports = Layer;

/***/ })
/******/ ]);