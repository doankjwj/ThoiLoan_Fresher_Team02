var TownHall = BuildingNode.extend({
    ctor: function(id, level, row, col, existed)
    {
        this._size = cf.jsonTownHall["TOW_1"][level]["width"];
        this._CENTER_BUILDING_STR = "TOW_1_";
        this._orderInUserBuildingList = 0;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);

        /* Effect */
        var effect = cc.Sprite(res.tmp_effect);
        effect.anchorX = 0.5;
        effect.anchorY = 0.5;
        this.addChild(effect, this._center_building.getLocalZOrder() + 1);
        effect.runAction(cf.animationTownHall.clone().repeatForever());

    },

    initAnimation: function()
    {
        if (cf.animationTownHall == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_townhall_flame.plist", res.folder_effect + "effect_townhall_flame.png");
            cf.animationTownHall = MainLayer.get_animation("effect_townhall_flame ", 12);
        }
    }
})