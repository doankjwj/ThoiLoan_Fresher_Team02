var PopUPMessage = cc.Node.extend({
    _txtTitle: null,
    _txtMessage: null,
    _bg: null,

    _swallowTouch: null,

    ctor: function()
    {
        this._super();
        var self = this;

        /* Background */
        this._bg = cc.Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this.addChild(this._bg, 0);

        /* Nền sau */
        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        //this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);

        /* Title */
        this._txtTitle = cc.LabelBMFont("Thông Báo", font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtTitle.setPosition(cc.p(0, this._bg.height/2-20));
        this.addChild(this._txtTitle);

        /*Message*/
        this._txtMessage = cc.LabelBMFont("Message", font.soji20);
        this._txtMessage.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtMessage.setPosition(cc.p(0, 0));
        this.addChild(this._txtMessage);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        // this._btnClose.scale =  0.75;
        this._btnClose.setPosition(cc.p(this._bg.width/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height/2 - this._btnClose.height  *this._btnClose.scale/2));
        this.addChild(this._btnClose, 1);

        this._btnClose.addClickEventListener(function(){
            self.hide();
            self.onDisappear();
        });

    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },

    setMessage: function(msg)
    {
        this._txtMessage.setString(msg);
    },

    show: function()
    {
        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    },

    hide: function()
    {
        this.setPosition(cc.p(cc.winSize.width/2, - cc.winSize.height/2));
        this.getParent().getChildByTag(gv.tag.TAG_POPUP).onDisappear();
    }
});

PopUPMessage.getOrCreate = function()
{
    if (!gv.popUpMessage)
    {
        gv.popUpMessage = new PopUPMessage();
    }
    return gv.popUpMessage;
};