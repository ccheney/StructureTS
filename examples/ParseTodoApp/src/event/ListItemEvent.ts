///<reference path='../../../../src/typescript/com/codebelt/events/BaseEvent.ts'/>

/**
 * YUIDoc_comment
 *
 * @class ListItemEvent
 * @extends BaseEvent
 * @constructor
 **/
class ListItemEvent extends BaseEvent {

    public CLASS_NAME:string = 'ListItemEvent';

    static LIST_SUCCESS:string = "ListItemEvent.listSuccess";
    static ADD_SUCCESS:string = "ListItemEvent.addSuccess";
    static REMOVE_SUCCESS:string = "ListItemEvent.removeSuccess";

    constructor(type:string, data:any=null)
    {
        super(type, data);
    }

}