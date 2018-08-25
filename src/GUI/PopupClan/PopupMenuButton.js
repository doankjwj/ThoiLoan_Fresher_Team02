var PopupMenuButton = ccui.Button.extend({

    _authority: null,
    _user: null,
    _textName: null,
    _clan: null,

    _buttonKick: null,

    ctor: function () {

        this._super(folderClan + "POPUP_0004_Layer-3.png");
        this.setTouchEnabled(false);
        // this.setEnabled(false);
        this._user = new UserClan("QUAN LE ANH",
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 2000),
            Math.floor(Math.random() * 5000),
            Math.floor(Math.random() * 20000));

        this._textName = cc.LabelBMFont(this._user.name, font.fista16);

        this.addChild(this._textName, 1);
        this._textName.setPosition(cc.p(this.width / 2 + 10, this.height - this._textName.height - 10));
        this._textName.setColor(cc.color.RED);

        // this.addTouchEventListener(this.onTouch, this);

        this._buttonKick = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._buttonKick.setZoomScale(0.01);
        this.addChild(this._buttonKick, 1);
        this._buttonKick.setPosition(cc.p(this.width / 2 + 10, this.height / 2));
        var text = cc.LabelBMFont("RỜI BANG", font.soji12);
        this._buttonKick.addChild(text);
        text.setPosition(cc.p(this._buttonKick.width / 2, this._buttonKick.height / 2));

        this._buttonKick.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    testnetwork.connector.sendKickUser(this._user._name);
                    this.getParent().onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);
    },

    updateInfo: function(user, clan) {
        this._clan = clan;
        // var t;
        // if(this._clan.id === cf.user._clanId) {
        //     if(gv.userClanInfo.myAuthority === 0) t = "I'm member";
        //     else if (gv.userClanInfo.myAuthority === 1) t = "I'm a mod";
        //     else if (gv.userClanInfo.myAuthority === 2) t = "I'm admin";
        // }
        // else t = "Not my clan"
        // this._text.setString(t);
        this._user = user;

        if(this._clan.id === cf.user._clanId) {
            var myAuthority = gv.userClanInfo.myAuthority;
            this._buttonKick.visible = (myAuthority === 1 || myAuthority === 2);
            if(this._user._name === cf.user._name) this._buttonKick.visible = false;
        } else {
            this._buttonKick.visible = false;
        }

        this._textName.setString(this._user._name);
    }

});