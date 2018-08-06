var Defence = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        if(level === 0) level = 1;
        this._size = gv.json.defence[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.defence;
        this._maxLevel = gv.buildingMaxLevel.defence_1;
        this._orderInUserBuildingList = (buildingSTR == gv.buildingSTR.defence_1) ? gv.orderInUserBuildingList.defence_1 : gv.orderInUserBuildingList.defence_1;
        this._name = (buildingSTR == gv.buildingSTR.defence_1) ? gv.buildingName.defence_1 : gv.buildingName.defence_1;
        this._description = (buildingSTR == gv.buildingSTR.defence_1) ? gv.buildingDescription.defence_1 : gv.buildingDescription.defence_1;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();
        this._grassShadow.visible = false;

        this._defense_base = cc.Sprite(res.folder_defense_base + gv.buildingSTR.defence_1 + "_" + this._level + "_Shadow.png");
        this._defense_base.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: cf.SCALE
        });
        this.addChild(this._defense_base, this._center_building.getLocalZOrder() - 1);

        this._effectAnim = cc.Sprite(res.folder_canon + this._level + "/idle/image0000.png");
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.setPosition(5, -8);
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
        }

        /* Tự đổi hướng của pháo */
        this.schedule(this.changeOri, 2);
    },

    initAnimation: function()
    {
        if (!cf.animationDefence_1[this._level])
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_defence_1_" + this._level + ".plist", res.folder_effect + "effect_defence_1_" + this._level + ".png");
        }
    },

    updateAnim: function()
    {
        this.initAnimation();
    },

    /* đổi hướng pháo ngẫu nhiên */
    changeOri: function()
    {
        var ro = (Math.floor(Math.random() * 5))
        var eff = null;
        switch(ro)
        {
            case 0:
                eff = fn.getAnimation("effect_defence_1_" + this._level + " " , 1, 6);
                break;
            case 1:
                eff = fn.getAnimation("effect_defence_1_" + this._level + " " , 7, 12);
                break;
            case 2:
                eff = fn.getAnimation("effect_defence_1_" + this._level + " " , 13, 18);
                break;
            case 3:
                eff = fn.getAnimation("effect_defence_1_" + this._level + " " , 19, 24);
                break;
            case 4:
                eff = fn.getAnimation("effect_defence_1_" + this._level + " " , 25, 30);
                break;
        };

        this._effectAnim.runAction(eff);
    }
})