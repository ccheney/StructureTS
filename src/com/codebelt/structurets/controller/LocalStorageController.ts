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

///<reference path='../events/EventDispatcher.ts'/>

/**
 * The LocalStorageController...
 *
 * @class LocalStorageController
 * @module StructureTS
 * @constructor
 **/
class LocalStorageController extends EventDispatcher {

    /**
     * @copy EventDispatcher.CLASS_NAME
     */
    public CLASS_NAME:string = 'LocalStorageController';

    private static _instance:LocalStorageController = null;

    constructor()
    {
        super();
    }

    public static getInstance():LocalStorageController
    {
        if(this._instance == null) {
            this._instance = new LocalStorageController();
        }
        return this._instance;
    }

    public setItem(key:string, data:string):void
    {
        localStorage.setItem(key, data);
    }

    public getItem(key:string):string
    {
        return localStorage.getItem(key);
    }

    public removeItem(key:string):void
    {
        localStorage.removeItem(key);
    }

    public clear():void
    {
        localStorage.clear();
    }

}