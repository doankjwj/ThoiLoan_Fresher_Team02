var grass = cc.Sprite.extend({
    ctor: function(size)
    {
        this._super("res/Art/Map/map_obj_bg/BG_0/" + size + ".png");
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.scale = 2;
    }
})