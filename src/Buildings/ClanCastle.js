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
            this._troopReceive[obj["troopOrder"]][obj["troopType"]] = obj["quantity"];
        }
    },
    resetTroop: function()
    {
        for (var i =0; i<cf.clanChat.troopDonateLength; i++)
        {
            this._troopReceive[i] = ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
            for (var j=0; j<cf.clanChat.troopDonateLevel-1; j++)
                s += this._troopReceive[i][j] + ", ";
            s += this._troopReceive[i][cf.clanChat.troopDonateLevel-1];
            cc.log(s);
        }
    },
    isEnoughTroop: function()
    {
        cc.log(this.getCurrentHousingSpace() + " ++++");
        return (this.getCurrentHousingSpace() >= gv.json.clanCastle["CLC_1"][this._level]["troopCapacity"]);
    },
    updateAnim: function()
    {

    }
})