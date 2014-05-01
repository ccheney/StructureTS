///<reference path='Level2.ts'/>

module codeBelt
{

    /**
     * YUIDoc_comment
     *
     * @class Level1
     * @extends Level2
     * @module codeBelt
     * @constructor
     **/
    export class Level3 extends Level2
    {
        /**
         * YUIDoc_comment
         *
         * @property _$yellow
         * @type {JQuery}
         * @private
         */
        private _$yellow:JQuery = null;

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

            this._$yellow = this.$element.children('.yellow');
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

            this._$yellow.addEventListener('click', this.onClickYellow, this);

            super.enable();
        }

        /**
         * @overridden Level1.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$yellow.removeEventListener('click', this.onClickYellow, this);

            super.disable();
        }

        /**
         * @overridden Level1.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._$yellow = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method onClickYellow
         * @private
         */
        private onClickYellow(event:JQueryEventObject):void {
            this._$yellow.toggleClass('active');
        }

    }
}