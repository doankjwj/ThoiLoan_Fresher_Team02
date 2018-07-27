var Barrack = BuildingNode.extend({
    ctor: function(id, level, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.barrack_1;
        this._size = gv.json.barrack[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = gv.orderInUserBuildingList.barrack_1;
        this._name = gv.buildingName.barrack_1;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();
        cc.log(cf.animationBarrack[this._level]);
        /* Add Center Building */
        this.addCenterBuilding();

        /* Add Effect */
        if (this._level >= 4) {
            var effect = cc.Sprite(res.tmp_effect);
            effect.anchorX = 0.5;
            effect.anchorY = 0.5;
            effect.scale = cf.SCALE;
            this.addChild(effect, this._center_building.getLocalZOrder() + 1);
            effect.runAction(cf.animationBarrack[this._level].clone().repeatForever());
        }
    },

    initAnimation: function()
    {
        if (this._level < 4) return;
        if (cf.animationBarrack[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_barrack_1_" + this._level +".plist", res.folder_effect + "effect_barrack_1_" + this._level +".png");
            cf.animationBarrack[this._level] = MainLayer.get_animation("effect_barrack_1_" + this._level + " ", 6);
            cf.animationBarrack[this._level].retain();
        }
    }
})