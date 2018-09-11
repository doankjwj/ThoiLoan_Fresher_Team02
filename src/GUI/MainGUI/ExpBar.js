var ExpBar = cc.Node.extend({
    _iconExpBG: null,
    _barExpBG: null,
    _barExp: null,
    _iconStar: null,
    _labelLevel: null,
    _labelUserName: null,

    ctor: function()
    {
        this._super();
        this.init();
    },
    init: function()
    {
        this._iconExpBG = cc.Sprite(mainGUI.bgExp);
        this._iconExpBG.setAnchorPoint(0.5, 0.5);
        this._iconExpBG.setPosition(0, 0);
        this.addChild(this._iconExpBG, 0);

        this._labelLevel = fn.commonLabel("Level", font.soji20, 1, 1, cc.color(255, 255, 255, 255));
        this._labelLevel.setAnchorPoint(0.5, 0.5);
        this._labelLevel.setPosition(this._iconExpBG.x, this._iconExpBG.y);
        this.addChild(this._labelLevel, 1);

        this._barExpBG = cc.Sprite(mainGUI.expBgBar);
        this._barExpBG.setScale(1.25)
        this._barExpBG.setAnchorPoint(0, 1);
        this._barExpBG.setPosition(0, 0);
        this.addChild(this._barExpBG, -1);

        this._barExp = cc.Sprite(mainGUI.expBar);
        this._barExp.setTextureRect(cc.rect(0, 0, this._barExpBG.width*Math.random(), this._barExpBG.height));
        this._barExp.setScale(1.25)
        this._barExp.setAnchorPoint(0, 1);
        this._barExp.setPosition(this._iconExpBG.x, this._iconExpBG.y);
        this.addChild(this._barExp, -1);

        this._iconStar = cc.Sprite(mainGUI.expIcon);
        this._iconStar.setAnchorPoint(0.5, 1);
        this._iconStar.setPosition(this._iconExpBG.x + this._barExpBG.width*this._barExpBG.scale, this._iconExpBG.y + 8);
        this.addChild(this._iconStar, 0);

        this._labelUserName = fn.commonLabel("User Name", font.soji20, 1, 1, cc.color(255, 255, 255, 255));
        this._labelUserName.setAnchorPoint(0, 0);
        this._labelUserName.setPosition(this._iconExpBG.x + this._iconExpBG.width/2, this._barExpBG.y);
        this.addChild(this._labelUserName, 1);
    },

    updateContent: function()
    {
        this._labelUserName.setString(cf.user._name);
        var userLevel = fn.getUserBuilding(gv.orderInUserBuildingList.townHall, 0).getTempLevel();
        this._labelLevel.setString(userLevel);
    }
});
