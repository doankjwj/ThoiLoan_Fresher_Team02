/*Pop Up Hiện lên khi xây nhà, nâng cấp nhanh, ... thiếu vàng, dầu dầu hồng, dầu đen*/
var PopUpToCoin = cc.Node.extend({
    _labelCoin: null,
    _iconCoin: null,
    _buttonOk: null,
    _buttonCancel: null,

    _AGREE: null,

    _coin: null,
    _type: null,
    _building: null,

    ctor: function()
    {
        this._super();
        this.init();
        this.initClickEvent();
    },
    init: function()
    {
        /* Title*/
        var labelTitle = cc.LabelBMFont("Mua Thêm bằng G", font.soji20);
        labelTitle.setAnchorPoint(0.5, 0.5);
        labelTitle.setPosition(0, 110);
        this.addChild(labelTitle, 1);

        /* Background */
        this._bg = cc.Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this.addChild(this._bg, 0);

        /* Nền sau */
        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this.addChild(this._colorBG, -1);
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);

        /*Nút đóng*/
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.setPosition(cc.p(this._bg.width/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height/2 - this._btnClose.height  *this._btnClose.scale/2));
        this.addChild(this._btnClose, 1);
        this._btnClose.addClickEventListener(function(){
            self._AGREE = false;
            self.hide();
        });

        /* Label G*/
        this._labelCoin = cc.LabelBMFont("", font.soji20);
        this._labelCoin.scale = 1.3;
        this._labelCoin.setAnchorPoint(1, 0.5);
        this._labelCoin.setPosition(0, 0);
        this.addChild(this._labelCoin, 1);

        /* icon G*/
        var iconCoin = cc.Sprite(res.researchTroopGUI.iconCoin);
        iconCoin.scale = 1.3;
        iconCoin.setAnchorPoint(0, 0.5);
        iconCoin.setPosition(20, 0);
        this.addChild(iconCoin, 1);

        /* Button Đồng ý*/
        this._buttonOk = ccui.Button(res.clanGUI.buttonXemLai);
        this._buttonOk.setTitleText("ĐỒNG Ý");
        this._buttonOk.scale = 1.5;
        this._buttonOk.setPosition(90, -80);
        this.addChild(this._buttonOk);

        /* Button Hủy*/
        this._buttonCancel = ccui.Button(res.clanGUI.buttonTraThu);
        this._buttonCancel.setTitleText("HỦY");
        this._buttonCancel.scale = 1.5;
        this._buttonCancel.setPosition(-90, -80);
        this.addChild(this._buttonCancel);
    },
    initClickEvent: function() /*Type == 0: build && type == 1: upgrade*/
    {
        var self = this;
        this._buttonOk.addClickEventListener(function(){
            self._AGREE = true;

            if (self._type == cf.constructType.upgrade)
                fr.getCurrentScreen().getChildByTag(2000).onConstructByCoin(self._coin);
            if (self._type == cf.constructType.build)
            {
                self._building.onBuildCoin(self._coin);
            }


            self.hide();
        }.bind(this));
        this._buttonCancel.addClickEventListener(function(){
            self._AGREE = false;
            self.hide();
        }.bind(this))
    },

    updateCoin: function(coin, type, building)
    {
        this._coin = coin;
        this._type = type;
        this._building = building;
        this._labelCoin.setString(coin);
    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },
    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },
    show: function()
    {
        var self = this;
        var scaleOut = cc.ScaleTo(0, 0.5);
        var scaleIn = cc.ScaleTo(0.25, 1);
        var seq = cc.Sequence.create(scaleOut,
            cc.CallFunc(function(){
                self.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
            }),
            scaleIn);
        this.runAction(seq);

        this.onAppear();
    },
    hide: function()
    {
        this.setPosition(cc.p(cc.winSize.width/2, - cc.winSize.height/2));
        this.getParent().getChildByTag(gv.tag.TAG_POPUP).onDisappear();
        this.onDisappear();
    }
})