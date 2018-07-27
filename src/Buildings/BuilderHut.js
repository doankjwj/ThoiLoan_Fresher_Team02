var BuilderHut = BuildingNode.extend({
    ctor: function(id, order, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.builderHut;
        this._size = gv.json.builderHut[this._buildingSTR][order]["width"];
        this._orderInUserBuildingList = gv.orderInUserBuildingList.builderHut;
        this._name =gv.buildingName.builderHut;

        this._super(id, order, row, col, existed);
        /* Add Center Building */
        this.addCenterBuilding();
    }
})