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

        fn.replaceSpriteWithSpriteTexture(this._center_building, res.folder_wall + "WAL_1_" + level + "/" + "WAL_1_" + level + "/" + res.image_postfix_1 + number + res.image_postfix_2);
        // this._center_building.setSpriteFrame(res.folder_wall + "WAL_1_" + level + "/" + "WAL_1_" + level + "/" + res.image_postfix_1 + number + res.image_postfix_2);
        // this._center_building.setTextureRect(this._center_building.getTextureRect());

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

    },

    getRowLength: function() {

        var tr = 0;
        var tl = 0;
        var br = 0;
        var bl = 0;

        var row = this._row;
        var col = this._col;

        var r = row - 1;
        var c = col;

        if(r >= 1) {
            while(Math.floor(cf.map_array[r][c]/100) - 1 === gv.orderInUserBuildingList.wall) {
                tl += 1;
                r -= 1;
                if(r < 1) break;
            }
        }

        r = row+1;

        if(r <= 40) {
            while(Math.floor(cf.map_array[r][c]/100) - 1 === gv.orderInUserBuildingList.wall) {
                br += 1;
                r += 1;
                if(r > 40) break;
            }
        }

        r = row;
        c = col - 1;


        if(c >= 1) {
            while(Math.floor(cf.map_array[r][c]/100) - 1 === gv.orderInUserBuildingList.wall) {
                tr += 1;
                c -= 1;
                if(c < 1) break;
            }
        }

        c = col + 1;


        if(c <= 40) {
            while(Math.floor(cf.map_array[r][c]/100) - 1 === gv.orderInUserBuildingList.wall) {
                bl += 1;
                c += 1;
                if(c > 40) break;
            }
        }

        return [tl, br, tr, bl];

    },

    getWallList: function() {

        var listLength = this.getRowLength();

        var dir = [cc.p(-1, 0), cc.p(1, 0)];

        var up = listLength[0];
        var down = listLength[1];

        if(listLength[2] + listLength[3] > listLength[0] + listLength[1]) {
            dir[0].x = 0;
            dir[0].y = -1;

            dir[1].x = 0;
            dir[1].y = 1;

            up = listLength[2];
            down = listLength[3];
        }

        var row = this._row;
        var col = this._col;

        var listWall = [];
        listWall.push(this);

        for(var i=1; i<=up; i++) {
            var id = cf.map_array[row + dir[0].x*i][col + dir[0].y * i];
            var w = fn.getUserBuilding(Math.floor(id/100)-1, id%100);
            listWall.push(w);
        }
        for(var i=1; i<=down; i++) {
            var id = cf.map_array[row + dir[1].x*i][col + dir[1].y * i];
            var w = fn.getUserBuilding(Math.floor(id/100)-1, id%100);
            listWall.push(w);
        }

        return listWall;
    },

    getUpdatePrice: function() {

        var townHall = cf.user._buildingList[gv.orderInUserBuildingList.townHall][0];

        var goldPrice = gv.json.wall[this._buildingSTR][this.getNextLevel()]["gold"];
        var darkElixirPrice = gv.json.wall[this._buildingSTR][this.getNextLevel()]["darkElixir"];

        if(this._level === this._maxLevel || townHall._level < this._jsonConfig[this._buildingSTR][Math.min(this._level + 1, this._maxLevel)]["townHallLevelRequired"]) {
            goldPrice = 0;
            darkElixirPrice = 0;
        }
        return [goldPrice, darkElixirPrice];

    },

    onClick: function() {
        this._super();

        if(cf.selectedWall.length !== 0 && this._id !== cf.building_selected) {

            this._arrow.visible = false;
            this._txtName.visible = false;
            if(this.getLocalZOrder() <= 200) this.setLocalZOrder(this.getLocalZOrder() + 200);
            this.popBuildingScale();

        }

    }

});