var ArmyBar = cc.Node.extend({
    _iconTroop: null,
    _labelCurrentTroopHousingSpace: null,
    _labelTotalTroopHousingSpace: null,

    ctor: function()
    {
        this._super();
        this.init();
    },
    init: function()
    {
        var bg = cc.Sprite(mainGUI.bgBar1);
        bg.setScale(1.25);
        bg.setPosition(35, 0);
        this.addChild(bg);

        var labelTitle = fn.commonLabel("QUÂN ĐỘI", font.soji20, 0.85, 0.85, cc.color(255, 255, 255, 255));
        labelTitle.setAnchorPoint(0, 0.5);
        labelTitle.setPosition(0, 25);
        this.addChild(labelTitle, 1);

        this._iconTroop = cc.Sprite(mainGUI.armyIcon);
        this._iconTroop.setAnchorPoint(0, 0.5);
        this._iconTroop.setPosition(75, 0);
        this.addChild(this._iconTroop);

        this._labelCurrentTroopHousingSpace = fn.commonLabel("20", font.soji20, 1, 1, cc.color(255, 255, 255, 255));
        this._labelCurrentTroopHousingSpace.setAnchorPoint(1, 0.5);
        this._labelCurrentTroopHousingSpace.setPosition(75, 0);
        this.addChild(this._labelCurrentTroopHousingSpace);
    },

    updateContent: function()
    {
        var currentHS = cf.user.getCurrentTroopHousingSpace();
        var maxHS = cf.user.getMaxTroopHousingSpace();
        cc.log(currentHS + " : " + maxHS);
        this._labelCurrentTroopHousingSpace.setString(currentHS + " / " + maxHS);
    }
})