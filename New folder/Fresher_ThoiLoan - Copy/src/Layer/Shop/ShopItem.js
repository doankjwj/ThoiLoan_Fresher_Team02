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

    ctor: function(str, num){
        this._super();

        this._shopListJson = cf.ShopItemList["ShopList"][str];
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

        this._currentQuantity = 0;
        this._capacity = (this._configItem["key"].substring(0,3) !== "BDH") ? cf.jsonTownHall['TOW_1']["1"][this._configItem["key"]] : "5";

        var currentQuantityText = this._currentQuantity.toString() + "/" + this._capacity.toString();
        var currentQuantityLabel = cc.LabelBMFont(currentQuantityText, font.soji20);
        currentQuantityLabel.setPosition(cc.p(this.width - 50, timeLabel.y));

        if(this._configItem["priceCurrency"] === "gold") this._priceIcon = cc.Sprite(shopGUI.gold);
        else if(this._configItem["priceCurrency"] === "elixir") this._priceIcon = cc.Sprite(shopGUI.elixir);
        else if(this._configItem["priceCurrency"] === "coin") this._priceIcon = cc.Sprite(shopGUI.g);

        this._priceIcon.setPosition(cc.p(this.width - this._priceIcon.width - 10, 35));

        this._priceText = this._jsonConfig[this._configItem["key"]]["1"][this._configItem["priceCurrency"]];
        var priceLabel = cc.LabelBMFont(this._priceText.toString(), font.soji20);
        priceLabel.setPosition(cc.p(this._priceIcon.x - priceLabel.width, this._priceIcon.y));

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
        this.addChild(currentQuantityLabel, 1);
        this.addChild(this._priceIcon, 1);
        this.addChild(priceLabel, 1);
        this.addChild(itemNameLabel, 1);

        this.init();

    },

    init: function(){
        this.addTouchEventListener(this.touchBuyItem, this);
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
        // map.log_map_array();
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