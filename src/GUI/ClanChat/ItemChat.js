/**
 * Created by CPU02326_Local on 8/16/2018.
 */
var ItemChat = cc.Node.extend({
    _id: null,
    _type: null,
    _userName: null,
    _userLevel: null,
    _text: null,
    _time: null,
    _currentTroop: null,
    _currentTroopQuantity: null,
    _maxTroopQuantity: null,

    _height: null,

    typeDefine: {
        chatText: 0,
        requestDonate: 1,
        eventClan: 2,
    },

    /* Listener Null */
    _listenerNull: null,

    ctor: function(id, type, userName, userLevel, text, time, currentTroop, currentTroopQuantity, maxTroopquantity){
        this._super();
        this._id = id;
        this._type = type;
        this._userName = userName;
        this._userLevel = userLevel;
        this._text = text;
        this._time = time;
        if (currentTroop) this._currentTroop = currentTroop;
        if (currentTroopQuantity) this._currentTroopQuantity = currentTroopQuantity;
        if (maxTroopquantity) this._maxTroopQuantity = maxTroopquantity;

        this.init();
    },

    init: function(){
        var self = this;

        var iconStar = cc.Sprite(res.clanGUI.iconStarSmall);
        iconStar.setPosition(-300/2, 65);
        iconStar.scale = 0.8;
        this.addChild(iconStar);

        this._labelLevel = cc.LabelBMFont(this._userLevel, font.soji20);
        this._labelLevel.setColor(cc.color(255, 255, 255, 255));
        this._labelLevel.setPosition(iconStar.x, iconStar.y);
        this._labelLevel.scale = 0.6;
        this.addChild(this._labelLevel);

        this._labelName = cc.LabelBMFont(this._userName, font.soji20);
        this._labelName.scale = 0.6;
        this._labelName.setColor(cc.color(255, 255, 102, 255));
        this._labelName.setAnchorPoint(0, 0.5);
        this._labelName.setPosition(iconStar.x + 20, this._labelLevel.y);
        this.addChild(this._labelName);

        this._labelMessage = cc.LabelBMFont(this._text, font.soji20);
        this._labelMessage.scale = 0.5;
        this._labelMessage.setColor(cc.color(255, 153, 0, 255));
        this._labelMessage.setAnchorPoint(0, 0.5);
        this._labelMessage.setPosition(-320/2, 45);
        this.addChild(this._labelMessage);

        var time = Math.floor((new Date().getTime() - this._time)/1000);
        time = cf.secondsToLongTime(time);
        if (time.length == 0) time = "0s";
        this._labelTime = cc.LabelBMFont(time + " trước", font.soji20);
        this._labelTime.scale = 0.4;
        this._labelTime.setColor(cc.color(255, 255, 102, 255));
        this._labelTime.setAnchorPoint(1, 0.5);
        this._labelTime.setPosition(165, 10);
        this.addChild(this._labelTime);

        // Widget cho quân
        if (this._type == this.typeDefine.requestDonate){
            this._labelMessage.setString("Cho mình xin quân nhé !");
            this._labelMessage.setColor(cc.color(255, 255, 255, 255));

            this._barDonateBG = cc.Sprite(res.clanChatGUI.barDonateTroopBG);
            this._barDonateBG.setAnchorPoint(0, 0.5);
            this._barDonateBG.setPosition(-38.5, 60);
            this.addChild(this._barDonateBG);
            this._barDonate = cc.Sprite(res.clanChatGUI.barDonateTroop);
            this._barDonate.setAnchorPoint(0, 0.5);
            this._barDonate.setPosition(-38.5, 61);
            this.addChild(this._barDonate);
            this._barDonate.setTextureRect(cc.rect(0, 0, Math.random() * 78, 10));

            this._buttonDonate = ccui.Button(res.clanChatGUI.buttonGreen);
            this._buttonDonate.setTitleText("Cho Quân");
            this._buttonDonate.setTitleFontSize(20);
            this._buttonDonate.setTitleColor(cc.color(255, 255, 255, 255));
            this._buttonDonate.scale = 0.85;
            this._buttonDonate.setPosition(0, 30);
            this.addChild(this._buttonDonate);
            this._buttonDonate.addClickEventListener(function(){
                self.onPopUpTroopDonate();
            }.bind(this));


            this._labelTroop = cc.LabelBMFont(Math.floor(Math.random() * this._maxTroopQuantity + 1) + "/" + this._maxTroopQuantity, font.soji20);
            this._labelTroop.scale = 0.6;
            this._labelTroop.setAnchorPoint(1, 0.5);
            this._labelTroop.setPosition(this._barDonate.x - 10, this._barDonate.y);
            this.addChild(this._labelTroop);

            iconStar.setPosition(-300/2, 100);
            this._labelLevel.setPosition(iconStar.x, iconStar.y);
            this._labelName.setPosition(iconStar.x + 20, this._labelLevel.y);
            this._labelMessage.setPosition(-320/2, 80);
        }

        //Kích thước của Item
        if (this._type == this.typeDefine.requestDonate)
            this._height = 120
        else this._height = 80;
    },

    updateTime: function()
    {
        var time = Math.floor((new Date().getTime() - this._time)/1000);
        time = cf.secondsToLongTime(time);
        this._labelTime.setString(time + " trước");
    },

    // Pop Up Cho quân
    onPopUpTroopDonate: function(){
        //var root = this.getParent().getParent().getParent().getParent();
        //root.popUpMessage("Cho Quân");
        var self = this;
        var parent = this.getParent().getParent().getParent(); // Layer chat
        /* Tạo một PopUp */
        if (!gvGUI.popUpDonateTroop){
            gvGUI.popUpDonateTroop = cc.Sprite(res.clanChatGUI.donateTroopBG);
            gvGUI.popUpDonateTroop.setAnchorPoint(0, 0.5);
            gvGUI.popUpDonateTroop.setPosition(-400, -400);
            parent.addChild(gvGUI.popUpDonateTroop, 2);
            self.addEventListenerForNull();

            var buttonClose = ccui.Button(res.clanChatGUI.buttonClose);
            var buttonCloseX = gvGUI.popUpDonateTroop.width - buttonClose.width;
            var buttonCloseY = gvGUI.popUpDonateTroop.height - buttonClose.height;
            buttonClose.setPosition(buttonCloseX, buttonCloseY);
            gvGUI.popUpDonateTroop.addChild(buttonClose, 0, gvGUI.TAG_BUTTON_CLOSE);
            buttonClose = gvGUI.popUpDonateTroop.getChildByTag(gvGUI.TAG_BUTTON_CLOSE);
            buttonClose.addClickEventListener(function () {
                self.onDisappearPopupDonateTroop();
            }.bind(this));

        };

        var actScale = cc.ScaleTo(0.1, 1);
        var seq = cc.Sequence.create(cc.CallFunc(function(){
                gvGUI.popUpDonateTroop.scale = 0.8;
                self.updateContentForPopUpDonate();
                gvGUI.popUpDonateTroop.setPosition(parent._bg.width/2 + 50, parent._bg.height/2);
            }),
            actScale
        )
        gvGUI.popUpDonateTroop.runAction(seq);
        gv.listenerNullForPopUpDonate.setEnabled(true);
    },
    addEventListenerForNull: function(){
        gv.listenerNullForPopUpDonate = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return true
            }
        });
        cc.eventManager.addListener(gv.listenerNullForPopUpDonate, gvGUI.popUpDonateTroop);
        gv.listenerNullForPopUpDonate.setEnabled(false);
        gv.listenerNullForPopUpDonate.retain();
    },
    updateContentForPopUpDonate: function(){
        onUpdateContentDonate(this._id);
    },
    onDisappearPopupDonateTroop: function(){
        gv.listenerNullForPopUpDonate.setEnabled(false);

        var act = cc.ScaleTo(0.1, 0.45);
        var seq = cc.Sequence.create(act,
            cc.CallFunc(function(){
                gvGUI.popUpDonateTroop.setPosition(-400, -400);
            })
        );
        gvGUI.popUpDonateTroop.runAction(seq);
    },
})