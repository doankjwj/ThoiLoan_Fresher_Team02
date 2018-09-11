/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    _currentCapacity: 0,

    _state: null, // phần trăm trạng thái: cạn, ít, vơi, đầy

    _folder: null,

    ctor: function(id, level, row, col, existed, isActive, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        this._size = gv.json.storage[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.storage;
        switch(this._buildingSTR)
        {
            case gv.buildingSTR.storage_1:
                this._maxLevel = gv.buildingMaxLevel.storage_1;
                this._folder = res.folder_gold_storage;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.storage_1;
                this._name = gv.buildingName.storage_1;
                this._description = gv.buildingDescription.storage_1;
                break;
            case gv.buildingSTR.storage_2:
                this._maxLevel = gv.buildingMaxLevel.storage_2;
                this._folder = res.folder_elixir_storage;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.storage_2;
                this._name = gv.buildingName.storage_2;
                this._description = gv.buildingDescription.storage_2;
                break;
            case gv.buildingSTR.storage_3:
                this._maxLevel = gv.buildingMaxLevel.storage_3;
                this._folder = res.folder_dark_elixir_storage;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.storage_3;
                this._name = gv.buildingName.storage_3;
                this._description = gv.buildingDescription.storage_3;
                break;
        }

        this._super(id, level, row, col, existed, isActive);

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();
    },

    updateAnim: function()
    {

    },

    updateImageCapacity: function()
    {
        var maxCapacity = this.getMaxCapacity();
        var currentCapacity = this.getCurrentCapacity();
        var state = fn.percentage(currentCapacity, maxCapacity);
        if (state != this._state)
        {
            this._state = state;
            fn.replaceSpriteWithSpriteTexture(this._center_building, this._folder + this._buildingSTR + "_" + this.getTempLevel() + "/" + res.image_postfix_1 + state + res.image_postfix_2);
        }
    },
    getMaxCapacity: function()
    {
        return (this._jsonConfig[this._buildingSTR][this.getTempLevel()]["capacity"]);
    },
    getCurrentCapacity: function()
    {
        return this._currentCapacity;
    },

    onCompleteBuild: function()
    {
        this._super();
        if (this._buildingSTR == gv.buildingSTR.storage_3 && this._level == 1 && cf.user._buildingListCount[gv.orderInUserBuildingList.storage_3] == 1)
            cf.user.editCurrentResource(cf.resType.resource_3, gv.json.initGame["player"]["darkElixir"]);
        cf.user.updateMaxStorageSingle(this._id);
        cf.user.distributeResource(true, true, true, true);
    }
})