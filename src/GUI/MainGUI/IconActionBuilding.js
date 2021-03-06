var IconActionBuilding = ccui.Button.extend({
    _type: null,
    _txt: null,
    _price: null,
    _priceDarkE: null,
    _priceTxt: null,
    _iconGold: null,

    _iconDarkElixir: null,

    _cost:
    {
        gold: 0,
        elixir: 0,
    },

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
            case cf.CODE_BUILDING_REQUEST_DONATE:
                this._super(buildingGUI.iconRequestDonate);
                this._txt = cc.LabelBMFont("XIN QUÂN", font.soji20);
                break;
            case cf.CODE_BUILDING_CLAN:
                this._super(buildingGUI.iconClan);
                this._txt = cc.LabelBMFont("BANG HỘI", font.soji20);
                break;
            case cf.CODE_BUILDING_REMOVE:
                this._super(buildingGUI.iconRemove);
                this._txt = cc.LabelBMFont("THU DỌN" ,font.soji20);
                break;
            case cf.CODE_SELECT_WALL:
                this._super(buildingGUI.selectLine);
                this._txt = cc.LabelBMFont("CHỌN HÀNG", font.soji20);
                break;
            default:
                break;
        }

        this._priceDarkE = 0;

        this._priceTxt = cc.LabelBMFont("FREE", font.soji20);
        this.addChild(this._priceTxt, 1);
        this._priceTxt.setVisible(false);

        this._iconGold = cc.Sprite(mainGUI.goldIcon);
        this._iconDarkElixir = cc.Sprite(mainGUI.darkElixirIcon);

        this._priceDarkElixirTxt = cc.LabelBMFont("FREE", font.soji20);
        this.addChild(this._priceDarkElixirTxt, 1);
        this._priceDarkElixirTxt.visible = false;

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

        this._priceDarkElixirTxt.setPosition(cc.p(this._priceTxt.x, this._priceTxt.y + this._priceTxt.height + 2));
        this._priceDarkElixirTxt.visible = false;

        this._iconDarkElixir.scale = 0.6;
        this._iconDarkElixir.setPosition(cc.p(this._priceDarkElixirTxt.x + this._priceDarkElixirTxt.width/2 + this._iconDarkElixir.width/2*this._iconDarkElixir.scale, this._priceDarkElixirTxt.y));
        this._iconDarkElixir.visible = false;
        this.addChild(this._iconDarkElixir, 1);


        this._iconGold.scale = 0.6;
        this._iconGold.setPosition(cc.p(this._priceTxt.x + this._priceTxt.width/2 + this._iconGold.width/2*this._iconGold.scale, this._priceTxt.y));
        this.addChild(this._iconGold, 1);
        this._iconGold.visible = false;

    },

    updateContent: function(buildingID){
        this._priceTxt.setColor(cc.color.WHITE);
        this._priceDarkElixirTxt.setColor(cc.color.WHITE);
        var building = cf.user._buildingList[Math.floor(buildingID/100) - 1][buildingID%100];
        var price = Math.ceil(building._time_remaining / 60);
        this._priceTxt.setString(price.toString());
        if(cf.user._currentCapacityCoin < price) {
            this._priceTxt.setColor(cc.color.RED);
        }
        else this._priceTxt.setColor(cc.color.WHITE);

        if(cf.selectedWall.length !== 0) {

            if(cf.user._currentCapacityGold < this._price)
                this._priceTxt.setColor(cc.color.RED);
            else
                this._priceTxt.setColor(cc.color.WHITE);

            if(cf.user._currentCapacityDarkElixir < this._priceDarkE)
                this._priceDarkElixirTxt.setColor(cc.color.RED);
            else
                this._priceDarkElixirTxt.setColor(cc.color.WHITE);
            
        }

        this._priceTxt.setPosition(cc.p(this.width/2, this.height - this._priceTxt.height/2));
        this._iconGold.setPosition(cc.p(this._priceTxt.x + this._priceTxt.width/2 + this._iconGold.width/2*this._iconGold.scale, this._priceTxt.y));
        this._priceDarkElixirTxt.setPosition(cc.p(this._priceTxt.x, this._priceTxt.y + this._priceTxt.height + 2));
        this._iconDarkElixir.setPosition(cc.p(this._priceDarkElixirTxt.x + this._priceDarkElixirTxt.width/2 + this._iconDarkElixir.width/2*this._iconDarkElixir.scale, this._priceDarkElixirTxt.y))

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
    },

    /* Thay đổi content (Label tài nguyên yêu cầu, icon tài nguyên cho nút remove vật cản*/
    updateForObstcle: function()
    {
        var building = fn.getCurrentBuilding();
        this._cost.gold = 0;
        this._cost.elixir = 0;
        this._cost.gold = gv.json.obstacle[building._level]["1"]["gold"];
        this._cost.elixir = gv.json.obstacle[building._level]["1"]["elixir"];
        this._labelCost.setString((this._cost.gold != 0) ? this._cost.gold : this._cost.elixir);
        fn.replaceSpriteImage(this._iconCost, res.folder_gui_collect_res + ((this._cost.gold != 0) ? "RES_1.png" : "RES_2.png"));

        if (this._cost.gold > cf.user.getCurrentResource(cf.resType.resource_1) || this._cost.elixir > cf.user.getCurrentResource(cf.resType.resource_2))
            this._labelCost.setColor(cc.color(255, 0, 0, 255));
        else
            this._labelCost.setColor(cc.color(255, 255, 255, 255));
    },

    checkResourceRequierEnough: function()
    {
        var building = fn.getCurrentBuilding();
        return (gv.json.obstacle[building._level]["1"]["gold"] <= cf.user.getCurrentResource(cf.resType.resource_1) && gv.json.obstacle[building._level]["1"]["elixir"] <= cf.user.getCurrentResource(cf.resType.resource_2));
    }
});