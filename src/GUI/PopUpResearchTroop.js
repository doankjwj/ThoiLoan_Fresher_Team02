var PopUpResearchTroop = cc.Node.extend({
    _bg: null,
    _txtTitle: null,
    _btnClose: null,
    _btnOk: null,

    _bgWhite: null,
    _greenArrow: null,

    _icon: null,
    _grass: null,

    _txtTroopTitle: null,
    _labelTime: null,
    _txtTimeRemaining: null,

    _labelOnComplete: null,
    _buttonComplete: null,
    _iconCoin: null,
    _txtCoinRequire: null,

    _itemList: [],
    _timeRemaining: null,
    /* Text Description */
    _swallowTouch: null,

    _uprgradeAble: null,

    _colorBg: null,

    _TAG_TITLE: 1231,
    _TAG_TROOP_TITLE: 5321,
    _TAG_TIME_REMAINING: 5422,
    _TAG_COIN_REQUIRE: 5421,

    _isResearching: false,
    _finishingTime: null,
    _currentTroop: null,
    _coinRequire: null,

    ctor: function(researching, troopOrder)
    {
        this._super();
        this.init();
        this._isResearching = researching;
        this._currentTroop = troopOrder;
        this.initContent();
        if (researching)
        {
            this.onResearchTroop(troopOrder);
        }
        this.schedule(this.updateStatus, 1);
    },

    init: function()
    {
        var self = this;
        this._bg = cc.Scale9Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.setCapInsets(cc.rect(this._bg.width/10, this._bg.height/8 , this._bg.width/10*8, this._bg.height/8*6));
        this._bg.width = cc.winSize.width / 5 * 3.6;
        this._bg.height = cc.winSize.height /5 * 4;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        //this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        this._bgWhite = cc.Sprite(res.researchTroopGUI.spanWhite);
        this._bgWhite.setPosition(cc.p(0, this._bgWhite.height + 15));
        this._bgWhite.scale = 1.3;
        this.addChild(this._bgWhite, 0);

        /* Text Title */
        this._txtTitle = cc.LabelBMFont("Nhà Nâng Cấp Lính", font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 1));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 - this._txtTitle.height/2));
        this.addChild(this._txtTitle, 1, this._TAG_TITLE);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = 1.2;
        this._btnClose.setPosition(cc.p(this._bg.width/2 - this._btnClose.width, this._bg.height/2 - this._btnClose.height / 1.5));
        this.addChild(this._btnClose, 1);
        this._btnClose.addClickEventListener(function(){
            self.setPosition(cc.p(0, - cc.winSize.height));
            self.onDisappear();
        });

        this._grass = cc.Sprite(res.researchTroopGUI.grass);
        this._grass.scale = 0.5;
        this._grass.visible = false;
        this._grass.setPosition(cc.p(- this._bgWhite.width / 2 + this._bgWhite.x + 20, - this._bgWhite.height/2 + this._bgWhite.y));
        this.addChild(this._grass, this._bgWhite.getLocalZOrder()+1);

        this._greenArrow = cc.Sprite(res.researchTroopGUI.arrowGreen);
        this._greenArrow.setAnchorPoint(cc.p(0.5, 1));
        this._greenArrow.setPosition(cc.p(0, this._bgWhite.y - 20));
        this.addChild(this._greenArrow, this._bgWhite.getLocalZOrder() + 1);

        this._txtTroopTitle = cc.LabelBMFont("Quân Lính", font.soji20);
        this._txtTroopTitle.setPosition(this._greenArrow.x, this._greenArrow.y + 60);
        this._txtTroopTitle.visible = false;
        this.addChild(this._txtTroopTitle, this._bgWhite.getLocalZOrder() + 1, this._TAG_TROOP_TITLE);

        this._labelTime = cc.LabelBMFont("Thời gian nghiên cứu", font.soji20);
        this._labelTime.setPosition(this._greenArrow.x, this._greenArrow.y + 25);
        this._labelTime.setColor(cc.color(153, 51, 0, 255));
        this._labelTime.scale = 0.8;
        this._labelTime.visible = false;
        this.addChild(this._labelTime, this._bgWhite.getLocalZOrder() + 1);

        this._txtTimeRemaining = cc.LabelBMFont("Time Remaining: ", font.soji20);
        this._txtTimeRemaining.setPosition(cc.p(this._greenArrow.x, this._greenArrow.y - 24));
        this._txtTimeRemaining.visible = false;
        this.addChild(this._txtTimeRemaining, this._greenArrow.getLocalZOrder() + 1);

        this._labelOnComplete = cc.LabelBMFont("Hoàn thành ngay", font.soji20);
        this._labelOnComplete.setPosition(340, 160);
        this._labelOnComplete.setColor(cc.color(153, 51, 0, 255));
        this._labelOnComplete.scale = 0.8;
        this._labelOnComplete.visible = false;
        this.addChild(this._labelOnComplete, this._bgWhite.getLocalZOrder() + 1);

        this._buttonComplete = ccui.Button(res.researchTroopGUI.button);
        this._buttonComplete.setPosition(cc.p(this._labelOnComplete.x, this._labelOnComplete.y - 60));
        this._buttonComplete.visible = false;
        this.addChild(this._buttonComplete, this._bgWhite.getLocalZOrder() + 1);
        this._buttonComplete.addClickEventListener(function(){
            var coinExpect = this._coinRequire - cf.user._currentCapacityCoin;
            if (coinExpect > 0)
            {
                fr.getCurrentScreen().popUpMessage("Còn thiếu " + (coinExpect) +" Coin");
                return;
            }
            this.onCompleteResearch();
        }.bind(this));

        this._iconCoin = cc.Sprite(res.researchTroopGUI.iconCoin);
        this._iconCoin.setPosition(this._buttonComplete.x + 38, this._buttonComplete.y);
        this._iconCoin.visible = false;
        this.addChild(this._iconCoin, this._buttonComplete.getLocalZOrder() + 1);

        this._txtCoinRequire = cc.LabelBMFont("000", font.soji20);
        this._txtCoinRequire.setPosition(this._buttonComplete.x - 5, this._buttonComplete.y);
        this._txtCoinRequire.visible = false;
        this.addChild(this._txtCoinRequire, this._buttonComplete.getLocalZOrder() + 1, this._TAG_COIN_REQUIRE);
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
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);
    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },

    initContent: function()
    {
        for (var i = 0; i < 17; i++)
        {
            if ( 10<= i && i< 15) continue;
            if (this.getChildByTag(i))
                this.removeChildByTag(i);
            var item = new ItemResearchTroop(i, cf.user._listTroopLevel[i], this._isResearching);
            if ((i+1) <= 6 ) {
                item.x = -this._bg.width  / 2 + (i+1) * item.width * item.scale + 45;
                item.y = this._bgWhite.y - item.height * item.scale / 2 - 20 - 80;
            }
            else {
                var j = (i+1);
                if(j === 16) j = 5;
                else if(j === 17) j = 6;
                else j-= 6;
                item.x = -this._bg.width/2 + j*item.width*item.scale + 45;
                item.y = this._bgWhite.y - item.height * item.scale / 2 - 20 - item.height * item.scale - 80;
            }
            this.addChild(item, 1, i);
        }
    },
    onResearchTroop: function(troopOrder)
    {
        this._currentTroop = troopOrder;
        if (!this._isResearching)
        {
            testnetwork.connector.sendResearch(this._currentTroop - 1);
            this.onLaboratoryResearch();
        }
        this.initTimeRemaining();
        this._isResearching = true;
        this.onVisibleContent(true);
        this.initContent();
    },
    onLaboratoryResearch: function()
    {
        cf.user._buildingList[gv.orderInUserBuildingList.lab][0].onResearch(this._currentTroop);
    },
    initTimeRemaining: function()
    {

        if (!this._isResearching)
        {
            var level = cf.user._listTroopLevel[this._currentTroop - 1];
            this._timeRemaining = gv.json.troop["ARM_" + this._currentTroop][level + 1]["researchTime"] * 1000;
            this._finishingTime = Math.floor(new Date().getTime()) + this._timeRemaining;
        }
        else
        {
            var b = cf.user._buildingList[gv.orderInUserBuildingList.lab][0];
            this._timeRemaining = b._timeResearchRemaining;
            this._finishingTime = b._timeResearchFinish;
        }
    },
    onVisibleContent: function(boo)
    {
        if (this._icon)
            this.removeChild(this._icon);
        this._icon = cc.Sprite(researchTroopFolderTroopIconSmall + "ARM_" + this._currentTroop + "_" + (cf.user._listTroopLevel[this._currentTroop-1]+1) + ".png");
        this._icon.setPosition(this._grass.x, this._grass.y + 50);
        this.addChild(this._icon, this._grass.getLocalZOrder()+ 1);
        this._icon.visible = boo;

        this._grass.visible = boo;
        this._labelOnComplete.visible = boo;
        this._labelTime.visible = boo;
        this._txtCoinRequire.visible = boo;
        this._buttonComplete.visible = boo;
        this._txtTimeRemaining.visible = boo;
        this._iconCoin.visible = boo;

        if (boo) this._txtTitle.setString("Đang nâng cấp");
            else this._txtTitle.setString("Nhà nâng cấp lính")
        this._txtTimeRemaining.setString(cf.secondsToLongTime(Math.floor(this._timeRemaining/1000)));
        this._coinRequire = Math.floor(this._timeRemaining/60000);
        this._txtCoinRequire.setString(this._coinRequire);
        if (this._coinRequire > cf.user._currentCapacityCoin)
            this._txtCoinRequire.setColor(cc.color(255, 0, 0, 255));
    },
    updateStatus: function()
    {
        if (!this._isResearching) return;
        this._timeRemaining = this._finishingTime - new Date().getTime();
        if (this._timeRemaining <= 0)
        {
            this.onCompleteResearch();
            return;
        }
        this._txtTimeRemaining.setString(cf.secondsToLongTime(Math.floor(this._timeRemaining/1000)));
        this._coinRequire = Math.floor(this._timeRemaining/60000);
        this._txtCoinRequire.setString(Math.floor(this._timeRemaining/60000));
        if (this._coinRequire > cf.user._currentCapacityCoin)
            this._txtCoinRequire.setColor(cc.color(255, 0, 0, 255));
    },
    onCompleteResearch: function()
    {
        this._isResearching = false;
        this.onVisibleContent(false);
        cf.user._listTroopLevel[this._currentTroop-1] ++;
        this.initContent();
        cf.user._buildingList[gv.orderInUserBuildingList.lab][0].onFinishResearch();
    }
})