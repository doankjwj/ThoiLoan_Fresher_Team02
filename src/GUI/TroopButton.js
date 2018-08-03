var TroopButton = ccui.Button.extend({
    _id: null,
    _level: null,
    _troopIcon: null,
    _infoButton: null,
    _cost: null,
    _costText: null,
    _elixirIcon: null,

    _bgCost: null,
    _bgCostReq: null,

    jsonTroopBase: null,
    jsonTroop:  null,


    ctor: function(id, level) {
        //get level from config
        if(!level) level = 1;
        this._id = id;
        this._level = level;
        this.jsonTroopBase = gv.json.troopBase;
        this.jsonTroop = gv.json.troop;

        this._super(trainingGUI.slotIcon);

        var troopID = "ARM_" + id;
        this._troopIcon = cc.Sprite(fn.getTroopSprite(id));
        this._cost = this.jsonTroop[troopID][level]["trainingElixir"];
        this._costText = cc.LabelBMFont(this._cost, font.soji20);
        this._costText.scale = 0.7;

        this._infoButton = cc.Sprite(trainingGUI.infoIcon);
        this._elixirIcon = cc.Sprite(trainingGUI.elixirIcon);
        this._bgCost = cc.Sprite(trainingGUI.bgCost);
        this._bgCostReq = cc.Sprite(trainingGUI.bgRequired);

        this.addChild(this._troopIcon);
        this.addChild(this._elixirIcon, 1);
        this.addChild(this._infoButton);
        this.addChild(this._bgCost);
        this.addChild(this._costText);
        this.addChild(this._bgCostReq, 0);
        this._bgCostReq.visible = false;

        this._troopIcon.setAnchorPoint(cc.p(0.5, 0.5));
        this._troopIcon.setPosition(cc.p(this.width/2 + 2, this.height/2 + 2));

        this._bgCost.setPosition(this.width/2+2, this._bgCost.height/2 + 9);
        this._bgCost.setScaleX(1.05);

        this._costText.setAnchorPoint(cc.p(0.5, 0.5));
        this._costText.setPosition(cc.p(this._bgCost.x, this._bgCost.y - 2.5));

        this._elixirIcon.setAnchorPoint(cc.p(0.5, 0.5));
        this._elixirIcon.setPosition(cc.p(this.width - this._elixirIcon.width/2 - 10, this._costText.y));

        this._infoButton.setAnchorPoint(cc.p(0.5, 0.5));
        this._infoButton.setPosition(cc.p(this.width-this._infoButton.width/2 - 5, this.height-this._infoButton.height/2 - 5));

        this.init();


    },

    onTouch: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.scale *= 1.05;
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.getParent().addTroopToQueue(sender._id);
                sender.scale /= 1.05;
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.scale /= 1.05;
                break;
        }
    },


    init: function() {
        this.addTouchEventListener(this.onTouch, this);
        this._infoButton.visible = false;
    },

    updateButton: function() {
        this._cost = this.jsonTroop[troopID][level]["trainingElixir"];
        this._costText.setString(this._cost);
    }

});

var queueTroopButton 