var JoinClan = PopupClan.extend({

    _textJoin: null,
    _textCreate: null,
    _textSearch: null,
    _buttonBG: null,
    _buttonBG1: null,
    _buttonBG2: null,

    listClan: null,
    listClanVis: null,

    ctor: function(){
        this._super();

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

        this._textJoin = cc.LabelBMFont("THAM GIA\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
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

        this.listClan = [];
        this.listClanVis = new ccui.ScrollView();
        var clan = new Clan(123, 20, "AAA", 1, 20, 0, 12000);
        var item = new ClanItem(1, clan);

        this._bg.addChild(this.listClanVis, 1);
        this.listClanVis.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listClanVis.setTouchEnabled(true);
        this.listClanVis.setBounceEnabled(true);
        this.listClanVis.setAnchorPoint(cc.p(0.5, 0.5));
        this.listClanVis.setPosition(cc.p(this._bg.width/2, this._bg.height/2 - 15));
        this.listClanVis.setContentSize(cc.size(item.width*item.scale, item.height*item.scale));
        this.listClanVis.setInnerContainerSize(cc.size(item.width*item.scale, item.height*item.scale * 50));

        this.listClanVis.width = this._bg.width;
        this.listClanVis.height = this._bg.height - 100;

        // cc.log(this.listClanVis.width + " " + this.listClanVis.height);

        // this.listClanVis.addChild(item, 2);

        for(var i = 0; i<50; i++) {
            this.listClan.push(new ClanItem(i+1, new Clan(123, Math.floor(Math.random()*28 + 1), "Hoàn Quân Đoàn", Math.floor(Math.random()*3), Math.floor(Math.random()*50+1), Math.floor(Math.random() + 1), Math.floor(Math.random()*20000), Math.floor(Math.random()*10)*100)));
        }

        for(var i = 0; i<50; i++) {
            // cc.log(this.listClan[i]._order + " " + this.listClan[i]._clan.level);
            // cc.log(this.listClan[i]);
            this.listClanVis.addChild(this.listClan[i], 2);
            this.listClan[i].setPosition(cc.p(this.listClanVis.width/2, this.listClanVis.getInnerContainerSize().height - (i+0.5)*this.listClan[i].height*this.listClan[i].scale));
        }

        this.initTouch();

        //
        // this._bg.addChild(item, 3);
        // item.setPosition(cc.p(this._bg.width/2, this._bg.height/2));

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


});