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

    updateWallIcon: function(number){

        var level = this._existed ? this._level : this.getTempLevel();

        this._center_building.setTexture(res.folder_wall + "WAL_1_" + level + "/" + "WAL_1_" + level + "/" + res.image_postfix_1 + number + res.image_postfix_2);
        this._center_building.setTextureRect(this._center_building.getTextureRect());

    },

    getWallImage: function() {

        var pos = cc.p(this._row, this._col);

        var vector = [
            cc.p(0, -1),
            cc.p(-1, 0)
        ];

        var direction = 0;
        var numberOfWallBeside = 0;

        for(var i=0; i<2; i++) {

            var posTmp = cc.p(pos.x + vector[i].x, pos.y + vector[i].y);
            if(posTmp.x > 40 || posTmp.y > 40 || posTmp.x < 1 || posTmp.y < 1) continue;

            // cc.log(cf.map_array[posTmp.x][posTmp.y] / 100);

            if(Math.floor(cf.map_array[posTmp.x][posTmp.y] / 100) - 1 === gv.orderInUserBuildingList.wall) {
                if(i === 0) direction = 1;
                else direction = 2;
                numberOfWallBeside += 1;
            }
        }

        if(numberOfWallBeside === 2) direction = 3;


        return direction;

    },

    locate_map_array: function (b) {

        this._super(b);
        cf.user.updateWallList();

    },

    updateAnim: function() {

    }

});