var Map = cc.Node.extend({
    _tileMap: null,
    _bgTopLeft: null,
    _bgTopRight: null,
    _bgBotLeft: null,
    _bgBotRight: null,
    _width: null,
    _height: null,

    ctor: function(){
        this._super();
        this.init();
    },

    init: function(){
        this.scale = cf.BIG_MAP_SCALE;

        this.loadTileMap();
        this.loadBackground();
        this._width = (this._bgBotLeft.width + this._bgBotRight.width)*cf.bgSCALE;
        this._height = (this._bgBotLeft.height + this._bgTopLeft.height)*cf.bgSCALE;
        this.initTileLocation();
        this.addBuildingFromServer();
        //this.add_building();
    },

    addBuildingFromServer: function()
    {
        var self = this;
        for (var key in gv.jsonInfo["map"])
        {
            if (gv.jsonInfo["map"].hasOwnProperty(key))
            {
                for (var j=0; j < gv.jsonInfo["map"][key].length ; j++)
                {
                    var building = cf.stringToItemInit(key, j);
                    if (building != null)
                    {
                        self.addChild(building);
                        self.addBuildingToUserBuildingList(building);
                        if(building._existed) building.locate_map_array(building);
                        //building.locate_map_array(building._row, building._col, building._size);
                    }
                }
            }
        }


        for (var i = 0; i < Object.keys(gv.json.initGame["obs"]).length; i++)
               {
                   var obs = gv.json.initGame["obs"][i+1];
                   var obstacle = new Obstacle(i + 15, obs["type"], obs["posX"], obs["posY"], true);
                   var tag = i*500;
                   this.addChild(obstacle, 2, tag);
               }
    },

    //add_building: function()
    //{
    //    var self = this;
    //    for(var key in cf.jsonInitGame["map"]) {
    //        if(cf.jsonInitGame["map"].hasOwnProperty(key)) {
    //            var building = cf.stringToItemInit(key);
    //            if(building !== null) {
    //                self.addChild(building);
    //                self.addBuildingToUserBuildingList(building);
    //                var tag = building._orderInUserBuildingList*100 + cf.user._buildingListCount[building._orderInUserBuildingList]
    //                building.setTag(tag);
    //                building._id = tag;
    //            }
    //        }
    //    }
    //    for (var i = 0; i < Object.keys(cf.jsonInitGame["obs"]).length; i++)
    //    {
    //        var obs = cf.jsonInitGame["obs"][i+1];
    //        var obstacle = new Obstacle(i + 15, obs["type"], obs["posX"], obs["posY"], true);
    //        tag = i*500;
    //        this.addChild(obstacle, 2, tag);
    //    }
    //},

    addBuildingToUserBuildingList: function(b)
    {
        cf.user._buildingList[b._orderInUserBuildingList].push(b);
        cf.user._buildingListCount[b._orderInUserBuildingList] ++;
    },

    initTileLocation: function(){
        cf.map_array.push(0);
        for (var i = 1; i < 41; i++)
        {
            var tmp_arr = [];
            for (var j = 0; j < 41; j++) tmp_arr.push(0)
            cf.map_array.push(tmp_arr);
        }

        cf.tileLocation.push([0]);
        var mapLayer = this._tileMap.getLayer("bg2");
        for (var i = 1; i <= 40; i++)
        {
            var arr_pos = [];
            for(var k = 0; k<=40; k++) arr_pos.push(k);
            for ( var j = 1; j <= 40; j++)
            {
                var r = i;
                var c = j;
                var pos = null;

                if ((r+c) % 2 === 0)
                {
                    var current_tile = mapLayer.getTileAt(r, c);
                    //pos = cc.p(current_tile.x + 0.5 * cf.tileSize.width,current_tile.y + 0.5 * cf.tileSize.height );
                    pos = cc.p(current_tile.x + 0.5 * cf.tileSize.width,current_tile.y + cf.tileSize.height );
                    var posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                else
                {
                    current_tile = mapLayer.getTileAt(r + 1, c);
                    pos = cc.p(current_tile.x,current_tile.y + 1.5 * cf.tileSize.height );
                    posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                arr_pos[j] = posInWorld;
            }
            cf.tileLocation.push(arr_pos);
        }
    },

    loadTileMap: function(){
        this._tileMap = new cc.TMXTiledMap("res/Art/Map/42x42map.tmx");
        this._tileMap.x = 506*cf.SCALE;
        this._tileMap.y = 481.3*cf.SCALE;
        this._tileMap.scale = cf.SCALE;
        this.addChild(this._tileMap, 0, 99);
    },

    loadBackground: function() {
        this._bgBotLeft = new cc.Sprite(res.bgBotLeft);
        this._bgBotRight = new cc.Sprite(res.bgBotRight);
        this._bgTopLeft = new cc.Sprite(res.bgTopLeft);
        this._bgTopRight = new cc.Sprite(res.bgTopRight);
        this._bgBotLeft.attr({
            x:0,
            y:0,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgBotRight.attr({
            x: (this._bgBotLeft.width) * cf.bgSCALE,
            y:0,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgTopLeft.attr({
            x:0,
            y:(this._bgBotLeft.height )* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgTopRight.attr({
            x:(this._bgBotLeft.width)* cf.bgSCALE,
            y:(this._bgBotLeft.height)* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this.addChild(this._bgTopRight, 1);
        this.addChild(this._bgTopLeft,  1);
        this.addChild(this._bgBotRight, 1);
        this.addChild(this._bgBotLeft,  1);
    },

    logMapArray: function() {
        for (var r = 1; r < 41; r ++)
        {
            var s = "";
            for (var c = 1; c < 41; c++) {
                var tmp = cf.map_array[r][c] >= 10 ? cf.map_array[r][c].toString() : ("0" + cf.map_array[r][c].toString());
                s = s + " " + tmp;
            }
            cc.log(s)
        }
    },

    get_avaiable_position: function(size) {
        var flag = false;
        var dis = 100;
        var pos = cc.p(0, 0);
        for (var r = 1; r <= 40 - size + 1; r++)
            for (var c = 1; c <= 40 - size + 1; c++)
            {
                var blank = true;
                for (var i = r; i <= r + size - 1; i++)
                    for (var j = c; j <= c + size - 1; j++)
                        if (cf.map_array[i][j] !== 0)
                        {
                            blank = false;
                            break;
                        }
                if (blank)
                {
                    if (Math.sqrt( Math.pow(r - 20, 2) + Math.pow(c - 20, 2)) < dis)
                    {
                        pos = cc.p(r, c);
                        dis = Math.sqrt( Math.pow(r - 20, 2) + Math.pow(c - 20, 2));
                    }
                    flag = true;
                }
            }
        if (flag) return pos;
        return cc.p(20, 20);
    }
});