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

///<reference path='ICore.ts'/>
///<reference path='../event/BaseEvent.ts'/>

module StructureTS
{
    /**
     * YUIDoc_comment
     *
     * @class IValueObject
     * @extends ICore
     * @module StructureTS
     * @submodule interface
     * @interface
     * @version 0.1.0
     **/
    export interface IEventDispatcher extends ICore
    {
        /**
         * @property parent
         */
        parent:any;

        /**
         * @method addEventListener
         */
        addEventListener(type:string, func:Function, scope:any, priority?:number):any;

        /**
         * @method removeEventListener
         */
        removeEventListener(type:string, func:Function, scope:any):any;

        /**
         * @method dispatchEvent
         */
        dispatchEvent(event:BaseEvent):any;

    }
}