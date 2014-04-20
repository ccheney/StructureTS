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

            this._blueButton = new DeviceButton('blue', 0);
            this.addChild(this._blueButton);
            this._buttonList.push(this._blueButton);

            this._redButton = new DeviceButton('red', 1);
            this.addChildAt(this._redButton, 0);
            this._buttonList.push(this._redButton);

            this._greenButton = new DeviceButton('green', 2);
            this.addChild(this._greenButton);
            this._buttonList.push(this._greenButton);

            this._yellowButton = new DeviceButton('yellow', 3);
            this.addChild(this._yellowButton);
            this._buttonList.push(this._yellowButton);


            this.swapChildren(this._blueButton, this._greenButton);

            console.log("le", this.numChildren);
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

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._redButton.destroy();
            this._redButton = null;

            this._greenButton.destroy();
            this._greenButton = null;

            this._blueButton.destroy();
            this._blueButton = null;

            this._yellowButton.destroy();
            this._yellowButton = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method animateButton
         * @public
         */
        public animateButton(buttonIndex:number):void {
            var deviceButton:DeviceButton = this._buttonList[buttonIndex];
            deviceButton.animate();
        }

    }
}