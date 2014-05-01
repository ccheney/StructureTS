///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>

///<reference path='view/GalleryView.ts'/>

module codeBelt
{

    import Stage = StructureTS.Stage;
    import DOMElement = StructureTS.DOMElement;

    /**
     * YUIDoc_comment
     *
     * @class PhotoGalleryApp
     * @extends Stage
     * @module codeBelt
     * @constructor
     **/
    export class PhotoGalleryApp extends Stage
    {
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

            var $child:JQuery = this.$element.find('.gallery-thumbnails');
            var child:GalleryView = new GalleryView($child);
            this.addChild(child);

            console.log("child", child);

            var images:DOMElement[] = child.getChildren();
            console.log(child.numChildren);
            console.log(images);
            console.log(child.getChildByCid(4));
        }

        /**
         * @overridden Stage.layoutChildren
         */
        public layoutChildren():void
        {
        }

        /**
         * @overridden Stage.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;


            super.disable();
        }

        /**
         * @overridden Stage.destroy
         */
        public destroy():void
        {
            super.destroy();

        }

    }
}