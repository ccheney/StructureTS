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
 * The RouterEvent...
 *
 * @class RouterEvent
 * @extends BaseEvent
 * @module StructureTS
 * @submodule event
 * @constructor
 **/
class RouterEvent extends BaseEvent
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'RouterEvent';

    /**
     * YUIDoc_comment
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = 'RouterEvent.change';

    /**
     * YUIDoc_comment
     *
     * @property url
     * @type {string}
     * @public
     */
    public url:string = null;


    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, url:string = null, data:any = null)
    {
        super(type, bubbles, cancelable, data);

        this.url = url;
    }

}