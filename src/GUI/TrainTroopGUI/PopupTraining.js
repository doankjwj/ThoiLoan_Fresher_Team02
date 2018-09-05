var PopupTraining = cc.Node.extend({
    _barrack: null,
    _barrackID: null,
    _bg: null,
    _colorBG: null,
    _txtTitle: null,
    _btnClose: null,
    _trainBar: null,
    _bgTrainBar: null,
    _swallowTouch: null,

    _trainingQueueBackground: null,
    _queueArrow: null,
    _timeTraining: null,
    _previousBarrack: null,
    _nextBarrack: null,
    _numberOfTroops: null,
    _textTime: null,
    _textTimeLabel: null,
    _textQuickFinish: null,
    _quickFinishButton: null,

    _textStatusCapacity: null,
    _priceG: null,
    _textPriceG: null,

    _troopListButton: null,

    _isReleasable: null,

    _currentTrainingTime: null,
    _currentTrainingTimeText: null,
    _currentTrainingTimeRequired: null,

    _queueLengthMax: null,
    _currentQueueLength: 0,
    _queueLengthText: null,

    _queueTraining: null,
    _queueTrainingButtonList: null,

    jsonTroopBase: null,
    jsonTroop: null,

    _bgScale: 2.5,

    ctor: function (barID) {
        this._barrackID = barID;
        this._barrack = cf.user._buildingList[Math.floor(barID / 100) - 1][barID % 100];
        cc.log("BAR Id: " + this._barrack._id);
        this._super();
        this.x = cc.winSize.width / 2;
        this.y = cc.winSize.height / 2;

        this._troopListButton = [];

        this._timeTraining = 0;
        this._currentTrainingTime = 0;
        this._currentTrainingTimeRequired = 0;

        this._queueTraining = {};
        this._queueTrainingButtonList = [];
        this._currentQueueLength = 0;
        this._queueLengthMax = gv.json.barrack[gv.buildingSTR.barrack_1][this._barrack.getTempLevel()]["queueLength"];

        this.jsonTroopBase = gv.json.troopBase;
        this.jsonTroop = gv.json.troop;

        this._isReleasable = true;

        this._priceG = 0;

        this.initContent();
        this.initTroopListButton();
        this.init();
        this.onDisappear();

        //this.onResumeTrainingFromServer();
    },

    /* Tiếp tục luyện quân khi bật game*/
    onResumeTrainingFromServer: function()
    {
        cc.log("++++");
        cc.log(this._barrackID + " ++++");
        var barrackOrder = this._barrackID%100;
        cc.log(barrackOrder + " ++++");
        if (!(gv.jsonInfo["map"]["BAR_1"][barrackOrder]))
            return;
        if (gv.jsonInfo["map"]["BAR_1"][barrackOrder]["startTrainingTime"] === 0)
            return;

        cc.log("Resume Train");
        this.initTrainingQueue(barrackOrder);
        //this.updateContent();
        //this.initEffectTraining();
        //this.loadNewTrain(this._trainType.loadTrain);
        //this.onVisibleEffectTrainTroop(true);
        //this.onStartTraining(this._trainType.loadTrain);
    },
    initTrainingQueue: function(barrackOrder)
    {
        var jsonCurrentBarrack = gv.jsonInfo["map"]["BAR_1"][barrackOrder];
        var jsonTroopQueueType = jsonCurrentBarrack["trainingTroopTypes"];
        var jsonTroopQueueAmout = jsonCurrentBarrack["trainingQueue"];


        for (var i=0; i< jsonTroopQueueType.length; i++)
        {
            var id = (jsonTroopQueueType[i]+1);
            var key = "ARM_" + id;
            if (!this._queueTraining[key]) {
                var size = this.getQueueSize();
                this._queueTraining[key] = jsonTroopQueueAmout[i];
                var button = new queueTroopButton(id);
                button.scale = 1.5;
                button.setTag(id);
                this._trainingQueueBackground.addChild(button, 2);
                button.updateButton();
                this._queueTrainingButtonList.push(button);
                this.updateQueueButton();
                if (size === 0) this._currentTrainingTime = this._currentTrainingTimeRequired;
                this._currentQueueLength += this.jsonTroopBase[key]["housingSpace"]*jsonTroopQueueAmout[i];
                this._timeTraining += this.jsonTroopBase[fn.getTroopString(id)]["trainingTime"]*jsonTroopQueueAmout[i];
            };

        };
    },

    updateContent: function () {
        this._txtTitle.setString("Nhà lính số " + (this._barrackID % 100 + 1));
        this._queueLengthMax = gv.json.barrack[gv.buildingSTR.barrack_1][this._barrack.getTempLevel()]["queueLength"];
        this._queueLengthText.setString("(" + this._currentQueueLength + "/" + this._queueLengthMax + ")");

        var maxSlot = this.getTotalSlot();
        var afterTraining = this.getTotalQueueLength() + maxSlot - this.getAvailableSlot();

        this._textStatusCapacity.setString("Tổng số quân sau huấn luyện: " + afterTraining + "/" + maxSlot);
        this._priceG = Math.ceil(this._timeTraining / 60);
        this._textPriceG.setString(this._priceG.toString());

        for (var i = 1; i <= 17; i++) {
            if (i > 10 && i < 16) continue;
            var button = this.getChildByTag(gv.tag.TAG_BUTTON_TROOP * i);
            if (button._barrackLevelReq > this._barrack.getTempLevel() || this._currentQueueLength + button._space > this._queueLengthMax) {
                button.setTouchEnabled(false);
                button.setEnabled(false);
                button.setBright(false);
                var act = cc.tintTo(0, 127.5, 127.5, 127.5);
                act.retain();
                button._troopIcon.runAction(act.clone());
            } else {
                button.setTouchEnabled(true);
                button.setEnabled(true);
                button.setBright(true);
                var act = cc.tintTo(0, 255, 255, 255);
                act.retain();
                button._troopIcon.runAction(act.clone());
                if (button._cost > cf.user._currentCapacityElixir) {
                    button._costText.setColor(cc.color.RED);
                }
                else button._costText.setColor(cc.color.WHITE);
            }
        }

        var b = this._currentQueueLength > this.getAvailableSlot();

        this._quickFinishButton.setBright(!b);
        this._quickFinishButton.setEnabled(!b);
        this._quickFinishButton.setTouchEnabled(!b);

        if (this._queueTrainingButtonList.length !== 0) {
            this._queueArrow.visible = true;
            this._textTime.visible = true;
            this._quickFinishButton.visible = true;
            this._textTimeLabel.visible = true;
            this._bgTrainBar.visible = true;
            this._trainBar.visible = true;
            this._currentTrainingTimeText.visible = true;
            this._textStatusCapacity.visible = true;
            this._textTimeLabel.setString(this._timeTraining !== 0 ? cf.secondsToLongTime(this._timeTraining) : "0s");
            if (this._isReleasable) this._currentTrainingTimeText.setString(cf.secondsToLongTime(this._currentTrainingTime));
            else this._currentTrainingTimeText.setString("DỪNG");
            this._currentTrainingTimeRequired = this.jsonTroopBase[fn.getTroopString(this._queueTrainingButtonList[0]._id)]["trainingTime"];
        }
        else {
            this._textStatusCapacity.visible = false;
            this._queueArrow.visible = false;
            this._textTime.visible = false;
            this._textTimeLabel.visible = false;
            this._quickFinishButton.visible = false;
            this._bgTrainBar.visible = false;
            this._trainBar.visible = false;
            this._currentTrainingTimeText.visible = false;
            this._currentTrainingTime = 0;
            this._currentTrainingTimeRequired = 0;
            this._timeTraining = 0;
        }

    },

    updateStatus: function () {
        if (!this._barrack._isActive) return;
        if (!this._isReleasable)
        {
            cc.log(this._barrack._id);
            this._barrack.onPauseTraining(false);
            this._barrack.onPopUpFull();
            return;
        };
        if (this._timeTraining > 0) this._timeTraining -= 1;
        if (this._currentTrainingTime > 0) {
            this._currentTrainingTime -= 1;
            this._trainBar.setTextureRect(cc.rect(0, 0, (this._currentTrainingTimeRequired - this._currentTrainingTime) / this._currentTrainingTimeRequired * 69, 18));
            if (this._currentTrainingTime === 0 && this._queueTrainingButtonList.length !== 0) {
                this.finishingTroop(this._queueTrainingButtonList[0]._id);
                if (!this._isReleasable) return;
                this._trainBar.setTextureRect(cc.rect(0, 0, 0, 18));
            }
        }

        this._textTimeLabel.setString(cf.secondsToLongTime(this._timeTraining));
        this._currentTrainingTimeText.setString(cf.secondsToLongTime(this._currentTrainingTime));
        this._priceG = Math.ceil(this._timeTraining / 60);
        this._textPriceG.setString(this._priceG.toString());
    },

    finishingTroop: function (id) {

        var key = fn.getTroopString(id);

        if (this.getAvailableSlot() >= this.jsonTroopBase[key]["housingSpace"]) {
            //var amc = this.getArmyCamp();
            //if (amc._troopList == null)
            //    amc._troopList = new Array();
            //var troop = new Troop(id - 1, this._barrack._row + 2, this._barrack._col + 2, amc._id);
            //this.getParent()._map.addChild(troop);
            //amc._troopList.push(troop);
            //amc._troopQuantity += gv.json.troopBase["ARM_" + id]["housingSpace"];

            /* Chuyển sang cho nhà barack thực hiện*/
        }
        else {
            this._isReleasable = false;
            this.updateContent();
            return;
        }

        if (!this._queueTraining[key]) return;
        if (this._queueTraining[key] > 1) {
            this._queueTraining[key] -= 1;
            this._queueTrainingButtonList[this.getPosInQueue(id)].updateButton();
            this._currentTrainingTime = this._currentTrainingTimeRequired;
        } else {
            var pos = this.getPosInQueue(id);
            this.removeAtIndex(pos);
            this._trainingQueueBackground.removeChildByTag(id, false);
            delete this._queueTraining[key];
            this.updateQueueButton();
            this._currentTrainingTime = this._currentTrainingTimeRequired;
        }

        this._currentQueueLength -= this.jsonTroopBase[key]["housingSpace"];

        this.updateContent();
    },

    getAvailableSlot: function () {

        var slot = 0;
        for (var i = 0; i < cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1].length; i++) {
            var amc = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
            slot += amc.getMaxSpace() - amc._troopQuantity;
        }
        return slot;

    },

    getTotalQueueLength: function () {

        var len = 0;

        for (var i = 0; i < cf.user._buildingList[gv.orderInUserBuildingList.barrack_1].length; i++) {
            var layer = this.getParent().getChildByTag(gv.tag.TAG_POPUP_TRAINING * i);
            len += layer._currentQueueLength;
        }

        return len;

    },

    getTotalSlot: function () {

        var slot = 0;
        for (var i = 0; i < cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1].length; i++) {
            var amc = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
            slot += amc.getMaxSpace();
        }
        return slot;
    },

    getArmyCamp: function () {

        var firstArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][0];
        var maxSpacePercent = firstArmyCamp.getAvailableSpace() * 100 / firstArmyCamp.getMaxSpace();
        var output = 0;
        for (var i = 1; i < cf.user._buildingListCount[gv.orderInUserBuildingList.armyCamp_1]; i += 1) {
            var thisArmyCamp = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
            if (thisArmyCamp.getMaxSpace() > 0) {
                var thisArmyCampAvailableSpacePercent = thisArmyCamp.getAvailableSpace() * 100 / thisArmyCamp.getMaxSpace();
                if (thisArmyCampAvailableSpacePercent > maxSpacePercent) {
                    maxSpacePercent = thisArmyCampAvailableSpacePercent;
                    output = i;
                }
            }
        }
        return cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][output];
    },

    initContent: function () {

        this._bg = cc.Scale9Sprite(res.popUp.bg);
        this._bg.setCapInsets(cc.rect(this._bg.width/10, this._bg.height/8 , this._bg.width/10*8, this._bg.height/8*6));
        this._bg.width = cc.winSize.width / 5 * 3.6;
        this._bg.height = cc.winSize.height /5 * 4;
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.scale = 1;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5, 127.5, 127.5, 0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        this._trainingQueueBackground = cc.LayerColor(cc.color(255, 255, 255, 255));
        this.addChild(this._trainingQueueBackground, 1);
        this._trainingQueueBackground.width = this._bg.width * this._bg.scale * 0.9;
        this._trainingQueueBackground.height = this._bg.height / 3.25 * this._bg.scale;
        this._trainingQueueBackground.x = -this._bg.width / 2 * this._bg.scale * 0.9;
        this._trainingQueueBackground.y = this._bg.height / 14 * this._bg.scale;
        // this._trainingQueueBackground.visible = false;

        //the green arrow

        this._queueArrow = cc.Sprite(trainingGUI.queueArrow);
        this._queueArrow.attr({
            x: this._trainingQueueBackground.width / 3,
            y: this._trainingQueueBackground.height / 2
        });
        this._queueArrow.setScale(1.5);
        this._trainingQueueBackground.addChild(this._queueArrow, 2);
        // this._queueArrow.visible = false;

        this._txtTitle = cc.LabelBMFont("Nhà lính số " + this._barrackID % 100, font.soji20);
        this._txtTitle.setScale(1.2);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 /** this._bgScale */ - this._txtTitle.height/2));
        this.addChild(this._txtTitle, 1);

        this._queueLengthText = cc.LabelBMFont("", font.soji20);
        this._queueLengthText.setAnchorPoint(cc.p(0.5, 0.5));
        this._queueLengthText.setPosition(this._txtTitle.x, this._txtTitle.y - this._txtTitle.height/1.2);
        this.addChild(this._queueLengthText, 1);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = 1;
        this._btnClose.setPosition(cc.p(420, 260));
        this.addChild(this._btnClose, 1);
        this._btnClose.addTouchEventListener(function (sender, type) {

            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    sender.setScale(sender.scale * 1.1);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale / 1.1);
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale / 1.1);
                    break;
            }

        }, this);

        this._quickFinishButton = ccui.Button(trainingGUI.buttonIcon);
        this._quickFinishButton.setAnchorPoint(cc.p(0.5, 0.5));
        this._quickFinishButton.x = this._trainingQueueBackground.width - this._quickFinishButton.width / 2 - 20;
        this._quickFinishButton.y = this._quickFinishButton.height / 2;
        this._trainingQueueBackground.addChild(this._quickFinishButton, 4);
        var text = cc.LabelBMFont("Hoàn thành ngay:", font.soji20);
        text.setAnchorPoint(cc.p(0.5, 0.5));
        text.scale = 0.7;
        // text.setColor(cc.color(165,42,42, 255));
        text.setPosition(cc.p(this._quickFinishButton.width / 2, this._quickFinishButton.height + 5 + text.height / 2 * text.scale));
        this._quickFinishButton.addChild(text, 1);

        this._quickFinishButton.addTouchEventListener(function (sender, type) {
            var self = this;
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    self.quickFinish();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);


        this._textTime = cc.LabelBMFont("Tổng thời gian", font.soji20);
        //this._textTime.scale = 1;
        this._textTime.x = this._quickFinishButton.x;
        this._textTime.y = this._trainingQueueBackground.height - this._textTime.height / 2;
        this._trainingQueueBackground.addChild(this._textTime, 4);

        this._textStatusCapacity = cc.LabelBMFont("Tổng số quân sau khi huấn luyện: ", font.soji12);
        this._trainingQueueBackground.addChild(this._textStatusCapacity, 4);
        this._textStatusCapacity.setAnchorPoint(cc.p(0, 0.5));
        this._textStatusCapacity.setPosition(cc.p(100, 10 + this._textStatusCapacity.height));

        this._textTimeLabel = cc.LabelBMFont("1", font.soji20);
        this._textTimeLabel.scale = 1.25;
        this._textTimeLabel.x = this._textTime.x;
        this._textTimeLabel.y = this._textTime.y - this._textTimeLabel.height * this._textTimeLabel.scale - 10;
        this._trainingQueueBackground.addChild(this._textTimeLabel, 4);

        this._trainBar = cc.Sprite(trainingGUI.trainBar);
        this._bgTrainBar = cc.Sprite(trainingGUI.bgTrainBar);

        this._trainBar.scale = 1.25;
        this._bgTrainBar.scale = 1.25;

        this._trainBar.setAnchorPoint(cc.p(0, 0.5));
        this._bgTrainBar.setAnchorPoint(cc.p(0, 0.5));

        this._bgTrainBar.x = this._trainingQueueBackground.width*3/4 - 30;
        this._bgTrainBar.y = this._quickFinishButton.y;
        this._trainingQueueBackground.addChild(this._bgTrainBar, 3);

        this._trainBar.x = this._bgTrainBar.x;
        this._trainBar.y = this._bgTrainBar.y;
        this._trainingQueueBackground.addChild(this._trainBar, 4);

        this._currentTrainingTimeText = cc.LabelBMFont("", font.soji20);
        this._currentTrainingTimeText.setAnchorPoint(cc.p(0.5, 0.5));
        this._currentTrainingTimeText.scale = 1;
        this._currentTrainingTimeText.setPosition(cc.p(this._bgTrainBar.x + 50, this._bgTrainBar.y - this._bgTrainBar.height / 2 - 10));
        this._trainingQueueBackground.addChild(this._currentTrainingTimeText, 5);

        this._previousBarrack = ccui.Button(trainingGUI.previousIcon);
        this._previousBarrack.setAnchorPoint(cc.p(0.5, 0.5));
        this._previousBarrack.setPosition(cc.p(this._bg.x - this._bg.width * this._bg.scale / 2 - 20, this._bg.y));
        this.addChild(this._previousBarrack, 1);

        this._previousBarrack.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var barrackListSize = cf.user._buildingListCount[this._barrack._orderInUserBuildingList];
                    var previousBarrackID = (this._barrackID % 100 - 1);
                    while (previousBarrackID < 0) previousBarrackID += barrackListSize;
                    previousBarrackID = previousBarrackID % barrackListSize;
                    var previousBarrackFullID = this._barrackID - this._barrackID % 100 + previousBarrackID;
                    var previousBarrack = cf.user._buildingList[Math.floor(previousBarrackFullID / 100) - 1][previousBarrackFullID % 100];
                    while (!previousBarrack._isActive) {
                        previousBarrackID -= 1;
                        previousBarrackFullID = this._barrackID - this._barrackID % 100 + previousBarrackID;
                        previousBarrack = cf.user._buildingList[Math.floor(previousBarrackFullID / 100) - 1][previousBarrackFullID % 100];
                    }

                    this.getParent().getChildByTag(previousBarrackID * gv.tag.TAG_POPUP_TRAINING).onAppear();
                    this.onDisappear();

                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

        this._nextBarrack = ccui.Button(trainingGUI.forwardIcon);
        this._nextBarrack.setAnchorPoint(cc.p(0.5, 0.5));
        this._nextBarrack.setPosition(cc.p(this._bg.x + this._bg.width * this._bg.scale / 2 + 20, this._bg.y));
        this.addChild(this._nextBarrack, 1);

        this._nextBarrack.addTouchEventListener(function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var barrackListSize = cf.user._buildingListCount[this._barrack._orderInUserBuildingList];
                    var nextBarrackID = (this._barrackID % 100 + 1);
                    // while(nextBarrackID < 0) nextBarrackID += barrackListSize;
                    nextBarrackID = nextBarrackID % barrackListSize;
                    var nextBarrackFullID = this._barrackID - this._barrackID % 100 + nextBarrackID;
                    var nextBarrack = cf.user._buildingList[Math.floor(nextBarrackFullID / 100) - 1][nextBarrackFullID % 100];

                    while (!nextBarrack._isActive) {
                        nextBarrackID += 1;
                        nextBarrackFullID = this._barrackID - this._barrackID % 100 + nextBarrackID;
                        nextBarrack = cf.user._buildingList[Math.floor(nextBarrackFullID / 100) - 1][nextBarrackFullID % 100];
                    }

                    this.getParent().getChildByTag(nextBarrackID * gv.tag.TAG_POPUP_TRAINING).onAppear();
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);

        var gIcon = cc.Sprite(guiFolder + "train_troop_gui/g_icon.png");
        this._quickFinishButton.addChild(gIcon, 1);
        gIcon.setPosition(cc.p(this._quickFinishButton.width - gIcon.width / 2 - 10, this._quickFinishButton.height / 2));

        this._textPriceG = cc.LabelBMFont("00", font.soji12);
        this._quickFinishButton.addChild(this._textPriceG, 1);
        this._textPriceG.setPosition(cc.p(this._quickFinishButton.width / 2, this._quickFinishButton.height / 2));

    },

    initTroopListButton: function () {

        for (var i = 1; i <= 17; i++) {
            if (i > 10 && i < 16) continue;
            var button = new TroopButton(i);
            button.scale = 1.2;
            this.addChild(button, 2, gv.tag.TAG_BUTTON_TROOP * i);
            if (i <= 6) {
                button.x = -this._bg.width / 2 + i * button.width * button.scale + 5;
                button.y = this._trainingQueueBackground.y - button.height * button.scale / 2 - 20;
            }
            else {
                var j = i;
                if (j === 16) j = 5;
                else if (j === 17) j = 6;
                else j -= 6;
                button.x = -this._bg.width / 2 + j * button.width * button.scale + 5;
                button.y = this._trainingQueueBackground.y - button.height * button.scale / 2 - 20 - button.height * button.scale;
            }
            if (button._barrackLevelReq > this._barrack.getTempLevel()) {

                button.setTouchEnabled(false);
                button.setEnabled(false);
                button.setBright(false);
                var act = cc.tintTo(0, 127.5, 127.5, 127.5);
                act.retain();
                button._troopIcon.runAction(act.clone());

            }
        }
    },

    init: function () {
        this.schedule(this.updateStatus, 1);
    },

    getQueueSize: function () {
        var i = 0;
        for (var prop in this._queueTraining) {
            if (!this._queueTraining[prop]) continue;
            i = i + 1;
        }
        return i;
    },

    getPosInQueue: function (id) {
        var i = 0;
        for (var prop in this._queueTraining) {
            if (!this._queueTraining[prop]) continue;
            if (prop.toString() === fn.getTroopString(id)) return i;
            i = i + 1;
        }
        return -1;
    },

    updateQueueButton: function () {
        this.updateContent();
        for (var j = 0; j < this._queueTrainingButtonList.length; j++) {

            this._queueTrainingButtonList[j].setButtonPosition(j + 1);
        }
    },

    addTroopToQueue: function (id) {

        var key = fn.getTroopString(id);
        var troopType = key.substr(4, key.length - 4);

        /* thêm lính đang luyện ra nhà barrack*/
        this._barrack.onAddTroop(troopType-1);

        if (!this._queueTraining[key]) {
            var size = this.getQueueSize();
            this._queueTraining[key] = 1;
            var button = new queueTroopButton(id);
            button.scale = 1.5;
            button.setTag(id);
            this._trainingQueueBackground.addChild(button, 2);
            this._queueTrainingButtonList.push(button);
            this.updateQueueButton();
            if (size === 0) this._currentTrainingTime = this._currentTrainingTimeRequired;
        }

        else {
            this._queueTraining[key] += 1;
            this._queueTrainingButtonList[this.getPosInQueue(id)].updateButton();
        }
        this._currentQueueLength += this.jsonTroopBase[key]["housingSpace"];
        this._timeTraining += this.jsonTroopBase[fn.getTroopString(id)]["trainingTime"];

        this.updateContent();
    },

    logQueue: function () {
        var str = "";

        for (var i in this._queueTraining) {
            str += (i + ":" + this._queueTraining[i] + " ");
        }
        cc.log(str);
    },

    removeAtIndex: function (id) {

        for (var j = 0; j < this._queueTrainingButtonList.length; j++) {
            if (j < id) continue;
            else {
                this._queueTrainingButtonList[j] = this._queueTrainingButtonList[j + 1];
            }
        }

        this._queueTrainingButtonList.splice(this._queueTrainingButtonList.length - 1, 1);

    },

    deleteTroopFromQueue: function (id) {
        var key = fn.getTroopString(id);
        if (!this._queueTraining[key]) return;

        /* Xóa lính đang luyện khỏi nhà barrack*/
        var troopType = key.substr(4, key.length - 4);

        /* thêm lính đang luyện ra nhà barrack*/
        this._barrack.onRemoveTroop(troopType-1);

        if (this._queueTraining[key] > 1) {
            this._queueTraining[key] -= 1;
            this._queueTrainingButtonList[this.getPosInQueue(id)].updateButton();
            this._timeTraining -= this.jsonTroopBase[fn.getTroopString(id)]["trainingTime"];
        } else {
            var pos = this.getPosInQueue(id);
            this.removeAtIndex(pos);
            this._trainingQueueBackground.removeChildByTag(id, false);
            delete this._queueTraining[key];
            this.updateQueueButton();
            this._trainBar.setScaleX(0);
            if (pos === 0) {
                this._timeTraining -= this._currentTrainingTime;
                this._currentTrainingTime = this._currentTrainingTimeRequired;
                this._isReleasable = true;
            }
        }

        var cost = this.getChildByTag(gv.tag.TAG_BUTTON_TROOP * id)._cost;

        cf.user._currentCapacityElixir += cost;
        cf.user.distributeResource(false, true, false);

        this._currentQueueLength -= this.jsonTroopBase[key]["housingSpace"];
        this.updateContent();
    },

    quickFinish: function(){

        for(var i=0; i<this._queueTrainingButtonList.length; i++) {

            var id = this._queueTrainingButtonList[i]._id;
            for(var j=0; j<this._queueTrainingButtonList[i]._quantity; j++) {

                var amc = this.getArmyCamp();
                if (amc._troopList == null) amc._troopList = new Array();
                var troop = new Troop(id - 1, this._barrack._row + 2, this._barrack._col + 2, amc._id);
                this.getParent()._map.addChild(troop);
                amc._troopList.push(troop);
                amc._troopQuantity += gv.json.troopBase["ARM_" + id]["housingSpace"];

            }

            this._trainingQueueBackground.removeChildByTag(id, false);
        }

        this._queueTrainingButtonList = [];
        this._queueTraining = {};
        this._timeTraining = 0;
        this._currentTrainingTime = 0;
        this._currentQueueLength = 0;

        this.updateContent();

        /* Hủy luyện quân ở nhà barrack*/
        this._barrack.onStopTraining();

        testnetwork.connector.sendQuickFinishTrain(this._barrackID);
    },

    addTouchListener: function () {
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);
    },

    onAppear: function () {
        this.visible = true;
        this.updateContent();
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function () {
        this._swallowTouch.setEnabled(false);
        this.visible = false;
    },

    update: function()
    {

    }
});