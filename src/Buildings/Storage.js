/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        if(level === 0) level = 1;
        this._size = gv.json.storage[this._buildingSTR][level]["width"];
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

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();


    },

    /* when building is still build */

    initAnimation: function()
    {
        if (this._buildingSTR === gv.buildingSTR.storage_1 && cf.animationRes1[this._level] === null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = fn.getAnimation("effect_res_1_" + this._level + " ", 10);
        }

        if (this._buildingSTR === gv.buildingSTR.storage_2 && cf.animationRes2[this._level] === null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = fn.getAnimation("effect_res_2_" + this._level + " ", 10);
        }
    }
})