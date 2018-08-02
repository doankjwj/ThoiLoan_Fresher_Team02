/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var IconActionBuilding = ccui.Button.extend({
    _type: null,
    _txt: null,
    _price: null,
    _priceTxt: null,

    ctor: function(type)
    {
        switch(type)
        {
            case cf.CODE_BUILDING_INFO: this._super((buildingGUI.iconInfo));
                this._txt = cc.LabelBMFont("THÔNG TIN", font.soji20);
                break;
            case cf.CODE_BUILDING_UPGRADE: this._super(buildingGUI.iconUpgrade);
                this._txt = cc.LabelBMFont("Upgrade", font.soji20);
                break;
            case cf.CODE_BUILDING_INSTANT:
                this._super(buildingGUI.instant);
                this._txt = cc.LabelBMFont("XONG NGAY", font.soji20);
                break;
            case cf.CODE_BUILDING_CANCEL:
                this._super(buildingGUI.buildCancelIcon);
                this._txt = cc.LabelBMFont("HỦY BỎ", font.soji20);
                break;
            case cf.CODE_TRAINING:
                this._super(buildingGUI.trainIcon);
                this._txt = cc.LabelBMFont("HUẤN LUYỆN", font.soji20);
            default:
                break;
        }

        this._priceTxt = cc.LabelBMFont("FREE", font.soji20);
        this.addChild(this._priceTxt, 1);
        this._priceTxt.setVisible(false);

        if(type === cf.CODE_BUILDING_INSTANT) this._priceTxt.visible = true;

        this.scale = 1.5;

        this._priceTxt.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.width/2,
            scale: 1/1.5,
            y: this.height - this._priceTxt.height/2
        });

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

    updateContent: function(){
        var building = cf.user._buildingList[Math.floor(gv.building_selected/100) - 1][gv.building_selected%100];
        var price = Math.ceil(building._time_remaining / 60);
        this._priceTxt.setString(price.toString());
        if(cf.user._currentCapacityCoin < price) {
            this._priceTxt.setColor(cc.color.RED);
        }
        else this._priceTxt.setColor(cc.color.WHITE);
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