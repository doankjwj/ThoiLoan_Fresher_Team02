var TownHall = BuildingNode.extend({
    _currentCapacityGold: 0,
    _currentCapacityElixir: 0,

    ctor: function(id, level, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.townHall;
        this._size = gv.json.townHall[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.townHall;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.townHall;
        this._name = gv.buildingName.townHall;
        this._maxLevel = gv.buildingMaxLevel.townHall;
        this._description = gv.buildingDescription.townHall_1;

        this._super(id, level, row, col, existed, isActive);



        /* Add Center Building */
        this.addCenterBuilding();

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.setPosition(0, 10);
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        this._effectAnim.runAction(cf.animationTownHall.clone().repeatForever());

        //if (!this._isActive)
        //{
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
        //}
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
    },

    onCompleteBuild: function()
    {
        this._super();
        cf.user.updateMaxStorageSingle(this._id);
        cf.user.distributeResource(true, true, true, true);
        fr.getCurrentScreen()._expBar.updateContent();
    }
})