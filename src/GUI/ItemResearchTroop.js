var ItemResearchTroop = ccui.Button.extend({
    _avaiable: true,

    _troopOrder: null,
    _troopLevel: null,
    _icon: null,
    _labelLevel: null,
    _txtResource_2: null,
    _txtResource_3: null,
    _iconResource_2: null,
    _iconResource_3: null,
    _bgSmall: null,

    _popUpInfo: null,

    _labelRrequire: null,

    _nodeResource: null,

    _requireRes_1: null,
    _requireRes_2: null,
    _levelLabRequire: null,

    ctor: function(troopOrder, level, researching)
    {
        var self = this;
        this._super(res.researchTroopGUI.slost);
        troopOrder ++;
        this._troopOrder = troopOrder;
        this._level = level;
        this.setCascadeColorEnabled(true);
        this.init();
        this.addClickEventListener(function(){
            self.onPopUpInfo();
        }.bind(self));

        if (researching)
            this.onDisabled(false, "Nhà đang\nnghiên cứu")
    },

    init: function()
    {
        this._bgSmall = cc.Sprite(res.researchTroopGUI.bgSmall);
        this._bgSmall.setPosition(cc.p(this.width / 2,this.height/4 - 8));
        this.addChild(this._bgSmall, 1);

        this._icon = cc.Sprite(researchTroopFolderTroopIcon + "ARM_" + this._troopOrder + "_" + this._level + ".png");
        this._icon.setPosition(cc.p(this.width/2, this.height/2));
        this._icon.scale = 0.4;
        this.addChild(this._icon, 0);

        this._labelLevel = cc.LabelBMFont(this._level, font.soji20);
        this._labelLevel.setColor(cc.color(255, 255, 102, 255));
        this._labelLevel.scale = 0.7;
        this._labelLevel.setPosition(cc.p(20, this.height - 20));
        this.addChild(this._labelLevel, 1);

        this._labelRrequire = cc.LabelBMFont("Chưa đủ Yêu cầu", font.soji20);
        this._labelRrequire.setColor(cc.color(255, 0, 0, 255));
        this._labelRrequire.setPosition(this._bgSmall.x, this._bgSmall.y);
        this._labelRrequire.scale = 0.8;
        this._labelRrequire.visible = false;
        this.addChild(this._labelRrequire, 2);

        var resourceRequire = gv.json.troop["ARM_" + this._troopOrder][this._level + 1]["researchElixir"];
        this._labelRrequire = cc.LabelBMFont(resourceRequire, font.soji20);
        this._labelRrequire.setPosition(this._bgSmall.x, this._bgSmall.y);
        this._labelRrequire.scale = 0.6;
        this.addChild(this._labelRrequire, this._bgSmall.getLocalZOrder() + 1);

        this._resIcon = cc.Sprite("res/Art/GUIs/Main_Gui/elixir_icon.png");
        this._resIcon.setPosition(this._bgSmall.x + 35, this._bgSmall.y);
        this._resIcon.scale = 0.6;
        this.addChild(this._resIcon, this._bgSmall.getLocalZOrder() + 1);

        if (resourceRequire <= cf.user._currentCapacityElixir)
            this._upgradeAble = true;
        else
        {
            this._upgradeAble = false;
            this._labelRrequire.setColor(cc.color(255, 0, 0, 255));
        }



        if (!this.checkBarrackLevel())
        {

            this.onDisabled(false, "Yêu cầu nhà\n lính cấp " + gv.json.troopBase["ARM_" + this._troopOrder]["barracksLevelRequired"]);
            var act = cc.tintTo(0, 127.5, 127.5, 127.5 );
            this._icon.runAction(act);
        }
        else
            if (!this.checkLaboratoryLevel())
            {
                this.onDisabled(true, "Yêu cầu nhà\nnghiên cứu\n  cấp " + this._levelLabRequire);
                this.setBright(true);
            }
            else
                this.initResource();

        if (gv.troopMaxLevel[this._troopOrder] == this._level)
        {
            this._labelLevel.setString("MAX");
           this.onDisabled(true, "Đạt giới hạn Level");
        }
    },

    onDisabled: function(labelLevelAppear, str)
    {
        this._labelLevel.visible = labelLevelAppear;

        this.setBright(false);
        this.setEnabled(false);
        this._labelRrequire.setColor(cc.color(255, 0, 0, 255));

        // this._labelLevel.runAction(act.clone());
        this._labelRrequire.visible = true;
        this._resIcon.visible = false;
        this._avaiable = false;
        this._labelRrequire.setString(str);
    },
    /* Kiểm tra level Barrack */
    checkBarrackLevel: function()
    {
        var max = 0;
        var b = null;
        for (var i = 0; i < cf.user._buildingListCount[gv.orderInUserBuildingList.barrack_1]; i++)
        {
            b = cf.user._buildingList[gv.orderInUserBuildingList.barrack_1][i];
            max = Math.max(max, b._level);
        }
        return (max >= gv.json.troopBase["ARM_" + this._troopOrder]["barracksLevelRequired"] );
    },
    checkLaboratoryLevel: function()
    {
        var levelLab = cf.user._buildingList[gv.orderInUserBuildingList.lab][0]._level;
        var levelLabRequire = gv.json.troop["ARM_" + this._troopOrder][this._level + 1]["laboratoryLevelRequired"];
        this._levelLabRequire = levelLabRequire;
        return levelLab >= levelLabRequire;
    },
    initResource: function()
    {
        if (!this._avaiable) return;

    },

    onPopUpInfo: function()
    {
        fr.getCurrentScreen().onPopUpTroopInfo(this._troopOrder);
    }

});