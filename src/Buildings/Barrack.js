var Barrack = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.barrack_1;
        this._size = gv.json.barrack[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.barrack;
        this._maxLevel = gv.buildingMaxLevel.barrack_1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.barrack_1;
        this._name = gv.buildingName.barrack_1;
        this._description = gv.buildingDescription.barrack_1;

        this._super(id, level, row, col, existed, isActive);


        /* Add Center Building */
        this.addCenterBuilding();

        /* Init Animation If Not Exist*/
        // this.initAnimation();


        /* Add Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.scale = cf.SCALE;
        this._effectAnim.visible = false;
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        if (this.getTempLevel() >= 4 && this.getTempLevel() <=8) {
            this._effectAnim.stopAllActions();
            this.initAnimation();
            this._effectAnim.visible = true;
            this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
        };

        //if (!this._isActive)
        //{
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
        //}
        //

    },

    updateAnim: function()
    {
        this.initAnimation();

        if (this.getTempLevel() >= 4) {
            this._effectAnim.stopAllActions();
            this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
        };
    },

    initAnimation: function()
    {
        var tmpLevel = this.getTempLevel();
        if (tmpLevel < 4) return;
        if (cf.animationBarrack[tmpLevel] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_barrack_1_" + tmpLevel +".plist", res.folder_effect + "effect_barrack_1_" + tmpLevel +".png");
            cf.animationBarrack[tmpLevel] = fn.getAnimation("effect_barrack_1_" + tmpLevel + " ", 1, 6);
            cf.animationBarrack[tmpLevel].retain();
        }
    }
})