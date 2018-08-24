TAG_TEXT_ID = 100;
TAG_TEXT_TROPHY = 101;
TAG_TEXT_STATUS = 102;
TAG_TEXT_QUANTITY = 103;
TAG_TEXT_REQ = 104;
myRed = cc.color(82, 179, 217, 255);

var ClanDetail = PopupClan.extend({

    _textJoin: null,
    _textCreate: null,
    _textSearch: null,
    _buttonBG: null,
    _buttonBG1: null,
    _buttonBG2: null,

    _textName: null,
    _textLevel: null,
    _textTrophy: null,
    _textMemberQuantity: null,
    _textClanStatus: null,
    _textTrophyRequired: null,
    _textClanId: null,

    _clanIcon: null,

    _buttonOpenMemberList: null,

    _buttonJoinClan: null,

    _clan: null,

    ctor: function(){

        this._super();

        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));

        var scale = this._bg.scale;
        this._flagOpen = cc.Sprite(res.clanGUI.flagOpen);
        this._bg.addChild(this._flagOpen, 2);
        this._flagOpen.setAnchorPoint(cc.p(0.5, 0.5));
        this._flagOpen.setPosition(cc.p(this._flagOpen.width/2+54, this._bg.height - this._flagOpen.height/2 + 5));
        this._buttonBG = cc.Sprite(res.clanGUI.buttonBG);
        this._bg.addChild(this._buttonBG, 0);
        this._buttonBG.setPosition(cc.p(this._flagOpen.x, this._flagOpen.y + 5));

        this._flagClose1 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose1, 2);
        this._flagClose1.setPosition(cc.p(this._flagOpen.x + this._buttonBG.width, this._bg.height - this._flagClose1.height/2 + 7));
        this._buttonBG1 = ccui.Button(res.clanGUI.buttonBGClose);
        this._buttonBG1.setTag("1311");
        this._bg.addChild(this._buttonBG1, 0);
        this._buttonBG1.setPosition(cc.p(this._buttonBG.x + this._buttonBG.width, this._buttonBG.y - 1));

        this._flagClose2 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose2, 2);
        this._flagClose2.setPosition(cc.p(this._flagClose1.x + this._buttonBG1.width, this._bg.height - this._flagClose1.height/2 + 7));
        this._buttonBG2 = ccui.Button(res.clanGUI.buttonBGClose);
        this._bg.addChild(this._buttonBG2, 0);
        this._buttonBG2.setPosition(cc.p(this._buttonBG1.x + this._buttonBG1.width, this._buttonBG.y - 1));

        this._textJoin = cc.LabelBMFont("THÔNG TIN\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textJoin.scale = 0.75;
        this._flagOpen.addChild(this._textJoin, 1);
        this._textJoin.setPosition(cc.p(this._flagOpen.width/2, this._flagOpen.height/2 + 7));
        this._textCreate = cc.LabelBMFont("THÀNH VIÊN", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textCreate.scale = 0.75;
        this._flagClose1.addChild(this._textCreate, 1);
        this._textCreate.setPosition(cc.p(this._flagClose1.width/2, this._flagClose1.height/2));
        this._textSearch = cc.LabelBMFont("TÌM KIẾM\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textSearch.scale = 0.75;
        this._flagClose2.addChild(this._textSearch, 1);
        this._textSearch.setPosition(cc.p(this._flagClose2.width/2, this._flagClose2.height/2));


        this._clanIcon = cc.Sprite(folderClan + "icon bieu tuong/" + 1 + ".png" );
        this._clanIcon.scale = 2;
        this._clanIcon.setPosition(cc.p(this._bg.width/2 - 2*this._clanIcon.width*this._clanIcon.scale, this._bg.height/2));
        this._bg.addChild(this._clanIcon, 1);

        var light = cc.Sprite(folderClan + "DOM SANG.png");
        this._bg.addChild(light, 0);
        light.scale = 2;
        light.setPosition(cc.p(this._clanIcon.x, this._clanIcon.y));

        this._textLevel = cc.LabelBMFont("Bang cấp 1", font.soji12);
        this._textLevel.setColor(myRed);
        this._bg.addChild(this._textLevel, 1);
        this._textLevel.setPosition(cc.p(this._clanIcon.x, this._clanIcon.y - this._clanIcon.height/2*this._clanIcon.scale - 10));


        this._textName = cc.LabelBMFont("Name", font.soji20);
        this._bg.addChild(this._textName, 1);
        this._textName.setPosition(cc.p(this._bg.width/2, this._bg.height - 150));
        this._textName.setColor(cc.color(129, 207, 224, 255));

        this._textClanId = cc.LabelBMFont("11", font.fista16);
        this._bg.addChild(this._textClanId, 1);
        this._textClanId.setAnchorPoint(cc.p(1, 0.5));
        this._textClanId.setColor(cc.color(236,100,75, 255));
        this._textClanId.setPosition(cc.p(this._textName.x + this._textName.width/2, this._textName.y - this._textName.height));
        var text = cc.LabelBMFont("Mã bang: ", font.fista16);
        text.setColor(cc.color(236,100,75, 255));
        this._bg.addChild(text, 1, TAG_TEXT_ID);
        text.setAnchorPoint(cc.p(0, 0.5));
        text.setPosition(cc.p(this._textName.x - this._textName.width/2 + 2,this._textClanId.y));


        this._textTrophy = cc.LabelBMFont("100", font.fista16);
        this._textTrophy.setAnchorPoint(cc.p(1, 0.5));
        this._bg.addChild(this._textTrophy, 1);
        this._textTrophy.setColor(myRed);
        this._textTrophy.setPosition(cc.p(this._textName.x + this._textName.width/2, this._textClanId.y - this._textClanId.height - 30));

        var text2 = cc.LabelBMFont("Điểm danh vọng:", font.fista16);
        text2.setColor(myRed);
        text2.setAnchorPoint(cc.p(0, 0.5));
        this._bg.addChild(text2, 1, TAG_TEXT_TROPHY);
        text2.setPosition(cc.p(text.x, this._textTrophy.y));

        this._textClanStatus = cc.LabelBMFont("0", font.fista16);
        this._textClanStatus.setColor(myRed);
        this._bg.addChild(this._textClanStatus, 1);
        this._textClanStatus.setAnchorPoint(cc.p(1, 0.5));
        this._textClanStatus.setPosition(cc.p(this._textName.x + this._textName.width/2, this._textTrophy.y - this._textTrophy.height));

        var text3 = cc.LabelBMFont("Loại:", font.fista16);
        text3.setColor(myRed);
        text3.setAnchorPoint(cc.p(0, 0.5));
        this._bg.addChild(text3, 1, TAG_TEXT_STATUS);
        text3.setPosition(cc.p(text.x, this._textClanStatus.y));

        this._textMemberQuantity = cc.LabelBMFont("xx/50", font.fista16);
        this._textMemberQuantity.setColor(myRed);
        this._textMemberQuantity.setAnchorPoint(cc.p(1, 0.5));
        this._bg.addChild(this._textMemberQuantity, 1);
        this._textMemberQuantity.setPosition(cc.p(this._textName.x + this._textName.width/2, this._textClanStatus.y - this._textClanStatus.height));

        var text4 = cc.LabelBMFont("Thành viên: ", font.fista16);
        text4.setColor(myRed);
        text4.setAnchorPoint(cc.p(0, 0.5));
        this._bg.addChild(text4, 1, TAG_TEXT_QUANTITY);
        text4.setPosition(cc.p(text.x, this._textMemberQuantity.y));

        this._textTrophyRequired = cc.LabelBMFont("xxxx", font.fista16);
        this._textTrophyRequired.setAnchorPoint(cc.p(1, 0.5));
        this._bg.addChild(this._textTrophyRequired, 1);
        this._textTrophyRequired.setColor(myRed);
        this._textTrophyRequired.setPosition(cc.p(this._textName.x+ this._textName.width/2, this._textMemberQuantity.y - this._textMemberQuantity.height ));

        var text5 = cc.LabelBMFont("Yêu cầu danh vọng: ", font.fista16);
        text5.setColor(myRed);
        text5.setAnchorPoint(cc.p(0, 0.5));
        text5.setPosition(cc.p(text.x, this._textTrophyRequired.y));
        this._bg.addChild(text5, 1, TAG_TEXT_REQ);

        var trophyIcon = cc.Sprite(folderClan + "CUP 1.png");
        this._bg.addChild(trophyIcon, 1);
        trophyIcon.setPosition(cc.p(text5.x + 200, this._textTrophy.y));


        var trophyIcon2 = cc.Sprite(folderClan + "CUP 1.png");
        this._bg.addChild(trophyIcon2, 1);
        trophyIcon2.setPosition(cc.p(text5.x + 200, this._textTrophyRequired.y - 3));

        this._buttonOpenMemberList = ccui.Button(folderClan + "button _ tra thu.png");
        this._buttonOpenMemberList.setZoomScale(0.01);

        this._bg.addChild(this._buttonOpenMemberList, 1);
        this._buttonOpenMemberList.setPosition(cc.p(this._clanIcon.x, 100));
        var text6 = cc.LabelBMFont("THÀNH VIÊN", font.soji20);
        text6.scale = 0.5;
        this._buttonOpenMemberList.addChild(text6);
        text6.setPosition(cc.p(this._buttonOpenMemberList.width/2, this._buttonOpenMemberList.height/2));

        this._buttonOpenMemberList.addTouchEventListener(function(sender, type) {
            var popup;
            var self = this;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    if(self.getParent().getChildByTag(gv.tag.TAG_CLAN_MEMBER) === null) {
                        popup = new ClanMemberList();
                        self.getParent().addChild(popup, 1);
                        popup.setTag(gv.tag.TAG_CLAN_MEMBER);
                    } else popup = self.getParent().getChildByTag(gv.tag.TAG_CLAN_MEMBER);
                    self.onDisappear();
                    popup.onAppear(this._clan);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }

        }, this);

        this._buttonJoinClan = ccui.Button(folderClan + "button _xem lai.png");
        this._buttonJoinClan.setZoomScale(0.01);

        this._bg.addChild(this._buttonJoinClan, 1);
        this._buttonJoinClan.setPosition(cc.p(this._buttonOpenMemberList.x + this._bg.width/2, this._buttonOpenMemberList.y));

        this._buttonJoinClan.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    testnetwork.connector.sendJoinClan(this._clan.id);
                    cf.user._clanId = this._clan.id;
                    testnetwork.connector.sendGetUserClan();
                    this.updateInfo();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }

        }, this);

        var text7 = cc.LabelBMFont("THAM GIA", font.soji20);
        text7.scale = 0.5;
        this._buttonJoinClan.addChild(text7);
        text7.setPosition(cc.p(this._buttonJoinClan.width/2, this._buttonJoinClan.height/2));

        this.initTouch();
    },

    changeIcon: function(iconId) {

        this._clanIcon.setTexture(folderClan + "icon bieu tuong/" + iconId + ".png");
        this._clanIcon.setTextureRect(this._clanIcon.getTextureRect());

    },


    updateInfo: function(){

        this.changeIcon(this._clan.iconId);
        this._textName.setString(this._clan.name);
        this._textClanId.setString(this._clan.id);
        this._textTrophy.setString(this._clan.trophy);
        this._textClanStatus.setString(this._clan.getStatusText());
        this._textMemberQuantity.setString(this._clan.quantity + "/50");
        this._textTrophyRequired.setString(this._clan.trophyRequired);
        this._textLevel.setString("Bang cấp " + this._clan.level);


        this._bg.getChildByTag(TAG_TEXT_ID).setPosition(cc.p(this._textName.x - this._textName.width/2 + 2,this._textClanId.y));
        this._bg.getChildByTag(TAG_TEXT_TROPHY).setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_ID).x, this._textTrophy.y));
        this._bg.getChildByTag(TAG_TEXT_STATUS).setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_TROPHY).x, this._textClanStatus.y));
        this._bg.getChildByTag(TAG_TEXT_QUANTITY).setPosition(cc.p( this._bg.getChildByTag(TAG_TEXT_STATUS).x, this._textMemberQuantity.y));
        this._bg.getChildByTag(TAG_TEXT_REQ).setPosition(cc.p( this._bg.getChildByTag(TAG_TEXT_STATUS).x, this._textTrophyRequired.y));

        this._textTrophyRequired.setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_REQ).x + 170, this._textMemberQuantity.y - this._textMemberQuantity.height ));
        this._textMemberQuantity.setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_REQ).x + 170, this._textClanStatus.y - this._textClanStatus.height));
        this._textTrophy.setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_REQ).x + 170, this._textClanId.y - this._textClanId.height - 30));
        this._textClanId.setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_REQ).x + 170, this._textName.y - this._textName.height));
        this._textClanStatus.setPosition(cc.p(this._bg.getChildByTag(TAG_TEXT_REQ).x + 170, this._textTrophy.y - this._textTrophy.height));

        if(this._clan.status === 1 || cf.user._clanId !== -1) {
            this._buttonJoinClan.setBright(false);
            this._buttonJoinClan.setTouchEnabled(false);
            this._buttonJoinClan.setEnabled(false);
        } else {
            this._buttonJoinClan.setBright(true);
            this._buttonJoinClan.setTouchEnabled(true);
            this._buttonJoinClan.setEnabled(true);
        }

        // this._textTrophy.setString(this._clan.trophy);
        // this._textMemberQuantity.setString(this._clan.quantity + "/50");
        // this._textClanStatus.setString(this._clan.getStatusText());
        // this._textTrophyRequired.setString(this._clan.trophyRequired);

    },

    initTouch: function(){

        this._buttonBG1.addTouchEventListener(function(sender, type) {
            var popup;
            var self = this;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    if(self.getParent().getChildByTag(gv.tag.TAG_CLAN_MEMBER) === null) {
                        popup = new ClanMemberList();
                        self.getParent().addChild(popup, 1);
                        popup.setTag(gv.tag.TAG_CLAN_MEMBER);
                    } else popup = self.getParent().getChildByTag(gv.tag.TAG_CLAN_MEMBER);
                    self.onDisappear();
                    popup.onAppear(this._clan);
                    sender.setScale(sender.scale*0.9);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale/0.9);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale/0.9);
                    break;
            }

        }, this);

        this._buttonBG2.addTouchEventListener(function(sender, type) {
            var popupSearch;
            var self = this;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    if(self.getParent().getChildByTag(gv.tag.TAG_CLAN_SEARCH) === null) {
                        popupSearch = new SearchClan();
                        self.getParent().addChild(popupSearch, 1);
                        popupSearch.setTag(gv.tag.TAG_CLAN_SEARCH);
                    } else popupSearch = self.getParent().getChildByTag(gv.tag.TAG_CLAN_SEARCH);
                    self.onDisappear();
                    popupSearch.onAppear();
                    sender.setScale(sender.scale*0.9);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale/0.9);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale/0.9);
                    break;
            }

        }, this)

    },

    onAppear: function(clan) {
        this._clan = clan;

        if(cf.user._clanId !== -1) {
            this._textJoin.setString("BANG HỘI\nCỦA TÔI");
        }

        // if(this.getChildByTag(99)) this.getChildByTag(99).visible = false;
        // cc.log(this._listUserVisualization.x + " " + this._listUserVisualization.y);
        this.updateInfo();
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    },


});