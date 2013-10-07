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

///<reference path='../interface/ICollection.ts'/>
///<reference path='../model/ValueObject.ts'/>
///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class Collection
 * @extends EventDispatcher
 * @module StructureTS
 * @submodule model
 * @constructor
 **/
class Collection extends EventDispatcher implements ICollection
{
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'Collection';

    /**
     * YUIDoc_comment
     *
     * @property items
     * @type {array}
     * @readOnly
     */
    public items:IValueObject[] = [];

    /**
     * YUIDoc_comment
     *
     * @property length
     * @type {init}
     * @default 0
     * @readOnly
     * @public
     */
    public length:number = 0;

    constructor()
    {
        super();
    }

    /**
     * Add an item to the current collection
     * Requires that the item must be an instance of {{#crossLink "IValueObject"}}{{/crossLink}} or extends the {{#crossLink "ValueObject"}}{{/crossLink}} class.
     *
     * @method addItem
     * @param item {IValueObject} The item or {{#crossLink "ValueObject"}}{{/crossLink}} to add.
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public addItem(item:IValueObject, silent:boolean = false):void
    {
        if (!(item instanceof ValueObject))
        {
            throw new TypeError('['+this.getQualifiedClassName()+'] Item must be of the IValueObject type');
        }

        if (!this.hasItem(item))
        {
            this.items.push(item);
            this.length = this.items.length;
        }

        if (!silent)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    }

    /**
     * Removes an item from the collection, maintaining its current sort
     * If the collection doesn't have the item, it throws an error
     *
     * @method removeItem
     * @param item {IValueObject} Item to remove
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */

    public removeItem(item:IValueObject, silent:boolean = false):void
    {
        if (!(item instanceof ValueObject))
        {
            throw new TypeError('['+this.getQualifiedClassName()+'] Item must be of the IValueObject type');
        }

        if (!this.hasItem(item))
        {
            throw new Error('['+this.getQualifiedClassName()+'] Collection does not have item ' + item);
        }

        this.items.splice(this.items.indexOf(item), 1);
        this.length = this.items.length;

        if (!silent)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    }

    /**
     * Removes an array of items from the collection
     *
     * @method removeItems
     * @param items {IValueObject[]} List of items to add to the current collection
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public removeItems(items:IValueObject[], silent:boolean = false):void
    {
        var len:number = items.length;
        for (var i = 0; i < len; i++)
        {
            this.removeItem(items[i]);
        }

        if (!silent)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }
    }

    /**
     * Checks if a collection has an item.
     *
     * @method hasItem
     * @param item {IValueObject} Item to check
     * @return {boolean}
     * @public
     */
    public hasItem(items:IValueObject):boolean
    {
        return !this.items.indexOf(items);
    }

    /**
     * Returns the array index position of the value object.
     *
     * @method indexOf
     * @param item {IValueObject} IValueObject get the index of.
     * @return {boolean}
     * @public
     */
    public indexOf(items:IValueObject):number
    {
        return this.items.indexOf(items);
    }

    /**
     * Adds an array of items to the collection
     *
     * @method addItems
     * @param items {IValueObject[]} List of items to add to the current collection.
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     */
    public addItems(items:IValueObject[], silent:boolean = false):void
    {
        var len:number = items.length;
        for (var i = 0; i < len; i++)
        {
            this.addItem(items[i]);
        }

        if (!silent)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }
    }

    /**
     * Finds an object by an index value.
     * If the index is out of bounds, the collection will clamp it.
     *
     * @method getItemByIndex
     * @param index {init} The index integer of the item to get
     * @return {IValueObject} item to find
     * @public
     *
     */
    public getItemByIndex(index:number):IValueObject
    {
        if (index < 0)
        {
            index = 0;
        }

        if (index >= this.items.length)
        {
            index = this.items.length - 1;
        }

        // Return the item by the index. It will return null if the array is empty.
        return this.items[index] || null;
    }

    /**
     * Loops through each object in the collection and performs some function from it
     *
     * @method forEach
     * @param operation {Function} Operation to perform, provides 2 parameters element, and index
     * @public
     */
    public forEach(operation:any):void
    {
//        _.each(this.items, operation);
    }

    /**
     * Examines each element in a collection, returning an array of all elements that have the given properties.
     * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
     * @example
     *      // Finds all value object that has 'Robert' in it.
     *      this._collection.find("Robert");
     *      // Finds any value object that has 'Robert' or 'Heater' or 23 in it.
     *      this._collection.find(["Robert", "Heather", 32]);
     *
     *      // Finds all value objects that same key and value you are searching for.
     *      this._collection.find({ name: 'apple', organic: false, type: 'fruit' });
     *      this._collection.find([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
     *
     * @method find
     * @param arg {Object|Array}
     * @return {array} Returns a list of found IValueObject's.
     * @public
     */
    public find(arg:any):IValueObject[]
    {
        // If properties is not an array then make it an array object.
        arg = (arg instanceof Array) ? arg : [arg];

        var foundItems:IValueObject[] = [];
        var len = arg.length;
        var prop:any;
        for (var i:number = 0; i < len; i++)
        {
            prop = arg[i];
            // Adds found value object to the foundItems array.
            if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                // If the item is not an object.
                foundItems = foundItems.concat(this.findPropertyValue(prop));
            }
            else
            {
                // If the item is an object.
                foundItems = foundItems.concat(_.where(this.items, prop));
            }
        }

        // Removes all duplicated objects found in the temp array.
        return _.uniq(foundItems);
    }


    /**
     * Loops through all properties of an object and check to see if the value matches the argument passed in.
     *
     * @method findPropertyValue
     * @param arg {String|Number|Boolean>}
     * @return {array} Returns a list of found IValueObject's.
     * @private
     */
    private findPropertyValue(arg:any) {
        // If properties is not an array then make it an array object.
        arg = (arg instanceof Array) ? arg : [arg];

        var foundItems = [];
        var itemsLength = this.items.length;
        var itemsToFindLength = arg.length;
        // Loop through each value object in the collection.
        for (var i = 0; i < itemsLength; i++)
        {
            var valueObject = this.items[i];
            // Loop through each properties on the value object.
            for (var key in valueObject)
            {
                // Check if the key value is a property.
                if (valueObject.hasOwnProperty(key))
                {
                    var propertyValue = valueObject[key];
                    // Loop through each of the string value's to find a match in the value object.
                    for (var j = 0; j < itemsToFindLength; j++)
                    {
                        var value = arg[j];
                        // If the value object property equals the string value then keep a reference to that value object.
                        if (propertyValue === value)
                        {
                            // Add found value object to the foundItems array.
                            foundItems.push(valueObject);
                            break;
                        }
                    }
                }
            }
        }
        return foundItems;
    }

    /**
     * Sorts the collection based on the sort function provided
     *
     * @method sort
     * @param sort {Function} Sort to use, provides 2 users
     * @public
     */
        //TODO: figure out to set the type to Function with out getting error: Type '(x: IValueObject) => boolean' requires a call signature, but type 'Function' lacks one.
    public sort(sort:any):void
    {
//        this.items.sort(sort);
    }

    /**
     * Filters the collection based on the filter test operation provided
     *
     * @method filter
     * @param filter {Function} Operation to perform, provides 2 parameters element, and index

     * @public
     */
        //TODO: figure out to set the type to Function with out getting error: Type '(x: IValueObject) => boolean' requires a call signature, but type 'Function' lacks one.
    public filter(filter:any, removeItems:boolean = false):IValueObject[]
    {
        if (removeItems)
        {
//            _.filter(this.items, filter);
//            this.length = this.items.length;
//            return this.items;
        }
        else
        {
//            var collection:ICollection = this.copy();
//            collection.filter(filter, true);
//            _.filter(collection.items, filter);
//            return
        }
        return null;
    }

    /**
     * Applies a function to each of the items in the list
     *
     * @method map
     * @param {Function} map Operation to perform, provides 2 parameters element, and index
     */
    public map(map:any)
    {
//        this.items = _.map(this.items, map);
    }

//    /**
//     * YUIDoc_comment
//     *
//     * @method clone
//     * @public
//     */
//    public clone():void {
//
//    }

    /**
     * YUIDoc_comment
     *
     * @method copy
     * @public
     */
    public copy():ICollection
    {
        var collection:ICollection = new Collection();
        collection.addItems(this.items.slice(0));
        return collection;
    }

    /**
     * YUIDoc_comment
     *
     * @method clear
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     */
    public clear(silent:boolean = false):void
    {
        this.items = [];
        this.length = 0;

        if (!silent)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
        }
    }

    /**
     * @overridden BaseObject.destroy
     */
    public destroy():void
    {
        super.destroy();

        this.items = null;
        this.length = null;
    }

}