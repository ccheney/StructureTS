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

///<reference path='../event/EventDispatcher.ts'/>

module StructureTS
{
    export class DisplayObjectContainer extends EventDispatcher
    {
        /**
         * The isCreated property is used to keep track if it is the first time this DisplayObjectContainer is created.
         *
         * @property isCreated
         * @type {boolean}
         * @default false
         * @protected
         */
        public isCreated:boolean = false;

        /**
         * Returns the number of children of this object.
         *
         * @property numChildren
         * @type {init}
         * @default 0
         * @readOnly
         * @public
         */
        public numChildren:number = 0;

        /**
         * A reference to the child DisplayObjectContainer instances to this parent object instance.
         *
         * @property children
         * @type {array}
         * @readOnly
         * @public
         */
        public children:DisplayObjectContainer[] = [];

        /**
         * A property providing access to the width.
         *
         * @property width
         * @type {number}
         * @default 0
         * @public
         */
        public width:number = 0;

        /**
         * A property providing access to the height.
         *
         * @property height
         * @type {number}
         * @default 0
         * @public
         */
        public height:number = 0;

        /**
         * A property providing access to the unscaledWidth.
         *
         * @property unscaledWidth
         * @type {number}
         * @default 100
         * @public
         */
        public unscaledWidth:number = 100;

        /**
         * A property providing access to the unscaledHeight.
         *
         * @property unscaledHeight
         * @type {number}
         * @default 100
         * @public
         */
        public unscaledHeight:number = 100;

        /**
         * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
         *
         * @class DisplayObjectContainer
         * @extends EventDispatcher
         * @module StructureTS
         * @submodule view
         * @constructor
         * @version 0.1.1
         **/
        constructor()
        {
            super();
        }

        /**
         * The createChildren function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * @method createChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public createChildren():any
        {
            // Meant to be overridden because the extended class should call the createChildren method.
            return this;
        }

        /**
         * Adds a child DisplayObjectContainer instance to this parent object instance. The child is added to the front (top) of all other
         * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
         *
         * If you add a child object that already has a different parent, the object is removed from the child
         * list of the other parent object.
         *
         * @method addChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this DisplayObjectContainerContainer instance.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public addChild(child:DisplayObjectContainer):any
        {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent)
            {
                child.parent.removeChild(child);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        }

        /**
         * Adds a child DisplayObjectContainer instance to this DisplayObjectContainerContainer instance.
         * The child is added at the index position specified. An index of 0 represents the back
         * (bottom) of the display list for this DisplayObjectContainerContainer object.
         *
         * @method addChildAt
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this object instance.
         * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public addChildAt(child:DisplayObjectContainer, index:number):any
        {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent)
            {
                child.parent.removeChild(child);
            }

            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        }

        /**
         * Swaps two DisplayObjectContainer's with each other.
         *
         * @method swapChildren
         * @param child1 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @param child2 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public swapChildren(child1:DisplayObjectContainer, child2:DisplayObjectContainer):any
        {
            // Meant to be overridden because the extended class should call the addChildAt method.
            return this;
        }

        /**
         * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
         *
         * @method swapChildren
         * @param index1 {int} The index position of the first child object.
         * @param index2 {int} The index position of the second child object.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public swapChildrenAt(index1:number, index2:number):any
        {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren)
            {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }

            var child1:DisplayObjectContainer = this.getChildAt(index1);
            var child2:DisplayObjectContainer = this.getChildAt(index2);

            this.swapChildren(child1, child2);

            return this;
        }

        /**
         * Returns the index position of a child DisplayObjectContainer instance.
         *
         * @method getChildIndex
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to identify.
         * @returns {int} The index position of the child display object to identify.
         * @public
         */
        public getChildIndex(child:DisplayObjectContainer):number
        {
            return this.children.indexOf(child);
        }

        /**
         * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself. The search includes the entire display list including this DisplayObjectContainer instance.
         *
         * @method contains
         * @param child {DisplayObjectContainer} The child object to test.
         * @returns {boolean}  true if the child object is a child of the DisplayObjectContainer or the container itself; otherwise false.
         * @public
         */
        public contains(child:DisplayObjectContainer):boolean
        {
            return this.children.indexOf(child) >= 0;
        }

        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to remove.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public removeChild(child:DisplayObjectContainer):any
        {
            var index = this.getChildIndex(child);
            if (index !== -1)
            {
                this.children.splice(index, 1);
            }
            child.disable();
            child.parent = null;

            this.numChildren = this.children.length;

            return this;
        }

        /**
         * Removes all child DisplayObjectContainer instances from the child list of the DisplayObjectContainerContainer instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if
         * no other references to the children exist.
         *
         * @method removeChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public removeChildren():any
        {
            while (this.children.length > 0)
            {
                this.removeChild(<DisplayObjectContainer>this.children.pop());
            }

            this.numChildren = this.children.length;

            return this;
        }

        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @method getChildAt
         * @param index {int} The index position of the child object.
         * @returns {DisplayObjectContainer} The child display object at the specified index position.
         */
        public getChildAt(index:number):DisplayObjectContainer
        {
            return this.children[index];
        }

        /**
         * Gets a DisplayObjectContainer by its cid.
         *
         * @method getChildByCid
         * @param cid {number}
         * @returns {DisplayObjectContainer}
         * @override
         * @public
         */
        public getChildByCid(cid:number):DisplayObjectContainer
        {
            var children:DisplayObjectContainer[] = <DisplayObjectContainer[]>this.children.filter(function (child)
            {
                return child.cid == cid;
            });

            return children[0] || null;
        }

        /**
         * The setSize method sets the bounds within which the containing DisplayObjectContainer would
         * like that component to lay itself out. It is expected that calling setSize will automatically
         * call {{#crossLink "DisplayObjectContainer/layoutChildren:method"}}{{/crossLink}}.
         *
         * @param unscaledWidth {number} The width within which the component should lay itself out.
         * @param unscaledHeight {number} The height within which the component should lay itself out.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public setSize(unscaledWidth:number, unscaledHeight:number):any
        {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            if (this.isCreated)
            {
                this.layoutChildren();
            }

            return this;
        }

        /**
         * The layoutComponent method provides a common function to handle updating child objects.
         *
         * @method layoutChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        public layoutChildren():any
        {

            return this;
        }

        /**
         * @overridden EventDispatcher.destroy
         */
        public destroy():void
        {
            super.destroy();

            this.children = [];
            this.numChildren = 0;
        }

    }
}