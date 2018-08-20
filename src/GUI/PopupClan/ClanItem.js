var ClanItem = ccui.Button.extend({

    _order: null,
    _clan: null,

    _trophyIcon: null,
    _clanIcon: null,
    _textStatus: null,
    _textName: null,
    _textOrder: null,
    _textClanLevel: null,
    _textClanMemberQuantity: null,
    _textTrophy: null,

    _trophyBackground: null,

    ctor: function(order, clan){

        this._super(res.clanGUI.clanItemBackground);

        this._clan = clan;
        this._order = order;
        this._clanIcon = cc.Sprite(folderClan + "icon bieu tuong/" + clan.iconId + ".png");
        this._trophyIcon = cc.Sprite(folderClan + "cup nho.png");
        this.setZoomScale(0.01);
        this.addChild(this._clanIcon, 1);
        this._clanIcon.setPosition(cc.p(this.width*this.scale/8, this.height*this.scale/2));

        this._textOrder = cc.LabelBMFont(this._order + ".", font.soji20);
        this.addChild(this._textOrder, 1);
        this._textOrder.setPosition(cc.p(this._textOrder.width, this.height/2));

        this._textName = cc.LabelBMFont(this._clan.name, font.soji20);
        this._textName.scale = 0.5;
        this._textName.setAnchorPoint(cc.p(0, 0));
        this._textName.setPosition(cc.p(this._clanIcon.x + this._clanIcon.width/2+ 10, this.height/2));
        this.addChild(this._textName, 1);

        this._textStatus = cc.LabelBMFont(this._clan.getStatusText(), font.soji20);
        this._textStatus.scale = 0.5;
        this._textStatus.setAnchorPoint(cc.p(0, 0));
        this._textStatus.setPosition(cc.p(this._textName.x, this.height/2 - this._textStatus.height*this._textStatus.scale));
        this._textStatus.setColor(cc.color(192,164,0,255));
        this.addChild(this._textStatus, 1);

        this._textClanLevel = cc.LabelBMFont("Bang cấp\n" + this._clan.level, font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textClanLevel.scale = 0.5;
        this._textClanLevel.setPosition(cc.p(this.width/2, this.height/2));
        this._textClanLevel.setColor(cc.color(192,164,0,255));
        this.addChild(this._textClanLevel, 1);

        this._textClanMemberQuantity = cc.LabelBMFont("Thành viên: " + this._clan.quantity + "/50", font.soji20);
        this._textClanMemberQuantity.scale = 0.5;
        this._textClanMemberQuantity.setPosition(cc.p(this._textClanLevel.x + this._textClanLevel.width*1.2, this._textClanLevel.y));
        this._textClanMemberQuantity.setColor(cc.color(192,164,0,255));
        this.addChild(this._textClanMemberQuantity, 1);

        this._trophyIcon.setPosition(cc.p(this.width - this._trophyIcon.width/2 - 5, this.height/2));
        this.addChild(this._trophyIcon, 1);

        this._trophyBackground = cc.Sprite(folderClan + "1.png");
        this._trophyBackground.setPosition(cc.p(this.width - this._trophyBackground.width/2 - 5, this.height/2));
        this.addChild(this._trophyBackground, 0);

        this._textTrophy = cc.LabelBMFont(this._clan.trophy, font.soji20);
        this._textTrophy.scale = 1;
        this._textTrophy.setPosition(cc.p(this._trophyBackground.x, this._trophyBackground.y));
        this.addChild(this._textTrophy, 1);

        this.addTouchEventListener(function(sender, type) {
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
        }, this);



    },



});