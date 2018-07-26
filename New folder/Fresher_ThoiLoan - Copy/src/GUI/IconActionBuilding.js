/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var IconActionBuilding = cc.Node.extend({
    _icon: null,
    _type: null,
    _txt: null,

    ctor: function(type)
    {
        this._super();
        cc.log("here")
        switch(type)
        {
            case cf.CODE_BUILDING_INFO: this._icon = ccui.Button(buildingGUI.iconInfo);
                this._txt = cc.LabelBMFont("Info", font.soji20);
                break;
            case cf.CODE_BUILDING_UPGRADE: this._icon = ccui.Button(buildingGUI.iconUpgrade);
                this._txt = cc.LabelBMFont("Upgrade", font.soji20);
                break;
            default:
                break;
        }

        this._icon.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 20
        })
        this.addChild(this._icon, 1);

        this._txt.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 0
        })
        this.addChild(this._txt,1)

    }
})