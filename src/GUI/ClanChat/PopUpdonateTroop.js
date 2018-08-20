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
        var currentItemchat = parent._listItemChat[parent._currentChatItemIndex];
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
        };
    },
    updateButton: function(){
        for (var i=0; i<this._listButton.length; i++){
            this._listButton[i].onUpdate();
        }
    },

})