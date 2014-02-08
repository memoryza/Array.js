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
        if(obj === undefined) {
            _typeError(obj + 'is not defined');
        } else if(!isFunction(fun)) {
            _typeError(fun  + ' is not a function');
        }
    }
    
    function _compareObject(obj1, obj2) {
        if(typeof obj1 === 'object' && typeof obj2 === "object") {
            for(var i in obj1) {
                if(typeof obj1[i] === "object" && typeof obj[2] === "object") {
                    if(!compareObject(obj1[i], obj2[2])) {
                        return false;
                    }
                }
                if(obj2[i] === undefined || obj2[i] !== obj1[i]) {
                    return false;
                }
            }
            return true;
        } else {
            return obj1 === obj2;
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

    if(!isFunction(Array.prototype.indexOf)) {
        Array.prototype.indexOf = function(val) {
            _checkArrayMethod.call(this, val);

            var O = new Object(this),
                len =  O.length >>> 0,
                index = -1;
            
            for(var i  = 0; i < len;  i++) {
                if(i in O) {
                    if(!_compareObject(O[i], val)) {
                        break;
                    }
                    index = i;
                    break;
                }
            }
            return index;
        }
    }

    if(!isFunction(Array.prototype.lastIndexOf)) {
        Array.prototype.lastIndexOf = function(val) {
            _checkArrayMethod.call(this, val);

            var O = Object(this),
                len  = O.length >>> 0,
                index = -1;
            for(var i = len;i >= 0; i--) {
                if(i in O) {
                    if(!_compareObject(O[i], val)) {
                        break;
                    }
                    index = i;
                    break;
                }
            }
        }
    }

    if(!isFunction(Array.prototype.reduceRight)) {
        Array.prototype.reduceRight = function(fun, initVal) {
            _checkArrayMethod.call(this, fun);

            var len = this.length >>> 0,
                hasInitVal = false,
                value;
            if(initVal) {
                hasInitVal =  true;
                value = initVal;
            }
            for(var i = len - 1; i >= 0; i--) {
                if(this.hasOwnProperty(i)) {
                    if(hasInitVal) {
                        value = fun(value, this[i], i, this);
                    } else {
                        value = this[i];
                        hasInitVal = true;
                    }
                }
            }
            return value;
        }
    }
})();
