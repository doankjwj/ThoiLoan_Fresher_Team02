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
    gv.json.troopAnimation = {};

    for (var i = 1; i < 5; i += 1)
        for (var j = 1; j < 4; j += 1)
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
            }
};
fn.loadPlist = function (troopNameWithLevel)
{
    cc.spriteFrameCache.addSpriteFrames("res/Art/Troops/" + troopNameWithLevel + "/" + troopNameWithLevel + ".plist");
    gv.plist[troopNameWithLevel] = true;
};
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
    cc.log(str + " " + level + " +++++");
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
fn.convertSecondToHour = function (sec)
{
    return sec / 60 / 60;
};

/* Replace Sprite Image */
fn.replaceSpriteImage= function(sprite, url){
    var textture = cc.textureCache.addImage(url);
    sprite.setTexture(textture);
}

/* Tính tổng 1 mảng */
fn.sumArr = function(arr, length)
{
    var sum=0;
    for (var i=0; i<length; i++)
        sum += arr[i];
    return sum;
}

/*Từ Id công trình tính ra loại công trình*/
fn.getBuildingOrderById = function(id)
{
    return (Math.floor(id/100) - 1);
}
