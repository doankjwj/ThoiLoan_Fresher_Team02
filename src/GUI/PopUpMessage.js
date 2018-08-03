var PopUPMessage = cc.Node.extend({
    _txtTitle: null,
    _txtMessage: null,
    _bg: null,

    ctor: function()
    {
        this._super();
        var self = this;

        /* Background */
        this._bg = cc.Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this.addChild(this._bg, 0);

        /* Message */
        this._txtMessage = cc.LabelBMFont("Message", font.soji20);
        this._txtMessage.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtMessage.setPosition(cc.p(0, 0));
        this.addChild(this._txtMessage);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        // this._btnClose.scale =  0.75;
        this._btnClose.setPosition(cc.p(this._bg.width/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height/2 - this._btnClose.height  *this._btnClose.scale/1.5));
        this.addChild(this._btnClose, 1);

        this._btnClose.addClickEventListener(function(){
            self.hide();
        });

        this.addListener();
    },

    addListener: function()
    {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                var locationNode = self.convertToNodeSpace(touch.getLocation());
                cc.log("Touch On: " + locationNode.x + " " + locationNode.y);
                var w = self.width;
                var h = self.height;
                var polygon = [[-w, 0], [0, h], [w, 0], [0, -h]];

                if (fn.pointInsidePolygon([locationNode.x, locationNode.y], polygon))
                    cc.log("Touch Inside");
                return false;
            }
        }, this)
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