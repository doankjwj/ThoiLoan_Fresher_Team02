var Resource = BuildingNode.extend({
    _currentCapacity: 0,
    _maxCapacity: 0,
    _productivity: null,
    _percentPopupHarvest: 0.001,
    _capacityIsFulled: false,
    _lastHarvestTime: null,

    _btnHarvest: null,
    _btnHarvestBG: null,

    _TAG_BUTTON_HARVEST: 6252,
    _TAG_BUTTON_HARVEST_BG: 4534,
    _resType: null,

    _timeRefresh: 0.25,

    resStatus:
    {
        none: 0,
        normal: 1,
        full: 2,
    },

    /*time out cho đẩy lên nút thu hoạch*/
    _timeOutNormal: null,
    _timeOutFull: null,

    ctor: function(id, level, row, col, existed, isActive, buildingSTR)
    {
        this._buildingSTR = buildingSTR;
        this._size = gv.json.resource[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.resource;
        switch (buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                this._maxLevel = gv.buildingMaxLevel.resource_1;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_1;
                this._name = gv.buildingName.resource_1;
                this._description = gv.buildingDescription.resource_1;
                this._resType = cf.resType.resource_1;
                break;
            case gv.buildingSTR.resource_2:
                this._maxLevel = gv.buildingMaxLevel.resource_2;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_2;
                this._name = gv.buildingName.resource_2;
                this._description = gv.buildingDescription.resource_2;
                this._resType = cf.resType.resource_2;
                break;
            case gv.buildingSTR.resource_3:
                this._maxLevel = gv.buildingMaxLevel.resource_3;
                this._orderInUserBuildingList = gv.orderInUserBuildingList.resource_3;
                this._name = gv.buildingName.resource_3;
                this._description = gv.buildingDescription.resource_3;
                this._resType = cf.resType.resource_3
                break;
        }

        this._super(id, level, row, col, existed, isActive);

        this.addCenterBuilding();
        this.initHarvestButton();

        /* Init Animation If Not Exist*/
        this.initAnimation();
        /* Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;

        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        this._effectAnim.runAction(((this._buildingSTR == gv.buildingSTR.resource_1) ? cf.animationRes1[this.getTempLevel()].clone() : cf.animationRes2[this.getTempLevel()]).clone().repeatForever());

        if (this._isActive) this.initCapacity();
    },
    updateAnim: function()
    {
        this.initAnimation();
        this._effectAnim.stopAllActions();
        this._effectAnim.runAction(((this._buildingSTR == gv.buildingSTR.resource_1) ? cf.animationRes1[this.getTempLevel()].clone() : cf.animationRes2[this.getTempLevel()]).clone().repeatForever());
    },
    initAnimation: function()
    {
        var tmpLevel = this.getTempLevel();
        if (this._buildingSTR == gv.buildingSTR.resource_1 && cf.animationRes1[tmpLevel] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + tmpLevel + ".plist", res.folder_effect + "effect_res_1_" + tmpLevel + ".png");
            cf.animationRes1[tmpLevel] = fn.getAnimation("effect_res_1_" + tmpLevel + " ", 1, 10);
            cf.animationRes1[tmpLevel].retain();
        }

        if (this._buildingSTR == gv.buildingSTR.resource_2 && cf.animationRes2[tmpLevel] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + tmpLevel + ".plist", res.folder_effect + "effect_res_2_" + tmpLevel + ".png");
            cf.animationRes2[tmpLevel] = fn.getAnimation("effect_res_2_" + tmpLevel + " ", 1, 10);
            cf.animationRes2[tmpLevel].retain();
        }
    },

    getMaxCapacity: function()
    {
        return this._maxCapacity;
    },
    getCurrentCapacity: function()
    {
        return this._currentCapacity;
    },
    setcurrentCapacity: function(amount)
    {
        this._currentCapacity = amount;
    },
    getProductivity: function()
    {
        return this._productivity;
    },

    initCapacity: function()
    {
        this._productivity = gv.json.resource[this._buildingSTR][this.getTempLevel()]["productivity"];
        this._maxCapacity = gv.json.resource[this._buildingSTR][this.getTempLevel()]["capacity"];
    },
    initHarvestButton: function()
    {
        /* Button tài nguyên */
        if (this._btnHarvest)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST);
        switch (this._buildingSTR)
        {
            case gv.buildingSTR.resource_1:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_1.png");
                break;
            case gv.buildingSTR.resource_2:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_2.png");
                break;
            case gv.buildingSTR.resource_3:
                this._btnHarvest = ccui.Button(res.folder_gui_collect_res + "RES_3.png");
                break;
        };
        this._btnHarvest.setAnchorPoint(0.5, 0.5);
        this._btnHarvest.setPosition(0, this._btnHarvest.height * 1.5);
        this._btnHarvest.visible = false;
        this.addChild(this._btnHarvest, this._gui_commit_build.getLocalZOrder() + 1, this._TAG_BUTTON_HARVEST);
        var self = this;
        this._btnHarvest.addClickEventListener(function(){
            self.onHarvest(true);
        }.bind(this));

        /* Nền Button */
        this.initButtonHarvestBG();
    },
    initButtonHarvestBG: function()
    {
        if (this._capacityIsFulled == (this._currentCapacity == this._maxCapacity)) return;
        if (this._btnHarvestBG)
            this.removeChildByTag(this._TAG_BUTTON_HARVEST_BG);
        if (!this._capacityIsFulled)
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "collect_bg.png");
        else
            this._btnHarvestBG = cc.Sprite(res.folder_gui_collect_res + "full_bg.png");
        this._btnHarvestBG.setAnchorPoint(0.5, 0.5);
        this._btnHarvestBG.setPosition(this._btnHarvest.x, this._btnHarvest.y - 3);
        this._btnHarvestBG.visible = false;
        this.addChild(this._btnHarvestBG, this._btnHarvest.getLocalZOrder() - 1, this._TAG_BUTTON_HARVEST_BG);
    },

    /*Bắt đầu khai thác*/
    onStartCollect: function()
    {
        this.onResetCapacity();
        this.onVisibleButtonHarvest(false);
        if (this._timeOutNormal)
            clearInterval(this._timeOutNormal);
        if (this._timeOutFull)
            clearInterval(this._timeOutFull);

        var timeToNormal    = this.getTimeToNormal();
        var timeToFull      = this.getTimeToFull();

        var self = this;
        this._timeOutNormal = setTimeout(function(){
            self.onPopUpHarvestButton();
        }, timeToNormal);
        this._timeOutFull   = setTimeout(function(){
            self.onSetButtonHarvestBG(self.resStatus.full);
        }, timeToFull);
    },
    onVisibleButtonHarvest: function(boo)
    {
        this._btnHarvest.setVisible(boo);
        this._btnHarvestBG.setVisible(boo);
    },
    getTimeToNormal: function()         // Thời gian để đủ phần trăm, đon vị mili giây
    {
        var timeToNormal = this.getMaxCapacity()*this._percentPopupHarvest/this.getProductivity()*60*60*1000 - (new Date().getTime() - this._lastHarvestTime);
        return Math.max(0, timeToNormal);
    },
    getTimeToFull: function()           // Thời gian để hiển thị lên là đầy, đon vị mili giây
    {
        var timeToFull;
        var resAvaiable = cf.user.getAvaiableCapacity(this._resType);
        this.onUpdateCurrentCapacity();
        var resToFull = resAvaiable - this.getCurrentCapacity();
        timeToFull = resToFull/this.getProductivity()*60*60*1000;
        return Math.max(0, timeToFull);
    },

    /* thay đổi nút thu hoạch sang đỏ khi kho chứa tương ứng thay đổi*/
    onManualSetTimeOutPopUpRedButton: function()
    {
        this.onSetButtonHarvestBG(this.resStatus.normal);
        var timeToFull      = this.getTimeToFull();
        timeToFull      = Math.max(0, timeToFull);
        if (this._timeOutFull)
            clearInterval(this._timeOutFull);
        var self = this;
        this._timeOutFull   = setTimeout(function(){
            self.onSetButtonHarvestBG(self.resStatus.full);
        }, timeToFull);
    },

    /* Cập nhật tài nguyên kho hiện tại*/
    onUpdateCurrentCapacity: function()
    {
        if (this._isActive)
        {
            var timeDistance = (new Date().getTime() - this._lastHarvestTime) / 1000;
            this._currentCapacity = Math.floor(this._productivity * fn.convertSecondToHour(timeDistance));
            this._currentCapacity = Math.min(this._currentCapacity, this._maxCapacity);
        }
        else
            this.setcurrentCapacity(0);
    },
    onSetButtonHarvestBG: function(resStatus)
    {
        switch (resStatus)
        {
            case this.resStatus.normal:
                fn.replaceSpriteImage(this._btnHarvestBG, res.folderCollectResource.bgButtonEnough)
                break;
            case this.resStatus.full:
                fn.replaceSpriteImage(this._btnHarvestBG, res.folderCollectResource.bgButtonFull);
                break;
        }
    },
    onPopUpHarvestButton: function()
    {
        this.onUpdateCurrentCapacity();
        var resAvaiable = cf.user.getAvaiableCapacity(this._resType);
        if (this.getCurrentCapacity() < resAvaiable)
            fn.replaceSpriteImage(this._btnHarvestBG, res.folderCollectResource.bgButtonEnough)
        else
            fn.replaceSpriteImage(this._btnHarvestBG, res.folderCollectResource.bgButtonFull);

        this.onVisibleButtonHarvest(true);

        if (this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST))
        {
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setBright(true);
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setEnabled(true);
        }
    },
    onPopDownHarvestButton: function()
    {
        this._btnHarvest.visible = false;
        this._btnHarvestBG.visible = false;
        if (this.getParent().getParent()._TAG_BUTTON_HARVEST)
        {
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setBright(false);
            this.getParent().getParent().getChildByTag(this.getParent().getParent()._TAG_BUTTON_HARVEST).setEnabled(false);
        }
    },

    onHarvest: function(continueCollect)
    {
        this.onRemoveTimeOut();
        this.onPlaySoundEffect();
        /* Cập nhật tài nguyên hiện tại*/
        this.onUpdateCurrentCapacity();
        var capacityAvaiable = cf.user.getAvaiableCapacity(this._resType);
        var resCollectAble = Math.min(this.getCurrentCapacity(), capacityAvaiable);

        this.onRunEffectCollect(resCollectAble);
        this.onPopDownHarvestButton();
        this.onResetCapacity();
        this.onUpdateLastHarvestTime();

        if (resCollectAble > 0)
        {
            this.updateToUserCapacity(resCollectAble);
            testnetwork.connector.sendHarvest(this._id);
        }

        cc.log("CONTINUE COLLECT: " + continueCollect);
        if (continueCollect)
            this.onStartCollect();
    },
    onRemoveTimeOut: function()
    {
        if (this._timeOutNormal)
            clearInterval(this._timeOutNormal);
        if (this._timeOutFull)
            clearInterval(this._timeOutFull);
    },
    onResetCapacity: function()
    {
        this.setcurrentCapacity(0);
    },
    onPlaySoundEffect: function()
    {
        audioPlayer.play(this._buildingSTR == gv.buildingSTR.resource_1 ? res.sound.collectGold : res.sound.collectElixir);
    },
    updateToUserCapacity: function(quantity)
    {
        cf.user.editCurrentResource(this._resType, quantity);
    },
    onRunEffectCollect: function(resCollectAble)
    {
        var self = this;

        /*Số tài nguyên bay lên*/
        var parent = this.getParent();
        if (!parent._effectCollectRes)
        {
            parent._effectCollectRes = cc.LabelBMFont("Resource Label", font.soji20);
            parent._effectCollectRes.scale = 2;
            parent._effectCollectRes.setPosition(cc.p(this.x, this.y));
            parent.addChild(parent._effectCollectRes, 201);
        };

        var act = cc.Sequence.create(
            cc.CallFunc(function(){
                parent._effectCollectRes.setPosition(self.x, self.y);
                parent._effectCollectRes.setString(resCollectAble);
                parent._effectCollectRes.setColor((self._buildingSTR == gv.buildingSTR.resource_1) ? cc.color.YELLOW : cc.color.RED);
                parent._effectCollectRes.visible = true;
            }),
            cc.MoveTo(1.5, self.x, self.y + 200),
            cc.CallFunc(function(){
                parent._effectCollectRes.visible = false;
            }));
        parent._effectCollectRes.runAction(act);

        /* Icon tài nguyên bay lên*/
        var percent = fn.percentage(this._currentCapacity, this._maxCapacity);
    },
    onUpdateLastHarvestTime: function(){
        this._lastHarvestTime = new Date().getTime();
    },

    onCompleteBuild: function()
    {
        this._super();
        this.initCapacity();
        this.onResetCapacity();
        this.onUpdateLastHarvestTime();
        this.onStartCollect();
    }
})