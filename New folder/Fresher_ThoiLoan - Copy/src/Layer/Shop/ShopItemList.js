var ShopItemList = cc.Layer.extend({
    _scrollView: null,
    _itemList: null,
    _titleBackground:   null,
    _swallowTouch: null,
    _shopName: null,
    _scrollView: null,
    ctor: function(tag){
        this._super();
        this._shopName = cf.shopTagToName(tag);
        this.visible = false;
        //add color background
        var color = new cc.LayerColor(cc.color(64,64,64,255));
        color.width = cc.winSize.width;
        color.height = cc.winSize.height;

        //add title background
        this._titleBackground = new cc.Sprite(shopGUI.resInfo);
        this._titleBackground.setAnchorPoint(cc.p(0, 0));
        this._titleBackground.setPosition(cc.p(0, cc.winSize.height - this._titleBackground.height));
        this._titleBackground.setScaleX(cc.winSize.width/this._titleBackground.width);

        //added title
        var title = cc.LabelBMFont.create(cf.shopTagToStr(tag),  font.soji20);
        title.setAnchorPoint(cc.p(0.5, 0.5));
        title.setPosition(cc.p(this._titleBackground.width/2*this._titleBackground.scaleX, this._titleBackground.y + this._titleBackground.height/2));

        //added close button
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

        var backButton = new ccui.Button(shopGUI.back, shopGUI.back);
        backButton.attr({

            x: backButton.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5,
            scaleX: this._titleBackground.width/cc.winSize.width

        });

        backButton.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    var shop = this.getParent().getChildByTag(cf.SHOP_TAG);
                    shop.onAppear();
                    this.onDisappear();
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
        this.addChild(title, 1);
        this._titleBackground.addChild(backButton);
        this.init(tag);
    },

    init: function(tag){
        this.addTouchListener();
        this.initScrollView(tag);
    },

    initScrollView: function(){
        var item = new ShopItem(this._shopName, 0);
        item.x = this.width/2;
        item.y = this.height/2;
        item.scale = 1.5;
        this._scrollView = new ccui.ScrollView();
        this._scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        this._scrollView.setTouchEnabled(true);
        this._scrollView.setBounceEnabled(true);
        this._scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        this._scrollView.setContentSize(cc.size(item.width*item.scale, item.height*item.scale));
        this._scrollView.setInnerContainerSize(cc.size(item.width*item.scale * cf.ShopItemList["ShopList"][this._shopName].length, item.height*item.scale));
        this._scrollView.setAnchorPoint(cc.p(0, 0));
        this._scrollView.setPosition(cc.p(25, cc.winSize.height/2 - item.height*item.scale/2));

        var shopItem = [];
        for(var i=0; i<cf.ShopItemList["ShopList"][this._shopName].length; i++) {
            shopItem.push(new ShopItem(this._shopName, i));
        }
        for(var j =0 ; j<shopItem.length; j++){
            // cc.log(shopItem[j]._itemName);
            shopItem[j].scale = 1.5;
            this._scrollView.addChild(shopItem[j]);
            shopItem[j].setAnchorPoint(cc.p(0.5, 0.5));
            shopItem[j].setPosition(cc.p((j+0.5) * item.width * item.scale, this._scrollView.height/2));
        }
        this.addChild(this._scrollView);
        this._scrollView.width = cc.winSize.width;
        this._scrollView.height = item.height*item.scale;

    },

    onAppear: function(){
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this.visible = false;
        this._swallowTouch.setEnabled(false);
    },

    addTouchListener: function () {
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this);
    }

});