var ChooseClanIcon = PopupClan.extend({
    _iconId: null,
    ctor: function(){
        this._super();
        //config
        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));

        //init Menu
        var scale = this._bg.scale;
        this._flagClose1 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose1, 2);
        this._flagClose1.setAnchorPoint(cc.p(0.5, 0.5));
        this._flagClose1.setPosition(cc.p(this._flagClose1.width/2+50, this._bg.height - this._flagClose1.height/2 + 7));
        this._buttonBG = ccui.Button(res.clanGUI.buttonBGClose);
        this._bg.addChild(this._buttonBG, 0);
        this._buttonBG.setPosition(cc.p(this._flagClose1.x, this._flagClose1.y-5));

        this._flagOpen = cc.Sprite(res.clanGUI.flagOpen);
        this._bg.addChild(this._flagOpen, 2);
        this._flagOpen.setPosition(cc.p(this._flagClose1.x + this._buttonBG.width, this._bg.height - this._flagOpen.height/2 + 5));
        this._buttonBG1 = cc.Sprite(res.clanGUI.buttonBG);
        this._bg.addChild(this._buttonBG1, 0);
        this._buttonBG1.setPosition(cc.p(this._buttonBG.x + this._buttonBG.width, this._buttonBG.y + 1));

        this._flagClose2 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose2, 2);
        this._flagClose2.setPosition(cc.p(this._flagOpen.x + this._buttonBG1.width, this._bg.height - this._flagClose2.height/2 + 7));
        this._buttonBG2 = ccui.Button(res.clanGUI.buttonBGClose);
        this._bg.addChild(this._buttonBG2, 0);
        this._buttonBG2.setPosition(cc.p(this._buttonBG1.x + this._buttonBG1.width, this._buttonBG.y));

        this.initTouch();

        this._textJoin = cc.LabelBMFont("THAM GIA\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textJoin.scale = 0.75;
        this._flagClose1.addChild(this._textJoin, 1);
        this._textJoin.setPosition(cc.p(this._flagClose1.width/2, this._flagClose1.height/2));
        this._textCreate = cc.LabelBMFont("TẠO\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textCreate.scale = 0.75;
        this._flagOpen.addChild(this._textCreate, 1);
        this._textCreate.setPosition(cc.p(this._flagOpen.width/2, this._flagOpen.height/2));
        this._textSearch = cc.LabelBMFont("TÌM KIẾM\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textSearch.scale = 0.75;
        this._flagClose2.addChild(this._textSearch, 1);
        this._textSearch.setPosition(cc.p(this._flagClose2.width/2, this._flagClose2.height/2));
        this._iconId = 1;

        this.initIconList();
    },

    initIconList: function(){

        var listIcon = [];
        for(var i=0; i<28; i++){
            listIcon.push(new ccui.Button(folderClan + "icon bieu tuong/"+ (i+1).toString() + ".png"));
            listIcon[i].setZoomScale(0.01);
            listIcon[i].setTag(i+1);
            listIcon[i].addTouchEventListener(this.chooseIcon, this);
        }

        for(i=0; i<28; i++){

            var icon = listIcon[i];
            this._bg.addChild(icon);
            var posX = (2*(i%7)+1)*icon.width + icon.width/2 - 30;
            var posY = this._bg.height - 100 - (2*Math.floor(i/7))*icon.height*4/5;
            icon.setPosition(cc.p(posX, posY));

        }

    },

    chooseIcon: function(sender, type) {
        var self = this;
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                self.getParent().getChildByTag(gv.tag.TAG_CLAN_CREATE)._iconId = sender.getTag();
                self.getParent().getChildByTag(gv.tag.TAG_CLAN_CREATE).changeIcon();
                self.getParent().getChildByTag(gv.tag.TAG_CLAN_CREATE).backFromChoosing();
                self.onDisappear();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    initTouch: function() {
        this._buttonBG.addTouchEventListener(function (sender, type) {
            var self = this;
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    self.onDisappear();
                    self.getParent().getChildByTag(gv.tag.TAG_CLAN_JOIN).onAppear();
                    sender.setScale(sender.scale * 0.9);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale / 0.9);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale / 0.9);
                    break;
            }

        }, this);

        this._buttonBG2.addTouchEventListener(function (sender, type) {
            var popupSearch;
            var self = this;
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    if (self.getParent().getChildByTag(gv.tag.TAG_CLAN_SEARCH) === null) {
                        popupSearch = new SearchClan();
                        self.getParent().addChild(popupSearch, 1);
                        popupSearch.setTag(gv.tag.TAG_CLAN_SEARCH);
                    } else popupSearch = self.getParent().getChildByTag(gv.tag.TAG_CLAN_SEARCH);
                    self.onDisappear();
                    popupSearch.onAppear();
                    sender.setScale(sender.scale * 0.9);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale / 0.9);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale / 0.9);
                    break;
            }

        }, this);

    },

});