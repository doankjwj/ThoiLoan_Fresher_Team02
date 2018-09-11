var ResourceItem = cc.Node.extend({
    _icon: null,
    _count: null,

    _defaultScale: 1.5,

    ctor: function(type)
    {
        this._super();
        this.scale = this._defaultScale;

        var url = null;
        currentCapacity = null;

        switch (type)
        {
            case cf.shopResourceItem.ResGold:
                url = shopGUI.iconGoldBar;
                currentCapacity = cf.user._currentCapacityGold;
                break;
            case cf.shopResourceItem.ResElixir:
                url = shopGUI.iconElixirBar;
                currentCapacity = cf.user._currentCapacityElixir;
                break;
            case cf.shopResourceItem.ResDarkElixir:
                url = shopGUI.iconDarkElixirBar;
                currentCapacity = cf.user._currentCapacityDarkElixir;
                break;
            case cf.shopResourceItem.ResCoin:
                url = shopGUI.iconGBar;
                currentCapacity = cf.user._currentCapacityCoin;
            default:
                url = null;
        }

        this._icon = cc.Sprite(url);
        this._icon.setAnchorPoint(cc.p(1, 0.5));
        this._icon.setPosition(cc.p(0, 0));
        this.addChild(this._icon, 0)

        this._count = cc.LabelBMFont.create(currentCapacity, font.soji20);
        this._count.setAnchorPoint(cc.p(0, 0.5));
        this._count.setPosition(cc.p(0, 0));
        this.addChild(this._count, 0);
    }
})