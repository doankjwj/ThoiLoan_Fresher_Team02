var Resource = BuildingNode.extend({
    _type: null,

    ctor: function(id, level, row, col, existed, type)
    {
        this._buildingSTR = (type == 1) ? gv.buildingSTR.resource_1 : gv.buildingSTR.resource_2;
        this._size = gv.json.resource[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = (type == 1) ? gv.orderInUserBuildingList.resource_1 : gv.orderInUserBuildingList.resource_2;
        this._name = (type == 1) ? gv.buildingName.resource_1 : gv.buildingName.resource_2;

        this._super(id, level, row, col, existed);
        this._type =  type;

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

        /* Effect */
        var effect = cc.Sprite(res.tmp_effect);
        effect.anchorX = 0.5;
        effect.anchorY = 0.5;

        this.addChild(effect, this._center_building.getLocalZOrder() + 1);
        effect.runAction(((this._type === 1) ? cf.animationRes1[this._level].clone() : cf.animationRes2[this._level]).clone().repeatForever());
    },

    initAnimation: function()
    {
        if (this._type === 1 && cf.animationRes1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = MainLayer.get_animation("effect_res_1_" + this._level + " ", 10);
            cf.animationRes1[this._level].retain();
        }

        if (this._type === 2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = MainLayer.get_animation("effect_res_2_" + this._level + " ", 10);
            cf.animationRes2[this._level].retain();
        }
    }
})