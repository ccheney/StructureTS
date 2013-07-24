///<reference path=''/>

class XML {

    /**
     * @copy BaseObject.CLASS_NAME
     */
    public CLASS_NAME:string = 'XML';

    constructor() {

    }

    public static parse(xml):string
    {
        var dom:string = null;

        if (window.DOMParser)
        {
            try {
                dom = (new DOMParser()).parseFromString(xml, "text/xml");
            }
            catch (e) {
                dom = null;
            }
        }
        else if (window.ActiveXObject)
        {
            try {
                dom = new ActiveXObject('Microsoft.XMLDOM');
                dom.async = false;
                if (!dom.loadXML(xml)){
                    // parse error ..
                    throw new Error(dom.parseError.reason + dom.parseError.srcText);
                }
            }
            catch (err) {
                dom = null;
            }
        }
        else {
            throw new Error("XML has an issue parsing xml string with dom parser");
        }
        return dom;
    }

    public static toJSON()
    {
    }

    public static fromJSON()
    {
    }

}