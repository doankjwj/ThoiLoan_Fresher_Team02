var GrassShadow = cc.Sprite.extend({
    ctor: function(size)
    {
        this._super("res/Art/Map/map_obj_bg/GRASS_" + size + "_Shadow.png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.scale = 3 * cf.SCALE;
        //this.visible = false;
    }
})