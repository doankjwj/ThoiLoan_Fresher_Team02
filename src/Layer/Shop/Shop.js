var Shop = cc.Layer.extend({
    _titleBackground: null,
    _buyResButton: null,
    _resButton: null,
    _armyButton: null,
    _shieldButton: null,
    _dcButton: null,
    _defenseButton: null,
    _swallowTouch: null,
    ctor: function(){
        this._super();
        this.visible = false;
        var color = new cc.LayerColor(cc.color(64,64,64,255));
        color.width = cc.winSize.width;
        color.height = cc.winSize.height;
        this._titleBackground = new cc.Sprite(shopGUI.resInfo);
        this._titleBackground.setAnchorPoint(cc.p(0, 0));
        this._titleBackground.setPosition(cc.p(0, cc.winSize.height - this._titleBackground.height));
        this._titleBackground.setScaleX(cc.winSize.width/this._titleBackground.width);
        this.loadItemList();
        var title = cc.LabelBMFont.create('CỬA HÀNG',  font.soji20);
        this.addChild(title, 1);
        title.setAnchorPoint(cc.p(0.5, 0.5));
        title.setPosition(cc.p(this._titleBackground.width/2*this._titleBackground.scaleX, this._titleBackground.y + this._titleBackground.height/2));
        var close = new ccui.Button(shopGUI.close, shopGUI.close);
        close.attr({
            x: this._titleBackground.width - close.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            scaleX: this._titleBackground.width/cc.winSize.width
        });
        close.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);
        this._titleBackground.addChild(close);
        this.addChild(this._titleBackground);
        this.addChild(color, -1);
        this.init();
   },

    init: function(){
        this.setPosition(cc.p(0, 0));
        this.setAnchorPoint(cc.p(0,0));
        this.initButton();
        this.addTouchListener();
    },

    onAppear: function(){
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this.visible = false;
        this._swallowTouch.setEnabled(false);
    },

    initButton: function() {
        var offset = cc.p(40, 40);

        this._armyButton = new ShopCategory(cf.shopType.army.name);
        this._armyButton.attr({
            x: offset.x,
            y: offset.y,
            scale: 1.5
        });

        this._defenseButton = new ShopCategory(cf.shopType.defense.name);
        this._defenseButton.attr({
            x: this._armyButton.x + offset.x + this._armyButton.width*this._armyButton.scale,
            y: this._armyButton.y,
            scale: 1.5
        });

        this._shieldButton = new ShopCategory(cf.shopType.shield.name);
        this._shieldButton.attr({
            x: this._defenseButton.x + offset.x + this._defenseButton.width * this._defenseButton.scale,
            y: this._defenseButton.y,
            scale: 1.5
        });


        this._buyResButton = new ShopCategory(cf.shopType.buyRes.name);
        this._buyResButton.attr({
            x: this._armyButton.x,
            y: this._armyButton.y + this._armyButton.height*this._armyButton.scale + offset.y,
            scale: 1.5
        });


        this._resButton = new ShopCategory(cf.shopType.res.name);
        this._resButton.attr({
            x: this._defenseButton.x,
            y: this._buyResButton.y,
            scale: 1.5
        });

        this._dcButton = new ShopCategory(cf.shopType.dc.name);
        this._dcButton.attr({
            x: this._shieldButton.x,
            y: this._buyResButton.y,
            scale: 1.5
        });

        this.addChild(this._buyResButton, 0, this._buyResButton._tag);
        this.addChild(this._armyButton, 0, this._armyButton._tag);
        this.addChild(this._resButton, 0, this._resButton._tag);
        this.addChild(this._shieldButton, 0, this._shieldButton._tag);
        this.addChild(this._dcButton, 0, this._dcButton._tag);
        this.addChild(this._defenseButton, 0, this._defenseButton._tag);

    },

    addTouchListener: function () {
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this);
    },

    loadItemList: function(){
    }



});