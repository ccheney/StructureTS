///<reference path='Level1.ts'/>

module codeBelt
{
    /**
     * YUIDoc_comment
     *
     * @class Level2
     * @extends Level1
     * @module codeBelt
     * @constructor
     **/
    export class Level2 extends Level1
    {
        /**
         * YUIDoc_comment
         *
         * @property _$green
         * @type {JQuery}
         * @private
         */
        private _$green:JQuery = null;

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

            this._$green = this.$element.children('.green');
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

            this._$green.addEventListener('click', this.onClickGreen, this);

            super.enable();
        }

        /**
         * @overridden Level1.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$green.removeEventListener('click', this.onClickGreen, this);

            super.disable();
        }

        /**
         * @overridden Level1.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._$green = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method onClickGreen
         * @private
         */
        private onClickGreen(event:JQueryEventObject):void {
            this._$green.toggleClass('active');
        }

    }
}