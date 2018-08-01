var ArmyCamp = BuildingNode.extend({
    _troop_quantity: null,

    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.armyCamp_1;
        if(level === 0) level = 1;
        this._size = gv.json.armyCamp[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.armyCamp;
        this._maxLevel = gv.buildingMaxLevel.armyCamp_1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.armyCamp_1;
        this._name = gv.buildingName.armyCamp_1;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

        /* Add Effect */
        var effect = cc.Sprite(res.tmp_effect);
        effect.anchorX = 0.5;
        effect.anchorY = 0;
        effect.scale = 2 * cf.SCALE;
        this.addChild(effect, this._center_building.getLocalZOrder() + 1);
        effect.runAction(cf.animationArmyCamp[2].clone().repeatForever());

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
            cc.log(this._name + " Build This");
        }
    },

    initAnimation: function()
    {
        if (cf.animationArmyCamp.length == 0)
        {
            for (var i = 1; i < 3; i++)
            {
                cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_armycamp_" + i +".plist", res.folder_effect + "effect_armycamp_" + i +".png");
                cf.animationArmyCamp[i] = MainLayer.get_animation("effect_armycamp_" + i + " ", 5);
                cf.animationArmyCamp[i].retain();
            }
        }
    }
})