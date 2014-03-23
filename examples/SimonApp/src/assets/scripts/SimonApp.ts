///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/util/Timer.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/TimerEvent.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

///<reference path='view/DeviceView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;
    import Timer = StructureTS.Timer;
    import TimerEvent = StructureTS.TimerEvent;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     *
     * @class SimonApp
     * @extends Stage
     * @constructor
     **/
    export class SimonApp extends Stage
    {
        /**
         * @overridden Stage.CLASS_NAME
         */
        public CLASS_NAME:string = 'SimonApp';

        /**
         * YUIDoc_comment
         *
         * @property _levels
         * @type {DeviceView}
         * @private
         */
        private _deviceView:DeviceView = null;

        /**
         * YUIDoc_comment
         *
         * @property _timer
         * @type {Timer}
         * @private
         */
        private _timer:Timer = null;

        /**
         * YUIDoc_comment
         *
         * @property _memoryOrder
         * @type {number[]}
         * @private
         */
        private _memoryOrder:number[] = null;

        /**
         * YUIDoc_comment
         *
         * @property _userSequence
         * @type {number[]}
         * @private
         */
        private _userSequence:number[] = null;

        /**
         * YUIDoc_comment
         *
         * @property _centerDisplay
         * @type {DOMElement}
         * @private
         */
        private _centerDisplay:DOMElement = null;

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

            var $device:JQuery = this.$element.children('.js-simon');

            this._deviceView = new DeviceView($device);
            this.addChild(this._deviceView);

            this._centerDisplay = new DOMElement('div', {'class': 'display'});
            this._deviceView.addChild(this._centerDisplay);
        }

        /**
         * @overridden Stage.layoutChildren
         */
        public layoutChildren():void
        {
            if (this._deviceView.isEnabled === true) {
                this._centerDisplay.$element.text('Go!');
            } else {
                this._centerDisplay.$element.text('Start!');
            }
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._deviceView.addEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.addEventListener('click', this.onClick, this);

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._deviceView.removeEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.removeEventListener('click', this.onClick, this);

            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();
        }

        /**
         * YUIDoc_comment
         *
         * @method onTimer
         * @private
         */
        private onTimer(event:TimerEvent):void {
            var timer:Timer = event.target;

            var currentIndex:number = (this._memoryOrder.length - 1) - timer.getCurrentCount();
            var showItem:number = this._memoryOrder[currentIndex];
            this._deviceView.animateButton(showItem);
        }

        /**
         * YUIDoc_comment
         *
         * @method onTimerComplete
         * @private
         */
        private onTimerComplete(event:TimerEvent):void {
            this._timer.destroy();

            this._deviceView.enable();
            this.layoutChildren();
        }

        /**
         * YUIDoc_comment
         *
         * @method onColorButtonClick
         * @private
         */
        private onColorButtonClick(event:BaseEvent):void {
            console.log("event", event.data);

            this._userSequence.push(event.data);

            if (this._userSequence.length === this._memoryOrder.length) {
                var isMatch:boolean = this._userSequence.toString() === this._memoryOrder.toString();
                if (isMatch) {
                    alert('You did it!');
                } else {
                    alert('Nope, you did not get it.');
                }
                this._userSequence = [];
                this._deviceView.disable();
                this.layoutChildren();
            }
        }

        /**
         * YUIDoc_comment
         *
         * @method onClick
         * @private
         */
        private onClick(event:JQueryEventObject):void {
            this._centerDisplay.$element.text('');

            this._memoryOrder = [0,2,3,1,2,2];
            this._userSequence = [];

            this._timer =  new Timer(1500, this._memoryOrder.length);
            this._timer.addEventListener(TimerEvent.TIMER, this.onTimer, this);
            this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this._timer.start();
        }


    }
}