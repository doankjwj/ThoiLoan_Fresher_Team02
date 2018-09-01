var Barrack = BuildingNode.extend({
    _troopTrainingTypeArr: null,
    _troopTrainingAmountArr: null,

    //_currentTrainingTroop: null,

    /* Train Info*/
    _startTrainingTime: null,
    _requireTrainingTime: null,
    _remainTrainingTime: null,
    _finishTrainingTime: null,

    /* GUI*/
    _barTraining: null,
    _barTrainingBG: null,
    _labelTrainingTime: null,

    /*  new Train: người dùng luyện quân
        loadTrain: luyện quân dở khi mở game*/
    _trainType:
    {
        newTrain: 0,
        loadTrain: 1
    },

    ctor: function(id, level, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.barrack_1;
        this._size = gv.json.barrack[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.barrack;
        this._maxLevel = gv.buildingMaxLevel.barrack_1;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.barrack_1;
        this._name = gv.buildingName.barrack_1;
        this._description = gv.buildingDescription.barrack_1;

        this._super(id, level, row, col, existed, isActive);


        /* Add Center Building */
        this.addCenterBuilding();

        /* Init Animation If Not Exist*/
        // this.initAnimation();


        /* Add Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.scale = cf.SCALE;
        this._effectAnim.visible = false;
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        if (this.getTempLevel() >= 4 && this.getTempLevel() <=8) {
            this._effectAnim.stopAllActions();
            this.initAnimation();
            this._effectAnim.visible = true;
            this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
        };

        this.initTrainingFromServer();
    },

    updateAnim: function()
    {
        this.initAnimation();
        cc.log(this.getTempLevel());
        if (this.getTempLevel() >= 4 && this.getTempLevel() <= 8) {
            this._effectAnim.stopAllActions();
            this._effectAnim.setVisible(true);
            this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
        };
    },
    initAnimation: function()
    {
        var tmpLevel = this.getTempLevel();
        if (tmpLevel < 4) return;
        if (cf.animationBarrack[tmpLevel] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_barrack_1_" + tmpLevel +".plist", res.folder_effect + "effect_barrack_1_" + tmpLevel +".png");
            cf.animationBarrack[tmpLevel] = fn.getAnimation("effect_barrack_1_" + tmpLevel + " ", 1, 6);
            cf.animationBarrack[tmpLevel].retain();
        }
    },
    getTrainingLayer: function(){

        var layer = new PopupTraining(this._id);
        layer.setTag((this._id%100)*gv.tag.TAG_POPUP_TRAINING);
        return layer;

    },

    /* Load thông tin huấn luyện đang dở từ server*/
    initTrainingFromServer: function()
    {
        if (!(gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]))
            return;
        if (gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]["startTrainingTime"] == 0)
            return;

        this.initTrainingQueue(this._trainType.loadTrain);

        this.onStartTraining(this._trainType.loadTrain);

        this.initEffectTraining();
        this.onRunEffectTraining();

        this.initTrainingGUI();
        this.onRunTrainingGUI();


    },

    /* Khởi tạo danh sách lính đang luyện và thời gian bắt đầu luyện*/
    initTrainingQueue: function(trainType)
    {
        this._troopTrainingTypeArr = [];
        this._troopTrainingAmountArr = [];

        if (trainType == this._trainType.loadTrain)
        {
            var jsonCurrentBarrack = gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()];
            var jsonTroopQueueType = jsonCurrentBarrack["trainingTroopTypes"];
            var jsonTroopQueueAmout = jsonCurrentBarrack["trainingQueue"];


            for (var i=0; i< jsonTroopQueueType.length; i++)
            {
                this._troopTrainingTypeArr.push(jsonTroopQueueType[i]);
                this._troopTrainingAmountArr.push(jsonTroopQueueAmout[i]);
            };
        }
        else
        {

        }
    },
    getCurrentTroop: function()
    {
        if (this._troopTrainingAmountArr[0] == 0) return null;
        return (this._troopTrainingTypeArr[0]);
    },

    /* Hiển thị phần vòng sáng xoay xoay trước của nhà barrach*/
    initEffectTraining: function()
    {
        if (this._effectTraining) return;

        this._effectTraining = cc.Sprite(res.tmp_effect);
        this._effectTraining.setAnchorPoint(0, 0.8);
        this._effectTraining.setVisible(false);
        this.addChild(this._effectTraining, this._center_building.getLocalZOrder() + 1);
        if (!cf.animationBarrackWorking)
        {
            cc.spriteFrameCache.addSpriteFrames(folder_effect + "effect_barrack_working.plist", folder_effect + "effect_barrack_working.png");
            cf.animationBarrackWorking = fn.getAnimation("effect_barrack_working ", 1, 5);
            cf.animationBarrackWorking.retain();
        };
    },
    onRunEffectTraining: function()
    {
        this._effectTraining.runAction(cf.animationBarrackWorking.clone().repeatForever());
        this._effectTraining.setVisible(true);
    },
    onStopEffectTraining: function()
    {
        this._effectTraining.setVisible(false);
        this._effectTraining.stopAllActions();
    },

    /* Hiển thị hình ảnh lính và thanh thời gian*/
    initTrainingGUI: function()
    {
        if (this._iconTroop) return;

        this._iconTroop = cc.Sprite(guiFolder + "train_troop_gui/small_icon/ARM_" + (this._troopTrainingTypeArr[0]+ 1) + ".png");
        this._iconTroop.setScale(0.9);
        this._iconTroop.setPosition(-70, 80);
        this.addChild(this._iconTroop, this._center_building.getLocalZOrder()+ 1);

        this._barTrainingBG = cc.Sprite(trainingGUI.bgTrainBar);
        this._barTrainingBG.setAnchorPoint(0, 0.5);
        this._barTrainingBG.setPosition(-40, 80);
        this.addChild(this._barTrainingBG, this._iconTroop.getLocalZOrder());

        this._barTraining = cc.Sprite(trainingGUI.trainBar);
        this._barTraining.setAnchorPoint(0, 0.5);
        this._barTraining.setPosition(-40, 80);
        this.addChild(this._barTraining, this._iconTroop.getLocalZOrder());

        this._labelTrainingTime = cc.LabelBMFont("Time remain", font.fista24);
        this._labelTrainingTime.setScale(1.25);
        this._labelTrainingTime.setPosition(0, 110);
        this.addChild(this._labelTrainingTime, this._iconTroop.getLocalZOrder());
    },
    onRunTrainingGUI: function()
    {

    },
    onStopTrainingDetail: function()
    {

    },

    /* Cập nhật trạng thái luyệ quân*/
    loadNewTrain: function(trainType)
    {
        if (trainType == this._trainType.loadTrain)
            this._startTrainingTime = gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]["startTrainingTime"];
        else
            this._startTrainingTime = new Date().getTime();
        this._requireTrainingTime = gv.json.troopBase["ARM_" + (this.getCurrentTroop()+1)]["trainingTime"]*1000;
        this._finishTrainingTime = this._startTrainingTime + this._requireTrainingTime;
    },
    onStartTraining: function(trainType)
    {
        this.loadNewTrain(trainType);
        this.schedule(this.updateTraining, 1);
    },
    updateTraining: function()
    {
        this._remainTrainingTime = this._finishTrainingTime - new Date().getTime();
        if (this._remainTrainingTime <= 0)
        {
            this.releaseTroop();
            if (this.getCurrentTroop() == null)
            {
                this.onStopTraining();
            }
            else
            {


            }
        };

        cc.log(this._remainTrainingTime + " : " + this._requireTrainingTime);
        this._labelTrainingTime.setString(cf.secondsToLongTime(Math.floor(this._remainTrainingTime/1000)));
        cc.log((this._requireTrainingTime - this._remainTrainingTime)/this._requireTrainingTime);
        this._barTraining.setTextureRect(cc.rect(0, 0, (this._requireTrainingTime - this._remainTrainingTime)/this._requireTrainingTime*69, 18));
    },
    releaseTroop: function()
    {
        this._troopTrainingAmountArr[0] --;
        if (this._troopTrainingAmountArr[0] == 0)
        {
            this._troopTrainingAmountArr.remove(0);
            this._troopTrainingTypeArr.remove(0);
        };

        // Release Troop Here
    },
    onStopTraining: function()
    {
        this.unschedule(this.updateTraining());
        this._effectTraining.stopAllActions();
        this._iconTroop.setVisible(false);
        this._barTraining.setVisible(false);
        this._barTrainingBG.setVisible(false);
    }
})