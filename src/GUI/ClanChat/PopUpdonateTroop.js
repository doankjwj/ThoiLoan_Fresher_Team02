/**
 * Created by CPU02326_Local on 8/20/2018.
 */
var PopUpDonateTroop = cc.Sprite.extend({
    _labelTitle: null,
    _labelTroopDonated: null,

    _listButton: null,

    _itemDonate0: null,
    _itemDonate1: null,
    _itemDonate2: null,
    _itemDonate3: null,

    ctor: function(url){
        this._super(url);
    },

    updateStatus: function(){
        this.updateButton();
        var parent = this.getParent();  // Chat Layer
        for (var i=0; i<parent._listItemChat.length; i++)
        {
            var item = parent._listItemChat[i];
            if (gv.clanChat.itemDonateTag.equals(item._userName) && item._type == 1)
            {
                cc.log(" !!!!! " + i);
                break;
            }
        }
        var currentItemchat = parent._listItemChat[parent._currentChatItemIndex];
        cc.log("BUGGGGGG : " + parent._currentChatItemIndex);
        var troopHousingSpaceDonated = currentItemchat._currentDonatedTroopSpace;
        var housingSpaceAvaiable = currentItemchat._maxTroopQuantity - troopHousingSpaceDonated;

        // tổng troop đã donate
        var troopDonated = 0;
        var arrTroopDonated = currentItemchat._troopDonatedArr;
        for (var i=0; i<arrTroopDonated.length; i++)
            troopDonated += arrTroopDonated[i];
        var troopDonatedEnough = (troopDonated >= cf.clanChat.maxTroopDonate);

        // Disable Button nếu troop Housing Space quá giới hạn
        var button = null;
        var clickAble = null;
        for (var i=0; i < this._listButton.length; i++){
            button = this._listButton[i];
            // Chưa đủ 5 troop, housing space còn đủ, troop hiện còn đủ
            clickAble = !troopDonatedEnough && button._troopHousingSpace<=housingSpaceAvaiable && cf.user._listTroop[i] > 0;
            button.setBright(clickAble);
            button.setEnabled(clickAble);

            if (!clickAble)
            {
                var act = cc.TintTo(0, 127.5, 127.5, 127.5 );
                button._iconTroop.runAction(act);
            }
            else{
                var act = cc.TintTo(0, 255, 255, 255, 255);
                button._iconTroop.runAction(act)
            }
        };
    },
    updateButton: function(){
        for (var i=0; i<this._listButton.length; i++){
            this._listButton[i].onUpdate();
        }
    },

})