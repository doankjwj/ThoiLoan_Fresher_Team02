var ClanDetail = PopupClan.extend({

    _textJoin: null,
    _textCreate: null,
    _textSearch: null,
    _buttonBG: null,
    _buttonBG1: null,
    _buttonBG2: null,

    _clan: null,

    _textName: null,
    _textTrophy: null,
    _textMemberQuantity: null,
    _textClanStatus: null,
    _textTrophyRequired: null,

    _listUser: null,
    _listUserVisualization: null,

    _buttonJoinClan: null,
    _buttonExitClan: null,

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
        this._textCreate = cc.LabelBMFont("TẠO\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textCreate.scale = 0.75;
        this._flagClose1.addChild(this._textCreate, 1);
        this._textCreate.setPosition(cc.p(this._flagClose1.width/2, this._flagClose1.height/2));
        this._textSearch = cc.LabelBMFont("TÌM KIẾM\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textSearch.scale = 0.75;
        this._flagClose2.addChild(this._textSearch, 1);
        this._textSearch.setPosition(cc.p(this._flagClose2.width/2, this._flagClose2.height/2));
        this.initTouch();

        this._listUser = [];
        this._listUserVisualization = new ccui.ScrollView();


        //init info
        var bg = cc.Sprite(folderClan + "NEN NHO _BANG HOI CUA TOI.png");
        this._bg.addChild(bg, 1);
        bg.setPosition(cc.p(this._bg.width/2, this._bg.height - 125));

        this._icon = cc.Sprite(folderClan + "icon bieu tuong/" + 1 + ".png" );
        this._icon.scale = 1.5;
        bg.addChild(this._icon, 1);
        this._icon.setPosition(cc.p(this._icon.width + 20, bg.height/2));

        var light = cc.Sprite(folderClan + "DOM SANG.png");
        bg.addChild(light, 0);
        light.setPosition(cc.p(this._icon.x, this._icon.y));

        this._textName = cc.LabelBMFont("Name", font.soji20);
        this._textName.setAnchorPoint(cc.p(0, 0.5));
        this._textName.setPosition(cc.p(this._icon.x + this._icon.width/2 + 40, bg.height - this._textName.height/2 - 1));
        bg.addChild(this._textName, 1);

        var text1 = cc.LabelBMFont("Điểm danh vọng: ", font.fista16);
        text1.setAnchorPoint(cc.p(0, 0.5));
        bg.addChild(text1, 1);
        text1.setPosition(cc.p(this._textName.x + 2, this._textName.y - this._textName.height/2 - 2));
        this._textTrophy = cc.LabelBMFont("0", font.fista16);
        bg.addChild(this._textTrophy, 1);
        var line = cc.Sprite(folderClan + "q.png");
        bg.addChild(line, 1);
        line.setAnchorPoint(cc.p(0, 0.5));
        line.setPosition(cc.p(text1.x, text1.y - text1.height/2 - 3));
        this._textTrophy.setPosition(cc.p(line.x + line.width - this._textTrophy.width, text1.y));
        var trophyIcon = cc.Sprite(folderClan + "cup nho.png");
        bg.addChild(trophyIcon, 1);
        trophyIcon.setPosition(cc.p(this._textTrophy.x + this._textTrophy.width + trophyIcon.width/2 + 2, this._textTrophy.y));


        var text2 = cc.LabelBMFont("Thành viên: ", font.fista16);
        text2.setAnchorPoint(cc.p(0, 0.5));
        bg.addChild(text2, 1);
        text2.setPosition(cc.p(this._textName.x + 2, text1.y - text1.height));
        var line2 = cc.Sprite(folderClan + "q.png");
        bg.addChild(line2, 1);
        line2.setAnchorPoint(cc.p(0, 0.5));
        line2.setPosition(cc.p(text1.x, text2.y - text2.height/2 - 3));
        this._textMemberQuantity = cc.LabelBMFont("0/50", font.fista16);
        this._textMemberQuantity.setPosition(cc.p(line2.x + line2.width - this._textMemberQuantity.width/2, text2.y));
        bg.addChild(this._textMemberQuantity, 1);

        var text3 = cc.LabelBMFont("Loại: ", font.fista16);
        text3.setAnchorPoint(cc.p(0, 0.5));
        bg.addChild(text3, 1);
        text3.setPosition(cc.p(text2.x, text2.y - text2.height));
        var line3 = cc.Sprite(folderClan + "q.png");
        bg.addChild(line3, 1);
        line3.setAnchorPoint(cc.p(0, 0.5));
        line3.setPosition(cc.p(text1.x, text3.y - text3.height/2 - 3));
        this._textClanStatus = cc.LabelBMFont("Xác thực", font.fista16);
        bg.addChild(this._textClanStatus, 1);
        this._textClanStatus.setPosition(cc.p(line3.x + line3.width - this._textClanStatus.width/2, text3.y));

        var text4 = cc.LabelBMFont("Yêu cầu danh vọng: ", font.fista16);
        text4.setAnchorPoint(cc.p(0, 0.5));
        bg.addChild(text4, 1);
        text4.setPosition(cc.p(text3.x, text3.y - text3.height));
        this._textTrophyRequired = cc.LabelBMFont("1000", font.fista16);
        bg.addChild(this._textTrophyRequired, 1);
        this._textTrophyRequired.setPosition(cc.p(line3.x + line3.width - this._textTrophyRequired.width/2, text4.y));

        //init button
        this._buttonJoinClan = ccui.Button(folderClan + "button _xem lai.png");
        bg.addChild(this._buttonJoinClan, 1);
        this._buttonJoinClan.setZoomScale(0.01);
        var textJoin = cc.LabelBMFont("RA NHẬP", font.soji12);
        textJoin.setPosition(cc.p(this._buttonJoinClan.width/2, this._buttonJoinClan.height/2));
        this._buttonJoinClan.addChild(textJoin, 1);
        // this._buttonJoinClan.scale = 0.8;
        this._buttonJoinClan.setPosition(cc.p(bg.width - this._buttonJoinClan.width/2 - 10, bg.height-this._buttonJoinClan.height/2-10));

        this._buttonExitClan = ccui.Button(folderClan + "button _ tra thu.png");
        bg.addChild(this._buttonExitClan, 1);
        this._buttonExitClan.setZoomScale(0.01);
        var textExit = cc.LabelBMFont("RỜI BANG", font.soji12);
        textExit.setPosition(cc.p(this._buttonExitClan.width/2, this._buttonExitClan.height/2));
        this._buttonExitClan.addChild(textExit, 1);
        this._buttonExitClan.setPosition(cc.p(bg.width - this._buttonExitClan.width/2 - 10, this._buttonJoinClan.y - this._buttonJoinClan.height/2 -this._buttonJoinClan.height/2-3));

        this.initUserList();
    },

    initTouch: function(){

        this._buttonBG1.addTouchEventListener(function(sender, type) {
            var pupupCreateClan;
            var self = this;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    if(self.getParent().getChildByTag(gv.tag.TAG_CLAN_CREATE) === null) {
                        pupupCreateClan = new CreateClan();
                        self.getParent().addChild(pupupCreateClan, 1);
                        pupupCreateClan.setTag(gv.tag.TAG_CLAN_CREATE);
                    } else pupupCreateClan = self.getParent().getChildByTag(gv.tag.TAG_CLAN_CREATE);
                    self.onDisappear();
                    pupupCreateClan.onAppear();
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

    initUserList: function(){

        //name, level, pos, give, received, trophy
        var user = new UserClan("QUAN LE ANH", 20, 0, 600, 600, 12000);
        var item = new UserItem(1, user);
        // this._bg.addChild(userItem, 1);
        // userItem.setPosition(cc.p(this._bg.width/2, this._bg.height/2));

        this._bg.addChild(this._listUserVisualization, 1);
        this._listUserVisualization.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._listUserVisualization.setTouchEnabled(true);
        this._listUserVisualization.setBounceEnabled(true);
        this._listUserVisualization.setAnchorPoint(cc.p(0.5, 0.5));
        this._listUserVisualization.setPosition(cc.p(this._bg.width/2, this._bg.height/4 + item.height));
        this._listUserVisualization.setContentSize(cc.size(item.width*item.scale, item.height*item.scale));
        this._listUserVisualization.setInnerContainerSize(cc.size(item.width*item.scale, item.height*item.scale*50));
        this._listUserVisualization.width = this._bg.width;

        this._listUserVisualization.height = this._bg.height/2;

        for(var i=0; i<50; i++) {
            this._listUser.push(
                new UserItem(
                    i+1,
                    new UserClan("QUAN LE ANH",
                        Math.floor(Math.random()*200),
                        Math.floor(Math.random()*3),
                        Math.floor(Math.random()*2000),
                        Math.floor(Math.random()*5000),
                        Math.floor(Math.random()*20000))
                )
            );
        }

        for(var i=0; i<50; i++) {
            this._listUserVisualization.addChild(this._listUser[i]);
            this._listUser[i].setPosition(cc.p(this._listUserVisualization.width/2, this._listUserVisualization.getInnerContainerSize().height - (i+0.5)*this._listUser[i].height*this._listUser[i].scale));
        }
    },

    changeIcon: function(iconId){
        this._icon.setTexture(folderClan + "icon bieu tuong/" + iconId + ".png");
        this._icon.setTextureRect(this._icon.getTextureRect());
    },

    updateInfo: function(){

        if(this.getChildByTag(99) !== null ) this.getChildByTag(99).visible = false;

        this.changeIcon(this._clan.iconId);
        this._textName.setString(this._clan.name);
        this._textTrophy.setString(this._clan.trophy);
        this._textMemberQuantity.setString(this._clan.quantity + "/50");
        this._textClanStatus.setString(this._clan.getStatusText());
        this._textTrophyRequired.setString(this._clan.trophyRequired);
        if(this._clan._listUser === null) {
            this._clan._listUser = [];
            for (var i = 0; i < this._clan.quantity; i++) {
                this._clan._listUser.push(
                    new UserItem(
                        i + 1,
                        new UserClan("QUAN LE ANH",
                            Math.floor(Math.random() * 200),
                            Math.floor(Math.random() * 3),
                            Math.floor(Math.random() * 2000),
                            Math.floor(Math.random() * 5000),
                            Math.floor(Math.random() * 20000))
                    )
                );
            }
        }

        var user = new UserClan("QUAN LE ANH", 20, 0, 600, 600, 12000);
        var item = new UserItem(1, user);
        this._listUserVisualization.setInnerContainerSize(cc.size(item.width*item.scale, item.height*item.scale*this._clan.quantity));

        for(var i=0; i<50; i++) {
            if(i < this._clan.quantity) {
                this._listUser[i].visible = true;
                this._listUser[i].updateInfo(this._clan._listUser[i]._user);
                this._listUser[i].setPosition(cc.p(this._listUserVisualization.width/2, this._listUserVisualization.getInnerContainerSize().height - (i+0.5)*this._listUser[i].height*this._listUser[i].scale));
            }
            else this._listUser[i].visible = false;
        }
        this._listUserVisualization.jumpToTop();
    },

    onAppear: function(clan) {
        this._clan = clan;
        this.updateInfo();
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    },

});