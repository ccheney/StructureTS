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

///<reference path='../display/DOMElement.ts'/>
///<reference path='../util/StringUtil.ts'/>

module StructureTS
{
    /**
     * YUIDoc_comment
     *
     * @class TemplateFactory
     * @module StructureTS
     * @submodule util
     * @constructor
     * @version 0.1.0
     **/
    export class TemplateFactory
    {
        /**
         * @overridden BaseObject.CLASS_NAME
         */
        public static CLASS_NAME:string = 'TemplateFactory';

        public static UNDERSCORE:string = 'underscore';
        public static HANDLEBARS:string = 'handlebars';

        public static templateEngine:string = TemplateFactory.HANDLEBARS;
        public static templateNamespace:string = 'JST';

        constructor()
        {
        }

        public static createTemplate(templatePath:string, data:Object = null):string
        {
            return TemplateFactory.create(templatePath, data);
        }

        public static createView(templatePath:string, data:Object = null):DOMElement
        {
            var template:string = TemplateFactory.create(templatePath, data);

            var view:DOMElement = new DOMElement();
            view.$element = jQuery(template);
            return view;
        }

        private static create(templatePath:string, data:Object = null):string
        {
            //Checks the first charactor to see if it is a "." or "#".
            var regex = /^([.#])(.+)/;
            var template:string = null;
            var isClassOrIdName:boolean = regex.test(templatePath);

            if (isClassOrIdName)
            {
                var htmlString:string = jQuery(templatePath).html();
                htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);

                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE)
                {
                    // Underscore Template:
                    var templateMethod:Function = _.template(htmlString);
                    template = templateMethod(data);
                }
                else
                {
                    // Handlebars Template
                    var templateMethod:Function = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            }
            else
            {
                var templateObj:Object = window[TemplateFactory.templateNamespace];
                if (!templateObj)
                {
                    // Returns null because the template namespace is not found.
                    return null;
                }

                var templateFunction:Function = templateObj[templatePath];
                if (templateFunction)
                {
                    // The templatePath gets a function storage in the associative array.
                    // We call the function by passing in the data as the argument.
                    template = templateFunction(data);
                }
            }

            return template;
        }

    }
}