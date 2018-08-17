var ClassItemUserOnline = cc.Class.extend({
    _userId: null,
    _userName: null,
    _status: null,

    ctor: function(userId, userName, status){
        // this._super();
        this._userId = userId;
        this._userName = userName;
        this._status = status;
    }
})