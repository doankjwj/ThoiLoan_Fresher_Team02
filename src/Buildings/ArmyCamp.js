var ArmyCamp = BuildingNode.extend({
    _troopQuantity: 0,

    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.armyCamp_1;
        if(level === 0) level = 1;
        this._size = gv.json.armyCamp[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.armyCamp;
        this._maxLevel = gv.buildingMaxLevel.armyCamp_1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.armyCamp_1;
        this._name = gv.buildingName.armyCamp_1;
        this._description = gv.buildingDescription.armyCamp_1;
        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

        /* Add Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0;
        this._effectAnim.scale = cf.SCALE;
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        this._effectAnim.runAction(cf.animationArmyCamp[1].clone().repeatForever());

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
        }
    },

    updateAnim: function()
    {
        //
    },

    initAnimation: function()
    {
        if (cf.animationArmyCamp.length == 0)
        {
            for (var i = 1; i < 3; i++)
            {
                cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_armycamp_" + i +".plist", res.folder_effect + "effect_armycamp_" + i +".png");
                cf.animationArmyCamp[i] = fn.getAnimation("effect_armycamp_" + i + " ", 1, 5);
                cf.animationArmyCamp[i].retain();
            }
        }
    }
})