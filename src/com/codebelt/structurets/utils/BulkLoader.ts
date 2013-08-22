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

///<reference path='../interfaces/IDataStore.ts'/>
///<reference path='../events/EventDispatcher.ts'/>
///<reference path='../events/LoaderEvent.ts'/>

/**
 * The BulkLoader...
 *
 * @class BulkLoader
 * @module StructureTS
 * @submodule util
 * @constructor
 **/
class BulkLoader extends EventDispatcher
{
    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'BulkLoader';

    private static _instance:BulkLoader;
    public _dataStores:IDataStore[] = [];

    constructor()
    {
        super();

        this.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
    }

    public static getInstance():BulkLoader
    {
        if (this._instance == null)
        {
            this._instance = new BulkLoader();
        }
        return this._instance;
    }

    public addFile(dataStore:IDataStore, key:string):void
    {
        this._dataStores[key] = dataStore;
    }

    public getFile(key:string):IDataStore
    {
        return this._dataStores[key];
    }

    public getImage(key:string):HTMLImageElement
    {
        return this._dataStores[key].data;
    }

    public getHtmlTemplate(key:string, templateId:string):string
    {
        //TODO: check if you need to change this to user the TemplateFactory
        console.log(this.getQualifiedClassName(),'TODO: check if you need to change this to user the TemplateFactory')
        var rawHtml:string = jQuery(this._dataStores[key].data).filter("#" + templateId).html();
        return rawHtml;
    }

    public load():void
    {
        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }
    }

    private onLoadComplete(event:LoaderEvent):void
    {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);

        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            if (!dataStore.complete)
            {
                return;
            }
        }

        this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE));
    }
}
