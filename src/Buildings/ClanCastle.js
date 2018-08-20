/**
 * Created by CPU02326_Local on 8/20/2018.
 */
var ClanCastle = BuildingNode.extend({
    _id: null,
    _level: null,
    _row: null,
    _col: null,
    _existed: null,
    isActive: null,

    ctor: function(id, level, row, col, existed, isActive){
        this._buildingSTR = gv.buildingSTR.clanCastle;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.clanCastle;
        this._size = gv.json.clanCastle[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.clanCastle;
        this._maxLevel = gv.buildingMaxLevel.clanCastle;
        this._id = id;
        this._level = level;
        this._row = row;
        this._col = col;
        this._existed = existed;
        this._isActive = isActive;

        this._super(id, level, row, col, existed, isActive);
        this.addCenterBuilding();
    }
})