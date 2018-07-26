var cf = cf || {};


cf.BIG_MAP_SCALE = 0.5;

cf.SCALE = 1;
cf.bgSCALE = cf.SCALE*2;
cf.squareSize = 50*cf.SCALE;
cf.buildingScale = cf.SCALE;

cf.offSetGui = 25;

cf.tileSize = {
    height: 57*cf.SCALE,
    width: 76*cf.SCALE
};

cf.time_refresh = 0.1;
cf.isDeciding = false;

/* Move Building */
cf.building_selected = 0;
cf.move_able = false;
cf.moved = false;
cf.r_old = null;
        cf.c_old = null;
cf.current_r = null;
cf.current_c = null;

/* Map Infor */
cf.tileLocation = [];
cf.map_array = [];

/* Code Button Building */
cf.CODE_BUILDING_INFO = 324324;
cf.CODE_BUILDING_UPGRADE = 2314234;

cf.user = null;

cf.isMapMoving = false;

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

cf.ShopItemList = null;
cf.jsonArmyCamp = null;
cf.jsonBarrack = null;
cf.jsonBuilderHut = null;
cf.jsonTownHall = null;
cf.jsonInitGame = null;
cf.jsonLaboratory = null;
cf.jsonResource = null;
cf.jsonStorage = null;
cf.jsonTroop = null;
cf.jsonTroopBase = null;;
cf.ShopItemList = null;
cf.defaultLevel = 1;

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


cf.MAX_BUILDING_TYPE = 20;
cf.MAX_BUILDING_LEVEL = 20;

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
        case "TOW": return cf.jsonTownHall;
        case "LAB": return cf.jsonLaboratory;
        case "BDH":
            return cf.jsonBuilderHut;
        case "RES":
            return cf.jsonResource;
        case "STO":
            return cf.jsonStorage;
        case "AMC":
            return cf.jsonArmyCamp;
        case "DEF":
            return null;
        case "BAR":
            return cf.jsonBarrack;
    }

};

cf.tagToItem = function(tag, lvl, posX, posY, existed){
    switch(tag){
        case 900:
            return new Barrack(20, lvl, posX, posY, existed);
        case 800:
            return new ArmyCamp(21, lvl, posX, posY, existed);
        case 400:
            return new Resource(22, lvl, posX, posY, existed, 1);
        case 500:
            return new Resource(23, lvl, posX, posY, existed, 2);
        case 100:
            return new Storage(24, lvl, posX, posY, existed, 1);
        case 200:
            return new Storage(25, lvl, posX, posY, existed, 2);
        case 1100:
            return new BuilderHut(26, lvl, posX, posY, existed);

    }
};

cf.stringToItemInit = function(str) {
    cc.log(str);
    switch(str)
    {
        case "TOW_1":
            return new TownHall(20, 1, cf.jsonInitGame["map"][str]["posX"], cf.jsonInitGame["map"][str]["posY"], true);
        case "BDH_1":
            return new BuilderHut(21, 1, cf.jsonInitGame["map"][str]["posX"], cf.jsonInitGame["map"][str]["posY"], true);
        case "RES_1":
            return new Resource(22, 1, cf.jsonInitGame["map"][str]["posX"], cf.jsonInitGame["map"][str]["posY"], true, 1);
        case "AMC_1":
            return new TownHall(24, 1, cf.jsonInitGame["map"][str]["posX"], cf.jsonInitGame["map"][str]["posY"], true);
        default: return null;
    }


};
