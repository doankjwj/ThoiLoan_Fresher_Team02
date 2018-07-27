/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    ctor: function(id, level, row, col, existed, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        this._size = gv.json.storage[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = (buildingSTR == gv.buildingSTR.storage_1) ? gv.orderInUserBuildingList.storage_1 : gv.orderInUserBuildingList.storage_2;
        this._name = (buildingSTR == gv.buildingSTR.storage_1) ? gv.buildingName.storage_1 : gv.buildingName.storage_2;

        this._super(id, level, row, col, existed);

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

    },

    initAnimation: function()
    {
        if (this._buildingSTR == gv.buildingSTR.storage_1 && cf.animationRes1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = MainLayer.get_animation("effect_res_1_" + this._level + " ", 10);
        }

        if (this._buildingSTR == gv.buildingSTR.storage_2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = MainLayer.get_animation("effect_res_2_" + this._level + " ", 10);
        }
    }
})