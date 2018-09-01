var TroopButton = ccui.Button.extend({
    _id: null,
    _level: null,
    _troopIcon: null,
    _infoButton: null,
    _cost: null,
    _costText: null,
    _elixirIcon: null,
    _space: null,

    _bgCost: null,
    _bgCostReq: null,

    _barrackLevelReq: null,

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
        this._space = this.jsonTroopBase[troopID]["housingSpace"];
        this._barrackLevelReq = this.jsonTroopBase[troopID]["barracksLevelRequired"];
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
                if(cf.user._currentCapacityElixir >= sender._cost) {
                    sender.getParent().addTroopToQueue(sender._id);
                    cf.user._currentCapacityElixir -= sender._cost;
                    cf.user.distributeResource(false, true, false);
                     testnetwork.connector.sendTrainTroop(sender.getParent()._barrackID, sender._id);
                    sender.updateButton();
                } else {
                    sender.getParent().getParent().popUpMessage("Không đủ tài nguyên");
                }
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
        var troopID = "ARM_" + this._id;
        this._cost = this.jsonTroop[troopID][this._level]["trainingElixir"];
        this._costText.setString(this._cost);
        if(this._cost > cf.user._currentCapacityElixir) this._costText.setColor(cc.color.RED);
        else this._costText.setColor(cc.color.WHITE);
    }

});

var queueTroopButton = ccui.Button.extend({
    _id: null,
    _troopIcon: null,
    _cancelButton: null,
    _quantity: null,
    _quantityText: null,

    ctor: function(id) {
        this._super(trainingQueueGUI.slot);
        this._troopIcon = cc.Sprite(fn.getTroopSmallSprite(id));
        this._id = id;
        this.addChild(this._troopIcon, 2);
        this._troopIcon.setPosition(cc.p(this.width/2, this.height/2));
        this._cancelButton = cc.Sprite(trainingGUI.cancelIcon);
        this.addChild(this._cancelButton, 3);
        this._cancelButton.setPosition(this.width, this.height);
        this._quantity = 1;
        this._quantityText = cc.LabelBMFont("x1", font.soji20);
        this._quantityText.scale = 0.7;
        this.addChild(this._quantityText, 3);

        this._quantityText.setAnchorPoint(cc.p(0.5, 0.5));
        this._quantityText.x = this._quantityText.width/2;
        this._quantityText.y = this.height - this._quantityText.height/2;

        this.scale = 1.5;

        this.init();
    },

    init: function() {
        this.addTouchEventListener(this.onTouch, this);
    },

    onTouch: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.scale *= 1.05;
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.getParent().getParent().deleteTroopFromQueue(sender._id);
                sender.scale /= 1.05;
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.scale /= 1.05;
                break;
        }
    },

    updateButton: function() {
        this._quantity = this.getParent().getParent()._queueTraining[fn.getTroopString(this._id)];
        this._quantityText.setString("x" + this._quantity);
    },

    setButtonPosition: function(posInQueue){
        var pos = posInQueue;
        this.y = this.getParent().height/2;
        var offset = this.width*this.scale + 25;
        switch(pos) {
            case 1:
                this.visible = true;
                this.x = this.getParent().width*5/7 + 40;
                break;4
            case 2:
                this.visible = true;
                this.x = this.getParent().width*4/7;
                break;
            case 3:
                this.visible = true;
                this.x = this.getParent().width*4/7 - offset;
                break;
            case 4:
                this.visible = true;
                this.x = this.getParent().width*4/7 - offset*2;
                break;
            case 5:
                this.visible = true;
                this.x = this.getParent().width*4/7 - offset*3;
                break;
            case 6:
                this.visible = true;
                this.x = this.getParent().width*4/7 - offset*4;
                break;
            default:
                this.visible = false;
                break;
        }
    }

});