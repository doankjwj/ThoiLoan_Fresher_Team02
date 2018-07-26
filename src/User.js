/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var User = cc.Class.extend({
    _id: null,
    _name: "User Name",
    _maxCapacityGold: 2000,
    _maxCapacityElixir: 2000,
    _maxCapacityDarkElixir: 2000,

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
        this._currentCapacityCoin = gv.jsonInfo["player"]["coin"];
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

    updateResource: function()
    {

    }
});