/**
 * Created by CPU02326_Local on 8/15/2018.
 */
var LayerClanChat = cc.Node.extend({
    _iconClan: null,
    _labelClanName: null,
    _textFieldChat: null,

    _labelMemberOnline: null,

    _memberOnline: null,            // Tổng thành viên Online
    _memberTotal: null,             // Tổng thành viên

    _scrollviewChat: null,
    _scrollviewUserOnline: null,

    _listItemUserOnline: [],        // Danh sách Node User Online
    _listItemChat: [],              // Danh sách Node Chat
    _listItemUserOnlineY: [],       // Danh sách tọa độ Y của Item User Online
    _listItemChatY: [],             // Danh sách tọa độ Y của Item Chat

    //_listChat: [],                  // Danh sách đối tượng Chat
    //_listUserOnline: [],            // Danh sách đối tượng User Online

    _clanChatLoaded: 0,             // Số loại Clan Chat đã đọc về (3 == đọc xong hết)
    _typeDefine: {
        chatScrollView: 0,
        userOnlineScrollView: 1,
    },

    _maxLengthChat: 100,             // Độ dài tối đa danh sách tin nhắn và độ dài tin nhắn mà Client resquest
    _lengthChatPerLoad: 30,
    _listenerAppear: null,          // Listener On Appear
    _currentChatItemIndex: null,          // Item Chat hiện tại

    ctor: function() {
        this._super();
        this.setAnchorPoint(0, 0);

        this.init();
        this.initListenerAppear();
        this.addButtonExpand();
    },
    init: function(){
        var self = this;

        this._bg = cc.Sprite(res.clanChatGUI.chatBG);
        this._bg.setAnchorPoint(0, 0);
        this.addChild(this._bg, 0);

        var buttonTabClan = cc.Sprite(res.clanChatGUI.buttonTabSelected);
        var titleClan = cc.LabelBMFont("BANG HỘI", font.soji20);
        titleClan.setPosition(buttonTabClan.width/2, buttonTabClan.height/2 - 2);
        titleClan.scale = 0.8;
        titleClan.setAnchorPoint(0.5, 0.5);
        buttonTabClan.addChild(titleClan);
        buttonTabClan.setAnchorPoint(0, 1);
        buttonTabClan.setPosition(this._bg.width/2, this._bg.height - 6);
        this.addChild(buttonTabClan, 1);

        var buttonTabGlobal = cc.Sprite(res.clanChatGUI.buttonTabUnselected);
        var titleGlobal = cc.LabelBMFont("THẾ GIỚI", font.soji20);
        titleGlobal.setPosition(buttonTabGlobal.width/2, buttonTabGlobal.height/2);
        titleGlobal.scale = 0.8;
        titleGlobal.setAnchorPoint(0.5, 0.5);
        buttonTabGlobal.addChild(titleGlobal);
        buttonTabGlobal.setAnchorPoint(1, 1);
        buttonTabGlobal.setPosition(this._bg.width/2, this._bg.height - 6);
        this.addChild(buttonTabGlobal, 1);

        var iconClanOrder = Math.floor(Math.random() * 28) + 1;
        this._iconClan = cc.Sprite("res/Art/Bang hoi/bieu tuong nho/" + iconClanOrder + ".png");
        this._iconClan.setPosition(20, buttonTabGlobal.y - 50);
        this.addChild(this._iconClan, 1);

        var clanName = "Clan Prooooooo"
        this._labelClanName = cc.LabelBMFont(clanName, font.soji20);
        this._labelClanName.setAnchorPoint(0, 0.5);
        this._labelClanName.scale = 0.7
        this._labelClanName.setPosition(this._iconClan.x + 25, this._iconClan.y);
        this.addChild(this._labelClanName, 1);

        var textFieldChatBG = cc.Sprite(res.clanChatGUI.editTextChat);
        textFieldChatBG.setAnchorPoint(0, 0.5);
        textFieldChatBG.setPosition(5, this._iconClan.y - 35);
        this.addChild(textFieldChatBG, 1);
        this._textFieldChat = ccui.TextField("", font.soji20, 45);
        this._textFieldChat.setTextColor(cc.color(0, 0, 0, 255));
        this._textFieldChat.setPlaceHolder("                                         ");
        this._textFieldChat.setAnchorPoint(0, 0.5);
        this._textFieldChat.setPosition(15, this._iconClan.y - 35);
        this._textFieldChat.setMaxLength(45);
        this._textFieldChat.setMaxLengthEnabled(true);
        this._textFieldChat.set
        this.addChild(this._textFieldChat, 1);

        var buttonInfo = ccui.Button(res.clanChatGUI.buttonInfo);
        buttonInfo.setPosition(this._bg.width - 35, this._iconClan.y);
        this.addChild(buttonInfo);
        buttonInfo.addClickEventListener(function(){
            self.onShowClanInfo();
        }.bind(this));

        var buttonChat = ccui.Button(res.clanChatGUI.buttonChat);
        buttonChat.setPosition(buttonInfo.x, textFieldChatBG.y);
        this.addChild(buttonChat);
        buttonChat.addClickEventListener(function(){
            self.onChat();
        }.bind(this));

        this._layerUserOnline = cc.Sprite(res.clanChatGUI.layerUserOnline);
        this._layerUserOnline.setAnchorPoint(0, 0);
        this._layerUserOnline.setPosition(this._bg.width - 4, 0);
        this.addChild(this._layerUserOnline, 0);

        var labelMember = cc.LabelBMFont("THÀNH VIÊN", font.soji20);
        labelMember.scale = 0.6;
        labelMember.setPosition(this._bg.width + 47, buttonInfo.y);
        this.addChild(labelMember, 1);

        this._memberOnline = 3;
        this._memberTotal = 50;
        this._labelMemberOnline = cc.LabelBMFont("", font.soji20);
        this._labelMemberOnline.scale = 0.6;
        this._labelMemberOnline.setPosition(this._bg.width + 47, labelMember.y - 15);
        this._labelMemberOnline.setString(this._memberOnline + "/" + this._memberTotal);
        this.addChild(this._labelMemberOnline, 1);

        var layerOnlineSeparator = cc.Sprite(res.clanChatGUI.lineSeparateOnline);
        layerOnlineSeparator.setPosition(this._labelMemberOnline.x, this._labelMemberOnline.y - 8);
        this.addChild(layerOnlineSeparator, 1);
    },

    initListenerAppear: function(){
        this._bgNull = cc.Sprite(cc.tmp_effect);
        //this._bgNull.width = cc.winSize.width;
        //this._bgNull.height = cc.winSize.height;
        this.addChild(this._bgNull, -1);

        this._listenerAppear = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._listenerAppear.setEnabled(false);
        cc.eventManager.addListener(this._listenerAppear, this);
    },
    onAppear: function() {
        this._listenerAppear.setEnabled(true);
    },
    onDisappear: function(){
        this._listenerAppear.setEnabled(false);
    },

    addButtonExpand: function(){
        var self = this;
        var isExpanded = false;
        this._guiButtonClanChat = ccui.Button(res.clanChatGUI.buttonBG);
        this._guiButtonClanChat.setAnchorPoint(0, 0.5);
        this._guiButtonClanChat.setPosition(this._bg.width + this._layerUserOnline.width - 6, this._bg.height/2);
        this.addChild(this._guiButtonClanChat, 2);
        this._guiButtonClanChat.addClickEventListener(function(){
            var actAppearLayer = cc.MoveBy(0.35, cc.p(self.scale*(self._bg.width + self._layerUserOnline.width) - 5, 0));
            if (!isExpanded){
                if (self._listItemUserOnline.length == 0) // lần đầu khởi tạo
                    self.initContent();
                // if (!gv.clanChatEventManager.chatStatusUpdated)
                //     self.updateChatEvent();
                // if (!gv.clanChatEventManager.userOnlineUpdated)
                //     self.updateUserOnlineEvent();

                // Cập nhật lại thời gian cho thanh chat
                self.updateTimeScrollChat();

                // Thay hình ảnh cho button và chạy Action
                fn.replaceSpriteImage(iconButton, res.clanChatGUI.buttonCollapse);
                self.runAction(actAppearLayer.clone());
                self.onAppear();
            }
            else {
                // Thay hính ảnh cho button và chạy Action
                fn.replaceSpriteImage(iconButton, res.clanChatGUI.buttonExpand);
                self.runAction(actAppearLayer.clone().reverse());
                self.onDisappear();
            }
            isExpanded = !isExpanded;
        }.bind(this));

        var iconButton = null;
        if (isExpanded)
            iconButton = cc.Sprite(res.clanChatGUI.buttonCollapse);
        else
            iconButton = cc.Sprite(res.clanChatGUI.buttonExpand);
        iconButton.setAnchorPoint(0, 0.5);
        iconButton.setPosition(this._bg.width + this._layerUserOnline.width - 6, this._bg.height/2);
        this.addChild(iconButton, 2);
    },

    onShowClanInfo: function()
    {
        cc.log("Show Clan Info");
    },
    initContent: function(){
        this.initClanInfo();
        this.initScrollviewChat();
        this.initScrollviewUserOnline();
    },

    // Cập nhật lại thời gian Chat khi nhấn mở layer
    updateTimeScrollChat: function(){
        for (var i=0; i < this._listItemChat.length; i++){
            this._listItemChat[i].updateTime();
        }
    },

    initClanInfo: function(){
        var iconClanOrder = Math.floor(Math.random() * 28) + 1;
        fn.replaceSpriteImage(this._iconClan, "res/Art/Bang hoi/bieu tuong nho/" + iconClanOrder + ".png");
        this._labelClanName.setString("Clan No." + iconClanOrder);
    },
    // Lấy ra độ cao của Container
    getScrollviewInnerContainerSize: function(type){
        var width = 0;
        var height = 0;
        if (type == 0){
            for (var i = 0; i < this._listItemChat.length; i++)
                height += this._listItemChat[i]._height ;
            height = Math.max(360, height);
            width = this._scrollviewChat.width;
        }
        if (type == 1){
            for (var i = 0; i < this._listItemUserOnline.length; i++)
            {
                height += 20;
            }
            width = this._scrollviewUserOnline.width;
        }
        return cc.size(width, height);
    },
    initScrollviewChat: function() {
        if (!this._scrollviewChat) {
            this._scrollviewChat = ccui.ScrollView();
            this._scrollviewChat.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._scrollviewChat.setTouchEnabled(true);
            this._scrollviewChat.setBounceEnabled(true);
            this._scrollviewChat.setPosition(0, 0);
            this._scrollviewChat.width = this._bg.width + 10;
            this._scrollviewChat.height = this._bg.height - 115;
            this.addChild(this._scrollviewChat, 1);
        }
    },
    //Load lịch sử chat từ server
    loadChatTextFromServer: function()
    {
        var chatQuantity = gv.clanChat.jsonLoadText["chatQuantity"];
        if (!this._listItemChat) this._listItemChat = [];
        var jsonItem = null;
        for (var i=0; i<chatQuantity; i++){
            jsonItem = gv.clanChat.jsonLoadText["detail"][i];
            var itemClanChat = new ItemChat(i, 0, jsonItem["userName"], jsonItem["userLevel"], jsonItem["msg"], jsonItem["timeCreated"]);
            itemClanChat.retain();
            this._listItemChat.push(itemClanChat);
        }
        this._clanChatLoaded ++;
        if (this._clanChatLoaded == 2)
            this.onCombileChatFromServer();
    },
    loadChatDonateFromServer: function()
    {
        var chatQuantity = gv.clanChat.jsonLoadDonate["chatQuantity"];
        if (!this._listItemChat) this._listItemChat = [];
        var jsonItem = null;
        for (var i=0; i<chatQuantity; i++){
            jsonItem = gv.clanChat.jsonLoadDonate["detail"][i];
            var userName = jsonItem["userName"];
            var userLevel = jsonItem["userLevel"];
            var msg = jsonItem["msg"];
            var timeCreated = jsonItem["timeCreated"];
            var curentHousingSpace = jsonItem["currentHousingSpace"];
            var maxHousingSpace = jsonItem["maxHousingSpace"];
            var jsonTroopDonated = jsonItem["troopDonated"];
            var troopDonated = [jsonTroopDonated["troop_0"], jsonTroopDonated["troop_1"], jsonTroopDonated["troop_2"], jsonTroopDonated["troop_3"]];
            var itemClanChat = new ItemChat(i, 1, userName, userLevel, msg, timeCreated, curentHousingSpace, troopDonated, maxHousingSpace);
            itemClanChat.retain();
            this._listItemChat.push(itemClanChat);
        }
        this._clanChatLoaded ++;
        if (this._clanChatLoaded == 2)
            this.onCombileChatFromServer();
    },
    onCombileChatFromServer: function()
    {
        // Cập nhật lại độ cao cho Inner container
        this._listItemChat.sort(function(a, b){
            return a._time - b._time;
        });
        this._scrollviewChat.setInnerContainerSize(this.getScrollviewInnerContainerSize(this._typeDefine.chatScrollView));
        var height = this._scrollviewChat.getInnerContainerSize().height;
        var length = this._listItemChat.length-1;
        for (var i=length; i>-1; i--)
        {
            this._listItemChatY[i] = ((i==length)? height : this._listItemChatY[i+1]) - this._listItemChat[i]._height ;
        }
        for (var i = 0; i < length+1; i++){
            this._listItemChat[i].setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[i]);
            this._scrollviewChat.addChild(this._listItemChat[i], 2);
        };
    },
    //Cập nhật vị trí các ItemChat khi tràn 100
    updateOnOutOfMax: function()
    {
        this._scrollviewChat.setInnerContainerSize(this.getScrollviewInnerContainerSize(this._typeDefine.chatScrollView));
        var length = this._listItemChat.length;
        for (var i=length-1; i>-1; i--)
        {
            var y = (i== length-1)? this._scrollviewChat.getInnerContainerSize().height - this._listItemChat[length-1]._height : this._listItemChatY[i+1] - this._listItemChat[i]._height;
            this._listItemChatY[i] = y;
            this._listItemChat[i].y = y;
        }
    },
    //Đẩy Item chat mới vào mảng và Add vào ScrollView
    addItemChat: function(index){
        var newItemChat = this._listItemChat[index];
        newItemChat.setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[index]);
        this._scrollviewChat.addChild(newItemChat, 2);

        if (this._listItemChat.length > this._maxLengthChat)
        {
            var length = this._listItemChat.length;
            for (var t=0; t<=length-this._maxLengthChat-1; t++) {
                this._scrollviewChat.removeChild(this._listItemChat[t]);
            }
            this._listItemChat = this._listItemChat.slice(length - this._maxLengthChat, length);
            this._listItemChat.length = this._maxLengthChat;
            this._listItemChatY = this._listItemChatY.slice(length - this._maxLengthChat, length);
            this._listItemChatY.length = this._maxLengthChat;
            this.updateOnOutOfMax();
        };
        this.updateTimeScrollChat();
    },
    onChat: function()
    {
        if (this._textFieldChat.string.length == 0) return;
        testnetwork.connector.sendChat(this._textFieldChat.string);
        this._textFieldChat.string = "";
        this.updateListChatItemY()
    },
    //Cập nhật mảng tọa độ y cho Item mới nhất
    updateListChatItemY: function()
    {
        var length = this._listItemChat.length;
        this._listItemChatY[length-1] = (length == 1)? 360-this._listItemChat[0]._height : (this._listItemChatY[length-2] + this._listItemChat[length-2]._height);
    },

    //Nhận 1 Response Chat mới từ server
    onReceiveChatText: function(){
        var userName = gv.clanChat.jsonChatText["userName"];
        var userLevel = gv.clanChat.jsonChatText["userLevel"];
        var msg = gv.clanChat.jsonChatText["msg"];
        var newItemChat = new ItemChat(0, 0, userName, userLevel, msg, new Date().getTime());
        this._listItemChat.push(newItemChat);
        var index = this._listItemChat.length-1;
        var newHeight = (index == 0)? this._scrollviewChat.height : this._scrollviewChat.getInnerContainerSize().height + this._listItemChat[index]._height;
        this._scrollviewChat.setInnerContainerSize(cc.size(this._scrollviewChat.width, newHeight));
        this.updateListChatItemY();
        this.addItemChat(index);
        this._scrollviewChat.scrollToTop(1, 0);
    },
    // Nhận 1 Response Donate mới từ server
    onReceiveChatDonate: function(){
        var userName = gv.clanChat.jsonChatDonate["userName"];
        var userLevel = gv.clanChat.jsonChatDonate["userLevel"];
        var msg = gv.clanChat.jsonChatDonate["msg"];
        var currentHousingSpace = gv.clanChat.jsonChatDonate["housingSpaceDonated"];
        var maxHousingSpace = gv.clanChat.jsonChatDonate["maxHousingSpace"];
        var newItemChat = new ItemChat(0, 1, userName, userLevel, msg, new Date().getTime(), currentHousingSpace, [0, 0, 0, 0], maxHousingSpace);

        var indexExisted = this.getItemChatByUserName(1, userName);
        if (indexExisted != null)        // Item Request đang tồn tại thì đưa lên trên
        {
            this._listItemChat[indexExisted]._time = new Date().getTime();
            this._listItemChat[indexExisted]._userLevel = userLevel;
            this._listItemChat[indexExisted]._text = msg;
            this._listItemChat[indexExisted]._maxTroopQuantity = maxHousingSpace;
            this._listItemChat[indexExisted].visualizeByArg();

            this.onMoveUpItem(this.getItemChatByUserName(1, userName));
            return;
        }
        this._listItemChat.push(newItemChat);
        var index = this._listItemChat.length-1;
        var newHeight = (index == 0)? this._scrollviewChat.height : this._scrollviewChat.getInnerContainerSize().height + this._listItemChat[index]._height;
        this._scrollviewChat.setInnerContainerSize(cc.size(this._scrollviewChat.width, newHeight));
        this.updateListChatItemY();
        this.addItemChat(index);
        this._scrollviewChat.scrollToTop(1, 0);
    },
    onReceiveDonate: function()
    {
        var userName = gv.clanChat.jsonDonate["userName"];
        var userDonate = gv.clanChat.jsonDonate["userDonate"];
        var troopOrder = gv.clanChat.jsonDonate["troopOrder"];
        var troopLevel = gv.clanChat.jsonDonate["troopLevel"];

        if (userName == cf.user._name)
        {
            var troopName = gv.troopName[troopOrder];
            fr.getCurrentScreen().onBubble("Nhận được 1x " + troopName + " level " + troopLevel + " từ " + userDonate);
        }

        var index = this.getItemChatByUserName(1, userName);
        if (index == null) return;
        this._listItemChat[index].onAddTroop(troopOrder, userDonate);
        if (userDonate == cf.user._name)
            gvGUI.popUpDonateTroop.updateStatus();
    },

    // Lấy ra 1 Item chat qua loại, user name __ nếu = null: user chưa có lượt donate và ngược lại
    getItemChatByUserName: function(type, userName)
    {
        for (var i=0; i<this._listItemChat.length; i++)
        {
            var item = this._listItemChat[i];
            if (item._userName == userName && item._type == type)
                return i;
        }
        return null;
    },
    // Đưa Item chat có chỉ số index lên trên đầu tiên
    onMoveUpItem: function(index)
    {
        cc.log(index);
        var length = this._listItemChat.length;
        for (var i=index; i<length-1; i++)
        {
            var h = this._listItemChat[i+1]._height;
            var y = this._listItemChatY[i];
            var tmpItem = this._listItemChat[i];
            this._listItemChat[i] = this._listItemChat[i+1];
            this._listItemChat[i+1] = tmpItem;

            this._listItemChatY[i] = y;
            this._listItemChat[i].y = this._listItemChatY[i];
            this._listItemChatY[i+1] = this._listItemChatY[i] + h;
            this._listItemChat[i+1].y = this._listItemChatY[i+1];
        }
        //for (var i=index; i<length-1; i++)
        //{
        //    var h = this._listItemChat[i+1]._height;
        //    var y = this._listItemChatY[i];
        //    var tmpItem = this._listItemChat[i];
        //    this._listItemChat[i] = this._listItemChat[i+1];
        //    this._listItemChat[i+1] = tmpItem;
        //
        //    this._listItemChatY[i] = y;
        //    this._listItemChat[i].y = this._listItemChatY[i];
        //    this._listItemChatY[i+1] = this._listItemChatY[i] + h;
        //    this._listItemChat[i+1].y = this._listItemChatY[i+1];
        //}
    },
    // Xóa 1 Item
    onRemoveItem: function(index)
    {
        this.onMoveUpItem(index);
        var size = this._scrollviewChat.getInnerContainerSize();
        var lastItem = this._listItemChat[this._listItemChat.length-1];
        cc.log("++++ Inner ConatainerSize: " + size.height + " =>> " + (size.height - lastItem._height));
        this._scrollviewChat.setInnerContainerSize(cc.size(size.width, size.height - lastItem._height));
        this._scrollviewChat.removeChild(lastItem);
        this._listItemChat[this._listItemChat.length-1]._userName = null;
        this.onUpdateItemY();
    },
    _onRemoveItem: function(index)
    {
        this.onMoveUpItem(index);
        var size = this._scrollviewChat.getInnerContainerSize();
        var lastItem = this._listItemChat[this._listItemChat.length-1];
        cc.log("++++ Inner ConatainerSize: " + size.height + " =>> " + (size.height - lastItem._height));
        this._scrollviewChat.setInnerContainerSize(cc.size(size.width, size.height - lastItem._height));
        this._scrollviewChat.removeChild(lastItem);
        this._listItemChat = this._listItemChat.splice(this._listItemChat.length-1, 1);
        this.onUpdateItemY();
    },
    // Cập nhật lại độ cao các Item
    onUpdateItemY: function()
    {
        var length = this._scrollviewChat.length-1;
        var size = this._scrollviewChat.getInnerContainerSize();
        for (var i=length; i>-1; i-- )
        {
            var item = this._listItemChat[i];
            this._listItemChatY[i] = ((i == length) ? size.height : this._listItemChatY[i+1]) - item._height;
            this._listItemChat[i].y = this._listItemChatY[i];
        }
    },

    initScrollviewUserOnline: function(){
        if (!this._scrollviewUserOnline)
        {
            this._scrollviewUserOnline = ccui.ScrollView();
            this._scrollviewUserOnline.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._scrollviewUserOnline.setTouchEnabled(true);
            this._scrollviewUserOnline.setBounceEnabled(true);
            this._scrollviewUserOnline.setPosition(this._bg.width, 0);
            this._scrollviewUserOnline.width = this._layerUserOnline.width;
            this._scrollviewUserOnline.height = this._layerUserOnline.height - 90;
            this.addChild(this._scrollviewUserOnline, 1);
        };

        //Tạo list Item user online
        if (this._listItemUserOnline.length != 0) return;
        this._listItemUserOnline = [];
        var memberQuantity = 20;
        var memberOnline = 0;
        // Đẩy Item User Online vào list và cập nhật số người Online
        for (var i = 0; i < memberQuantity; i++){
            this._listItemUserOnline.push(new ItemUserOnline(i, "User " + i, Math.random() < 0.5));
            memberOnline += this._listItemUserOnline[i]._status ? 1 : 0;
        };
        this._labelMemberOnline.setString(memberOnline + "/" + memberQuantity);

        //Sắp xếp user online lên trên
        this._listItemUserOnline.sort(function(a, b){
            return (a._status ? 0 : 1) - (b._status ? 0 : 1);
        });

        this._scrollviewUserOnline.setInnerContainerSize(this.getScrollviewInnerContainerSize(this._typeDefine.userOnlineScrollView));

        // Lấy vị trí cho Item them order
        for (var i = 0; i < memberQuantity; i++){
            this._listItemUserOnline[i].setPosition(this._scrollviewUserOnline.width/2 - 6, this._scrollviewUserOnline.getInnerContainerSize().height - 10 - i*20 );
            this._scrollviewUserOnline.addChild(this._listItemUserOnline[i], 2);
        };

        //Xóa 1 phần tử
        this._scrollviewUserOnline.removeChild(this._listItemUserOnline[0], false);
        this._scrollviewUserOnline.setInnerContainerSize(cc.size(this._scrollviewUserOnline.width, 20 * (memberQuantity-1)));
        this._listItemUserOnline.splice(0, 1);
        for (var i = 0; i < memberQuantity-1; i++){
            this._listItemUserOnline[i].setPosition(this._scrollviewUserOnline.width/2 - 6, this._scrollviewUserOnline.getInnerContainerSize().height - 10 - i*20 );
        };
    },
})