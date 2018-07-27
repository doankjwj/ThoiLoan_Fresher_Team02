TIME_MARGIN = {
    TOP: 30,
    BOT: 90
};
INFO_MARGIN = {
    TOP: 10,
    RIGHT: 10
};
var ShopItem = ccui.Button.extend({
    _configItem: null,
    _itemName: null,
    _timeIcon: null,
    _timeText: null,
    _time: null,
    _itemIcon: null,
    _currentQuantity: null,
    _capacity: null,
    _priceText: null,
    _priceIcon: null,
    _jsonConfig: null,
    _shopListJson: null,
    _key: null,

    ctor: function(str, num){
        this._super();

        this._shopListJson = gv.json.shopItemList["ShopList"][str];
        this._configItem = this._shopListJson[num];
        this._jsonConfig = cf.getJsonConfigFile(this._configItem["key"]);
        this.setTag(this._configItem["tag"]);
        this.loadTextures(shopGUI.slot, shopGUI.slot);

        var infoButton = new ccui.Button();
        infoButton.loadTextures(shopGUI.info, shopGUI.info);
        infoButton.setAnchorPoint(cc.p(0, 0));
        infoButton.setPosition(cc.p(this.width - infoButton.width  - INFO_MARGIN.RIGHT, this.height - infoButton.height -INFO_MARGIN.TOP));

        var itemBackground = new cc.Sprite(shopGUI.itemBackground);
        itemBackground.setAnchorPoint(cc.p(0.5, 0.5));
        itemBackground.setPosition(cc.p(this.width/2, this.height/2));

        this._itemIcon = new cc.Sprite(this._configItem["iconPath"]);
        this._itemIcon.setPosition(cc.p(this.width/2, this.height/2));

        this._timeIcon = new cc.Sprite(shopGUI.time);
        this._timeIcon.setPosition(cc.p(TIME_MARGIN.TOP, TIME_MARGIN.BOT));

        this._time = this._jsonConfig[this._configItem["key"]]["1"]["buildTime"];
        var seconds = this._time;

        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds/ 60);
        seconds  -= mnts*60;

        if(this._time !== undefined) {
            this._timeText = (days !== 0 ? (days.toString() + "d") : "" ) + (hrs !== 0 ? (hrs.toString() + "h") : "") + (mnts !== 0 ? (mnts.toString() + "m") : "") + seconds.toString() + "s";
        }
        else this._timeText = "0s";

        // this._timeText = ((this._time === 0) ? ((days !== 0 ? (days.toString() + "d") : "" ) + (hrs !== 0 ? (hrs.toString() + "h") : "") + (mnts !== 0 ? (mnts.toString() + "m") : "") + seconds.toString()) : this._timeText.toString())+ "s";
        var timeLabel = cc.LabelBMFont.create(this._timeText,  font.soji20);
        timeLabel.setPosition(cc.p(this._timeIcon.x + this._timeIcon.width + 20, this._timeIcon.y));

        this._key = this._configItem["key"];

        switch(this._key) {
            case gv.buildingSTR.townHall:
                break;
            case gv.buildingSTR.barrack_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.barrack_1];
                break;
            case gv.buildingSTR.armyCamp_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1];
                break;
            case gv.buildingSTR.resource_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.resource_1];
                break;
            case gv.buildingSTR.resource_2:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.resource_2];
                break;
            case gv.buildingSTR.storage_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.storage_1];
                break;
            case gv.buildingSTR.storage_2:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.storage_2];
                break;
            case gv.buildingSTR.builderHut:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.builderHut];
                break;
            default:
                break;
        }
        this._capacity = (this._configItem["key"].substring(0,3) !== "BDH") ? gv.json.townHall[gv.buildingSTR.townHall][cf.user._buildingList[gv.orderInUserBuildingList.townHall][0]._level][this._configItem["key"]] : "5";

        var currentQuantityText = this._currentQuantity.toString() + "/" + this._capacity.toString();
        this._currentQuantityLabel = cc.LabelBMFont(currentQuantityText, font.soji20);
        this._currentQuantityLabel.setPosition(cc.p(this.width - 50, timeLabel.y));


        this._priceCurrency = this._configItem["priceCurrency"];

        if(this._configItem["priceCurrency"] === "gold") this._priceIcon = cc.Sprite(shopGUI.gold);
        else if(this._configItem["priceCurrency"] === "elixir") this._priceIcon = cc.Sprite(shopGUI.elixir);
        else if(this._configItem["priceCurrency"] === "coin") this._priceIcon = cc.Sprite(shopGUI.g);

        this._priceIcon.setPosition(cc.p(this.width - this._priceIcon.width - 10, 35));

        if(this._key !== gv.buildingSTR.builderHut) this._priceText = this._jsonConfig[this._configItem["key"]]["1"][this._configItem["priceCurrency"]];
        else {
            this._priceText = this._jsonConfig[this._configItem["key"]][(this._currentQuantity + 1).toString()][this._configItem["priceCurrency"]];
        }

        this._priceLabel = cc.LabelBMFont(this._priceText.toString(), font.soji20);
        this._priceLabel.setPosition(cc.p(this._priceIcon.x - this._priceLabel.width, this._priceIcon.y));

        this._itemName = this._configItem["name"];
        var itemNameLabel = cc.LabelBMFont(this._itemName, font.soji20);
        itemNameLabel.scale = 0.8;
        itemNameLabel.setAnchorPoint(cc.p(0.5, 0.5));
        itemNameLabel.setPosition(cc.p(this.width/2, infoButton.y + itemNameLabel.height/2));

        this.addChild(infoButton, 1);
        this.addChild(itemBackground, 1);
        this.addChild(this._itemIcon, 2);
        this.addChild(this._timeIcon, 1);
        this.addChild(timeLabel, 1);
        this.addChild(this._currentQuantityLabel, 1);
        this.addChild(this._priceIcon, 1);
        this.addChild(this._priceLabel, 1);
        this.addChild(itemNameLabel, 1);

        this.init();

    },

    init: function(){
        this.addTouchEventListener(this.touchBuyItem, this);
    },

    updateStatus: function()
    {
        switch(this._key) {
            case gv.buildingSTR.townHall:
                break;
            case gv.buildingSTR.barrack_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.barrack_1];
                break;
            case gv.buildingSTR.armyCamp_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1];
                break;
            case gv.buildingSTR.resource_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.resource_1];
                break;
            case gv.buildingSTR.resource_2:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.resource_2];
                break;
            case gv.buildingSTR.storage_1:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.storage_1];
                break;
            case gv.buildingSTR.storage_2:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.storage_2];
                break;
            case gv.buildingSTR.builderHut:
                this._currentQuantity = cf.user._buildingListCount[gv.orderInUserBuildingList.builderHut];
                break;
            default:
                break;
        }
        this._capacity = (this._configItem["key"].substring(0,3) !== "BDH") ? gv.json.townHall[gv.buildingSTR.townHall][cf.user._buildingList[gv.orderInUserBuildingList.townHall][0]._level][this._configItem["key"]] : "5";
        var currentQuantityText = this._currentQuantity.toString() + "/" + this._capacity.toString();
        this._currentQuantityLabel.setString(currentQuantityText);
        if(this._currentQuantity >= this._capacity) {
            this.setTouchEnabled(false);
            this.setEnabled(false);
            this.setBright(false);
            var act = cc.tintTo(0, 127.5, 127.5, 127.5 );
            act.retain();
            this._itemIcon.runAction(act.clone());
            this._priceIcon.runAction(act.clone());
        }
        else {
            this.setTouchEnabled(true);
            this.setEnabled(true);
            this.setBright(true);
            var act = cc.tintTo(0, 255, 255, 255);
            act.retain();
            this._itemIcon.runAction(act.clone());
            this._priceIcon.runAction(act.clone());
        }

        if(this._priceCurrency === "gold") {
            if(cf.user._currentCapacityGold < this._priceText) this._priceLabel.setColor(cc.color.RED);
        } else if(this._priceCurrency === "elixir") {
            if(cf.user._currentCapacityElixir < this._priceText) this._priceLabel.setColor(cc.color.RED);
        } else if(this._priceCurrency === "coin") {
            if(cf.user._currentCapacityCoin < this._priceText) this._priceLabel.setColor(cc.color.RED);
        }

    },

    touchBuyItem: function(sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                sender.scale = 1.55;
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.scale = 1.5;
                this.buyItem(this.getTag());
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.scale = 1.5;
                break;
        }
    },

    buyItem: function(tag){
        var shopItem = this.getParent().getParent().getParent();
        shopItem.onDisappear();
        var map = shopItem.getParent()._map;
        building = this.createBuildingFromTag(map, tag);
        map.addChild(building);
        var tmp = (building._orderInUserBuildingList + 1)*100 + cf.user._buildingListCount[building._orderInUserBuildingList];
        cf.building_selected = tmp;
        building.setTag(tmp);
        building._id = tmp;
        building.onClick();
        building.showBuildingButton();

    },

    createBuildingFromTag: function(map, tag){
        cf.isDeciding = true;
        var building;
        for(var i = 0; i<this._shopListJson.length; i++){
            if(tag === this._shopListJson[i]["tag"]) {
                var buildingConfig = cf.getJsonConfigFile(this._shopListJson[i]["key"]);
                var size = buildingConfig[this._shopListJson[i]["key"]]["1"]["width"];
                var pos = map.get_avaiable_position(size);
                building = cf.tagToItem(tag, cf.defaultLevel, pos.x, pos.y, false);
                break;
            }
        }

        return building;
    }
});