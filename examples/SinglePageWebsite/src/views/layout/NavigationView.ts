///<reference path='../../../../../src/com/codebelt/structurets/display/DOMElement.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/utils/BulkLoader.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/utils/LanguageManager.ts'/>
///<reference path='../../../../../src/com/codebelt/structurets/controller/LocalStorageController.ts'/>

///<reference path='LanguageSelect.ts'/>

class NavigationView extends DOMElement
{
    public CLASS_NAME:string = 'NavigationView';

    private _languageSelect:LanguageSelect = null;

    constructor()
    {
        super();

        var languageManagerData = LanguageManager.getInstance().data;

        this._options = {
            title: languageManagerData.mainTitle,
            link1: languageManagerData.mainNavigation.home,
            link2: languageManagerData.mainNavigation.aboutUs,
            link3: languageManagerData.mainNavigation.artists,
            link4: languageManagerData.mainNavigation.reservations,
            link5: languageManagerData.mainNavigation.contact
        }
    }

    public createChildren():void
    {
        super.createChildren(function(data)
        {
            div({id: 'header'},
                div({cls: 'background'},
                    h1(
                        a({ href: '#home', html: 'DelliStore'})
                    ),
                    ul(
                        li( a({cls: 'active', href: '#home'}, data.link1) ),
                        li( a({href: '#about/robert'}, data.link2) ),
                        li( a({href: '#artists/'}, data.link3) ),
                        li( a({href: '#reservations/'}, data.link4) ),
                        li( a({href: '#contact?name=robert&age=34'}, data.link5) )
                    )
                )
            )
        });

//        this._languageSelect = new LanguageSelect();
//        this.addChildAt(this._languageSelect, 0);
    }

    public layoutChildren():void
    {
//        this._languageSelect.value( LocalStorageController.getInstance().getItem('language') );
    }

    /**
     * @copy DisplayObject.enable
     */
    public enable():void {
        if (this.isEnabled === true) return;

//            this._languageSelect.addEventListener(LanguageEvent.LANGUAGE_CHANGE, this.onLanguageChange, this);

        super.enable();
    }

    /**
     * @copy DisplayObject.disable
     */
    public disable():void {
        if (this.isEnabled === false) return;

//            this._languageSelect.removeEventListener(LanguageEvent.LANGUAGE_CHANGE, this.onLanguageChange);

        super.disable();
    }

    public onLanguageChange(event):void
    {
        var ls = LocalStorageController.getInstance();
        ls.setItem('language', event.data);

        document.location.reload(false);
    }

}