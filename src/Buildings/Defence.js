/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Defence = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, isActive, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        this._size = gv.json.defence[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.defence;
        this._maxLevel = gv.buildingMaxLevel.defence_1;
        this._orderInUserBuildingList = (buildingSTR == gv.buildingSTR.defence_1) ? gv.orderInUserBuildingList.defence_1 : gv.orderInUserBuildingList.defence_1;
        this._name = (buildingSTR == gv.buildingSTR.defence_1) ? gv.buildingName.defence_1 : gv.buildingName.defence_1;
        this._description = (buildingSTR == gv.buildingSTR.defence_1) ? gv.buildingDescription.defence_1 : gv.buildingDescription.defence_1;

        this._super(id, level, row, col, existed, isActive);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();
        this._grassShadow.visible = false;

        this._defense_base = cc.Sprite(res.folder_defense_base + gv.buildingSTR.defence_1 + "_" + this.getTempLevel() + "_Shadow.png");
        this._defense_base.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: cf.SCALE
        });
        this.addChild(this._defense_base, this._center_building.getLocalZOrder() - 1);

        this._effectAnim = cc.Sprite(res.folder_canon + this.getTempLevel() + "/idle/image0000.png");
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.setPosition(5, -8);
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);

        //if (!this._isActive)
        //{
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
        //}

        /* Tự đổi hướng của pháo */
        this.schedule(this.changeOri, 2);
    },

    initAnimation: function()
    {
        if (!cf.animationDefence_1[this.getTempLevel()])
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_defence_1_" + this.getTempLevel() + ".plist", res.folder_effect + "effect_defence_1_" + this.getTempLevel() + ".png");
        }
    },

    updateAnim: function()
    {
        this.initAnimation();
    },

    /* đổi hướng pháo ngẫu nhiên */
    changeOri: function()
    {
        var ro = (Math.floor(Math.random() * 5));
        var tmpLevel = this.getTempLevel();
        var eff = null;
        switch(ro)
        {
            case 0:
                eff = fn.getAnimation("effect_defence_1_" + tmpLevel + " " , 1, 6);
                break;
            case 1:
                eff = fn.getAnimation("effect_defence_1_" + tmpLevel + " " , 7, 12);
                break;
            case 2:
                eff = fn.getAnimation("effect_defence_1_" + tmpLevel + " " , 13, 18);
                break;
            case 3:
                eff = fn.getAnimation("effect_defence_1_" + tmpLevel + " " , 19, 24);
                break;
            case 4:
                eff = fn.getAnimation("effect_defence_1_" + tmpLevel + " " , 25, 30);
                break;
        };

        this._effectAnim.runAction(eff);
    }
})