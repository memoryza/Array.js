;(function() {
    'use strict';
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }
    var isFunction = isType("Function"),
        _arrProtoCache = Array.prototype;

    Array.isArray = Array.isArray || isType("Array");
    function _typeError(msg) {
       throw new TypeError(msg);
    }
    function _checkMethod(o) {
        if(!this) {
            _typeError("this is null or not defined");
        }
        if(o === undefined) {
            _typeError(o + " is not defined");
        } else if(!o && !isFunction(o)) {
            _typeError(o  + " is not a function");
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
    if(!isFunction(_arrProtoCache.every)) {
        _arrProtoCache.every = function(fun, thisArg) {
            _checkMethod.call(this, fun);

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

    if(!isFunction(_arrProtoCache.some)) {
        _arrProtoCache.some = function(fun, thisArg) {
            _checkMethod.call(this, fun);

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

    if(!isFunction(_arrProtoCache.forEach)) {
        _arrProtoCache.forEach = function(fun, thisArg) {
            _checkMethod.call(this, fun);

            thisArg = thisArg || null;
            var O = Object(this),
                len = O.length >>> 0;
            for(var i = 0; i < len; i++) {
                fun.call(thisArg, this[i], i, this);
            }
        }
    }

    if (!isFunction(_arrProtoCache.filter)) {
        _arrProtoCache.filter =  function(fun, thisArg) {
            _checkMethod.call(this, fun);

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
    if(!isFunction(_arrProtoCache.map)) {
        _arrProtoCache.map = function(fun, thisArg) {
            _checkMethod.call(this, fun);

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
    if(!isFunction(_arrProtoCache.reduce)) {
        _arrProtoCache.reduce = function(fun, initVal) {
            _checkMethod.call(this, fun);
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
    if(!isFunction(_arrProtoCache.reduceRight)) {
        _arrProtoCache.reduceRight = function(fun, initVal) {
            _checkMethod.call(this, fun);

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

    if(!isFunction(_arrProtoCache.indexOf)) {
        _arrProtoCache.indexOf = function(val) {
            _checkMethod.call(this, val);

            var O = new Object(this),
                len =  O.length >>> 0,
                index = -1;
            for(var i  = 0; i < len;  i++) {
                if(i in O) {
                    if(!_compareObject(O[i], val)) {
                        continue;
                    }
                    index = i;
                    break;
                }
            }
            return index;
        }
    }

    if(!isFunction(_arrProtoCache.lastIndexOf)) {
        _arrProtoCache.lastIndexOf = function(val) {
            _checkMethod.call(this, val);

            var O = Object(this),
                len  = O.length >>> 0,
                index = -1;
            for(var i = len;i >= 0; i--) {
                if(i in O) {
                    if(!_compareObject(O[i], val)) {
                        continue;
                    }
                    index = i;
                    break;
                }
            }
            return index;
        }
    }
})();
