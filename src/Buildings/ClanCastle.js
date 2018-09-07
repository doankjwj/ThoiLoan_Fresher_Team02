/**
 * Created by CPU02326_Local on 8/20/2018.
 */
var ClanCastle = BuildingNode.extend({
    _id: null,
    _level: null,
    _row: null,
    _col: null,
    _existed: null,
    isActive: null,

    _troopAmount: null,

    _currentHousingSpace: null,
    _troopReceive: [],


    /*Cờ và tên Clan*/
    _iconFlag: null,
    _labelName: null,

    ctor: function(id, level, row, col, existed, isActive){
        this._buildingSTR = gv.buildingSTR.clanCastle;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.clanCastle;
        this._size = gv.json.clanCastle[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.clanCastle;
        this._maxLevel = gv.buildingMaxLevel.clanCastle;
        this._description = gv.buildingDescription.clanCastle;
        this._name = gv.buildingName.clanCastle;
        this._id = id;
        this._level = level;
        this._row = row;
        this._col = col;
        this._existed = existed;
        this._isActive = isActive;
        this._troopAmount = [0, 0, 0, 0];

        this._super(id, level, row, col, existed, isActive);

        this.resetTroop();
        this.addCenterBuilding();
        this.loadTroopAmountFromJson();
    },
    loadTroopAmountFromJson: function()
    {
        var jsonItem = gv.jsonInfo["map"]["CLC_1"][0]["troopArr"];
        for (var i=0; i < Object.keys(jsonItem).length; i++)
        {
            var obj = gv.jsonInfo["map"]["CLC_1"][0]["troopArr"][i];
            this._troopReceive[obj["troopOrder"]][obj["troopLevel"]] = obj["troopQuantity"];
        }
    },
    resetTroop: function()
    {
        for (var i =0; i<cf.clanChat.troopDonateLength; i++)
        {
            this._troopReceive[i] = ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
    },
    getCurrentHousingSpace: function()
    {
        var housingSpace = 0;
        for (var i=0; i<cf.clanChat.troopDonateLength; i++)
        {
            var troopTypeCount = 0;
            for (var j=0; j<cf.clanChat.troopDonateLevel; j++)
                troopTypeCount += this._troopReceive[i][j];
            housingSpace += troopTypeCount * gv.json.troopBase["ARM_" + (i+1)]["housingSpace"];
        }
        return housingSpace;
    },
    /* Số quân với level phân biệt*/
    getCurrentTroopTypeVsLevel: function()
    {
        var troopDif = 0;
        for (var i=0; i < cf.clanChat.troopDonateLength; i++)
            for (var j=0; j < cf.clanChat.troopDonateLevel; j++)
                if (this._troopReceive[i][j] != 0) troopDif ++;
        return troopDif;
    },
    addTroop: function()
    {
        var userNameReceive = gv.clanChat.jsonDonate["userName"];
        if (userNameReceive != cf.user._name) return;

        var troopOrder = gv.clanChat.jsonDonate["troopOrder"];
        var troopLevel = gv.clanChat.jsonDonate["troopLevel"];
        this._troopReceive[troopOrder][troopLevel]++;
        this.logTroop();
    },
    logTroop: function()
    {
        for (var i=0; i<cf.clanChat.troopDonateLength; i++)
        {
            var s = "";
            for (var j=0; j<=cf.clanChat.troopDonateLevel; j++)
                s += this._troopReceive[i][j] + ", ";
            s += this._troopReceive[i][cf.clanChat.troopDonateLevel-1];
            cc.log(s);
        }
    },
    isEnoughTroop: function()
    {
        return (this.getCurrentHousingSpace() >= gv.json.clanCastle["CLC_1"][this._level]["troopCapacity"]);
    },
    updateAnim: function()
    {

    },

    updateNameAndFlag: function(boo)
    {
        cc.log("Thay doi co va nha clan ++++");
        var clanFlag = gv.clanChat.jsonLoad["clanFlag"] + 1;
        if (!this._iconFlag)
        {
            this._iconFlag = cc.Sprite("res/Art/Bang hoi/icon bieu tuong/" + (clanFlag) + ".png");
            this._iconFlag.scale = 1.5;
            this._iconFlag.setPosition(0, 40);
            this.addChild(this._iconFlag, 20);
        };
        var clanName = gv.clanChat.jsonLoad["clanName"];
        if (!this._labelName)
        {
            this._labelName = cc.LabelBMFont(clanName, font.soji20);
            this._labelName.scale = 1.5;
            this._labelName.setPosition(0, 100);
            this.addChild(this._labelName, 20);
        };

        this._iconFlag.visible = boo;
        this._labelName.visible = boo;

        fn.replaceSpriteImage(this._iconFlag, "res/Art/Bang hoi/icon bieu tuong/" + (clanFlag) + ".png")
        this._labelName.setString(clanName);
        cc.log("Thay doi co va nha clan 2222");
    }
})