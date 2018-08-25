/**
 * Created by CPU02326_Local on 8/15/2018.
 */
var ItemUserOnline = cc.Layer.extend({
    _order: null,
    _name: null,
    _status: null,

    _bg: null,
    _labelName: null,
    _iconStatus: null,

    ctor: function(order, name, status)
    {
        this._super();
        this._order = order;
        this._name = name;
        this._status = status;

        this.init();
    },
    init: function()
    {
        if (this._order % 2 == 0){
            this._bg = cc.Sprite(res.clanChatGUI.barUserOnline);
            this.addChild(this._bg, 0);
        }
        this._labelName = cc.LabelBMFont(this._name, font.soji20);
        this._labelName.setColor(cc.color(255, 204, 153, 255));
        this._labelName.scale = 0.4;
        this._labelName.setAnchorPoint(0, 0.5);
        this._labelName.setPosition(-43, 0);
        this.addChild(this._labelName, 1);

        if (this._status)
            this._iconStatus = cc.Sprite(res.clanChatGUI.iconUserOnline);
        else
            this._iconStatus = cc.Sprite(res.clanChatGUI.iconUserOffline);
        this._iconStatus.setPosition(40, 0);
        this.addChild(this._iconStatus, 1);
    },

    updateStatus: function(status)
    {
        var url = (status==1)? res.clanChatGUI.iconUserOnline : res.clanChatGUI.iconUserOffline;
        cc.log(url);
        fn.replaceSpriteImage(this._iconStatus, url);
    }
})