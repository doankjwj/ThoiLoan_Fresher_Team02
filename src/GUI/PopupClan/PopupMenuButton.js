var PopupMenuButton = ccui.Button.extend({

    _user: null,
    _textName: null,

    ctor: function () {

        this._super(folderClan + "POPUP_0004_Layer-3.png");
        this.setZoomScale(0);
        this._user = new UserClan("QUAN LE ANH",
            Math.floor(Math.random() * 200),
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 2000),
            Math.floor(Math.random() * 5000),
            Math.floor(Math.random() * 20000));

        this._textName = cc.LabelBMFont(this._user.name, font.fista16);

        this.addChild(this._textName, 1);
        this._textName.setPosition(cc.p(this.width/2 + 10, this.height - this._textName.height - 10));
        this._textName.setColor(cc.color.RED);

        // this.addTouchEventListener(this.onTouch, this);
    },

    onTouch: function(sender, type){

        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }

    },

    updateInfo: function(user) {

        this._user = user;
        this._textName.setString(this._user._name);

    }

});