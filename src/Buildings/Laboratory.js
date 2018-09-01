var Laboratory = BuildingNode.extend({
    _researching: false,
    _timeResearchRemaining: null,
    _timeResearchFinish: null,
    _timeResearchTotal: null,

    _iconTroopResearch: null,
    _barResearch: null,
    _barResearchBG: null,
    _labelTimeResearchRemaining: null,

    _currentTroop: null,
    _currentTroopLevel: null,

    ctor: function(id, level, row, col, existed, isActive)
    {

        this._buildingSTR = gv.buildingSTR.lab;
        this._size = gv.json.laboratory[this._buildingSTR][Math.max(level, 1)]["width"];
        this._jsonConfig = gv.json.laboratory;
        this._maxLevel = gv.buildingMaxLevel.lab;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.lab;
        this._name = gv.buildingName.lab;
        this._description = gv.buildingDescription.laboratory;

        this._super(id, level, row, col, existed, isActive);
        /* Add Center Building */
        this.addCenterBuilding();



        this.initAnimation();

        /* Add Effect */
        this._effectAnim = cc.Sprite(res.tmp_effect);
        this._effectAnim.anchorX = 0.5;
        this._effectAnim.anchorY = 0.5;
        this._effectAnim.scale = cf.SCALE;
        this._effectAnim.visible = false;
        this.addChild(this._effectAnim, this._center_building.getLocalZOrder() + 1);
        if (this.getTempLevel() > 1) {
            this._effectAnim.stopAllActions();
            this._effectAnim.visible = true;
            this._effectAnim.runAction(cf.animationLab[this.getTempLevel()].clone().repeatForever());
        };

        //if (!this._isActive)
        //{
        //    this.onStartBuild(gv.startConstructType.loadConstruct);
        //}

        /* Effect Researching */
        this._effectResearching = cc.Sprite(res.tmp_effect);
        this._effectResearching.anchorX = 0.5;
        this._effectResearching.anchorY = 0;
        this._effectResearching.scale = 2;
        this._effectResearching.setPosition(0, 70);
        this._effectResearching.visible = false;
        this.addChild(this._effectResearching, this._center_building.getLocalZOrder() + 1);

        this.schedule(this.updateStatusResearch, 1);

        if (gv.jsonInfo["map"]["LAB_1"].length > 0){
            this._timeResearchFinish = Math.floor(gv.jsonInfo["map"]["LAB_1"][0]["finishResearchingTime"]);
            this._currentTroop = gv.jsonInfo["map"]["LAB_1"][0]["researchingTroop"] + 1;
            if (this._timeResearchFinish > Math.floor(new Date().getTime()))
            {
                this._researching = true;
                this.onResearch(this._currentTroop);
            }
        }
    },

    onResearch: function(currentTroop){
        this._currentTroop = currentTroop;
        this._currentTroopLevel = cf.user._listTroopLevel[this._currentTroop-1];
        this.initTimeResearch();
        this.initResearchContent();
        this._researching = true;
        this.runEffectResearching();
    },
    initTimeResearch: function()
    {
        this._timeResearchTotal = gv.json.troop["ARM_" + this._currentTroop][this._currentTroopLevel + 1]["researchTime"] * 1000;

        if (!this._researching)
        {
            this._timeResearchRemaining = this._timeResearchTotal;
            this._timeResearchFinish = new Date().getTime() + this._timeResearchRemaining;
        }
        else{
            this._timeResearchRemaining = this._timeResearchFinish - new Date().getTime();
        }


    },

    initResearchContent: function(){
        if (this._iconTroopResearch)
            this.removeChild(this._iconTroopResearch);
        //this._iconTroopResearch = cc.Sprite(researchTroopFolderTroopIconSmall + "ARM_" + this._currentTroop + "_" + (this._currentTroopLevel+1) + ".png", cc.rect(30, 20, 50, 40));
        this._iconTroopResearch = cc.Sprite(guiFolder + "train_troop_gui/small_icon/ARM_" + (this._currentTroop) + ".png");
        this._iconTroopResearch.setPosition(-120, 100);
        this._iconTroopResearch.scale = 1.25;
        this.addChild(this._iconTroopResearch, this._center_building.getLocalZOrder()+1);

        if (this._barResearch)
            this.removeChild(this._barResearch);
        this._barResearch = cc.Sprite(res.upgradeBuildingGUI.infoBar);
        this._barResearch.setAnchorPoint(0, 0.5);
        this._barResearch.setPosition(-311/4, 80);
        this._barResearch.scale = 0.5;
        this.addChild(this._barResearch, this._iconTroopResearch.getLocalZOrder());

        if (this._barResearchBG)
            this.removeChild(this._barResearchBG);
        this._barResearchBG = cc.Sprite(res.upgradeBuildingGUI.infoBarBG);
        this._barResearchBG.setAnchorPoint(0, 0.5);
        this._barResearchBG.setPosition(-311/4, 80);
        this._barResearchBG.scale = 0.5;
        this.addChild(this._barResearchBG, this._iconTroopResearch.getLocalZOrder() - 1);

        if (this._labelTimeResearchRemaining)
            this.removeChild(this._labelTimeResearchRemaining);
        this._labelTimeResearchRemaining = cc.LabelBMFont("Time Remain", font.soji20);
        this._labelTimeResearchRemaining.setPosition(0, this._barResearch.y + 20);
        this.addChild(this._labelTimeResearchRemaining, this._barResearch.getLocalZOrder());

    },
    runEffectResearching: function()
    {
        this._effectResearching.stopAllActions();
        if (!cf.animationLabWorking)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_lap_1_researching.plist", res.folder_effect + "effect_lap_1_researching.png");
            cf.animationLabWorking = fn.getAnimation("effect_lap_1_researching ", 1, 10);
            cf.animationLabWorking.retain();
        }
        this._effectResearching.visible = true;
        this._effectResearching.runAction(cf.animationLabWorking.clone().repeatForever());
    },
    updateStatusResearch: function()
    {
        if (!this._researching) return;
        this._timeResearchRemaining = this._timeResearchFinish - new Date().getTime();
        if (this._timeResearchRemaining <= 0)
        {
            this.onFinishResearch();
            return;
        }
        this._barResearch.setTextureRect(cc.rect(0, 0, 311 * (this._timeResearchTotal - this._timeResearchRemaining)/this._timeResearchTotal, 36));
        this._labelTimeResearchRemaining.setString(cf.secondsToLongTime(Math.floor(this._timeResearchRemaining/1000)));
    },
    onFinishResearch: function()
    {
        cf.user._listTroopLevel[this._currentTroop-1] ++;
        this.visibleContent(false);
        this.runEffectCompleteResearch();
    },
    visibleContent: function(vis)
    {
        this._researching = vis;
        this._iconTroopResearch.visible = vis;
        this._labelTimeResearchRemaining.visible = vis;
        this._barResearch.visible = vis;
        this._barResearchBG.visible = vis;
    },

    runEffectCompleteResearch: function()
    {
        this._effectResearching.stopAllActions();
        if (cf.animationConstructLevelUp == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_levelup.plist", res.folder_effect + "effect_levelup.png");
        }
        this._effectResearching.runAction(cc.Sequence.create(cc.CallFunc(function(){
                this._effectResearching.visible = true}, this),
            fn.getAnimation("effect_levelup ", 1, 12).clone(),
            cc.CallFunc(function(){this._effectResearching.visible = false}, this)
        ));
    },
    updateAnim: function()
    {
        this.initAnimation();
            if (this.getTempLevel() > 1) this._effectAnim.visible = true;
            this._effectAnim.stopAllActions();
            this._effectAnim.runAction(cf.animationLab[this.getTempLevel()].clone().repeatForever());
    },

    initAnimation: function()
    {
        var tmpLevel = this.getTempLevel();
        if (tmpLevel < 2) return;
        tmpLevel = Math.min(tmpLevel, 5); // 5 = Level Effect cao nhất của nhà lab
        if (cf.animationLab[tmpLevel] == undefined)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_lab_1_" + tmpLevel +".plist", res.folder_effect + "effect_lab_1_" + tmpLevel +".png");
            cf.animationLab[tmpLevel] = fn.getAnimation("effect_lab_1_" + tmpLevel + " ", 1, 6);
            cf.animationLab[tmpLevel].retain();
        }
    }
})