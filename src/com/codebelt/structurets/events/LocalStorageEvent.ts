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

///<reference path='BaseEvent.ts'/>

/**
 * The LocalStorageEvent ....
 * Note: the event only dispatches in other browser windows and does not show up in the window where you made a change to the local storage.
 *
 * @class LocalStorageEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObject"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param nativeEvent {StorageEvent} The native browser event for localStorage.
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class LocalStorageEvent extends BaseEvent
{
    /**
     * @copy ValueObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'LocalStorageEvent';

    /**
     * The storage event is fired on a Document's Window object when a storage area changes.
     *
     * @event STORAGE
     * @type {string}
     * @static
     */
    public static STORAGE:string = 'storage';

    /**
     * The named key that was added, removed, or modified
     *
     * @event key
     * @type {string}
     */
    public key:string;

    /**
     * The previous value (now overwritten), or null if a new item was added
     *
     * @event oldValue
     * @type {string}
     */
    public oldValue:string;

    /**
     * The new value, or null if an item was removed
     *
     * @event newValue
     * @type {string}
     */
    public newValue:string;

    /**
     * The page which called a method that triggered this change
     *
     * @event key
     * @type {string}
     */
    public url:string;


    constructor(type:string, bubbles:boolean, cancelable:boolean, nativeEvent:StorageEvent)
    {
        super(type, bubbles, cancelable, nativeEvent);

        if (nativeEvent)
        {
            this.key = nativeEvent.key;
            this.oldValue = nativeEvent.oldValue;
            this.newValue = nativeEvent.newValue;
            this.url = nativeEvent.url;
        }
    }

}