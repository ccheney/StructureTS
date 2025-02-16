var StructureTS;
(function (StructureTS) {
    var Util = (function () {
        function Util() {
        }
        Util.uniqueId = function (prefix) {
            if (typeof prefix === "undefined") { prefix = null; }
            var id = ++Util._idCounter;

            if (prefix != null) {
                return String(prefix + id);
            } else {
                return id;
            }
        };

        Util.deletePropertyFromObject = function (object, list) {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    var value = object[key];

                    if (value instanceof Array) {
                        var array = value;
                        for (var index in array) {
                            Util.deletePropertyFromObject(array[index], list);
                        }
                    } else {
                        for (var listIndex in list) {
                            if (key === list[listIndex]) {
                                delete object[key];
                            }
                        }
                    }
                }
            }

            return object;
        };

        Util.renamePropertyOnObject = function (object, oldName, newName) {
            if (object.hasOwnProperty(oldName)) {
                object[newName] = object[oldName];
                delete object[oldName];
            }

            return object;
        };

        Util.clone = function (obj) {
            if (null == obj || "object" != typeof obj) {
                return obj;
            }

            if (obj instanceof Date) {
                var date = new Date();
                date.setTime(obj.getTime());
                return date;
            }

            if (obj instanceof Array) {
                var array = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    array[i] = Util.clone(obj[i]);
                }
                return array;
            }

            if (obj instanceof Object) {
                var copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = Util.clone(obj[attr]);
                    }
                }
                return copy;
            }

            throw new Error("[Util] Unable to copy obj! Its type isn't supported.");
        };

        Util.toBoolean = function (strNum) {
            strNum = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;

            return (strNum == "1" || strNum == "true");
        };

        Util.getClassName = function (classObject) {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(classObject.constructor.toString());

            return (results && results.length > 1) ? results[1] : '';
        };
        Util._idCounter = 0;
        return Util;
    })();
    StructureTS.Util = Util;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var BaseObject = (function () {
        function BaseObject() {
            this.cid = null;
            this.cid = StructureTS.Util.uniqueId();
        }
        BaseObject.prototype.getQualifiedClassName = function () {
            return StructureTS.Util.getClassName(this);
        };

        BaseObject.prototype.destroy = function () {
        };
        return BaseObject;
    })();
    StructureTS.BaseObject = BaseObject;
})(StructureTS || (StructureTS = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StructureTS;
(function (StructureTS) {
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        function BaseEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this);
            this.type = null;
            this.target = null;
            this.currentTarget = null;
            this.data = null;
            this.bubble = false;
            this.cancelable = false;
            this.isPropagationStopped = false;
            this.isImmediatePropagationStopped = false;

            this.type = type;
            this.bubble = bubbles;
            this.cancelable = cancelable;
            this.data = data;
        }
        BaseEvent.prototype.clone = function () {
            return new BaseEvent(this.type, this.bubble, this.cancelable, this.data);
        };

        BaseEvent.prototype.stopPropagation = function () {
            this.isPropagationStopped = true;
        };

        BaseEvent.prototype.stopImmediatePropagation = function () {
            this.stopPropagation();
            this.isImmediatePropagationStopped = true;
        };
        BaseEvent.ACTIVATE = 'BaseEvent.activate';

        BaseEvent.ADDED = 'BaseEvent.added';

        BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';

        BaseEvent.CANCEL = 'BaseEvent.cancel';

        BaseEvent.CHANGE = 'BaseEvent.change';

        BaseEvent.CLEAR = 'BaseEvent.clear';

        BaseEvent.CLOSE = 'BaseEvent.close';

        BaseEvent.CLOSING = 'BaseEvent.closing';

        BaseEvent.COMPLETE = 'BaseEvent.complete';

        BaseEvent.CONNECT = 'BaseEvent.connect';

        BaseEvent.COPY = 'BaseEvent.copy';

        BaseEvent.CUT = 'BaseEvent.cut';

        BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';

        BaseEvent.DISPLAYING = 'BaseEvent.displaying';

        BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';

        BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';

        BaseEvent.EXITING = 'BaseEvent.exiting';

        BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';

        BaseEvent.INIT = 'BaseEvent.init';

        BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';

        BaseEvent.OPEN = 'BaseEvent.open';

        BaseEvent.PASTE = 'BaseEvent.paste';

        BaseEvent.PREPARING = 'BaseEvent.preparing';

        BaseEvent.REMOVED = 'BaseEvent.removed';

        BaseEvent.RENDER = 'BaseEvent.render';

        BaseEvent.RESIZE = 'BaseEvent.resize';
        return BaseEvent;
    })(StructureTS.BaseObject);
    StructureTS.BaseEvent = BaseEvent;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            _super.call(this);
            this._listeners = null;
            this.parent = null;
            this.isEnabled = false;

            this._listeners = [];
        }
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            var list = this._listeners[type];
            if (list == null) {
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope) {
                    list.splice(i, 1);
                } else if (index === 0 && listener.priority < priority) {
                    index = i + 1;
                }
            }

            list.splice(index, 0, { callback: callback, scope: scope, priority: priority });

            return this;
        };

        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            var list = this._listeners[type];
            if (list) {
                var i = list.length;
                while (--i > -1) {
                    if (list[i].callback === callback && list[i].scope === scope) {
                        list.splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        };

        EventDispatcher.prototype.dispatchEvent = function (event) {
            if (event.target == null) {
                event.target = this;
                event.currentTarget = this;
            }

            var list = this._listeners[event.type];
            if (list) {
                var i = list.length;
                var listener;
                while (--i > -1) {
                    if (event.cancelable && event.isImmediatePropagationStopped) {
                        break;
                    }

                    listener = list[i];
                    listener.callback.call(listener.scope, event);
                }
            }

            if (this.parent && event.bubble) {
                if (event.cancelable && event.isPropagationStopped) {
                    return this;
                }

                var previousTarget = event.target;
                event = event.clone();
                event.target = previousTarget;

                event.currentTarget = this;

                this.parent.dispatchEvent(event);
            }

            return this;
        };

        EventDispatcher.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.disable();

            this.parent = null;
            this._listeners = null;
        };

        EventDispatcher.prototype.enable = function () {
            if (this.isEnabled === true)
                return this;

            this.isEnabled = true;
            return this;
        };

        EventDispatcher.prototype.disable = function () {
            if (this.isEnabled === false)
                return this;

            this.isEnabled = false;
            return this;
        };

        EventDispatcher.prototype.getEventListeners = function () {
            return this._listeners;
        };
        return EventDispatcher;
    })(StructureTS.BaseObject);
    StructureTS.EventDispatcher = EventDispatcher;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            this.isCreated = false;
            this.numChildren = 0;
            this.children = [];
            this.width = 0;
            this.height = 0;
            this.unscaledWidth = 100;
            this.unscaledHeight = 100;
        }
        DisplayObjectContainer.prototype.createChildren = function () {
            return this;
        };

        DisplayObjectContainer.prototype.addChild = function (child) {
            if (child.parent) {
                child.parent.removeChild(child);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            if (child.parent) {
                child.parent.removeChild(child);
            }

            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
            return this;
        };

        DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }

            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);

            this.swapChildren(child1, child2);

            return this;
        };

        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.children.indexOf(child);
        };

        DisplayObjectContainer.prototype.contains = function (child) {
            return this.children.indexOf(child) >= 0;
        };

        DisplayObjectContainer.prototype.removeChild = function (child) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                this.children.splice(index, 1);
            }
            child.disable();
            child.parent = null;

            this.numChildren = this.children.length;

            return this;
        };

        DisplayObjectContainer.prototype.removeChildren = function () {
            while (this.children.length > 0) {
                this.removeChild(this.children.pop());
            }

            this.numChildren = this.children.length;

            return this;
        };

        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this.children[index];
        };

        DisplayObjectContainer.prototype.getChildByCid = function (cid) {
            var children = this.children.filter(function (child) {
                return child.cid == cid;
            });

            return children[0] || null;
        };

        DisplayObjectContainer.prototype.setSize = function (unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            if (this.isCreated) {
                this.layoutChildren();
            }

            return this;
        };

        DisplayObjectContainer.prototype.layoutChildren = function () {
            return this;
        };

        DisplayObjectContainer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.children = [];
            this.numChildren = 0;
        };
        return DisplayObjectContainer;
    })(StructureTS.EventDispatcher);
    StructureTS.DisplayObjectContainer = DisplayObjectContainer;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var CanvasElement = (function (_super) {
        __extends(CanvasElement, _super);
        function CanvasElement() {
            _super.call(this);
            this.stage = null;
            this.context = null;
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.alpha = 1;
            this.visible = true;
            TweenLite.ticker.addEventListener("tick", this.layoutChildren.bind(this), this);
        }
        CanvasElement.prototype.createChildren = function () {
            return this;
        };

        CanvasElement.prototype.render = function () {
            return this;
        };

        CanvasElement.prototype.readerStart = function () {
            this.context.save();
            return this;
        };

        CanvasElement.prototype.layoutChildren = function () {
            if (!this.context || this.alpha <= 0 || !this.visible) {
                return this;
            }

            this.readerStart();
            this.context.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();

            return this;
        };

        CanvasElement.prototype.renderEnd = function () {
            this.context.restore();
            return this;
        };

        CanvasElement.prototype.addChild = function (child) {
            child.parent = this;
            child.stage = this.stage;
            child.context = this.context;
            child.createChildren();

            return this;
        };

        CanvasElement.prototype.removeChild = function (child) {
            child.stage = null;
            child.context = null;

            return this;
        };
        return CanvasElement;
    })(StructureTS.DisplayObjectContainer);
    StructureTS.CanvasElement = CanvasElement;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var Canvas = (function (_super) {
        __extends(Canvas, _super);
        function Canvas() {
            _super.call(this);
            this.element = null;

            this.stage = this;
        }
        Canvas.prototype.appendTo = function (type, enabled) {
            if (typeof enabled === "undefined") { enabled = true; }
            this.element = document.getElementById(type);
            this.context = this.element.getContext("2d");

            this.width = this.element.width;
            this.height = this.element.height;

            if (!this.isCreated) {
                this.createChildren();
                this.isCreated = true;
            }

            if (enabled) {
                this.enable();
            }

            return this;
        };

        Canvas.prototype.addChild = function (child) {
            child.parent = this.stage;
            child.stage = this.stage;
            child.context = this.context;
            child.createChildren();

            return this;
        };

        Canvas.prototype.removeChild = function (child) {
            child.stage = null;
            child.context = null;

            return this;
        };

        Canvas.prototype.render = function () {
            this.context.clearRect(0, 0, this.width, this.height);

            return this;
        };
        return Canvas;
    })(StructureTS.CanvasElement);
    StructureTS.Canvas = Canvas;
})(StructureTS || (StructureTS = {}));
(function ($, window, document) {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {
            }, fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
            };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }

    var hashCode = function (str) {
        str = String(str);

        var character;
        var hash = null;
        var strLength = str.length;

        if (strLength == 0)
            return hash;

        for (var i = 0; i < strLength; i++) {
            character = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash;
        }

        return String(Math.abs(hash));
    };

    $.fn.addEventListener = function (type, selector, data, callback, scope) {
        var _callback;
        var _scope;
        var _handler;
        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = data;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, _handler);
                break;
            case 4:
                _callback = data;
                _scope = callback;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, selector, _handler);
                break;
            case 5:
                _callback = callback;
                _scope = scope;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
                this.on(type, selector, data, _handler);
                break;
            default:
                throw new Error('jQuery addEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };

    $.fn.removeEventListener = function (type, selector, callback, scope) {
        var _callback;
        var _scope;
        var _handler;

        switch (arguments.length) {
            case 3:
                _callback = selector;
                _scope = callback;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)];
                this.off(type, _handler);
                _scope._handlerMap[hashCode(_callback)] = null;
                break;
            case 4:
                _callback = callback;
                _scope = scope;
                _scope._handlerMap = _scope._handlerMap || {};
                _handler = _scope._handlerMap[hashCode(_callback)];
                this.off(type, selector, _handler);
                _scope._handlerMap[hashCode(_callback)] = null;
                break;
            default:
                throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.');
        }
        return this;
    };
})(jQuery, window, document);
var StructureTS;
(function (StructureTS) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.getExtension = function (filename) {
            return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
        };

        StringUtil.hyphenToCamelCase = function (str) {
            str = str.toLowerCase();

            return str.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
        };

        StringUtil.hyphenToPascalCase = function (str) {
            str = str.toLowerCase();

            return null;
        };

        StringUtil.camelCaseToHyphen = function (str) {
            return str.replace(/([a-z][A-Z])/g, function (g) {
                return g[0] + '-' + g[1].toLowerCase();
            });
        };

        StringUtil.createUUID = function () {
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = (c == 'x') ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            return uuid;
        };

        StringUtil.queryStringToObject = function (queryString) {
            var params = {};
            var temp = null;

            var queries = queryString.substring(1).split("&");

            var len = queries.length;
            for (var i = 0; i < len; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        };

        StringUtil.removeAllWhitespace = function (str) {
            return str.replace(/\s+/g, '');
        };

        StringUtil.removeLeadingTrailingWhitespace = function (str) {
            return str.replace(/(^\s+|\s+$)/g, '');
        };

        StringUtil.truncate = function (text, length) {
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + "...";
            }
        };

        StringUtil.format = function (str) {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                rest[_i] = arguments[_i + 1];
            }
            var length = rest.length;
            for (var i = 0; i < length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, rest[i]);
            }

            return str;
        };
        return StringUtil;
    })();
    StructureTS.StringUtil = StringUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var TemplateFactory = (function () {
        function TemplateFactory() {
        }
        TemplateFactory.createTemplate = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            return TemplateFactory.create(templatePath, data);
        };

        TemplateFactory.createView = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            var template = TemplateFactory.create(templatePath, data);

            var view = new StructureTS.DOMElement();
            view.$element = jQuery(template);
            return view;
        };

        TemplateFactory.create = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            var regex = /^([.#])(.+)/;
            var template = null;
            var isClassOrIdName = regex.test(templatePath);

            if (isClassOrIdName) {
                var htmlString = jQuery(templatePath).html();
                htmlString = StructureTS.StringUtil.removeLeadingTrailingWhitespace(htmlString);

                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    var templateMethod = _.template(htmlString);
                    template = templateMethod(data);
                } else {
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            } else {
                var templateObj = window[TemplateFactory.templateNamespace];
                if (!templateObj) {
                    return null;
                }

                var templateFunction = templateObj[templatePath];
                if (templateFunction) {
                    template = templateFunction(data);
                }
            }

            return template;
        };
        TemplateFactory.UNDERSCORE = 'underscore';
        TemplateFactory.HANDLEBARS = 'handlebars';

        TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
        TemplateFactory.templateNamespace = 'JST';
        return TemplateFactory;
    })();
    StructureTS.TemplateFactory = TemplateFactory;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var DOMElement = (function (_super) {
        __extends(DOMElement, _super);
        function DOMElement(type, params) {
            if (typeof type === "undefined") { type = null; }
            if (typeof params === "undefined") { params = null; }
            _super.call(this);
            this._isVisible = true;
            this.element = null;
            this.$element = null;
            this._isReference = false;
            this._type = null;
            this._params = null;

            if (type instanceof jQuery) {
                this.$element = type;
                this._isReference = true;
            } else if (type) {
                this._type = type;
                this._params = params;
            }
        }
        DOMElement.prototype.createChildren = function (type, params) {
            if (typeof type === "undefined") { type = 'div'; }
            if (typeof params === "undefined") { params = null; }
            type = this._type || type;
            params = this._params || params;

            if (this.$element == null) {
                var html = StructureTS.TemplateFactory.createTemplate(type, params);
                if (html) {
                    this.$element = jQuery(html);
                } else {
                    this.$element = jQuery("<" + type + "/>", params);
                }
            }

            this.element = this.$element[0];

            return this;
        };

        DOMElement.prototype.addChild = function (child) {
            _super.prototype.addChild.call(this, child);

            if (this.$element == null) {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
            }

            if (child.isCreated === false) {
                child.createChildren();
                child.isCreated = true;
            }

            child.$element.attr('data-cid', child.cid);

            if (child._isReference === false) {
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
                this.$element.append(child.$element);
            }

            child.enable();
            child.layoutChildren();

            return this;
        };

        DOMElement.prototype.onAddedToDom = function (event) {
            var child = event.data;
            child.$element.removeEventListener('DOMNodeInsertedIntoDocument', this.onAddedToDom, this);
            child.layoutChildren();
            child.dispatchEvent(new StructureTS.BaseEvent(StructureTS.BaseEvent.ADDED));
        };

        DOMElement.prototype.addChildAt = function (child, index) {
            var children = this.$element.children();
            var length = children.length;

            if (index < 0 || index >= length) {
                this.addChild(child);
            } else {
                if (child.isCreated === false) {
                    child.createChildren();
                    child.isCreated = true;
                }

                child.$element.attr('data-cid', child.cid);
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);

                _super.prototype.addChildAt.call(this, child, index);

                jQuery(children.get(index)).before(child.$element);

                child.enable();
                child.layoutChildren();
            }

            return this;
        };

        DOMElement.prototype.swapChildren = function (child1, child2) {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        };

        DOMElement.prototype.getChildAt = function (index) {
            return _super.prototype.getChildAt.call(this, index);
        };

        DOMElement.prototype.getChild = function (selector) {
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length == 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }

            var cid = jQueryElement.data('cid');
            var domElement = this.getChildByCid(cid);

            if (domElement == null) {
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = jQueryElement[0];
                domElement.isCreated = true;

                _super.prototype.addChild.call(this, domElement);
            }

            return domElement;
        };

        DOMElement.prototype.getChildren = function (selector) {
            if (typeof selector === "undefined") { selector = ''; }
            var $child;
            var domElement;
            var $list = this.$element.children(selector);

            var listLength = $list.length;
            for (var i = 0; i < listLength; i++) {
                $child = jQuery($list[i]);

                if (!$child.data('cid')) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    domElement.$element.attr('data-cid', domElement.cid);
                    domElement.element = $child.get(0);
                    domElement.isCreated = true;

                    _super.prototype.addChild.call(this, domElement);
                }
            }

            return this.children;
        };

        DOMElement.prototype.removeChild = function (child) {
            child.$element.unbind();
            child.$element.remove();

            _super.prototype.removeChild.call(this, child);

            return this;
        };

        DOMElement.prototype.removeChildren = function () {
            _super.prototype.removeChildren.call(this);

            this.$element.empty();

            return this;
        };

        DOMElement.prototype.alpha = function (number) {
            this.$element.css('opacity', number);
            return this;
        };

        DOMElement.prototype.visible = function (value) {
            if (value == false) {
                this._isVisible = false;
                this.$element.hide();
            } else if (value == true) {
                this._isVisible = true;
                this.$element.show();
            } else if (value == undefined) {
                return this._isVisible;
            }
            return this;
        };

        DOMElement.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.$element = null;
            this.element = null;
        };
        return DOMElement;
    })(StructureTS.DisplayObjectContainer);
    StructureTS.DOMElement = DOMElement;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.call(this);
        }
        Stage.prototype.appendTo = function (type, enabled) {
            if (typeof enabled === "undefined") { enabled = true; }
            this.$element = jQuery(type);
            this.$element.attr('data-cid', this.cid);

            if (!this.isCreated) {
                this.createChildren();
                this.isCreated = true;
                this.layoutChildren();
            }

            if (enabled === false) {
                this.disable();
            } else {
                this.enable();
            }

            return this;
        };
        return Stage;
    })(StructureTS.DOMElement);
    StructureTS.Stage = Stage;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.constrain = function (num, min, max) {
            if (typeof min === "undefined") { min = 0; }
            if (typeof max === "undefined") { max = 1; }
            if (num < min) {
                return min;
            }
            if (num > max) {
                return max;
            }
            return num;
        };

        MathUtil.randomRange = function (min, max, wholeNumber) {
            if (typeof wholeNumber === "undefined") { wholeNumber = true; }
            var num = (min + Math.random() * (max - min));

            if (wholeNumber) {
                return Math.round(num);
            }
            return num;
        };

        MathUtil.rangeToPercent = function (num, min, max, constrainMin, constrainMax) {
            if (typeof constrainMin === "undefined") { constrainMin = false; }
            if (typeof constrainMax === "undefined") { constrainMax = false; }
            if (constrainMin && num < min) {
                return 0;
            }
            if (constrainMax && num > max) {
                return 1;
            }
            return (num - min) / (max - min);
        };

        MathUtil.percentToRange = function (percent, min, max) {
            return (percent * (max - min)) + min;
        };

        MathUtil.map = function (num, min1, max1, min2, max2, round, constrainMin, constrainMax) {
            if (typeof round === "undefined") { round = true; }
            if (typeof constrainMin === "undefined") { constrainMin = true; }
            if (typeof constrainMax === "undefined") { constrainMax = true; }
            if (constrainMin && num < min1) {
                return min2;
            }
            if (constrainMax && num > max1) {
                return max2;
            }

            var num1 = (num - min1) / (max1 - min1);
            var num2 = (num1 * (max2 - min2)) + min2;
            if (round) {
                return Math.round(num2);
            }
            return num2;
        };

        MathUtil.radiansToDegrees = function (radians) {
            return (radians * 180 / Math.PI);
        };

        MathUtil.degreesToRadians = function (degrees) {
            return (degrees * Math.PI / 180);
        };

        MathUtil.sign = function (num) {
            if (num < 0) {
                return -1;
            }
            return 1;
        };

        MathUtil.isPositive = function (num) {
            return (num >= 0);
        };

        MathUtil.isNegative = function (num) {
            return (num < 0);
        };

        MathUtil.isOdd = function (num) {
            var i = num;
            var e = 2;
            return Boolean(i % e);
        };

        MathUtil.isEven = function (num) {
            var int = num;
            var e = 2;
            return (int % e == 0);
        };

        MathUtil.isPrime = function (num) {
            if (num > 2 && num % 2 == 0) {
                return false;
            }
            var l = Math.sqrt(num);
            var i = 3;
            for (i; i <= l; i += 2) {
                if (num % i == 0) {
                    return false;
                }
            }
            return true;
        };

        MathUtil.factorial = function (num) {
            if (num == 0) {
                return 1;
            }
            var d = num.valueOf();
            var i = d - 1;
            while (i) {
                d = d * i;
                i--;
            }
            return d;
        };

        MathUtil.getDivisors = function (num) {
            var r = [];
            for (var i = 1, e = num / 2; i <= e; i++) {
                if (num % i == 0) {
                    r.push(i);
                }
            }
            if (num != 0) {
                r.push(num.valueOf());
            }
            return r;
        };

        MathUtil.toCelsius = function (fahrenheit, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (5 / 9) * (fahrenheit - 32);
            var s = r.toString().split(".");
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += "0";
                    i--;
                }
            }
            var c = s[0] + "." + d;
            return Number(c);
        };

        MathUtil.toFahrenheit = function (celsius, decimals) {
            if (typeof decimals === "undefined") { decimals = 2; }
            var d = '';
            var r = (celsius / (5 / 9)) + 32;
            var s = r.toString().split(".");
            if (s[1] != undefined) {
                d = s[1].substr(0, decimals);
            } else {
                var i = decimals;
                while (i > 0) {
                    d += "0";
                    i--;
                }
            }
            var f = s[0] + "." + d;
            return Number(f);
        };
        return MathUtil;
    })();
    StructureTS.MathUtil = MathUtil;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(image) {
            _super.call(this);
            this._image = null;
            this.ready = false;

            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }
        Bitmap.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            return this;
        };

        Bitmap.prototype.render = function () {
            this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.context.scale(this.scaleX, this.scaleY);
            this.context.rotate(StructureTS.MathUtil.degreesToRadians(this.rotation));
            this.context.translate(-this.width * 0.5, -this.height * 0.5);

            this.context.drawImage(this._image, 0, 0);

            return this;
        };
        return Bitmap;
    })(StructureTS.CanvasElement);
    StructureTS.Bitmap = Bitmap;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var LoaderEvent = (function (_super) {
        __extends(LoaderEvent, _super);
        function LoaderEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
        }
        LoaderEvent.prototype.clone = function () {
            return new LoaderEvent(this.type, this.bubble, this.cancelable, this.data);
        };
        LoaderEvent.COMPLETE = "LoaderEvent.complete";

        LoaderEvent.LOAD_COMPLETE = "LoaderEvent.loadComplete";

        LoaderEvent.ERROR = "LoaderEvent.error";
        return LoaderEvent;
    })(StructureTS.BaseEvent);
    StructureTS.LoaderEvent = LoaderEvent;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var AssetLoader = (function (_super) {
        __extends(AssetLoader, _super);
        function AssetLoader() {
            _super.call(this);
            this._dataStores = [];

            this.addEventListener(StructureTS.LoaderEvent.COMPLETE, this.onLoadComplete, this);
        }
        AssetLoader.getInstance = function () {
            if (this._instance == null) {
                this._instance = new AssetLoader();
            }
            return this._instance;
        };

        AssetLoader.prototype.addFile = function (dataStore, key) {
            this._dataStores[key] = dataStore;
            return this;
        };

        AssetLoader.prototype.getFile = function (key) {
            return this._dataStores[key];
        };

        AssetLoader.prototype.getImage = function (key) {
            return this._dataStores[key].data;
        };

        AssetLoader.prototype.getHtmlTemplate = function (key, templateId) {
            console.log(this.getQualifiedClassName(), 'TODO: check if you need to change this to user the TemplateFactory');
            var rawHtml = jQuery(this._dataStores[key].data).filter("#" + templateId).html();
            return rawHtml;
        };

        AssetLoader.prototype.load = function () {
            for (var key in this._dataStores) {
                var dataStore = this._dataStores[key];
                dataStore.addEventListener(StructureTS.LoaderEvent.COMPLETE, this.onLoadComplete, this);
                dataStore.load();
            }

            return this;
        };

        AssetLoader.prototype.onLoadComplete = function (event) {
            event.target.removeEventListener(StructureTS.LoaderEvent.COMPLETE, this.onLoadComplete, this);

            for (var key in this._dataStores) {
                var dataStore = this._dataStores[key];
                if (!dataStore.complete) {
                    return;
                }
            }

            this.dispatchEvent(new StructureTS.LoaderEvent(StructureTS.LoaderEvent.LOAD_COMPLETE));
        };
        return AssetLoader;
    })(StructureTS.EventDispatcher);
    StructureTS.AssetLoader = AssetLoader;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader(path) {
            _super.call(this);
            this._image = null;
            this.complete = false;

            this.src = path;

            var self = this;
            this._image = new Image();
            this._image.onload = function () {
                self.onImageLoad();
            };
        }
        ImageLoader.prototype.load = function () {
            if (this.complete) {
                return;
            }

            this._image.src = this.src;
        };

        ImageLoader.prototype.onImageLoad = function () {
            this.complete = true;
            this.data = this._image;
            this.dispatchEvent(new StructureTS.LoaderEvent(StructureTS.LoaderEvent.COMPLETE));
        };
        return ImageLoader;
    })(StructureTS.EventDispatcher);
    StructureTS.ImageLoader = ImageLoader;
})(StructureTS || (StructureTS = {}));
var codeBelt;
(function (codeBelt) {
    var Canvas = StructureTS.Canvas;

    var Bitmap = StructureTS.Bitmap;
    var AssetLoader = StructureTS.AssetLoader;
    var ImageLoader = StructureTS.ImageLoader;

    var LoaderEvent = StructureTS.LoaderEvent;

    var BannerAd = (function (_super) {
        __extends(BannerAd, _super);
        function BannerAd() {
            _super.call(this);
            this.CLASS_NAME = 'BannerAd';
            this._cherry = null;
            this._cherryDipped = null;
            this._logo = null;
            this._boxOfCandy = null;
            this._assetLoader = null;

            this._assetLoader = new AssetLoader();
            this._assetLoader.addEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);
            this._assetLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry.png"), "cherry");
            this._assetLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "cherry-dipped.png"), "cherry-dipped");
            this._assetLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "logo.png"), "logo");
            this._assetLoader.addFile(new ImageLoader(BannerAd.BASE_PATH + "box.png"), "box");
            this._assetLoader.load();
        }
        BannerAd.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };

        BannerAd.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            _super.prototype.enable.call(this);
        };

        BannerAd.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            _super.prototype.disable.call(this);
        };

        BannerAd.prototype.init = function (event) {
            this._assetLoader.removeEventListener(LoaderEvent.LOAD_COMPLETE, this.init, this);

            this._cherry = new Bitmap(this._assetLoader.getImage("cherry"));
            this._cherry.x = 83;
            this._cherry.y = 3;
            this.addChild(this._cherry);

            this._cherryDipped = new Bitmap(this._assetLoader.getImage("cherry-dipped"));
            this._cherryDipped.x = 83;
            this._cherryDipped.y = 37;
            this._cherryDipped.visible = false;
            this.addChild(this._cherryDipped);

            this._logo = new Bitmap(this._assetLoader.getImage("logo"));
            this._logo.x = 222;
            this._logo.y = 27;
            this.addChild(this._logo);

            this._boxOfCandy = new Bitmap(this._assetLoader.getImage("box"));
            this._boxOfCandy.x = 598;
            this._boxOfCandy.y = 2;
            this._boxOfCandy.alpha = 0;
            this._boxOfCandy.scaleX = 0;
            this._boxOfCandy.scaleY = 0;
            this.addChild(this._boxOfCandy);

            TweenLite.to(this._boxOfCandy, 1, { delay: 0.5, alpha: 1, scaleX: 1, scaleY: 1, ease: Cubic.easeOut });
            TweenLite.to(this._cherry, 0.5, { delay: 1, y: 37, ease: Cubic.easeOut, onComplete: this.onCherryComplete, onCompleteScope: this });
        };

        BannerAd.prototype.onCherryComplete = function () {
            this._cherryDipped.visible = true;
            this.removeChild(this._cherry);

            TweenLite.to(this._cherryDipped, 0.5, { y: 3, ease: Cubic.easeInOut, onComplete: this.onCherryDippedComplete, onCompleteScope: this });
        };

        BannerAd.prototype.onCherryDippedComplete = function () {
            TweenLite.to(this._logo, 1, { rotation: 720, scaleX: 0.5, scaleY: 0.5, ease: Bounce.easeOut });
        };
        BannerAd.BASE_PATH = "assets/media/images/";
        return BannerAd;
    })(Canvas);
    codeBelt.BannerAd = BannerAd;
})(codeBelt || (codeBelt = {}));
//# sourceMappingURL=app.js.map
