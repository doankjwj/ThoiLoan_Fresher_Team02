/**
 * Created by CPU02326_Local on 7/31/2018.
 */
var fn = fn || {};
/* Đọc Json Config */
fn.loadJson = function ()
{
    cc.loader.loadJson(res.armyCampJson, function (err, data)
    {
        gv.json.armyCamp = data;
    });
    cc.loader.loadJson(res.barrackJson, function (err, data)
    {
        gv.json.barrack = data;
    });
    cc.loader.loadJson(res.builderHutJson, function (err, data)
    {
        gv.json.builderHut = data;
    });
    cc.loader.loadJson(res.initGameJson, function (err, data)
    {
        gv.json.initGame = data;
    });
    cc.loader.loadJson(res.laboratoryJson, function (err, data)
    {
        gv.json.laboratory = data;
    });
    cc.loader.loadJson(res.resourceJson, function (err, data)
    {
        gv.json.resource = data;
    });
    cc.loader.loadJson(res.storageJson, function (err, data)
    {
        gv.json.storage = data;
    });
    cc.loader.loadJson(res.townHallJson, function (err, data)
    {
        gv.json.townHall = data;
    });
    cc.loader.loadJson(res.troopJson, function (err, data)
    {
        gv.json.troop = data;
    });
    cc.loader.loadJson(res.troopBaseJson, function (err, data)
    {
        gv.json.troopBase = data;
    });
    cc.loader.loadJson(res.shopItemList, function (error, data)
    {
        gv.json.shopItemList = data;
    });
    cc.loader.loadJson(res.defenceJson, function (err, data)
    {
        gv.json.defence = data;
    });
    cc.loader.loadJson(res.clanCastleJson, function(error, data){
        gv.json.clanCastle = data;
    });
    cc.loader.loadJson(res.obstacleJson, function (error, data)
    {
        gv.json.obstacle = data;
    });
    cc.loader.loadJson(res.wallJson, function (error, data)
    {
        gv.json.wall = data;
    });
    gv.json.troopAnimation = {};

    for (var i = 1; i < 5; i += 1)
        for (var j = 1; j < 5; j += 1)
            try
            {
                cc.loader.loadJson(res.folder_troop_animation + "ARM_" + i + "_" + j + "/ARM_" + i + "_" + j + "_info.json",
                                   function (error, data)
                                   {
                                       gv.json.troopAnimation["ARM_" + i + "_" + j] = data;
                                   });
            }
            catch(e)
            {
                cc.loader.loadJson(res.folder_troop_animation + "ARM_" + i + "_" + 1 + "/ARM_" + i + "_" + 1 + "_info.json",
                                   function (error, data)
                                   {
                                       gv.json.troopAnimation["ARM_" + i + "_" + j] = data;
                                   });
            };
    cc.loader.loadJson(res.folder_builder_animation + "info.json", function (error, data)
    {
        gv.json.builder = data;
    })
};
/* Load file troop plist*/
fn.loadPlist = function (troopNameWithLevel)
{
    cc.spriteFrameCache.addSpriteFrames(res.plist[troopNameWithLevel]);
    gv.plist[troopNameWithLevel] = true;
};
fn.loadBuilderPlist = function ()
{
    cc.spriteFrameCache.addSpriteFrames("res/Art/builder_working/builder.plist");
    gv.plist.builder = true;
};
///* Load file plist*/
//fn.loadPlist = function (troopNameWithLevel)
//{
//    cc.spriteFrameCache.addSpriteFrames("res/Art/Troops/" + troopNameWithLevel + "/" + troopNameWithLevel + ".plist");
//    gv.plist[troopNameWithLevel] = true;
//};

/* Load plist toàn bộ*/
fn.initPlist = function()
{
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "bang_hoi.plist", plistFolder + "bang_hoi.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_army_camp.plist", plistFolder + "building_army_camp.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_barrack.plist", plistFolder + "building_barrack.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_builder_hut.plist", plistFolder + "building_builder_hut.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_clan_castle.plist", plistFolder + "building_clan_castle.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_dark_elixir_collector.plist", plistFolder + "building_dark_elixir_collector.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_dark_elixir_storage.plist", plistFolder + "building_dark_elixir_storage.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_defence_1.plist", plistFolder + "building_defence_1.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_defence_base.plist", plistFolder + "building_defence_base.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_elixir_collector.plist", plistFolder + "building_elixir_collector.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_elixir_storage.plist", plistFolder + "building_elixir_storage.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_gold_mine.plist", plistFolder + "building_gold_mine.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_gold_storage.plist", plistFolder + "building_gold_storage.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_laboratory.plist", plistFolder + "building_laboratory.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_obstacle.plist", plistFolder + "building_obstacle.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_tow_hall.plist", plistFolder + "building_tow_hall.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "building_wall.plist", plistFolder + "building_wall.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "effects_first_image.plist", plistFolder + "effects_first_image.png");
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_action_building_icon.plist", plistFolder + "gui_action_building_icon.png");
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_chat.plist", plistFolder + "gui_chat.png");
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_collect_res.plist", plistFolder + "gui_collect_res.png");
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_icons.plist", plistFolder + "gui_icons.png");
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_main_gui.plist", plistFolder + "gui_main_gui.png");
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_research_troop);
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_shop_gui.plist", plistFolder + "gui_shop_gui.png");
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_train_troop_gui);
    //cc.spriteFrameCache.addSpriteFrames(plistFolder + "gui_upgrade_building_gui.plist", plistFolder + "gui_upgrade_building_gui.png");
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_upgrade_troop_icon_1_3);
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_upgrade_troop_icon_4_6);
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_upgrade_troop_icon_7_9);
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_upgrade_troop_icon_10_16_17);
    //cc.spriteFrameCache.addSpriteFrames(res.plist.gui_upgrade_troop_small_icon);
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "log_in_gui.plist", plistFolder + "log_in_gui.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "map_corner_1.plist", plistFolder + "map_corner_1.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "map_corner_2.plist", plistFolder + "map_corner_2.png");
    cc.spriteFrameCache.addSpriteFrames(plistFolder + "map_obj_bg.plist", plistFolder + "map_obj_bg.png");
}

/* Init Localized*/
fn.initLocalized= function()
{
    gv.buildingDescription.townHall_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_townHall_1"));
    gv.buildingDescription.armyCamp_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_armyCamp_1"));
    gv.buildingDescription.barrack_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_barrack_1"));
    gv.buildingDescription.builderHut = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_builderHut"));
    gv.buildingDescription.defence_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_defence_1"));
    gv.buildingDescription.resource_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_resource_1"));
    gv.buildingDescription.resource_2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_resource_2"));
    gv.buildingDescription.storage_1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_storage_1"));
    gv.buildingDescription.storage_2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_storage_2"));
    gv.buildingDescription.storage_3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_storage_3"));
    gv.buildingDescription.laboratory = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_laboratory"));
    gv.buildingDescription.clanCastle = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_clanCastle"));
    gv.buildingDescription.wall = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("description_wall"));

    gv.troopInfo.favoriteTarget =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_favoriteTarget")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_favoriteTarget")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_favoriteTarget")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_favoriteTarget")),
        ];
    gv.troopInfo.attackType =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_attackType")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_attackType")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_attackType")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_attackType")),
        ];
    gv.troopInfo.attackArea =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_attackArea")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_attackArea")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_attackArea")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_attackArea")),
        ];
    gv.troopInfo.moveSpeed =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_moveSpeed")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_moveSpeed")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_moveSpeed")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_moveSpeed")),
        ];
    gv.troopInfo.timeTraining =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_timeTraining")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_timeTraining")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_timeTraining")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_timeTraining")),
        ];
    gv.troopInfo.housingSpace =
        [
            troop0 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_0_housingSpace")),
            troop1 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_1_housingSpace")),
            troop2 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_2_housingSpace")),
            troop3 = fn.singleToMultiLineStr(fr.Localization.getInstance().getText("troopInfo_3_housingSpace")),
        ];

},
/* Ngắt xuống dòng cho String*/
fn.singleToMultiLineStr = function(str)
{
    return str.replace("\\n", "\n");
}


/* Map */
fn.getRowColFromPos = function (pos) // Lấy ra Tọa độ dòng, cột của building từ pos
{
    var loc = cc.p(0, 0);
    var xx = pos.x - cf.tileLocation[40][40].x * cf.BIG_MAP_SCALE;
    var yy = pos.y - cf.tileLocation[40][40].y * cf.BIG_MAP_SCALE + 0.5 * cf.tileSize.height * cf.BIG_MAP_SCALE;
    var TILE_HEIGHT = cf.tileSize.height * cf.BIG_MAP_SCALE;
    var TILE_WIDTH = cf.tileSize.width * cf.BIG_MAP_SCALE;
    loc.x = parseInt(((yy / (TILE_HEIGHT / 2) - xx / (TILE_WIDTH / 2)) / 2).toFixed(0)) + 1;
    loc.y = parseInt(((xx / (TILE_WIDTH / 2) + yy / (TILE_HEIGHT / 2)) / 2).toFixed(0)) + 1;
    if (!fn.insideMap(loc.x, loc.y))
        return (cc.p(gv.buildingMove.currentRow, gv.buildingMove.currentCol));
    return (cc.p(41 - loc.x, 41 - loc.y));
    /* Boundary */
    loc.x = (loc.x > 40) ? 40 : loc.x;
    loc.x = (loc.x < 1) ? 1 : loc.x;
    loc.y = (loc.y > 40) ? 40 : loc.y;
    loc.y = (loc.y < 1) ? 1 : loc.y;
    return loc;
};                              // BuildingNode.js
fn.pointInsidePolygon = function (point, vs) //Kiểm tra 1 điểm nằm trong đa giác
{
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    var x = point[0], y = point[1];
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++)
    {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        var intersect = ((yi > y) != (yj > y))
                        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
};                              // BuildingNode.js
fn.distance2Points = function(p0, p1)
{
    return Math.sqrt(((p0.x - p1.x)*(p0.x - p1.x) + (p0.y - p1.y)*(p0.y - p1.y)));
};
fn.boundary = function(n0, n1, x)
{
    if (n0 > n1) {
        n0 = n1 + n0;
        n1 = n0 - n1;
        n0 = n0 - n1;
    }
    if (x < n0) return n0;
    if (x > n1) return n1;
    return x;
}
fn.getItemOccurenceInArray = function (arr, item)
{
    var res = 0;
    for (var i = 0; i < arr.length; i++)
        if (arr[i] === item) res++;
    return res;
};
fn.insideMap = function (row, col)   // Kiểm tra Coor nằm trong giới hạn (1-40/ 1-40)
{
    return (0 < row && row < 41 && 0 < col && col < 41);
};
/* Get Anmiation from STR*/
fn.getAnimation = function (str, n1, n2)
{
    var arr_effect = [];
    for (var i = n1; i <= n2; i++)
    {
        var frame = cc.spriteFrameCache.getSpriteFrame(str + "(" + i + ").png");
        arr_effect.push(frame)
    }
    return cc.Animate(new cc.Animation(arr_effect, cf.time_refresh))
};                              // Barack + ArmyCamp + ..
/* Shop */
fn.getPrice = function (str, level)
{
    var price = {
        gold: 0,
        elixir: 0,
        darkElixir: 0,
        coin: 0
    };
    switch (str)
    {
        case gv.buildingSTR.townHall:
            price.gold = gv.json.townHall[str][level]["gold"];
            price.elixir = 0;
            price.darkElixir = 0;
            price.coin = 0;
            break;
        case gv.buildingSTR.builderHut:
            price.gold = 0;
            price.elixir = 0;
            price.darkElixir = 0;
            price.coin = gv.json.builderHut[str][level]["coin"];
            break;
        case gv.buildingSTR.armyCamp_1:
            price.gold = 0;
            price.elixir = gv.json.armyCamp[str][level]["elixir"];
            price.darkElixir = gv.json.armyCamp[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.barrack_1:
            price.gold = 0;
            price.elixir = gv.json.barrack[str][level]["elixir"];
            price.darkElixir = gv.json.barrack[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.resource_1:
            price.gold = gv.json.resource[str][level]["gold"];
            price.elixir = gv.json.resource[str][level]["elixir"];
            price.darkElixir = gv.json.resource[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.resource_2:
            price.gold = gv.json.resource[str][level]["gold"];
            price.elixir = gv.json.resource[str][level]["elixir"];
            price.darkElixir = gv.json.resource[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.storage_1:
            price.gold = gv.json.storage[str][level]["gold"];
            price.elixir = gv.json.storage[str][level]["elixir"];
            price.darkElixir = gv.json.storage[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.storage_2:
            price.gold = gv.json.storage[str][level]["gold"];
            price.elixir = gv.json.storage[str][level]["elixir"];
            price.darkElixir = gv.json.storage[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.storage_3:
            price.gold = gv.json.storage[str][level]["gold"];
            price.elixir = gv.json.storage[str][level]["elixir"];
            price.darkElixir = gv.json.storage[str][level]["darkElixir"];
            price.coin = 0;
            break;
        case gv.buildingSTR.defence_1:
            price.gold = gv.json.defence[str][level]["gold"];
            price.elixir = 0;
            price.darkElixir = 0;
            price.coin = 0;
            break;
        //case gv.buildingSTR.obstacle:
        //    hp = gv.json.obstacle[str][level]["hitpoints"];
        //    hpMax = gv.json.obstacle[str][gv.buildingMaxLevel.obstacle]["hitpoints"];
        //    time = gv.json.obstacle[str][level]["buildTime"];
        //    break;
        default:
            break;
    }
    return price;
};                              // MainLayer
fn.convertSecondToHour = function (sec)
{
    return sec / 60 / 60;
};
fn.getTroopSprite = function (id)
{
    switch (id)
    {
        case 1:
            return troopIcon.ARM_1;
        case 2:
            return troopIcon.ARM_2;
        case 3:
            return troopIcon.ARM_3;
        case 4:
            return troopIcon.ARM_4;
        case 5:
            return troopIcon.ARM_5;
        case 6:
            return troopIcon.ARM_6;
        case 7:
            return troopIcon.ARM_7;
        case 8:
            return troopIcon.ARM_8;
        case 9:
            return troopIcon.ARM_9;
        case 10:
            return troopIcon.ARM_10;
        case 16:
            return troopIcon.ARM_16;
        case 17:
            return troopIcon.ARM_17;
        default:
            break;
    }
};
fn.getTroopSmallSprite = function (id)
{
    switch (id)
    {
        case 1:
            return trainingQueueGUI.ARM_1;
        case 2:
            return trainingQueueGUI.ARM_2;
        case 3:
            return trainingQueueGUI.ARM_3;
        case 4:
            return trainingQueueGUI.ARM_4;
        case 5:
            return trainingQueueGUI.ARM_5;
        case 6:
            return trainingQueueGUI.ARM_6;
        case 7:
            return trainingQueueGUI.ARM_7;
        case 8:
            return trainingQueueGUI.ARM_8;
        case 9:
            return trainingQueueGUI.ARM_9;
        case 10:
            return trainingQueueGUI.ARM_10;
        case 16:
            return trainingQueueGUI.ARM_16;
        case 17:
            return trainingQueueGUI.ARM_17;
        default:
            break;
    }
};
fn.getTroopString = function (id)
{
    switch (id)
    {
        case 1:
            return gv.troopStr.ARM_1;
        case 2:
            return gv.troopStr.ARM_2;
        case 3:
            return gv.troopStr.ARM_3;
        case 4:
            return gv.troopStr.ARM_4;
        case 5:
            return gv.troopStr.ARM_5;
        case 6:
            return gv.troopStr.ARM_6;
        case 7:
            return gv.troopStr.ARM_7;
        case 8:
            return gv.troopStr.ARM_8;
        case 9:
            return gv.troopStr.ARM_9;
        case 10:
            return gv.troopStr.ARM_10;
        case 16:
            return gv.troopStr.ARM_16;
        case 17:
            return gv.troopStr.ARM_17;
        default:
            break;
    }
};
fn.getArmyCamp = function () {

    var firstArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][0];
    var maxSpacePercent = firstArmyCamp.getAvailableSpace() * 100 / firstArmyCamp.getMaxSpace();
    var output = 0;
    for (var i = 1; i < cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1]; i += 1) {
        var thisArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
        if (thisArmyCamp.getMaxSpace() > 0) {
            var thisArmyCampAvailableSpacePercent = thisArmyCamp.getAvailableSpace() * 100 / thisArmyCamp.getMaxSpace();
            if (thisArmyCampAvailableSpacePercent > maxSpacePercent) {
                maxSpacePercent = thisArmyCampAvailableSpacePercent;
                output = i;
            }
        }
    }
    return cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][output];
};

fn.convertSecondToHour = function (sec)
{
    return sec / 60 / 60;
};

/* Replace Sprite Image */
fn.replaceSpriteImage= function(sprite, url){
    var textture = cc.textureCache.addImage(url);
    sprite.setTexture(textture);
};
/* Replace Sprite Texture*/
fn.replaceSpriteWithSpriteTexture= function(sprite, url){
    if (url[0] == "#");
    url = url.substr(1, url.length-1);
    sprite.setSpriteFrame(url);
};
/* Replace button Image*/
fn.replaceButtonImage= function(button, url){
    button.loadTextures(url, url);
};
/* Replace Button Image Sprite*/
fn.replaceButtonImageTexture= function(button, url){
    if (url[0] == "#");
    url = url.substr(1, url.length-1);
    button.loadTextures(url, url, url, ccui.Widget.PLIST_TEXTURE);
};
/* Get sprite Frame*/
fn.getSpriteFrame= function(url)
{
    return (cc.spriteFrameCache.getSpriteFrame(url));
};

/* Tính tổng 1 mảng */
fn.sumArr = function(arr, length)
{
    var sum=0;
    for (var i=0; i<length; i++)
        sum += arr[i];
    return sum;
}

/* Lấy ra công trình đang được chọn*/
fn.getCurrentBuilding = function()
{
    var id = gv.building_selected;
    if (id == 0) return null;
    var type  = Math.floor(id/100) - 1;
    var order = id%100;
    return cf.user._buildingList[type][order];
};
/*Lấy ra công trình từ danh sách công trình*/
fn.getUserBuilding = function(buildingType, buildingOrderInType)
{
    return cf.user._buildingList[buildingType][buildingOrderInType];
},

/* Common Label*/
fn.commonLabel = function(str, fontName, sizeX, sizeY, color)
{
    var label = cc.LabelBMFont(str, fontName);
    label.setScaleX(sizeX);
    label.setScaleY(sizeY);
    if (!color) label.setColor(cc.color(255, 255, 255, 255));
        else
    label.setColor(color);
    return label;
};

/*Phần trăm của sức chứa hiện tại so với sức chứa max*/
fn.percentage = function(current, max)
{
    if (current/max < 0.25) return 0;
    if (current/max < 0.5)  return 1;
    if (current/max < 0.75) return 2;
    return 3;
};

/* LẤy ra housing space của đơn vị lính*/
fn.getTroopHousingSpace = function(troopType)           // từ 1
{
    return gv.json.troopBase["ARM_" + troopType]["housingSpace"];
};

/* Kiểm tra tài nguyên cho vào có chứa đủ*/
fn.checkAddResourceEnough = function(resArr)
{
    if (resArr[0] > cf.user.getAvaiableCapacity(cf.resType.resource_1)) return false;
    if (resArr[1] > cf.user.getAvaiableCapacity(cf.resType.resource_2)) return false;
    if (resArr[2] > cf.user.getAvaiableCapacity(cf.resType.resource_3)) return false;
    return true;
};

/* Kiểm tra công trình có phải nhà tài nguyên*/
fn.buildingIsResource = function(building)
{
    if (building._orderInUserBuildingList < gv.orderInUserBuildingList.resource_1 || building._orderInUserBuildingList > gv.orderInUserBuildingList.resource_3) return false;
    return true;
};

/* Cập nhật lại timeout popup nút thu hoạch màu đỏ cho nhà khai thác*/
fn.onUpdateTimeOutCollector = function(resType)
{
    switch (resType)
    {
        case cf.resType.resource_1:
            for (var i=0; i<cf.user._buildingListCount[gv.orderInUserBuildingList.resource_1]; i++)
            {
                var buildingRes1 = fn.getUserBuilding(gv.orderInUserBuildingList.resource_1, i);
                if (buildingRes1._isActive)
                    buildingRes1.onManualSetTimeOutPopUpRedButton();
            };
            break;
        case cf.resType.resource_2:
            for (var i=0; i<cf.user._buildingListCount[gv.orderInUserBuildingList.resource_2]; i++)
            {
                var buildingRes2 = fn.getUserBuilding(gv.orderInUserBuildingList.resource_2, i);
                if (buildingRes2._isActive)
                    buildingRes2.onManualSetTimeOutPopUpRedButton();
            };
            break;
        case cf.resType.resource_3:
            for (var i=0; i<cf.user._buildingListCount[gv.orderInUserBuildingList.resource_3]; i++)
            {
                var buildingRes3 = fn.getUserBuilding(gv.orderInUserBuildingList.resource_3, i);
                if (buildingRes3._isActive)
                    buildingRes3.onManualSetTimeOutPopUpRedButton();
            };
            break;
    }
};

/* Kiểm tra nhà có phải là nguyên và nút thu hoạch đang sáng*/
fn.checkIsResourceAndCollectable = function(building)
{
    if (!fn.buildingIsResource(building)) return false;
    if (!building._isActive) return false;
    if (!building._btnHarvest.visible) return false;
    return true;
}