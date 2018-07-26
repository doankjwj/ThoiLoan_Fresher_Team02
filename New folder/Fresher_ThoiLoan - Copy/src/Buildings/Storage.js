/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    _type: null,

    ctor: function(id, level, row, col, existed, type)
    {
        this._CENTER_BUILDING_STR = (type === 1) ? "STO_1_" : "STO_2_"
        this._size = (type === 1) ? this._size = cf.jsonStorage["STO_1"][level]["width"] : cf.jsonStorage["STO_2"][level]["width"];
        this._orderInUserBuildingList = (type === 1) ? 1 : 2;

        this._super(id, level, row, col, existed);
        this._type =  type;

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);

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