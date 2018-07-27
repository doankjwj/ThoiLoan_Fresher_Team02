/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    _type: null,

    ctor: function(id, level, row, col, existed, type)
    {
        this._buildingSTR = (type === 1) ? gv.buildingSTR.storage_1 : gv.buildingSTR.storage_2;
        this._size = gv.json.storage[this._buildingSTR][level]["width"];
        this._orderInUserBuildingList = (type === 1) ? gv.orderInUserBuildingList.storage_1 : gv.orderInUserBuildingList.storage_2;
        this._name = (type == 1) ? gv.buildingName.storage_1 : gv.buildingName.storage_2;

        this._super(id, level, row, col, existed);
        this._type =  type;

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding();

    },

    initAnimation: function()
    {
        if (this._type === 1 && cf.animationRes1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animationRes1[this._level] = MainLayer.get_animation("effect_res_1_" + this._level + " ", 10);
        }

        if (this._type === 2 && cf.animationRes2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animationRes2[this._level] = MainLayer.get_animation("effect_res_2_" + this._level + " ", 10);
        }
    }
})