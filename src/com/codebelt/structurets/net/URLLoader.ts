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
///<reference path='../events/LoaderEvent.ts'/>
///<reference path='URLRequest.ts'/>
///<reference path='URLLoaderDataFormat.ts'/>

/**
 * The URLLoader...
 *
 * @class URLLoader
 * @module StructureTS
 * @submodule net
 * @constructor
 **/
class URLLoader extends EventDispatcher{

    public data:any = null;
    public dataFormat:string = URLLoaderDataFormat.TEXT;
    public ready:boolean = false;

    constructor(request:URLRequest=null)
    {
        super();

        if (request) {
            this.load(request);
        }
    }

    public load(request:URLRequest):void
    {
        this.ready = false;
        var self:URLLoader = this;

        jQuery.ajax({
           type: request.method,
           url: request.url,
           data: request.data,
           contentType: request.contentType,
           dataType: self.dataFormat,
           beforeSend: self.onBeforeSend.bind(this),
           success: self.onLoadSuccess.bind(this),
           error: self.onLoadError.bind(this),
           complete: self.onComplete.bind(this)
         });
    }

    public onLoadSuccess():void
    {
        //console.log("onLoadSuccess", arguments);
    }

    public onBeforeSend():void
    {
        //console.log("onBeforeSend", arguments);
    }
    public onLoadError():void
    {
        console.log("[URLLoader] - onLoadError", arguments);
    }
    public onComplete(data):void
    {
        this.ready = true;
//        console.log("[URLLoader] - onComplete", data);
        this.data = data.responseText;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    }

}