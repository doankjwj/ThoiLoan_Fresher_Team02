var UserClan = cc.Class.extend({

    _name: null,
    _level: null,
    _position: null,
    _givenTroop: null,
    _receivedTroop: null,
    _trophy: null,

    ctor: function(name, level, pos, give, received, trophy){

        this._name = name;
        this._level = level;
        this._position = pos;
        this._givenTroop = give;
        this._receivedTroop = received;
        this._trophy = trophy;

    },

    getPositionString: function() {
        if(this._position === 2) return "Bang chủ";
        else if(this._position === 1) return "Phó bang chủ";
        else if(this._position === 0) return "Thành viên";
        else return null;
    }

});