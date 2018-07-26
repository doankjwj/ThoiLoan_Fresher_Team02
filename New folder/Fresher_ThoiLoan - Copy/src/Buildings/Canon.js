var Canon = BuildingNode.extend({
    _defense_base: null,

    ctor: function(id, level, row, col, ori, existed)
    {
        this._size = 3;
        this._CENTER_BUILDING_STR = "canon_";

        this._super(id, level, row, col, existed);

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR, ori);

        /* Add Defense Base */
        this._defense_base = cc.Sprite(res.folder_defense_base + "DEF_1_" + this._level + "_Shadow.png");
        this._defense_base.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: cf.SCALE
        });
        this.addChild(this._defense_base, this._center_building.getLocalZOrder() - 1);

        /* random change orientation */
        this.schedule(this.changeOri, 1);
    },

    changeOri: function()
    {
        this.removeChild(this._center_building);
        var ro = (Math.floor(Math.random() * 5))
        this._center_building = new building(res.folder_canon + "canon_" + this._level + "/" + res.image_postfix_1 + ro + res.image_postfix_2);
        this._center_building.flippedX = (ro >= 2);
        this.addChild(this._center_building, this._defence.getLocalZOrder() - 1);
    }
})
