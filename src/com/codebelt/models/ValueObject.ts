///<reference path='../interfaces/ICore.ts'/>
///<reference path='../BaseObject.ts'/>

/**
 * The ValueObject...
 *
 * @class ValueObject
 * @constructor
 **/
class ValueObject extends BaseObject implements ICore {

    public CLASS_NAME:string = 'ValueObject';

    public id:string;

    constructor()
    {
        super();
    }

    public toJsonString()
    {
        return JSON.stringify(this);
    }

    public toJSON()
    {
        return JSON.parse( JSON.stringify(this) );//TODO: don't stringify, make and deep clone.
    }

    public clone()
    {
        //TODO: deep clone object.
    }

    public copy(data) {
        for (var key in this) {
            if (key !== 'id' && this.hasOwnProperty(key) && data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    public set(prop:any, value?:any):any
    {
        if (!prop) throw new Error('You must pass a argument into the set method.')

        if (typeof(prop) === "object")
        {
            for(var key in prop)
            {
                this[key] = prop[key];
            }
        }
        else if (typeof(prop) === "string")
        {
            this[prop] = value;
        }

        console.log("Event.change, todo: make it dispatch event?");
        return this;
    }

    public get(prop:string):any
    {
        if (!prop) return this;
        return this[prop];
    }

}