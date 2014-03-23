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
        Util.CLASS_NAME = 'Util';

        Util._idCounter = 0;
        return Util;
    })();
    StructureTS.Util = Util;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var BaseObject = (function () {
        function BaseObject() {
            this.CLASS_NAME = 'BaseObject';
            this.cid = null;
            this.cid = StructureTS.Util.uniqueId();
        }
        BaseObject.prototype.getQualifiedClassName = function () {
            return this.CLASS_NAME;
        };

        BaseObject.prototype.destroy = function () {
        };
        return BaseObject;
    })();
    StructureTS.BaseObject = BaseObject;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var BaseEvent = (function () {
        function BaseEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            this.CLASS_NAME = 'BaseEvent';
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
    })();
    StructureTS.BaseEvent = BaseEvent;
})(StructureTS || (StructureTS = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StructureTS;
(function (StructureTS) {
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher() {
            _super.call(this);
            this.CLASS_NAME = 'EventDispatcher';
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
            }

            event.currentTarget = this;

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
            this.CLASS_NAME = 'DisplayObjectContainer';
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
        StringUtil.CLASS_NAME = 'StringUtil';
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
        TemplateFactory.CLASS_NAME = 'TemplateFactory';

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
            this.CLASS_NAME = 'DOMElement';
            this._isVisible = true;
            this.element = null;
            this.$element = null;
            this._type = null;
            this._params = null;

            if (type instanceof jQuery) {
                this.$element = type;
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
            child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
            this.$element.append(child.$element);

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
                child.layoutChildren();

                _super.prototype.addChildAt.call(this, child, index);

                jQuery(children.get(index)).before(child.$element);
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
            this.CLASS_NAME = 'Stage';
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

            if (enabled) {
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
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        function TimerEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            this.CLASS_NAME = 'TimerEvent';
        }
        TimerEvent.TIMER = 'TimerEvent.timer';

        TimerEvent.TIMER_COMPLETE = 'TimerEvent.timerComplete';
        return TimerEvent;
    })(StructureTS.BaseEvent);
    StructureTS.TimerEvent = TimerEvent;
})(StructureTS || (StructureTS = {}));
var StructureTS;
(function (StructureTS) {
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (typeof repeatCount === "undefined") { repeatCount = 0; }
            _super.call(this);
            this.CLASS_NAME = 'Timer';
            this._timer = null;
            this._currentCount = 0;
            this._delay = null;
            this._repeatCount = 0;
            this.running = false;

            this._delay = delay;
            this._repeatCount = repeatCount;
            this._currentCount = repeatCount;
        }
        Timer.prototype.getCurrentCount = function () {
            return this._currentCount;
        };

        Timer.prototype.getDelay = function () {
            return this._delay;
        };

        Timer.prototype.setDelay = function (value) {
            this.stop();
            this._delay = value;
            this.start();

            return this;
        };

        Timer.prototype.getRepeatCount = function () {
            return this._repeatCount;
        };

        Timer.prototype.setRepeatCount = function (value) {
            this.stop();
            this._repeatCount = value;
            this._currentCount = value;
            this.start();

            return this;
        };

        Timer.prototype.reset = function () {
            this.stop();
            this._currentCount = this._repeatCount;
            this.start();

            return this;
        };

        Timer.prototype.start = function () {
            var _this = this;
            if (this.running) {
                return this;
            }

            this._timer = setInterval(function () {
                _this.decrementCounter();
            }, this._delay);

            this.running = true;

            return this;
        };

        Timer.prototype.stop = function () {
            clearInterval(this._timer);
            this.running = false;

            return this;
        };

        Timer.prototype.decrementCounter = function () {
            if (this._currentCount > 0) {
                this._currentCount--;
            }

            if (this._delay && this._currentCount > 0 || this._repeatCount === 0) {
                this.dispatchEvent(new StructureTS.TimerEvent(StructureTS.TimerEvent.TIMER));
            } else {
                this.stop();
                this.dispatchEvent(new StructureTS.TimerEvent(StructureTS.TimerEvent.TIMER));
                this.dispatchEvent(new StructureTS.TimerEvent(StructureTS.TimerEvent.TIMER_COMPLETE));
            }
        };

        Timer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.stop();
            this._timer = null;
        };
        return Timer;
    })(StructureTS.EventDispatcher);
    StructureTS.Timer = Timer;
})(StructureTS || (StructureTS = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var BaseEvent = StructureTS.BaseEvent;

    var DeviceButton = (function (_super) {
        __extends(DeviceButton, _super);
        function DeviceButton(color, index) {
            _super.call(this, 'templates/DeviceButtonTemplate.hbs', { buttonColor: color });
            this.CLASS_NAME = 'DeviceButton';
            this.indexId = null;

            this.indexId = index;
        }
        DeviceButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };

        DeviceButton.prototype.layoutChildren = function () {
        };

        DeviceButton.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this.$element.addEventListener('click', this.onClick, this);
            this.$element.css('cursor', 'pointer');

            _super.prototype.enable.call(this);
        };

        DeviceButton.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this.$element.removeEventListener('click', this.onClick, this);
            this.$element.css('cursor', 'none');

            _super.prototype.disable.call(this);
        };

        DeviceButton.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };

        DeviceButton.prototype.animate = function () {
            var _this = this;
            this.$element.addClass('active');
            setTimeout(function () {
                _this.$element.removeClass('active');
            }, 250);
        };

        DeviceButton.prototype.onClick = function (event) {
            this.animate();
            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, this.indexId));
        };
        return DeviceButton;
    })(DOMElement);
    codeBelt.DeviceButton = DeviceButton;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var BaseEvent = StructureTS.BaseEvent;

    var DeviceView = (function (_super) {
        __extends(DeviceView, _super);
        function DeviceView($element) {
            _super.call(this, $element);
            this.CLASS_NAME = 'DeviceView';
            this._redButton = null;
            this._greenButton = null;
            this._yellowButton = null;
            this._blueButton = null;
            this._buttonList = null;
        }
        DeviceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._buttonList = [];

            this._blueButton = new codeBelt.DeviceButton('blue', 2);
            this.addChild(this._blueButton);

            this._redButton = new codeBelt.DeviceButton('red', 0);
            this.addChildAt(this._redButton, 0);

            this._greenButton = new codeBelt.DeviceButton('green', 1);
            this.addChild(this._greenButton);

            this._yellowButton = new codeBelt.DeviceButton('yellow', 3);
            this.addChild(this._yellowButton);

            this.swapChildren(this._blueButton, this._greenButton);

            this._buttonList.push(this._redButton);
            this._buttonList.push(this._greenButton);
            this._buttonList.push(this._blueButton);
            this._buttonList.push(this._yellowButton);
        };

        DeviceView.prototype.layoutChildren = function () {
        };

        DeviceView.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this._redButton.enable();
            this._greenButton.enable();
            this._blueButton.enable();
            this._yellowButton.enable();

            _super.prototype.enable.call(this);
        };

        DeviceView.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this._redButton.disable();
            this._greenButton.disable();
            this._blueButton.disable();
            this._yellowButton.disable();

            _super.prototype.disable.call(this);
        };

        DeviceView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._redButton.destroy();
            this._redButton = null;

            this._greenButton.destroy();
            this._greenButton = null;

            this._blueButton.destroy();
            this._blueButton = null;

            this._yellowButton.destroy();
            this._yellowButton = null;
        };

        DeviceView.prototype.animateButton = function (buttonIndex) {
            var deviceButton = this._buttonList[buttonIndex];
            deviceButton.animate();
        };
        return DeviceView;
    })(DOMElement);
    codeBelt.DeviceView = DeviceView;
})(codeBelt || (codeBelt = {}));
var codeBelt;
(function (codeBelt) {
    var DOMElement = StructureTS.DOMElement;
    var Stage = StructureTS.Stage;
    var Timer = StructureTS.Timer;
    var TimerEvent = StructureTS.TimerEvent;
    var BaseEvent = StructureTS.BaseEvent;

    var SimonApp = (function (_super) {
        __extends(SimonApp, _super);
        function SimonApp() {
            _super.call(this);
            this.CLASS_NAME = 'SimonApp';
            this._deviceView = null;
            this._timer = null;
            this._memoryOrder = null;
            this._userSequence = null;
            this._centerDisplay = null;
        }
        SimonApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            var $device = this.$element.children('.js-simon');

            this._deviceView = new codeBelt.DeviceView($device);
            this.addChild(this._deviceView);

            this._centerDisplay = new DOMElement('div', { 'class': 'display' });
            this._deviceView.addChild(this._centerDisplay);
        };

        SimonApp.prototype.layoutChildren = function () {
            if (this._deviceView.isEnabled === true) {
                this._centerDisplay.$element.text('Go!');
            } else {
                this._centerDisplay.$element.text('Start!');
            }
        };

        SimonApp.prototype.enable = function () {
            if (this.isEnabled === true)
                return;

            this._deviceView.addEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.addEventListener('click', this.onClick, this);

            _super.prototype.enable.call(this);
        };

        SimonApp.prototype.disable = function () {
            if (this.isEnabled === false)
                return;

            this._deviceView.removeEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.removeEventListener('click', this.onClick, this);

            _super.prototype.disable.call(this);
        };

        SimonApp.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };

        SimonApp.prototype.onTimer = function (event) {
            var timer = event.target;

            var currentIndex = (this._memoryOrder.length - 1) - timer.getCurrentCount();
            var showItem = this._memoryOrder[currentIndex];
            this._deviceView.animateButton(showItem);
        };

        SimonApp.prototype.onTimerComplete = function (event) {
            this._timer.destroy();

            this._deviceView.enable();
            this.layoutChildren();
        };

        SimonApp.prototype.onColorButtonClick = function (event) {
            console.log("event", event.data);

            this._userSequence.push(event.data);

            if (this._userSequence.length === this._memoryOrder.length) {
                var isMatch = this._userSequence.toString() === this._memoryOrder.toString();
                if (isMatch) {
                    alert('You did it!');
                } else {
                    alert('Nope, you did not get it.');
                }
                this._userSequence = [];
                this._deviceView.disable();
                this.layoutChildren();
            }
        };

        SimonApp.prototype.onClick = function (event) {
            this._centerDisplay.$element.text('');

            this._memoryOrder = [0, 2, 3, 1, 2, 2];
            this._userSequence = [];

            this._timer = new Timer(1500, this._memoryOrder.length);
            this._timer.addEventListener(TimerEvent.TIMER, this.onTimer, this);
            this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this._timer.start();
        };
        return SimonApp;
    })(Stage);
    codeBelt.SimonApp = SimonApp;
})(codeBelt || (codeBelt = {}));
//# sourceMappingURL=app.js.map
