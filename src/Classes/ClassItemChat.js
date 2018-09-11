var ClassItemChat = cc.Class.extend({
    _id: null,
    _type: null,
    _userLevel: null,
    _userName: null,
    _text: null,
    _timeCreated: null,
    _troopList: null,
    _troopListAmount: null,
    _troopMaxAmount: null,

    ctor: function(id, type, userLevel, userName, text, timeCreated, troopList, troopListAmount, troopMaxAmount){
        this._id = id;
        this._type = type;
        this._userLevel = userLevel;
        this._userName = userName;
        this._text = text;
        this._timeCreated = timeCreated;
        this._troopList = troopList;
        this._troopListAmount = troopListAmount;
        this._troopMaxAmount = troopMaxAmount;
    }
})