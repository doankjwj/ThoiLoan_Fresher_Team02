var Resource = BuildingNode.extend({
    _currentCapacity: 0,
    _maxCapacity: 0,
    _productivity: null,
    _percentPopupHarvest: 0.001,
    _capacityIsFulled: false,

    _btnHarvest: null,
    _btnHarvestBG: null,

    _TAG_BUTTON_HARVEST: 6252,
    _TAG_BUTTON_HARVEST_BG: 4534,

    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        if(level === 0) this._size = gv.json.resource[this._buildingSTR][level+1]["width"];
        else this._size = gv.json.resource[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.resource;
        switch (buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                this._maxLevel = gv.buildingMaxLevel.resource_1;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_1;
                this._name = gv.buildingName.resource_1;
                this._description = gv.buildingDescription.resource_1;
                break;
            case gv.buildingSTR.resource_2:
                this._maxLevel = gv.buildingMaxLevel.resource_2;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_2;
                this._name = gv.buildingName.resource_2;
                this._description = gv.buildingDescription.resource_2;
                break;
            case gv.buildingSTR.resource_3:
                this._maxLevel = gv.buildingMaxLevel.resource_3;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_3;
                this._name = gv.buildingName.resource_3;
                this._description = gv.buildingDescription.resource_3;
                break;
        }

        this._super(id, level, row, col, existed);

        this.addCenterBuilding();
        this.initHarvestButton();

        /* Init Animation If Not Exist*/
        this.initAnimation();
        /* Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;

        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        this._effectAnim.runAction(((this._buildingSTR == gv.buildingSTR.resource_1) ? cf.animationRes1[this._level].clone() : cf.animationRes2[this._level]).clone().repeatForever());

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
            cc.log(this._name + " Build This");
        }
        else
            this.initCapacity();

        this.schedule(this.onUpdateCapacity, 0.1);
    },
    updateAnim: function()
    {
        this.initAnimation();
        this._effectAnim.stopAllActions();
        this._effectAnim.runAction(((this._buildingSTR == gv.buildingSTR.resource_1) ? cf.animationRes1[this._level].clone() : cf.animationRes2[this._level]).clone().repeatForever());
    },
    initAnimation: function()
    {
        if (this._buildingSTR == gv.buildingSTR.resource_1 && cf.animationRes1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = fn.getAnimation("effect_res_1_" + this._level + " ", 1, 10);
            cf.animationRes1[this._level].retain();
        }

        if (this._buildingSTR == gv.buildingSTR.resource_2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = fn.getAnimation("effect_res_2_" + this._level + " ", 1, 10);
            cf.animationRes2[this._level].retain();
        }
    },

    initCapacity: function()
    {
        this._productivity = gv.json.resource[this._buildingSTR][this._level]["productivity"];
        this._maxCapacity = gv.json.resource[this._buildingSTR][this._level]["capacity"];
    },
    initHarvestButton: function()
    {
        /* Button tài nguyên */
        if (this._btnHarvest)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST);
        switch (this._buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_1.png");
                break;
            case gv.buildingSTR.resource_2:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_2.png");
                break;
            case gv.buildingSTR.resource_3:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_3.png");
                break;
        };
        this._btnHarvest.setAnchorPoint(0.5, 0.5);
        this._btnHarvest.setPosition(0, this._btnHarvest.height * 1.5);
        this._btnHarvest.visible = false;
        this.addChild(this._btnHarvest, this._gui_commit_build.getLocalZOrder() + 1, this._TAG_BUTTON_HARVEST);
        var self = this;
        this._btnHarvest.addClickEventListener(function(){
            self.onHarvert();
        }.bind(this));

        /* Nền Button */
        this.initButtonHarvestBG();
    },
    initButtonHarvestBG: function()
    {
        if (this._capacityIsFulled == (this._currentCapacity == this._maxCapacity)) return;
        if (this._btnHarvestBG)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST_BG);
        if (!this._capacityIsFulled)
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "collect_bg.png");
        else
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "full_bg.png");
        this._btnHarvestBG.setAnchorPoint(0.5, 0.5);
        this._btnHarvestBG.setPosition(this._btnHarvest.x, this._btnHarvest.y - 3);
        this._btnHarvestBG.visible = false;
        this.addChild(this._btnHarvestBG, this._btnHarvest.getLocalZOrder() - 1, this._TAG_BUTTON_HARVEST_BG);
    },


    onUpdateCapacity: function()
    {
        if (!this._is_active || !this._existed) return;
        /* Kiểm tra sức chứa */
        if (this._currentCapacity >= this._maxCapacity) return;
        /* thời gian từ lần cuối thu hoạch hoặc lần cuối xây dựng */
        var timeDistance = (new Date().getTime() - this._finishing_time) / 1000;
        this._currentCapacity = Math.floor(this._productivity * fn.convertSecondToHour(timeDistance));
        this._currentCapacity = Math.min(this._currentCapacity, this._maxCapacity);
        if (this._currentCapacity/this._maxCapacity >= this._percentPopupHarvest)
        {
            this.updateButtonHarvestBG();
            if (!this._btnHarvest.visible)
                this.onPopUpHarvestButton();
        }
    },
    updateButtonHarvestBG: function()
    {
        if (this._capacityIsFulled == (this._currentCapacity == this._maxCapacity)) return;
        if (this._btnHarvestBG)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST_BG);
        if (!this._capacityIsFulled)
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "collect_bg.png");
        else
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "full_bg.png");
        this._btnHarvestBG.setAnchorPoint(0.5, 0.5);
        this._btnHarvestBG.setPosition(this._btnHarvest.x, this._btnHarvest.y - 3);
        this._btnHarvestBG.visible = true;
        this.addChild(this._btnHarvestBG, this._btnHarvest.getLocalZOrder() - 1, this._TAG_BUTTON_HARVEST_BG);
    },
    onPopUpHarvestButton: function()
    {
        if (!this._btnHarvest.visible)
        {
            this._btnHarvest.visible = true;
            this._btnHarvestBG.visible = true;
        };

        if (this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST))
        {
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setBright(true);
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setEnabled(true);
        }
    },
    onPopDownHarvestButton: function()
    {

        this._btnHarvest.visible = false;
        this._btnHarvestBG.visible = false;
        if (this.getParent().getParent()._TAG_BUTTON_HARVEST)
        {
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setBright(false);
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setEnabled(false);
        }
    },
    onHarvert: function()
    {
        var capacityAvaiable = cf.user.getAvaiableCapacity(this._buildingSTR);
        this.updateToUserCapacity(Math.min(this._currentCapacity, capacityAvaiable));
        this._currentCapacity = (capacityAvaiable >= this._currentCapacity) ? 0 : (capacityAvaiable - this._currentCapacity);
        if (this._currentCapacity <= 0)
            this.onPopDownHarvestButton();
        this.onUpdateLastHarvestTime();
    },
    updateToUserCapacity: function(quantity)
    {
        switch(this._buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                cf.user._currentCapacityGold += quantity;
                cf.user.distributeResource(true, false, false);
                break;
            case gv.buildingSTR.resource_2:
                cf.user._currentCapacityElixir += quantity;
                cf.user.distributeResource(false, true, false);
                break;
            case gv.buildingSTR.resource_3:
                cf.user._currentCapacityDarkElixir += quantity;
                cf.user.distributeResource(false, false, true);
                break;
        }
    },
    onUpdateLastHarvestTime: function(){
        this._finishing_time = new Date().getTime();
    }
})