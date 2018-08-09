var PopupTraining = cc.Layer.extend({
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

    _troopListButton: null,



    _currentTrainingTime: null,
    _currentTrainingTimeText: null,
    _currentTrainingTimeRequired: null,

    _queueLengthMax: null,
    _currentQueueLength: null,
    _queueLengthText: null,

    _queueTraining: null,
    _queueTrainingButtonList: null,

    jsonTroopBase: null,
    jsonTroop:  null,

    _bgScale: 2.5,

    ctor: function(barID){
        this._barrackID = barID;
        this._barrack = cf.user._buildingList[Math.floor(barID/100)-1][gv.building_selected % 100];
        this._super();
        this.x = cc.winSize.width/2;
        this.y = cc.winSize.height/2;

        this._troopListButton = [];

        this._timeTraining = 0;
        this._currentTrainingTime = 0;
        this._currentTrainingTimeRequired = 0;

        this._queueTraining = {};
        this._queueTrainingButtonList = [];
        this._currentQueueLength = 0;
        this._queueLengthMax = gv.json.barrack[gv.buildingSTR.barrack_1][this._barrack._level]["queueLength"];

        this.jsonTroopBase = gv.json.troopBase;
        this.jsonTroop = gv.json.troop;

        this.initContent();
        this.initTroopListButton();
        this.init();
        this.onDisappear();
    },

    updateContent: function() {
        this._txtTitle.setString("Nhà lính số " + (this._barrackID % 100 + 1));
        this._queueLengthMax = gv.json.barrack[gv.buildingSTR.barrack_1][this._barrack._level]["queueLength"];
        this._queueLengthText.setString("("+this._currentQueueLength+"/"+this._queueLengthMax+")");
        for(var i=1; i<=17; i++) {
            if( i > 10 && i<16) continue;
            var button = this.getChildByTag(gv.tag.TAG_BUTTON_TROOP*i);
            if(button._barrackLevelReq > this._barrack._level || this._currentQueueLength + button._space > this._queueLengthMax) {
                button.setTouchEnabled(false);
                button.setEnabled(false);
                button.setBright(false);
                var act = cc.tintTo(0, 127.5, 127.5, 127.5 );
                act.retain();
                button._troopIcon.runAction(act.clone());
            } else {
                button.setTouchEnabled(true);
                button.setEnabled(true);
                button.setBright(true);
                var act = cc.tintTo(0, 255, 255, 255);
                act.retain();
                button._troopIcon.runAction(act.clone());
                if(button._cost > cf.user._currentCapacityElixir) {
                    button._costText.setColor(cc.color.RED);
                }
                else button._costText.setColor(cc.color.WHITE);
            }

        }

        if(this._queueTrainingButtonList.length !== 0){
            this._queueArrow.visible = true;
            this._textTime.visible = true;
            this._quickFinishButton.visible = true;
            this._textTimeLabel.visible = true;
            this._bgTrainBar.visible = true;
            this._trainBar.visible = true;
            this._currentTrainingTimeText.visible = true;
            this._textTimeLabel.setString(cf.secondsToLongTime(this._timeTraining));
            this._currentTrainingTimeText.setString(cf.secondsToLongTime(this._currentTrainingTime));
            this._currentTrainingTimeRequired = this.jsonTroopBase[fn.getTroopString(this._queueTrainingButtonList[0]._id)]["trainingTime"];
        }
        else {
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

    updateStatus: function(){
        if(!this._barrack._is_active) return;
        if(this._timeTraining > 0) this._timeTraining -= 1;
        if(this._currentTrainingTime > 0 ) {
            this._currentTrainingTime -= 1;
            this._trainBar.setScaleX((this._currentTrainingTimeRequired-this._currentTrainingTime)/this._currentTrainingTimeRequired);
            if (this._currentTrainingTime === 0 && this._queueTrainingButtonList.length !== 0) {
                this.finishingTroop(this._queueTrainingButtonList[0]._id);
                this._trainBar.setScaleX(0);
            }
        }

        this._textTimeLabel.setString(cf.secondsToLongTime(this._timeTraining));
        this._currentTrainingTimeText.setString(cf.secondsToLongTime(this._currentTrainingTime));
        // if(this._currentTrainingTime !== 0) cc.log("CURRENT " + this._currentTrainingTime);

    },

    finishingTroop: function(id) {

        var key = fn.getTroopString(id);
        if(!this._queueTraining[key]) return;
        cc.log("FINISH TROOP " + key);
        if(this._queueTraining[key] > 1) {
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

    initContent: function() {

        this._bg = cc.Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.scale = this._bgScale;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        this._trainingQueueBackground = cc.LayerColor(cc.color(255, 255, 255, 255));
        this.addChild(this._trainingQueueBackground, 1);
        this._trainingQueueBackground.width = this._bg.width*this._bg.scale*0.9;
        this._trainingQueueBackground.height = this._bg.height/4*this._bg.scale;
        this._trainingQueueBackground.x = -this._bg.width/2*this._bg.scale*0.9;
        this._trainingQueueBackground.y = this._bg.height/12*this._bg.scale;
        // this._trainingQueueBackground.visible = false;

        //the green arrow

        this._queueArrow = cc.Sprite(trainingGUI.queueArrow);
        this._queueArrow.attr({ x: this._trainingQueueBackground.width/3, y: this._trainingQueueBackground.height/2});
        this._queueArrow.setScale(1.5);
        this._trainingQueueBackground.addChild(this._queueArrow, 2);
        // this._queueArrow.visible = false;

        this._txtTitle = cc.LabelBMFont("Nhà lính số " + this._barrackID%100, font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 * this._bgScale - this._txtTitle.height));
        this.addChild(this._txtTitle, 1);

        this._queueLengthText = cc.LabelBMFont("", font.soji20);
        this._queueLengthText.setAnchorPoint(cc.p(0.5, 0.5));
        this._queueLengthText.setPosition(this._txtTitle.x, this._txtTitle.y - this._txtTitle.height);
        this.addChild(this._queueLengthText, 1);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = this._bgScale * 0.75;
        this._btnClose.setPosition(cc.p(this._bg.width*this._bgScale/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height*this._bgScale/2 - this._btnClose.height  *this._btnClose.scale/1.5));
        this.addChild(this._btnClose, 1);
        this._btnClose.addTouchEventListener(function(sender, type) {

            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    sender.setScale(sender.scale*1.1);
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    sender.setScale(sender.scale/1.1);
                    this.onDisappear();
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    sender.setScale(sender.scale/1.1);
                    break;
            }

        }, this);

        this._quickFinishButton = ccui.Button(trainingGUI.buttonIcon);
        this._quickFinishButton.setAnchorPoint(cc.p(0.5, 0.5));
        this._quickFinishButton.x = this._trainingQueueBackground.width - this._quickFinishButton.width/2 - 20;
        this._quickFinishButton.y = this._quickFinishButton.height/2;
        this._trainingQueueBackground.addChild(this._quickFinishButton, 4);
        var text = cc.LabelBMFont("Hoàn thành ngay:",font.soji20);
        text.setAnchorPoint(cc.p(0.5, 0.5));
        text.scale = 0.7;
        // text.setColor(cc.color(165,42,42, 255));
        text.setPosition(cc.p(this._quickFinishButton.width/2, this._quickFinishButton.height + 5 + text.height/2*text.scale));
        this._quickFinishButton.addChild(text, 1);

        this._textTime = cc.LabelBMFont("Tổng thời gian", font.soji20);
        this._textTime.scale = 0.7;
        this._textTime.x = this._quickFinishButton.x;
        this._textTime.y = this._trainingQueueBackground.height - this._textTime.height/2;
        this._trainingQueueBackground.addChild(this._textTime, 4);


        this._textTimeLabel = cc.LabelBMFont("1", font.soji20);
        this._textTimeLabel.scale = 1;
        this._textTimeLabel.x = this._textTime.x;
        this._textTimeLabel.y = this._textTime.y - this._textTimeLabel.height*this._textTimeLabel.scale - 10;
        this._trainingQueueBackground.addChild(this._textTimeLabel, 4);

        this._trainBar = cc.Sprite(trainingGUI.trainBar);
        this._bgTrainBar = cc.Sprite(trainingGUI.bgTrainBar);

        this._trainBar.setAnchorPoint(cc.p(0.5, 0.5));
        this._bgTrainBar.setAnchorPoint(cc.p(0.5, 0.5));

        this._bgTrainBar.x = this._trainingQueueBackground.width*5/7 + 40;
        this._bgTrainBar.y = this._quickFinishButton.y;
        this._trainingQueueBackground.addChild(this._bgTrainBar, 3);

        this._trainBar.x = this._bgTrainBar.x - this._trainBar.width/2 + 2.5;
        this._trainBar.y = this._bgTrainBar.y;
        this._trainBar.setScaleX(0);
        this._trainBar.setAnchorPoint(cc.p(0, 0.5));
        this._trainingQueueBackground.addChild(this._trainBar, 4);

        this._currentTrainingTimeText = cc.LabelBMFont("", font.soji20);
        this._currentTrainingTimeText.setAnchorPoint(cc.p(0.5, 0.5));
        this._currentTrainingTimeText.scale = 0.5;
        this._currentTrainingTimeText.setPosition(cc.p(this._bgTrainBar.x, this._bgTrainBar.y - this._bgTrainBar.height/2));
        this._trainingQueueBackground.addChild(this._currentTrainingTimeText, 5);

        this._previousBarrack = ccui.Button(trainingGUI.previousIcon);
        this._previousBarrack.setAnchorPoint(cc.p(0.5, 0.5));
        this._previousBarrack.setPosition(cc.p(this._bg.x - this._bg.width*this._bg.scale/2 - 20, this._bg.y));
        this.addChild(this._previousBarrack, 1);

        this._previousBarrack.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var barrackListSize = cf.user._buildingListCount[this._barrack._orderInUserBuildingList];
                    var previousBarrackID = (this._barrackID % 100 - 1);
                    while(previousBarrackID < 0) previousBarrackID += barrackListSize;
                    previousBarrackID =  previousBarrackID % barrackListSize;
                    var previousBarrackFullID = this._barrackID - this._barrackID%100 + previousBarrackID;
                    var previousBarrack = cf.user._buildingList[Math.floor(previousBarrackFullID/ 100) - 1][previousBarrackFullID % 100];

                    while(!previousBarrack._is_active){
                        previousBarrackID -= 1;
                        previousBarrackFullID = this._barrackID - this._barrackID%100 + previousBarrackID;
                        previousBarrack = cf.user._buildingList[Math.floor(previousBarrackFullID/ 100) - 1][previousBarrackFullID % 100];
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
        this._nextBarrack.setPosition(cc.p(this._bg.x + this._bg.width*this._bg.scale/2 + 20, this._bg.y));
        this.addChild(this._nextBarrack, 1);

        this._nextBarrack.addTouchEventListener(function(sender, type) {
            switch (type){
                case ccui.Widget.TOUCH_BEGAN:
                    break;
                case ccui.Widget.TOUCH_MOVED:
                    break;
                case ccui.Widget.TOUCH_ENDED:
                    var barrackListSize = cf.user._buildingListCount[this._barrack._orderInUserBuildingList];
                    var previousBarrackID = (this._barrackID % 100  + 1);
                    while(previousBarrackID < 0) previousBarrackID += barrackListSize;
                    previousBarrackID %= barrackListSize;
                    break;
                case ccui.Widget.TOUCH_CANCELED:
                    break;
            }
        }, this);



    },

    initTroopListButton: function() {

        for(var i=1; i<=17; i++) {
            if( i > 10 && i<16) continue;
            var button = new TroopButton(i);
            button.scale = 1.2;
            this.addChild(button, 2, gv.tag.TAG_BUTTON_TROOP*i);
            if (i <= 6 ) {
                button.x = -this._bg.width * this._bgScale / 2 + i * button.width * button.scale + 5;
                button.y = this._trainingQueueBackground.y - button.height * button.scale / 2 - 20;
            }
            else {
                var j = i;
                if(j === 16) j = 5;
                else if(j === 17) j = 6;
                else j-= 6;
                button.x = -this._bg.width*this._bgScale/2 + j*button.width*button.scale + 5;
                button.y = this._trainingQueueBackground.y - button.height * button.scale / 2 - 20 - button.height * button.scale;
            }
            if(button._barrackLevelReq > this._barrack._level) {

                button.setTouchEnabled(false);
                button.setEnabled(false);
                button.setBright(false);
                var act = cc.tintTo(0, 127.5, 127.5, 127.5 );
                act.retain();
                button._troopIcon.runAction(act.clone());

            }
        }
    },

    init: function() {
        this.schedule(this.updateStatus, 1);
    },

    getQueueSize: function(){
        var i = 0;
        for(var prop in this._queueTraining) {
            if(!this._queueTraining[prop]) continue;
            i = i+1;
        }
        return i;
    },

    getPosInQueue: function(id) {
        var i = 0;
        for(var prop in this._queueTraining) {
            if(!this._queueTraining[prop]) continue;
            if(prop.toString() === fn.getTroopString(id)) return i;
            i = i+1;
        }
        return -1;
    },

    updateQueueButton: function() {
        this.updateContent();
        for(var j=0; j<this._queueTrainingButtonList.length; j++) {

            this._queueTrainingButtonList[j].setButtonPosition(j+1);
        }
    },

    addTroopToQueue: function(id){

        var key = fn.getTroopString(id);

        if(!this._queueTraining[key]) {
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

    logQueue: function() {
        var str = "";

        for(var i in this._queueTraining) {
            str += (i + ":" +this._queueTraining[i] + " ");
        }
        cc.log(str);
    },

    removeAtIndex: function(id){

        for(var j = 0; j<this._queueTrainingButtonList.length; j++){
            if(j < id) continue;
            else {
                this._queueTrainingButtonList[j] = this._queueTrainingButtonList[j+1];
            }
        }

        this._queueTrainingButtonList.splice(this._queueTrainingButtonList.length-1, 1);

    },

    deleteTroopFromQueue: function(id){
        var key = fn.getTroopString(id);
        if(!this._queueTraining[key]) return;
        if(this._queueTraining[key] > 1) {
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
            if(pos === 0) {
                this._timeTraining -= this._currentTrainingTime;
                this._currentTrainingTime = this._currentTrainingTimeRequired;
            }
        }
        this._currentQueueLength -= this.jsonTroopBase[key]["housingSpace"];
        this.updateContent();
    },

    addTouchListener: function () {
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);
    },

    onAppear: function() {
        this.visible = true;
        this.updateContent();
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
        this.visible = false
    },


});