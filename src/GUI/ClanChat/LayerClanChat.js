/**
 * Created by CPU02326_Local on 8/15/2018.
 */
var LayerClanChat = cc.Node.extend({
    _iconClan: null,
    _labelClanName: null,
    _textFieldChat: null,

    _labelMemberOnline: null,


    _memberOnline: null,
    _memberTotal: null,

    _scrollviewChat: null,
    _scrollviewUserOnline: null,

    _listItemUserOnline: [],
    _listItemChat: [],

    ctor: function() {
        this._super();
        this.setAnchorPoint(0, 0);

        this.init();
        //this.updateContent();
    },
    init: function(){
        var self = this;

        this._bg = cc.Sprite(res.clanChatGUI.chatBG);
        this._bg.setAnchorPoint(0, 0);
        this.addChild(this._bg, 0);

        var buttonTabClan = cc.Sprite(res.clanChatGUI.buttonTabSelected);
        var titleClan = cc.LabelBMFont("BANG HỘI", font.soji20);
        titleClan.setPosition(buttonTabClan.width/2, buttonTabClan.height/2 - 2);
        titleClan.scale = 0.8;
        titleClan.setAnchorPoint(0.5, 0.5);
        buttonTabClan.addChild(titleClan);
        buttonTabClan.setAnchorPoint(0, 1);
        buttonTabClan.setPosition(this._bg.width/2, this._bg.height - 6);
        this.addChild(buttonTabClan, 1);

        var buttonTabGlobal = cc.Sprite(res.clanChatGUI.buttonTabUnselected);
        var titleGlobal = cc.LabelBMFont("THẾ GIỚI", font.soji20);
        titleGlobal.setPosition(buttonTabGlobal.width/2, buttonTabGlobal.height/2);
        titleGlobal.scale = 0.8;
        titleGlobal.setAnchorPoint(0.5, 0.5);
        buttonTabGlobal.addChild(titleGlobal);
        buttonTabGlobal.setAnchorPoint(1, 1);
        buttonTabGlobal.setPosition(this._bg.width/2, this._bg.height - 6);
        this.addChild(buttonTabGlobal, 1);

        var iconClanOrder = Math.floor(Math.random() * 28) + 1;
        this._iconClan = cc.Sprite("res/Art/Bang hoi/bieu tuong nho/" + iconClanOrder + ".png");
        this._iconClan.setPosition(20, buttonTabGlobal.y - 50);
        this.addChild(this._iconClan, 1);

        var clanName = "Clan Prooooooo"
        this._labelClanName = cc.LabelBMFont(clanName, font.soji20);
        this._labelClanName.setAnchorPoint(0, 0.5);
        this._labelClanName.scale = 0.7
        this._labelClanName.setPosition(this._iconClan.x + 25, this._iconClan.y);
        this.addChild(this._labelClanName, 1);

        var textFieldChatBG = cc.Sprite(res.clanChatGUI.editTextChat);
        textFieldChatBG.setAnchorPoint(0, 0.5);
        textFieldChatBG.setPosition(5, this._iconClan.y - 35);
        this.addChild(textFieldChatBG, 1);
        this._textFieldChat = ccui.TextField();
        this._textFieldChat.setTextColor(cc.color(0, 0, 0, 255));
        this._textFieldChat.setPlaceHolder("                                         ");
        this._textFieldChat.setAnchorPoint(0, 0.5);
        this._textFieldChat.setPosition(15, this._iconClan.y - 35);
        this.addChild(this._textFieldChat, 1);

        var buttonInfo = ccui.Button(res.clanChatGUI.buttonInfo);
        buttonInfo.setPosition(this._bg.width - 35, this._iconClan.y);
        this.addChild(buttonInfo);
        buttonInfo.addClickEventListener(function(){
            self.onShowClanInfo();
        }.bind(this));

        var buttonChat = ccui.Button(res.clanChatGUI.buttonChat);
        buttonChat.setPosition(buttonInfo.x, textFieldChatBG.y);
        this.addChild(buttonChat);
        buttonChat.addClickEventListener(function(){
            self.onChat();
        }.bind(this));

        this._layerUserOnline = cc.Sprite(res.clanChatGUI.layerUserOnline);
        this._layerUserOnline.setAnchorPoint(0, 0);
        this._layerUserOnline.setPosition(this._bg.width - 4, 0);
        this.addChild(this._layerUserOnline, 0);

        var labelMember = cc.LabelBMFont("THÀNH VIÊN", font.soji20);
        labelMember.scale = 0.6;
        labelMember.setPosition(this._bg.width + 47, buttonInfo.y);
        this.addChild(labelMember, 1);

        this._memberOnline = 3;
        this._memberTotal = 50;
        this._labelMemberOnline = cc.LabelBMFont("", font.soji20);
        this._labelMemberOnline.scale = 0.6;
        this._labelMemberOnline.setPosition(this._bg.width + 47, labelMember.y - 15);
        this._labelMemberOnline.setString(this._memberOnline + "/" + this._memberTotal);
        this.addChild(this._labelMemberOnline, 1);

        var layerOnlineSeparator = cc.Sprite(res.clanChatGUI.lineSeparateOnline);
        layerOnlineSeparator.setPosition(this._labelMemberOnline.x, this._labelMemberOnline.y - 8);
        this.addChild(layerOnlineSeparator, 1);
    },
    onShowClanInfo: function()
    {
        cc.log("Show Clan Info");
    },
    onChat: function()
    {
        cc.log("Chat: " + this._textFieldChat.string);
        this._textFieldChat.string = "";
    },
    updateContent: function(){
        //var itemUserOnline = new ItemUserOnline(0, "Nguyễn Duy Đoàn", true);
        //itemUserOnline.setPosition(this._labelMemberOnline.x , this._labelMemberOnline.y - 40);
        //this.addChild(itemUserOnline, 2);
        //cc.log(itemUserOnline);
        this.updateClanInfo();
        this.updateScrollviewChat();
        this.updateScrollviewUserOnline();
    },
    updateClanInfo: function(){
        var iconClanOrder = Math.floor(Math.random() * 28) + 1;
        fn.replaceSpriteImage(this._iconClan, "res/Art/Bang hoi/bieu tuong nho/" + iconClanOrder + ".png");
        this._labelClanName.setString("Clan No." + iconClanOrder);
    },
    updateScrollviewChat: function(){
        var chatQuantity = 30;
        var itemHeight = 80;
        if (!this._scrollviewChat)
        {
            this._scrollviewChat = ccui.ScrollView();
            this._scrollviewChat.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._scrollviewChat.setTouchEnabled(true);
            this._scrollviewChat.setBounceEnabled(true);
            this._scrollviewChat.setPosition(0, 0);
            this._scrollviewChat.width = this._bg.width + 10;
            this._scrollviewChat.height = this._bg.height - 102;
            this._scrollviewChat.setInnerContainerSize(cc.size(this._scrollviewChat.width, chatQuantity * (1 + itemHeight )));
            this.addChild(this._scrollviewChat, 1);
        };

        if (this._listItemChat.length != 0) return;
        this._listItemChat = [];
        for (var i = 0; i < chatQuantity; i++){
            this._listItemChat.push(new ItemChat(i, 0, "User " + i, i, "Hello, I am User " + i, new Date().getTime(), [1, 2, 3, 4], [23, 30, 42, 11], 100));
        }

        for (var i = 0; i < chatQuantity; i++){
            this._listItemChat[i].setPosition(this._scrollviewChat.width/2 - 6, i*(1 + itemHeight));
            this._scrollviewChat.addChild(this._listItemChat[i], 2);
            var line = cc.Sprite(res.clanChatGUI.lineSeparateChat);
            line.setPosition(this._scrollviewChat.width/2 - 6, i*(1 + itemHeight));
            this._scrollviewChat.addChild(line);
        };

    },
    updateScrollviewUserOnline: function(){
        var memberQuantity = 20;
        if (!this._scrollviewUserOnline)
        {
            this._scrollviewUserOnline = ccui.ScrollView();
            this._scrollviewUserOnline.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._scrollviewUserOnline.setTouchEnabled(true);
            this._scrollviewUserOnline.setBounceEnabled(true);
            this._scrollviewUserOnline.setPosition(this._bg.width, 0);
            this._scrollviewUserOnline.width = this._layerUserOnline.width;
            this._scrollviewUserOnline.height = this._layerUserOnline.height - 90;
            this._scrollviewUserOnline.setInnerContainerSize(cc.size(this._scrollviewUserOnline.width, 20 * memberQuantity));
            this.addChild(this._scrollviewUserOnline, 1);
        };


        if (this._listItemUserOnline.length != 0) return;
        this._listItemUserOnline = [];
        for (var i = 0; i < memberQuantity; i++){
            this._listItemUserOnline.push(new ItemUserOnline(i, "User " + i, Math.random() < 0.5));
        }

        for (var i = 0; i < memberQuantity; i++){
            this._listItemUserOnline[i].setPosition(this._scrollviewUserOnline.width/2 - 6, this._scrollviewUserOnline.getInnerContainerSize().height - 10 - i*20 );
            this._scrollviewUserOnline.addChild(this._listItemUserOnline[i], 2);
        };

        this._scrollviewUserOnline.removeChild(this._listItemUserOnline[0], false);
        this._scrollviewUserOnline.setInnerContainerSize(cc.size(this._scrollviewUserOnline.width, 20 * (memberQuantity-1)));
        this._listItemUserOnline.splice(0, 1);
        for (var i = 0; i < memberQuantity-1; i++){
            this._listItemUserOnline[i].setPosition(this._scrollviewUserOnline.width/2 - 6, this._scrollviewUserOnline.getInnerContainerSize().height - 10 - i*20 );
        };


    },
})