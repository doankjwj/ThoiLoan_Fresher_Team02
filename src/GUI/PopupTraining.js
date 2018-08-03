var PopupTraining = cc.Layer.extend({

    _barrackID: null,
    _bg: null,
    _colorBG: null,
    _txtTitle: null,
    _btnClose: null,

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
    _statusText: null,
    _troopListButton: null,

    _queueTraining: null,
    _queueTrainingButtonList: null,

    _bgScale: 2.5,

    ctor: function(id){
        this._barrackID = id;
        this._super();
        this.x = cc.winSize.width/2;
        this.y = cc.winSize.height/2;

        this._troopListButton = [];

        this._queueTraining = {};
        this._queueTrainingButtonList = [];
        //delete afer then

        this.initContent();
        this.initTroopListButton();
        this.init();
        this.onAppear();
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

        this._txtTitle = cc.LabelBMFont("Nhà lính số " + this._barrackID, font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 * this._bgScale - this._txtTitle.height));
        this.addChild(this._txtTitle, 1);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = this._bgScale * 0.75;
        this._btnClose.setPosition(cc.p(this._bg.width*this._bgScale/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height*this._bgScale/2 - this._btnClose.height  *this._btnClose.scale/1.5));
        this.addChild(this._btnClose, 1);

    },

    initTroopListButton: function() {

        for(var i=1; i<=17; i++) {
            if( i > 10 && i<16) continue;

            var button = new TroopButton(i);
            button.scale = 1.2;
            this.addChild(button, 2);
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

        }
    },

    init: function() {

    },

    getCurrentQueueLength: function(){
        var count = 0;
        for(var prop in this._queueTraining) {
            if(!this._queueTraining[prop]) continue;
            count += 1;
        }
        return count;
    },

    getPositionOfTroopTypeInQueue: function(id) {
        var i = 0;
        for(var prop in this._queueTraining) {
            if(!this._queueTraining[prop]) continue;
            if(prop.toString() === fn.getTroopString(id)) return i;
            i = i+1;
        }
        return -1;
    },

    updateQueue: function() {

        var queueLength = this.getCurrentQueueLength();

        for(var prop in this._queueTraining) {
            if(!this._queueTraining[prop]) continue;
            if(queueLength === 1) {

            }
        }

    },

    addTroopToQueue: function(id){

        var key = fn.getTroopString(id);

        if(!this._queueTraining[key]) {
            this._queueTraining[key] = 1;
            var button = new queueTroopButton(id);
            this._queueTrainingButtonList.push(button);
            this.updateQueue();
        }
        else {
            this._queueTraining[key] += 1;
            this._queueTrainingButtonList[this.getPositionOfTroopTypeInQueue(id)-1].updateButton();
        }

    },

    // logQueue: function() {
    //     var str = "";
    //
    //     for(var i in this._queueTraining) {
    //         str += (i + ":" +this._queueTraining[i] + " ");
    //     }
    //     cc.log(str)
    // },

    deleteTroopFromQueue: function(id){
        var key = fn.getTroopString(id);
        if(!this._queueTraining[key]) return;
        var button = this._queueTrainingButtonList[this.getPositionOfTroopTypeInQueue(id)-1]
        if(this._queueTraining[key] > 0) {
            this._queueTraining[key] -= 1;
            button.updateButton();
        }
        else if(this._queueTraining[key] === 0) {
            delete this._queueTraining[key];

            this._queueTrainingButtonList.splice(this.getPositionOfTroopTypeInQueue(id)-1, 1);
            this.updateQueue();
        }
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
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },


});