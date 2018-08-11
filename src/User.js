/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var User = cc.Class.extend({
    _id: null,
    _name: "UserName",
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

    _listTroopLevel: [],

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
        this._currentCapacityCoin = (gv.jsonInfo["player"]["coin"] === null) ? 0 : gv.jsonInfo["player"]["coin"];
        this.initBuildingList();
        this.initTroopLevelList();
    },

    initBuildingList: function()
    {
        for (var i = 0; i < cf.MAX_BUILDING_TYPE; i++)
        {
            var arr = [];
            this._buildingList[i] = arr;
            this._buildingListCount[i] = 0;
        }
    },

    initTroopLevelList: function()
    {
        for (var i = 0; i < gv.jsonInfo["player"]["troopLevel"].length; i++)
        {
            this._listTroopLevel[i] = gv.jsonInfo["player"]["troopLevel"][i];
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

        this._maxCapacityGold = Math.max(this._maxCapacityGold, this._currentCapacityGold);
        this._maxCapacityElixir = Math.max(this._maxCapacityElixir, this._currentCapacityElixir);
        this._maxCapacityDarkElixir = Math.max(this._maxCapacityDarkElixir, this._currentCapacityDarkElixir);


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
                if (building._level === 1)
                    this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][1][gv.capacity.capacity];
                else
                    this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][building._level][gv.capacity.capacity] - gv.json.storage[gv.buildingSTR.storage_1][building._level - 1][gv.capacity.capacity] ;
                break;
            case gv.orderInUserBuildingList.storage_2:
                if (building._level === 1)
                    this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][1][gv.capacity.capacity];
                else
                    this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][building._level][gv.capacity.capacity] - gv.json.storage[gv.buildingSTR.storage_2][building._level - 1][gv.capacity.capacity] ;
                break;
            case gv.orderInUserBuildingList.storage_3:
                if (building._level === 1)
                    this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][1][gv.capacity.capacity];
                else
                    this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][building._level][gv.capacity.capacity] - gv.json.storage[gv.buildingSTR.storage_3][building._level - 1][gv.capacity.capacity] ;
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
                if (this._buildingList[i][j]._is_active === false)
                {
                    builderBusy ++;
                }
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
    },

    /* Phân phối tài nguyên cho các nhà chứa, quantity <= Max capacity*/
    distributeResource: function(resType_1, resType_2, resType_3)
    {
        if (resType_1)
            this.distributeResourceType(gv.buildingSTR.resource_1);
        if (resType_2)
            this.distributeResourceType(gv.buildingSTR.resource_2);
        if (resType_3)
            this.distributeResourceType(gv.buildingSTR.resource_3);

        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
        fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
    },
    distributeResourceType: function(resType)
    {
        // Đưa resource hiện tại vào nhà chứa theo thứ tự: TownHall -> Storage
        var resCapacity = 0;
        var building = null;
        switch (resType)
        {
            case gv.buildingSTR.resource_1:
                resCapacity = this._currentCapacityGold;
                building = this._buildingList[gv.orderInUserBuildingList.townHall][0];
                building._currentCapacityGold = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacityGold"]);
                resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacityGold"];
                for (var i = 0; i < this._buildingList[gv.orderInUserBuildingList.storage_1]; i++)
                {
                    if (resCapacity < 0) break;
                    building = this._buildingList[gv.orderInUserBuildingList.storage_1][i];
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                }
            case gv.buildingSTR.resource_2:
                resCapacity = this._currentCapacityElixir;
                building = this._buildingList[gv.orderInUserBuildingList.townHall][0];
                building._currentCapacityElixir = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacityElixir"]);
                resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacityElixir"];
                for (var i = 0; i < this._buildingList[gv.orderInUserBuildingList.storage_1]; i++)
                {
                    if (resCapacity < 0) break;
                    building = this._buildingList[gv.orderInUserBuildingList.storage_1][i];
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                }
            case gv.buildingSTR.resource_3:
                resCapacity = this._currentCapacityDarkElixir;
                building = this._buildingList[gv.orderInUserBuildingList.townHall][0];
                building._currentCapacityDarkElixir = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacityDarkElixir"]);
                resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacityDarkElixir"];
                for (var i = 0; i < this._buildingList[gv.orderInUserBuildingList.storage_1]; i++)
                {
                    if (resCapacity < 0) break;
                    building = this._buildingList[gv.orderInUserBuildingList.storage_1][i];
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                }
        }
    },

    /*getAvaiable Capacity*/
    getAvaiableCapacity: function(resSTR)
    {
        cc.log(resSTR);
        switch(resSTR) {
            case gv.buildingSTR.resource_1:
                cc.log("gold");
                return (this._maxCapacityGold - this._currentCapacityGold);
                break;
            case gv.buildingSTR.resource_2:
                cc.log("elixir");
                return (this._maxCapacityElixir - this._currentCapacityElixir);
                break;
            case gv.buildingSTR.resource_3:
                cc.log("dark elixir");
                return (this._maxCapacityDarkElixir - this._currentCapacityDarkElixir);
                break;
            default:
                break;
        }
    },


    //updateCurrentCapacity: function(resType, quantity)
    //{
    //    var quantity = quantity;
    //    var building = null;
    //
    //    switch (resType)
    //    {
    //        case gv.buildingSTR.resource_1:
    //
    //            this.updateTownHallCurrentCapacity(resType, quantity - building._jsonConfig[]);
    //
    //
    //    }
    //},

    /* Cộng resource nhà chính lên 1 lượng quantity <= maxCapacity */
    updateTownHallCurrentCapacity: function(resType, quantity)
    {
        switch(resType)
        {
            case gv.buildingSTR.resource_1:
                cf.user._buildingList[gv.orderInUserBuildingList.townHall][0]._currentCapacityGold += quantity;
                break;
            case gv.buildingSTR.resource_2:
                cf.user._buildingList[gv.orderInUserBuildingList.townHall][0]._currentCapacityElixir += quantity;
                break;
            case gv.buildingSTR.resource_3:
                cf.user._buildingList[gv.orderInUserBuildingList.townHall][0]._currentCapacityDarkElixir += quantity;
                break;
        }
    }
});