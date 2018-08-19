var BuilderHut = BuildingNode.extend({
    ctor: function(id, order, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.builderHut;
        this._size = gv.json.builderHut[this._buildingSTR][1]["width"];
        this._jsonConfig = gv.json.builderHut;
        this._maxLevel = 1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.builderHut;
        this._name =gv.buildingName.builderHut;
        this._description = gv.buildingDescription.builderHut;

        this._super(id, order, row, col, existed, true);
        /* Add Center Building */
        this.addCenterBuilding();

        //if (!this._isActive)
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
    },

    updateAnim: function()
    {

    },
})