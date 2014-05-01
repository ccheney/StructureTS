///<reference path='Level4.ts'/>

module codeBelt
{

    /**
     * YUIDoc_comment
     *
     * @class Level5
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class Level5 extends Level4
    {
        /**
         * YUIDoc_comment
         *
         * @property _$red
         * @type {JQuery}
         * @private
         */
        private _$red:JQuery = null;

        constructor($element:JQuery)
        {
            super($element);
        }

        /**
         * @overridden Level1.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._$red = this.$element.children('.red');
        }

        /**
         * @overridden Level1.layoutChildren
         */
        public layoutChildren():void
        {
            super.layoutChildren();
        }

        /**
         * @overridden Level1.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._$red.addEventListener('click', this.onClickRed, this);

            super.enable();
        }

        /**
         * @overridden Level1.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$red.removeEventListener('click', this.onClickRed, this);

            super.disable();
        }

        /**
         * @overridden Level1.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._$red = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method onClickRed
         * @private
         */
        private onClickRed(event:JQueryEventObject):void {
            this._$red.toggleClass('active');
        }

    }
}