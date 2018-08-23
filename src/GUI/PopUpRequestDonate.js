/**
 * Created by CPU02326_Local on 8/21/2018.
 */
var PopUpRequestDonate = cc.Node.extend({

    _txtTitle: null,
    _txtMessage: null,
    _bg: null,
    _textField: null,

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

        /* Message */
        this._txtMessage = cc.LabelBMFont("Xin quân", font.soji20);
        this._txtMessage.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtMessage.setPosition(cc.p(0, this._bg.height/2 - 25));
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

        /* Edit Text */
        var bgSmall = cc.Sprite(res.researchTroopGUI.spanWhite);
        bgSmall.setScaleX(0.5);
        bgSmall.setScaleY(1.2);
        bgSmall.setPosition(0, 20);
        this.addChild(bgSmall);
        var textBG = cc.Sprite(res.clanChatGUI.editTextChat);
        textBG.setScaleY(1.5);
        textBG.setPosition(0, 15);
        this.addChild(textBG, 0);
        this._textField = ccui.TextField("", font.soji20);
        this._textField.setMaxLength(30);
        this._textField.setFontSize(40);
        this._textField.setMaxLengthEnabled(true);
        this._textField.setPlaceHolder("Cho mình xin quân nhé !");
        this._textField.setColor(cc.color(0, 0, 0, 255));
        this._textField.setPosition(0, 15);
        this.addChild(this._textField, 1);

        /* Button Commit */
        this._buttonOk = ccui.Button(logInGUI.btnOk);
        this._buttonOk.setTitleText("ĐỒNG Ý");
        this._buttonOk.setTitleColor(cc.color(255, 255, 255, 255));
        this._buttonOk.setPosition(0, -80);
        this._buttonOk.setTitleFontSize(22);
        this._buttonOk.scale = 1.2;
        this.addChild(this._buttonOk, 1);
        this._buttonOk.addClickEventListener(function(){
            self.onDisappear();
            self.hide();
            self.onRequest();
        }.bind(this));
    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },
    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },
    show: function()
    {
        this._textField.setPlaceHolder("Cho mình xin quân nhé !");
        this._textField.setString("");
        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
    },
    hide: function()
    {
        this.setPosition(cc.p(cc.winSize.width/2, - cc.winSize.height/2));
        this.getParent().getChildByTag(gv.tag.TAG_POPUP).onDisappear();
    },

    onRequest: function()
    {
        var msg = (this._textField.string.length == 0) ? this._textField.getPlaceHolder() : this._textField.string;
        testnetwork.connector.sendRequestDonate(msg);
        gvGUI.layerClanChat._scrollviewChat.scrollToTop(1, 0);
    }
})