/**
 * Created by CPU02326_Local on 8/23/2018.
 */
var NodeCreateClan = cc.Node.extend({

    _iconOrder: null,

    ctor: function()
    {
        this._super();
        this.init();
    },
    init: function()
    {
        var self = this;
        var anchorXXX = -250;
        var dis = 60;

        /* Label */
        var labelClanName = cc.LabelBMFont("Tên Bang Hội:", font.soji20);
        labelClanName.setColor(cc.color(255, 119, 51, 255));
        labelClanName.setAnchorPoint(1, 0.5);
        labelClanName.setPosition(anchorXXX, 200);
        this.addChild(labelClanName, 0);

        var labelIcon = cc.LabelBMFont("Biểu Tượng:", font.soji20);
        labelIcon.setColor(cc.color(255, 119, 51, 255));
        labelIcon.setAnchorPoint(1, 0.5);
        labelIcon.setPosition(anchorXXX, 120);
        this.addChild(labelIcon, 0);

        var labelDescription = cc.LabelBMFont("Mô tả:", font.soji20);
        labelDescription.setColor(cc.color(255, 119, 51, 255));
        labelDescription.setAnchorPoint(1, 0.5);
        labelDescription.setPosition(anchorXXX, 55);
        this.addChild(labelDescription, 0);

        var labelRequire = cc.LabelBMFont("Yêu càu:", font.soji20);
        labelRequire.setColor(cc.color(255, 119, 51, 255));
        labelRequire.setAnchorPoint(1, 0.5);
        labelRequire.setPosition(anchorXXX, -100);
        this.addChild(labelRequire, 0);

        /* Field BG */
        var textFieldNameBG = cc.Sprite(res.clanGUI.textFieldClanNameBG);
        textFieldNameBG.setAnchorPoint(0, 0.5);
        textFieldNameBG.scale = 1.2;
        textFieldNameBG.setPosition(anchorXXX + dis, 200);
        this.addChild(textFieldNameBG, 0);

        var textFieldDescriptionBG = cc.Sprite(res.clanGUI.textFieldClanDescriptionBG);
        textFieldDescriptionBG.setAnchorPoint(0, 0.5);
        textFieldDescriptionBG.scale = 1.2;
        textFieldDescriptionBG.setPosition(anchorXXX + dis, 10);
        this.addChild(textFieldDescriptionBG, 0);

        var labelRequired = cc.LabelBMFont("Mở", font.soji20);
        labelRequired.setColor(cc.color(255, 255, 255, 255));
        labelRequired.setAnchorPoint(0, 0.5);
        labelRequired.setPosition(anchorXXX + 4*dis, -100);
        this.addChild(labelRequired, 0);

        /* Field */
        this._textFieldName = ccui.TextField("....................", font.soji20, 70);
        this._textFieldName.setTextAreaSize(cc.size(200, 100));
        this._textFieldName.setMaxLength(15);
        this._textFieldName.setMaxLengthEnabled(true);
        this._textFieldName.setColor(cc.color(0, 0, 0, 255));
        this._textFieldName.scale = 3;
        this._textFieldName.setAnchorPoint(0, 0.5);
        this._textFieldName.setPosition(anchorXXX + 2*dis, 200);
        this.addChild(this._textFieldName, 1);

        this._textFieldDescription = ccui.TextField("....................", font.soji20, 70);
        this._textFieldDescription.setTouchSize(cc.size(200, 100));
        this._textFieldDescription.setMaxLength(20);
        this._textFieldDescription.setMaxLengthEnabled(true);
        this._textFieldDescription.setColor(cc.color(0, 0, 0, 255));
        this._textFieldDescription.scale = 3;
        this._textFieldDescription.setAnchorPoint(0, 0.5);
        this._textFieldDescription.setPosition(anchorXXX + 2*dis, 10);
        this.addChild(this._textFieldDescription, 1);

        this._iconOrder = (Math.floor(Math.random() * 28 + 1));
        var clanIcon = cc.Sprite(folderClan + "icon bieu tuong/" + this._iconOrder + ".png");
        clanIcon.scale = 2;
        clanIcon.setPosition(anchorXXX + 200, 120);
        this.addChild(clanIcon, 1);

        /* Button Create */
        this._buttonOk = ccui.Button((cf.user._currentCapacityGold >= cf.clan.goldBuildClanCastle) ? res.clanGUI.buttonXemLai : res.clanGUI.buttonTraThu);
        this._buttonOk.setTitleText(cf.clan.goldBuildClanCastle + "");
        this._buttonOk.scale = 2.5;
        this._buttonOk.setPosition(0, -320);
        var iconGold = cc.Sprite(res.upgradeBuildingGUI.iconGold);
        iconGold.setPosition(80, 20);
        iconGold.scale = 0.4;
        this._buttonOk.addChild(iconGold);
        this.addChild(this._buttonOk, 1);

        this._buttonOk.addClickEventListener(function(){
            var gold = cf.user._currentCapacityGold;
            var goldRequire = cf.clan.goldBuildClanCastle;
            if (gold < cf.clan.goldBuildClanCastle)
            {
                fr.getCurrentScreen().popUpMessage("Thiếu "  + (goldRequire - gold) + " vàng");
                return;
            }
            if (self._textFieldName.string.length<3)
            {
                fr.getCurrentScreen().popUpMessage("Độ dài Tên Bang Hội tối thiểu 3");
                return;
            }
            self.onCreateClan();
        }.bind(this))

    },
    onCreateClan: function()
    {
        var clanName = this._textFieldName.string;
        var clanDescription = this._textFieldDescription.string;
        var flagType = this._iconOrder;
        var type = 0;

        testnetwork.connector.sendCreateClan(clanName, flagType-1, clanDescription, type);

        //testnetwork.connector.sendRequestLoadClanChat();

        var parent = this.getParent();
        parent.setPosition(cc.p(0, - cc.winSize.height));
        parent.onDisappear();

    }
})