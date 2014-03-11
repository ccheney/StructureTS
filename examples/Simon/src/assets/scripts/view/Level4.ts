///<reference path='Level3.ts'/>

module codeBelt
{

    /**
     * YUIDoc_comment
     *
     * @class Level4
     * @extends Level3
     * @module codeBelt
     * @constructor
     **/
    export class Level4 extends Level3
    {
        /**
         * @overridden Level3.CLASS_NAME
         */
        public CLASS_NAME:string = 'Level4';

        /**
         * YUIDoc_comment
         *
         * @property _$blue
         * @type {JQuery}
         * @private
         */
        private _$blue:JQuery = null;

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

            this._$blue = this.$element.children('.blue');
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

            this._$blue.addEventListener('click', this.onClickBlue, this);

            super.enable();
        }

        /**
         * @overridden Level1.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._$blue.removeEventListener('click', this.onClickBlue, this);

            super.disable();
        }

        /**
         * @overridden Level1.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._$blue = null;
        }

        /**
         * YUIDoc_comment
         *
         * @method onClickBlue
         * @private
         */
        private onClickBlue(event:JQueryEventObject):void {
            this._$blue.toggleClass('active');
        }

    }
}