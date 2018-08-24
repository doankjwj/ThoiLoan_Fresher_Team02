var ButtonTroopDonate = ccui.Button.extend({
    _troopOrder: null,
    _troopLevel: null,
    _troopQuantity: null,
    _troopDonated: 0,
    _troopHousingSpace: null,

    _iconTroop: null,
    _labelTroopLevel: null,
    _labelTroopQuantity: null,

    _troopIconURL : [troopIcon.ARM_1, troopIcon.ARM_2, troopIcon.ARM_3, troopIcon.ARM_4],

    ctor: function(troopOrder){
        this._super(res.researchTroopGUI.slost);
        this._troopOrder = troopOrder;
        this._troopQuantity = this.getQuantityFromUser();
        this._troopLevel = this.getLevelFromUser();
        this.scale = 0.75;
        this.setCascadeColorEnabled(true);
        this.init();
        var self = this;
        this.addClickEventListener(function(){
            self.onClick();
        }.bind(this));
        this.initHousingSpace();
    },
    getQuantityFromUser: function(){
        return cf.user._listTroop[this._troopOrder];
    },
    getLevelFromUser: function(){
        return cf.user._listTroopLevel[this._troopOrder];
    },
    initHousingSpace: function(){
        this._troopHousingSpace = gv.json.troopBase["ARM_" + (this._troopOrder+1)]["housingSpace"];
    },
    init: function(){
        this._iconTroop = cc.Sprite(this._troopIconURL[this._troopOrder]);
        this._iconTroop.setPosition(this.width/2+2, this.height/2 + 10);
        this.addChild(this._iconTroop, 1);

        var bar = cc.Sprite(res.researchTroopGUI.bgSmall);
        bar.setOpacity(127)
        bar.setPosition(this.width/2 + 2, 20);
        this.addChild(bar, 0);

        var levelBG = cc.Sprite(res.clanGUI.iconStarSmall);
        levelBG.setPosition(this.width-30, 20);
        this.addChild(levelBG, 1);

        this._labelTroopLevel = cc.LabelBMFont(this._troopLevel, font.soji20);
        this._labelTroopLevel.scale = 0.8;
        this._labelTroopLevel.setColor(cc.color(255, 151, 0, 255));
        this._labelTroopLevel.setPosition(this.width-30, 20);
        this.addChild(this._labelTroopLevel, 2);

        this._labelTroopQuantity = cc.LabelBMFont("X " + this._troopQuantity, font.soji20);
        this._labelTroopQuantity.setColor(cc.color(255, 151, 0, 255));
        this._labelTroopQuantity.setPosition(this.width/2, -10);
        this._labelTroopQuantity.scale = 0.8;
        this.addChild(this._labelTroopQuantity, 1);

        this._labelTroopDonated = cc.LabelBMFont("", font.soji20);
        this._labelTroopDonated.scale = 0.7;
        this._labelTroopDonated.setColor(cc.color(255, 255, 255, 255));
        this._labelTroopDonated.setPosition(30, 20);
        this.addChild(this._labelTroopDonated);
    },
    onClick: function(){
        this.onUpdateTroopDonated(this._troopDonated + 1);
        this.onUpdateTroopQuantity(this._troopQuantity - 1);
        this.onUpdateStatusForPopUpDonate();
        //this.onUpdateForChatItem();
        this.onUpdateToUserListTroop();
        // this.getParent(
        // ).updateStatus();
        this.onReleaseTroop();
        this.onSendRequest();
    },
    // Cập nhật số quân đã cho cho button
    onUpdateTroopDonated: function(quantity){
        this._labelTroopDonated.setString("");
        this._labelTroopDonated.setString(quantity);
        this._troopDonated = quantity;
    },
    // Cập nhật số quân còn lại cho button
    onUpdateTroopQuantity: function(quantity){
        this._troopQuantity = quantity;
        this._labelTroopQuantity.setString("");
        this._labelTroopQuantity.setString("X" + quantity);
    },
    // Cập nhật Label Troop donated cho Pop Up
    onUpdateStatusForPopUpDonate: function(){
        var tmp = gvGUI.popUpDonateTroop;
        var troopDonated = 0;
        for (var i=0; i<tmp._listButton.length; i++)
            troopDonated += tmp._listButton[i]._troopDonated;
        tmp._labelTroopDonated.setString(troopDonated + "/" + cf.clanChat.maxTroopDonate);
    },
    // Cập nhật lại List Troop donated cho Chat Item
    onUpdateForChatItem: function(){
        var root = this.getParent().getParent();        // Layer chat
        var itemChat = root._listItemChat[root._currentChatItemIndex];
        itemChat._troopDonatedArr[this._troopOrder] += 1;
        itemChat.updateCurrentTroopAmount(this._troopOrder, 1);

        var troopAmountDonated = 0;
        for (var i=0; i<itemChat._troopDonatedArr.length; i++)
        {
            troopAmountDonated += itemChat._troopDonatedArr[i];
            gvGUI.popUpDonateTroop._listButton[i].onUpdateTroopDonated(itemChat._troopDonatedArr[i]);
        }

        if (troopAmountDonated >= cf.clanChat.maxTroopDonate){
            itemChat._buttonDonate.setTitleText("Xem lại");
            itemChat._buttonDonate.loadTextures(res.clanChatGUI.buttonBlue, res.clanChatGUI.buttonBlue);
        }

    },
    // Cập nhật lượng quân hiện tại cho User
    onUpdateToUserListTroop: function(){
        cf.user._listTroop[this._troopOrder] --;
    },
    // Cập nhật troop Quantity và troop Level từ user
    onUpdate: function(){
        //this.setEnabled(true);
        //this.setBright(true);
        this._troopQuantity = this.getQuantityFromUser();
        this._troopLevel = this.getLevelFromUser();
        this._labelTroopQuantity.setString(this._troopQuantity);
        this._labelTroopLevel.setString(this._troopLevel);
    },
    onReleaseTroop: function(){
        var rowRelease = 41;    // dòng con troop chạy ra rồi tan biến
        var colRelease = 20;    // cột con troop chạy ra rồi tan biến
        for (var i=0; i<cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1].length; i++){
            var amc = cf.user._buildingList[gv.orderInUserBuildingList.armyCamp_1][i];
            for (var j = 0; j<amc._troopList.length; j++)
            {
                var troop = amc._troopList[j];
                if (troop.type == this._troopOrder && !troop.released){
                    troop.released = true;
                    amc._troopList.splice(j, 1);
                    var actRelease = cc.Sequence.create(cc.CallFunc(function(){
                        troop.freeToDonate(rowRelease, colRelease);
                    })
            )
                    this.runAction(actRelease);
                    return;
                }
            }
        }
    },
    onSendRequest: function()
    {
        testnetwork.connector.sendDonate(gv.clanChat.itemDonateTag, this._troopOrder);
    }
})