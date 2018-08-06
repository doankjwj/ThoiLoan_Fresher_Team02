/**
 * Created by CPU02326_Local on 7/20/2018.
 */
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
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

        this._defense_base = cc.Sprite(res.folder_defense_base + gv.buildingSTR.defence_1 + "_" + this._level + "_Shadow.png");
        this._defense_base.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: cf.SCALE
        });
        this.addChild(this._defense_base, this._center_building.getLocalZOrder() - 1);

        /* random change orientation */
        this.schedule(this.changeOri, 1);
    },

    changeOri: function()
    {
        //var ro = (Math.floor(Math.random() * 5))
        var ro = 3;
        this._center_building = cc.Sprite(res.folder_canon + this._level + "/" + res.image_postfix_1 + ro + res.image_postfix_2);
        this._center_building.setAnchorPoint(cc.p(0.5, 0.5));
        this._center_building.flippedX = (ro >= 2);
        //this.addChild(this._center_building, this._defence.getLocalZOrder() - 1);
    }
})