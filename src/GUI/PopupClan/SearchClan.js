var SearchClan = PopupClan.extend({

    _textJoin: null,
    _textCreate: null,
    _textSearch: null,
    _buttonBG: null,
    _buttonBG1: null,
    _buttonBG2: null,

    _fieldSearch: null,
    _fieldSearchBg: null,

    _statusText: null,

    _byName: null,
    _byId: null,

    listClan: null,
    listClanVis: null,

    _searchButton: null,

    _maxLength: 20,

    ctor: function(){
        this._super();
        this.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
        var scale = this._bg.scale;
        this._flagClose1 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose1, 2);
        this._flagClose1.setAnchorPoint(cc.p(0.5, 0.5));
        this._flagClose1.setPosition(cc.p(this._flagClose1.width/2+50, this._bg.height - this._flagClose1.height/2 + 7));
        this._buttonBG = ccui.Button(res.clanGUI.buttonBGClose);
        this._bg.addChild(this._buttonBG, 0);
        this._buttonBG.setPosition(cc.p(this._flagClose1.x, this._flagClose1.y - 5));


        this._flagClose2 = cc.Sprite(res.clanGUI.flagClose);
        this._bg.addChild(this._flagClose2, 2);
        this._flagClose2.setPosition(cc.p(this._flagClose1.x + this._buttonBG.width, this._bg.height - this._flagClose2.height/2 + 7));
        this._buttonBG1 = ccui.Button(res.clanGUI.buttonBGClose);
        this._bg.addChild(this._buttonBG1, 0);
        this._buttonBG1.setPosition(cc.p(this._buttonBG.x + this._buttonBG.width, this._buttonBG.y));

        this._flagOpen = cc.Sprite(res.clanGUI.flagOpen);
        this._bg.addChild(this._flagOpen, 2);
        this._flagOpen.setPosition(cc.p(this._flagClose2.x + this._buttonBG1.width, this._bg.height - this._flagClose1.height/2));
        this._buttonBG2 = cc.Sprite(res.clanGUI.buttonBG);
        this._bg.addChild(this._buttonBG2, 0);
        this._buttonBG2.setPosition(cc.p(this._buttonBG1.x  + this._buttonBG1.width, this._buttonBG.y + 1));

        this._textJoin = cc.LabelBMFont("THAM GIA\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textJoin.scale = 0.75;
        this._flagClose1.addChild(this._textJoin, 1);
        this._textJoin.setPosition(cc.p(this._flagClose1.width/2, this._flagClose1.height/2));
        this._textCreate = cc.LabelBMFont("TẠO\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textCreate.scale = 0.75;
        this._flagClose2.addChild(this._textCreate, 1);
        this._textCreate.setPosition(cc.p(this._flagClose1.width/2, this._flagClose1.height/2));
        this._textSearch = cc.LabelBMFont("TÌM KIẾM\nBANG HỘI", font.soji20, 200, cc.TEXT_ALIGNMENT_CENTER);
        this._textSearch.scale = 0.75;
        this._flagOpen.addChild(this._textSearch, 1);
        this._textSearch.setPosition(cc.p(this._flagOpen.width/2, this._flagOpen.height/2));

        this.initTouch();
        this._fieldSearchBg = cc.Sprite(folderClan + "slost nen 1.png");
        this._bg.addChild(this._fieldSearchBg, 1);
        this._fieldSearchBg.setPosition(cc.p(this._bg.width/2 - 50, this._bg.height/2 + 125));

        var title = cc.LabelBMFont("Tìm kiếm: ", font.soji20);
        this._bg.addChild(title, 1);
        title.setPosition(cc.p(this._fieldSearchBg.x - this._fieldSearchBg.width/2 - title.width/2, this._fieldSearchBg.y));
        title.setColor(cc.color(192,164,0,255));

        this._fieldSearch = new ccui.TextField();
        this._fieldSearch.setTouchEnabled(true);
        this._fieldSearch.fontName = "Arial";
        this._fieldSearch.setPlaceHolder("Tên bang/mã bang");
        this._fieldSearch.setTextColor(cc.color(0, 0, 0, 255));
        this._fieldSearch.fontSize = 17;
        this._fieldSearch.setMaxLength(this._maxLength);
        this._fieldSearch.setMaxLengthEnabled(true);
        this._fieldSearchBg.addChild(this._fieldSearch, 2);
        this._fieldSearch.setPosition(cc.p(this._fieldSearch.width/2 + 5, this._fieldSearchBg.height/2));
        this._fieldSearch.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._fieldSearch.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._fieldSearch.setTouchSize(cc.size(this._fieldSearchBg.width, this._fieldSearchBg.height));
        this._statusText = cc.LabelBMFont("Ít nhất 3 kí tự", font.soji20);
        this._statusText.setColor(cc.color.RED);
        this._statusText.visible = false;
        this._bg.addChild(this._statusText, 1);
        this._statusText.scale = 0.5;

        this._statusText.setPosition(cc.p(this._fieldSearchBg.x - this._fieldSearchBg.width/2 + this._statusText.width/2*this._statusText.scale, this._fieldSearchBg.y - this._fieldSearchBg.height/2 - this._statusText.height/2*this._statusText.scale));

        this._fieldSearch.addEventListener(this.textFieldEvent, this);

        this._byName = new RadioButton();
        this._byName._status = true;
        this._byName.changeStatus();
        this._bg.addChild(this._byName, 1, gv.tag.TAG_BUTTON_SEARCH_BY_NAME);
        this._byName.setPosition(cc.p(this._fieldSearchBg.x + this._fieldSearchBg.width/2 + this._byName.width/2, this._fieldSearchBg.y + this._byName.height/2));
        this._byId = new RadioButton();
        this._byId._status = false;
        this._byName.changeStatus();
        this._bg.addChild(this._byId, 1, gv.tag.TAG_BUTTON_SEARCH_BY_ID);
        this._byId.setPosition(cc.p(this._fieldSearchBg.x + this._fieldSearchBg.width/2 + this._byId.width/2, this._fieldSearchBg.y - this._byId.height/2));

        var text = cc.LabelBMFont("name", font.soji20);
        text.setColor(cc.color(192,164,0,255));
        text.scale = 0.5;
        text.setAnchorPoint(cc.p(0, 0.5));
        text.setPosition(cc.p(this._byName.x + 12, this._byName.y));
        this._bg.addChild(text, 1);

        var text2 = cc.LabelBMFont("clan's ID", font.soji20);
        text2.setColor(cc.color(192,164,0,255));
        text2.scale = 0.5;
        text2.setAnchorPoint(cc.p(0, 0.5));
        text2.setPosition(cc.p(this._byId.x + 12, this._byId.y));
        this._bg.addChild(text2, 1);

        this._searchButton = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._bg.addChild(this._searchButton, 1);
        this._searchButton.setPosition(cc.p(this._byId.x + this._searchButton.width/2 + 70, this._fieldSearchBg.y));
        this._searchButton.setZoomScale(0.03);

        var label = cc.LabelBMFont("Search", font.soji20);
        label.scale = 0.8;
        this._searchButton.addChild(label, 1);
        label.setPosition(cc.p(this._searchButton.width/2, this._searchButton.height/2));

        this.listClan = [];
        this.listClanVis = new ccui.ScrollView();
        var clan = new Clan(123, 20, "AAA", 1, 20, 0, 12000);
        var item = new ClanItem(1, clan);

        this._bg.addChild(this.listClanVis, 1);
        this.listClanVis.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listClanVis.setTouchEnabled(true);
        this.listClanVis.setBounceEnabled(true);
        this.listClanVis.setAnchorPoint(cc.p(0.5, 0.5));
        this.listClanVis.setPosition(cc.p(this._bg.width/2, this._bg.height/2 - 55));
        this.listClanVis.setContentSize(cc.size(item.width*item.scale, item.height*item.scale));
        this.listClanVis.setInnerContainerSize(cc.size(item.width*item.scale, item.height*item.scale * 50));

        this.listClanVis.width = this._bg.width;
        this.listClanVis.height = this._bg.height - 180;

        this.listClanVis.visible = false;

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


        this._searchButton.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED :
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    if(!this.listClanVis.visible) this.listClanVis.visible = true;
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

    },

    updateButtonStatus: function(){
        this._bg.getChildByTag(gv.tag.TAG_BUTTON_SEARCH_BY_NAME).changeStatus();
        this._bg.getChildByTag(gv.tag.TAG_BUTTON_SEARCH_BY_ID).changeStatus();
    },

    textFieldEvent: function(sender, type){

            switch(type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME:
                    break;
                case ccui.TextField.EVENT_DETACH_WITH_IME:
                    break;
                case ccui.TextField.EVENT_INSERT_TEXT:
                    this.updateSearchText();
                    break;
                case ccui.TextField.EVENT_DELETE_BACKWARD:
                    this.updateSearchText();
                    break;
            }

    },

    updateSearchText: function () {
        cc.log(this._fieldSearch.string.length);
        if(this._fieldSearch.string.length === 0) {
            this._statusText.visible = false;
        } else {
            if (this._fieldSearch.string.length < 3) {
                this._statusText.setString("Ít nhất 3 kí tự");
                this._statusText.visible = true;
            }
            else if (this._fieldSearch.string.length >= 3 && this._fieldSearch.string.length < this._maxLength) this._statusText.visible = false;
            else if (this._fieldSearch.string.length >= this._maxLength) {
                this._statusText.setString("Max 20 kí tự");
                this._statusText.visible = true;
            }
        }
        this._fieldSearch.x = this._fieldSearch.width/2 + 5;

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

        this._buttonBG.addTouchEventListener(function(sender, type) {
            var self = this;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:

                    self.onDisappear();
                    self.getParent().getChildByTag(gv.tag.TAG_CLAN_JOIN).onAppear();

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

    onAppear: function() {
        this.visible = true;
        this._fieldSearch.string = "";
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
        this.visible = false;
        if(this.listClanVis) this.listClanVis.visible = false;
    }
});