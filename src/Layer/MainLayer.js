var MainLayer = cc.Layer.extend({
    _map: null,
    _shop: null,
    _resBarGold: null,
    _resBarElixir: null,
    _resBarDarkElixir: null,
    _resBarDarkElixir: null,
    _resBarCoin: null,

    _guiButtonBuildingInfo: null,
    _guiButtonBuildingUpgrade: null,

    _action1Pull: null,
    _action2Pull: null,
    _action1Push: null,
    _action2Push: null,

    _TAG_BG: 242342,
    _TAG_LOGIN: 534534,

    ctor:function () {
        this._super();
        this.setTag(1000000);
        this.init();
    },

    init: function() {
        var bg = cc.Sprite("res/Art/BG/Capture.PNG");
        bg.setAnchorPoint(cc.p(0, 0))
        this.addChild(bg, 0, this._TAG_BG);

        var size = cc.director.getVisibleSize();
        var yBtn = 2*size.height/3;
        var btnLogin = gv.commonButton(200, 64, size.width/4, yBtn,"Login");
        this.addChild(btnLogin, 1, this._TAG_LOGIN);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));

        // this.loadJson();
        // this.initUser();
        // this.initMap();
        // this.initMainGUI();
    },

    onSelectLogin: function()
    {
        cc.log("=============== " + "Start Connect");
        gv.gameClient.connect()
    },

    onConnectSuccess: function()
    {
        cc.log("=============== " + "Connect Success => Send Handshake");
        this.removeChildByTag(this._TAG_BG, false);
        this.removeChildByTag(this._TAG_LOGIN, false);
        this.loadJson();
        this.initUser();
        this.initMap();
        this.initMainGUI();
    },

    onConnectFail: function()
    {
        cc.log("=============== " + "Connect Fail");
    },

    onFinishLogin:function()
    {
        // this.lblLog.setString("Finish login!");
        //this._gameNode.setVisible(true);
        cc.log("=============== " + "Finish Login");
    },

    initMap: function()
    {
        this._map = new Map();
        this._map.anchorX = 0;
        this._map.anchorY = 0;
        var centering = cc.p(-this._map._width/2 * this._map.scale + cc.winSize.width/2, -this._map._height/2 * this._map.scale + cc.winSize.height/2)
        this._map.setPosition(centering);
        this.addChild(this._map, 0, "MAP");
        this.moveMap();
    },

    initMainGUI: function() {
        this.addShopButton();
        this.addSettingButton();
        this.addInventoryButton();
        this.addBuildingButtons();
        this.addResourceBar();
        this.addUserInfo();
    },

    initUser: function()
    {
        cf.user = new User("uId00001", "GSN Fresher 9 - Team 2");
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
        this._guiButtonBuildingInfo = new IconActionBuilding(cf.CODE_BUILDING_INFO);
        this._guiButtonBuildingInfo.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: -200
        });
        this.addChild(this._guiButtonBuildingInfo, 2);

        this._guiButtonBuildingUpgrade = new IconActionBuilding(cf.CODE_BUILDING_UPGRADE);
        this._guiButtonBuildingUpgrade.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cc.winSize.width / 2,
            y: -200
        });
        this.addChild(this._guiButtonBuildingUpgrade, 2);
    },

    hideListBotButton: function()
    {
        this._guiButtonBuildingInfo.setPosition(cc.p(cc.winSize.width/2 - cf.offSetGui*2, -200));
        this._guiButtonBuildingUpgrade.setPosition(cc.p(cc.winSize.width/2 + cf.offSetGui*2, -200));
    },

    showListBotButton: function() {
        var moveToPos1 = cc.MoveTo(0.1, cc.p(cc.winSize.width/2 - this._guiButtonBuildingInfo.width/2 - 2 * cf.offSetGui, this._guiButtonBuildingInfo.height/2*this.scale + cf.offSetGui));
        this._guiButtonBuildingInfo.runAction(moveToPos1);
        var moveToPos2 = cc.MoveTo(0.1, cc.p(cc.winSize.width/2 + this._guiButtonBuildingUpgrade.width/2 + 2 * cf.offSetGui, this._guiButtonBuildingUpgrade.height/2*this.scale + cf.offSetGui));
        this._guiButtonBuildingUpgrade.runAction(moveToPos2);
    },

    //gold,dElixir, Elixir, G visualize
    addResourceBar: function() {
        this._resBarGold = new GUI_ResourceBar(1);
        this._resBarGold.attr({
            x: cc.winSize.width - cf.offSetGui,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGui - 30,
        });
        this.addChild(this._resBarGold);

        this._resBarElixir = new GUI_ResourceBar(2);
        this._resBarElixir.attr({
            x: cc.winSize.width - cf.offSetGui,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGui - 80,
        });
        this.addChild(this._resBarElixir);

        this._resBarDarkElixir = new GUI_ResourceBar(3);
        this._resBarDarkElixir.attr({
            x: cc.winSize.width - cf.offSetGui,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGui - 130,
        });
        this.addChild(this._resBarDarkElixir);

        this._resBarCoin = new GUI_ResourceBar(4);
        this._resBarCoin.attr({
            x: cc.winSize.width - cf.offSetGui,
            y: cc.winSize.height - this._resBarGold.height - cf.offSetGui - 180,
        });
        this.addChild(this._resBarCoin);
    },

    //Exp, Trophy, Username, UserInfo
    addUserInfo: function() {
        var userName = cc.LabelBMFont(cf.user._name, font.soji20);
        userName.setAnchorPoint(cc.p(0, 1));
        userName.setPosition(cc.p(cf.offSetGui, cc.winSize.height - cf.offSetGui));
        this.addChild(userName)
    },

    addSettingButton: function() {
        var shopButton = this.getChildByTag(cf.SHOP_BUTTON_TAG);
        var settingButton = new ccui.Button();
        settingButton.scale = 1.5;
        settingButton.loadTextures(mainGUI.setting, mainGUI.setting);
        settingButton.setAnchorPoint(cc.p(0.5, 0.5));
        settingButton.setPosition(cc.p(cc.winSize.width - settingButton.width/2*settingButton.scale - 5 , shopButton.y + shopButton.height/2*shopButton.scale + settingButton.height/2*settingButton.scale));
        this.addChild(settingButton, 1, cf.SETTING_BUTTON_TAG);
        settingButton.addTouchEventListener(this.openSetting, this);
    },

    addInventoryButton: function(){

        var settingButton = this.getChildByTag(cf.SETTING_BUTTON_TAG);
        var inventoryButton = new ccui.Button();
        inventoryButton.scale = 1.5;
        inventoryButton.loadTextures(mainGUI.inventory, mainGUI.inventory);
        inventoryButton.setAnchorPoint(cc.p(0.5, 0.5));
        inventoryButton.setPosition(cc.p(cc.winSize.width - inventoryButton.width/2*inventoryButton.scale - 5 , settingButton.y + settingButton.height/2*settingButton.scale + inventoryButton.height/2*inventoryButton.scale));
        this.addChild(inventoryButton, 1, cf.INVENTORY_BUTTON_TAG);
        inventoryButton.addTouchEventListener(this.openInventory, this);
    },

    moveMap: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, self._map._width, self._map._height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    return true;
                }

                return false;
            },
            onTouchMoved: function(touch, event) {
                // var self = event.getCurrentTarget()
                cf.isMapMoving = true;
                if (cf.building_selected !== 0)
                    return
                var delta = touch.getDelta();
                var curPos = cc.p(self._map.x, self._map.y);
                curPos = cc.pAdd(curPos, delta);
                self._map.x = curPos.x;
                self._map.y = curPos.y;

                self._map.x = self._map.x >= 0 ? 0 : self._map.x;
                self._map.y = self._map.y >= 0 ? 0 : self._map.y;

                self._map.x = self._map.x <= cc.winSize.width - self._map._width * self._map.scale ? cc.winSize.width - self._map._width * self._map.scale : self._map.x;
                self._map.y = self._map.y <= cc.winSize.height - self._map._height * self._map.scale + 42 ? cc.winSize.height - self._map._height * self._map.scale + 42 : self._map.y;

                // cc.log(self._map.y);
                // cc.log(self._map.x >= cc.winSize.width - self._map._width);

                // cc.log(self.convertToWorldSpace().x + " " + self.convertToWorldSpace().y);
                //
                // cc.log(self._map.x + " " + self._map.y);

                curPos = null;
            },
            onTouchEnded: function(touch, event) {
                cf.isMapMoving = false;
                return true;
            }
        }, this)
    },

    zoomMap: function(scale) {
        var self = this;
        var touchLocation;
        var curPosInMap;
        var newPosInMap;
        var newMapPos;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                touchLocation = touch.getLocation();
                curPosInMap = cc.p(touchLocation.x - self._map.x, touchLocation.y - self._map.y);
                newPosInMap = cc.p(curPosInMap.x*scale, curPosInMap.y*scale);
                newMapPos = cc.p(touchLocation.x - newPosInMap.x, touchLocation.y - newPosInMap.y);
                return true;
            },
            onTouchMoved: function(touch, event) {
            },
            onTouchEnded: function(touch, event) {
                self._map.setPosition(newMapPos);
                self._map.scale *= scale;
            }
        }, this)
    },

    openShop: function(sender, type){
        if(cf.isDeciding) return;
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                var map = this._map;
                if (cf.building_selected !== 0) {
                    var buildingSelected = map.getChildByTag(cf.building_selected);
                    buildingSelected.onEndClick();
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

    openSetting: function(sender, type){
        if(cf.isDeciding) return;
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.1);
                cc.log("Open setting");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.1);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                cc.log("canceled");
                break;
        }
    },

    openInventory: function(sender, type) {
        if(cf.isDeciding) return;
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.1);
                cc.log("Open inventory");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.1);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                cc.log("canceled");
                break;
        }
    },

    loadJson:function () {
        cc.loader.loadJson(res.armyCampJson, function(err, data){
            cf.jsonArmyCamp = data;
        });

        cc.loader.loadJson(res.barrackJson, function(err, data){
            cf.jsonBarrack = data;
        });
        cc.loader.loadJson(res.builderHutJson, function(err, data){
            cf.jsonBuilderHut = data;
        });
        cc.loader.loadJson(res.initGameJson, function(err, data){
            cf.jsonInitGame = data;
        });
        cc.loader.loadJson(res.laboratoryJson, function(err, data){
            cf.jsonLaboratory = data;
        });
        cc.loader.loadJson(res.resourceJson, function(err, data){
            cf.jsonResource = data;
        });
        cc.loader.loadJson(res.storageJson, function(err, data){
            cf.jsonStorage = data;
        });
        cc.loader.loadJson(res.townHallJson, function(err, data){
            cf.jsonTownHall = data;
        });
        cc.loader.loadJson(res.troopJson, function(err, data){
            cf.jsonTroop = data;
        });
        cc.loader.loadJson(res.troopBaseJson, function(err, data){
            cf.jsonTroopBase = data;
        });
        cc.loader.loadJson("res/ConfigJson/ShopList.json", function(error, data){
            cf.ShopItemList = data;
        });
    }
});

MainLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainLayer();
    scene.addChild(layer);
    return scene;
};

MainLayer.inside = function(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

MainLayer.get_animation = function(str, n)
{
    var arr_effect = [];
    for (var i = 1; i <= n; i++)
    {
        var frame = cc.spriteFrameCache.getSpriteFrame(str + "(" + i + ").png");
        arr_effect.push(frame)
    };
    return cc.Animate(new cc.Animation(arr_effect, cf.time_refresh))
};