/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var IconActionBuilding = ccui.Button.extend({
    _type: null,
    _txt: null,

    ctor: function(type)
    {
        switch(type)
        {
            case cf.CODE_BUILDING_INFO: this._super((buildingGUI.iconInfo));
                this._txt = cc.LabelBMFont("Info", font.soji20);
                break;
            case cf.CODE_BUILDING_UPGRADE: this._super(buildingGUI.iconUpgrade);
                this._txt = cc.LabelBMFont("Upgrade", font.soji20);
                break;
            default:
                break;
        }

        this.scale = 1.5;

        this._txt.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.width/2,
            scale: 1/1.5,
            y: this._txt.height/2*this._txt.scale + 5
        });
        this.addChild(this._txt,1);

        this.addTouchEventListener(this.updateBuilding, this);

    },

    updateBuilding: function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.02);
                cc.log("Upgrade this building : " + cf.building_selected);
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.02);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.02);
                cc.log("canceled");
                break;
        }
    }
});