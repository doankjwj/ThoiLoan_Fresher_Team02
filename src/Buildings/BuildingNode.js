var BuildingNode = cc.Node.extend({
    _id: null,
    _level: null,
    _row: null,
    _col: null,
    _size: null,
    _existed: null,
    _type: null,
    _is_active: true,
    _finishing_time: null,
    _name: null,

    _center_building: null,
    _grass: null,
    _grassShadow: null,
    _arrow: null,
    _green:null,
    _red: null,
    _defence: null,
    _txtName: null,

    /* Button Commit & Cancel Build */
    _gui_commit_build: null,
    _gui_cancel_build: null,

    /* Start Build GUI */
    _info_bar: null,
    _info_bar_bg: null,
    _txt_time_remaining: null,
    _time_remaining: null,
    _time_total: null,
    _BAR_WIDTH: 311,
    _BAR_HEIGHT: 36,
    _effect_level_up: null,

    _buildingSTR: null,

    /* Order In User Building List */
    _orderInUserBuildingList: null,

    _listener: null,
    _listenerMove: null,

    ctor: function(id, level, row, col, existed) {
        this._super();
        this.scale = cf.SCALE;
        this._existed = existed;
        this._id = id;
        this._row = row;
        this._col = col;
        this._level = level;

        this._txtName = cc.LabelBMFont(this._name, font.soji20);
        this._txtName.setColor(cc.color(189,183,107, 255));
        this.addChild(this._txtName, 50);
        this._txtName.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtName.setPosition(cc.p(0, this._size * cf.tileSize.height / 2))
        this._txtName.visible = false;

        //Set Id
        var tmp = (this._orderInUserBuildingList + 1).toString();
        if(cf.user._buildingListCount[this._orderInUserBuildingList] >= 10) {
            tmp += cf.user._buildingListCount[this._orderInUserBuildingList].toString();
        } else tmp = tmp + "0" + cf.user._buildingListCount[this._orderInUserBuildingList].toString();
        var tag= parseInt(tmp);
        this.setTag(tag);
        this._id = tag;

        //grass
        this._grass = new grass(this._size);
        this.addChild(this._grass, 0);


        //building shadow
        this._grassShadow = new GrassShadow(this._size);
        this.addChild(this._grassShadow, this._grass.getLocalZOrder() + 1);
        this._grassShadow.scale = this._grass.scale;

        //arrow
        this._arrow = cc.Sprite(res.buildingOnMoveGUI(gv.buildOnMoveGUI.arrow, this._size))
        this._arrow.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0
        });
        this.addChild(this._arrow, this._grassShadow.getLocalZOrder() + 1);


        //green
        this._green = cc.Sprite(res.buildingOnMoveGUI(gv.buildOnMoveGUI.green, this._size));
        this._green.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 2
        })
        this._green.visible = false;
        this.addChild(this._green, this._arrow.getLocalZOrder() + 1);

        //red
        this._red = cc.Sprite(res.buildingOnMoveGUI(gv.buildOnMoveGUI.red, this._size));
        this._red.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 2
        });
        this._red.visible = false;
        this.addChild(this._red, this._green.getLocalZOrder() + 1);

        //defence
        this._defence = cc.Sprite(buildingGUI.defence);
        this._defence.attr({
            anchorX: 0.5,
            anchorY: 0.75,
            scale: this.scale * this._size / 1.5,
            visible: false
        });
        this.addChild(this._defence, 20);

        //Button commit build
        this._gui_commit_build = ccui.Button(buildingGUI.buildCommit);
        this._gui_commit_build.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            y: cf.tileSize.height * cf.SCALE * 2,
            x: - cf.tileSize.width * cf.SCALE,
            visible: false
        });
        this.addChild(this._gui_commit_build, this._defence.getLocalZOrder() + 1);

        //Button cancel build
        this._gui_cancel_build = ccui.Button(buildingGUI.buildCancel);
        this._gui_cancel_build.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            y: cf.tileSize.height * cf.SCALE * 2,
            x: cf.tileSize.width * cf.SCALE,
            visible: false
        });
        this.addChild(this._gui_cancel_build, this._defence.getLocalZOrder() + 1);

        // Location
        this.x = cf.tileLocation[row][col].x;
        this.y = cf.tileLocation[row][col].y - (this._size/2) * cf.tileSize.height;


        //Update zOrder
        if(this._existed)
            this.updateZOrder();
        else this.setLocalZOrder(200);

        /* Effect Level Up */
        this.initEffectLevelUp();


        this.schedule(this.updateBuildStatus, 1);

        //this.showBuildingButton();

        /* Add event listener */

        this._listenerMove = this.get_event_listener(this);
        cc.eventManager.addListener(this._listenerMove, this);
        var self = this;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // swallowTouches: true,
            onTouchBegan: function(touch, event) {
                if(cf.isDeciding) return false;
                var locationNote = self.convertToNodeSpace(touch.getLocation());
                var w = self._size * cf.tileSize.width / 2 ;
                var h = self._size * cf.tileSize.height / 2 ;
                var x = locationNote.x;
                var y = locationNote.y;
                var polygon = [ [ -w, 0 ], [ 0, h ], [ w, 0 ], [ 0, -h ] ];

                if (MainLayer.inside([x, y], polygon) && (cf.building_selected !== self._id))
                {
                    self._txtName.visible = true;
                    return true;
                }
                else
                {
                    self.onEndClick();
                    self.hideBuildingButton();
                    cf.building_selected = 0;
                    self._listenerMove.setEnabled(false);
                    return false
                }
                cf.r_old = self._row;
                cf.c_old = self._col;
                return true;
            },

            onTouchEnded: function(touch, event) {
                if(!cf.isMapMoving) {
                    self.getParent().getParent().showListBotButton();
                    self.onClick();
                    self.showBuildingButton();
                    cf.building_selected = self._id;
                    cf.current_r = self._row;
                    cf.current_c = self._col;
                    self._listenerMove.setEnabled(true);
                    this.setEnabled(false);
                }
            }
        });
        if(this._existed) this._listenerMove.setEnabled(false);
        else {
            this._listenerMove.setEnabled(true);
            this._listener.setEnabled(false);
            cf.current_c = self._col;
            cf.current_r = self._row;
        }
        if(this._existed) this.locate_map_array(this);
    },

    initEffectLevelUp: function() {
        this._effect_level_up = cc.Sprite(res.tmp_effect);
        this._effect_level_up.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: cf.SCALE,
            visible: false
        });
        this.addChild(this._effect_level_up, this._defence.getLocalZOrder() + 1);
    },

    updateBuildStatus: function() {
        if (this._is_active)
        {
            this._effect_level_up.visible = false;
            return;
        }
        if (this._time_remaining <= 0)
        {
            this.onCompleteBuild();
            return;
        }
        this._time_remaining -= 1;

        var seconds = this._time_remaining;

        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds/ 60);
        seconds  -= mnts*60;
        var timeRemaining = (days !== 0 ? (days.toString() + "d") : "" ) + (hrs !== 0 ? (hrs.toString() + "h") : "") + (mnts !== 0 ? (mnts.toString() + "m") : "") + seconds.toString() + "s";

        //var timeRemaining = Math.floor(this._time_remaining / 60 / 60/ 24) + "d" + Math.floor(this._time_remaining / 60 / 60) + "h" + Math.floor(this._time_remaining / 60) + "m" + (this._time_remaining % 60) + "s"
        this._txt_time_remaining.setString(timeRemaining);
        this._info_bar_bg.setTextureRect(cc.rect(0, 0, this._BAR_WIDTH * (this._time_total - this._time_remaining) / this._time_total, this._BAR_HEIGHT))
    },

    onCompleteBuild: function() {
        this._is_active = true;
        this._effect_level_up.visible = true;
        if (cf.animationConstructLevelUp == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_construct_levelup.plist", res.folder_effect + "effect_construct_levelup.png");
        }
        this._txt_time_remaining.visible = false;
        this._info_bar.visible = false;
        this._info_bar_bg.visible = false;
        this._defence.visible = false;
        this._effect_level_up.runAction(cc.Sequence(MainLayer.get_animation("effect_construct_levelup ", 6).clone()).clone());
        //cf.user.updateResource();

        var order = this._orderInUserBuildingList;
        if (order == gv.orderInUserBuildingList.townHall || order == gv.orderInUserBuildingList.storage_1 || order == gv.orderInUserBuildingList.storage_2 || order == gv.orderInUserBuildingList.storage_3)
            cf.user.updateMaxStorageSingle(this._id);

        /* Update user infor && GUI */
            cf.user._builderFree ++;
        cf.user.updateSingleBuilder();


    },

    startBuild: function() {
        this._existed = true;
        //this.locate_map_array(this);
        this._time_remaining = this.getTimeRequire();
        this._time_total = this._time_remaining;
        this._is_active = false;

        /* Time Bar */
        this._info_bar = cc.Sprite(res.folder_gui_build + "info_bar.png", cc.rect(0,0, this._BAR_WIDTH, this._BAR_HEIGHT));
        this._info_bar.scale = 0.5 * cf.SCALE;
        this._info_bar.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar.scale,
            y: cf.tileSize.height * cf.SCALE * 2
        });
        this.addChild(this._info_bar, this._defence.getLocalZOrder() + 1);
        this._info_bar_bg = cc.Sprite(res.folder_gui_build + "info_bar_BG.png", cc.rect(0,0, 0, this._BAR_HEIGHT));
        this._info_bar_bg.scale = 0.5 * cf.SCALE;
        this._info_bar_bg.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar_bg.scale,
            y: cf.tileSize.height * cf.SCALE * 2
        });
        this.addChild(this._info_bar_bg, this._defence.getLocalZOrder() + 1);

        /* Time Text */
        var seconds = this._time_total;
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds/ 60);
        seconds  -= mnts*60;
        var timeRemaining = (days !== 0 ? (days.toString() + "d") : "" ) + (hrs !== 0 ? (hrs.toString() + "h") : "") + (mnts !== 0 ? (mnts.toString() + "m") : "") + seconds.toString() + "s";

        //var timeRemaining = Math.floor(this._time_total / 60 / 60/ 24) + "d" + Math.floor(this._time_total / 60 / 60) + "h" + Math.floor(this._time_total / 60) + "m" + (this._time_total % 60) + "s"
        this._txt_time_remaining = cc.LabelBMFont.create(timeRemaining,  font.soji20);
        this._txt_time_remaining.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: cf.tileSize.height * cf.SCALE * 2
        })
        this.addChild(this._txt_time_remaining, this._defence.getLocalZOrder() + 1);

        this._defence.visible = true;

        /* Update Builder */
        cf.user._builderFree --;
        cf.user.updateSingleBuilder();

        this.hideBuildingButton();
    },

    getTimeRequire: function() {
        var json = null;
        switch (this._buildingSTR)
        {
            case gv.buildingSTR.townHall:
                json = gv.json.townHall;
                break;
            case gv.buildingSTR.armyCamp_1:
                json = gv.json.armyCamp;
                break;
            case gv.buildingSTR.barrack_1:
                json = gv.json.barrack;
                break;
            case gv.buildingSTR.resource_1:
                json = gv.json.resource;
                break;
            case gv.buildingSTR.resource_2:
                json = gv.json.resource;
                break;
            case gv.buildingSTR.storage_1:
                json = gv.json.storage;
                break;
            case gv.buildingSTR.storage_2:
                json = gv.json.storage;
                break;
            case "canon_":
                return this._level * 150;
            case gv.buildingSTR.builderHut:
                return 0;
            default:
                break;
        }

        return (json[this._buildingSTR][this._level]["buildTime"]);

    },

    addCenterBuilding: function() {
        if (this._buildingSTR !== gv.buildingSTR.obstacle)
        {
            cc.eventManager.addListener(this._listener, this);
        }
        var str = this._buildingSTR;
        switch(str)
        {
            case gv.buildingSTR.townHall:
                this._center_building = cc.Sprite(res.folder_town_hall + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.builderHut:
                this._center_building = cc.Sprite(res.folder_builder_hut + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.armyCamp_1:
                this._center_building = cc.Sprite(res.folder_army_camp + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);;
                break;
            case gv.buildingSTR.barrack_1:
                this._center_building = cc.Sprite(res.folder_barrack + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_1:
                this._center_building = cc.Sprite(res.folder_gold_mine + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_2:
                this._center_building = cc.Sprite(res.folder_elixir_collector + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_1:
                this._center_building = cc.Sprite(res.folder_gold_storage + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_2:
                this._center_building = cc.Sprite(res.folder_elixir_storage + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.canon:
                this._center_building = cc.Sprite(res.folder_canon + str + "_" + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.obstacle:
                this._center_building = cc.Sprite(res.folder_obs + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            default:
                break;
        }

        this._center_building.attr({
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(this._center_building, this._defence.getLocalZOrder() - 1);

    },

    onClick: function() {
        this._arrow.visible = true;
        this._green.visible = true;
        var scale_out = cc.scaleTo(0.25, 1.0);
        this._arrow.runAction(scale_out);
        this._arrow.setGlobalZOrder(50);
    },

    onEndClick: function() {
        this.getParent().getParent().hideListBotButton();
        var scale_in = cc.scaleTo(0.25, 0);
        this._arrow.runAction(scale_in);
        this._green.visible = false;
        this._arrow.visible = false;
        this._txtName.visible = false;
        this._arrow.setLocalZOrder(this._grassShadow.getLocalZOrder() + 1);
        // this.getParent().getParent().pullBuildingButtons();
    },

    showBuildingButton: function() {
        var self = this;
        if(!this._existed) {
            this._gui_cancel_build.visible = true;
            this._gui_commit_build.visible = true;
        }
        this._gui_cancel_build.addClickEventListener(function(){
            cf.isDeciding = false;
            self.hideBuildingButton();
            self.getParent().removeChild(self);
        });
        this._gui_commit_build.addClickEventListener(function(){
            if(!self._red.visible) {
                self.locate_map_array(self);
                self.startBuild();
                self.onEndClick();
                self.hideBuildingButton();
                self.getParent().addBuildingToUserBuildingList(self);
                self.updateZOrder();
                cf.building_selected = 0;
                cf.isDeciding = false;
                testnetwork.connector.sendBuild(self._id, self._row, self._col);
            }
        });
    },



    hideBuildingButton: function() {
        this._gui_cancel_build.visible = false;
        this._gui_commit_build.visible = false;
        this._gui_cancel_build.addClickEventListener(function() {});
        this._gui_commit_build.addClickEventListener(function() {});
    },

    get_event_listener: function(b) {
        var self = this;
        var size = b._size;

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event)
            {
                var locationNote = self.convertToNodeSpace(touch.getLocation());
                var w = self._size * cf.tileSize.width / 2 ;
                var h = self._size * cf.tileSize.height / 2 ;
                var x = locationNote.x;
                var y = locationNote.y;
                var polygon = [ [ -w, 0 ], [ 0, h ], [ w, 0 ], [ 0, -h ] ];

                if (MainLayer.inside([ x, y], polygon) )
                {
                    self.showBuildingButton();
                    cf.building_selected = self._id;
                    cf.current_r = self._row;
                    cf.current_c = self._col;
                    self.unlocate_map_array(cf.current_r, cf.current_c, size);
                    return true;
                }
                else
                {
                    if(!self._existed) return false;
                    self.onEndClick();
                    this.setEnabled(false);
                    self._listener.setEnabled(true);
                    self.hideBuildingButton();
                    cf.building_selected = 0;
                    self.updateZOrder();
                    self._red.visible = false;
                    if (!self.none_space(self._row, self._col, size, self._id))
                    {
                        self._row = cf.current_r;
                        self._col = cf.current_c;
                        self.x = cf.tileLocation[self._row][self._col].x;
                        self.y = cf.tileLocation[self._row][self._col].y - (size / 2) * cf.tileSize.height;
                        self.locate_map_array(self);

                    }
                    else
                    {
                        self.unlocate_map_array(cf.current_r, cf.current_c, size);
                        self.locate_map_array(self);
                        testnetwork.connector.sendMove(self._id, self._row, self._col);
                    }
                    return false;
                }
                cf.r_old = self._row;
                cf.c_old = self._col;
                return false;
            },
            onTouchMoved: function(touch, event)
            {
                if (self._id !== cf.building_selected) return;
                //if (b.id != cf.building_selected) return;
                var location_touch = touch.getLocation();
                var tile_location = null;

                for (var r = 1; r < 41; r++)
                    for (var c = 1; c < 41; c++)
                    {
                        tile_location = cf.tileLocation[r][c];
                        var x = tile_location.x * cf.BIG_MAP_SCALE;
                        var y = tile_location.y * cf.BIG_MAP_SCALE;
                        var polygon = [[x - cf.tileSize.width/2 * cf.BIG_MAP_SCALE, y], [x, y + cf.tileSize.height/2 * cf.BIG_MAP_SCALE], [x + cf.tileSize.width/2 * cf.BIG_MAP_SCALE, y], [x , y - cf.tileSize.height/2 * cf.BIG_MAP_SCALE]];
                        if (MainLayer.inside([location_touch.x - self.getParent().x, location_touch.y - self.getParent().y], polygon)) {
                            var row = r - Math.floor(size / 2);
                            var col = c - Math.floor(size / 2);
                            if (row === cf.r_old && col === cf.c_old) return;
                            if (!self.check_out_of_map(row, col, size)) return;
                            cf.r_old = row;
                            cf.c_old = col;
                            self._row = row;
                            self._col = col;
                            self.setLocalZOrder(200);
                            self.x = cf.tileLocation[self._row][self._col].x;
                            self.y = cf.tileLocation[self._row][self._col].y - (size / 2) * cf.tileSize.height;

                            if (!self.none_space(self._row, self._col, size, self._id))
                            {
                                self._red.visible = true;
                                self._green.visible = false;
                            }
                            else
                            {
                                self._red.visible = false;
                                self._green.visible = true;
                            }
                            return true
                        }
                    }

                return true;
            },
            onTouchEnded: function(touch, event)
            {
            }
        });

        return listener1;
    },

    none_space: function(row, col, size, id) {
        for (var r = row; r < row + size; r++)
            for (var c = col; c < col + size; c++ )
                if (cf.map_array[r][c] !== 0 && cf.map_array[r][c] !== id)
                {
                    return false;
                }
        return true;
    },

    unlocate_map_array: function(row, col, size) {
        for (var r = row; r < row + size; r ++)
            for (var c = col; c < col + size; c++)
                cf.map_array[r][c] = 0;
    },

    locate_map_array: function(b) {
        var r = b._row;
        var c = b._col;
        var size = b._size;

        for (var i = r; i < r + size; i++)
            for (var j = c; j < c + size; j++)
                cf.map_array[i][j] = b._id;
    },

    check_out_of_map: function(row, col, size) {
        return !(row < 1 || col < 1 || row + size > 41 || col + size > 41);
    },

    updateZOrder: function() {
        this.setLocalZOrder(this._row + this._col);
    }
});
