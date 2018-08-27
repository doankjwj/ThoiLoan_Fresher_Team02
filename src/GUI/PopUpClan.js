/**
 * Created by CPU02326_Local on 8/23/2018.
 */
var PopUpClan = cc.Node.extend({

    _bg: null,
    _buttonClose: null,
    _tab1: null,
    _tab2: null,
    _tab3: null,
    _flag1: null,
    _flag2: null,
    _flag3: null,
    _label1: null,
    _label2: null,
    _label3: null,

    ctor: function()
    {
        this._super();
        this.initTab();
        this.initContent();
    },
    initTab: function()
    {
        var self = this;

        /* Background */
        this._bg = cc.Scale9Sprite(res.clanGUI.background);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.setCapInsets(cc.rect(this._bg.width/10, this._bg.height/8 , this._bg.width/10*8, this._bg.height/8*6));
        this._bg.width = cc.winSize.width / 5 * 3.6;
        this._bg.height = cc.winSize.height /5 * 4;
        this.addChild(this._bg, 0);

        /* Bg Null */
        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        //this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        /* Button Close */
        this._buttonClose = ccui.Button(res.clanChatGUI.buttonClose);
        this._buttonClose.setPosition(425, 260);
        this.addChild(this._buttonClose, 1);
        this._buttonClose.addClickEventListener(function(){
            self.setPosition(cc.p(0, - cc.winSize.height));
            self.onDisappear();
        });

        /* TAB */
        this._bar1 = cc.Sprite(res.clanGUI.tabBarBG);
        this._bar1.setPosition(-200, 257);
        this.addChild(this._bar1, 1);

        this._flag1 = cc.Sprite(res.clanGUI.flagBG);
        this._flag1.setAnchorPoint(0.5, 1);
        this._flag1.setPosition(-200, 290);
        this.addChild(this._flag1, 1);

        this._label1 = cc.LabelBMFont("THAM GIA\nBANG HỘI", font.soji20);
        this._label1.scale = 0.8;
        this._label1.setPosition(-200, 257);
        this.addChild(this._label1, 1);
        // =======

        this._bar2 = cc.Sprite(res.clanGUI.tabBar);
        this._bar2.setPosition(0, 258);
        this.addChild(this._bar2, 1);

        this._flag2 = cc.Sprite(res.clanGUI.flag);
        this._flag2.setAnchorPoint(0.5, 1);
        this._flag2.setPosition(0, 291);
        this.addChild(this._flag2, 1);

        this._label2 = cc.LabelBMFont("   TẠO\nBANG HỘI", font.soji20);
        this._label2.scale = 0.8;
        this._label2.setPosition(0, 258);
        this.addChild(this._label2, 1);
        // =======

        this._bar3 = cc.Sprite(res.clanGUI.tabBarBG);
        this._bar3.setPosition(200, 257);
        this.addChild(this._bar3, 1);

        this._flag3 = cc.Sprite(res.clanGUI.flagBG);
        this._flag3.setAnchorPoint(0.5, 1);
        this._flag3.setPosition(200, 290);
        this.addChild(this._flag3, 1);

        this._label3 = cc.LabelBMFont("TÌM KIẾM\nBANG HỘI", font.soji20);
        this._label3.scale = 0.8;
        this._label3.setPosition(200, 257);
        this.addChild(this._label3, 1);
    },
    initContent: function()
    {
        this._content = new NodeCreateClan();
        this._content.setPosition(0, 0);
        this._content.scale = 0.7;
        this.addChild(this._content, 2);
    },

    addTouchListener: function () {
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
    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },
})