///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{

    import DOMElement = StructureTS.DOMElement;

    /**
     * YUIDoc_comment
     *
     * @class Level1
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class Level1 extends DOMElement
    {
        /**
         * YUIDoc_comment
         *
         * @property _$display
         * @type {JQuery}
         * @private
         */
        private _$display:JQuery = null;

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

            this._$display = this.$element.children('.js-display');
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
            this._$display.text('isEnabled ' + this.isEnabled);
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
            this.layoutChildren();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
            this.layoutChildren();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();
        }

    }
}