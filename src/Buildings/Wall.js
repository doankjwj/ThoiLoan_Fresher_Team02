/**
 * Created by CPU02326_Local on 8/25/2018.
 */
var Wall = cc.Node.extend({

    _id: null,
    _level: null,

    _icon: null,
    ctor: function(id, level, row, col)
    {
        this._super();
        this._buildingSTR = gv.buildingSTR.wall;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.wall;
        this._level = level;
        this._row = row;
        this._col = col;

        this.init();
    },

    init: function()
    {
        this._icon = cc.Sprite(res.folder_wall + this._buildingSTR + "_" + this.getTempLevel() + ".png");
        this.addChild(this._icon);
    },
    getTempLevel: function()
    {
        return Math.max(this._level, 1);
    }
})