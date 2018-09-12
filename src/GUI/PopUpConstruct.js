var PopUpConstruct = cc.Node.extend({
    _constructType: null,
    _buildingId: null,
    _building: null,

    _bg: null,
    _titleBar: null,
    _txtTitle: null,
    _btnClose: null,
    _btnOk: null,


    /* Text Description */
    _bgTxtDescription: null,
    _txtDescreption: null,

    _swallowTouch: null,

    _uprgradeAble: null,

    _icon: null,
    _grass: null,
    _effect: null,
    _timeRequireTXT: null,

    /* Hp bar */
    _bar1: null,    // thanh màu xanh hiện tại
    _bar1BG: null,  // thanh đậm max
    _bar1BG2: null, // thanh level tiếp theo
    _bar1TXT: null,
    _bar1Icon: null,

    /* Orther bar -Option */
    _bar2: null,
    _bar2BG: null,
    _bar2BG2: null,
    _bar2TXT: null,
    _bar2Icon: null,

    _bar3: null,
    _bar3BG: null,
    _bar3BG2: null,
    _bar3TXT: null,
    _bar3Icon: null,



    _cost: {
        gold: 0,
        elixir: 0,
        darkElixir: 0,
        coin: 0
    },

    _require:
    {
        gold: 0,
        elixir: 0,
        darkElixir: 0,
        coin: 0
    },

    _bgScale: 1,
    _offSetBar : 50,
    _colorBG: null,

    _TAG_ICON: 1122,
    _TAG_GRASS: 3331,
    _TAG_EFFECT: 4512,
    _TAG_TITLE: 9471,

    _TAG_BAR1_ICON: 2321,
    _TAG_BAR1: 9342,
    _TAG_BAR1_TXT: 2323,
    _TAG_BAR1_BG: 8273,
    _TAG_BAR2_ICON: 2423,
    _TAG_BAR2: 4353,
    _TAG_BAR2_TXT: 7578,
    _TAG_BAR2_BG: 7252,
    _TAG_BAR3_ICON: 4535,
    _TAG_BAR3: 8975,
    _TAG_BAR3_TXT: 6432,
    _TAG_BAR3_BG: 3453,
    _TAG_TXT_DESCRIPTION: 2340,

    _orderBar: {
        bar1: 0,
        bar2: 1,
        bar3: 2
    },

    _TAG_TXT_TIME_REQUIRE: 9966,
    _TAG_CONTENT_REQUIRE: 8766,
    _TAG_CONTENT_OPTIONAL: 3223,

    ctor: function() {
        this._super();
        var self = this;

        /* Background */
        this._bg = cc.Scale9Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.setCapInsets(cc.rect(this._bg.width / 12, this._bg.height / 10, this._bg.width / 12 * 10, this._bg.height / 10 * 8));
        this._bg.width = cc.winSize.width / 5 * 4;
        this._bg.height = cc.winSize.height / 5 * 4;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5, 127.5, 127.5, 0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        /* Text Title */
        this._txtTitle = cc.LabelBMFont("Building Title", font.soji20);
        this._txtTitle.setScale(1.2);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 1));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 - this._txtTitle.height / 2));
        this.addChild(this._txtTitle, 1, this._TAG_TITLE);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = 1.2;
        this._btnClose.setPosition(cc.p(this._bg.width / 2 - this._btnClose.width, this._bg.height / 2 - this._btnClose.height / 1.5));
        this.addChild(this._btnClose, 1);
        this._btnClose.addClickEventListener(function () {
            self.onDisappear();
        });

        /* Button Ok */
        this._btnOk = ccui.Button(res.popUp.btnOk, res.popUp.btnOk);
        this._btnOk.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnOk.scale = 1.4;
        this._btnOk.setPosition(cc.p(0, -this._bg.height / 2 + this._btnOk.height * this._btnOk.scale / 2));
        this.addChild(this._btnOk, 1);
        this._btnOk.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    self.onDisappear();
                    //Thiếu tài nguyên
                    if (cf.user._builderFree <= 0) {
                        fr.getCurrentScreen().popUpMessage("Tất cả thợ đang bận");
                        return;
                    }

                    var constructEnough = (self._require.gold == 0 && self._require.elixir == 0 && self._require.darkElixir == 0 && self._require.coin == 0);
                    if (!constructEnough)
                    {
                        var coinRequire = 0;
                        coinRequire += Math.ceil(self._require.gold/1000) + Math.ceil(self._require.elixir/1000) + Math.ceil(self._require.darkElixir/50) + self._require.coin;
                        gv.upgradeAble.etcToCoin = coinRequire;

                        self.getParent().onPopUpToCoin([self._require.gold, self._require.elixir, self._require.darkElixir], cf.constructType.upgrade, fn.getCurrentBuilding());
                        return;
                    }
                    ;
                    self.onUpgrade();


                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._btnOk);
        /* Building Icon */
        this._icon = cc.Sprite(res.tmp_effect);
        this._icon.setAnchorPoint(cc.p(0.5, 0.5));
        this._icon.scale = 1.3
        this._icon.setPosition(-this._bg.width / 4, this._bg.height / 8);
        this.addChild(this._icon, 2, this._TAG_ICON);

        /* Time Require */
        this._labelTimeRequire = cc.LabelBMFont("THỜI GIAN NÂNG CẤP", font.soji20);
        this._labelTimeRequire.setAnchorPoint(cc.p(0.5, 1));
        this._labelTimeRequire.setPosition(cc.p(this._icon.x, this._icon.y - this._icon.height * 2));
        this.addChild(this._labelTimeRequire, 4);

        this._timeRequireTXT = cc.LabelBMFont("", font.soji20);
        this._timeRequireTXT.setAnchorPoint(cc.p(1, 1));
        this._timeRequireTXT.setScale(1.25);
        this._timeRequireTXT.setPosition(cc.p(this._icon.x, this._icon.y - this._icon.height * 4));
        this._timeRequireTXT.visible = false;
        this.addChild(this._timeRequireTXT, 4, this._TAG_TXT_TIME_REQUIRE);

        this._iconTime = cc.Sprite(res.upgradeBuildingGUI.iconTime);
        this._iconTime.setAnchorPoint(0, 1);
        this._iconTime.setScale(1.25);
        this._iconTime.setVisible(false);
        this._iconTime.setPosition(cc.p(this._icon.x, this._icon.y - this._icon.height * 4));
        this.addChild(this._iconTime, 4);



        /* Building Grass */
        this._grass = cc.Sprite(res.tmp_effect);
        this._grass.setAnchorPoint(cc.p(0.5, 0.5));
        this._grass.setPosition(-this._bg.width / 4, this._bg.height / 8);
        this.addChild(this._grass, 1, this._TAG_GRASS);

        /* TextField White */
        this._bgTxtDescription = cc.LayerColor(cc.color(255, 255, 255, 255));
        this._bgTxtDescription.width = this._bg.width * 0.9;
        this._bgTxtDescription.height = this._bg.height * 0.3;
        this._bgTxtDescription.setPosition(cc.p(-this._bgTxtDescription.width / 2, -this._bg.height / 3));
        this.addChild(this._bgTxtDescription, 2);
        /* TXT Description */
        this._txtDescreption = cc.LabelBMFont("Building Description", font.fista24);
        this._txtDescreption.setScale(1.2);
        this._txtDescreption.setAnchorPoint(0.5, 1);
        this._txtDescreption.setPosition(0, this._bgTxtDescription.height + this._bgTxtDescription.y);
        this._txtDescreption.setColor(cc.color(200, 100, 100, 255));
        this.addChild(this._txtDescreption, this._bgTxtDescription.getLocalZOrder() + 1, this._TAG_TXT_DESCRIPTION);

        /* Builing Effect */
        this._effect = cc.Sprite(res.tmp_effect);
        this._effect.setAnchorPoint(cc.p(0.5, 0.5));
        this._effect.setPosition(-this._bg.width / 4, this._bg.height / 8);
        this.addChild(this._effect, 3, this._TAG_EFFECT);

        this.addBars();
    },

    onUpgrade: function()
    {
        fn.getCurrentBuilding().onStartBuild(gv.startConstructType.newConstruct);

        /* Request */
        testnetwork.connector.sendUpgradeBuilding(gv.building_selected);

        /* Update User Infor + Resource Bar */
        cf.user.editCurrentResource(cf.resType.resource_1, -this._cost.gold);
        cf.user.editCurrentResource(cf.resType.resource_2, -this._cost.elixir);
        cf.user.editCurrentResource(cf.resType.resource_3, -this._cost.darkElixir);
        cf.user.editCurrentResource(cf.resType.resource_4, -this._cost.coin);

        //this.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
        //this.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
        //this.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
        //this.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
        //
        /* Hiển thị nút xây nhanh, ..*/
        if (fn.getCurrentBuilding()._time_remaining > 0 && this._buildingSTR != gv.buildingSTR.wall)
            fr.getCurrentScreen().showListBotButton(gv.building_selected);
    },

    addBars: function()
    {

        // +++++ BAR 1 ===============================================
        this._bar1BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar1BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2
        });
        this.addChild(this._bar1BG, 2, this._TAG_BAR1_BG);

        this._bar1BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar1BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2,
            visible: false,
        });
        this.addChild(this._bar1BG2, 2);
        this._bar1BG2.runAction(cc.TintTo(0, 204, 204, 0));

        this._bar1 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar1.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2
        });
        this.addChild(this._bar1, 2, this._TAG_BAR1);

        this._bar1Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar1Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height  / 2
        });
        this.addChild(this._bar1Icon, 2);

        this._bar1TXT = cc.LabelBMFont("Bar 1 Info", font.soji20);
        this._bar1TXT.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5 * this._bg.height  / 10 + 5,
            y: this._bar1BG.y
        });
        this.addChild(this._bar1TXT, 2, this._TAG_BAR1_TXT);

        // +++++ BAR 2 =============================================
        this._bar2BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar2BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this.addChild(this._bar2BG, 2, this._TAG_BAR2_BG);

        this._bar2BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar2BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
            visible: false,
        });
        this.addChild(this._bar2BG2, 2);
        this._bar2BG2.runAction(cc.TintTo(0, 204, 204, 0));

        this._bar2 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this.addChild(this._bar2, 2, this._TAG_BAR2);

        this._bar2Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar2Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height  / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this.addChild(this._bar2Icon, 2);

        this._bar2TXT = cc.LabelBMFont("Bar 2 Info", font.soji20);
        this._bar2TXT.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5 * this._bg.height  / 10 + 5,
            y: this._bar2BG.y
        });
        this.addChild(this._bar2TXT, 2, this._TAG_BAR2_TXT);

        // +++++ Bar 3 ==============================================
        this._bar3BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar3BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this.addChild(this._bar3BG, 2, this._TAG_BAR3_BG);

        this._bar3BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar3BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
            visible: false,
        });
        this.addChild(this._bar3BG2, 2);
        this._bar3BG2.runAction(cc.TintTo(0, 204, 204, 0));

        this._bar3 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar3.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height  / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this.addChild(this._bar3, 2, this._TAG_BAR3);

        this._bar3Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar3Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this.addChild(this._bar3Icon, 2);

        this._bar3TXT = cc.LabelBMFont("Bar 3 Info", font.soji20);
        this._bar3TXT.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5 * this._bg.height  / 10 + 5,
            y: this._bar3BG.y
        });
        this.addChild(this._bar3TXT, 2, this._TAG_BAR3_TXT);
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

        var self = this;
        var appear = cc.Sequence.create(
            cc.CallFunc(function()
            {
                self.setPosition(cc.winSize.width/2, cc.winSize.height/2);
                self.setScale(0.75);
                self.setVisible(true);
            }),
            cc.ScaleTo(0.15, 1)
        );
        this.runAction(appear);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);

        var self = this;
        var disAppear = cc.Sequence.create(
            cc.Spawn.create(
                cc.ScaleTo(0.1, 0.25),
                cc.moveBy(0.1, 0, -cc.winSize.height/4)
            ),
            cc.CallFunc(function()
            {
                self.setVisible(false);
            })
        );
        this.runAction(disAppear);
    },

    updateContent: function(id, constructType)
    {
        this._buildingId = id;
        this._constructType = constructType;
        gv.upgradeAble = true;
        if (constructType == gv.constructType.info)
        {
            this._btnOk.visible = false;
        }
        else
        {
            this._btnOk.visible = true;
        }
        var b = cf.user._buildingList[Math.floor(id/100) - 1][Math.floor(id%100)];
        var level = (constructType == gv.constructType.info) ? b.getTempLevel() : b.getNextLevel();
        this.updateDescription(b._description);
        this.updateIcon(b._buildingSTR, level, b._size, b._name, b._isActive, constructType);
        this.updateBar(b._buildingSTR, b.getTempLevel(), b._size, b._name, b._isActive, constructType);
    },

    visibleBar: function(bool1, bool2, bool3)
    {
        this._bar1.visible = bool1;
        this._bar1BG.visible = bool1;
        this._bar1BG2.visible = bool1;
        this._bar1Icon.visible = bool1;
        this._bar1TXT.visible = bool1;

        this._bar2.visible = bool2;
        this._bar2BG.visible = bool2;
        this._bar2BG2.visible = bool2;
        this._bar2Icon.visible = bool2;
        this._bar2TXT.visible = bool2;

        this._bar3.visible = bool3;
        this._bar3BG.visible = bool3;
        this._bar3BG2.visible = bool3;
        this._bar3Icon.visible = bool3;
        this._bar3TXT.visible = bool3;
    },

    replaceIconBar: function(ord, url)
    {
        switch(ord)
        {
            case this._orderBar.bar1:
                this.removeChild(this._bar1Icon);
                this._bar1Icon = cc.Sprite(url);
                this._bar1Icon.attr({
                    anchorX: 1,
                    anchorY: 0.5,
                    x: 0.5 * this._bg.height  / 10,
                    y: 0.5 * this._bg.height  / 2,
                    visible :true,
                });
                this.addChild(this._bar1Icon, 2, this._TAG_BAR1_ICON);
                break;
            case this._orderBar.bar2:
                this.removeChild(this._bar2Icon);
                this._bar2Icon = cc.Sprite(url);
                this._bar2Icon.attr({
                    anchorX: 1,
                    anchorY: 0.5,
                    x: 0.5 * this._bg.height  / 10,
                    y: this._bar1BG.y - this._offSetBar,
                    visible: true,
                });
                this.addChild(this._bar2Icon, 2, this._TAG_BAR2_ICON);
                break;
            case this._orderBar.bar3:
                this.removeChild(this._bar3Icon);
                this._bar3Icon = cc.Sprite(url);
                this._bar3Icon.attr({
                    anchorX: 1,
                    anchorY: 0.5,
                    x: 0.5 * this._bg.height / 10,
                    y: this._bar1BG.y - this._offSetBar * 2,
                    visible: true,
                });
                this.addChild(this._bar3Icon, 2, this._TAG_BAR3_ICON);
                break;
            default:
                break;
        }
    },

    updateBar: function(str, level, size, name, status, constructType)
    {


        var buildingId = gv.building_selected;
        var b = cf.user._buildingList[Math.floor(buildingId/100) - 1][Math.floor(buildingId%100)];

        var bar1Length = 1;
        var bar1Length2 = 1;
        var bar1MaxLength = 1;
        var bar2Length = 1;
        var bar2Length2 = 2;
        var bar2MaxLength = 1;
        var bar3Length = 1;
        var bar3Length2 = 2;
        var bar3MaxLength = 1;

        var preText1 = "";
        var preText2 = "";
        var preText3 = "";

        switch (str)
        {
            case gv.buildingSTR.townHall:
                this.visibleBar(true, true, true);
                bar1Length = gv.json.townHall[str][level]["hitpoints"];
                bar1Length2 = gv.json.townHall[str][Math.min(level+1, gv.buildingMaxLevel.townHall)]["hitpoints"];
                bar1MaxLength = gv.json.townHall[str][gv.buildingMaxLevel.townHall]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacityGold;
                    bar2MaxLength = gv.json.townHall[str][level]["capacityGold"];
                    bar3Length = b._currentCapacityElixir;
                    bar3MaxLength = gv.json.townHall[str][level]["capacityElixir"];
                }
                else {
                    bar2Length = gv.json.townHall[str][level]["capacityGold"];
                    bar2Length2 = gv.json.townHall[str][Math.min(level+1, gv.buildingMaxLevel.townHall)]["capacityGold"];
                    bar2MaxLength = gv.json.townHall[str][gv.buildingMaxLevel.townHall]["capacityGold"];
                    bar3Length = gv.json.townHall[str][level]["capacityElixir"];
                    bar3Length2 = gv.json.townHall[str][Math.min(level+1, gv.buildingMaxLevel.townHall)]["capacityElixir"];
                    bar3MaxLength = gv.json.townHall[str][gv.buildingMaxLevel.townHall]["capacityElixir"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityGold);
                this.replaceIconBar(this._orderBar.bar3, res.upgradeBuildingGUI.iconCapacityElixir);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                preText3 = "Sức chứa: ";
                break;
            case gv.buildingSTR.builderHut:
                this.visibleBar(true, false, false);
                bar1Length = gv.json.builderHut[str][level]["hitpoints"];
                bar1MaxLength = gv.json.builderHut[str][gv.buildingMaxLevel.builderHut]["hitpoints"];
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                preText1 = "Máu: ";
                break;
            case gv.buildingSTR.armyCamp_1:
                this.visibleBar(true, true, false);
                bar1Length = gv.json.armyCamp[str][level]["hitpoints"];
                bar1Length2 = gv.json.armyCamp[str][Math.min(level+1, gv.buildingMaxLevel.armyCamp_1)]["hitpoints"];
                bar1MaxLength = gv.json.armyCamp[str][gv.buildingMaxLevel.armyCamp_1]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = cf.user.getCurrentTroopHousingSpace();
                    bar2MaxLength = cf.user.getMaxTroopHousingSpace();
                }
                else {
                    bar2Length = gv.json.armyCamp[str][level]["capacity"];
                    bar2Length2 = gv.json.armyCamp[str][Math.min(level + 1, gv.buildingMaxLevel.armyCamp_1)]["capacity"];
                    bar2MaxLength = gv.json.armyCamp[str][gv.buildingMaxLevel.armyCamp_1]["capacity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconTroopCapacity);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                break;
            case gv.buildingSTR.barrack_1:
                this.visibleBar(true, false, false);
                bar1Length = gv.json.barrack[str][level]["hitpoints"];
                bar1Length2 = gv.json.barrack[str][Math.min(level + 1, gv.buildingMaxLevel.barrack_1)]["hitpoints"];
                bar1MaxLength = gv.json.barrack[str][gv.buildingMaxLevel.barrack_1]["hitpoints"];
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                preText1 = "Máu: ";
                break;
            case gv.buildingSTR.resource_1:
                this.visibleBar(true, true, true);
                bar1Length = gv.json.resource[str][level]["hitpoints"];
                bar1Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_1)]["hitpoints"];
                bar1MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_1]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacity;
                    bar2MaxLength = gv.json.resource[str][level]["capacity"];
                    bar3Length = gv.json.resource[str][level]["productivity"];
                    bar3MaxLength = bar3Length;
                }
                else
                {
                    bar2Length = gv.json.resource[str][level]["capacity"];
                    bar2Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_1)]["capacity"];
                    bar2MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_1]["capacity"];
                    bar3Length = gv.json.resource[str][level]["productivity"];
                    bar3Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_1)]["productivity"];
                    bar3MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_1]["productivity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityGold);
                this.replaceIconBar(this._orderBar.bar3, res.upgradeBuildingGUI.iconProductionRateGold);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                preText3 = "Sản lượng: ";
                break;
            case gv.buildingSTR.resource_2:
                this.visibleBar(true, true, true);
                bar1Length = gv.json.resource[str][level]["hitpoints"];
                bar1Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_2)]["hitpoints"];
                bar1MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_2]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacity;
                    bar2MaxLength = gv.json.resource[str][level]["capacity"];
                    bar3Length = gv.json.resource[str][level]["productivity"];
                    bar3MaxLength = bar3Length;
                }
                else
                {
                    bar2Length = gv.json.resource[str][level]["capacity"];
                    bar2Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_2)]["capacity"];
                    bar2MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_2]["capacity"];
                    bar3Length = gv.json.resource[str][level]["productivity"];
                    bar3Length2 = gv.json.resource[str][Math.min(level + 1, gv.buildingMaxLevel.resource_2)]["productivity"];
                    bar3MaxLength = gv.json.resource[str][gv.buildingMaxLevel.resource_2]["productivity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityElixir);
                this.replaceIconBar(this._orderBar.bar3, res.upgradeBuildingGUI.iconProductionRateElixir);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                preText3 = "Sản lượng: ";
                break;
            case gv.buildingSTR.storage_1:
                this.visibleBar(true, true, false);
                bar1Length = gv.json.storage[str][level]["hitpoints"];
                bar1Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_1)]["hitpoints"];
                bar1MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_1]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacity;
                    bar2MaxLength = gv.json.storage[str][level]["capacity"];
                }
                else{
                    bar2Length = gv.json.storage[str][level]["capacity"];
                    bar2Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_1)]["capacity"];
                    bar2MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_1]["capacity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityGold);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                break;
            case gv.buildingSTR.storage_2:
                this.visibleBar(true, true, false);
                bar1Length = gv.json.storage[str][level]["hitpoints"];
                bar1Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_2)]["hitpoints"];
                bar1MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_2]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacity;
                    bar2MaxLength = gv.json.storage[str][level]["capacity"];
                }
                else{
                    bar2Length = gv.json.storage[str][level]["capacity"];
                    bar2Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_2)]["capacity"];
                    bar2MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_2]["capacity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityElixir);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                break;
            case gv.buildingSTR.storage_3:
                this.visibleBar(true, true, false);
                bar1Length = gv.json.storage[str][level]["hitpoints"];
                bar1Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_3)]["hitpoints"];
                bar1MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_3]["hitpoints"];
                if (constructType == gv.constructType.info){
                    bar2Length = b._currentCapacity;
                    bar2MaxLength = gv.json.storage[str][level]["capacity"];
                }
                else{
                    bar2Length = gv.json.storage[str][level]["capacity"];
                    bar2Length2 = gv.json.storage[str][Math.min(level + 1, gv.buildingMaxLevel.storage_3)]["capacity"];
                    bar2MaxLength = gv.json.storage[str][gv.buildingMaxLevel.storage_3]["capacity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconCapacityElixir);
                preText1 = "Máu: ";
                preText2 = "Sức chứa: ";
                break;
            case gv.buildingSTR.defence_1:
                this.visibleBar(true, true, false);
                bar1Length = gv.json.defence[str][level]["hitpoints"];
                bar1Length2 = gv.json.defence[str][Math.min(level + 1, gv.buildingMaxLevel.defence_1)]["hitpoints"];
                bar1MaxLength = gv.json.defence[str][gv.buildingMaxLevel.defence_1]["hitpoints"];
                bar2Length = gv.json.defence[str][level]["damagePerShot"];
                bar2Length2 = gv.json.defence[str][Math.min(level + 1, gv.buildingMaxLevel.defence_1)]["damagePerShot"];
                bar2MaxLength = gv.json.defence[str][gv.buildingMaxLevel.defence_1]["damagePerShot"];
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconDameDef);
                preText1 = "Máu: ";
                preText2 = "Sát thương: ";
                break;
            case gv.buildingSTR.lab:
                this.visibleBar(true, false, false);
                bar1Length = gv.json.laboratory[str][level]["hitpoints"];
                bar1Length2 = gv.json.laboratory[str][Math.min(level + 1, gv.buildingMaxLevel.lab)]["hitpoints"];
                bar1MaxLength = gv.json.laboratory[str][gv.buildingMaxLevel.lab]["hitpoints"];
                // bar2Length = gv.json.laboratory[str][level]["damagePerShot"];
                // bar2MaxLength = gv.json.laboratory[str][gv.buildingMaxLevel.storage_2]["damagePerShot"];
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                // this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconDameDef);
                preText1 = "Máu: ";
                // preText2 = "Sát thương: ";
                break;
            case gv.buildingSTR.clanCastle:
                this.visibleBar(true, true, false);
                bar1Length = (level==0)? 0: gv.json.clanCastle[str][level]["hitpoints"];
                bar1Length2 = gv.json.clanCastle[str][Math.min(level + 1, gv.buildingMaxLevel.clanCastle)]["hitpoints"];
                bar1MaxLength = gv.json.clanCastle[str][gv.buildingMaxLevel.clanCastle]["hitpoints"];
                if (constructType == gv.constructType.upgrade)
                {
                    bar2Length = (level==0)? 0: gv.json.clanCastle[str][level]["troopCapacity"];
                    bar2Length2 = gv.json.clanCastle[str][Math.min(level + 1, gv.buildingMaxLevel.clanCastle)]["troopCapacity"];
                    bar2MaxLength = gv.json.clanCastle[str][gv.buildingMaxLevel.clanCastle]["troopCapacity"];
                }
                else
                {
                    bar2Length = cf.user._buildingList[gv.orderInUserBuildingList.clanCastle][0].getCurrentHousingSpace();
                    bar2MaxLength = gv.json.clanCastle[str][level]["troopCapacity"];
                }
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                this.replaceIconBar(this._orderBar.bar2, res.upgradeBuildingGUI.iconTroopCapacity);
                break;
            case gv.buildingSTR.wall:
                this.visibleBar(true, false, false);
                bar1Length = (level==0) ? 0:gv.json.wall[str][level]["hitpoints"];
                bar1Length2 = gv.json.wall[str][Math.min(level + 1, gv.buildingMaxLevel.wall)]["hitpoints"];
                bar1MaxLength = gv.json.wall[str][gv.buildingMaxLevel.wall]["hitpoints"];
                this.replaceIconBar(this._orderBar.bar1, res.upgradeBuildingGUI.hpIcon);
                break;
            default:
                break;
        }

        /* ẩn barBG nếu là xme thông tin nhà */
        if (constructType == gv.constructType.info)
        {
            bar1MaxLength = bar1Length;
            this._bar1BG2.visible = false;
            this._bar2BG2.visible = false;
            this._bar3BG2.visible = false;
            this._bar1TXT.setString(preText1 + (bar1Length + "/" + bar1MaxLength));
            this._bar2TXT.setString(preText2 + (bar2Length + "/" + bar2MaxLength));
            if ([gv.buildingSTR.resource_1, gv.buildingSTR.resource_2, gv.buildingSTR.resource_3].indexOf(str) == -1)
                this._bar3TXT.setString(preText3 + (bar3Length + "/" + bar3MaxLength))
            else
                this._bar3TXT.setString(preText3 + (bar3Length + "/H"));
        }
        else
        {
            this._bar1BG2.setTextureRect(cc.rect(0, 0, bar1Length2/bar1MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));
            this._bar2BG2.setTextureRect(cc.rect(0, 0, bar2Length2/bar2MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));
            this._bar3BG2.setTextureRect(cc.rect(0, 0, bar3Length2/bar3MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));
            this._bar1TXT.setString(preText1 + bar1Length + " (+" + (bar1Length2 - bar1Length) + ")");
            this._bar2TXT.setString(preText2 + bar2Length + " (+" + (bar2Length2 - bar2Length) + ")");
            this._bar3TXT.setString(preText3 + bar3Length + " (+" + (bar3Length2 - bar3Length) + ")");
        }


        this._bar1.setTextureRect(cc.rect(0, 0, bar1Length/bar1MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));
        this._bar2.setTextureRect(cc.rect(0, 0, bar2Length/bar2MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));
        this._bar3.setTextureRect(cc.rect(0, 0, bar3Length/bar3MaxLength * cf.popUpGUI_Construct.barWidth, cf.popUpGUI_Construct.barHeight));

    },

    updateIcon: function(str, level, size, name, status, constructType, tmpLevel)
    {
        /* invisible All Bar */
        //this.visibleBar(false, false, false);

        if(this.getChildByTag(this._TAG_ICON))
            this.removeChildByTag(this._TAG_ICON);
        if (this.getChildByTag(this._TAG_GRASS))
            this.removeChildByTag(this._TAG_GRASS);
        if (this.getChildByTag(this._TAG_EFFECT))
            this.removeChildByTag(this._TAG_EFFECT);

        /* Title Bar */
        this._txtTitle.setString(((this._constructType == gv.constructType.upgrade) ? "Nâng lên " : "") + name + " cấp " + (level));

        /* Require*/
        var gold = null;
        var elixir = null;
        var darkElixir = null;
        var coin = null;
        var time = null;

        switch(str)
        {
            case gv.buildingSTR.townHall:
                time = gv.json.townHall[str][level]["buildTime"];
                gold = gv.json.townHall[str][level]["gold"];
                elixir = 0;
                darkElixir = gv.json.townHall[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.builderHut:
                time = 0;
                gold = 0;
                elixir = 0;
                darkElixir = 0;
                coin = gv.json.builderHut[str][level]["coin"];
                break;
            case gv.buildingSTR.armyCamp_1:
                time = gv.json.armyCamp[str][level]["buildTime"];
                gold = 0;
                elixir = gv.json.armyCamp[str][level]["elixir"];
                darkElixir = gv.json.armyCamp[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.barrack_1:
                time = gv.json.barrack[str][level]["buildTime"];
                gold = 0;
                elixir = gv.json.barrack[str][level]["elixir"];
                darkElixir = gv.json.barrack[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.resource_1:
                time = gv.json.resource[str][level]["buildTime"];
                gold = gv.json.resource[str][level]["gold"];
                elixir = gv.json.resource[str][level]["elixir"];
                darkElixir = gv.json.resource[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.resource_2:
                time = gv.json.resource[str][level]["buildTime"];
                gold = gv.json.resource[str][level]["gold"];
                elixir = gv.json.resource[str][level]["elixir"];
                darkElixir = gv.json.resource[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.storage_1:
                time = gv.json.storage[str][level]["buildTime"];
                gold = gv.json.storage[str][level]["gold"];
                elixir = gv.json.storage[str][level]["elixir"];
                darkElixir = gv.json.storage[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.storage_2:
                time = gv.json.storage[str][level]["buildTime"];
                gold = gv.json.storage[str][level]["gold"];
                elixir = gv.json.storage[str][level]["elixir"];
                darkElixir = gv.json.storage[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.storage_3:
                time = gv.json.storage[str][level]["buildTime"];
                gold = gv.json.storage[str][level]["gold"];
                elixir = gv.json.storage[str][level]["elixir"];
                darkElixir = gv.json.storage[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.defence_1:
                time = gv.json.defence[str][level]["buildTime"];
                gold = gv.json.defence[str][level]["gold"];
                elixir = 0;
                darkElixir = gv.json.defence[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.obstacle:
                time = gv.json.obstacle[str][level]["buildTime"];
                break;
            case gv.buildingSTR.lab:
                time = gv.json.laboratory[str][level]["buildTime"];
                gold = 0;
                elixir = gv.json.laboratory[str][level]["elixir"];
                darkElixir = gv.json.laboratory[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.clanCastle:
                time = gv.json.clanCastle[str][level]["buildTime"];
                gold = gv.json.clanCastle[str][level]["gold"];
                elixir = 0;
                darkElixir = gv.json.clanCastle[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.wall:
                time = gv.json.wall[str][level]["buildTime"];
                gold = gv.json.wall[str][level]["gold"];
                elixir = 0;
                darkElixir = gv.json.wall[str][level]["darkElixir"];
                coin = 0;
                break;
            default:
                break;
        }

        this._cost.gold = gold;
        this._cost.elixir = elixir;
        this._cost.darkElixir = darkElixir;
        this._cost.coin = coin;

        this._require.gold = Math.max(0, this._cost.gold - cf.user._currentCapacityGold);
        this._require.elixir = Math.max(0, this._cost.elixir - cf.user._currentCapacityElixir);
        this._require.darkElixir = Math.max(0, this._cost.darkElixir - cf.user._currentCapacityDarkElixir);
        this._require.coin = Math.max(0, this._cost.coin - cf.user._currentCapacityCoin);

        /* Time Require */
        if (this._constructType == gv.constructType.upgrade)
        {
            var t = cf.secondsToLongTime(time);
            t = (t!="") ? t : "0s";
            this._timeRequireTXT.setString("" + t);
            this.onVisibleTimeRequire(true);
        }
        else
        {
            this.onVisibleTimeRequire(false);
        }

        /* Resource Require */
        if (this.getChildByTag(this._TAG_CONTENT_REQUIRE))
            this.removeChildByTag(this._TAG_CONTENT_REQUIRE);
        if (this._constructType == gv.constructType.upgrade)
        {
            var tmp = new PopUpConstruct.getNodeResourceRequire_upgrade(gold, elixir, darkElixir, coin);
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_REQUIRE);
        }

        this.updateContentOptional();

        /* Center Icon */
        switch(str)
        {
            case gv.buildingSTR.townHall:
                this._icon = cc.Sprite(res.folder_town_hall + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.builderHut:
                this._icon = cc.Sprite(res.folder_builder_hut + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.armyCamp_1:
                this._icon = cc.Sprite(res.folder_army_camp + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);;
                break;
            case gv.buildingSTR.barrack_1:
                this._icon = cc.Sprite(res.folder_barrack + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_1:
                this._icon = cc.Sprite(res.folder_gold_mine + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_2:
                this._icon = cc.Sprite(res.folder_elixir_collector + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_1:
                this._icon = cc.Sprite(res.folder_gold_storage + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_2:
                this._icon = cc.Sprite(res.folder_elixir_storage + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_3:
                this._icon = cc.Sprite(res.folder_dark_elixir_storage + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.defence_1:
                this._icon = cc.Sprite(res.folder_defense_base + str + "_" + level + "_Shadow.png");
                break;
            case gv.buildingSTR.obstacle:
                this._icon = cc.Sprite(res.folder_obs + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.lab:
                this._icon = cc.Sprite(res.folder_laboratory + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.clanCastle:
                this._icon = cc.Sprite(res.folder_clan_castle + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.wall:
                this._icon = cc.Sprite(res.folder_wall + str + "_" + level + "/" + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            default:
                break;
        }
        this._icon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0.75
        });
        this._icon.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._icon, 2, this._TAG_ICON);

        /* Grass */
        this._grass = new grass(size);
        this._grass.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 1.5,
        })
        this._grass.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._grass, 1, this._TAG_GRASS);

        /* Effect */
        var arrNoEffect = [gv.buildingSTR.builderHut, gv.buildingSTR.storage_1, gv.buildingSTR.storage_2, gv.buildingSTR.storage_3];
        if ((str == gv.buildingSTR.barrack_1 && (level <4 || level >8)) || arrNoEffect.indexOf(str) >= 0 || (str == gv.buildingSTR.lab && level <2)) return;
        if (str == gv.buildingSTR.clanCastle || str === gv.buildingSTR.wall) return;

        if (str != gv.buildingSTR.armyCamp_1 && str != gv.buildingSTR.townHall && str != gv.buildingSTR.defence_1)
            this._effect = cc.Sprite("#res/Art/Effects/" + str + "_" + level + "_effect/00.png");
        if (str == gv.buildingSTR.armyCamp_1)
            this._effect = cc.Sprite("#res/Art/Effects/armycam_1/00.png");
        if (str == gv.buildingSTR.townHall)
            this._effect = cc.Sprite("#res/Art/Effects/towhall_flame/00.png");
        if (str == gv.buildingSTR.defence_1){
            this._effect = cc.Sprite(res.folder_canon + level + "/" + res.image_postfix_1 + Math.floor(Math.random()*4) + res.image_postfix_2);
        }

        this._effect.attr({
            anchorX: 0.5,
            anchorY: (str == gv.buildingSTR.armyCamp_1) ? 0 : 0.5,
            scale: (str == gv.buildingSTR.resource_1 || str == gv.buildingSTR.resource_2)? 0.75 : 1,
        });
        this._effect.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._effect, 2, this._TAG_EFFECT);
    },

    /* Hiển thị phần thời gian yêu cầu*/
    onVisibleTimeRequire: function(boo)
    {
        this._labelTimeRequire.setVisible(boo);
        this._timeRequireTXT.setVisible(boo);
        this._iconTime.setVisible(boo);
    },

    /* Content cho lính nhà bang hội, lính là trại lính, công trình mở khóa,, ..*/
    updateContentOptional: function()
    {
        /* Troop Amount -- option Clan Castle*/
        if (this.getChildByTag(this._TAG_CONTENT_OPTIONAL))
            this.removeChildByTag(this._TAG_CONTENT_OPTIONAL);
        var buildingId = gv.building_selected;
        var b = cf.user._buildingList[Math.floor(buildingId/100) - 1][Math.floor(buildingId%100)];
        if (this._constructType == gv.constructType.info && b._buildingSTR == gv.buildingSTR.clanCastle
            && fn.getCurrentBuilding(gv.orderInUserBuildingList.clanCastle, 0).getCurrentTroopTypeVsLevel() != 0)
        {
            this.updateDescription("Quân đội");
            var tmp = new PopUpConstruct.getNodeTroopAmount_info_clancastle();
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y + 100
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_OPTIONAL);
        };

        /* Lượng lính trong trại*/
        if (this._constructType == gv.constructType.info && b._buildingSTR == gv.buildingSTR.armyCamp_1
            && cf.user.getTroopAmount() != 0)
        {
            this.updateDescription("Quân đội");
            var tmp = new PopUpConstruct.getNodeTroopAmount_info_armyCamp();
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y + 100
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_OPTIONAL);
        };

        /* Lính mở khóa nâng cấp nhà barrack*/
        if (this._constructType == gv.constructType.upgrade && b._buildingSTR == gv.buildingSTR.barrack_1)
        {
            this.updateDescription("Mở khóa");
            var tmp = new PopUpConstruct.getNodeTroopUnlocked_barrack_upgrade();
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y + 100
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_OPTIONAL);
        };

        /* Mở khóa công trình khi nâng cấp nhà chính*/
        if (this._constructType == gv.constructType.upgrade && b._buildingSTR == gv.buildingSTR.townHall)
        {
            this.updateDescription("Mở khóa");
            var tmp = new PopUpConstruct.getNodeBuildingUnlocked_upgrade_townhall();
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y + 100
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_OPTIONAL);
        };
    },
    updateDescription: function(description)
    {
        this._txtDescreption.visible = true;
        this._txtDescreption.setString(description)
    }
})

/* Tài nguyên yêu cầu cho popUp nâng cấp công trình*/
PopUpConstruct.getNodeResourceRequire_upgrade = cc.Node.extend({
    txtGold: null,
    txtElixir: null,
    txtDarkElixir: null,
    txtCoin: null,

    iconGold: null,
    iconElixir: null,
    iconDarkElixir: null,
    iconCoin: null,

    ctor: function(gold, elixir, darkElixir, coin)
    {
        var sum = 0;
        sum += (gold != 0) ? 1 : 0;
        sum += (elixir != 0) ? 1 : 0;
        sum += (darkElixir != 0) ? 1 : 0;
        sum += (coin != 0) ? 1 : 0;
        this._super();
        if (gold != 0)
        {
            this.txtGold = cc.LabelBMFont(gold, font.soji20);
            this.txtGold.setColor(cc.color(255, 255, 255, 255));
            this.txtGold.setAnchorPoint(1, 0.5);
            this.txtGold.setPosition(cc.p(0, sum / 2 * this.txtGold.height));
            if (gold > cf.user._currentCapacityGold)
            {
                this.txtGold.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
                gv.upgradeAble.gold = gold - cf.user._currentCapacityGold;
            }
            else
                gv.upgradeAble.gold = 0;
            this.addChild(this.txtGold, 0);

            this.iconGold = cc.Sprite(res.upgradeBuildingGUI.iconGold);
            this.iconGold.setAnchorPoint(cc.p(1, 0.5));
            this.iconGold.setPosition(cc.p(40, this.txtGold.y));
            this.addChild(this.iconGold, 0);
        };
        if (elixir != 0)
        {
            this.txtElixir = cc.LabelBMFont(elixir, font.soji20);
            this.txtElixir.setColor(cc.color(255, 255, 255, 255));
            this.txtElixir.setAnchorPoint(1, 0.5);
            this.txtElixir.setPosition(cc.p(0, (sum-1) / 2 * this.txtElixir.height));
            if (elixir > cf.user._currentCapacityElixir)
            {
                this.txtElixir.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
                gv.upgradeAble.elixir = elixir - cf.user._currentCapacityElixir;
            }
            else
                gv.upgradeAble.elixir = 0;

            this.addChild(this.txtElixir, 0);

            this.iconElixir = cc.Sprite(res.upgradeBuildingGUI.iconElixir);
            this.iconElixir.setAnchorPoint(cc.p(1, 0.5));
            this.iconElixir.setPosition(cc.p(40, this.txtElixir.y));
            this.addChild(this.iconElixir, 0);
        };
        if (darkElixir != 0)
        {
            this.txtDarkElixir = cc.LabelBMFont(darkElixir, font.soji20);
            this.txtDarkElixir.setColor(cc.color(255, 255, 255, 255));
            this.txtDarkElixir.setAnchorPoint(1, 0.5);
            this.txtDarkElixir.setPosition(cc.p(0, -(sum-1) / 2 * this.txtDarkElixir.height));
            if (darkElixir > cf.user._currentCapacityDarkElixir)
            {
                this.txtDarkElixir.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
                gv.upgradeAble.darkElixir = darkElixir - cf.user._currentCapacityDarkElixir;
            }
            else
                gv.upgradeAble.darkElixir = 0;
            this.addChild(this.txtDarkElixir, 0);

            this.iconDarkElixir = cc.Sprite(res.upgradeBuildingGUI.iconDarkElixir);
            this.iconDarkElixir.setAnchorPoint(cc.p(1, 0.5));
            this.iconDarkElixir.setPosition(cc.p(40, this.txtDarkElixir.y));
            this.addChild(this.iconDarkElixir, 0);
        };
        if (coin != 0)
        {
            this.txtCoin = cc.LabelBMFont(coin, font.soji20);
            this.txtCoin.setColor(cc.color(255, 255, 255, 255));
            this.txtCoin.setAnchorPoint(1, 0.5);
            this.txtCoin.setPosition(cc.p(0, -sum / 2 * this.txtCoin.height));
            if (coin > cf.user._currentCapacityCoin)
            {
                this.txtCoin.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
                gv.upgradeAble.coin = coin - cf.user._currentCapacityCoin
            }
            else
                gv.upgradeAble.coin =0;
            this.addChild(this.txtCoin, 0);

            this.iconCoin = cc.Sprite(res.upgradeBuildingGUI.iconCoin);
            this.iconCoin.setAnchorPoint(cc.p(1, 0.5));
            this.iconCoin.setPosition(cc.p(40, this.txtCoin.y));
            this.addChild(this.iconCoin, 0);
        };

    },


})
/* Lượng lính trong nhà bang hội*/
PopUpConstruct.getNodeTroopAmount_info_clancastle = cc.Node.extend({
    ctor: function()
    {
        this._super();
        var troopAmountArr = this.getTroopAmountFromClanCastle();
        // số lượng loại lính với level khác nhau
        var troopDef = fn.getUserBuilding(gv.orderInUserBuildingList.clanCastle, 0).getCurrentTroopTypeVsLevel();
        var scrollView = ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        scrollView.width = Math.min(troopDef * 120, cc.winSize.width*4/5);
        scrollView.height = 120;
        scrollView.setInnerContainerSize(cc.size(120 * troopDef, 120));
        scrollView.setAnchorPoint(0.5, 0.5);
        this.addChild(scrollView);

        var xStart = 30;
        for (var i = 0; i < cf.clanChat.troopDonateLength; i++)
            for (var j = 1; j <= cf.clanChat.troopDonateLevel; j++)
            {
                var troopAmount = troopAmountArr[i][j];
                if (troopAmount != 0)
                {
                    var iconTroop = cc.Sprite(res.troopIconInPopUpBuilding[i]);
                    iconTroop.scale = 1.5;
                    iconTroop.setPosition(xStart + iconTroop.width/2 + 5, 60);
                    scrollView.addChild(iconTroop);
                    var labelAmount = cc.LabelBMFont("x" + troopAmount, font.fista24);
                    labelAmount.setColor(cc.color(0, 0, 0, 255));
                    labelAmount.setScale(1.2);
                    labelAmount.setPosition(xStart, iconTroop.y - 30);
                    scrollView.addChild(labelAmount);
                    var labelLevel = cc.LabelBMFont("Lv " + j, font.soji20);
                    labelLevel.setColor(cc.color(255, 0, 255, 255));
                    labelLevel.setPosition(xStart + 50, iconTroop.y + 30);
                    scrollView.addChild(labelLevel);
                    xStart += 120;
                }
            }
    },

    getTroopAmountFromClanCastle: function()
    {
        var arr = [];
        var clanCastle = fn.getUserBuilding(gv.orderInUserBuildingList.clanCastle, 0);
        return clanCastle._troopReceive;
        for (var i=0; i<cf.clanChat.troopDonateLength; i++)
        {
            var s = 0;
            for (var j=0; j<cf.clanChat.troopDonateLevel-1; j++)
                s += clanCastle._troopReceive[i][j];
            arr[i] = s;
        }
        return arr;
    }

});
/* Lượng lính trong trại lính*/
PopUpConstruct.getNodeTroopAmount_info_armyCamp = cc.Node.extend({
    ctor: function()
    {
        this._super();
        var iconWidth = 120;
        var iconHeight = 120;
        var iconTroopAmount = 0;
        for (var i=0; i < cf.clanChat.troopDonateLength; i++)
            if(cf.user.getTroopAmount(i) != 0) iconTroopAmount ++;
        var scrollView = ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        scrollView.width = Math.min(cf.user.getTroopUnique() * iconWidth, cc.winSize.width*3.7/5);
        scrollView.height = iconHeight;
        scrollView.setInnerContainerSize(cc.size(iconWidth * iconTroopAmount, iconHeight));
        scrollView.setAnchorPoint(0.5, 0.5);
        this.addChild(scrollView);

        var xStart = 30;
        for (var i = 0; i < cf.clanChat.troopDonateLength; i++) {
            var troopAmount = cf.user.getTroopAmount(i);
            if (troopAmount != 0)
            {
                var iconTroop = cc.Sprite(res.troopIconInPopUpBuilding[i]);
                iconTroop.scale = 1.5;
                iconTroop.setPosition(xStart + iconTroop.width/2 + 5, 60);
                scrollView.addChild(iconTroop);
                var labelAmount = cc.LabelBMFont("x" + troopAmount, font.fista24);
                labelAmount.setColor(cc.color(0, 0, 0, 255));
                labelAmount.setScale(1.2);
                labelAmount.setPosition(xStart, iconTroop.y - 30);
                scrollView.addChild(labelAmount);
                var labelLevel = cc.LabelBMFont("Lv " + cf.user.getTroopLevel(i), font.soji20);
                labelLevel.setColor(cc.color(255, 0, 255, 255));
                labelLevel.setPosition(xStart + 50, iconTroop.y + 30);
                scrollView.addChild(labelLevel);
                xStart += 120;
            }
        }
    },
});
/* Lính mở khóa khi nâng cấp nhà barrack*/
PopUpConstruct.getNodeTroopUnlocked_barrack_upgrade = cc.Node.extend({
    ctor: function()
    {
        this._super();
        var iconWidth = 120;
        var iconHeight = 120;
        var iconTroopAmount = 1;
        var scrollView = ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        scrollView.width = iconTroopAmount * iconWidth;
        scrollView.height = iconHeight;
        scrollView.setInnerContainerSize(cc.size(iconWidth * iconTroopAmount, iconHeight));
        scrollView.setAnchorPoint(0.5, 0.5);
        this.addChild(scrollView);

        var building = fn.getCurrentBuilding();
        var troopUnlocked = building._jsonConfig[building._buildingSTR][Math.min(building._level+1, building._maxLevel)]["unlockedUnit"];
        troopUnlocked = troopUnlocked.substr(4, troopUnlocked.length-4) - 1;

        var iconTroop = cc.Sprite(res.troopIconInPopUpBuilding[troopUnlocked]);
        iconTroop.scale = 1.5;
        iconTroop.setPosition(30 + iconTroop.width/2 + 5, 60);
        scrollView.addChild(iconTroop);
    },
});
/* Các công trình mở khóa khi nâng cấp nhà chính*/
PopUpConstruct.getNodeBuildingUnlocked_upgrade_townhall = cc.Node.extend({
    ctor: function()
    {
        this._super();
        var iconWidth = 120;
        var iconHeight = 120;
        var buildingUnlockedAmount = 0;
        var building = fn.getCurrentBuilding();
        var buildingJSON = building._jsonConfig[building._buildingSTR][Math.min(building._level+1, building._maxLevel)];
        for (var i=0; i < gv.building_townHall_upgrade_STR.length; i++)
            if(buildingJSON[gv.building_townHall_upgrade_STR[i]] != 0) buildingUnlockedAmount ++;
        var scrollView = ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        scrollView.width = Math.min(buildingUnlockedAmount * iconWidth, cc.winSize.width*3.5/5);
        scrollView.height = iconHeight;
        scrollView.setInnerContainerSize(cc.size(iconWidth * buildingUnlockedAmount, iconHeight));
        scrollView.setAnchorPoint(0.5, 0.5);
        this.addChild(scrollView);

        var xStart = -50;
        for (var i = 0; i < gv.building_townHall_upgrade_STR.length; i++) {
            var buildingAmount = buildingJSON[gv.building_townHall_upgrade_STR[i]];
            if (buildingAmount != 0)
            {
                var centerIcon = cc.Sprite(res.building_townHall_upgrade_icon[i]);
                centerIcon.scale = 0.5;
                centerIcon.setPosition(xStart + iconWidth, 60);
                scrollView.addChild(centerIcon, 1);
                var slot = cc.Sprite(res.upgradeBuildingGUI.iconSlot);
                slot.setPosition(centerIcon.x, centerIcon.y);
                scrollView.addChild(slot, 0);
                if (res.building_townHall_upgrade_effect[i] != "none")
                {
                    var effect = cc.Sprite(res.building_townHall_upgrade_effect[i]);
                    effect.scale = 0.5;
                    effect.setPosition(centerIcon.x, (gv.building_townHall_upgrade_STR[i] == "AMC_1" ? 20 : 0 ) + centerIcon.y);
                    scrollView.addChild(effect, 1);
                }
                var labelAmount = cc.LabelBMFont("x" + buildingAmount, font.fista24);
                labelAmount.setColor(cc.color(0, 0, 0, 255));
                labelAmount.setScale(1.2);
                labelAmount.setPosition(centerIcon.x - 30, centerIcon.y - 30);
                scrollView.addChild(labelAmount, 1);
                if (cf.user.getBuildingCount(gv.building_townHall_upgrade_order[i]) == 0)
                {
                    var iconNew = cc.Sprite(shopGUI.iconSale);
                    iconNew.setScale(0.65);
                    iconNew.setAnchorPoint(1, 0);
                    iconNew.setPosition(centerIcon.x, centerIcon.y);
                    scrollView.addChild(iconNew, 1);
                    var labelNew = fn.commonLabel("Mới", font.soji20, 1, 1);
                    labelNew.setScale(0.75);
                    labelNew.setRotation(-45);
                    labelNew.setAnchorPoint(1, 0);
                    labelNew.setPosition(centerIcon.x - 8, centerIcon.y + 30);
                    scrollView.addChild(labelNew, 1);
                }

                xStart += 120;
            }
        }
    },
});