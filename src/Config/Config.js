var cf = cf || {};
var gv = gv || {};

cf.BIG_MAP_SCALE = 0.5;
cf.SCALE = 1;
cf.bgSCALE = cf.SCALE*2;
cf.squareSize = 50*cf.SCALE;
cf.buildingScale = cf.SCALE;
cf.mapScale = {
    max: 2,
    min: 0.35
}
gv.usernameSendToServer = null;

cf.currentItemCurrency = null;
cf.currentItemPrice = null;

cf.offSetGuiResourceBar = 25;

cf.tileSize = {
    height: 57*cf.SCALE,
    width: 76*cf.SCALE
};

cf.time_refresh = 0.1;
cf.isDeciding = false;

/* Move Building */
gv.building_selected = 0;   // Công trình được chọn
gv.building_is_moved = 0;    // Công trình di chuyển
cf.move_able = false;
cf.moved = false;
//cf.r_old = null;
//        cf.c_old = null;
cf.current_r = null;
cf.current_c = null;

/* Map Infor */
cf.tileLocation = [];
cf.map_array = [];

/* Code Button Building */
cf.CODE_BUILDING_INFO = 324324;
cf.CODE_BUILDING_UPGRADE = 2314234;
cf.CODE_BUILDING_INSTANT = 131196;
cf.CODE_BUILDING_CANCEL = 13121997;
cf.CODE_BUILDING_HARVEST_1 = 346286485;
cf.CODE_BUILDING_HARVEST_2 = 346286421;
cf.CODE_BUILDING_HARVEST_3 = 346286431;
cf.CODE_BUILDING_RESEARCH = 23423324;
cf.CODE_TRAINING = 27071993;
cf.CODE_BUILDING_REQUEST_DONATE = 232423;
cf.CODE_BUILDING_CLAN = 2342343;
cf.CODE_BUILDING_REMOVE = 42344322;
cf.CODE_SELECT_WALL = 42344323;

cf.user = null;

cf.isMapMoving = false;
cf.mapScalePre = null;      // Scale của map khi bắt đầu Touch, dùng để so sánh với kích thước lúc sau khi chạm

cf.selectedWall = [];

/* Shop */
cf.shopType = {
    army: {
        name: "ARMY",
        tag: 10,
        str: "QUÂN ĐỘI"
    },
    res: {
        name: "RES",
        tag: 11,
        str: "TÀI NGUYÊN"
        },
    buyRes: {
        name: "BUY_RES",
        tag: 15,
        str: "NGÂN KHỐ"
        },
    defense: {
        name: "DEFENSE",
        tag: 14,
        str: "PHÒNG THỦ"
        },
    dc: {
        name: "DC",
        tag: 13,
        str: "TRANG TRÍ"
        },
    shield: {
        name: "SHIELD",
        tag: 12,
        str: "BẢO VỆ"
    }
};

gv.json =
{
    armyCamp: null,
    barrack: null,
    builderHut: null,
    obstacle: null,
    initGame: null,
    laboratory: null,
    resource: null,
    shopItemList: null,
    storage: null,
    townHall: null,
    troop: null,
    troopBase: null,
    itemList: null,
    defence: null,
    troopAnimation: null,
    clanCastle: null,
    wall: null,
    builder: null,
};
gv.plist =
    {

    };

cf.ShopItemList = null;
cf.defaultLevel = 0;

cf.SHOP_BUTTON_TAG = 110;
cf.SETTING_BUTTON_TAG = 111;
cf.INVENTORY_BUTTON_TAG = 112;
cf.SHOP_TAG = 100010;

/* Animation */
cf.animationArmyCamp = [];
cf.animationBarrack = [];
cf.animationBarrackWorking = null;
cf.animationCoinDrop = [];
cf.animationLab = [];
cf.animationLabWorking = null;
cf.animationLevelUp = null;
cf.animationLoading = null;
cf.animationRes1 = [];
cf.animationRes2 = [];
cf.animationTownHall = null;
cf.animationConstructLevelUp = null;
cf.animationDefence_1 = [];


cf.MAX_BUILDING_TYPE = 40;
cf.MAX_BUILDING_LEVEL = 20;

cf.shopResourceItem = {
    ResGold: 34324,
    ResElixir: 3423,
    ResDarkElixir: 34543,
    ResCoin: 2342
};


/* time */
gv.time = null;

/* Building Info */
gv.buildingSTR = {
    townHall: "TOW_1",
    storage_1: "STO_1",
    storage_2: "STO_2",
    storage_3: "STO_3",
    resource_1: "RES_1",
    resource_2: "RES_2",
    resource_3: "RES_3",
    lab: "LAB_1",
    armyCamp_1: "AMC_1",
    barrack_1: "BAR_1",
    barrack_2: "BAR_2",
    builderHut: "BDH_1",
    obstacle: "OBS",
    defence_1: "DEF_1",
    clanCastle: "CLC_1",
    wall:  "WAL_1"
};
gv.buildOnMoveGUI =
{
    arrow: "arrowmove",
    red: "RED",
    green: "GREEN"
};
gv.buildingName =
{
    townHall: "Nhà Chính",
    storage_1: "Kho vàng",
    storage_2: "Kho dầu",
    storage_3: "Kho Dầu đen",
    resource_1: "Mỏ vàng",
    resource_2: "Mỏ dầu",
    resource_3: "Mỏ dầu đen",
    lab: "Nhà nâng cấp lính",
    armyCamp_1: "Trại lính",
    barrack_1: "Nhà Lính",
    barrack_2: "Nhà lính đen",
    builderHut: "Nhà thợ xây",
    obstacle: "Vật cản",
    defence_1: "Pháo thần công",
    clanCastle: "Nhà Bang Hội",
    wall: "Tường"
};
gv.orderInUserBuildingList =
{
    townHall: 0,
    storage_1: 1,
    storage_2: 2,
    storage_3: 3,
    resource_1: 4,
    resource_2: 5,
    resource_3: 6,
    lab: 7,
    armyCamp_1: 8,
    barrack_1: 9,
    barrack_2: 10,
    builderHut: 11,
    obstacle: 13,
    defence_1: 12,
    clanCastle: 26,
    wall: 25
};
gv.buildingMaxLevel = {
    townHall: 10,
    storage_1: 11,
    storage_2: 11,
    storage_3: 6,
    resource_1: 11,
    resource_2: 11,
    resource_3: 6,
    lab: 9,
    armyCamp_1: 8,
    barrack_1: 12,
    barrack_2: 6,
    builderHut: 5,
    obstacle: 27,
    defence_1: 10,
    clanCastle: 6,
    wall: 7,
};
gv.constructType =
{
    info: 1231,
    upgrade: 3423
};

/* PopUp GUI Construct*/
cf.popUpGUI_Construct =
{
    barWidth: 311,
    barHeight : 36
};

/* Build Status */
gv.startConstructType =
{
    newConstruct: 3123,
    loadConstruct: 5421
};

/* Offset with Server Position */
gv.offSetBuildingVsServer = 1;


gv.buildingTypeCount = 14;

/* Capacity */
gv.capacity =
{
    gold: "capacityGold",
    elixir: "capacityElixir",
    darkElixir: "capacityDarkElixir",
    capacity: "capacity"
};

/* Main Tag */
gv.tag =
    {
        TAG_MAP: 1800,
        TAG_CENTER_BUILDING: 1801,
        TAG_BUILDER_BAR: 1900,
        TAG_RESOURCE_BAR_GOLD: 1901,
        TAG_RESOURCE_BAR_ELIXIR: 1902,
        TAG_RESOURCE_BAR_DARK_ELIXIR: 1903,
        TAG_RESOURCE_BAR_COIN: 1904,
        TAG_POPUP: 2000,
        TAG_POPUP_MESSAGE: 2001,
        TAG_POPUP_RESEARCH_TROOP: 3421,
        TAG_POPUP_TRAINING: 1890,
        TAG_BUTTON_TROOP: 1905,
        TAG_CLAN_JOIN: 1906,
        TAG_CLAN_SEARCH: 1907,
        TAG_CLAN_CREATE: 1908,
        TAG_CLAN_MEMBER: 1909,
        TAG_BUTTON_SEARCH_BY_NAME: 10,
        TAG_BUTTON_SEARCH_BY_ID: 11,
        TAG_ICON_CLAN_LAYER: 12,
        TAG_CLAN_DETAIL: 13,
    };
/* Pop Up */
gv.popUpConstruct = null;
gv.popUpMessage = null;

//offset time
gv.timeOffset = 0;

//function
cf.shopTagToName = function (tag) {
    switch (tag) {
        case 10:
            return cf.shopType.army.name;
        case 11:
            return cf.shopType.res.name;
        case 12:
            return cf.shopType.shield.name;
        case 13:
            return cf.shopType.buyRes.name;
        case 14:
            return cf.shopType.defense.name;
        case 15:
            return cf.shopType.buyRes.name;
        default:
            return null;
    }
};

cf.getCategoryTag = function(tag){
    return tag*20;
};

cf.shopTagToStr = function (tag) {
    switch (tag) {
        case 10:
            return cf.shopType.army.str;
        case 11:
            return cf.shopType.res.str;
        case 12:
            return cf.shopType.shield.str;
        case 13:
            return cf.shopType.buyRes.str;
        case 14:
            return cf.shopType.defense.str;
        case 15:
            return cf.shopType.buyRes.str;
        default:
            return null;
    }
};

cf.getJsonConfigFile = function (str) {
    var substr = str.substring(0, 3);
    switch(substr)
    {
        case "TOW":
            return gv.json.townHall;
        case "LAB":
            return gv.json.laboratory;
        case "BDH":
            return gv.json.builderHut;
        case "RES":
            return gv.json.resource;
        case "STO":
            return gv.json.storage;
        case "AMC":
            return gv.json.armyCamp;
        case "DEF":
            return gv.json.defence;
        case "BAR":
            return gv.json.barrack;
        case "WAL":
            return gv.json.wall;
    }

};

cf.tagToItem = function(tag, lvl, posX, posY, existed){
    switch(tag){
        case 900:
            return new Barrack(20, lvl, posX, posY, existed, false);
        case 800:
            return new ArmyCamp(21, lvl, posX, posY, existed, false);
        case 400:
            return new Resource(22, lvl, posX, posY, existed, false, gv.buildingSTR.resource_1);
        case 500:
            return new Resource(23, lvl, posX, posY, existed, false, gv.buildingSTR.resource_2);
        case 100:
            return new Storage(24, lvl, posX, posY, existed, false, gv.buildingSTR.storage_1);
        case 200:
            return new Storage(25, lvl, posX, posY, existed, false, gv.buildingSTR.storage_2);
        case 350:
            return new Storage(25, lvl, posX, posY, existed, false, gv.buildingSTR.storage_3);
        case 1100:
            return new BuilderHut(26, lvl, posX, posY, existed, false);
        case 1200:
            return new Defence(27, lvl, posX, posY, existed, false, gv.buildingSTR.defence_1);
        case 700:
            return new Laboratory(28, lvl, posX, posY, existed, false);
        case 2500:
            return new Wall(29, lvl, posX, posY, existed, false);
    }
};

cf.stringToItemInit = function(str, index) {
    var building = null;
    var currentTime = new Date().getTime();
    var finishTime = null;
    var isActive = null;

    switch(str)
    {
        case "TOW_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new TownHall(cf.user._buildingListCount[gv.orderInUserBuildingList.townHall], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "BDH_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new BuilderHut(cf.user._buildingListCount[gv.orderInUserBuildingList.builderHut], 1, gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            //building._isActive = true;
            break;
        case "STO_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Storage(cf.user._buildingListCount[gv.orderInUserBuildingList.storage_1], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, gv.buildingSTR.storage_1);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "STO_2":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Storage(cf.user._buildingListCount[gv.orderInUserBuildingList.storage_2], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, gv.buildingSTR.storage_2);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "STO_3":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Storage(cf.user._buildingListCount[gv.orderInUserBuildingList.storage_3], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, gv.buildingSTR.storage_3);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "RES_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Resource(cf.user._buildingListCount[gv.orderInUserBuildingList.resource_1], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, gv.buildingSTR.resource_1);
            building._finishing_time = finishTime;
            building._lastHarvestTime = gv.jsonInfo["map"][str][index]["lastHarvestTime"];
            break;
        case "RES_2":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Resource(cf.user._buildingListCount[gv.orderInUserBuildingList.resource_2], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, gv.buildingSTR.resource_2);
            building._finishing_time = finishTime;
            building._lastHarvestTime = gv.jsonInfo["map"][str][index]["lastHarvestTime"];
            break;
        case "AMC_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building =  new ArmyCamp(cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "DEF_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building =  new Defence(cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive, "DEF_1");
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "BAR_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building =  new Barrack(cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "LAB_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building =  new Laboratory(cf.user._buildingListCount[gv.orderInUserBuildingList.lab], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            //building._isActive = (finishTime <= currentTime);
            break;
        case "CLC_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new ClanCastle(cf.user._buildingListCount[gv.orderInUserBuildingList.clanCastle], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            break;
        case "WAL_1":
            finishTime = gv.jsonInfo["map"][str][index]["finishBuildOrUpgradeTime"];
            isActive = finishTime <= currentTime;
            building = new Wall(cf.user._buildingListCount[gv.orderInUserBuildingList.wall], gv.jsonInfo["map"][str][index]["level"], gv.jsonInfo["map"][str][index]["X"], gv.jsonInfo["map"][str][index]["Y"], true, isActive);
            building._finishing_time = finishTime;
            break;
    }
    return building;
};

cf.secondsToLongTime = function(seconds)
{
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds/ 60);
    seconds  -= mnts*60;
    if (days == 0 && hrs == 0 && mnts == 0 && seconds == 0) return "0s";
    return (days != 0 ? (days.toString() + "d") : "" ) + (hrs != 0 ? (hrs.toString() + "h") : "") + (mnts != 0 ? (mnts.toString() + "m") : "") + ((seconds!=0) ? (seconds.toString() + "s") : "" );
};


//Clan Chat
cf.clanChat = {
    maxTroopDonate: 5,      // Donate nhiều hất 5 con troop
    troopDonateLength: 4,   // 4 loại troop Donate
    troopDonateLevel: 10,   // Cấp cao nhất của troop
};

/* thông tin sửa nhà clan lv 0->1*/
cf.clan =
{
    goldBuildClanCastle: 40000,

};
/* Thông tin popUp xây, nâng coin*/
cf.constructType =
{
    build: 0,
    upgrade: 1
}

/* thông tin cheat tài nguyên*/
cf.cheatType =
{
    full: 1,
    empty: 0
};
cf.resType =
{
    resource_1: 0,
    resource_2: 1,
    resource_3: 2,
    resource_4: 3
};
cf.resAddPerCheat =
{
    resource_4: 1000000,
}