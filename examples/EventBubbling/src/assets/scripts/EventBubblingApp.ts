///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='view/GrandparentView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import MouseEvents = StructureTS.MouseEvents;
    import BaseEvent = StructureTS.BaseEvent;
    import Stage = StructureTS.Stage;

    /**
     *
     * @class EventBubblingApp
     * @extends Stage
     * @module codeBelt
     * @constructor
     **/
    export class EventBubblingApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'EventBubblingApp';

        private _grandpaView:GrandparentView = null;
        private _clearButton:DOMElement = null;
        private _stageMessage:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._grandpaView = new GrandparentView();
            this.addChild(this._grandpaView);

            this._clearButton = this.getChild('#js-clearButton');
            this._stageMessage = this.getChild('.js-message');
        }

        /**
         * @overridden Stage.layoutChildren
         */
        public layoutChildren():void
        {
            this._stageMessage.$element.css('opacity', 0);
            this._grandpaView.layoutChildren();
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.addEventListener(MouseEvents.CLICK, this.onClearClick, this);
            this._grandpaView.enable();

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.removeEventListener(MouseEvents.CLICK, this.onClearClick, this);
            this._grandpaView.disable();

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._grandpaView.destroy();
            this._grandpaView = null;

            this._clearButton.destroy();
            this._clearButton = null;

            this._stageMessage.destroy();
            this._stageMessage = null;
        }

        private onClearClick(event:JQueryEventObject):void
        {
            this.layoutChildren();
        }

        private onBubbled(event:BaseEvent):void
        {
            this._stageMessage.$element.css('opacity', 1);
        }

    }
}