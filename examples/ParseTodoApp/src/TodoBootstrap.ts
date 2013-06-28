///<reference path='../../../src/typescript/_declare/jquery.d.ts'/>
///<reference path='../../../src/typescript/_declare/underscore.d.ts'/>
///<reference path='../../../src/typescript/_declare/parse.d.ts'/>
///<reference path='_declare/backbone.d.ts'/>

///<reference path='../../../src/typescript/com/codebelt/display/DOMElement.ts'/>
///<reference path='../../../src/typescript/com/codebelt/display/Stage.ts'/>
///<reference path='../../../src/typescript/com/codebelt/events/MouseEventType.ts'/>
///<reference path='../../../src/typescript/com/codebelt/utils/TemplateFactory.ts'/>
///<reference path='event/ListItemEvent.ts'/>
///<reference path='model/ListItemModel.ts'/>
///<reference path='model/AppModel.ts'/>

/**
 *
 * @class TodoBootstrap
 * @extends Stage
 * @constructor
 **/
class TodoBootstrap extends Stage
{
    private _appModel:AppModel;

    private _submitBtn:DOMElement;
    private _noTasksMessage:DOMElement;
    private _incompleteItemList:DOMElement;
    private _completeItemList:DOMElement;
    private _input:DOMElement;
    private _$selectedItem:JQuery;

    constructor()
    {
        super('.js-todo');
    }

    /**
     *
     * @method createChildren
     * @override
     * @public
     */
    public createChildren():void
    {
        super.createChildren();

        this._appModel = new AppModel();

        this._submitBtn = this.getChild('#js-submit-button');
        this._noTasksMessage = this.getChild('#js-none-message');
        this._incompleteItemList = this.getChild('#js-incomplete-items');
        this._input = this.getChild('#js-todo-input');
        this._completeItemList = this.getChild('#js-submit-button');

        this.updateItemList();
    }

    /**
     *
     * @method enabled
     * @override
     * @public
     */
    public enabled(value:boolean):void
    {
        if (value == this.isEnabled) return;

        if (value) {
            this._submitBtn.el.addEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._submitBtn.$el.on(MouseEventType.CLICK, this.onSubmitButton.bind(this));
            this._incompleteItemList.$el.on(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this) );

            this._appModel.addEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved, this);
            this._appModel.addEventListener(ListItemEvent.ADD_SUCCESS, this.onAddItemSuccess, this);
            this._appModel.addEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess, this);

        } else {
            this._submitBtn.el.removeEventListener(MouseEventType.CLICK, (event:MouseEvent) => this.onSubmitButton(event), false);
//            this._submitBtn.$el.off(MouseEventType.CLICK, this.onSubmitButton.bind(this));
            this._incompleteItemList.$el.off(MouseEventType.CLICK, '.list-item', this.onTodoSelected.bind(this));

            this._appModel.removeEventListener(ListItemEvent.LIST_SUCCESS, this.onListRecieved);
            this._appModel.removeEventListener(ListItemEvent.REMOVE_SUCCESS, this.onRemoveItemSuccess);
        }

        super.enabled(value);
    }

    private onSubmitButton(event:MouseEvent):void
    {
        var text:string = this._input.$el.val();

        this._appModel.addListItem(text);
    }

    private onTodoSelected(event:JQueryEventObject):void
    {
        this._$selectedItem = $(event.currentTarget);

        var id:number = this._$selectedItem.children('input').data('id');
        this._appModel.markItemComplete(id);
    }

    private onRemoveItemSuccess(event:ListItemEvent):void
    {
        var removedListItem:ListItemVO = event.data;
        console.log("onRemoveItemSuccess", event)
        this._$selectedItem.remove();//TODO: what if item was a DOMElement is still a child of this view. Need a way to remove it. Maybe like backbones cid.
        this._$selectedItem = null;

//        if (incompleteItemList.all('li').size() >= 1) {
//            noTasksMessage.removeClass('hidden');
//        }
    }

    private onAddItemSuccess(event:ListItemEvent):void
    {
        this._input.$el.val('')
                       .focus();

        this.updateItemList();
    }

    /**
     * This method will be user to fetch the list items from the AppModel.
     *
     * @method getItemList
     * @return void
     * @private
     */
    private updateItemList():void
    {
        this._appModel.getListItems();
    }

    /**
     * This method will get a list of ListItemVO objects from the ListItemEvent data property to be used to create the list.
     * Fist it will remove all current children in the list and then add the new list items.
     *
     * @param event {ListItemEvent}
     * @method onListRecieved
     * @return void
     * @private
     */
    private onListRecieved(event:ListItemEvent):void
    {
        var listItems:ListItemVO[] = event.data;

        this._incompleteItemList.removeChildren();

        if (listItems.length > 0) {
            this._noTasksMessage.$el.addClass('hidden');
        }

        _.each(listItems, function(item) {
            var view:DOMElement = TemplateFactory.createView('#todo-items-template', {
                id: item.id,
                content: item.content,
                isComplete: item.isComplete
            });

            this._incompleteItemList.addChild(view);
        }.bind(this));
    }

}