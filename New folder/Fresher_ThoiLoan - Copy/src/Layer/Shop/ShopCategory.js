var ShopCategory = ccui.Button.extend({
    _catalogyBg:        null,
    _titleBackground:   null,
    _title:             null,
    _typeImage:         null,
    _tag:               null,
    ctor: function(type){
        this._super();
        this.loadTextures(shopGUI.slotCatalogy, shopGUI.slotCatalogy);
        this._title = cc.LabelBMFont.create(cf.shopType.army.str,  font.soji20);
        var tp;
        switch(type){
            case cf.shopType.army.name:
                tp=shopGUI.typeArmy;
                this._title.setString(cf.shopType.army.str);
                this._tag = cf.shopType.army.tag;
                break;
            case cf.shopType.res.name:
                tp=shopGUI.typeRes;
                this._title.setString(cf.shopType.res.str);
                this._tag = cf.shopType.res.tag;
                break;
            case cf.shopType.shield.name:
                tp=shopGUI.typeShield;
                this._title.setString(cf.shopType.shield.str);
                this._tag = cf.shopType.shield.tag;
                break;
            case cf.shopType.dc.name:
                tp=shopGUI.typeDC;
                this._title.setString(cf.shopType.dc.str);
                this._tag = cf.shopType.dc.tag;
                break;
            case cf.shopType.defense.name:
                tp=shopGUI.typeDefense;
                this._title.setString(cf.shopType.defense.str);
                this._tag = cf.shopType.defense.tag;
                break;
            case cf.shopType.buyRes.name:
                tp=shopGUI.typeBuyRes;
                this._title.setString(cf.shopType.buyRes.str);
                this._tag = cf.shopType.buyRes.tag;
                break;
            default:
                break;
        }
        this._typeImage = new cc.Sprite(tp);
        this._catalogyBg = new cc.Sprite(shopGUI.catalogyBg);
        this._titleBackground = new cc.Sprite(shopGUI.titleBackground);
        this.init();
    },

    init: function(){
        this.addChild(this._catalogyBg, 1);
        this.addChild(this._typeImage, 2);
        this.addChild(this._titleBackground, 3);
        this.addChild(this._title, 4);
        this._catalogyBg.attr({
            x: this.width/2,
            y: this.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._typeImage.attr({
            x: this.width/2,
            y: this.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._titleBackground.attr({
            x: this.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._title.attr({
            x: this.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.setAnchorPoint(cc.p(0, 0));
        this.addTouchEventListener(this.getList, this);
    },

    getList: function(sender, type){
                switch (type){
                    case ccui.Widget.TOUCH_BEGAN:
                        sender.scale = 1.55;
                        break;
                    case ccui.Widget.TOUCH_MOVED:
                        break;
                    case ccui.Widget.TOUCH_ENDED:
                        sender.scale = 1.5;
                        var mainLayer = this.getParent().getParent();
                        var shopItem;
                        if (mainLayer.getChildByTag(cf.getCategoryTag(sender.getTag())) === null) {
                            shopItem = new ShopItemList(sender.getTag());
                            mainLayer.addChild(shopItem, 10, cf.getCategoryTag(sender.getTag()));
                        } else shopItem = mainLayer.getChildByTag(cf.getCategoryTag(sender.getTag()));
                        shopItem.onAppear();
                        this.getParent().onDisappear();
                        break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.scale = 1.5;
                break;
        }
    }
});