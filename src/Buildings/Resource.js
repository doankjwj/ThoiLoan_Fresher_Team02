var Resource = BuildingNode.extend({
    _currentCapacity: 0,
    _productivity: null,
    _percentPopupHarvest: 0.1,

    _btnHarvest: null,

    status : {
        notFulled: 3423,
        fulled: 3123,
    },

    _TAG_BUTTON_HARVEST: 6252,

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
            this.initCurrentCapacity();

        this.schedule(this.onUpdateCapacity, 1);
    },

    initHarvestButton: function()
    {
        if (this._btnHarvest)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST);
        switch (this._buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                this._btnHarvest = ccui.Button(res.folder_gui_action_building + "harvest_gold.png");
                break;
            case gv.buildingSTR.resource_2:
                this._btnHarvest = ccui.Button(res.folder_gui_action_building + "harvest_elixir.png");
                break;
            case gv.buildingSTR.resource_3:
                this._btnHarvest = ccui.Button(res.folder_gui_action_building + "harvest_dark_elixir.png");
                break;
        };
        this._btnHarvest.setAnchorPoint(0.5, 0);
        this._btnHarvest.setPosition(0, this._btnHarvest.height / 2);
        this._btnHarvest.visible = false;
        this.addChild(this._btnHarvest, this._gui_commit_build.getLocalZOrder() + 1, this._TAG_BUTTON_HARVEST);

        var self = this;
        this._btnHarvest.addClickEventListener(function(){
            self.onHarvert();
        }.bind(this));
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

    initCurrentCapacity: function()
    {
        this._productivity = gv.json.resource[this._buildingSTR][this._level]["productivity"];
        this._maxCapacity = gv.json.resource[this._buildingSTR][this._level]["capacity"];
    },

    onUpdateCapacity: function()
    {
        if (!this._is_active) return;
        /* Kiểm tra sức chứa */
        if (this._currentCapacity >= this._maxCapacity) return;


        /* thời gian từ lần cuối thu hoạch hoặc lần cuối xây dựng */
        var timeDistance = (new Date().getTime() - this._finishing_time) / 1000;

        this._currentCapacity = this._productivity * fn.convertSecondToHour(timeDistance);
        //cc.log("Thời gian hoạt động: " + Math.ceil(this._currentCapacity) + " s/ Sức chứa tối đa: " + this._maxCapacity );

        if (this._currentCapacity/this._maxCapacity >= this._percentPopupHarvest)
            this.onPopUpHarvestButton();
    },

    onPopUpHarvestButton: function()
    {
        if (!this._btnHarvest.visible) this._btnHarvest.visible = true;
    },
    onPopDownHarvestButton: function()
    {
        this._btnHarvest.visible = false;
    },

    onHarvert: function()
    {
        this.onPopDownHarvestButton();
        //testnetwork.connector.sendHarvest(this._id);s
    }
})