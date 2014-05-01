///<reference path='../ContentView.ts'/>

module codeBelt
{
    /**
     * YUIDoc_comment
     *
     * @class ServicesView
     * @extends ContentView
     * @constructor
     **/
    export class ServicesView extends ContentView
    {
        constructor()
        {
            super();

        }

        /**
         * @overridden ContentView.createChildren
         */
        public createChildren():void
        {
            super.createChildren('templates/services/servicesTemplate.hbs');

        }

        /**
         * @overridden ContentView.layoutChildren
         */
        public layoutChildren():void
        {

        }

        /**
         * @overridden ContentView.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden ContentView.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
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