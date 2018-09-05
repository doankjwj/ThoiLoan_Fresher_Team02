var Wall = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.wall;
        this._size = gv.json.wall[this._buildingSTR][1]["width"];
        this._jsonConfig = gv.json.wall;
        this._maxLevel = gv.buildingMaxLevel.wall;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.wall;
        this._name = gv.buildingName.wall;
        this._description = gv.buildingDescription.wall;

        this._super(id, level, row, col, existed, isActive);

        this._grassShadow.visible = false;
        /* Add Center Building */
        this.addCenterBuilding();

        //if (!this._isActive)
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
    },

    updateAnim: function()
    {

    },
})