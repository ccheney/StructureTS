///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='ChildView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class ParentView
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class ParentView extends DOMElement
    {
        private _panelContainer:DOMElement = null;
        private _childView:ChildView = null;
        private _parentMessage:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

            this._panelContainer = this.getChild('.js-panelContent');

            this._childView = new ChildView();
            this._panelContainer.addChild(this._childView);

            this._parentMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
            this._parentMessage.$element.css('opacity', 0);
            this._childView.layoutChildren();
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.enable();

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._childView.disable();

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._childView.destroy();
            this._childView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        }

        private onBubbled(event:BaseEvent):void
        {
            var checkbox:boolean = this._panelContainer.$element.find('[type=checkbox]')
                                                                .first()
                                                                .prop('checked');

            if (checkbox == true)
            {
                event.stopPropagation();
            }

            this._parentMessage.$element.css('opacity', 1);
        }

    }
}