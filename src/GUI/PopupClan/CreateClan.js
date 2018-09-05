var CreateClan = PopupClan.extend({

    _fieldName: null,
    _icon: null,
    _chooseIconButton: null,
    _fieldDetail: null,
    _fieldDetailBackground: null,

    _leftChangeStatusButton: null,
    _rightChangeStatusButton: null,
    _increaseTrophyRequireButton: null,
    _decreaseTrophyRequireButton: null,
    _fieldNameBackground: null,
    _clanStatus: null,
    _textClanStatus: null,
    _trophyRequire: null,
    _textTrophyRequire: null,
    _createButton: null,
    _iconId: null,

    _textGoldPrice: null,

    _maxLength: null,
    _maxDetailLength: null,


    ctor: function(){
        this._super();
        //config
        this._clanStatus = true;
        this._maxLength = 20;
        this._maxDetailLength = 100;
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
        // init content
        //init Name field
        this._fieldNameBackground =  cc.Sprite(folderClan + "slost nen 1.png");
        this._bg.addChild(this._fieldNameBackground);
        this._fieldNameBackground.setPosition(cc.p(this._bg.width/2, this._bg.height - 100));

        this._fieldName = new ccui.TextField();
        this._fieldName.setTouchEnabled(true);
        this._fieldName.fontName = "Arial";
        this._fieldName.setPlaceHolder("          Tên bang hội             ");
        this._fieldName.setTextColor(cc.color(0, 0, 0, 255));
        this._fieldName.fontSize = 17;
        this._fieldName.setMaxLength(this._maxLength);
        this._fieldName.setMaxLengthEnabled(true);
        this._fieldNameBackground.addChild(this._fieldName, 1);
        this._fieldName.setPosition(cc.p(this._fieldName.width/2 + 5, this._fieldNameBackground.height/2));
        this._fieldName.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this._fieldName.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        this._fieldName.setTouchSize(cc.size(this._fieldNameBackground.width, this._fieldNameBackground.height));
        this._fieldName.addEventListener(this.fieldNameEvent, this);

        var text = cc.LabelBMFont("Tên Bang Hội: ", font.soji20);
        text.scale = 0.8;
        this._bg.addChild(text, 1);
        text.setPosition(cc.p(this._fieldNameBackground.x - this._fieldNameBackground.width/2 - text.width/2*text.scale, this._fieldNameBackground.y));
        //Choose icon
        var text2 = cc.LabelBMFont("Biểu tượng:", font.soji20);
        this._bg.addChild(text2, 1);
        this._icon = cc.Sprite(folderClan + "icon bieu tuong/" + this._iconId + ".png");
        this._bg.addChild(this._icon, 1);
        text2.scale = 0.8;
        this._icon.setPosition(cc.p(this._fieldNameBackground.x, this._fieldNameBackground.y - 7 - this._fieldNameBackground.height/2 - this._icon.height/2));
        text2.setPosition(cc.p(text.x + 8, this._icon.y));

        this._chooseIconButton = ccui.Button(folderClan + "POPUP_0000_Group-3.png");
        this._chooseIconButton.setZoomScale(0.01);
        this._chooseIconButton.scale = 0.75;
        var text3 = cc.LabelBMFont("CHỌN", font.soji20);
        this._chooseIconButton.addChild(text3);
        text3.scale = 0.6;
        text3.setPosition(cc.p(this._chooseIconButton.width/2, this._chooseIconButton.height/2));
        this._chooseIconButton.setPosition(cc.p(this._icon.x + this._icon.width/2 + 5 + this._chooseIconButton.width/2*this._chooseIconButton.scale, this._icon.y));
        this._bg.addChild(this._chooseIconButton, 1);

        this._chooseIconButton.addTouchEventListener(this.openChooseIconLayer,this);
        //Detail
        this._fieldDetail = ccui.TextField();
        this._fieldDetail.addEventListener(this.fieldDetailEvent, this);

        this._fieldDetailBackground = cc.Sprite(folderClan + "slost nen 2.png");
        this._bg.addChild(this._fieldDetailBackground, 1);
        this._fieldDetailBackground.setPosition(cc.p(this._fieldNameBackground.x , this._icon.y - this._icon.height/2 - this._fieldDetailBackground.height/2 - 5));
        this._fieldDetailBackground.addChild(this._fieldDetail, 1);
        this._fieldDetail.setTouchEnabled(true);
        this._fieldDetail.fontName = "Arial";

        var string = "";

        for(var i=0; i<5; i++) {
            for(var j=0; j<57; j++) string += " ";
            string += "\n";
        }

        this._fieldDetail.setPlaceHolder(string);

        this._fieldDetail.setTextColor(cc.color(0, 0, 0, 255));
        this._fieldDetail.fontSize = 17;
        this._fieldDetail.setMaxLengthEnabled(true);
        this._fieldDetail.setMaxLength(this._maxDetailLength);
        this._fieldDetail.setPosition(cc.p(this._fieldDetail.width/2 + 7, this._fieldDetailBackground.height - this._fieldDetail.height/2 - 5));
        var text4 = cc.LabelBMFont("Chi tiết: ", font.soji20);
        text4.scale = 0.8;
        this._bg.addChild(text4, 1);
        text4.setAnchorPoint(cc.p(0.5, 1));
        text4.setPosition(cc.p(this._fieldDetailBackground.x - this._fieldDetailBackground.width/2 - 3 - text4.width/2*text4.scale, this._fieldDetailBackground.y + this._fieldDetailBackground.height/2 - text4.height/2*text4.scale + 8));
        //Require
        this._leftChangeStatusButton = ccui.Button(folderClan + "next 2.png");
        this._leftChangeStatusButton.setZoomScale(0.01);
        this._bg.addChild(this._leftChangeStatusButton, 1);
        this._leftChangeStatusButton.setAnchorPoint(cc.p(0, 0.5));
        this._leftChangeStatusButton.setPosition(cc.p(this._fieldDetailBackground.x - this._fieldDetailBackground.width/2, this._bg.height/2 - 80));
        this._rightChangeStatusButton = ccui.Button(folderClan + "next 1.png");
        this._rightChangeStatusButton.setZoomScale(0.01);
        this._bg.addChild(this._rightChangeStatusButton, 1);
        this._rightChangeStatusButton.setAnchorPoint(cc.p(1, 0.5));
        this._rightChangeStatusButton.setPosition(cc.p(this._fieldDetailBackground.x + this._fieldDetailBackground.width/2, this._bg.height/2 - 80));

        this._rightChangeStatusButton.addTouchEventListener(this.changeClanStatus, this);
        this._leftChangeStatusButton.addTouchEventListener(this.changeClanStatus, this);

        this._textClanStatus = cc.LabelBMFont("Mở", font.soji20);
        this._bg.addChild(this._textClanStatus, 1);
        this._textClanStatus.setPosition(cc.p(this._fieldDetailBackground.x, this._rightChangeStatusButton.y));

        var text5 = cc.LabelBMFont("Yêu cầu:", font.soji20);
        text5.scale = 0.8;
        text5.setAnchorPoint(cc.p(0.5, 0.5));
        text5.setPosition(cc.p(text4.x, this._rightChangeStatusButton.y));
        this._bg.addChild(text5);
        //line
        var line = cc.Sprite(folderClan + "q.png");
        this._bg.addChild(line, 1);
        line.setPosition(cc.p(this._bg.width/2, this._rightChangeStatusButton.y - this._rightChangeStatusButton.height/2 - 2));
        line.scaleX = this._fieldDetailBackground.width/line.width;
        //Trophy Required
        this._trophyRequire = 200;
        this._textTrophyRequire = cc.LabelBMFont(this._trophyRequire.toString(), font.soji20);

        this._decreaseTrophyRequireButton = ccui.Button(folderClan + "next 2.png");
        this._decreaseTrophyRequireButton.setZoomScale(0.01);
        this._bg.addChild(this._decreaseTrophyRequireButton, 1);
        this._decreaseTrophyRequireButton.setAnchorPoint(cc.p(0, 0.5));
        this._decreaseTrophyRequireButton.setPosition(cc.p(this._leftChangeStatusButton.x, line.y - 5 - this._decreaseTrophyRequireButton.height/2));
        this._increaseTrophyRequireButton = ccui.Button(folderClan + "next 1.png");
        this._increaseTrophyRequireButton.setZoomScale(0.01);
        this._bg.addChild(this._increaseTrophyRequireButton, 1);
        this._increaseTrophyRequireButton.setAnchorPoint(cc.p(1, 0.5));
        this._increaseTrophyRequireButton.setPosition(cc.p(this._rightChangeStatusButton.x, this._decreaseTrophyRequireButton.y));

        this._increaseTrophyRequireButton.addTouchEventListener(this.increaseTroopRequire, this);
        this._decreaseTrophyRequireButton.addTouchEventListener(this.decreaseTroopRequire, this);
        this._bg.addChild(this._textTrophyRequire, 1);
        this._textTrophyRequire.setPosition(cc.p(this._textClanStatus.x, this._increaseTrophyRequireButton.y));

        this._increaseTrophyRequireButton.setEnabled(false);
        this._increaseTrophyRequireButton.setTouchEnabled(false);
        this._increaseTrophyRequireButton.setBright(false);

        this._decreaseTrophyRequireButton.setEnabled(false);
        this._decreaseTrophyRequireButton.setTouchEnabled(false);
        this._decreaseTrophyRequireButton.setBright(false);

        var text6 = cc.LabelBMFont("Số cúp thấp nhất: ", font.soji20);
        text6.scale = 0.8;
        text6.setAnchorPoint(cc.p(0.5, 0.5));
        text6.setPosition(cc.p(text5.x - 45, this._increaseTrophyRequireButton.y));
        this._bg.addChild(text6);
        //Button
        this._createButton = ccui.Button(folderClan + "button _ tra thu.png");
        this._createButton.setZoomScale(0.01);
        this._bg.addChild(this._createButton, 1);
        this._createButton.scale = 1.5;
        this._createButton.setPosition(cc.p(this._bg.width/2, this._createButton.height/2*this._createButton.scale + 25));

        this._textGoldPrice = cc.LabelBMFont("40.000", font.soji20);
        this._textGoldPrice.scale = 0.7;
        this._createButton.addChild(this._textGoldPrice);
        this._textGoldPrice.setPosition(cc.p(this._createButton.width/2 - 10, this._createButton.height/2));

        var goldIcon = cc.Sprite(mainGUI.goldIcon);
        goldIcon.scale = 0.7;
        this._createButton.addChild(goldIcon);
        goldIcon.setPosition(cc.p(this._textGoldPrice.x + this._textGoldPrice.width*this._textGoldPrice.scale/2 + 7, this._textGoldPrice.y));

        this._createButton.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var status = 0;
                    if (this._clanStatus) status = 0;
                    else status = 1;
                    testnetwork.connector.sendCreateClan(this._fieldName.string, this._iconId - 1, this._fieldDetail.string, status);
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

    },

    changeIcon: function(){
        this._icon.setTexture(folderClan + "icon bieu tuong/" + this._iconId + ".png");
        this._icon.setTextureRect(this._icon.getTextureRect());
    },

    openChooseIconLayer: function(sender, type) {
        var self = this;
        var iconPopup;
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                if (self.getParent().getChildByTag(gv.tag.TAG_ICON_CLAN_LAYER) === null) {
                    iconPopup = new ChooseClanIcon();
                    self.getParent().addChild(iconPopup, 1, gv.tag.TAG_ICON_CLAN_LAYER);
                }
                else iconPopup = self.getParent().getChildByTag(gv.tag.TAG_ICON_CLAN_LAYER);

                self.onDisappear();
                iconPopup.onAppear();

                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    decreaseTroopRequire: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._trophyRequire -= 200;
                if(this._trophyRequire <= 0) this._trophyRequire = 0;
                this._textTrophyRequire.setString(this._trophyRequire.toString());
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    increaseTroopRequire: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._trophyRequire += 200;
                this._textTrophyRequire.setString(this._trophyRequire.toString());
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    changeClanStatus: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_MOVED :
                break;
            case ccui.Widget.TOUCH_ENDED:
                this._clanStatus = !this._clanStatus;
                if(this._clanStatus) this._textClanStatus.setString("Mở");
                else this._textClanStatus.setString("Đóng");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                break;
        }
    },

    fieldDetailEvent: function(sender, type) {

        switch(type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this.updateFieldDetail();
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                this.updateFieldDetail();
                break;
        }
    },

    fieldNameEvent: function(sender, type){

        switch(type) {
            case ccui.TextField.EVENT_ATTACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_DETACH_WITH_IME:
                break;
            case ccui.TextField.EVENT_INSERT_TEXT:
                this.updateFieldName();
                break;
            case ccui.TextField.EVENT_DELETE_BACKWARD:
                this.updateFieldName();
                break;
        }

    },

    updateFieldName: function(){

        this._fieldName.x = this._fieldName.width/2 + 5;

        var boo = !(this._fieldName.string.length === 0);


        this._createButton.setBright(boo);
        this._createButton.setEnabled(boo);
        this._createButton.setTouchEnabled(boo);


    },

    updateFieldDetail: function () {

        this._fieldDetail.x = this._fieldDetail.width/2 + 5;

        if(this._fieldDetail.width > this._fieldDetailBackground.width - 10) {
            var c = this._fieldDetail.string.charAt(this._fieldDetail.string.length);
            this._fieldDetail.string = this._fieldDetail.string.slice(0, -1);
            this._fieldDetail.string += ("\n" + c);
        }

        this._fieldDetail.y = this._fieldDetailBackground.height - this._fieldDetail.height/2 - 5;

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

    onAppear: function() {
        this.visible = true;
        this._fieldName.string = "";
        this._fieldDetail.string = "";
        this._clanStatus = true;
        this.changeClanStatus();
        this._trophyRequire = 0;
        this._textTrophyRequire.setString(this._trophyRequire.toString());
        this.updateFieldDetail();
        this.updateFieldName();
        if(cf.user._currentCapacityGold < 40000 || cf.user._clanId !== -1) {
            this._createButton.setBright(false);
            this._createButton.setTouchEnabled(false);
            this._createButton.setEnabled(false);
            this._textGoldPrice.setColor(cc.color.RED);
        }
        else {
            this._createButton.setBright(true);
            this._createButton.setTouchEnabled(true);
            this._createButton.setEnabled(true);
            this._textGoldPrice.setColor(cc.color.WHITE);
        }
        this._iconId = 1;
        this._swallowTouch.setEnabled(true);
    },

    backFromChoosing: function(){
        this.visible = true;
        this._swallowTouch.setEnabled(true);
    }

});