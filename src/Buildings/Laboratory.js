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

    ctor: function(id, level, row, col, existed)
    {

        this._buildingSTR = gv.buildingSTR.lab;
        if(level === 0) level = 1;
        this._size = gv.json.laboratory[this._buildingSTR][level]["width"];
        this._jsonConfig = gv.json.laboratory;
        this._maxLevel = gv.buildingMaxLevel.lab;
        this._orderInUserBuildingList = gv.orderInUserBuildingList.lab;
        this._name = gv.buildingName.lab;
        this._description = gv.buildingDescription.laboratory;

        this._super(id, level, row, col, existed);
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
        if (this._level > 1) {
            this._effectAnim.stopAllActions();
            this._effectAnim.visible = true;
            this._effectAnim.runAction(cf.animationLab[this._level].clone().repeatForever());
        };

        if (!this._is_active)
        {
            this.onStartBuild(gv.startConstructType.loadConstruct);
        }

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
        this._iconTroopResearch = cc.Sprite(researchTroopFolderTroopIconSmall + "ARM_" + this._currentTroop + "_" + (this._currentTroopLevel+1) + ".png", cc.rect(30, 20, 50, 40));
        this._iconTroopResearch.setPosition(-120, 80);
        this._iconTroopResearch.scale = 1.5;
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
        this._researching = false;
        this._iconTroopResearch.visible = false;
        this._labelTimeResearchRemaining.visible = false;
        this._barResearch.visible = false;
        this._barResearchBG.visible = false;
        this._effectResearching.stopAllActions();
        this._effectResearching.visible = false;
    },
    updateAnim: function()
    {
        this.initAnimation();
            if (this._level > 1) this._effectAnim.visible = true;
            this._effectAnim.stopAllActions();
            this._effectAnim.runAction(cf.animationLab[this._level].clone().repeatForever());
    },

    initAnimation: function()
    {
        if (this._level < 2) return;
        if (cf.animationLab[this._level] == undefined)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_lab_1_" + this._level +".plist", res.folder_effect + "effect_lab_1_" + this._level +".png");
            cf.animationLab[this._level] = fn.getAnimation("effect_lab_1_" + this._level + " ", 1, 6);
            cf.animationLab[this._level].retain();
        }
    }
})