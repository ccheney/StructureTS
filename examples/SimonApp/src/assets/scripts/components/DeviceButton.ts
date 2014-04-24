///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../../src/com/codebelt/structurets/event/BaseEvent.ts'/>

module codeBelt
{

    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * YUIDoc_comment
     *
     * @class DeviceButton
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class DeviceButton extends DOMElement
    {
        /**
         * @overridden DOMElement.CLASS_NAME
         */
        public CLASS_NAME:string = 'DeviceButton';

        /**
         * YUIDoc_comment
         *
         * @property indexId
         * @type {number}
         * @public
         */
        public indexId:number = null;

        constructor(color:string, index)
        {
            super('templates/DeviceButtonTemplate.hbs', {buttonColor: color});

            this.indexId = index;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            // Create and add your child objects to this parent class.
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

            this.$element.addEventListener('click', this.onClick, this);
            this.$element.css('cursor','pointer');

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.$element.removeEventListener('click', this.onClick, this);
            this.$element.css('cursor','default');

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            // Destroy the child objects and references in this parent class to prevent memory leaks.
        }

        /**
         * YUIDoc_comment
         *
         * @method animate
         * @public
         */
        public animate():void {
            this.$element.addClass('active');
            setTimeout(() => {
                this.$element.removeClass('active');
            }, 250);
        }

        /**
         * YUIDoc_comment
         *
         * @method onClick
         * @private
         */
        private onClick(event:JQueryEventObject):void {
            this.animate();
            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, this.indexId));
        }

    }
}