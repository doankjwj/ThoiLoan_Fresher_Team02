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

    _listTroop: [],
    _listTroopLevel: [],

    _timeFinishClanPenalty: null,

    _builderTotal: null,
    _builderFree: null,

    _clanId: null,

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
        this._clanId = gv.jsonInfo["player"]["clanId"];
        if(this._clanId === -1) this._timeFinishClanPenalty = new Date(gv.jsonInfo["player"]["timeFinishClanPenalty"]);
        this.initBuildingList();
        this.initTroopLevelList();
        // this.initClanInfo();
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
            this._listTroop[i] = gv.jsonInfo["player"]["troopAmount"][i];
        }
    },

    //============================          NHÀ THỢ, TÀI NGUYÊN             ===================================
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
            if (storage._isActive) this._maxCapacityGold += gv.json.storage[gv.buildingSTR.storage_1][storage._level][gv.capacity.capacity];
        }

        /* Add Resource from Elixir Storage */
        for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_2]; i++)
        {
            storage = this._buildingList[gv.orderInUserBuildingList.storage_2][i];
            if (storage._isActive) this._maxCapacityElixir += gv.json.storage[gv.buildingSTR.storage_2][storage._level][gv.capacity.capacity];
        }

        /* Add Resource from Dark Elixir Storage */
        for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_3]; i++)
        {
            storage = this._buildingList[gv.orderInUserBuildingList.storage_3][i];
            if (storage._isActive) this._maxCapacityDarkElixir += gv.json.storage[gv.buildingSTR.storage_3][storage._level][gv.capacity.capacity];
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
                if (this._buildingList[i][j]._isActive === false)
                {
                    builderBusy ++;
                };

                if (this._buildingList[i][j]._buildingSTR == gv.buildingSTR.obstacle && this._buildingList[i][j]._isCleaning)
                    builderBusy ++;
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
    distributeResource: function(resType_1, resType_2, resType_3, resType_4)
    {
        if (!resType_4) resType_4 = false;

        if (resType_1)
            this.distributeResourceType(gv.buildingSTR.resource_1);
        if (resType_2)
            this.distributeResourceType(gv.buildingSTR.resource_2);
        if (resType_3)
            this.distributeResourceType(gv.buildingSTR.resource_3);

        if (resType_1)
            fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
        if (resType_2)
            fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
        if (resType_3)
            fr.getCurrentScreen().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
        if (resType_4)
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
                resCapacity = Math.max(resCapacity, 0);
                for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_1]; i++)
                {
                    building = this._buildingList[gv.orderInUserBuildingList.storage_1][i];
                    if (building._level <= 0) continue;
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    building.updateImageCapacity();
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                    resCapacity = Math.max(resCapacity, 0);
                };
                break;
            case gv.buildingSTR.resource_2:
                resCapacity = this._currentCapacityElixir;
                building = this._buildingList[gv.orderInUserBuildingList.townHall][0];
                building._currentCapacityElixir = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacityElixir"]);
                resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacityElixir"];
                resCapacity = Math.max(resCapacity, 0);
                for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_2]; i++)
                {
                    building = this._buildingList[gv.orderInUserBuildingList.storage_2][i];
                    if (building._level <= 0) continue;
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    building.updateImageCapacity();
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                    resCapacity = Math.max(resCapacity, 0);
                };
                break;
            case gv.buildingSTR.resource_3:
                resCapacity = this._currentCapacityDarkElixir;
                building = this._buildingList[gv.orderInUserBuildingList.townHall][0];
                building._currentCapacityDarkElixir = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacityDarkElixir"]);
                resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacityDarkElixir"];
                resCapacity = Math.max(resCapacity, 0);
                for (var i = 0; i < this._buildingListCount[gv.orderInUserBuildingList.storage_3]; i++)
                {
                    building = this._buildingList[gv.orderInUserBuildingList.storage_3][i];
                    if (building._level <= 0) continue;
                    building._currentCapacity = Math.min(resCapacity, building._jsonConfig[building._buildingSTR][building._level]["capacity"]);
                    building.updateImageCapacity();
                    resCapacity -= building._jsonConfig[building._buildingSTR][building._level]["capacity"];
                    resCapacity = Math.max(resCapacity, 0);
                };
                break;
        }
    },

    /*getAvaiable Capacity*/
    getAvaiableCapacity: function(resSTR)
    {
        switch(resSTR) {
            case gv.buildingSTR.resource_1:
                return (this._maxCapacityGold - this._currentCapacityGold);
                break;
            case gv.buildingSTR.resource_2:
                return (this._maxCapacityElixir - this._currentCapacityElixir);
                break;
            case gv.buildingSTR.resource_3:
                return (this._maxCapacityDarkElixir - this._currentCapacityDarkElixir);
                break;
            default:
                break;
        }
    },

    /*Lấy tài nguyên*/
    getCurrentResource: function(resType)
    {
        switch (resType)
        {
            case cf.resType.resource_1:
                return this._currentCapacityGold;
            case cf.resType.resource_2:
                return this._currentCapacityElixir;
            case cf.resType.resource_3:
                return this._currentCapacityDarkElixir;
            case cf.resType.resource_4:
                return this._currentCapacityCoin;
        };
    },
    getMaxCapacityResource: function(resType)
    {
        switch (resType)
        {
            case cf.resType.resource_1:
                return this._maxCapacityGold;
            case cf.resType.resource_2:
                return this._maxCapacityElixir;
            case cf.resType.resource_3:
                return this._maxCapacityDarkElixir;
        };
    },

    /* Gán res hiện bằng giá trị*/
    setCurrentResource: function(resType, resAmount)
    {
        switch (resType)
        {
            case cf.resType.resource_1:
                this._currentCapacityGold = resAmount;
                this.distributeResource(true, false, false);
                break;
            case cf.resType.resource_2:
                this._currentCapacityElixir = resAmount;
                this.distributeResource(false, true, false);
                break;
            case cf.resType.resource_3:
                this._currentCapacityDarkElixir = resAmount;
                this.distributeResource(false, true, true);
                break;
            case cf.resType.resource_4:
                this._currentCapacityCoin = resAmount;
                this.distributeResource(false, false, false, true);
                break;
        };
    },

    /* Thêm res hiện tại 1 giá trị*/
    editCurrentResource: function(resType, resAmount)
    {
        switch (resType)
        {
            case cf.resType.resource_1:
                this._currentCapacityGold += resAmount;
                this.distributeResource(true, false, false);
                break;
            case cf.resType.resource_2:
                this._currentCapacityElixir += resAmount;
                this.distributeResource(false, true, false);
                break;
            case cf.resType.resource_3:
                this._currentCapacityDarkElixir += resAmount;
                this.distributeResource(false, true, true);
                break;
            case cf.resType.resource_4:
                this._currentCapacityCoin += resAmount;
                this.distributeResource(false, false, false, true);
                break;
        };
    },

    /*Lấy số thợ*/
    getBuilderFree: function()
    {
        return this._builderFree;
    },
    getBuilderTotal: function()
    {
        return this._builderTotal;
    },

    /* Xóa bỏ thông tin bang hội dành cho trường hợp rời hoặc bị kick*/
    onClanLeaveOrKicked: function()
    {
        this._clanId = -1;
        this._buildingList[gv.orderInUserBuildingList.clanCastle][0].updateNameAndFlag(false);
        gvGUI.layerClanChat.onVisibleOrInvisibleButtonExpand();
        gvGUI.layerClanChat.resetAll();
    },

    //===============================           QUÂN ĐỘI        ===============
    /* Chỉnh sửa quân đội*/
    editTroop: function(troopType, amount)
    {
        this._listTroop[troopType] += amount;
    },
    /* Số lượng đơn vị mỗi loại quân*/
    getTroopAmount: function(troopType)         // tính từ 0
    {
        var troopAmount = this._listTroop[troopType];
        if (troopType != undefined)
        {
            return (troopAmount);
        };
        var troopAmount = 0;
        for (var i=0; i < this._listTroop.length; i++)
        {
            troopAmount += this._listTroop[i]
        }
    },
    /* Số loại quân khác nhau*/                 // tính từ 0
    getTroopUnique: function()
    {
        var troopUnique = 0;
        for (var i=0; i <this._listTroop.length; i++)
            if (this._listTroop[i] != 0) troopUnique ++;
        return troopUnique;
    },
    getTroopLevel: function(troopType)          // tính từ 0
    {
        return this._listTroopLevel[troopType];
    },
    /* Housing Space của lính hiện tại*/
    getCurrentTroopHousingSpace: function(troopType)   // tính từ 0
    {
        if (troopType)
            return (this._listTroop[troopType] * fn.getTroopHousingSpace(troopType+1));
        var currentTroopHousingSpace = 0;
        for (var i=0; i<this._listTroop.length; i++)
            currentTroopHousingSpace += this._listTroop[i] * fn.getTroopHousingSpace(i+1);
        return currentTroopHousingSpace;
    },
    /* Housing space tối đa ( sức chứa nhà trại lính)*/
    getMaxTroopHousingSpace: function()
    {
        var maxTroopHousingSpace = 0;
        for (var i=0; i<this._buildingListCount[gv.orderInUserBuildingList.armyCamp_1]; i++)
        {
            var amc = this._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
            if (amc._level > 0)
                maxTroopHousingSpace += amc._jsonConfig[amc._buildingSTR][amc._level]["capacity"];
        };
        return maxTroopHousingSpace;
    },

    //===============================           CÔNG TRÌNH      ================
    getBuildingCount: function(buildingOrder)
    {
        return this._buildingListCount[buildingOrder];
    }
});