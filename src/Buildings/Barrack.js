var Barrack = BuildingNode.extend({
    _troopTrainingTypeArr: [],
    _troopTrainingAmountArr: [],
    _currentTrainingTroop: null,

    /* Train Info*/
    _startTrainingTime: null,
    _requireTrainingTime: null,
    _remainTrainingTime: null,
    _finishTrainingTime: null,

    /* GUI*/
    _barTraining: null,
    _barTrainingBG: null,
    _labelTrainingTime: null,
    _popUpFull: null,

    /*  new Train: người dùng luyện quân
        loadTrain: luyện quân dở khi mở game*/
    _trainType:
    {
        newTrain: 0,
        loadTrain: 1
    },

    /* Trạng thái luyện quân*/
    _isTraining: null,

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

        /* Add Effect */
        this.updateAnim();

        if (this._isActive)
            this.initTrainingFromServer();
    },
    updateAnim: function()
    {
        this.initAnimation();

        if (!this._effectAnim)
        {
            this._effectAnim = cc.Sprite(res.tmp_effect);
            this._effectAnim.anchorX = 0.5;
            this._effectAnim.anchorY = 0.5;
            this._effectAnim.scale = cf.SCALE;
            this._effectAnim.visible = false;
            this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
            //if (this.getTempLevel() >= 4 && this.getTempLevel() <=8) {
            //    this._effectAnim.stopAllActions();
            //    this.initAnimation();
            //    this._effectAnim.visible = true;
            //    this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
            //};
        }


        if (this.getTempLevel() >= 4 && this.getTempLevel() <= 8) {
            this._effectAnim.stopAllActions();
            this._effectAnim.setVisible(true);
            this._effectAnim.runAction(cf.animationBarrack[this.getTempLevel()].clone().repeatForever());
        };
    },
    /* Hiệu ứng lá cờ lúc bình thường*/
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

    //===========    LUYỆN LÍNH
    /* Load thông tin huấn luyện đang dở từ server*/
    initTrainingFromServer: function()
    {
        if (!(gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]))
            return;
        if (gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]["startTrainingTime"] == 0)
            return;

        this.initTrainingQueue(this._trainType.loadTrain);
        this.initEffectTraining();
        this.loadNewTrain(this._trainType.loadTrain);
        this.onVisibleEffectTrainTroop(true);
        this.onStartTraining(this._trainType.loadTrain);
    },
    /* Khởi tạo danh sách lính đang luyện*/
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

        };

        this._currentTrainingTroop = this._troopTrainingTypeArr[0];
    },
    /* Hiệu ứng vòng sáng xoay xoay và ảnh lính, thanh thời gian lúc luyện lính*/
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

        if (this._iconTroop) return;

        this._iconTroop = cc.Sprite(guiFolder + "train_troop_gui/small_icon/ARM_" + (this._troopTrainingTypeArr[0]+ 1) + ".png");
        this._iconTroop.setScale(0.9);
        this._iconTroop.setPosition(-70, 80);
        this._iconTroop.setVisible(false);
        this.addChild(this._iconTroop, this._center_building.getLocalZOrder()+ 1);

        this._barTrainingBG = cc.Sprite(trainingGUI.bgTrainBar);
        this._barTrainingBG.setAnchorPoint(0, 0.5);
        this._barTrainingBG.setPosition(-40, 80);
        this._barTrainingBG.setVisible(false);
        this.addChild(this._barTrainingBG, this._iconTroop.getLocalZOrder());

        this._barTraining = cc.Sprite(trainingGUI.trainBar);
        this._barTraining.setAnchorPoint(0, 0.5);
        this._barTraining.setPosition(-40, 80);
        this._barTraining.setVisible(false);
        this.addChild(this._barTraining, this._iconTroop.getLocalZOrder());

        this._labelTrainingTime = cc.LabelBMFont("Time remain", font.fista24);
        this._labelTrainingTime.setScale(1.25);
        this._labelTrainingTime.setPosition(0, 110);
        this._labelTrainingTime.setVisible(false);
        this.addChild(this._labelTrainingTime, this._iconTroop.getLocalZOrder());
    },
    getCurrentTroop: function()
    {
        if (this._troopTrainingTypeArr.length == 0) return null;
        return (this._troopTrainingTypeArr[0]);
    },
    /* lấy ra 1 đơn vị lính mới trong hàng đợi*/
    loadNewTrain: function(trainType)
    {
        if (trainType == this._trainType.loadTrain)
            this._startTrainingTime = gv.jsonInfo["map"]["BAR_1"][this.getBuildingOrder()]["startTrainingTime"];
        else
            this._startTrainingTime = new Date().getTime();
        this._requireTrainingTime = gv.json.troopBase["ARM_" + (this.getCurrentTroop()+1)]["trainingTime"]*1000;
        this._finishTrainingTime = this._startTrainingTime + this._requireTrainingTime;
        this._labelTrainingTime.setString(cf.secondsToLongTime(Math.floor((this._finishTrainingTime - this._startTrainingTime)/1000)));
        fn.replaceSpriteImage(this._iconTroop, guiFolder + "train_troop_gui/small_icon/ARM_" + (this.getCurrentTroop() + 1) + ".png")
    },
    onStartTraining: function(trainType)
    {
        this._isTraining = true;
        this.schedule(this.updateTraining, 0.5);
    },
    updateTraining: function()
    {
        this._remainTrainingTime = this._finishTrainingTime - new Date().getTime();
        if (this._remainTrainingTime <= 0)
        {
            if (this.checkreleaseAble())
            {
                this.releaseTroop();
                if (this.getCurrentTroop() == null)
                    this.onStopTraining();
                else
                {
                    this.loadNewTrain(this._trainType.newTrain);
                    if (this._currentTrainingTroop != this.getCurrentTroop())
                        fn.replaceSpriteImage(this._iconTroop, guiFolder + "train_troop_gui/small_icon/ARM_" + (this.getCurrentTroop()+1) + ".png");
                    this._currentTrainingTroop = this.getCurrentTroop();
                }
                this._barTraining.setTextureRect(cc.rect(0, 0, 0, 18));
            }
            else
            {
                this.onPopUpFull();
                this.onPauseTraining(false);
            }
        }
        else
        {
            this._labelTrainingTime.setString(cf.secondsToLongTime(Math.floor(this._remainTrainingTime / 1000)));
            this._barTraining.setTextureRect(cc.rect(0, 0, (this._requireTrainingTime - this._remainTrainingTime) / this._requireTrainingTime * 69, 18));
        }
    },
    checkreleaseAble: function()
    {
        var housingSpaceAvaiable = cf.user.getMaxTroopHousingSpace() - cf.user.getCurrentTroopHousingSpace();
        if (fn.getTroopHousingSpace(this.getCurrentTroop() + 1) > housingSpaceAvaiable) return false;
        return true;
    },
    releaseTroop: function()
    {
        var troopType = this.getCurrentTroop()+1;
        this._troopTrainingAmountArr[0] --;
        if (this._troopTrainingAmountArr[0] == 0)
        {
            this._troopTrainingAmountArr.splice(0, 1);
            this._troopTrainingTypeArr.splice(0, 1);
        };

        // Release Troop Here

        /* Đưa lính vào trại*/
        if (this._troopList == null)
            this._troopList = new Array();
        var amc = fn.getArmyCamp();
        var troop = new Troop(troopType - 1, this._row + 2, this._col + 2, amc._id);
        this.getParent().addChild(troop);
        amc._troopList.push(troop);
        amc._troopQuantity += gv.json.troopBase["ARM_" + troopType]["housingSpace"];

        /* Tăng số lượng lính của người chơi*/
        cf.user.editTroop(troopType-1, 1);
    },
    quickFinishTrain: function()
    {

    },
    onStopTraining: function(boo)
    {
        if (!boo) boo = false;
        this._isTraining = false;
        this.unschedule(this.updateTraining);
        this.onVisibleEffectTrainTroop(boo);
        this._troopTrainingAmountArr = [];
        this._troopTrainingTypeArr = [];
    //    Cập nhật nút rảnh ở đây
    },
    onPauseTraining: function(boo)
    {
        this._isTraining = false;
        this.onVisibleEffectTrainTroop(boo)
        this.unschedule(this.updateTraining);
    },
    onResumTraining: function()
    {

    },
    onPopUpFull: function()
    {
        this._iconStatus._str.setString("Đầy !!");
        this._iconStatus.setVisible(true);
    },
    onVisibleEffectTrainTroop: function(boo)
    {
        this._effectTraining.stopAllActions();
        if (boo)
            this._effectTraining.runAction(cf.animationBarrackWorking.clone().repeatForever());
        this._effectTraining.setVisible(boo);
        this._iconTroop.setVisible(boo);
        this._barTraining.setVisible(boo);
        this._barTrainingBG.setVisible(boo);
        this._labelTrainingTime.setVisible(boo);
    },
    /* Thêm lính vào hàng chờ*/
    onAddTroop: function(troopType)
    {
        if (!this._isTraining)
            this.initTrainingQueue(this._trainType.newTrain);

        var index = this._troopTrainingTypeArr.indexOf(troopType);
        if (index != -1)
            this._troopTrainingAmountArr[index] ++;
        else
        {
            this._troopTrainingTypeArr.push(troopType);
            this._troopTrainingAmountArr.push(1);
        };

        if (!this._isTraining)
        {
            this.initEffectTraining();
            this.onVisibleEffectTrainTroop(true);
            this.loadNewTrain(this._trainType.newTrain);
            this.onStartTraining(this._trainType.newTrain);
        }
    },
    /* Xóa lính khỏi hàng chờ*/
    onRemoveTroop: function(troopType)
    {
        var index = this._troopTrainingTypeArr.indexOf(troopType);
        if (index == -1) return;
        var newTroopAmount = this._troopTrainingAmountArr[index] - 1;
        if (newTroopAmount < 0) newTroopAmount = 0;
        this._troopTrainingAmountArr[index] = newTroopAmount;

        if (!this.getCurrentTroop())
            this.onStopTraining();
    }

})