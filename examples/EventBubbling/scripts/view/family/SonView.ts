///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/native/MouseEvents.ts'/>

/**
 * YUIDoc_comment
 *
 * @class SonView
 * @constructor
 **/
class SonView extends DOMElement {

    public CLASS_NAME:string = 'SonView';

    private _childrenContainer:DOMElement = null;
    private _dispatchButton:DOMElement = null;
    private _sonMessage:DOMElement = null;

    constructor() {
        super();
    }

    /**
     * @overridden DisplayObject.createChildren
     */
    public createChildren():void {
        super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

        this._childrenContainer = this.getChild('.js-childrenArea');

        this._dispatchButton = new DOMElement('button', {'class': 'button_dispatch', text: 'Dispatch Event'});
        this._childrenContainer.addChild(this._dispatchButton);

        this._sonMessage = this.getChild('.js-message');
    }

    /**
     * @overridden DisplayObject.layoutChildren
     */
    public layoutChildren():void {
        this._sonMessage.$element.css('opacity', 0);
    }

    /**
     * @overridden DisplayObject.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

        this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._dispatchButton.$element.addEventListener(MouseEvents.CLICK, this.onButtonClick, this);

        super.enable();
    }

    /**
     * @overridden DisplayObject.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

        this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._dispatchButton.$element.removeEventListener(MouseEvents.CLICK, this.onButtonClick, this);

        super.disable();
    }

    /**
     * @overridden DisplayObject.destroy
     */
    public destroy():void {
        this._dispatchButton.destroy();
        this._dispatchButton = null;

        this._childrenContainer.destroy();
        this._childrenContainer = null;

        super.destroy();
    }

    private onButtonClick(event:JQueryEventObject):void {
        event.preventDefault();

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
    }

    private onBubbled(event:BaseEvent):void {
        var checkbox:boolean = this._childrenContainer.$element.find('[type=checkbox]')
                                                          .first()
                                                          .prop('checked');

        if (checkbox == true) {
            event.stopPropagation();
        }

        this._sonMessage.$element.css('opacity', 1);
    }

}