var PopUpTroopInfo = cc.Node.extend({

    _bg: null,
    _txtTitle: null,
    _btnClose: null,
    _btnOk: null,
    _bgWhite: null,

    _troopOrder: null,          // Tu 1..
    _level: null,
    _resourceRequire: null,

    _icon: null,
    _grass: null,
    _resIcon: null,

    _txtTroopTitle: null,
    _labelTime: null,

    _swallowTouch: null,

    _upgradeAble: null,

    _colorBg: null,

    _bar1: null,
    _bar1BG: null,
    _bar1BG2: null,
    _bar1TXT: null,
    _bar1TXT2: null,
    _bar1Icon: null,

    _bar2: null,
    _bar2BG: null,
    _bar2BG2: null,
    _bar2TXT: null,
    _bar2TXT2: null,
    _bar2Icon: null,

    _bar3: null,
    _bar3BG: null,
    _bar3BG2: null,
    _bar3TXT: null,
    _bar3TXT2: null,
    _bar3Icon: null,

    _offSetBar : 50,

    _labelFavoriteTarget: null,
    _labelAttackType: null,
    _labelAttackArea: null,
    _labelMoveSpeed: null,
    _labelTimeTraining: null,
    _labelHousingSpace: null,

    ctor: function(troopOrder)
    {
        this._super();
        this._troopOrder = troopOrder;
        this._level = cf.user._listTroopLevel[troopOrder-1];
        this.init();
        this.loadSummary();
        this.loadBar();
        this.loadResourceRequire();
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
        this.addChild(this._colorBG, -1);
        this.addTouchListener();


        /* Text Title */
        this._txtTitle = cc.LabelBMFont(fr.Localization.getInstance().getText("troopInfo_" + (this._troopOrder-1) + "_name") + " cấp "+ (cf.user._listTroopLevel[this._troopOrder-1] + 1), font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 1));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 - this._txtTitle.height/2));
        this.addChild(this._txtTitle, 1);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = 1.2;
        this._btnClose.setPosition(cc.p(this._bg.width/2 - this._btnClose.width, this._bg.height/2 - this._btnClose.height / 1.5));
        this.addChild(this._btnClose, 1);
        this._btnClose.addClickEventListener(function(){
            self.onDisappear();
        });

        this._grass = cc.Sprite(res.researchTroopGUI.grass);
        this._grass.setAnchorPoint(cc.p(0.5, 0));
        this._grass.scale = 0.75;
        this._grass.setPosition(cc.p(-300, -50));
        this.addChild(this._grass, 2);

        this._bgWhite = cc.Sprite(res.researchTroopGUI.spanWhite);
        this._bgWhite.setPosition(cc.p(0, - this._bgWhite.height * 1.5 - 30));
        this._bgWhite.setScaleX(1.3);
        this._bgWhite.setScaleY(1.1);
        this.addChild(this._bgWhite, 0);

        this._icon = cc.Sprite(researchTroopFolderTroopIcon + "ARM_" + this._troopOrder + "_" + (this._level + 1) + ".png");
        this._icon.setAnchorPoint(cc.p(0.5, 0));
        this._icon.scale = 0.75;
        this._icon.setPosition(cc.p(this._grass.x, this._grass.y));
        this.addChild(this._icon, 3);

        this._labelTime = cc.LabelBMFont("Thời gian nâng cấp", font.soji20);
        this._labelTime.setPosition(this._grass.x, this._grass.y - 20);
        this._labelTime.setAnchorPoint(0.5, 0.5);
        this._labelTime.scale = 1;
        this.addChild(this._labelTime, 4);

        this._labelTimeNum = cc.LabelBMFont(cf.secondsToLongTime(gv.json.troop["ARM_" + this._troopOrder][this._level + 1]["researchTime"]), font.soji20);
        this._labelTimeNum.setPosition(this._grass.x, this._labelTime.y - 30);
        this._labelTimeNum.setAnchorPoint(0.5, 0.5);
        this._labelTimeNum.scale = 1;
        this.addChild(this._labelTimeNum, 4);

        this._btnOk = ccui.Button(logInGUI.btnOk);
        this._btnOk.setPosition(0, - this._bg.height/2 + 80);
        this._btnOk.setScaleY(2.5);
        this._btnOk.setScaleX(2);
        this.addChild(this._btnOk, 3);
        this._btnOk.addClickEventListener(function(){
            if (self._troopOrder > cf.clanChat.troopDonateLength)
            {
                fr.getCurrentScreen().popUpMessage("Không cho phép nâng\n loại lính này 1");
                self.onDisappear();
                return;
            };
            if (self._upgradeAble)
            {
                cf.user._currentCapacityElixir -= this._resourceRequire;
                cf.user.distributeResource(false, true, false);
                self.getParent()._popUpResearchTroop.onResearchTroop(self._troopOrder);
                self.onDisappear();
            }
            else
            {
                self.getParent().popUpMessage("Chưa đủ tài nguyên");
                self.onDisappear();
            }
        }.bind(this));
    },

    /*Thông tin troop base: mục tiêu ưa thích, tốc độ, ..*/
    loadSummary: function()
    {
        var xPos = 170;
        var yPos = 0;
        var yDis = 22;

        var troopOrder = this._troopOrder-1;
        this._labelFavoriteTarget = fn.commonLabel("Mục tiêu ưa thích: " + gv.troopInfo.favoriteTarget[troopOrder], font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelFavoriteTarget.setPosition(xPos, yPos);
        this.addChild(this._labelFavoriteTarget, 2);
        yPos -= yDis;

        this._labelAttackType = fn.commonLabel("Hình thức tấn công: " + gv.troopInfo.attackType[troopOrder], font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelAttackType.setPosition(xPos, yPos);
        this.addChild(this._labelAttackType, 2);
        yPos -= yDis;

        this._labelAttackArea = fn.commonLabel("Mục tiêu: " + gv.troopInfo.attackArea[troopOrder], font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelAttackArea.setPosition(xPos, yPos);
        this.addChild(this._labelAttackArea, 2);
        yPos -= yDis;

        this._labelMoveSpeed = fn.commonLabel("Tốc độ di chuyển: " + gv.troopInfo.moveSpeed[troopOrder], font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelMoveSpeed.setPosition(xPos, yPos);
        this.addChild(this._labelMoveSpeed, 2);
        yPos -= yDis;

        this._labelTimeTraining = fn.commonLabel("Thời gian luyện: " + gv.troopInfo.timeTraining[troopOrder] + " giây", font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelTimeTraining.setPosition(xPos, yPos);
        this.addChild(this._labelTimeTraining, 2);
        yPos -= yDis;

        this._labelHousingSpace = fn.commonLabel("Chỗ ở: " + gv.troopInfo.housingSpace[troopOrder], font.fista24, 1, 1, cc.color(96, 32, 32, 255));
        this._labelHousingSpace.setPosition(xPos, yPos);
        this.addChild(this._labelHousingSpace, 2);
    },

    onStartResearch: function()
    {

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
            cc.CallFunc(function(){
                self.setPosition(cc.winSize.width/2, cc.winSize.height/2);
                self.setScaleX(0.25);
            }),
            cc.scaleTo(0.15, 1, 1)
        );
        this.runAction(appear);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);

        var self = this;
        var disAppear = cc.Sequence.create(
            cc.scaleTo(0.15, 0.25, 1),
            cc.CallFunc(function(){
                self.setPosition(cc.winSize.width/2, - cc.winSize.height/2);
            })
        );
        this.runAction(disAppear);
    },

    loadBar: function()
    {
        // +++++ BAR 1 ===============================================
        /* HP Bar BG */
        this._bar1BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar1BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2
        });
        this.addChild(this._bar1BG, 2);

        this._bar1BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar1BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2
        });
        this._bar1BG2.runAction(cc.tintTo(0, 204, 204, 0));
        this.addChild(this._bar1BG2, 2);

        /* Hp Bar */
        this._bar1 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar1.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height / 2
        });
        this.addChild(this._bar1, 2);

        /* Hp Icon */
        this._bar1Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar1Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: 0.5 * this._bg.height  / 2,
            visible: true,
        });
        this.addChild(this._bar1Icon, 2);


        /* Hp TXT */
        this._bar1TXT = cc.LabelBMFont("Máu", font.soji20);
        this._bar1TXT.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar1BG.x + this._bar1.width/2,
            y: this._bar1BG.y + 5,
            scale: 0.75,
        });
        this.addChild(this._bar1TXT, 2);

        this._bar1TXT2 = cc.LabelBMFont("0000", font.soji20);
        this._bar1TXT2.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar1TXT.x,
            y: this._bar1TXT.y - 18,
            scale: 0.75,
        });
        this.addChild(this._bar1TXT2, 2);

        // +++++ BAR 2 =============================================
        /* HP Bar BG */
        this._bar2BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar2BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this.addChild(this._bar2BG, 2);

        this._bar2BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar2BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this._bar2BG2.runAction(cc.tintTo(0, 204, 204, 0));
        this.addChild(this._bar2BG2, 2);


        /* Hp Bar */
        this._bar2 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar,
        });
        this.addChild(this._bar2, 2);


        /* Hp Icon */
        this._bar2Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar2Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height  / 10,
            y: this._bar1BG.y - this._offSetBar,
            visible: true,
        });
        this.addChild(this._bar2Icon, 2);

        /* Hp TXT */
        this._bar2TXT = cc.LabelBMFont("Sát thương", font.soji20);
        this._bar2TXT.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar2BG.x + this._bar2.width/2,
            y: this._bar2BG.y + 5,
            scale: 0.75,
        });
        this.addChild(this._bar2TXT, 2);

        this._bar2TXT2 = cc.LabelBMFont("0000", font.soji20);
        this._bar2TXT2.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar2TXT.x,
            y: this._bar2TXT.y - 18,
            scale: 0.75,
        });
        this.addChild(this._bar2TXT2, 2);

        // +++++ Bar 3 ==============================================
        /* HP Bar BG */
        this._bar3BG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar3BG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this.addChild(this._bar3BG, 2);

        this._bar3BG2 = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._bar3BG2.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this._bar3BG2.runAction(cc.tintTo(0, 204, 204, 0));
        this.addChild(this._bar3BG2, 2);


        /* Hp Bar */
        this._bar3 = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._bar3.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height  / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
        });
        this.addChild(this._bar3, 2);

        /* Hp Icon */
        this._bar3Icon = cc.Sprite(res.upgradeBuildingGUI.hpIcon);
        this._bar3Icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height / 10,
            y: this._bar1BG.y - this._offSetBar * 2,
            visible: true,
        });
        this.addChild(this._bar3Icon, 2);

        /* Hp TXT */
        this._bar3TXT = cc.LabelBMFont("Giá", font.soji20);
        this._bar3TXT.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar3BG.x + this._bar3.width/2,
            y: this._bar3BG.y + 5,
            scale: 0.75,
        });
        this.addChild(this._bar3TXT, 2);

        this._bar3TXT2 = cc.LabelBMFont("0000", font.soji20);
        this._bar3TXT2.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._bar3TXT.x,
            y: this._bar3TXT.y - 18,
            scale: 0.75,
        });
        this.addChild(this._bar3TXT2, 2);

        this.updateBar();
    },

    updateBar: function()
    {
        var nextLevel = this._level + 1;
        var hp0 = gv.json.troop["ARM_" + this._troopOrder][this._level]["hitpoints"];
        var hp1 = gv.json.troop["ARM_" + this._troopOrder][nextLevel]["hitpoints"];
        var hp2 = gv.json.troop["ARM_" + this._troopOrder][gv.troopMaxLevel[this._troopOrder-1]]["hitpoints"];
        this._bar1.setTextureRect(cc.rect(0, 0, this._bar1.width * hp0 / hp2, this._bar1.height));
        this._bar1BG2.setTextureRect(cc.rect( 0, 0, this._bar1BG2.width * hp1 / hp2, this._bar1BG2.height));
        this._bar1TXT2.setString(hp0 + " + " + (hp1-hp0));

        var dame0 = gv.json.troop["ARM_" + this._troopOrder][this._level]["damagePerAttack"];
        var dame1 = gv.json.troop["ARM_" + this._troopOrder][nextLevel]["damagePerAttack"];
        var dame2 = gv.json.troop["ARM_" + this._troopOrder][gv.troopMaxLevel[this._troopOrder-1]]["damagePerAttack"];
        this._bar2.setTextureRect(cc.rect(0, 0, this._bar2.width * dame0 / dame2, this._bar2.height));
        this._bar2BG2.setTextureRect(cc.rect( 0, 0, this._bar2BG2.width * dame1 / dame2, this._bar2BG2.height));
        this._bar2TXT2.setString(dame0 + " + " + (dame1-dame0));

        var cost0 = gv.json.troop["ARM_" + this._troopOrder][this._level]["trainingElixir"];
        var cost1 = gv.json.troop["ARM_" + this._troopOrder][nextLevel]["trainingElixir"];
        var cost2 = gv.json.troop["ARM_" + this._troopOrder][gv.troopMaxLevel[this._troopOrder-1]]["trainingElixir"];
        this._bar3.setTextureRect(cc.rect(0, 0, this._bar3.width * cost0 / cost2, this._bar3.height));
        this._bar3BG2.setTextureRect(cc.rect( 0, 0, this._bar3BG2.width * cost1 / cost2, this._bar3BG2.height));
        this._bar3TXT2.setString(cost0 + " + " + (cost1-cost0));
    },

    loadResourceRequire: function()
    {
        var resourceRequire = gv.json.troop["ARM_" + this._troopOrder][this._level + 1]["researchElixir"];
        this._resourceRequire = resourceRequire;
        this._labelRrequire = cc.LabelBMFont(resourceRequire, font.soji20);
        this._labelRrequire.setPosition(this._btnOk.x, this._btnOk.y);
        this.addChild(this._labelRrequire, this._btnOk.getLocalZOrder() + 1);

        this._resIcon = cc.Sprite("res/Art/GUIs/Main_Gui/elixir_icon.png");
        this._resIcon.setPosition(this._btnOk.x + 80, this._btnOk.y);
        this._resIcon.scale = 1.4;
        this.addChild(this._resIcon, this._btnOk.getLocalZOrder() + 1);

        if (resourceRequire <= cf.user._currentCapacityElixir)
            this._upgradeAble = true;
        else
        {
            this._upgradeAble = false;
            this._labelRrequire.setColor(cc.color(255, 0, 0, 255));
        }
    },
})