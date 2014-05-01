///<reference path='../../../../../../../src/com/codebelt/structurets/model/ValueObject.ts'/>

module codeBelt
{
    import ValueObject = StructureTS.ValueObject;

    /**
     * YUIDoc_comment
     *
     * @class ListItemVO
     * @extends ValueObject
     * @constructor
     **/
    export class ListItemVO extends ValueObject
    {
        /**
         * @type {string}
         */
        public id:string;

        /**
         * @type {string}
         */
        public content:string;

        /**
         * @type {boolean}
         * @default false
         */
        public isComplete:boolean = false;

        constructor(data:any = null)
        {
            super();

            if (data)
            {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        public update(data:any):void
        {
            this.id = data.id;
            this.content = data.content;
            this.isComplete = data.isComplete;
        }

    }
}