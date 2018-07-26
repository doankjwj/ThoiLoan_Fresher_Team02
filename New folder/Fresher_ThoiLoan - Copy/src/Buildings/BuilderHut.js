var BuilderHut = BuildingNode.extend({
    ctor: function(id, order, row, col, existed)
    {
        this._size = cf.jsonBuilderHut["BDH_1"][order]["width"];
        this._CENTER_BUILDING_STR = "BDH_1";
        this._orderInUserBuildingList = 11;

        this._super(id, order, row, col, existed);

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);
    }
})