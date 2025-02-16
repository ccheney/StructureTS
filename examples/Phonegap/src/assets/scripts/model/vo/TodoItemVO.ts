///<reference path='../../../../../../../src/com/codebelt/structurets/model/ValueObject.ts'/>
///<reference path='../../../../../../../src/com/codebelt/structurets/interface/IValueObject.ts'/>

module codeBelt
{
    import ValueObject = StructureTS.ValueObject;
    import IValueObject = StructureTS.IValueObject;

    export class TodoItemVO extends ValueObject
    {
        public id:string = null;
        public completed:boolean = false;
        public text:string = null;

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
            this.completed = data.completed;
            this.text = data.text;
        }

        /**
         * @overridden ValueObject.copy
         */
        public copy():TodoItemVO
        {
            var data:IValueObject = super.copy();
            return new TodoItemVO(data);
        }

    }
}