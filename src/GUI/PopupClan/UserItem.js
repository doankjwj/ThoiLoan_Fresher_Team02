var UserItem = ccui.Button.extend({

    _user: null,
    _order: null,

    _textOrder: null,
    _textLevel: null,
    _textUsername: null,
    _textPosition: null,
    _textGivenTroop: null,
    _textReceivedTroop: null,
    _textTrophy: null,

    _isPressed: null,

    ctor: function(order, user){
        this._super(res.clanGUI.clanItemBackground);

        this.setZoomScale(0.01);

        this._user = user;
        this._order = order;

        this._textOrder = cc.LabelBMFont(this._order, font.soji20);
        this._textOrder.setAnchorPoint(cc.p(0.5, 0.5))
        this.addChild(this._textOrder, 1);
        this._textOrder.setPosition(cc.p(30, this.height/2));

        var line = cc.Sprite(folderClan + "ke doc.png");
        this.addChild(line ,1);
        line.setPosition(cc.p(this._textOrder.x + 50, this._textOrder.y));

        var star = cc.Sprite(folderClan + "sao sao.png");
        this.addChild(star, 1);
        star.setPosition(cc.p(line.x + 5 + star.width/2, line.y));

        this._textLevel = cc.LabelBMFont(this._user._level, font.soji20);
        star.addChild(this._textLevel, 1);
        this._textLevel.setPosition(cc.p(star.width/2, star.height/2));

        var line2 = cc.Sprite(folderClan + "ke doc.png");
        this.addChild(line2, 1);
        line2.setPosition(cc.p(star.x + star.width/2 + 5, line.y));

        this._textUsername = cc.LabelBMFont(this._user._name, font.soji20);
        this.addChild(this._textUsername, 1);
        this._textUsername.setAnchorPoint(cc.p(0, 0.5));
        this._textUsername.scale = 0.8;
        this._textUsername.setPosition(cc.p(line2.x + 5, this.height/2 + this._textUsername.scale*this._textUsername.height/2));

        this._textPosition = cc.LabelBMFont(this._user.getPositionString(), font.fista16);
        this._textPosition.setColor(cc.color.RED);
        this._textPosition.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this._textPosition, 1);
        this._textPosition.setPosition(cc.p(line2.x + 5, this.height/2 - this._textPosition.height/2 ));

        var line3 = cc.Sprite(folderClan + "ke doc.png");
        this.addChild(line3, 1);
        line3.setPosition(cc.p(this.width/2, line.y));

        var text = cc.LabelBMFont("Cho quân:", font.fista16);
        this.addChild(text, 1);
        text.setPosition(cc.p(line3.x + text.width/2 + 7, this._textUsername.y));

        this._textGivenTroop = cc.LabelBMFont(this._user._givenTroop, font.fista16);
        this.addChild(this._textGivenTroop, 1);
        this._textGivenTroop.setPosition(cc.p(text.x, this._textPosition.y));

        var text2 = cc.LabelBMFont("Xin quân:", font.fista16);
        this.addChild(text2, 1);
        text2.setPosition(cc.p(text.x + text.width/2 + text.width, text.y));

        this._textReceivedTroop = cc.LabelBMFont(this._user._receivedTroop, font.fista16);
        this.addChild(this._textReceivedTroop, 1);
        this._textReceivedTroop.setPosition(cc.p(text2.x, this._textGivenTroop.y));

        this._trophyBackground = cc.Sprite(folderClan + "1.png");
        this._trophyBackground.setPosition(cc.p(this.width - this._trophyBackground.width/2 - 5, this.height/2));
        this.addChild(this._trophyBackground, 1);

        this._textTrophy = cc.LabelBMFont(this._user._trophy, font.soji20);
        this._textTrophy.scale = 1;
        this._textTrophy.setPosition(cc.p(this._trophyBackground.x, this._trophyBackground.y));
        this.addChild(this._textTrophy, 1);


        this._trophyIcon = cc.Sprite(folderClan + "cup nho.png");
        this._trophyIcon.setPosition(cc.p(this.width - this._trophyIcon.width/2 - 5, this.height/2));
        this.addChild(this._trophyIcon, 1);

        this.addTouchEventListener(this.openPopup, this);
        this._isPressed = false;

    },

    updateInfo: function(user){
        this._isPressed = false;
        this._user = user;
        this._textUsername.setString(user._name);
        this._textLevel.setString(user._level);
        this._textPosition.setString(user.getPositionString());
        this._textGivenTroop.setString(user._givenTroop);
        this._textReceivedTroop.setString(user._receivedTroop);
        this._textTrophy.setString(user._trophy);
    },

    openPopup: function(sender, type){
        var popup;
        var tag = 99;
        // var clanDetailLayer = this.getParent().getParent().getParent().getParent();
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:

                cc.log(this.getParent().getParent().convertToNodeSpace(this.getPosition()).x + " " + this.getParent().getParent().convertToNodeSpace(this.getPosition()).y);

                if(this.getParent().getChildByTag(tag) === null) {
                    popup = cc.Sprite(folderClan + "POPUP_0004_Layer-3.png");
                    popup.setTag(tag);
                    this.getParent().addChild(popup, 2);
                    popup.setGlobalZOrder(10);
                } else popup = this.getParent().getChildByTag(tag);
                popup.setPosition(cc.p(this.x, this.y));
                popup.visible = !this._isPressed;
                this._isPressed = !this._isPressed;
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }


    }

});