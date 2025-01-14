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

///<reference path='../../interface/IViewController.ts'/>
///<reference path='../../display/DOMElement.ts'/>

module StructureTS
{
    export class BaseViewController extends DOMElement implements IViewController
    {
        /**
         * The BaseViewController...
         *
         * @class BaseViewController
         * @extends BaseController
         * @module StructureTS
         * @submodule controller
         * @constructor
         * @version 0.2.0
         **/
        constructor()
        {
            super();
        }

        /**
         * Allows you to update the view controller.
         *
         * @method update
         * @param ...rest {rest}
         * @returns {BaseViewController} Returns an instance of itself.
         * @public
         * @chainable
         */
        public update(...rest):any
        {

            return this;
        }

        /**
         * Sets the browser title.
         *
         * @method setPageTitle
         * @param title {string}
         * @returns {DOMElement} Returns an instance of itself.
         * @public
         * @chainable
         */
        public setPageTitle(title:string):any
        {
            document.title = title;

            return this;
        }

    }
}