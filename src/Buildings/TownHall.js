var TownHall = BuildingNode.extend({
    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.townHall;
        this._size = gv.json.townHall[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.townHall;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.townHall;
        this._name = gv.buildingName.townHall;
        this._maxLevel = gv.buildingMaxLevel.townHall;
        this._description = gv.buildingDescription.townHall_1;

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
        this._effectAnim.runAction(cf.animationTownHall.clone().repeatForever());

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
            cc.log(this._name + " Build This");
        }
    },

    updateAnim: function()
    {
        //
    },

    initAnimation: function()
    {
        if (cf.animationTownHall == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_townhall_flame.plist", res.folder_effect + "effect_townhall_flame.png");
            cf.animationTownHall = fn.getAnimation("effect_townhall_flame ", 1, 12);
            cf.animationTownHall.retain();
        }
    }
})