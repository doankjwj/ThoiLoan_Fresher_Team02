﻿//Quan Le Anh
//13-11-1996

var MainLayer = cc.Layer.extend({
    _map: null,
    _shop: null,

    // Log In GUI
    _usernameField: null,
    _passwordField: null,

    // Resource Bar
    _resBarGold: null,
    _resBarElixir: null,
    _resBarDarkElixir: null,
    _resBarCoin: null,
    _builderBar: null,
    _expBar: null,
    _armyBar: null,

    // GUI Button && Pop Up
    _guiButtonBuildingInfo: null,
    _guiButtonBuildingUpgrade: null,
    _guiInstantlyDone: null,
    _guiCancelBuildButton: null,
    _guiTraningArmyButton: null,
    _guiButtonHarvest: null,
    _guiButtonResearch: null,
    _guiButtonRequestDonate: null,
    _guiButtonClan: null,
    _guibuttonRemove: null,

    _popUp: null,
    _popUpResearchTroop: null,
    _popUpClan: null,
    _popUpTraining: null,
    _popUpRequestDonate: null,

    // Cheat Button
    _resetUserButton: null,
    _restartGameButton: null,
    _addGoldButton: null,
    _subGoldButton: null,
    _addElixirButton: null,
    _subElixirButton: null,
    _addDarkElixirButton: null,
    _addCoinButton: null,
    _subCoinButton: null,

    // Zoom & Move Map
    _listenerOnMoveMap: null,
    _mapScaleOnZoom: null,
    _mapXOnZoom: null,
    _mapHeightOnZoom: null,

    // Trạng thái Các nút phía dưới
    _listBotButtonIsShown: false,

    // Tag
    _TAG_BG: 242342,
    _TAG_LOGO: 738271,
    _TAG_USERNAME_FIELD: 30000,
    _TAG_LOGIN_BUTTON  : 30002,
    _TAG_BUTTON_HARVEST: 63721,
    _TAG_BUTTON_RESEARCH: 34231,
    _TAG_LAYER_CLAN_CHAT: 32231,
    _TAG_BUTTON_REQUEST_DONATE: 42342,
    _TAG_BUTTON_CLAN: 434312,
    _TAG_BUTTON_REMOVE: 342342,

    ctor:function () {

        this._super();
        this.setTag(1000000);
        this.init();

    },
    init: function() {
        this.addLoginGUI();
    },
    test: function()
    {
        // Demo GIT
        //var builder = new Builder(0);
        //builder.startWork(fn.getUserBuilding(gv.orderInUserBuildingList.townHall, 0));
    },
    addLoginGUI: function()
    {
        var bg = cc.Sprite(logInGUI.bg);
        bg.setAnchorPoint(cc.p(0, 0));
        bg.scale = cc.winSize.width / bg.width;
        this.addChild(bg, 0, this._TAG_BG);

        var logo = cc.Sprite(logInGUI.logo);
        logo.setPosition(cc.winSize.width - 100, cc.winSize.height - 100);
        logo.scale = 2;
        this.addChild(logo, 0, this._TAG_LOGO);

        var size = cc.winSize;
        this._bgField = cc.Sprite(logInGUI.textFieldBG);
        this._bgField.setScaleX(2.5);
        this._bgField.setScaleY(2);
        this._bgField.setAnchorPoint(0, 0.5);
        this._bgField.setPosition(size.width/2 - 350, size.height/2);
        this.addChild(this._bgField, 0);

        this._usernameField = new ccui.TextField();
        this._usernameField .setTouchEnabled(true);
        this._usernameField.setMaxLength(10);
        this._usernameField.setMaxLengthEnabled(true);
        //this._usernameField.setTitleFontName(font.soji20);
        this._usernameField .fontName = "Arial";
        this._usernameField .setPlaceHolder("__________");
        this._usernameField.setTextColor(cc.color(255, 255, 255, 255));
        this._usernameField.setPlaceHolderColor(cc.color(255, 255, 255, 255));
        this._usernameField .setFontSize(50);
        this._usernameField.setAnchorPoint(0, 0.5);
        this._usernameField .x = size.width/2 - 318;
        this._usernameField .y = size.height/2;
        this.addChild(this._usernameField, 1, this._TAG_USERNAME_FIELD);

        if (cc.sys.localStorage.getItem("userName") != null)
            this._usernameField.setString(cc.sys.localStorage.getItem("userName"));

        this._btnLogin = new ccui.Button();
        var tt = "res/Art/Bang hoi/button _xem lai.png";
        this._btnLogin.loadTextures(tt, tt, tt, ccui.Widget.PLIST_TEXTURE);
        this._btnLogin.setTitleText("Đăng Nhập");
        this._btnLogin.setTitleFontName(font.soji12);
        this._btnLogin.setTitleFontSize(14);
        this._btnLogin.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: cc.winSize.width/2 + 10,
            y: cc.winSize.height/2,
            scale: 1.75
        });
        this._btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        this.addChild(this._btnLogin, 1, this._TAG_LOGIN_BUTTON);
    },

    onSelectLogin: function()
    {
        cc.log("================= " + "Start Connect");

        gv.usernameSendToServer = this._usernameField.string;
        if(gv.usernameSendToServer === "") gv.usernameSendToServer = "admin";
        cc.sys.localStorage.setItem("userName", gv.usernameSendToServer);
        gv.passwordSendToServer = "";

        gv.gameClient.connect();
    },

    onConnectSuccess: function()
    {
        cc.log("================= " + "Connect Success => Send Handshake");
        this.removeChildByTag(this._TAG_USERNAME_FIELD);
        this.removeChildByTag(this._TAG_LOGIN_BUTTON);
        this.removeChildByTag(this._TAG_BG);
        this.removeChildByTag(this._TAG_LOGO);
        this.removeChild(this._bgField);
    },

    onConnectFail: function()
    {
        cc.log("================= " + "Connect Fail");
        this.popUpMessage("Kết nối không thành công");
    },

    onFinishLogin:function()
    {
        cc.log("================= " + "Finish Login");
    },

    onReceiveUserInfo: function()
    {
        this.initGameSound();
        this.initUser();
        this.initMainGUI();
        this.initMap();
        cf.user.distributeResource(true, true, true);
        this.initTroops();
        this.initBuilder();

        // Conflict
        this.updateGUIandUserInfo();
        this.initRetainBuilding();
        this.updateGUI_Builder();

        // Conflict

        this.test();
    },
    initTroops: function ()
    {
        var armyCampMostSpacePercent = function ()
        {
            var firstArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][0];
            var maxSpacePercent = firstArmyCamp.getAvailableSpace() * 100 / firstArmyCamp.getMaxSpace();
            var output = 0;
            for (var i = 1; i < cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1]; i += 1)
            {
                var thisArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
                if (thisArmyCamp.getMaxSpace() > 0)
                {
                    var thisArmyCampAvailableSpacePercent = thisArmyCamp.getAvailableSpace() * 100 / thisArmyCamp.getMaxSpace();
                    if (thisArmyCampAvailableSpacePercent > maxSpacePercent)
                    {
                        maxSpacePercent = thisArmyCampAvailableSpacePercent;
                        output = i;
                    }
                }
            }
            return cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][output];
        }
        for (var i = 0; i < gv.jsonInfo.player.troopAmount.length; i += 1)
            for (var j = 0; j < gv.jsonInfo.player.troopAmount[i]; j += 1)
            {
                var theChosenArmyCamp = armyCampMostSpacePercent();
                if (theChosenArmyCamp._troopList == null)
                    theChosenArmyCamp._troopList = new Array();
                var troop = new Troop(i, theChosenArmyCamp._row + 2, theChosenArmyCamp._col + 2, theChosenArmyCamp._id);
                this._map.addChild(troop);
                theChosenArmyCamp._troopList.push(troop);
                theChosenArmyCamp._troopQuantity += gv.json.troopBase["ARM_" + (i + 1)]["housingSpace"];
            }
    },
    initBuilder: function()
    {
        for (var i=0; i<cf.user._buildingListCount[gv.orderInUserBuildingList.builderHut]; i++)
        {
            cf.user._buildingList[gv.orderInUserBuildingList.builderHut][i]._builder = new Builder(i);
        }
    },

    initGameSound: function()
    {
        audioPlayer.play(res.sound.soundBackgound, true);
    },
    initUser: function()
    {
        cf.user = new User();
        if(cf.user._clanId === -1) {
            testnetwork.connector.sendGetSuggestClan();
        }
        else {
            testnetwork.connector.sendGetUserClan();
        }
    },
    initMainGUI: function() {
        this.addShopButton();
        this.addBuildingButtons();
        this.addResourceBar();
        this.addBuilderBar();
        this.addExpBar();
        this.addArmyBar();

        this._popUp = new PopUpConstruct();
        this._popUp.setPosition(cc.p(cc.winSize.width /2, - cc.winSize.height));
        this.addChild(this._popUp, 1, gv.tag.TAG_POPUP);
        this.addCheatButton();
        this.addClanChatGUI();
    },

    addCheatButton: function() {

        var self = this;

        /* Button Restart & Reset */
        this._resetUserButton = gv.commonButton(120, 64, 70, cc.winSize.height-150, "Reset");
        this._resetUserButton.addClickEventListener(function()
        {
            //this.releaseTroop();
            testnetwork.connector.sendResetUser();
            audioPlayer.stopAll();
            try{
                fr.getCurrentScreen().popUpMessage("XÓA THÔNG TIN TÀI KHOẢN !");
                fr.getCurrentScreen().onEndGame();
            } catch(e)
            {
                cc.log(e)
            };
        }.bind(this));
        this.addChild(this._resetUserButton, 1);
        this._restartGameButton = gv.commonButton(80, 64, 70, 90, "Re-\nstart");
        this._restartGameButton.addClickEventListener(function()
        {
            //this.releaseTroop();
            audioPlayer.stopAll();
            try{
                fr.view(MainLayer);
            } catch(e)
            {
                cc.log(e)
            };
        }.bind(this));
        this._restartGameButton.setVisible(false);
        this.addChild(this._restartGameButton, 1);

        /* Button Gold */
        this._addGoldButton = gv.commonButton(120, 64, 70, cc.winSize.height-230, "F Gold");
        this._subGoldButton = gv.commonButton(120, 64, 70, this._addGoldButton.y - 70, "E Gold");

        this._addGoldButton.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_1, cf.user.getMaxCapacityResource(cf.resType.resource_1));
                    testnetwork.connector.sendCheat(cf.resType.resource_1, cf.cheatType.full);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._addGoldButton);
        this._subGoldButton.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_1, 0);
                    testnetwork.connector.sendCheat(cf.resType.resource_1, cf.cheatType.empty);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._subGoldButton);

        this.addChild(this._addGoldButton, 1);
        this.addChild(this._subGoldButton, 1);

        /* Button Elixir */
        this._addElixirButton = gv.commonButton(120, 64, 70, this._subGoldButton.y - 70, "F Elixir");
        this._subElixirButton = gv.commonButton(120, 64, 70, this._addElixirButton.y - 70, "E Elixir");

        this._addElixirButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_2, cf.user.getMaxCapacityResource(cf.resType.resource_2));
                    testnetwork.connector.sendCheat(cf.resType.resource_2, cf.cheatType.full);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._addElixirButton);
        this._subElixirButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_2, 0);
                    testnetwork.connector.sendCheat(cf.resType.resource_2, cf.cheatType.empty);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._subElixirButton);

        this.addChild(this._addElixirButton, 1);
        this.addChild(this._subElixirButton, 1);

        /* Button Dark Elixir */
        this._addDarkElixirButton = gv.commonButton(120, 64, 70, this._subElixirButton.y - 70, "F Dark_E");
        this._subDarkElixirButton = gv.commonButton(120, 64, 70, this._addDarkElixirButton.y - 70, "E Dark_E");

        this._addDarkElixirButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_3, cf.user.getMaxCapacityResource(cf.resType.resource_3));
                    testnetwork.connector.sendCheat(cf.resType.resource_3, cf.cheatType.full);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._addDarkElixirButton);
        this._subDarkElixirButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_3, 0);
                    testnetwork.connector.sendCheat(cf.resType.resource_3, cf.cheatType.empty);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._subDarkElixirButton);

        this.addChild(this._addDarkElixirButton, 1);
        this.addChild(this._subDarkElixirButton, 1);

        /* Button coin */
        this._addCoinButton = gv.commonButton(120, 64, 70, this._subDarkElixirButton.y - 90, "1M Coin");
        this._subCoinButton = gv.commonButton(120, 64, 200, this._addCoinButton.y, "E Coin");

        this._addCoinButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_4, cf.resAddPerCheat.resource_4)
                    testnetwork.connector.sendCheat(cf.resType.resource_4, cf.cheatType.full);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._addCoinButton);
        this._subCoinButton.addTouchEventListener(function(sender, type) {
            var cheatNumber = 5000000;
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cf.user.setCurrentResource(cf.resType.resource_4, 0);
                    testnetwork.connector.sendCheat(cf.resType.resource_4, cf.cheatType.empty);
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this._subCoinButton);

        this.addChild(this._addCoinButton, 1);
        this.addChild(this._subCoinButton, 1);

    },

    addClanChatGUI: function(){
        if (!gvGUI.layerClanChat)
        {
            gvGUI.layerClanChat = new LayerClanChat();
            gvGUI.layerClanChat.visibleInfo(false);
            gvGUI.layerClanChat.scale = cc.winSize.height/gvGUI.layerClanChat._bg.height;
            gvGUI.layerClanChat.setPosition(- gvGUI.layerClanChat.scale*(gvGUI.layerClanChat._bg.width + gvGUI.layerClanChat._layerUserOnline.width) + 5, 0);
            gvGUI.layerClanChat.retain();
        };
        gvGUI.layerClanChat.initContent();
        gvGUI.layerClanChat.updateTimeScrollChat();
        gvGUI.layerClanChat.onVisibleOrInvisibleButtonExpand();
        if (!this.getChildByTag(this._TAG_LAYER_CLAN_CHAT))
            this.addChild(gvGUI.layerClanChat, 2, this._TAG_LAYER_CLAN_CHAT);
    },
    initMap: function()
    {
        this._map = new Map();
        this._map.anchorX = 0;
        this._map.anchorY = 0;
        var centering = cc.p(-this._map._width/2 * this._map.scale + cc.winSize.width/2, -this._map._height/2 * this._map.scale + cc.winSize.height/2)
        this._map.setPosition(centering);
        this.addChild(this._map, 0, gv.tag.TAG_MAP);
        this.moveMap();
        this.zoomMap();
    },

    initRetainBuilding: function()
    {
        var building = null;
        for (var i = 0; i <= gv.buildingTypeCount; i++)
        {
            for (var j = 0; j < cf.user._buildingListCount[i]; j++)
            {
                building = cf.user._buildingList[i][j];
                if (!building._isActive)
                {
                    building.onStartBuild(gv.startConstructType.loadConstruct);
                };
                if (fn.buildingIsResource(building) && building._isActive)
                    building.onStartCollect();
            }
            ;
        }

    },

    updateGUIandUserInfo: function()
    {
        cf.user.updateMaxStorage();

        this._expBar.updateContent();
        this._armyBar.updateContent();
    },
    updateGUI_Builder: function()
    {
        cf.user.updateBuilder();
    },

    addResourceBar: function() {
        this._resBarGold = new GUI_ResourceBar(cf.resType.resource_1);
        this._resBarGold.attr({
            x: cc.winSize.width - cf.offSetGuiResourceBar,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGuiResourceBar - 30,
        });
        this.addChild(this._resBarGold, 1, gv.tag.TAG_RESOURCE_BAR_GOLD);

        this._resBarElixir = new GUI_ResourceBar(cf.resType.resource_2);
        this._resBarElixir.attr({
            x: cc.winSize.width - cf.offSetGuiResourceBar,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGuiResourceBar - 80,
        });
        this.addChild(this._resBarElixir, 1, gv.tag.TAG_RESOURCE_BAR_ELIXIR);

        this._resBarDarkElixir = new GUI_ResourceBar(cf.resType.resource_3);
        this._resBarDarkElixir.attr({
            x: cc.winSize.width - cf.offSetGuiResourceBar,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGuiResourceBar - 130,
        });
        this.addChild(this._resBarDarkElixir, 1, gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR);

        this._resBarCoin = new GUI_ResourceBar(cf.resType.resource_4);
        this._resBarCoin.attr({
            x: cc.winSize.width - cf.offSetGuiResourceBar,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGuiResourceBar - 180,
        });
        this.addChild(this._resBarCoin, 1, gv.tag.TAG_RESOURCE_BAR_COIN);
    },

    addBuilderBar: function()
    {
        this._builderBar = new BuilderBar();
        this._builderBar.attr({
        anchorX: 0.5,
        anchorY: 1,
        x: cc.winSize.width/2,
        y: cc.winSize.height - cf.offSetGuiResourceBar*1.5}
        );

        this.addChild(this._builderBar, 1, gv.tag.TAG_BUILDER_BAR);
    },

    addExpBar: function()
    {
        this._expBar = new ExpBar();
        this._expBar.setPosition(this._expBar._iconExpBG.width, cc.winSize.height - this._expBar._iconExpBG.height/1.5);
        this.addChild(this._expBar, 1);
    },

    addArmyBar: function()
    {
        this._armyBar = new ArmyBar();
        this._armyBar.setPosition(cc.winSize.width/4, cc.winSize.height - 60);
        this.addChild(this._armyBar, 1);
    },
    addShopButton: function(){
        var title = cc.LabelBMFont.create('CỬA HÀNG',  font.soji20);
        var shopButton = new ccui.Button();
        shopButton.scale = 1.5;
        shopButton.loadTextures(mainGUI.shop, mainGUI.shop);
        shopButton.attr({
            x: cc.winSize.width - shopButton.width/2*shopButton.scale - 5,
            y: shopButton.height/2*shopButton.scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        title.scale /= 1.5;
        title.setAnchorPoint(cc.p(0.5, 0.5));
        title.setPosition(cc.p(shopButton.width/2, title.height/2 + 3));
        shopButton.addTouchEventListener(this.openShop, this);
        shopButton.addChild(title);
        this.addChild(shopButton, 1, cf.SHOP_BUTTON_TAG);
    },

    addBuildingButtons: function() {
        var self = this;
        /* Button Info */
        this._guiButtonBuildingInfo = new IconActionBuilding(cf.CODE_BUILDING_INFO);
        this._guiButtonBuildingInfo.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: -200
        });
        this.addChild(this._guiButtonBuildingInfo, 2);
        this._guiButtonBuildingInfo.addClickEventListener(function()
        {
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();

            var id = gv.building_selected;
            var building = cf.user._buildingList[Math.floor(id/100) - 1][id%100];
            if (gv.building_selected === undefined || (building._buildingSTR == gv.buildingSTR.clanCastle && building._level == 0)) return;
            if (building._orderInUserBuildingList >= gv.orderInUserBuildingList.resource_1 && building._orderInUserBuildingList <= gv.orderInUserBuildingList.resource_3)
                building.onUpdateCurrentCapacity();
            if (!self.getChildByTag(gv.tag.TAG_POPUP))
            {
                var popUp = PopUpConstruct.getOrCreate();
                self.addChild(popUp, 1, gv.tag.TAG_POPUP);
            }
            self.getChildByTag(gv.tag.TAG_POPUP).updateContent(gv.building_selected, gv.constructType.info);
            self.getChildByTag(gv.tag.TAG_POPUP).onAppear();

        }. bind(this));

        /* Button Upgrade */
        this._guiButtonBuildingUpgrade = new IconActionBuilding(cf.CODE_BUILDING_UPGRADE);
        this._guiButtonBuildingUpgrade.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: -200
        });
        this.addChild(this._guiButtonBuildingUpgrade, 2);
        this._guiButtonBuildingUpgrade.addClickEventListener(function()
        {
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if (gv.building_selected === undefined) return;
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100)-1][Math.floor(gv.building_selected % 100)];
            var order = (building._orderInUserBuildingList);
            var orderBuilderHut = (gv.orderInUserBuildingList.builderHut);
            if (order === orderBuilderHut) return;
            if (building._isActive === false) return;

            var townHall = cf.user._buildingList[gv.orderInUserBuildingList.townHall][0];
            var townHallLevel = townHall._level;
            if(building._buildingSTR !== gv.buildingSTR.townHall) {
                if (townHallLevel >= building._jsonConfig[building._buildingSTR][Math.min(building._level + 1, building._maxLevel)]["townHallLevelRequired"]) {
                    self.getChildByTag(gv.tag.TAG_POPUP).updateContent(gv.building_selected, gv.constructType.upgrade);
                    self.getChildByTag(gv.tag.TAG_POPUP).onAppear();
                }
                else if (building._level === building._maxLevel) {
                    self.popUpMessage("Đã đạt cấp tối đa");
                } else if (townHallLevel < building._jsonConfig[building._buildingSTR][Math.min(building._level + 1, building._maxLevel)]["townHallLevelRequired"]) {
                    self.popUpMessage("Yêu cầu nhà chính cấp " + building._jsonConfig[building._buildingSTR][Math.min(building._level + 1, building._maxLevel)]["townHallLevelRequired"]);
                }
            } else if (building._level === building._maxLevel) {
                self.popUpMessage("Đã đạt cấp tối đa");
            } else {
                self.getChildByTag(gv.tag.TAG_POPUP).updateContent(gv.building_selected, gv.constructType.upgrade);
                self.getChildByTag(gv.tag.TAG_POPUP).onAppear();
            }
        }.bind(this));

        /* Button Cancel Build*/
        this._guiCancelBuildButton = new IconActionBuilding(cf.CODE_BUILDING_CANCEL);
        this._guiCancelBuildButton.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this._guiButtonBuildingUpgrade.x,
            y: this._guiButtonBuildingUpgrade.y
        });
        this.addChild(this._guiCancelBuildButton, 2);
        this._guiCancelBuildButton.addClickEventListener(function(){
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if(gv.building_selected === undefined) return;
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100) - 1][gv.building_selected%100];
            var order = building._orderInUserBuildingList;
            var orderBuilderHut = gv.orderInUserBuildingList.builderHut;
            if(order === orderBuilderHut) return;
            if(building._isActive) return;
            var price = fn.getPrice(building._buildingSTR, building._level+1);
            if (!fn.checkAddResourceEnough(price.gold/2, price.elixir/2,price.darkElixir/2))
            {
                fr.getCurrentScreen().popUpMessage("CẦN NÂNG CẤP THÊM KHO CHỨA");
                return;
            };
            var goldEarn    = Math.floor(price.gold/2);
            var elixirEarn  = Math.floor(price.elixir/2);
            var darkElixirEarn  = Math.floor(price.darkElixir/2);
            var coinEarn    = Math.floor(price.coin/2);
            var sGold       = (goldEarn > 0) ? (goldEarn + " Vàng") : " ";
            var sElixir     = (elixirEarn > 0) ? (elixirEarn + " Dầu Hồng") : " ";
            var sDarkElixir = (darkElixirEarn > 0) ? (darkElixirEarn + " Dầu đen") : " ";
            var sCoin       = (coinEarn > 0) ? (coinEarn + " Coin") : "";
            fr.getCurrentScreen().popUpMessage("Nhận lại: " + sGold + sElixir + sDarkElixir + sCoin);
            cf.user.editCurrentResource(cf.resType.resource_1, goldEarn);
            cf.user.editCurrentResource(cf.resType.resource_2, elixirEarn);
            cf.user.editCurrentResource(cf.resType.resource_3, darkElixirEarn);
            cf.user.editCurrentResource(cf.resType.resource_4, coinEarn);
            testnetwork.connector.sendCancel(Math.floor(gv.building_selected/100) - 1, gv.building_selected%100);
            building.onCancelBuild();
        }.bind(this));

        /* Button Instancely done*/
        this._guiInstantlyDone = new IconActionBuilding(cf.CODE_BUILDING_INSTANT);
        this._guiInstantlyDone.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this._guiCancelBuildButton.x + this._guiInstantlyDone.width/2*this._guiInstantlyDone.scale + 20,
            y: this._guiCancelBuildButton.y
        });
        this.addChild(this._guiInstantlyDone, 2);
        this._guiInstantlyDone.addClickEventListener(function () {
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if(gv.building_selected === undefined) return;
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100) - 1][gv.building_selected%100];
            var order = building._orderInUserBuildingList;
            var orderBuilderHut = gv.orderInUserBuildingList.builderHut;
            if(order === orderBuilderHut) return;
            if(building._isActive) return;
            var price = Math.ceil(building._time_remaining / 60);
            if(cf.user._currentCapacityCoin < price) {
                self.popUpMessage("Chưa đủ tài nguyên");
            }
            else {
                cf.user._currentCapacityCoin -= price;
                self.getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
                building._time_remaining = 0;
                building.onCompleteBuild();
                testnetwork.connector.sendInstantlyDone(Math.floor(gv.building_selected/100) - 1, gv.building_selected%100);
            }
        }.bind(this));

        /* Button Harvest */
        this._guiButtonHarvest = new IconActionBuilding(cf.CODE_BUILDING_HARVEST_1);
        this._guiButtonHarvest.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width/2,
            y: -cc.winSize.height/2
        });
        this.addChild(this._guiButtonHarvest, 2, this._TAG_BUTTON_HARVEST);
        this._guiButtonHarvest.addClickEventListener(function(){
            fn.getCurrentBuilding().onRemoveClick();
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100) - 1][gv.building_selected%100];
            building.onHarvest(true);
        });

        /*Button Research */
        this._guiButtonResearch = new IconActionBuilding(cf.CODE_BUILDING_RESEARCH);
        this._guiButtonResearch.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width/2,
            y: -cc.winSize.height/2
        });
        this.addChild(this._guiButtonResearch, 2, this._TAG_BUTTON_RESEARCH);
        this._guiButtonResearch.addClickEventListener(function(){
            fn.getCurrentBuilding().onRemoveClick();
            self.onPopUpResearchTroop();
            self.hideListBotButton();
        }.bind(this));

        /* Button Training Army*/
        this._guiTraningArmyButton = new IconActionBuilding(cf.CODE_TRAINING);
        this._guiTraningArmyButton.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this._guiButtonBuildingUpgrade.x + this._guiTraningArmyButton.width/2*this._guiTraningArmyButton.scale + 20,
            y: this._guiButtonBuildingUpgrade.y
        });
        this.addChild(this._guiTraningArmyButton, 2);
        this._guiTraningArmyButton.addClickEventListener(function(){
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if (gv.building_selected === undefined) return;
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100)-1][Math.floor(gv.building_selected % 100)];
            var order = (building._orderInUserBuildingList);
            var orderBuilderHut = (gv.orderInUserBuildingList.builderHut);
            if (order === orderBuilderHut) return;
            if (building._isActive === false) return;

            if(this.getChildByTag((gv.building_selected % 100)*gv.tag.TAG_POPUP_TRAINING) === null) {
                var popupTraining = new PopupTraining(gv.building_selected);
                this.addChild(popupTraining, 1, gv.tag.TAG_POPUP_TRAINING*(gv.building_selected%100));
                popupTraining.onAppear();

            }
            else {
                var popup = this.getChildByTag((gv.building_selected % 100)*gv.tag.TAG_POPUP_TRAINING);
                popup.onAppear();
            }
            this.getChildByTag((gv.building_selected % 100)*gv.tag.TAG_POPUP_TRAINING).onGetTrainingFromBarrack();
        }.bind(this));

        /*Button Request Donate */
        this._guiButtonRequestDonate = new IconActionBuilding(cf.CODE_BUILDING_REQUEST_DONATE);
        this._guiButtonRequestDonate.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width/2,
            y: -cc.winSize.height/2
        });
        this.addChild(this._guiButtonRequestDonate, 2, this._TAG_BUTTON_REQUEST_DONATE);
        this._guiButtonRequestDonate.addClickEventListener(function(){
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if (cf.user._buildingList[gv.orderInUserBuildingList.clanCastle][0].isEnoughTroop())
            {
                fr.getCurrentScreen().popUpMessage("Quân lính nhà Bang hội đang đầy");
                return;
            };self.onPopUpRequestDonate();
        }.bind(this));

        /* Button clan */
        this._guiButtonClan = new IconActionBuilding(cf.CODE_BUILDING_CLAN);
        this._guiButtonClan.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width/2,
            y: -cc.winSize.height/2
        });
        this.addChild(this._guiButtonClan, 2, this._TAG_BUTTON_CLAN);
        this._guiButtonClan.addClickEventListener(function(){
            self.hideListBotButton();
            fn.getCurrentBuilding().onRemoveClick();
            if (gv.building_selected === undefined) return;
            var building = cf.user._buildingList[Math.floor(gv.building_selected/100)-1][Math.floor(gv.building_selected % 100)];
            if (building._isActive === false) return;


            if(cf.user._clanId === -1) {
                if(self.getChildByTag(gv.tag.TAG_CLAN_JOIN) === null) {

                    var popupClan = new JoinClan();
                    popupClan.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                    this.addChild(popupClan, 1, gv.tag.TAG_CLAN_JOIN);
                    popupClan.onAppear();

                }
                else self.getChildByTag(gv.tag.TAG_CLAN_JOIN).onAppear();
            }
            else {

                testnetwork.connector.sendGetUserClan();

                if(gv.clanMemberList === null) testnetwork.connector.sendGetMemberList(gv.userClan.id);
                var clanDetail;
                if(self.getChildByTag(gv.tag.TAG_CLAN_DETAIL) === null) {
                    clanDetail = new ClanDetail();
                    clanDetail.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                    this.addChild(clanDetail, 1, gv.tag.TAG_CLAN_DETAIL);
                } else clanDetail = self.getChildByTag(gv.tag.TAG_CLAN_DETAIL);

                clanDetail.onAppear(gv.userClan);
            }

        }.bind(this));

        /* Button Remove Obstacle*/

        this._guibuttonRemove = new IconActionBuilding(cf.CODE_BUILDING_REMOVE);
        this._guibuttonRemove.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width/2,
            y: -cc.winSize.height/2
        });
        this.addChild(this._guibuttonRemove, 2, this._TAG_BUTTON_REMOVE);
        this._guibuttonRemove._labelCost = fn.commonLabel("20000" , font.soji20, 0.65, 0.75);
        this._guibuttonRemove._labelCost.setAnchorPoint(1, 0.5);
        this._guibuttonRemove._labelCost.setPosition(this._guibuttonRemove.width*2.5/4, 100);
        this._guibuttonRemove.addChild(this._guibuttonRemove._labelCost, 1);
        this._guibuttonRemove._iconCost = cc.Sprite(res.folder_gui_collect_res + "RES_1.png");
        this._guibuttonRemove._iconCost.scale = 0.35;
        this._guibuttonRemove._iconCost.setAnchorPoint(0, 0.5);
        this._guibuttonRemove._iconCost.setPosition(this._guibuttonRemove.width*2.5/4, 100);
        this._guibuttonRemove.addChild(this._guibuttonRemove._iconCost, 1);

        this._guibuttonRemove.addClickEventListener(function(){
            self.hideListBotButton();
            if (!self._guibuttonRemove.checkResourceRequierEnough())
            {
                fr.getCurrentScreen().popUpMessage("Chưa đủ tài nguyên");
                return;
            }
            if (cf.user.getBuilderFree() <= 0)
            {
                fr.getCurrentScreen().popUpMessage("Tất cả thợ đang bận");
                return;
            }
            fn.getCurrentBuilding().onStartRemove(gv.startConstructType.newConstruct);

        }.bind(this));
    },

    onPopUpResearchTroop: function()
    {
        if (this.getChildByTag(gv.tag.TAG_POPUP_RESEARCH_TROOP))
            this.removeChildByTag(gv.tag.TAG_POPUP_RESEARCH_TROOP);
        var researching = cf.user._buildingList[gv.orderInUserBuildingList.lab][0]._researching;
        var troopOrder = cf.user._buildingList[gv.orderInUserBuildingList.lab][0]._currentTroop;
        this._popUpResearchTroop = new PopUpResearchTroop(researching, troopOrder);
        this.addChild(this._popUpResearchTroop, 1, gv.tag.TAG_POPUP_RESEARCH_TROOP);
        this._popUpResearchTroop.onAppear();
    },

    onPopUpRequestDonate: function()
    {
        if (!this._popUpRequestDonate)
            //this.addChild(this._popUpRequestDonate);
        {
            this._popUpRequestDonate = new PopUpRequestDonate();
            this._popUpRequestDonate.setPosition(0, cc.winSize.height/2);
            this.addChild(this._popUpRequestDonate, 1);
        }
        //this._popUpRequestDonate.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        //this.addChild(this._popUpRequestDonate, 1);
        //this._popUpRequestDonate.show();
        this._popUpRequestDonate.onAppear();
    },
    onPopUpTroopInfo: function(troopOrder)
    {
        if (this._popUpTroopInfo)
            this.removeChild(this._popUpTroopInfo);
        this._popUpTroopInfo = new PopUpTroopInfo(troopOrder);
        this.addChild(this._popUpTroopInfo, 5);
        this._popUpTroopInfo.onAppear();
    },

    popUpMessage: function(msg)
    {
        if (gv.building_selected === undefined) {
            return;
        }
        if (!this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE))
        {
            var popUp = new PopUPMessage();
            this.addChild(popUp, 10, gv.tag.TAG_POPUP_MESSAGE);
        }
        this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).visible = true;
        this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).setMessage(msg);
        this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).onAppear();
    },
    /* Pop UP Bằng Coin*/
    onPopUpToCoin: function(resLeak, type, building) /*Type [0: xây dựng, 1: nâng cấp]*/
    {
        var tag = 32423423;
          if (gvGUI.popUpToCoin == null)
          {
              gvGUI.popUpToCoin = new PopUpToCoin();
              gvGUI.popUpToCoin.setPosition(0, cc.winSize.height/2);
              gvGUI.popUpToCoin.retain();
          }
          if (!this.getChildByTag(tag))
              this.addChild(gvGUI.popUpToCoin, 1, tag);

        gvGUI.popUpToCoin.updateCoin(resLeak, type, building);
        gvGUI.popUpToCoin.show();
    },
    /* Chạy dòng chữ khi nhận được quân*/
    onBubble: function(str)
    {
        var s = cc.LabelBMFont(str, font.soji20);
        s.setPosition(cc.winSize.height/2, 100);
        s.scale = 1.2;
        this.addChild(s, 30);
        var moveUp = cc.MoveBy(2,cc.p(0, 150));
        var act = cc.Sequence.create(moveUp,
            // cc.DelayTime(2),
            cc.CallFunc(function(){
                fr.getCurrentScreen().removeChild(s);
            }));
        s.runAction(act);
    },

    hideListBotButton: function()
    {
        this._listBotButtonIsShown = false;
        var hidingY = 200;

        this._guiButtonBuildingInfo.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiButtonBuildingUpgrade.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiInstantlyDone.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiCancelBuildButton.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiTraningArmyButton.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiButtonRequestDonate.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guiButtonClan.setPosition(cc.p(cc.winSize.width/2, -hidingY));
        this._guibuttonRemove.setPosition(cc.p(cc.winSize.width/2, - hidingY));
        if (this._guiButtonHarvest != undefined) this._guiButtonHarvest.setPosition(cc.p(cc.winSize.width/2 + this._guiInstantlyDone.width/2 + 2 * cf.offSetGuiResourceBar, -hidingY));
        if (this._guiButtonResearch != undefined) this._guiButtonResearch.setPosition(cc.p(cc.winSize.width/2 + this._guiInstantlyDone.width/2 + 2 * cf.offSetGuiResourceBar, -hidingY));
    },

    showListBotButton: function(buildingID)
    {
        this._listBotButtonIsShown = true;
        /* Infor(0) --- Upgrade(1) --- Cancel(2) --- Instance Finish(3) --- Collect(4) -- Research(5) -- Train(6) -- Request Donate(7) -- Clan GUI(8) -- Remove Obstacle (9) */
        var buildingOrder = Math.floor(buildingID/100) - 1;
        var buildingNum = buildingID % 100;
        var building = cf.user._buildingList[buildingOrder][buildingNum];

        var boo = [];
        boo[0] = true;  boo[1] = true;  boo[2] = true;  boo[3] = true;  boo[4] = false;
        boo[5] = false; boo[6] = false; boo[7] = false; boo[8] = false; boo[9] = false;

        if (building._level == building._maxLevel || !building._isActive || buildingOrder == gv.orderInUserBuildingList.builderHut) boo[1] = false;
        if (buildingOrder == gv.orderInUserBuildingList.lab && building._researching) boo[1] = false;
        if (buildingOrder == gv.orderInUserBuildingList.clanCastle && building._level == 0) boo[0] = false;
        if (building._isActive) boo[2] = false;
        if (building._isActive) boo[3] = false;
        switch (buildingOrder)
        {
            case gv.orderInUserBuildingList.townHall:
                break;
            case gv.orderInUserBuildingList.resource_1:
                if (building._isActive)
                    boo[4] = true;
                break;
            case gv.orderInUserBuildingList.resource_2:
                if (building._isActive)
                    boo[4] = true;
                break;
            case gv.orderInUserBuildingList.resource_3:
                if (building._isActive)
                    boo[4] = true;
                break;
            case gv.orderInUserBuildingList.storage_1:
                break;
            case gv.orderInUserBuildingList.storage_2:
                break;
            case gv.orderInUserBuildingList.storage_3:
                break;
            case gv.orderInUserBuildingList.lab:
                if (building._isActive) boo[5] = true;
                break;
            case gv.orderInUserBuildingList.barrack_1:
                if (building._isActive) boo[6] = true;
                if (building._isTraining) boo[1] = false;
                break;
            case gv.orderInUserBuildingList.clanCastle:
                if (building._isActive && building._level ==0) boo[1] = false;
                if (building._isActive && building._level > 0 && cf.user._clanId != -1) boo[7] = true;
                if (building._isActive && building._level > 0) boo[8] = true;
                break;
            case gv.orderInUserBuildingList.obstacle:
                boo[0] = false;
                boo[1] = false;
                boo[9] = !building._isCleaning;
                break;

        }

        this.onPopUpButton(boo, buildingID);
    },

    onPopUpButton: function(boo, buildingID)
    {
        /* Infor --- Upgrade --- Cancel --- Instance Finish --- Collect -- Research -- Train */
        var popUpButtonCount = fn.getItemOccurenceInArray(boo, true);
        var y = this._guiButtonBuildingInfo.height;
        var x = cc.winSize.width/2 - popUpButtonCount/2 * this._guiButtonBuildingInfo.width;
        var hidingY = -60;

        var offSet = this._guiButtonBuildingInfo.width * 2 - 40;
        if (boo[0])
        {
            this._guiButtonBuildingInfo.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiButtonBuildingInfo.runAction(act);
            x += offSet;
        };
        if (boo[1])
        {
            this._guiButtonBuildingUpgrade.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiButtonBuildingUpgrade.runAction(act);
            x += offSet;
        };
        if (boo[2])
        {
            this._guiCancelBuildButton.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiCancelBuildButton.runAction(act);
            x += offSet;
        }

        if (boo[3])
        {
            this._guiInstantlyDone.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiInstantlyDone.updateContent(buildingID);
            this._guiInstantlyDone.runAction(act);
            x += offSet;
        }if (boo[4])
        {
            this.popUpButtonHarvest(x, y, hidingY);
            x += offSet;
        }
        if (boo[5])
        {
            this._guiButtonResearch.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiButtonResearch.runAction(act);
            x += offSet;
        }
        if (boo[6])
        {
            this._guiTraningArmyButton.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiTraningArmyButton.runAction(act);
            x += offSet;
        }
        if (boo[7])
        {
            this._guiButtonRequestDonate.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiButtonRequestDonate.runAction(act);
            x += offSet;
        }
        if (boo[8])
        {
            this._guiButtonClan.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guiButtonClan.runAction(act);
            x += offSet;
        };
        if (boo[9])
        {
            this._guibuttonRemove.setPosition(x, hidingY);
            var act = cc.MoveTo(0.1, cc.p(x, y));
            this._guibuttonRemove.runAction(act);
            /* Cập nhật lượng tài nguyên cho nút remove*/
            this._guibuttonRemove.updateForObstcle();
            x += offSet;
        }
    },
    popUpButtonHarvest: function(x, y, hidingY)
    {
        var building = cf.user._buildingList[Math.floor(gv.building_selected/100) - 1][gv.building_selected%100];
        var orderResource = building._orderInUserBuildingList;
        switch(orderResource)
        {
            case gv.orderInUserBuildingList.resource_1:
                fn.replaceButtonImage(this._guiButtonHarvest, buildingGUI.iconHarvest_1)
                break;
            case gv.orderInUserBuildingList.resource_2:
                fn.replaceButtonImage(this._guiButtonHarvest, buildingGUI.iconHarvest_2)
                break;
            case gv.orderInUserBuildingList.resource_3:
                fn.replaceButtonImage(this._guiButtonHarvest, buildingGUI.iconHarvest_3)
                break;
        };
        this._guiButtonHarvest.setPosition(x, hidingY);

        var harvestAble = building._currentCapacity > 0;
        this._guiButtonHarvest.setBright(harvestAble);
        this._guiButtonHarvest.setEnabled(harvestAble);

        var actMoveUp = cc.MoveTo(0.1, cc.p(x, y));
        this._guiButtonHarvest.runAction(actMoveUp);

    },

    repositioning: function(){
        var self = this;
        self._map.x = self._map.x >= 0 ? 0 : self._map.x;
        self._map.y = self._map.y >= 0 ? 0 : self._map.y;

        self._map.x = self._map.x <= cc.winSize.width - self._map._width * self._map.scale ? cc.winSize.width - self._map._width * self._map.scale : self._map.x;
        self._map.y = self._map.y <= cc.winSize.height - self._map._height * self._map.scale + 42 ? cc.winSize.height - self._map._height * self._map.scale + 42 : self._map.y;
    },

    moveMap: function() {
        var self = this;
        var dis = 0;
        this._listenerOnMoveMap = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function(touch, event) {
                gv.mapMove.beganX = touch.getLocation().x;
                gv.mapMove.beganY = touch.getLocation().y;

                dis = cc.p(0,0);
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, self._map._width, self._map._height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    gv.touchBeganLocation = touch.getLocation();
                    return true;
                }

                return false;
            },
            onTouchMoved: function(touch, event) {
                cf.isMapMoving = true;
                var delta = touch.getDelta();
                dis = cc.pAdd(delta, dis);
                if(self.distance(delta, cc.p(0,0)) <= 10 && self.distance(dis, cc.p(0, 0)) <= 10) cf.isMapMoving = false;
                if(self.distance(dis, cc.p(0, 0)) > 10) cf.isMapMoving = true;
                var curPos = cc.p(self._map.x, self._map.y);
                curPos = cc.pAdd(curPos, delta);
                self._map.x = curPos.x;
                self._map.y = curPos.y;

                self.repositioning();

                curPos = null;
                return true;
            },
            onTouchEnded: function(touch, event) {
                gv.mapMove.endX = touch.getLocation().x;
                gv.mapMove.endY = touch.getLocation().y;

                if (gv.mapMove.maxTouch < 2)
                    self.moveMapAny(cc.p(gv.mapMove.endX - gv.mapMove.beganX, gv.mapMove.endY - gv.mapMove.beganY));
                cf.isMapMoving = false;

                gv.mapMove.maxTouch = 0;

                var building = fn.getCurrentBuilding();
                if (building == null) return;

                var locationNote = building.convertToNodeSpace(touch.getLocation());
                var w = building._size * cf.tileSize.width / 2 ;
                var h = building._size * cf.tileSize.height / 2 ;
                var x = locationNote.x;
                var y = locationNote.y;
                var polygon = [ [ -w, 0 ], [ 0, h ], [ w, 0 ], [ 0, -h ] ];

                if (!fn.pointInsidePolygon([x, y], polygon)/* && (gv.building_is_moved !== building._id)*/)
                {
                    gv.touchEndedLocation = touch.getLocation();
                    if (self.distance(gv.touchBeganLocation, gv.touchEndedLocation) <= 10 && !fn.getCurrentBuilding()._listener.isEnabled())
                    {
                        fn.getCurrentBuilding().onRemoveClick();
                    }
                    return;
                }
                return true;
            }
        })
        cc.eventManager.addListener(this._listenerOnMoveMap, this);
    },

    /* di chuyển bản đồ thêm 1 đoạn từ lúc nhả tay*/
    moveMapAny: function(p)
    {
        this._map.stopAllActions();
        var newX = this._map.x + p.x/4;
        var newY = this._map.y + p.y/4;

        newX = fn.boundary(0, cc.winSize.width - this._map._width * this._map.scale, newX);
        newY = fn.boundary(0, cc.winSize.height - this._map._height * this._map.scale, newY);

        var moveAny = cc.MoveTo(0.5, newX, newY, 2);
        //moveAny.setSpeed(0.5);
        this._map.runAction(moveAny);
    },
    distance: function(p, q, x) {
        if(!x) x = 0;
        return Math.sqrt((p.x - q.x)*(p.x - q.x) + (p.y - q.y)*(p.y - q.y));
    },

    zoomMap: function() {
        var self = this;
        var disOld = null;
        var disNew = null;
        var centerPoint = null;
        var touchCount = 0;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches: true,
            onTouchesBegan: function(touches, event) {
                return true;
            },
            onTouchesMoved: function(touches, event) {
                if (touches.length > 1) cf.isMapMoving = true;
                gv.mapMove.maxTouch = Math.max(gv.mapMove.maxTouch, touches.length);
                if (touches.length != 2) {
                    if (!self._listenerOnMoveMap.isEnabled()) self._listenerOnMoveMap.setEnabled(true);
                    return;
                }
                if (self._listenerOnMoveMap.isEnabled()) self._listenerOnMoveMap.setEnabled(false);
                touchCount = touches.length;
                var touch0 = touches[0].getLocation();
                var touch1 = touches[1].getLocation();
                if (!disOld)
                {
                    disOld = fn.distance2Points(touch0, touch1);
                    centerPoint = cc.p((touch0.x + touch1.x)/2, (touch0.y + touch1.y)/2);
                    self._mapScaleOnZoom = cf.BIG_MAP_SCALE;
                    self._mapXOnZoom = self._map.x;
                    self._mapHeightOnZoom = self._map.y;
                }
                disNew = fn.distance2Points(touch0, touch1);

                self.onZoom(disOld, disNew, centerPoint);
                return true;
            },
            onTouchesEnded: function(touches, event) {
                self._listenerOnMoveMap.setEnabled(true);
                touchCount --;
                if (touchCount == 0) {
                    gv.mapMove.maxTouch = 0;
                    self.updateMapScale(disOld, disNew);
                    disOld = null;
                }
            }
        }, this);
    },
    onZoom: function(disOld, disNew, centerPoint)
    {
        var newScale = disNew/disOld; // tý số nhân vào Scale
        newScale = fn.boundary(cf.mapScale.min/this._mapScaleOnZoom, cf.mapScale.max/this._mapScaleOnZoom, newScale);
        var disX = centerPoint.x - this._mapXOnZoom; // khoảng cách từ con trỏ đến map.x cũ
        var disY = centerPoint.y - this._mapHeightOnZoom;// khoang cách từ con trỏ đến map.y cú
        var disX2 = disX * newScale;
        var disY2 = disY * newScale;
        this._map.scale = this._mapScaleOnZoom * newScale;
        this._map.x = fn.boundary(cc.winSize.width - this._map._width*this._map.scale, 0, this._mapXOnZoom - (disX2 - disX));
        this._map.y = fn.boundary(cc.winSize.height - this._map._height*this._map.scale, 0, this._mapHeightOnZoom -(disY2 - disY));
    },
    updateMapScale: function(disOld, disNew)
    {
        if (this._mapScaleOnZoom) cf.BIG_MAP_SCALE = fn.boundary(cf.mapScale.min, cf.mapScale.max, this._mapScaleOnZoom * disNew/disOld);
    },

    openShop: function(sender, type){
        if(cf.isDeciding) return;
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                var map = this._map;
                if (gv.building_selected !== 0) {
                        var buildingSelected = map.getChildByTag(gv.building_selected);
                        if(buildingSelected !== null) buildingSelected.onEndClick();
                }
                sender.setScale(sender.scale*1.1);
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(this._shop === null) {
                    this._shop = new Shop();
                    this.addChild(this._shop, 10, cf.SHOP_TAG);
                }
                sender.setScale(sender.scale/1.1);
                this._shop.onAppear();
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                break;
        }
    },

    onEndGame: function()
    {
        this.runAction(cc.Sequence.create(
            cc.DelayTime(1.25),
            cc.CallFunc(function(){
                this.setVisible(false);
            }.bind(this))
        ));

    }
});

MainLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainLayer();
    scene.addChild(layer);
    return scene;
};

