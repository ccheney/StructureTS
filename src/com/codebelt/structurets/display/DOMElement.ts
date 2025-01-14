/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path='../plugin/jquery.eventListener.ts'/>
///<reference path='DisplayObjectContainer.ts'/>
///<reference path='../event/BaseEvent.ts'/>
///<reference path='../util/TemplateFactory.ts'/>

module StructureTS
{
    export class DOMElement extends DisplayObjectContainer
    {
        /**
         * Whether or not the display object is visible. Display objects that are not visible are disabled.
         * For example, if visible=false for an InteractiveObject instance, it cannot be clicked.
         *
         * @property _isVisible
         * @type {boolean}
         * @default true
         * @private
         */
        private _isVisible:boolean = true;

        /**
         * A cached of the DOM Element.
         *
         * @property element
         * @type {Element}
         * @default null
         */
        public element:Element = null;

        /**
         * A cached jQuery object for the view's element.
         *
         * @property $element
         * @type {JQuery}
         * @default null
         */
        public $element:JQuery = null;

        /**
         * If a jQuery object was passed into the constructor this will be set as true and
         * this class will not try add the view to the DOM because it should already exists.
         *
         * @property _isReference
         * @type {boolean}
         * @private
         */
        private _isReference:boolean = false;

        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _type
         * @type {string}
         * @default null
         */
        private _type:string = null;

        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _params
         * @type {any}
         * @default null
         */
        private _params:any = null;

        /**
         * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
         *
         * @class DOMElement
         * @param type [any=null] Either a jQuery object or template you want to use the as the view. Check out the examples below.
         * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
         * @extends DisplayObjectContainer
         * @module StructureTS
         * @submodule view
         * @constructor
         * @version 0.1.2
         * @example
         // Example of using DOMElement with out extending it.
         var aLink:DOMElement = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
         this.addChild(aLink);

         * @example
         // Example of a view passing jQuery object.
         var view:CustomView = new CustomView($('.selector');
         this.addChild(view);

         // Example of a view extending DOMElement when passing in a jQuery object.
         export class CustomView extends DOMElement {
            constructor($element) {
                super($element);
            }

            public createChildren():void {
                super.createChildren();
                // Create and add your child objects to this parent class.
            }

            public layoutChildren():void {
                // Layout or update the child objects in this parent class.
            }

            public enable():void {
                if (this.isEnabled === true) return;
                // Enable the child objects and add any event listeners.
                super.enable();
            }

            public disable():void {
                if (this.isEnabled === false) return;
                // Disable the child objects and remove any event listeners.
                super.disable();
            }

            public destroy():void {
                super.destroy();
                // Destroy the child objects and references in this parent class to prevent memory leaks.
            }
        }
         * @example
         // Example of a view extending DOMElement with pre-compiled template passed into createChildren.
         var view:CustomView = new CustomView();
         this.addChild(view);

         // Example of a view extending DOMElement when passing in a jQuery object.
         export class CustomView extends DOMElement {
            constructor() {
                super();
            }

            public createChildren():void {
                super.createChildren('templates/home/homeTemplate');
                // Create and add your child objects to this parent class.
            }

            public layoutChildren():void {
                // Layout or update the child objects in this parent class.
            }

            public enable():void {
                if (this.isEnabled === true) return;
                // Enable the child objects and add any event listeners.
                super.enable();
            }

            public disable():void {
                if (this.isEnabled === false) return;
                // Disable the child objects and remove any event listeners.
                super.disable();
            }

            public destroy():void {
                super.destroy();
                // Destroy the child objects and references in this parent class to prevent memory leaks.
            }
        }
         **/
        constructor(type:any = null, params:any = null)
        {
            super();

            if (type instanceof jQuery)
            {
                this.$element = type;
                this._isReference = true;
            }
            else if (type)
            {
                this._type = type;
                this._params = params;
            }
        }

        /**
         * The createChildren function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * This method gets called only once when the child view is added to another view. If the child view is removed and added to another view the createChildren method will not be called again.
         * @example
         // By default your view class will be a div element:
         public createChildren():void {
            super.createChildren();

            this._childInstance = new DOMElement();
            this.addChild(this._childInstance);
        }

         // But lets say you wanted the view to be a ul element your would do:
         public createChildren():void {
            super.createChildren('ul');
        }

         // Then you could nest other elements inside this base view/element.
         public createChildren():void {
            super.createChildren('ul', {id: 'myId', 'class': 'myClass anotherClass'});

            var li:DOMElement = new DOMElement('li', {text: 'Robert is cool'});
            this.addChild(li);
        }

         // So that's cool but what if you wanted a block of html to be your view. Let's say you had the below inline Handlebar template in your html file.
         <script id="todoTemplate" type="text/template">
         <div id="htmlTemplatel" class="js-todo">
         <div id="input-wrapper">
         <input type="text" class="list-input" placeholder="{{ data.text }}">
         <input type="button" class="list-item-submit" value="Add">
         </div>
         </div>
         </script>

         // You would just pass in the id of the template which in this case is "#todoTemplate". There is a second optional argument where you can pass data for the Handlebar template to use.
         public createChildren():void {
            super.createChildren('#todoTemplate', { data: this.viewData });

        }

         // One more. Let's say you wanted the Handlebar templates in there own files and then pre-compiled them so they would be faster to use. With the StructureTS work flow you can do this. Then you just have to reference the path to the template.
         public createChildren():void {
            super.createChildren('templates/home/HtmlTemplate');

        }
         * @method createChildren
         * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
         * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
         * @returns {DOMElement} Returns an instance of itself.
         * @public
         * @chainable
         */
        public createChildren(type:string = 'div', params:any = null):any
        {
            // Use the data passed into the constructor first else use the arguments from createChildren.
            type = this._type || type;
            params = this._params || params;

            if (this.$element == null)
            {
                var html:string = TemplateFactory.createTemplate(type, params);
                if (html)
                {
                    this.$element = jQuery(html);
                }
                else
                {
                    this.$element = jQuery("<" + type + "/>", params);
                }
            }

            this.element = this.$element[0];

            return this;
        }

        /**
         * @overridden DisplayObjectContainer.addChild
         * @example
         container.addChild(domElementInstance);
         * @method addChild
         * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        public addChild(child:DOMElement):any
        {
            super.addChild(child);

            if (this.$element == null)
            {
                throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
            }

            if (child.isCreated === false)
            {
                child.createChildren();// Render the item before adding to the DOM
                child.isCreated = true;
            }

            // Adds the cid to the DOM element so we can know what what Class object the element belongs too.
            child.$element.attr('data-cid', child.cid);

            // If the child object is not a reference of a jQuery object in the DOM then append it.
            if (child._isReference === false)
            {
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);
                this.$element.append(child.$element);
            }

            child.enable();
            child.layoutChildren();

            return this;
        }

        /**
         * Gets called when the child object is added to the DOM.
         * The method will call {{#crossLink "DOMElement/layoutChildren:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED event.
         *
         * @method onDomAdded
         * @param event {JQueryEventObject}
         * @private
         */
        private onAddedToDom(event:JQueryEventObject)
        {
            var child:DOMElement = event.data;
            child.$element.removeEventListener('DOMNodeInsertedIntoDocument', this.onAddedToDom, this);
            child.layoutChildren();
            child.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }

        /**
         * @overridden DisplayObjectContainer.addChildAt
         */
        public addChildAt(child:DOMElement, index:number):any
        {
            var children = this.$element.children();
            var length = children.length;

            // If the index passed in is less than 0 and greater than
            // the total number of children then place the item at the end.
            if (index < 0 || index >= length)
            {
                this.addChild(child);
            }
            // Else get the child in the children array by the
            // index passed in and place the item before that child.
            else
            {
                if (child.isCreated === false)
                {
                    child.createChildren();// Render the item before adding to the DOM
                    child.isCreated = true;
                }

                // Adds the cid to the DOM element so we can know what what Class object the element belongs too.
                child.$element.attr('data-cid', child.cid);
                child.$element.addEventListener('DOMNodeInsertedIntoDocument', child, this.onAddedToDom, this);

                // Adds the child at a specific index but also will remove the child from another parent object if one exists.
                super.addChildAt(child, index);

                // Adds the child before the a child already in the DOM.
                jQuery(children.get(index)).before(child.$element);

                child.enable();
                child.layoutChildren();
            }

            return this;
        }

        /**
         * @overridden DisplayObjectContainer.swapChildren
         */
        public swapChildren(child1:DOMElement, child2:DOMElement):any
        {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();

            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);

            return this;
        }

        /**
         * @overridden DisplayObjectContainer.getChildAt
         */
        public getChildAt(index:number):DOMElement
        {
            return <DOMElement>super.getChildAt(index);
        }

        /**
         * Returns a DOMElement object with the first found DOM element by the passed in selector.
         *
         * @method getChild
         * @param selector {string} DOM id name, DOM class name or a DOM tag name.
         * @returns {DOMElement}
         * @public
         */
        public getChild(selector:string):DOMElement
        {
            // Get the first match from the selector passed in.
            var jQueryElement:JQuery = this.$element.find(selector).first();
            if (jQueryElement.length == 0)
            {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }

            // Check to see if there the element already has a cid value and is a child of this parent object.
            var cid:number = jQueryElement.data('cid');
            var domElement:DOMElement = <DOMElement>this.getChildByCid(cid);

            // Creates a DOMElement from the jQueryElement.
            if (domElement == null)
            {
                // Create a new DOMElement and assign the jQuery element to it.
                domElement = new DOMElement();
                domElement.$element = jQueryElement;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = jQueryElement[0];
                domElement.isCreated = true;

                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                super.addChild(domElement);
            }

            return domElement;
        }

        /**
         * Gets all the HTML elements children of this object.
         *
         * @method getChildren
         * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children this parent element.
         * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
         * If the 'data-cid' property exists is on an HTML element a DOMElement will not be create for that element because it will be assumed it already exists as a DOMElement.
         * @public
         */
        public getChildren(selector:string = ''):DOMElement[]
        {
            //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
            var $child:JQuery;
            var domElement:DOMElement;
            var $list:JQuery = this.$element.children(selector);

            var listLength:number = $list.length;
            for (var i:number = 0; i < listLength; i++)
            {
                $child = jQuery($list[i]);

                // If the jQuery element already has cid data property then must be an existing DisplayObjectContainer (DOMElement) in the children array.
                if (!$child.data('cid'))
                {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    domElement.$element.attr('data-cid', domElement.cid);
                    domElement.element = $child.get(0);
                    domElement.isCreated = true;

                    // Added to the super addChild method because we don't need to append the element to the DOM.
                    // At this point it already exists and we are just getting a reference to the DOM element.
                    super.addChild(domElement);
                }
            }

            return <DOMElement[]>this.children;
        }

        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DOMElement} The DisplayObjectContainer instance to remove.
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public removeChild(child:DOMElement):any
        {
            child.$element.unbind();
            child.$element.remove();

            super.removeChild(child);

            return this;
        }

        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        public removeChildren():any
        {
            super.removeChildren();

            this.$element.empty();

            return this;
        }

        /**
         * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent)
         * to 1 (fully opaque). The default value is 1. Display objects with alpha set to 0 are active, even though
         * they are invisible.
         *
         * @method alpha
         * @param number
         * @returns {DOMElement} Returns an instance of itself.
         * @chainable
         */
        public alpha(number):any
        {
            this.$element.css('opacity', number);
            return this;
        }

        /**
         *
         * @method visible
         * @param value
         * @returns {any}
         */
        public visible(value:boolean):any
        {
            if (value == false)
            {
                this._isVisible = false;
                this.$element.hide();
            }
            else if (value == true)
            {
                this._isVisible = true;
                this.$element.show();
            }
            else if (value == undefined)
            {
                return this._isVisible;
            }
            return this;
        }

        /**
         * @overridden DisplayObjectContainer.destroy
         */
        public destroy():void
        {
            super.destroy();

            this.$element = null;
            this.element = null;
        }

    }
}