var Clan = cc.Class.extend({

    id: null,
    name: null,
    level: null,
    quantity: null,
    status: null,
    trophy: null,
    iconId: null,

    ctor: function (id, iconId, name, level, quantity, status, trophy) {
        // 123, 20, "AAA", 1, 20, 0, 12000
        this.id = id;
        this.name = name;
        this.level = level;
        this.quantity = quantity;
        this.status = status;
        this.trophy = trophy;
        this.iconId = iconId;
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