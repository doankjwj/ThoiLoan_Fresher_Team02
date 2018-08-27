/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    _currentCapacity: 0,

    ctor: function(id, level, row, col, existed, isActive, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        this._size = gv.json.storage[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.storage;
        if(this._buildingSTR === gv.buildingSTR.storage_1) {
            this._maxLevel = gv.buildingMaxLevel.storage_1;
        } else if(this._buildingSTR === gv.buildingSTR.storage_2) {
            this._maxLevel = gv.buildingMaxLevel.storage_2;
        } else if(this._buildingSTR === gv.buildingSTR.storage_3) {
            this._maxLevel = gv.buildingMaxLevel.storage_3;
        }
        this._orderInUserBuildingList = (buildingSTR === gv.buildingSTR.storage_1) ? gv.orderInUserBuildingList.storage_1 : gv.orderInUserBuildingList.storage_2;
        this._name = (buildingSTR === gv.buildingSTR.storage_1) ? gv.buildingName.storage_1 : gv.buildingName.storage_2;
        this._description = (buildingSTR === gv.buildingSTR.storage_1) ? gv.buildingDescription.storage_1 : gv.buildingDescription.storage_2;

        this._super(id, level, row, col, existed, isActive);

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

        //if (!this._isActive)
        //{
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
        //}

    },

    updateAnim: function()
    {

    },

    /* when building is still build */

    initAnimation: function()
    {
        var tmpLevel = this.getTempLevel();
        if (this._buildingSTR === gv.buildingSTR.storage_1 && cf.animationRes1[tmpLevel] === null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + tmpLevel + ".plist", res.folder_effect + "effect_res_1_" + tmpLevel + ".png");
            cf.animationRes1[tmpLevel] = fn.getAnimation("effect_res_1_" + tmpLevel + " ", 1, 10);
        }

        if (this._buildingSTR === gv.buildingSTR.storage_2 && cf.animationRes2[tmpLevel] === null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + tmpLevel + ".plist", res.folder_effect + "effect_res_2_" + tmpLevel + ".png");
            cf.animationRes2[tmpLevel] = fn.getAnimation("effect_res_2_" + tmpLevel + " ", 1, 10);
        }
    }
})