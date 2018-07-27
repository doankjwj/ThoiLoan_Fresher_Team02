var TownHall = BuildingNode.extend({
    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.townHall;
        this._size = gv.json.townHall[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = gv.orderInUserBuildingList.townHall;
        this._name = gv.buildingName.townHall;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

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
            cf.animationTownHall.retain();
        }
    }
})