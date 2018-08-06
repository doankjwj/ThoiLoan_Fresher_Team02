/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var Obstacle = BuildingNode.extend({
    ctor: function(id, type, row, col, existed)
    {
        this._buildingSTR = gv.buildingSTR.obstacle;
        this._size = gv.json.obstacle[type][1]["width"];
        this._orderInUserBuildingList = gv.orderInUserBuildingList.obstacle;
        this._name = gv.buildingName.obstacle;

        this._super(id, type, row, col, existed);
        this._grassShadow.visible = false;
        this._txtName.visible = false;
        this.addCenterBuilding();
    }
});