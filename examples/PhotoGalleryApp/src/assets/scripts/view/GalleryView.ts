///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{

    import DOMElement = StructureTS.DOMElement;

    /**
     * YUIDoc_comment
     *
     * @class GalleryView
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class GalleryView extends DOMElement
    {
        /**
         * @overridden DOMElement.CLASS_NAME
         */
        public CLASS_NAME:string = 'GalleryView';

        constructor($element)
        {
            super($element);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            var d:DOMElement = new DOMElement('li', {text: 'robert is cool'});
            this.addChildAt(d, 0);
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

            // Enable the child objects and add any event listeners.

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            // Disable the child objects and remove any event listeners.

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

    }
}