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

    ctor: function() {
        this._super();
        this.setAnchorPoint(0, 0);

        this.init();
        this.updateContent();
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

        var layerUserOnline = cc.Sprite(res.clanChatGUI.layerUserOnline);
        layerUserOnline.setAnchorPoint(0, 0);
        layerUserOnline.setPosition(this._bg.width - 4, 0);
        this.addChild(layerUserOnline, 0);

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

        var layerOnlineSeparator = cc.Sprite(res.clanChatGUI.lineSeparateChat);
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
        var itemUserOnline = new ItemUserOnline(0, "Nguyễn Duy Đoàn", true);
        cc.log("++++ Complete New Item User");
        itemUserOnline.setPosition(this._labelMemberOnline.x , this._labelMemberOnline.y - 40);
        cc.log("++++ Pre Add Item")
        this.addChild(itemUserOnline, 2);
        cc.log(itemUserOnline);
        cc.log("++++ Last Add Item");
    }
})