var Resource = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        if(level === 0) this._size = gv.json.resource[this._buildingSTR][level+1]["width"];
        else this._size = gv.json.resource[this._buildingSTR][level]["width"];
        if(this._buildingSTR === gv.buildingSTR.resource_1) {
            this._maxLevel = gv.buildingMaxLevel.resource_1;
        } else if(this._buildingSTR === gv.buildingSTR.resource_2) {
            this._maxLevel = gv.buildingMaxLevel.resource_2;
        } else if(this._buildingSTR === gv.buildingSTR.resource_3) {
            this._maxLevel = gv.buildingMaxLevel.resource_3;
        }
        this._orderInUserBuildingList = (buildingSTR == gv.buildingSTR.resource_1) ? gv.orderInUserBuildingList.resource_1 : gv.orderInUserBuildingList.resource_2;
        this._name = (buildingSTR == gv.buildingSTR.resource_1) ? gv.buildingName.resource_1 : gv.buildingName.resource_2;
        this._jsonConfig = gv.json.resource;
        this._description = (buildingSTR == gv.buildingSTR.resource_1) ? gv.buildingDescription.resource_1 : gv.buildingDescription.resource_1;

        this._super(id, level, row, col, existed);



        /* Add Center Building */
        this.addCenterBuilding();

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
    },

    initAnimation: function()
    {
        if (this._buildingSTR == gv.buildingSTR.resource_1 && cf.animationRes1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = fn.getAnimation("effect_res_1_" + this._level + " ", 10);
            cf.animationRes1[this._level].retain();
        }

        if (this._buildingSTR == gv.buildingSTR.resource_2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = fn.getAnimation("effect_res_2_" + this._level + " ", 10);
            cf.animationRes2[this._level].retain();
        }
    }
})