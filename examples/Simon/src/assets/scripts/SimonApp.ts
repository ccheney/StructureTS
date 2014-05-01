///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/display/Stage.ts'/>

///<reference path='view/Level5.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import Stage = StructureTS.Stage;

    /**
     *
     * @class SimonApp
     * @extends Stage
     * @constructor
     **/
    export class SimonApp extends Stage
    {
        /**
         * YUIDoc_comment
         *
         * @property _levels
         * @type {Level5}
         * @private
         */
        private _levels:Level5 = null;

        constructor()
        {
            super();


            /*var tl = new TimelineLite,
                mySplitText = new SplitText("#quote", {type:"words,chars"}),
                chars = mySplitText.chars; //an array of all the divs that wrap each character

            TweenLite.set("#quote", {perspective:400});

            tl.staggerFrom(chars, 0.8, {opacity:0, scale:0, y:80, rotationX:180, transformOrigin:"0% 50% -50",  ease:Back.easeOut}, 0.01, "+=0", allDone);

            function allDone(){
                mySplitText.revert();
            }

            document.getElementById("animate").onclick = function() {
                tl.restart();
            }
*/
        }

        /**
         * @overridden Stage.createChildren
         */
        public createChildren():void
        {
            super.createChildren();

            this._levels = new Level5(this.$element.children('.js-simon'));
            this.addChild(this._levels);
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

            this._levels.enable();

            super.enable();
        }

        /**
         * @overridden Stage.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._levels.disable();

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