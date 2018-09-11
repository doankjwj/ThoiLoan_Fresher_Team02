var grass = cc.Sprite.extend({
    ctor: function(size, orderInUserBuildingList)
    {
        if (orderInUserBuildingList != gv.orderInUserBuildingList.obstacle)
            this._super(mapFolder + "map_obj_bg/BG_0/" + size + ".png");
        else
            this._super(mapFolder + "map_obj_bg/GRASS_0_" + size + "_OBS.png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.scale = 2;
    }
})