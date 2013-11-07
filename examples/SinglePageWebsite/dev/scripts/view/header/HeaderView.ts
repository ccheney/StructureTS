///<reference path='../../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    /**
     * YUIDoc_comment
     *
     * @class HeaderView
     * @constructor
     **/
    export class HeaderView extends DOMElement
    {

        public CLASS_NAME:string = 'HeaderView';

        constructor()
        {
            super();

        }

        /**
         * @overridden DisplayObject.createChildren
         */
        public createChildren():void
        {
            super.createChildren('templates/header/headerTemplate.hbs');

        }

        /**
         * @overridden DisplayObject.layoutChildren
         */
        public layoutChildren():void
        {

        }

        /**
         * @overridden DisplayObject.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden DisplayObject.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            super.disable();
        }

    }
}