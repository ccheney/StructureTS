///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='../components/DeviceButton.ts'/>

module codeBelt
{

    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class DeviceView
     * @extends DOMElement
     * @module display
     * @constructor
     **/
    export class DeviceView extends DOMElement
    {
        /**
         * @overridden DOMElement.CLASS_NAME
         */
        public CLASS_NAME:string = 'DeviceView';

        /**
         * YUIDoc_comment
         *
         * @property _redButton
         * @type {DeviceButton}
         * @private
         */
        private _redButton:DeviceButton = null;

        /**
         * YUIDoc_comment
         *
         * @property _greenButton
         * @type {DeviceButton}
         * @private
         */
        private _greenButton:DeviceButton = null;

        /**
         * YUIDoc_comment
         *
         * @property _yellowButton
         * @type {DeviceButton}
         * @private
         */
        private _yellowButton:DeviceButton = null;

        /**
         * YUIDoc_comment
         *
         * @property _blueButton
         * @type {DeviceButton}
         * @private
         */
        private _blueButton:DeviceButton = null;

        /**
         * YUIDoc_comment
         *
         * @property _centerDisplay
         * @type {DOMElement}
         * @private
         */
        private _centerDisplay:DOMElement = null;

        /**
         * YUIDoc_comment
         *
         * @property _buttonList
         * @type {DeviceButton[]}
         * @private
         */
        private _buttonList:DeviceButton[] = null;

        constructor($element:JQuery)
        {
            super($element);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._buttonList = [];

            this._blueButton = new DeviceButton('blue', 2);
            this.addChild(this._blueButton);

            this._redButton = new DeviceButton('red', 0);
            this.addChildAt(this._redButton, 0);

            this._greenButton = new DeviceButton('green', 1);
            this.addChild(this._greenButton);

            this._yellowButton = new DeviceButton('yellow', 3);
            this.addChild(this._yellowButton);

            this.swapChildren(this._blueButton, this._greenButton);

            this._buttonList.push(this._redButton);
            this._buttonList.push(this._greenButton)
            this._buttonList.push(this._blueButton);
            this._buttonList.push(this._yellowButton);

            this._centerDisplay = new DOMElement('div', {'class': 'display'});
            this.addChild(this._centerDisplay);
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
            // Layout or update the child objects in this parent class.
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._redButton.enable();
            this._greenButton.enable();
            this._blueButton.enable();
            this._yellowButton.enable();

            this._centerDisplay.$element.addEventListener('click', this.onClick, this);

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._redButton.disable();
            this._greenButton.disable();
            this._blueButton.disable();
            this._yellowButton.disable();

            this._centerDisplay.$element.removeEventListener('click', this.onClick, this);

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

        }

        /**
         * YUIDoc_comment
         *
         * @method animateButton
         * @public
         */
        public animateButton(buttonIdex:number):void {
            var deviceButton:DeviceButton = this._buttonList[buttonIdex];
            deviceButton.animate();
        }

        /**
         * YUIDoc_comment
         *
         * @method onClick
         * @private
         */
        private onClick(event:JQueryEventObject):void {
            console.log("event", event);
        }

    }
}