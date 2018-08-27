var PopupClan = cc.Layer.extend({
    _swallowTouch: null,
    _btnClose: null,
    _bg: null,
    _colorBG: null,
    _bgScale: null,
    _flagOpen: null,
    _flagClose1: null,
    _flagClose2: null,
    _slotBackground: null,

    ctor: function() {
        this._super();

        this._bg = cc.Sprite(res.clanGUI.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.scale = 1.5;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        this._bgScale = this._bg.scale;
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = this._bg.scale * 0.75;
        this._btnClose.setPosition(cc.p(this._bg.width*this._bgScale/2 - this._btnClose.width*this._btnClose.scale/1.5 - 10, this._bg.height*this._bgScale/2 - this._btnClose.height  *this._btnClose.scale/1.5 - 10));
        this.addChild(this._btnClose, 1);
        this._btnClose.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    sender.setScale(sender.scale*1.1);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale/1.1);
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale/1.1);
                    break;
            }

        }, this);

        this.init();

    },

    init: function() {
        this.onDisappear();
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
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);
    },

    onAppear: function() {
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
        this.visible = false
    }


});