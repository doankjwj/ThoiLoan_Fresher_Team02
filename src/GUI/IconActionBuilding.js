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
                this._txt = cc.LabelBMFont("Nâng Cấp", font.soji20);
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
                break;
            case cf.CODE_BUILDING_HARVEST_1:
                this._super(buildingGUI.iconHarvest_1);
                this._txt = cc.LabelBMFont("THU HOẠCH", font.soji20);
                break;
            case cf.CODE_BUILDING_HARVEST_2:
                this._super(buildingGUI.iconHarvest_2);
                this._txt = cc.LabelBMFont("THU HOẠCH", font.soji20);
                break;
            case cf.CODE_BUILDING_HARVEST_3:
                this._super(buildingGUI.iconHarvest_3);
                this._txt = cc.LabelBMFont("THU HOẠCH", font.soji20);
                break;
            case cf.CODE_BUILDING_RESEARCH:
                this._super(buildingGUI.iconResearch);
                this._txt = cc.LabelBMFont("NGHIÊN CỨU", font.soji20);
                break;
            case cf.CODE_CLAN:
                this._super(res.clanGUI.iconClan);
                this._txt = cc.LabelBMFont("BANG HỘI", font.soji20);
                break;
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
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.02);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.02);
                break;
        }
    }
});