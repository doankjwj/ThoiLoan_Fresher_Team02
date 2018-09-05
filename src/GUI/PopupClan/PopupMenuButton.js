var PopupMenuButton = ccui.Button.extend({

    _authority: null,
    _user: null,
    _textName: null,
    _clan: null,

    _buttonKick: null,
    _buttonSetMod: null,
    _buttonRemoveMod: null,
    _buttonSetAdmin: null,

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
        this._buttonKick.setPosition(cc.p(this.width / 2 + 10, this.height - this._buttonKick.height/2 - 25));
        this._buttonKick.visible = false;
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

        this._buttonSetMod = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._buttonSetMod.setZoomScale(0.01);
        this.addChild(this._buttonSetMod, 1);
        this._buttonSetMod.visible = false;
        this._buttonSetMod.setPosition(cc.p(this.width / 2 + 10, this._buttonKick.y - this._buttonKick.height - 5));
        var text2 = cc.LabelBMFont("BỔ NHIỆM LÀM BANG PHÓ", font.soji12, this.width - 10 ,cc.TEXT_ALIGNMENT_CENTER);
        this._buttonSetMod.addChild(text2);
        text2.setPosition(cc.p(this._buttonSetMod.width / 2, this._buttonSetMod.height / 2));

        this._buttonSetMod.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    // cc.log(this._user._name);
                    testnetwork.connector.sendRequestAddCoLeader(this._user._name);
                    this.getParent().onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

        this._buttonRemoveMod = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._buttonRemoveMod.setZoomScale(0.01);
        this.addChild(this._buttonRemoveMod, 1);
        this._buttonRemoveMod.setPosition(cc.p(this.width / 2 + 10, this._buttonKick.y - this._buttonKick.height - 5));
        var text3 = cc.LabelBMFont("XÓA CHỨC BANG PHÓ", font.soji12, this.width - 10 ,cc.TEXT_ALIGNMENT_CENTER);
        this._buttonRemoveMod.addChild(text3);
        this._buttonRemoveMod.visible = false;
        text3.setPosition(cc.p(this._buttonRemoveMod.width / 2, this._buttonRemoveMod.height / 2));

        this._buttonRemoveMod.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    testnetwork.connector.sendRemoveCoLeader(this._user._name);
                    this.getParent().onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

        this._buttonSetAdmin = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._buttonSetAdmin.setZoomScale(0.01);
        this.addChild(this._buttonSetAdmin, 1);
        this._buttonSetAdmin.setPosition(cc.p(this.width / 2 + 10, this._buttonSetMod.y - this._buttonSetMod.height - 5));
        var text4 = cc.LabelBMFont("BỔ NHIỆM LÀM BANG CHỦ", font.soji12, this.width - 10 ,cc.TEXT_ALIGNMENT_CENTER);
        this._buttonSetAdmin.addChild(text4);
        this._buttonSetAdmin.visible = false;
        text4.setPosition(cc.p(this._buttonSetAdmin.width / 2, this._buttonSetAdmin.height / 2));

        this._buttonSetAdmin.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    // cc.log(this._user._name);
                    testnetwork.connector.sendRequestChangeLeader(this._user._name);
                    this.getParent().onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

    },

    updateInfo: function(user, clan) {
        this._clan = clan;
        this._user = user;

        cc.log("POS : " + this._user._position);

        if(this._clan.id === cf.user._clanId) {
            var myAuthority = gv.userClanInfo.myAuthority;
            this._buttonKick.visible = (myAuthority === 1 || myAuthority === 2);

            if(this._user._position === 1 && myAuthority === 2 ) {
                this._buttonSetMod.visible = false;
                this._buttonRemoveMod.visible = true;
            } else if(this._user._position !== 2 && myAuthority === 2 ) {
                this._buttonSetMod.visible = true;
                this._buttonRemoveMod.visible = false;
            } else {
                this._buttonSetMod.visible = false;
                this._buttonRemoveMod.visible = false;
            }

            if(myAuthority !== 0) {
                if(myAuthority === 2) this._buttonKick.visible = true;
                else if(myAuthority === 1 && (this._user._position === 2 || this._user._position === 1)) this._buttonKick.visible = false;
            } else this._buttonKick.visible = false;

            if(myAuthority === 2) this._buttonSetAdmin.visible = true;

            if(this._user._name === cf.user._name) {
                this._buttonKick.visible = false;
                this._buttonSetMod.visible = false;
                this._buttonRemoveMod.visible = false;
                this._buttonSetAdmin.visible = false;
            }
        } else {
            this._buttonKick.visible = false;
            this._buttonSetMod.visible = false;
            this._buttonRemoveMod.visible = false;
            this._buttonSetAdmin.visible = false;
        }

        this._textName.setString(this._user._name);
    }

});