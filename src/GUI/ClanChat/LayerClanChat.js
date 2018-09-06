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
    init: function() {
        var self = this;

        this._bg = cc.Sprite(res.clanChatGUI.chatBG);
        this._bg.setAnchorPoint(0, 0);
        this.addChild(this._bg, 0);

        var buttonTabClan = cc.Sprite(res.clanChatGUI.buttonTabSelected);
        var titleClan = cc.LabelBMFont("BANG HỘI", font.soji20);
        titleClan.setPosition(buttonTabClan.width / 2, buttonTabClan.height / 2 - 2);
        titleClan.scale = 0.8;
        titleClan.setAnchorPoint(0.5, 0.5);
        buttonTabClan.addChild(titleClan);
        buttonTabClan.setAnchorPoint(0, 1);
        buttonTabClan.setPosition(this._bg.width / 2, this._bg.height - 6);
        this.addChild(buttonTabClan, 1);

        var buttonTabGlobal = cc.Sprite(res.clanChatGUI.buttonTabUnselected);
        var titleGlobal = cc.LabelBMFont("THẾ GIỚI", font.soji20);
        titleGlobal.setPosition(buttonTabGlobal.width / 2, buttonTabGlobal.height / 2);
        titleGlobal.scale = 0.8;
        titleGlobal.setAnchorPoint(0.5, 0.5);
        buttonTabGlobal.addChild(titleGlobal);
        buttonTabGlobal.setAnchorPoint(1, 1);
        buttonTabGlobal.setPosition(this._bg.width / 2, this._bg.height - 6);
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
        buttonInfo.addClickEventListener(function () {
            self.onShowClanInfo();
        }.bind(this));

        var buttonChat = ccui.Button(res.clanChatGUI.buttonChat);
        buttonChat.setPosition(buttonInfo.x, textFieldChatBG.y);
        this.addChild(buttonChat);
        buttonChat.addClickEventListener(function () {
            self.onChat();
            //self.resetScrollViewChat();
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

        /*Đẩy Clan Icon và clan Name*/
        //this.onUpdateClanInfo();
    },

    /*Hiển thị hoặc ẩn nút Expand*/
    onVisibleOrInvisibleButtonExpand: function()
    {
        var vis = (cf.user._clanId != -1);
        if (!vis && this._isExpanded)
        {
            actAppearLayer = cc.MoveBy(0.35, cc.p(this.scale*(this._bg.width + this._layerUserOnline.width) - 5, 0));
            fn.replaceSpriteImage(this._iconButton, res.clanChatGUI.buttonExpand);
            this.runAction(actAppearLayer.clone().reverse());
            this.onDisappear();
        };

        this._guiButtonClanChat.setVisible(vis);
        this._iconButton.setVisible(vis);
    },
    /*Cập nhật ảnh và Tên Clan*/
    onUpdateClanInfo: function(boo)
    {
        this._labelClanName.setString(gv.clanChat.jsonLoad["clanName"]);
        var clanFlag = gv.clanChat.jsonLoad["clanFlag"];
        fn.replaceSpriteImage(this._iconClan, "res/Art/Bang hoi/icon bieu tuong/" + (clanFlag+1) + ".png");
        this.visibleInfo(boo)
    },
    visibleInfo: function(boo)
    {
        this._labelClanName.visible = boo;
        this._iconClan.visible = boo;
        this._labelMemberOnline.visible = boo;
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
        this._isExpanded = false;
        this._guiButtonClanChat = ccui.Button(res.clanChatGUI.buttonBG);
        this._guiButtonClanChat.setAnchorPoint(0, 0.5);
        this._guiButtonClanChat.setPosition(this._bg.width + this._layerUserOnline.width - 6, this._bg.height/2);
        this.addChild(this._guiButtonClanChat, 2);
        this._guiButtonClanChat.addClickEventListener(function(){
            if (cf.user._clanId == -1) return;
            var actAppearLayer = cc.MoveBy(0.35, cc.p(self.scale*(self._bg.width + self._layerUserOnline.width) - 5, 0));
            if (!this._isExpanded){
                if (self._listItemUserOnline.length == 0) // lần đầu khởi tạo
                    self.initContent();

                // Cập nhật lại thời gian cho thanh chat
                self.updateTimeScrollChat();

                // Thay hình ảnh cho button và chạy Action
                fn.replaceSpriteImage(this._iconButton, res.clanChatGUI.buttonCollapse);
                self.runAction(actAppearLayer.clone());
                self.onAppear();
            }
            else {
                // Thay hính ảnh cho button và chạy Action
                fn.replaceSpriteImage(this._iconButton, res.clanChatGUI.buttonExpand);
                self.runAction(actAppearLayer.clone().reverse());
                self.onDisappear();
            }
            this._isExpanded = !this._isExpanded;
        }.bind(this));

        this._iconButton = null;
        if (this._isExpanded)
            this._iconButton = cc.Sprite(res.clanChatGUI.buttonCollapse);
        else
            this._iconButton = cc.Sprite(res.clanChatGUI.buttonExpand);
        this._iconButton.setAnchorPoint(0, 0.5);
        this._iconButton.setPosition(this._bg.width + this._layerUserOnline.width - 6, this._bg.height/2);
        this.addChild(this._iconButton, 2);
    },

    onShowClanInfo: function()
    {
        //if (gv.building_selected === undefined) return;
        var building = cf.user._buildingList[gv.orderInUserBuildingList.clanCastle][0];
        if (building._isActive === false) return;

        var root = fr.getCurrentScreen();
        if(cf.user._clanId === -1) {
            if(root.getChildByTag(gv.tag.TAG_CLAN_JOIN) === null) {

                var popupClan = new JoinClan();
                popupClan.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                root.addChild(popupClan, 1, gv.tag.TAG_CLAN_JOIN);
                popupClan.onAppear();

            }
            else root.getChildByTag(gv.tag.TAG_CLAN_JOIN).onAppear();
        }
        else {

            testnetwork.connector.sendGetUserClan();

            if(gv.clanMemberList === null) testnetwork.connector.sendGetMemberList(gv.userClan.id);
            var clanDetail;
            if(root.getChildByTag(gv.tag.TAG_CLAN_DETAIL) === null) {
                clanDetail = new ClanDetail();
                clanDetail.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
                root.addChild(clanDetail, 1, gv.tag.TAG_CLAN_DETAIL);
            } else clanDetail = root.getChildByTag(gv.tag.TAG_CLAN_DETAIL);

            clanDetail.onAppear(gv.userClan);
        };

        var actAppearLayer = cc.MoveBy(0.35, cc.p(this.scale*(this._bg.width + this._layerUserOnline.width) - 5, 0));
            // Thay hính ảnh cho button và chạy Action
            fn.replaceSpriteImage(this._iconButton, res.clanChatGUI.buttonExpand);
            this.runAction(actAppearLayer.clone().reverse());
            this.onDisappear();

        this._isExpanded = !this._isExpanded;
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
        if (type == this._typeDefine.chatScrollView){
            for (var i = 0; i < this._listItemChat.length; i++)
                height += this._listItemChat[i]._height ;
            height = Math.max(360, height);
            width = this._scrollviewChat.width;
        }
        if (type == this._typeDefine.userOnlineScrollView){
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
    resetScrollViewChat: function()
    {
        for (var i=0; i<this._listItemChat.length; i++)
            this._scrollviewChat.removeChild(this._listItemChat[i]);
        this.removeChild(this._scrollviewChat);
        this._scrollviewChat = null;
        this._listItemChat = [];
        this._listItemChatY = [];
        this.initScrollviewChat();
    },

    loadChatFromServer:function()
    {
        cc.log("CHAT RECEIVED: " + JSON.stringify(gv.clanChat.jsonLoad));
        if (!this._listItemChat) this._listItemChat = [];

        /*Chat Text*/
        var allChat = gv.clanChat.jsonLoad["chatText"];
        var jsonItem = null;
        for (var i=0; i<allChat.length; i++){
            jsonItem = allChat[i];
            var itemClanChat = new ItemChat(i, gv.clanChat.type.chatText, jsonItem["userName"], jsonItem["level"], jsonItem["message"], jsonItem["timeCreated"], null, null, null, gv.clanChat.colorType.chat);
            itemClanChat.retain();
            this._listItemChat.push(itemClanChat);
        }
        this._clanChatLoaded ++;

        /*Chat Donate*/
        var allDonate = gv.clanChat.jsonLoad["donate"];
        for (var i = 0; i < allDonate.length; i += 1)
        {
            jsonItem = allDonate[i];
            var userName = jsonItem["userName"];
            var userLevel = jsonItem["level"];
            var msg = jsonItem["message"];
            var timeCreated = jsonItem["timeCreated"];
            var curentHousingSpace = jsonItem["troopHousingSpace"];
            var maxHousingSpace = jsonItem["troopCapacity"];
            var jsonTroopDonated = jsonItem["selfDonatedTroop"];
            var troopDonated = [0,0,0,0];
            for (var j = 0; j < jsonTroopDonated.length; j += 1)
                troopDonated[jsonTroopDonated[j]["troopOrder"]] += 1;
            var itemClanChat = new ItemChat(i, gv.clanChat.type.donate, userName, userLevel, msg, timeCreated, curentHousingSpace, troopDonated, maxHousingSpace, gv.clanChat.colorType.requestDonate);
            itemClanChat.retain();
            this._listItemChat.push(itemClanChat);
        }

        /*Event Clan: Mời, bổ nhiệm, kick, ..*/
        var eventItemArr;
        var eventItem;
        var s0, s1, s2;
        var timeCreated;
        var msg;
        for (var i=0; i<gv.clanChat.jsonLoad["clanEvent"].length; i++)
        {
            eventItemArr = gv.clanChat.jsonLoad["clanEvent"][i];
            for (var j=0; j<eventItemArr.length; j++)
            {
                eventItem = eventItemArr[j];
                s0 = eventItem["userName"];
                if ([2, 3, 4, 7].indexOf(i) != -1)
                    s2 = eventItem["target"];
                else s2 = "";
                s1 = gv.clanChat.msgArr[i];
                msg = s0 + " " + s1 + " " + s2;
                timeCreated = eventItem["timeCreated"];
                var itemChat = new ItemChat(j, gv.clanChat.type.clanEvent, null, null, msg, timeCreated, null, null, null, gv.clanChat.colorArr[i]);
                itemChat.retain();
                this._listItemChat.push(itemChat);
            }
        }
        this._clanChatLoaded ++;
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
        };
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
        var newItemChat = new ItemChat(0, 0, userName, userLevel, msg, new Date().getTime(), null, null, null, gv.clanChat.colorType.chat);
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
        var newItemChat = new ItemChat(0, gv.clanChat.type.donate, userName, userLevel, msg, new Date().getTime(), currentHousingSpace, [0, 0, 0, 0], maxHousingSpace, gv.clanChat.colorType.requestDonate);

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

    /* Nhận 1 event từ server*/
    onReceiveEvent: function()
    {
        var eventType = gv.clanChat.jsonChatEvent["eventType"];
        /* Người chơi bị kick khỏi bang*/
        if (eventType == gv.clanChat.eventType.kicked) {
            if (gv.clanChat.jsonChatEvent["target"] == cf.user._name) {
                cf.user.onClanLeaveOrKicked();
                return;
            }
        }

        /* Hiển thị lên layer chat */
        var color = gv.clanChat.jsonChatEvent["isRed"];
        var msg = gv.clanChat.jsonChatEvent["text"];
        var itemChat = new ItemChat(0, gv.clanChat.type.clanEvent, null, null, msg, new Date().getTime(), null, null, null, gv.clanChat.colorArr[eventType]);
        itemChat.retain();
        this._listItemChat.push(itemChat);
        var index = this._listItemChat.length-1;
        var newHeight = (index == 0)? this._scrollviewChat.height : this._scrollviewChat.getInnerContainerSize().height + this._listItemChat[index]._height;
        this._scrollviewChat.setInnerContainerSize(cc.size(this._scrollviewChat.width, newHeight));
        this.updateListChatItemY();
        this.addItemChat(index);
        this._scrollviewChat.scrollToTop(1, 0);

        /* Nếu là sự kiện ra vào bang thì cập nhật lại layer user online*/
        if (eventType == gv.clanChat.eventType.joinClan || eventType == gv.clanChat.eventType.leaveClan || eventType == gv.clanChat.eventType.kicked)
            this.onChangeOnlineWhenMemberChange(eventType);
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
    },
    // Xóa 1 Item
    onRemoveItem: function(index)
    {
        this.onMoveUpItem(index);
        var size = this._scrollviewChat.getInnerContainerSize();
        var lastItem = this._listItemChat[this._listItemChat.length-1];
        this._scrollviewChat.setInnerContainerSize(cc.size(size.width, size.height - lastItem._height));
        this._scrollviewChat.removeChild(lastItem);
        this._listItemChat[this._listItemChat.length-1]._userName = null;
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

    initScrollviewUserOnline: function() {
        this._scrollviewUserOnline = ccui.ScrollView();
        this._scrollviewUserOnline.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._scrollviewUserOnline.setTouchEnabled(true);
        this._scrollviewUserOnline.setBounceEnabled(true);
        this._scrollviewUserOnline.setPosition(this._bg.width, 0);
        this._scrollviewUserOnline.width = this._layerUserOnline.width;
        this._scrollviewUserOnline.height = this._layerUserOnline.height - 90;
        this.addChild(this._scrollviewUserOnline, 1);
    },

    loadUserOnlineFromServer: function() {
        this._listItemUserOnline = [];
        this._memberOnlineQuantity = gv.clanChat.jsonUserOnline["memberOnline"];
        var jsonMemberOnline = gv.clanChat.jsonUserOnline["listMemberOnline"];
        for (var i = 0; i < this._memberOnlineQuantity; i++) {
            var itemUserOnline = new ItemUserOnline(i, jsonMemberOnline[i], true);
            itemUserOnline.retain();
            this._listItemUserOnline.push(itemUserOnline);
        }
        ;
        this._memberOfflineQuantity = gv.clanChat.jsonUserOnline["memberOffline"];
        var jsonMemberOffline = gv.clanChat.jsonUserOnline["listMemberOffline"];
        for (var i = 0; i < this._memberOfflineQuantity; i++) {
            var itemUserOffline = new ItemUserOnline(i, jsonMemberOffline[i], false);
            itemUserOffline.retain();
            this._listItemUserOnline.push(itemUserOffline);
        }
        ;

        this._memberQuantity = (this._memberOnlineQuantity + this._memberOfflineQuantity);
        this._labelMemberOnline.setString(this._memberOnlineQuantity + "/" + this._memberQuantity);

        this.loadItemUserOnlineToScrollView();
    },
    loadItemUserOnlineToScrollView: function()
    {
        //Sắp xếp user online lên trên
        this._listItemUserOnline.sort(function (a, b) {
            if (a._status != b._status)
                return (a._status ? 0 : 1) - (b._status ? 0 : 1);
            return a._name.localeCompare(b._name);
        });

        this._scrollviewUserOnline.setInnerContainerSize(this.getScrollviewInnerContainerSize(this._typeDefine.userOnlineScrollView));

        // Lấy vị trí cho Item theo order
        for (var i = 0; i < this._memberQuantity; i++) {
            var pos = cc.p(this._scrollviewUserOnline.width / 2 - 6, this._scrollviewUserOnline.getInnerContainerSize().height - 10 - i * 20);
            this._listItemUserOnline[i].setPosition(pos);
            this._listItemUserOnline[i].updateOrder(i);
            this._scrollviewUserOnline.addChild(this._listItemUserOnline[i], 2);
        }
        ;
    },

    /* Một người chơi online, offline và ngược lại*/
    updateStatusUserOnlineChange: function()
    {
        var userName = gv.clanChat.jsonUserOnlineChange["userName"];
        var status = gv.clanChat.jsonUserOnlineChange["status"];

        for (var i=0; i<this._listItemUserOnline.length; i++)
        {
            if (userName == (this._listItemUserOnline[i]._name))
            {
                this._listItemUserOnline[i].updateStatus(status);
                break;
            }
        }
        for (var i=0; i<this._listItemUserOnline.length; i++)
            this._scrollviewUserOnline.removeChild(this._listItemUserOnline[i]);
        this.loadItemUserOnlineToScrollView();
    },

    /*Cập nhật scroll view chat và user online nếu event là join/leave/kick*/
    onChangeOnlineWhenMemberChange: function(eventType)
    {
        var userName = gv.clanChat.jsonChatEvent["userName"];

        for (var i=0; i<this._listItemUserOnline.length; i++)
            this._scrollviewUserOnline.removeChild(this._listItemUserOnline[i]);

        /* Thành viên mới vào bang*/
        if (eventType == gv.clanChat.eventType.joinClan)
        {
            var itemUserOnline = new ItemUserOnline(0, userName, true);
            itemUserOnline.retain();
            this._listItemUserOnline.push(itemUserOnline);
            this._memberOnlineQuantity ++;
            this._memberQuantity ++;
            this.loadItemUserOnlineToScrollView();
        };

        /* Thành viên ra khỏi bang*/
        if (eventType == gv.clanChat.eventType.leaveClan)
        {
            for (var i=0; i <this._listItemUserOnline.length; i++)
                if (this._listItemUserOnline[i]._name == userName)
                {
                    this._listItemUserOnline.splice(i, 1);
                    break;
                };
            this.loadItemUserOnlineToScrollView();
        }

        /* Thành viên bị kick*/
        if (eventType == gv.clanChat.eventType.kicked)
        {
            var target = gv.clanChat.jsonChatEvent["target"]
            for (var i=0; i <this._listItemUserOnline.length; i++)
                if (this._listItemUserOnline[i]._name == target)
                {
                    this._listItemUserOnline.splice(i, 1);
                    break;
                };
        };


    },

    /* Xóa scroll user online mà không xóa danh sách lưu các Item*/
    resetScrollViewUserOnline: function()
    {
        for (var i=0; i<this._listItemUserOnline.length; i++)
            this._scrollviewUserOnline.removeChild(this._listItemUserOnline[i]);
        this.removeChild(this._scrollviewUserOnline);
        this._scrollviewUserOnline = null;
        this._listItemUserOnline = [];
        this._listItemUserOnlineY = [];
        this.initScrollviewUserOnline();
    },

    resetAll: function()
    {
        this.resetScrollViewChat();
        this.resetScrollViewUserOnline();
    }
})