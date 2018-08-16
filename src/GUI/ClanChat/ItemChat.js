/**
 * Created by CPU02326_Local on 8/16/2018.
 */
var ItemChat = cc.Node.extend({
    _is: null,
    _type: null,
    _userName: null,
    _userLevel: null,
    _text: null,
    _time: null,
    _currentTroop: null,
    _currentTroopQuantity: null,
    _maxTroopQuantity: null,

    _labelLevel: null,
    ctor: function(id, type, userName, userLevel, text, time, currentTroop, currentTroopQuantity, maxTroopquantity){
        this._super();
        this._id = id;
        this._type = type;
        this._userName = userName;
        this._userLevel = userLevel;
        this._text = text;
        this._time = time;
        if (currentTroop) this._currentTroop = currentTroop;
        if (currentTroopQuantity) this._currentTroopQuantity = currentTroopQuantity;
        if (maxTroopquantity) this._maxTroopQuantity = maxTroopquantity;

        this.init();
    },

    init: function(){
        var iconStar = cc.Sprite(res.clanGUI.iconStarSmall);
        iconStar.setPosition(-300/2, 65);
        iconStar.scale = 0.8;
        this.addChild(iconStar);

        this._labelLevel = cc.LabelBMFont(this._userLevel, font.soji20);
        this._labelLevel.setColor(cc.color(255, 255, 255, 255));
        this._labelLevel.setPosition(iconStar.x, iconStar.y);
        this._labelLevel.scale = 0.6;
        this.addChild(this._labelLevel);

        this._labelName = cc.LabelBMFont(this._userName, font.soji20);
        this._labelName.scale = 0.6;
        this._labelName.setColor(cc.color(255, 255, 102, 255));
        this._labelName.setAnchorPoint(0, 0.5);
        this._labelName.setPosition(iconStar.x + 20, this._labelLevel.y);
        this.addChild(this._labelName);
    }
})