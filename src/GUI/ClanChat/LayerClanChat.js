/**
 * Created by CPU02326_Local on 8/15/2018.
 */
var LayerClanChat = cc.Node.extend({
    _iconClan: null,
    _labelClanName: null,
    _textFieldChat: null,

    ctor: function() {
        this._super();
        this.setAnchorPoint(0, 0);

        this.init();
    },
    init: function(){
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
        this._textFieldChat.setAnchorPoint(0, 0.5);
        this._textFieldChat.setPosition(15, this._iconClan.y - 35);
        this.addChild(this._textFieldChat, 1);
    }

})