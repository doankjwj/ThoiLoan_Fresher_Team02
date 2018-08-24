var Clan = cc.Class.extend({

    id: null,
    name: null,
    level: null,
    quantity: null,
    status: null,
    trophy: null,
    iconId: null,
    trophyRequired: null,

    _listUser: null,

    ctor: function (id, iconId, name, level, quantity, status, trophy, trophyReq) {
        // 123, 20, "AAA", 1, 20, 0, 12000
        this.id = id;
        this.name = name;
        this.level = level;
        this.quantity = quantity;
        this.status = status;
        this.trophy = trophy;
        this.iconId = iconId;
        this.trophyRequired = trophyReq;

        // for(var i=0; i<this.quantity; i++) {
        //     this._listUser.push(
        //         new UserItem(
        //             i+1,
        //             new UserClan("QUAN LE ANH",
        //                 Math.floor(Math.random()*200),
        //                 Math.floor(Math.random()*3),
        //                 Math.floor(Math.random()*2000),
        //                 Math.floor(Math.random()*5000),
        //                 Math.floor(Math.random()*20000))
        //         )
        //     );
        // }


    },

    getStatusText: function () {

        switch (this.status) {

            case 0:
                return "Mở";
            case 1:
                return "Xác thực";
            default: return "UNDEFINED";

        }

    }


});