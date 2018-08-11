var Barrack = BuildingNode.extend({
    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.barrack_1;
        if(level === 0) level = 1;
        this._size = gv.json.barrack[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.barrack;
        this._maxLevel = gv.buildingMaxLevel.barrack_1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.barrack_1;
        this._name = gv.buildingName.barrack_1;
        this._description = gv.buildingDescription.barrack_1;

        this._super(id, level, row, col, existed);


        /* Add Center Building */
        this.addCenterBuilding();

        /* Init Animation If Not Exist*/
        this.initAnimation();


        /* Add Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.scale = cf.SCALE;
        this._effectAnim.visible = false;
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        if (this._level >= 1) {
            this._effectAnim.stopAllActions();
            this._effectAnim.visible = true;
            this._effectAnim.runAction(cf.animationBarrack[Math.max(this._level, 4)].clone().repeatForever());
        };

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
        }


    },

    updateAnim: function()
    {
        this.initAnimation();

        if (this._level >= 4) {
            this._effectAnim.stopAllActions();
            this._effectAnim.runAction(cf.animationBarrack[this._level].clone().repeatForever());
        };
    },

    initAnimation: function()
    {
        if (this._level < 4) return;
        if (cf.animationBarrack[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_barrack_1_" + this._level +".plist", res.folder_effect + "effect_barrack_1_" + this._level +".png");
            cf.animationBarrack[this._level] = fn.getAnimation("effect_barrack_1_" + this._level + " ", 1, 6);
            cf.animationBarrack[this._level].retain();
        }
    }
})