;(function() {
    'use strict';
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }
    var isFunction = isType("Function");

    Array.isArray = Array.isArray || isType("Array");
    function _typeError(msg) {
       throw new TypeError(msg);
    }
    function _checkArrayMethod(fun) {
        if(!this) {
            _typeError("this is null or not defined");
        }
        if(!isFunction(fun)) {
            _typeError(fun  + ' is not a function');
        }
    }
    if(!isFunction(Array.prototype.every)) {
        Array.prototype.every = function(fun, thisArg) {
            _checkArrayMethod.call(this, fun);

            var O = Object(this),
                len = O.length >>> 0;
            thisArg = thisArg || null;

            if(!len) {
                return false;
            }
            for(var i = 0; i < len; i++) {
                if(i in O && !fun.call(thisArg, O[i], i, O)) return false;
            }
            return true;
        }
    }

    if(!isFunction(Array.prototype.some)) {
        Array.prototype.some = function(fun, thisArg) {
            _checkArrayMethod.call(this, fun);

            var O = Object(this),
                len = O.length >>> 0;

            thisArg = thisArg || null;
            if(!len) {
                return false;
            }
            for(var i = 0; i < len; i++) {
                if(i in O && fun.call(thisArg, O[i], i, O)) return true;
            }
            return false;
        }
    }

    if(!isFunction(Array.prototype.forEach)) {
        Array.prototype.forEach = function(fun, thisArg) {
            _checkArrayMethod.call(this, fun);

            thisArg = thisArg || null;
            var O = Object(this),
                len = O.length >>> 0;
            for(var i = 0; i < len; i++) {
                fun.call(thisArg, this[i], i, this);
            }
        }
    }

    if (!isFunction(Array.prototype.filter)) {
        Array.prototype.filter =  function(fun, thisArg) {
            _checkArrayMethod.call(this, fun);

            thisArg = thisArg || null;
            var O = Object(this),
                len = O.length >>> 0,
                res = [];

            for(var i = 0; i < len; i++) {
                if(i in O && fun.call(thisArg, O[i], i, O)) {
                    res.push(O[i]);
                }
            }
            return res;
        }
    }
    if(!isFunction(Array.prototype.map)) {
        Array.prototype.map = function(fun, thisArg) {
            _checkArrayMethod.call(this, fun);

            thisArg = thisArg || null;
            var O = Object(this),
                len = O.length >>> 0,
                res = [];
            for(var i = 0; i < len; i++) {
                if(i in O) {
                    res.push(fun.call(thisArg, O[i], i, O));
                }
            }
            return res;
        }
    }
    if(!isFunction(Array.prototype.reduce)) {
        Array.prototype.reduce = function(fun, initVal) {
            _checkArrayMethod.call(this, fun);
            var len = this.length >>> 0,
                hasInitVal = false,
                value;
            if(initVal !== undefined) {
                hasInitVal = true;
                value = initVal;
            }
            for (i = 0; len > i; ++i) {
                if(this.hasOwnProperty(i)) {
                    if(hasInitVal) {
                        value = fun(value, this[i], i, this);
                    } else {
                        value = this[i];
                        hasInitVal = true;
                    }
                }
            }
            if(!hasInitVal) {
                _typeError("Reduce of empty array with no initial value");
            }
            return value;
        }
    }
})();
