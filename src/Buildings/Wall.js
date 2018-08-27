/**
 * Created by CPU02326_Local on 8/25/2018.
 */
var Wall = cc.Node.extend({

    _id: null,
    _level: null,
    _type: null,

    _icon: null,
    ctor: function(id, level, row, col, type)
    {
        this._super();
        this._buildingSTR = gv.buildingSTR.wall;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.wall;
        this._level = level;
        this._row = row;
        this._col = col;
        this._type = type;
        this._size = 1;

        this.init();
        this.initId();
    },

    getTempLevel: function()
    {
        return Math.max(this._level, 1);
    },

    init: function()
    {
        var url = res.folder_wall + this._buildingSTR + "_" + this.getTempLevel() + "/" + this._buildingSTR + "_" + this.getTempLevel() +  "/idle/image000" + this._type + ".png";
        this._icon = cc.Sprite(url);
        this.addChild(this._icon);
        this.initLocation();
    },
    initId: function()
    {
        var tmp = (this._orderInUserBuildingList + 1).toString();
        if(cf.user._buildingListCount[this._orderInUserBuildingList] >= 10) {
            tmp += cf.user._buildingListCount[this._orderInUserBuildingList].toString();
        } else tmp = tmp + "0" + cf.user._buildingListCount[this._orderInUserBuildingList].toString();
        var tag= parseInt(tmp);
        this.setTag(tag);
        this._id = tag;
    },
    /*Lấy tọa độ của tường trên map theo dòng và cột*/
    initLocation: function()
    {
        // Location
        var row = this._row;
        var col = this._col;
        this.x = cf.tileLocation[row][col].x;
        this.y = cf.tileLocation[row][col].y - (this._size/2) * cf.tileSize.height;


        //Update zOrder
        if(this._existed)
            this.updateZOrder();
        else this.setLocalZOrder(200);
    },
    /*Cập nhật ảnh của tường theo các tường xung quanh*/
    updateImage: function()
    {
        var preRow = cf.map_array[this._row-1][this._col];
        preRow = fn.getBuildingOrderById(preRow);
        var preCol = cf.map_array[this._row][this._col - 1];
        preCol = fn.getBuildingOrderById(preCol);

        var orientation = 0;

        if (preRow != gv.orderInUserBuildingList.wall && preCol != gv.orderInUserBuildingList.wall) orientation = 0;
        if (preRow != gv.orderInUserBuildingList.wall && preCol == gv.orderInUserBuildingList.wall) orientation = 1;
        if (preRow == gv.orderInUserBuildingList.wall && preCol != gv.orderInUserBuildingList.wall) orientation = 2;
        if (preRow == gv.orderInUserBuildingList.wall && preCol == gv.orderInUserBuildingList.wall) orientation = 3;

        this._type = orientation;
        var url = res.folder_wall + this._buildingSTR + "_" + this.getTempLevel() + "/" + this._buildingSTR + "_" + this.getTempLevel() +  "/idle/image000" + this._type + ".png";

        fn.replaceSpriteImage(this._icon, url);
    },
    /*Cập nhật mảng Maplogic khi thêm wall*/
    locate_map_array: function() {
        b = this;
        var r = b._row;
        var c = b._col;
        var size = b._size;

        for (var i = r; i < r + size; i++)
            for (var j = c; j < c + size; j++)
                cf.map_array[i][j] = b._id;
    },
})