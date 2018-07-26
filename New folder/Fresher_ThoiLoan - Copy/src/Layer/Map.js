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
        this.add_building();
    },

    add_building: function()
    {
        var self = this;
        for(var key in cf.jsonInitGame["map"]) {
            if(cf.jsonInitGame["map"].hasOwnProperty(key)) {
                var building = cf.stringToItemInit(key);
                if(building !== null) {
                    self.addChild(building);
                    self.addBuildingToUserBuildingList(building);
                }
            }
        }

        // // id, level, row, col
        // var army_camp = new ArmyCamp(1, 8, cf.jsonInitGame["map"]["AMC_1"]["posX"], cf.jsonInitGame["map"]["AMC_1"]["posY"], true);
        // //this.locate_map_array(army_camp);
        // this.addChild(army_camp);
        // this.addBuildingToUserBuildingList(army_camp);
        //
        // // id, level, row, col, size
        // //var barrack = new Barrack(2, 6, 30, 30);
        // //this.locate_map_array(barrack)
        // //this.addChild(barrack);
        //
        // // id, level, row, col
        // var town_hall = new TownHall(3, 8, cf.jsonInitGame["map"]["TOW_1"]["posX"], cf.jsonInitGame["map"]["TOW_1"]["posY"], true);
        // //this.locate_map_array(town_hall);
        // this.addChild(town_hall);
        // this.addBuildingToUserBuildingList(town_hall);
        //
        // //
        // //id, level, row, col, type
        // var resource_1 = new Resource(4, 8, cf.jsonInitGame["map"]["RES_1"]["posX"], cf.jsonInitGame["map"]["RES_1"]["posY"], true, 1 );
        // //this.locate_map_array(resource_1)
        // this.addChild(resource_1);
        // this.addBuildingToUserBuildingList(resource_1);
        // //
        // //var resource_2 = new Resource(5, 8, 15, 17, 2);
        // //this.locate_map_array(resource_2)
        // //this.addChild(resource_2);
        //
        // //id, order, row, col, type
        // var builder_hut = new BuilderHut(6, 2, cf.jsonInitGame["map"]["BDH_1"]["posX"], cf.jsonInitGame["map"]["BDH_1"]["posY"], true);
        // //this.locate_map_array(builder_hut)
        // this.addChild(builder_hut, 2);
        // this.addBuildingToUserBuildingList(builder_hut);

        //id, level, row, col, type, current capacity type(random)
        //var cct = Math.floor(Math.random() * 4);
        //var storage_1 = new Storage(7, 8, 30, 25, 1, cct);
        //this.locate_map_array(storage_1);
        //this.addChild(storage_1, 2)
        //
        //cct = Math.floor(Math.random() * 4);
        //var storage_2 = new Storage(8, 8, 13, 28, 2, cct);
        //this.locate_map_array(storage_2);
        //this.addChild(storage_2, 2);

        //id, level, row, col, current orientation(random)
        //var co = Math.floor(Math.random() * 5)
        //var canon = new Canon(8, 2, 25, 10, co);
        //this.locate_map_array(canon);
        //this.addChild(canon, 2);
        //

        /* Obstacle */
        for (var i = 0; i < Object.keys(cf.jsonInitGame["obs"]).length/3; i++)
        {
            var obs = cf.jsonInitGame["obs"][i+1];
            var obstacle = new Obstacle(i + 15, obs["type"], obs["posX"], obs["posY"], true)
            //this.locate_map_array(obstacle)
            this.addChild(obstacle, 2);

        }

        //cc.eventManager.addListener(this.get_event_listener(town_hall), town_hall);
        //cc.eventManager.addListener(this.get_event_listener(army_camp), army_camp);
        ////cc.eventManager.addListener(this.get_event_listener(barrack), barrack);
        //cc.eventManager.addListener(this.get_event_listener(resource_1), resource_1);
        ////cc.eventManager.addListener(this.get_event_listener(resource_2), resource_2);
        ////cc.eventManager.addListener(this.get_event_listener(storage_1), storage_1);
        ////cc.eventManager.addListener(this.get_event_listener(storage_2), storage_2);
        //cc.eventManager.addListener(this.get_event_listener(builder_hut), builder_hut);
        ////cc.eventManager.addListener(this.get_event_listener(canon), canon);
    },

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
        this.addChild(this._tileMap, 0, 1);
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

    log_map_array: function()
    {
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

    get_avaiable_position: function(size)
    {
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