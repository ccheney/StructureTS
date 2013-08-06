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

///<reference path='BaseController.ts'/>
///<reference path='../utils/BrowserUtils.ts'/>

/**
 * The RouterController...
 *
 * @class RouterController
 * @module StructureTS
 * @submodule controller
 * @constructor
 **/
class RouterController extends BaseController
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'RouterController';

    constructor()
    {
        super();
    }

    public addRoute(pattern:string, handler:Function, scope:any, priority?:number):void
    {
        crossroads.addRoute(pattern, handler.bind(scope), priority);
    }

    public start():void
    {
//        crossroads.routed.add(console.log, console); //log all routes
//        hasher.prependHash = '!/'; //default value is "/"
        hasher.initialized.add(this.parseHash); //parse initial hash
        hasher.changed.add(this.parseHash); //parse hash changes
        hasher.init(); //start listening for hash changes
    }

    public parseHash(newHash, oldHash):void
    {
        console.log('parseHash', newHash);
        // second parameter of crossroads.parse() is the "defaultArguments" and should be an array
        // so we ignore the "oldHash" argument to avoid issues.
        crossroads.parse(newHash);
    }

    public navigateTo(hash:string):void
    {
        hash = hash.replace('#/', '');
        hasher.setHash(hash);

        console.log("hasher.getHash()", hasher.getHash())
    }

}