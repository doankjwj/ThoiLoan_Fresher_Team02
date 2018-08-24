/**
 * Created by CPU02326_Local on 8/16/2018.
 */
var ItemChat = cc.Node.extend({
    _id: null,
    _type: null,
    _userName: null,
    _userLevel: null,
    _text: null,
    _time: null,

    _currentTroopQuantity: null,     // Lượng Troop đã donate hiện tại [0, 2, 2, 0...]
    _troopDonatedArr: null,             // Mảng Troop User hiện tại đã donate [0, 0, 1, 0]
    _maxTroopQuantity: null,            // Số lượng Slot tối đa donate được
    _currentDonatedTroopSpace: 0,      // Slot Troop đã donate
    _height: null,                      // Chiều cao Item chat ( 120: Request xin quân, 80: Chat hoặc Clan Event
    typeDefine: {
        chatText: 0,
        requestDonate: 1,
        eventClan: 2,
    },

    ctor: function(id, type, userName, userLevel, text, time, currentHousingSpace /*Array*/, troopDonatedArr, maxHousingSpace){
        this._super();
        this._id = id;
        this._type = type;
        this._userName = userName;
        this._userLevel = userLevel;
        this._text = text;
        this._time = time;

        // Chat Xin quân
        if (this._type == this.typeDefine.requestDonate) {
            this._currentDonatedTroopSpace = currentHousingSpace;
            this._troopDonatedArr = troopDonatedArr;
            this._maxTroopQuantity = maxHousingSpace;
        }

        this.init();
    },

    init: function(){
        var self = this;

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
        if (this._userName != cf.user._name)
            this._labelName.setColor(cc.color(255, 255, 102, 255));
        else
            this._labelName.setColor(cc.color(80, 255, 102, 255));
        this._labelName.setAnchorPoint(0, 0.5);
        this._labelName.setPosition(iconStar.x + 20, this._labelLevel.y);
        this.addChild(this._labelName);

        this._labelMessage = cc.LabelBMFont(this._text, font.soji20);
        this._labelMessage.scale = 0.5;
        this._labelMessage.setColor(cc.color(255, 153, 0, 255));
        this._labelMessage.setAnchorPoint(0, 0.5);
        this._labelMessage.setPosition(-320/2, 45);
        this.addChild(this._labelMessage);

        var time = Math.floor((new Date().getTime() - this._time)/1000);
        time = cf.secondsToLongTime(time);
        if (time.length == 0) time = "0s";
        this._labelTime = cc.LabelBMFont(time + " trước", font.soji20);
        this._labelTime.scale = 0.4;
        this._labelTime.setColor(cc.color(255, 255, 102, 255));
        this._labelTime.setAnchorPoint(1, 0.5);
        this._labelTime.setPosition(165, 10);
        this.addChild(this._labelTime);

        var line = cc.Sprite(res.clanChatGUI.lineSeparateChat);
        line.setPosition(0, this._labelTime.y - 10);
        this.addChild(line);

        /*Sự kiện donate*/
        if (this._type == this.typeDefine.requestDonate){

            this._labelMessage.setColor(cc.color(255, 255, 255, 255));

            this._barDonateBG = cc.Sprite(res.clanChatGUI.barDonateTroopBG);
            this._barDonateBG.setAnchorPoint(0, 0.5);
            this._barDonateBG.setPosition(-38.5, 60);
            this.addChild(this._barDonateBG);
            this._barDonate = cc.Sprite(res.clanChatGUI.barDonateTroop);
            this._barDonate.setAnchorPoint(0, 0.5);
            this._barDonate.setPosition(-38, 61);
            this.addChild(this._barDonate);

            if (this._userName != cf.user._name)
            {
                this._buttonDonate = ccui.Button(res.clanChatGUI.buttonGreen);
                this._buttonDonate.setTitleText("Cho Quân");
                this._buttonDonate.setTitleFontSize(20);
                this._buttonDonate.setTitleColor(cc.color(255, 255, 255, 255));
                this._buttonDonate.scale = 0.85;
                this._buttonDonate.setPosition(0, 30);
                this.addChild(this._buttonDonate);

                this._buttonDonate.addClickEventListener(function(){
                    var root = this.getParent().getParent().getParent();
                    cc.log(root._listItemChat.length);
                    root._currentChatItemIndex = root._listItemChat.indexOf(self);      // Lưu Item chat hiện tại
                    self.onPopUpTroopDonate();
                    gv.clanChat.itemDonateTag = self._userName;
                    gvGUI.popUpDonateTroop.updateStatus();      // Disable nút nếu hết housing Space và ngược lại
                }.bind(this));

                this._currentTroopQuantity = this.getTroopAmountDonated();
                /* Nếu đã cho đủ 5 troop */
                if (this._currentTroopQuantity >= cf.clanChat.maxTroopDonate)
                {
                    this._buttonDonate.setTitleText("Xem lại");
                    this._buttonDonate.loadTextures(res.clanChatGUI.buttonBlue, res.clanChatGUI.buttonBlue);
                }

            }

            this._labelTroop = cc.LabelBMFont("", font.soji20);
            this._labelTroop.scale = 0.6;
            this._labelTroop.setAnchorPoint(1, 0.5);
            this._labelTroop.setPosition(this._barDonate.x - 10, this._barDonate.y);
            this.addChild(this._labelTroop);

            iconStar.setPosition(-300/2, 100);
            this._labelLevel.setPosition(iconStar.x, iconStar.y);
            this._labelName.setPosition(iconStar.x + 20, this._labelLevel.y);
            this._labelMessage.setPosition(-320/2, 80);


            /* Cập nhật Label và Bar Troop */
            this.onUpdateBarAndLabelTroop();
        }

        /*Sự kiện Event: vào bang, ra bang*/


        //Kích thước của Item
        if (this._type == this.typeDefine.requestDonate)
            this._height = 120
        else this._height = 80;
    },

    // Cập nhật thủ công
    updateTime: function()
    {
        var time = Math.floor((new Date().getTime() - this._time)/1000);
        time = cf.secondsToLongTime(time);
        if (time == "") time = "0s";
        this._labelTime.setString(time + " trước");
    },
    updateCurrentTroopAmount: function(troopOrder, quantity){
        var Amount = gv.json.troopBase["ARM_" + (troopOrder+1)]["housingSpace"];
        this._currentDonatedTroopSpace += Amount*quantity;
        this.onUpdateBarAndLabelTroop();
    },
    onUpdateBarAndLabelTroop: function(){
        var rect = cc.rect(0, 0, this._currentDonatedTroopSpace/this._maxTroopQuantity * 78, 10);
        this._barDonate.setTextureRect(rect);
        this._labelTroop.setString(this._currentDonatedTroopSpace + "/" + this._maxTroopQuantity);
    },

    // Pop Up Cho quân
    onPopUpTroopDonate: function(){
        var self = this;
        var parent = this.getParent().getParent().getParent(); // Layer chat
        /* Tạo một PopUp */
        if (!gvGUI.popUpDonateTroop){
            gvGUI.popUpDonateTroop = new PopUpDonateTroop(res.clanChatGUI.donateTroopBG);
            gvGUI.popUpDonateTroop.setAnchorPoint(0, 0.5);
            gvGUI.popUpDonateTroop.setPosition(-400, -400);
            parent.addChild(gvGUI.popUpDonateTroop, 2);
            self.addEventListenerForNull();

            var buttonClose = ccui.Button(res.clanChatGUI.buttonClose);
            var buttonCloseX = gvGUI.popUpDonateTroop.width - buttonClose.width/1.5;
            var buttonCloseY = gvGUI.popUpDonateTroop.height - buttonClose.height/1.5;
            buttonClose.setPosition(buttonCloseX, buttonCloseY);
            gvGUI.popUpDonateTroop.addChild(buttonClose, 0, gvGUI.TAG_BUTTON_CLOSE);
            buttonClose = gvGUI.popUpDonateTroop.getChildByTag(gvGUI.TAG_BUTTON_CLOSE);
            buttonClose.addClickEventListener(function () {
                self.onDisappearPopupDonateTroop();
            }.bind(this));

        };

        self.updateContentForPopUpDonate();
        var actScale = cc.ScaleTo(0.1, 1);
        var seq = cc.Sequence.create(cc.CallFunc(function(){
                gvGUI.popUpDonateTroop.scale = 0.8;
                gvGUI.popUpDonateTroop.setPosition(parent._bg.width/2 + 50, parent._bg.height/2);
            }),
            actScale
        )
        gvGUI.popUpDonateTroop.runAction(seq);
        gv.listenerNullForPopUpDonate.setEnabled(true);
    },
    addEventListenerForNull: function(){
        gv.listenerNullForPopUpDonate = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(){
                return true
            }
        });
        cc.eventManager.addListener(gv.listenerNullForPopUpDonate, gvGUI.popUpDonateTroop);
        gv.listenerNullForPopUpDonate.setEnabled(false);
        gv.listenerNullForPopUpDonate.retain();
    },

    // Cập nhật content cho popUp Donate
    updateContentForPopUpDonate: function(){
        this.initContentForPopUpDonate();
        this.updateContentForPopUpDonateDetail();
    },
    initContentForPopUpDonate: function(){
        if (!gvGUI.popUpDonateTroop._labelTitle){
            gvGUI.popUpDonateTroop._labelTitle = cc.LabelBMFont("Cho Quân: ", font.soji20);
            gvGUI.popUpDonateTroop._labelTitle.scale = 0.75;
            gvGUI.popUpDonateTroop._labelTitle.setColor(cc.color(255, 180, 0, 255));
            gvGUI.popUpDonateTroop._labelTitle.setAnchorPoint(0, 0.5);
            gvGUI.popUpDonateTroop._labelTitle.setPosition(50, gvGUI.popUpDonateTroop.height - 30);
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._labelTitle, 1);
        }
        if (!gvGUI.popUpDonateTroop._labelTroopDonated){
            gvGUI.popUpDonateTroop._labelTroopDonated = cc.LabelBMFont("2/ 5", font.soji20);
            gvGUI.popUpDonateTroop._labelTroopDonated.scale = 0.75;
            gvGUI.popUpDonateTroop._labelTroopDonated.setAnchorPoint(0, 0.5);
            gvGUI.popUpDonateTroop._labelTroopDonated.setColor(cc.color(255, 180, 0, 255));
            gvGUI.popUpDonateTroop._labelTroopDonated.setPosition(400, gvGUI.popUpDonateTroop.height - 30);
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._labelTroopDonated, 1);
        }

        //Vị trí Các Button
        var xLocation = 90;
        var xDistance = 90;
        if (!gvGUI.popUpDonateTroop._listButton)
            gvGUI.popUpDonateTroop._listButton = [];
        var yLocation = gvGUI.popUpDonateTroop.height - 100;
        if (!gvGUI.popUpDonateTroop._itemDonate0){
            gvGUI.popUpDonateTroop._itemDonate0 = new ButtonTroopDonate(0);
            gvGUI.popUpDonateTroop._itemDonate0.setPosition(xLocation, yLocation);
            gvGUI.popUpDonateTroop._listButton[0]= gvGUI.popUpDonateTroop._itemDonate0;
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._itemDonate0, 1);
        };
        if (!gvGUI.popUpDonateTroop._itemDonate1){
            gvGUI.popUpDonateTroop._itemDonate1 = new ButtonTroopDonate(1);
            gvGUI.popUpDonateTroop._itemDonate1.setPosition(xLocation + xDistance, yLocation);
            gvGUI.popUpDonateTroop._listButton[1]= gvGUI.popUpDonateTroop._itemDonate1;
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._itemDonate1, 1);
        };
        if (!gvGUI.popUpDonateTroop._itemDonate2){
            gvGUI.popUpDonateTroop._itemDonate2 = new ButtonTroopDonate(2);
            gvGUI.popUpDonateTroop._itemDonate2.setPosition(xLocation + 2*xDistance, yLocation);
            gvGUI.popUpDonateTroop._listButton[2]= gvGUI.popUpDonateTroop._itemDonate2;
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._itemDonate2, 1);
        };
        if (!gvGUI.popUpDonateTroop._itemDonate3){
            gvGUI.popUpDonateTroop._itemDonate3 = new ButtonTroopDonate(3);
            gvGUI.popUpDonateTroop._itemDonate3.setPosition(xLocation + 3*xDistance, yLocation);
            gvGUI.popUpDonateTroop._listButton[3]= gvGUI.popUpDonateTroop._itemDonate3;
            gvGUI.popUpDonateTroop.addChild(gvGUI.popUpDonateTroop._itemDonate3, 1);
        }
        //for (var i=0; i<3; i++) gvGUI.popUpDonateTroop._listButton[i].setEnabled(true);
    },
    updateContentForPopUpDonateDetail: function(){
        var troopAmountDonated = 0;     // tổng quân đã donate
        var troopDonateCount;           // quân donate cho từng loại/ Button
        for (var i=0; i<cf.clanChat.troopDonateLength; i++)
        {
            troopDonateCount = this._troopDonatedArr[i];
            troopAmountDonated += troopDonateCount;
            gvGUI.popUpDonateTroop._listButton[i].onUpdateTroopDonated(troopDonateCount);
        }

        var labelTroopDonated = gvGUI.popUpDonateTroop._labelTroopDonated;
        labelTroopDonated.setString(troopAmountDonated + "/" + cf.clanChat.maxTroopDonate);
        //for (var i=0; i<3; i++) gvGUI.popUpDonateTroop._listButton[i].setEnabled(true);
    },
    // tổng quân đã donate
    getTroopAmountDonated: function()
    {
        var troopAmountDonated = 0;     // tổng quân đã donate
        var troopDonateCount;           // quân donate cho từng loại/ Button
        for (var i=0; i<cf.clanChat.troopDonateLength; i++)
        {
            troopDonateCount = this._troopDonatedArr[i];
            troopAmountDonated += troopDonateCount;
        }
        return troopAmountDonated;
    },

    // Ẩn popUp Donate
    onDisappearPopupDonateTroop: function(){
        gv.listenerNullForPopUpDonate.setEnabled(false);

        var act = cc.ScaleTo(0.1, 0.45);
        var seq = cc.Sequence.create(act,
            cc.CallFunc(function(){
                gvGUI.popUpDonateTroop.setPosition(-400, -400);
            })
        );
        gvGUI.popUpDonateTroop.runAction(seq);
    },

    // Thêm 1 troop từ server
    onAddTroop: function(troopOrder, userDonate)
    {
        /* Cập nhật cho Item chat */
        this._troopDonatedArr[troopOrder] += 1;
        this.updateCurrentTroopAmount(troopOrder, 1);

        // Đã Donate đủ Housing Space
        if (this._currentDonatedTroopSpace == this._maxTroopQuantity)
        {
            this.onRelease();
        }

        /* Nếu chủ Request này không phải người nhận */
        if (cf.user._name != userDonate) return;
        var troopAmountDonated = 0;
        for (var i=0; i<this._troopDonatedArr.length; i++)
        {
            troopAmountDonated += this._troopDonatedArr[i];
            gvGUI.popUpDonateTroop._listButton[i].onUpdateTroopDonated(this._troopDonatedArr[i]);
        }

        if (troopAmountDonated >= cf.clanChat.maxTroopDonate && this._userName != cf.user._name){
            this._buttonDonate.setTitleText("Xem lại");
            this._buttonDonate.loadTextures(res.clanChatGUI.buttonBlue, res.clanChatGUI.buttonBlue);
        }



    },
    //Release Request khi donate đủ Housing Space
    onRelease: function()
    {
        cc.log("Donate enough !");

        var act = cc.FadeOut(1.5);
        var root = this.getParent().getParent().getParent();    // Layer Chat
        var index = root.getItemChatByUserName(1, this._userName);
        this.runAction(cc.Sequence.create(
            act,
            cc.CallFunc(function(){
                root.onRemoveItem(index);
            })
        ))
    },
    visualizeByArg: function()
    {
        this._labelLevel.setString(this._userLevel);
        this.onUpdateBarAndLabelTroop();
    }
})