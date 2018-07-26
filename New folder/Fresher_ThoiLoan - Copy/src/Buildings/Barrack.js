var Barrack = BuildingNode.extend({
    ctor: function(id, level, row, col, existed) {
        this._size = cf.jsonBarrack["BAR_1"][level]["width"];
        this._CENTER_BUILDING_STR = "BAR_1_";
        this._orderInUserBuildingList = 9;

        this._super(id, level, row, col, existed);
        /* Init Animation If Not Exist*/
        this.initAnimation();
        cc.log(cf.animationBarrack[this._level]);
        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);

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