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

    _typeDefine: {
        chatScrollView: 0,
        userOnlineScrollView: 1,
    },

    // Độ dài tối đa danh sách tin nhắn và độ dài tin nhắn mà Client resquest
    _maxLengthChat: 90,
    _lengthChatPerLoad: 30,

    // Listener On Appear
    _listenerAppear: null,

    ctor: function() {
        this._super();
        this.setAnchorPoint(0, 0);

        this.init();
        //this.updateContent();
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
        this._textFieldChat = ccui.TextField();
        this._textFieldChat.setTextColor(cc.color(0, 0, 0, 255));
        this._textFieldChat.setPlaceHolder("                                         ");
        this._textFieldChat.setAnchorPoint(0, 0.5);
        this._textFieldChat.setPosition(15, this._iconClan.y - 35);
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
                if (!gv.clanChatEventManager.chatStatusUpdated)
                    self.updateChatEvent();
                if (!gv.clanChatEventManager.userOnlineUpdated)
                    self.updateUserOnlineEvent();

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
        //this.initListClassItem();
        this.initScrollviewChat();
        this.initScrollviewUserOnline();
    },
    initClanInfo: function(){
        var iconClanOrder = Math.floor(Math.random() * 28) + 1;
        fn.replaceSpriteImage(this._iconClan, "res/Art/Bang hoi/bieu tuong nho/" + iconClanOrder + ".png");
        this._labelClanName.setString("Clan No." + iconClanOrder);
    },
    // Lấy ra độ cao của Container và set độ cao cho từng Item
    getScrollviewInnerContainerSize: function(type){
        var width = 0;
        var height = 0;
        if (type == 0){
            for (var i = 0; i < this._listItemChat.length; i++)
            {
                height += this._listItemChat[i]._height ;
                this._listItemChatY[i] = (i == 0) ? 0 : this._listItemChatY[i-1] + this._listItemChat[i-1]._height;
            }
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

    initScrollviewChat: function(){
        var chatQuantity = 15;
        if (!this._scrollviewChat)
        {
            this._scrollviewChat = ccui.ScrollView();
            this._scrollviewChat.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this._scrollviewChat.setTouchEnabled(true);
            this._scrollviewChat.setBounceEnabled(true);
            this._scrollviewChat.setPosition(0, 0);
            this._scrollviewChat.width = this._bg.width + 10;
            this._scrollviewChat.height = this._bg.height - 115;
            //this._scrollviewChat.setInnerContainerSize(cc.size(0, 0));

            this.addChild(this._scrollviewChat, 1);
        };

        if (this._listItemChat.length != 0) return;
        this._listItemChat = [];
        for (var i = 0; i < chatQuantity; i++){
            var itemClanChat = new ItemChat(i, i%3, "User " + i, i, "Hello, I am User " + i, new Date("Thu Aug 16 2018 17:35:35 GMT+0700 (SE Asia Standard Time)").getTime(), [1, 2, 3, 4], [23, 30, 42, 11], 100)
            this._listItemChat.push(itemClanChat);
        }

        if (chatQuantity < 1) return;
        // Cập nhật lại độ cao cho Inner container
        this._scrollviewChat.setInnerContainerSize(this.getScrollviewInnerContainerSize(this._typeDefine.chatScrollView));
        for (var i = 0; i < chatQuantity; i++){
            this._listItemChat[i].setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[i]);
            this._scrollviewChat.addChild(this._listItemChat[i], 2);
            var line = cc.Sprite(res.clanChatGUI.lineSeparateChat);
            line.setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[i]);
            this._scrollviewChat.addChild(line);
        };
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

    updateChatEvent: function(){

    },

    updateUserOnlineEvent: function(){
        //
    },

    // Cập nhật lại thời gian Chat khi nhấn mở layer
    updateTimeScrollChat: function(){
        for (var i=0; i < this._listItemChat.length; i++){
            this._listItemChat[i].updateTime();
        }
    },

    onChat: function()
    {
        if (this._textFieldChat.length == 0) return;
        var index = this._listItemChat.length;
        var newItemChat = new ItemChat(index, Math.floor(Math.random()*3), "User " + cf.user._name, index, this._textFieldChat.string, new Date().getTime(), [0, 2, 4, 1], [34, 12, 1, 2], 100);

        var containerSize = this._scrollviewChat.getInnerContainerSize();
        this._listItemChatY[index] = (index == 0) ? containerSize.height : this._listItemChatY[index-1] + this._listItemChat[index-1]._height;
        newItemChat.setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[index]);
        this._listItemChat.push(newItemChat);

        var line = cc.Sprite(res.clanChatGUI.lineSeparateChat);
        line.setPosition(this._scrollviewChat.width/2 - 6, this._listItemChatY[index]);
        this._scrollviewChat.addChild(line);

        if (this._listItemChat.length > this._maxLengthChat)
        {
            this._scrollviewChat.removeChild(this._listItemChat[0]);
            this._listItemChat.slice(0, 1);
        };

        this.updateInnerContaninerSize(this._typeDefine.chatScrollView);

        this._textFieldChat.string = "";
    },
    // cập nhật lại inner container size
    updateInnerContaninerSize: function(type){
        if (type == this._typeDefine.chatScrollView){
            var size = this._scrollviewChat.getInnerContainerSize();
            this._scrollviewChat.setInnerContainerSize(cc.size(size.width, size.height + this._listItemChat[this._listItemChat.length-1]._height));
            this._scrollviewChat.addChild(this._listItemChat[this._listItemChat.length - 1]);
            this._scrollviewChat.scrollToTop(1, true);
        }
    },
})