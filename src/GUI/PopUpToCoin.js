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

    _convertion: [1000, 1000, 1],
    _resLeak: null,
    _buyAble: null,

    ctor: function()
    {
        this._super();
        this.init();
        this.initClickEvent();
    },
    init: function()
    {
        /* Title*/
        var labelTitle = cc.LabelBMFont("THIẾU TÀI NGUYÊN", font.soji20);
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

        /* Label Message*/
        var labelMessage = fn.commonLabel("Mua số tài nguyên còn thiếu ?", font.fista16, 1.5, 1.5, cc.color(172, 57, 57, 255));
        labelMessage.setPosition(0, this._bg.height*0.27);
        this.addChild(labelMessage);

        /* Button Đồng ý*/
        var ttOk = "res/Art/Bang hoi/button _xem lai.png";
        this._buttonOk = ccui.Button();
        this._buttonOk.loadTextures(ttOk, ttOk, ttOk, ccui.Widget.PLIST_TEXTURE);
        //this._buttonOk.setTitleText("COIN");
        //this._buttonOk.setTitleFontName(font.soji12);
        this._buttonOk.scale = 1.5;
        this._buttonOk.setPosition(90, -80);
        this.addChild(this._buttonOk);
        /* icon G*/
        this._buttonOk._iconCoin = cc.Sprite(res.researchTroopGUI.iconCoin);
        this._buttonOk._iconCoin.scale = 0.75;
        this._buttonOk._iconCoin.setAnchorPoint(1, 0.5);
        this._buttonOk._iconCoin.setPosition(this._buttonOk.width/1.65*this._buttonOk.scale, this._buttonOk.height/2);
        this._buttonOk.addChild(this._buttonOk._iconCoin, 1);
        /* Label coin*/
        this._buttonOk._labelCoin = fn.commonLabel("COIN", font.soji20, 0.75, 0.75);
        this._buttonOk._labelCoin.setAnchorPoint(1, 0.5)
        this._buttonOk._labelCoin.setPosition(this._buttonOk.width/2.25*this._buttonOk.scale, this._buttonOk.height/2);
        this._buttonOk.addChild(this._buttonOk._labelCoin);


        /* Button Hủy*/
        var ttCancel = "res/Art/Bang hoi/button _ tra thu.png"
        this._buttonCancel = ccui.Button();
        this._buttonCancel.loadTextures(ttCancel, ttCancel, ttCancel, ccui.Widget.PLIST_TEXTURE);
        //this._buttonCancel.setTitleText("HỦY BỎ");
        //this._buttonCancel.setTitleFontName(font.soji20);
        this._buttonCancel.scale = 1.5;
        this._buttonCancel.setPosition(-90, -80);
        this.addChild(this._buttonCancel);
        /* Label Hủy*/
        this._buttonCancel._labelCancel = fn.commonLabel("Hủy Bỏ", font.soji20, 0.75, 0.75);
        this._buttonCancel._labelCancel.setAnchorPoint(1, 0.5)
        this._buttonCancel._labelCancel.setPosition(this._buttonCancel.width/2 *this._buttonCancel.scale, this._buttonCancel.height/2);
        this._buttonCancel.addChild(this._buttonCancel._labelCancel);
    },
    initClickEvent: function() /*Type == 0: build && type == 1: upgrade*/
    {
        var self = this;

        this._buttonOk.addClickEventListener(function(){
            /* Kiểm tra có đủ Coin*/
            self._buyAble = true;
            if (cf.user.getCurrentResource(cf.resType.resource_4) < self._buttonOk._labelCoin.string)
            {
                fr.getCurrentScreen().popUpMessage("CHƯA ĐỦ COIN !");
                self._buyAble = false;
            };
            /* Kiểm tra sức chứa kho*/
            for (var i=0; i<self._resLeak.length; i++)
            {
                /* Sức chứa còn lại*/
                var resAvaiable = cf.user.getMaxCapacityResource(i) - cf.user.getCurrentResource(i);
                if (resAvaiable < self._resLeak[i])
                {
                    fr.getCurrentScreen().popUpMessage("CẦN NÂNG CẤP THÊM KHO CHỨA !")
                    self._buyAble = false;
                    break;
                }
            };
            /* Kiểm tra thợ xây*/
            if (cf.user.getBuilderFree() == 0)
            {
                fr.getCurrentScreen().popUpMessage("TẤT CẢ THỢ ĐANG BẬN");
                self._buyAble = false;
            }

            if (self._buyAble)
            {
                this.runAction(cc.Sequence.create(
                    cc.CallFunc(function()
                    {
                        cf.user.editCurrentResource(cf.resType.resource_1, self._resLeak[0]);
                        cf.user.editCurrentResource(cf.resType.resource_2, self._resLeak[1]);
                        cf.user.editCurrentResource(cf.resType.resource_3, self._resLeak[2]);
                        cf.user.editCurrentResource(cf.resType.resource_4, -self.converter(self._resLeak));
                        testnetwork.connector.sendPayCoinToBuyETC(self._resLeak[0], self._resLeak[1], self._resLeak[2]);
                    }),
                    cc.DelayTime(0.25),
                    cc.CallFunc(function()
                    {
                        self.onCommitBuy();
                    })
                ))
            }
            else
                if (this._type == cf.constructType.build)
                    self._building.onCancelButton();

            self.hide();
        }.bind(this));
        this._buttonCancel.addClickEventListener(function(){
            self._AGREE = false;
            if (self._type == cf.constructType.build)
                self._building.onCancelButton();
            self.hide();
        }.bind(this))
    },

    onCommitBuy: function()
    {
        if (this._type == cf.constructType.upgrade)
            fr.getCurrentScreen().getChildByTag(2000).onUpgrade();
        if (this._type == cf.constructType.build)
        {
            this._building.onBuild();
        };
    },

    updateCoin: function(resLeak, type, building)
    {
        var tagItem = 2;

        if (resLeak)
            this._resLeak = resLeak;
        this._type = type;
        this._building = building;

        /* Tài nguyên còn thiếu*/
        var resUnique = 0;
        for (var i=0; i<resLeak.length; i++)
             resUnique += (resLeak[i] != 0) ? 1 : 0;
        var xPos = -this._bg.width/5;
        var yPos = (resUnique == 1) ? 0 : (resUnique == 2) ? 20 : 40;
        var yDis = 40;
        for (var i=0; i<resLeak.length; i++)
        {
            if (this.getChildByTag(i+tagItem))
                this.removeChildByTag(i+tagItem);
            if (resLeak[i] != 0)
            {
                var itemLeak = new this.getNodeRequire(i, resLeak[i]);
                itemLeak.setScale(1 + (3-resUnique)/5);
                itemLeak.setPosition(xPos, yPos);
                this.addChild(itemLeak, 2, i+tagItem);
                yPos -= yDis;
            }
        };

        this._buttonOk._labelCoin.setString(this.converter(resLeak));
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
    },

    /* 1 Item tài nguyên thiếu và icon tương ứng*/
    getNodeRequire: cc.Node.extend({
        ctor: function(resType, resAmout)
        {
            this._super();
            this.setScale(0.9);
            var xPos = 100;
            var icon = null;
            switch(resType)
            {
                case cf.resType.resource_1:
                    icon = cc.Sprite(shopGUI.iconGoldBar);
                    break;
                case cf.resType.resource_2:
                    icon = cc.Sprite(shopGUI.iconElixirBar);
                    break;
                case cf.resType.resource_3:
                    icon = cc.Sprite(shopGUI.iconDarkElixirBar);
                    break;
            }
            icon.setAnchorPoint(0, 0.5);
            icon.setPosition(xPos, 0);
            this.addChild(icon);
            var label = fn.commonLabel(resAmout, font.soji20, 1, 1);
            label.setAnchorPoint(1, 0.5);
            label.setPosition(xPos, 0);
            this.addChild(label);
        }
    }),
    /* quy đổi tài nguyên sang coin tương ứng*/
    converter: function(resLeak)
    {
        var coin = 0;
        for (var i=0; i<resLeak.length; i++)
            coin += Math.ceil(resLeak[i] / this._convertion[i]);
        return coin;
    }
})