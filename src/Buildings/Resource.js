var Resource = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        if(level === 0) this._size = gv.json.resource[this._buildingSTR][level+1]["width"];
        else this._size = gv.json.resource[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = (buildingSTR == gv.buildingSTR.resource_1) ? gv.orderInUserBuildingList.resource_1 : gv.orderInUserBuildingList.resource_2;
        this._name = (buildingSTR == gv.buildingSTR.resource_1) ? gv.buildingName.resource_1 : gv.buildingName.resource_2;

        this._super(id, level, row, col, existed);



        /* Add Center Building */
        this.addCenterBuilding();

        /* Init Animation If Not Exist*/
        this.initAnimation();
        /* Effect */
        var effect = cc.Sprite(res.tmp_effect);
        effect.anchorX = 0.5;
        effect.anchorY = 0.5;

        this.addChild(effect, this._center_building.getLocalZOrder() + 1);
        effect.runAction(((this._buildingSTR == gv.buildingSTR.resource_1) ? cf.animationRes1[this._level].clone() : cf.animationRes2[this._level]).clone().repeatForever());

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
            cf.animationRes1[this._level] = MainLayer.get_animation("effect_res_1_" + this._level + " ", 10);
            cf.animationRes1[this._level].retain();
        }

        if (this._buildingSTR == gv.buildingSTR.resource_2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = MainLayer.get_animation("effect_res_2_" + this._level + " ", 10);
            cf.animationRes2[this._level].retain();
        }
    }
})