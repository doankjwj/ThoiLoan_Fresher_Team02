/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var User = cc.Class.extend({
    _id: null,
    _name: "User Name",
    _maxCapacityGold: 0,
    _maxCapacityElixir: 0,
    _maxCapacityDarkElixir: 0,

    _currentCapacityGold: null,
    _currentCapacityElixir: null,
    _currentCapacityDarkElixir: null,
    _currentCapacityCoin: null,

    _builderNumber: null,

    _buildingList: [],
    _buildingListCount: [],

    _builderTotal: null,
    _builderFree: null,

    /*
    0: TownHall
    1: Gold Storage
    2: Elixir Storage
    3: Dark Elixir Storage
    4: Gold Resource
    5: Elixir Resource
    6: Dark Elixir Resource
    7: Laboratory
    8: Army Camp
    9: Barrack 1
    10: Barrack 2
    11: Builder Hut
    12: Obstacle
     */

    ctor: function(id, name)
    {
        //this._super();
        this._id = id;
        this._name = gv.jsonInfo["player"]["name"];
        this._builderFree = 5;
        this._builderTotal = 5;

        this._currentCapacityGold = gv.jsonInfo["player"]["gold"];
        this._currentCapacityElixir = gv.jsonInfo["player"]["elixir"];
        this._currentCapacityDarkElixir = gv.jsonInfo["player"]["darkElixir"];
        this._currentCapacityCoin = (gv.jsonInfo["player"]["coin"] == null) ? 0 : gv.jsonInfo["player"]["coin"];
        this.initBuildingList();
    },

    initBuildingList: function()
    {
        for (var i = 0; i < cf.MAX_BUILDING_TYPE; i++)
        {
            var arr = [];
            this._buildingList.push(arr);
            this._buildingListCount.push(0);
        }
    },

    logBuildingListCount: function(){
        for(var i = 0; i<cf.MAX_BUILDING_TYPE; i++) {
            cc.log(this._buildingListCount[i]);
        }
    },

    /* Update Storage Capacity from User Buildings (Town Hall + Storage) */
    updateMaxStorage: function()
    {
        this._maxCapacityGold = 0;
        this._maxCapacityElixir = 0;
        this._maxCapacityDarkElixir = 0;

        /* Add Resource from Town Hall */
        var townHallLevel = this._buildingList[gv.orderInUserBuildingList.townHall][0]._level;
        this._maxCapacityGold += gv.json.townHall[gv.buildingSTR.townHall][townHallLevel][gv.capacity.gold];
        this._maxCapacityElixir += gv.json.townHall[gv.buildingSTR.townHall][townHallLevel][gv.capacity.elixir];
        this._maxCapacityDarkElixir += gv.json.townHall[gv.buildingSTR.townHall][townHallLevel][gv.capacity.darkElixir];

        /* Add Resource from Gold Storage */
        var storage = null;
        for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_1]; i++)
        {
            storage = this._buildingList[gv.orderInUserBuildingList.storage_1][i];
            this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][storage._level][gv.capacity.capacity];
        }

        /* Add Resource from Elixir Storage */
        for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_2]; i++)
        {
            storage = this._buildingList[gv.orderInUserBuildingList.storage_2][i];
            this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][storage._level][gv.capacity.capacity];
        }

        /* Add Resource from Dark Elixir Storage */
        for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_3]; i++)
        {
            storage = this._buildingList[gv.orderInUserBuildingList.storage_3][i];
            this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][storage._level][gv.capacity.capacity];
        }

        //cc.log(this._maxCapacityGold);
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
    },

    /* Update Storage Capacity from Single Building */
    updateMaxStorageSingle: function(id)
    {
        var typeInBuildingList = Math.floor(id /100) - 1;
        var orderInType = id % 100;
        var building = this._buildingList[typeInBuildingList][orderInType];

        switch (typeInBuildingList)
        {
            case gv.orderInUserBuildingList.townHall:
                this._maxCapacityGold += gv.json.townHall[gv.buildingSTR.townHall][building._level][gv.capacity.gold] - gv.json.townHall[gv.buildingSTR.townHall][building._level - 1][gv.capacity.gold] ;
                this._maxCapacityElixir += gv.json.townHall[gv.buildingSTR.townHall][building._level][gv.capacity.elixir] - gv.json.townHall[gv.buildingSTR.townHall][building._level - 1][gv.capacity.elixir];
                this._maxCapacityDarkElixir += gv.json.townHall[gv.buildingSTR.townHall][building._level][gv.capacity.darkElixir] - gv.json.townHall[gv.buildingSTR.townHall][building._level - 1][gv.capacity.darkElixir];
                break;
            case gv.orderInUserBuildingList.storage_1:
                if (building._level == 1)
                    this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][1][gv.capacity.capacity];
                else
                    this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][building._level][gv.capacity.capacity] - gv.json.storage_1[gv.buildingSTR.storage_1][building._level - 1][gv.capacity.capacity] ;
                break;
            case gv.orderInUserBuildingList.storage_2:
                if (building._level == 1)
                    this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][1][gv.capacity.capacity];
                else
                    this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][building._level][gv.capacity.capacity] - gv.json.storage_2[gv.buildingSTR.storage_2][building._level - 1][gv.capacity.capacity] ;
                break;
            case gv.orderInUserBuildingList.storage_3:
                if (building._level == 1)
                    this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][1][gv.capacity.capacity];
                else
                    this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][building._level][gv.capacity.capacity] - gv.json.storage_3[gv.buildingSTR.storage_3][building._level - 1][gv.capacity.capacity] ;
                break;
        };

        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
    },

    /* Update Builder from User Buildings (All building) */
    updateBuilder: function()
    {
        var builderBusy = 0;

        this._builderTotal = this._buildingListCount[gv.orderInUserBuildingList.builderHut];
        for(var i = 0; i < gv.buildingTypeCount; i++)
        {
            for(var j = 0; j < this._buildingListCount[i]; j++)
            {
                if (this._buildingList[i][j]._is_active == false) builderBusy ++;
            }
        }

        this._builderFree = this._builderTotal - builderBusy;

        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_BUILDER_BAR).updateStatus();
    },

    /* Update Builder from Single Building */
    updateSingleBuilder: function()
    {
        this._builderTotal = this._buildingListCount[gv.orderInUserBuildingList.builderHut];

        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_BUILDER_BAR).updateStatus();
    }
});