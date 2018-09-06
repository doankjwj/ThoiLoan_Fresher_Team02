/**
 * Created by KienVN on 10/2/2017.
 */

var gv = gv||{};
var testnetwork = testnetwork||{};

testnetwork.Connector = cc.Class.extend({
    ctor:function(gameClient)
    {
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
        this._userName = "username";
    },
    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd) {
            case gv.CMD.HAND_SHAKE:
                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                this.sendGetUserInfo();
                fr.getCurrentScreen().onFinishLogin();
                break;
            case gv.CMD.USER_INFO:
                //fr.getCurrentScreen().onUserInfo(packet.name, packet.x, packet.y);
                fr.getCurrentScreen().onReceiveUserInfo();
                break;
            case gv.CMD.MOVE:
                cc.log("MOVE:", packet.x, packet.y);
                fr.getCurrentScreen().updateMove(packet.x, packet.y);
                break;

            case gv.CMD.BROADCAST_CHAT_TEXT:                                                    /*Nhận broadcast 1 tin nhắn text*/
                gvGUI.layerClanChat.onReceiveChatText();
                break;
            case gv.CMD.BROADCAST_REQUEST_DONATE:                                               /*Nhận broadcast 1 tin nhắn xin quân*/
                gvGUI.layerClanChat.onReceiveChatDonate();
                break;
        case gv.CMD.BROADCAST_CLAN_EVENT:                                                       /*Nhận broadcast 1 tin Sự kiện bang hội*/
                gvGUI.layerClanChat.onReceiveEvent();
                break;
            case gv.CMD.BROADCAST_DONATE:                                                       /*Nhận broadcast 1 tin nhắn cho quân*/
                gvGUI.layerClanChat.onReceiveDonate();
                cf.user._buildingList[gv.orderInUserBuildingList.clanCastle][0].addTroop();
                break;
            case gv.CMD.RECEIVE_LOAD_CLAN_CHAT:                                                 /*Nhận lịch sử chat*/
                gvGUI.layerClanChat.loadChatFromServer();
                gvGUI.layerClanChat.onUpdateClanInfo(true);
                cf.user._buildingList[gv.orderInUserBuildingList.clanCastle][0].updateNameAndFlag(true);
                cf.user._clanId = gv.clanChat.jsonLoad["clanId"];
                gvGUI.layerClanChat.onVisibleOrInvisibleButtonExpand();
                break;
            case gv.CMD.RECEIVE_LOAD_USER_ONLINE:                                               /*Nhận danh sách user online*/
                gvGUI.layerClanChat.loadUserOnlineFromServer();
                gvGUI.layerClanChat.onUpdateClanInfo(true);
                break;
            case gv.CMD.BROADCAST_USER_ONLINE_CHANGE:                                           /*Nhận thông tin 1 user online-> offline, ngược lại*/
                gvGUI.layerClanChat.updateStatusUserOnlineChange();
                break;
            case gv.CMD.USER_ERROR:
                break;
            case gv.CMD.CLAN_ERROR:
                break;
            case gv.CMD.RECEIVE_CLAN_SEARCH_BY_ID:
                fr.getCurrentScreen().getChildByTag(gv.tag.TAG_CLAN_SEARCH).updateListById();
                break;
            case gv.CMD.RECEIVE_CLAN_SEARCH_BY_NAME:
                fr.getCurrentScreen().getChildByTag(gv.tag.TAG_CLAN_SEARCH).updateListByName();
                break;
            case 37:
                break;
        }
    },
    sendGetUserInfo:function()
    {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendLoginRequest: function () {
        cc.log("sendLoginRequest");
        var pk = this.gameClient.getOutPacket(CmdSendLogin);
        pk.pack(gv.usernameSendToServer, gv.passwordSendToServer);
        this.gameClient.sendPacket(pk);
    },
    sendBuild: function(id, row, col)
    {
        cc.log("Send Build: " + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendBuild);
        pk.pack(id, row, col);
        this.gameClient.sendPacket(pk);
    },
    sendBuildCoin: function(id, row, col)
    {
        cc.log("Send Build Coin: " + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendBuildCoin);
        pk.pack(id, row, col);
        this.gameClient.sendPacket(pk);
    },
    sendUpgradeBuilding: function(id)
    {
        cc.log("Send Upgrade: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeBuilding);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendUpgradeBuildingCoin: function(id)
    {
        cc.log("Send Upgrade Coin: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeBuildingcoin);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendMove:function(id, row, col){
        cc.log("SendMove:" + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(id, row, col);
        this.gameClient.sendPacket(pk);
    },
    sendCheat: function( type, num)
    {
        cc.log("Cheat: Resource " + type + " " + num);
        var pk = this.gameClient.getOutPacket(CmdSendCheat);
        pk.pack(type, num);
        this.gameClient.sendPacket(pk);
    },
    sendResetUser: function()
    {
        cc.log("Reset User");
        var pk = this.gameClient.getOutPacket(CmdSendResetUser);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendInstantlyDone: function(id, pos)
    {
        cc.log("SEND INSTANTLY BUILD " + (id+1) + "" + pos);
        var pk = this.gameClient.getOutPacket(CmdSendInstant);
        pk.pack(id, pos);
        this.gameClient.sendPacket(pk);
    },
    sendCancel: function(id, pos) {
        cc.log("SEND CANCEL BUILD " + (id+1) + "" +pos);
        var pk = this.gameClient.getOutPacket(CmdSendCancel);
        pk.pack(id, pos);
        this.gameClient.sendPacket(pk);
    },
    sendHarvest: function(id)
    {
        cc.log("SEND HARVEST ID: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendHarvest);
        var resourceOrder = Math.floor(id/100) - 1;
        var resourceSlot = id % 100;
        pk.pack(resourceOrder, resourceSlot);
        this.gameClient.sendPacket(pk);
    },
    sendRemoveObstacle: function(id)
    {
        cc.log("SEND REMOVE OBSTACLE: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendRemoveObstacle);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendResearch: function(troopType)
    {
        cc.log("SEND RESEARCH ID: " + troopType);
        var pk = this.gameClient.getOutPacket(CmdSendResearch);
        pk.pack(troopType);
        this.gameClient.sendPacket(pk);
    },
    sendResearchFinishImmidiately: function(troopType)
    {
        cc.log("SEND RESEARCH IMMIDIATELY: " + troopType);
        var pk = this.gameClient.getOutPacket(CmdSendResearchFinishImmidiately);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendCreateClan: function(clanName, flag, description, authentication){
        cc.log("SEND CREATE CLAN : " + clanName);
        var pk = this.gameClient.getOutPacket(CmdSendCreateClan);
        pk.pack(clanName, flag, description, authentication);
        this.gameClient.sendPacket(pk);
    },
    sendJoinClan: function(clanId){
        cc.log("SEND JOIN CLAN : " + clanId);
        var pk = this.gameClient.getOutPacket(CmdSendJoinClan);
        pk.pack(clanId);
        this.gameClient.sendPacket(pk);
    },

    // Gửi 1 request Chat
    sendChat: function(msg){
        cc.log("SEND CLAN CHAT: " + msg);
        var pk = this.gameClient.getOutPacket(CmdSendChat);
        pk.pack(msg);
        this.gameClient.sendPacket(pk);
    },
    // Gửi 1 request Donate
    sendRequestDonate: function(msg){
        cc.log("NEW REQUEST DONATE: " + msg);
        var pk = this.gameClient.getOutPacket(CmdSendRequestDonate);
        pk.pack(msg);
        this.gameClient.sendPacket(pk);
    },
    // Gửi Request Donate cho 1 người khác
    sendDonate: function(tag, troopOrder)
    {
        cc.log("NEW DONATE: " + "tag: " + tag + ", troopOrder: " + troopOrder);
        var pk = this.gameClient.getOutPacket(CmdSendDonate);
        pk.pack(tag, troopOrder);
        this.gameClient.sendPacket(pk);
    },
    // Gửi Request lấy lịch sử chat Text
    sendRequestLoadClanChat: function(){
        cc.log("SEND REQUEST LOAD CLAN CHAT HISTORY");
        var pk = this.gameClient.getOutPacket(CmdSendRequestLoadClanChat);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendSearchByName: function(str) {
        cc.log("SEND SEARCH REQUEST BY NAME");
        var pk = this.gameClient.getOutPacket(CmdSendSearchByName);
        pk.pack(str);
        this.gameClient.sendPacket(pk);
    },

    sendSearchById: function(id) {
        cc.log("SEND SEARCH REQUEST BY ID");
        var pk = this.gameClient.getOutPacket(CmdSendSearchByID);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },

    sendQuitClan: function(){
        cc.log("SEND QUIT CLAN REQUEST");
        var pk = this.gameClient.getOutPacket(CmdSendQuitClan);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendJoinClan: function(id){
        cc.log("SEND JOIN CLAN REQUEST");
        var pk = this.gameClient.getOutPacket(CmdSendJoinClan);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },

    sendGetSuggestClan: function(){
        cc.log("SEND GET SUGGEST CLAN REQUEST");
        var pk = this.gameClient.getOutPacket(CmdSendGetSuggestClan);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendGetUserClan: function(){
        cc.log("SEND GET USER'S CLAN");
        var pk = this.gameClient.getOutPacket(CmdSendGetUserClan);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },

    sendGetMemberList: function(id) {

        cc.log("GET MEMBER LIST CLAN : " + id);
        var pk = this.gameClient.getOutPacket(CmdSendGetMemberList);
        pk.pack(id);
        this.gameClient.sendPacket(pk);

    },

    sendKickUser: function(name) {
        cc.log("Kick member : " + name);
        var pk = this.gameClient.getOutPacket(CmdSendKickUser);
        pk.pack(name);
        this.gameClient.sendPacket(pk);
    },

    sendTrainTroop: function(id, troopType) {

        cc.log("TRAIN TROOP : " + troopType  + " FROM BAR: " + id);

        var pk = this.gameClient.getOutPacket(CmdSendTrainTroop);

        var group = Math.floor(id/100) - 1;
        var slot = id % 100;

        pk.pack(group, slot, troopType - 1);
        this.gameClient.sendPacket(pk);

    },

    sendRemoveTrainTroop: function(id, troopType)
    {
        cc.log("REMOVE TRAIN TROOP: " + troopType + " FROM BAR: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendRemoveTrainTroop);

        var group = Math.floor(id/100) - 1;
        var slot = id%100;

        pk.pack(group, slot, troopType - 1);
        this.gameClient.sendPacket(pk);
    },

    sendQuickFinishTrain: function(id)
    {
        cc.log("QUICK FINISH TRAIN: " + id);
        var pk = this.gameClient.getOutPacket(CmdSendFinishTrainTroop);

        var group = Math.floor(id/100) - 1;
        var slot = id%100;

        pk.pack(group, slot);
        this.gameClient.sendPacket(pk);
    },

    sendRequestAddCoLeader: function(name) {

        cc.log("SET COLEADER : " + name);


        var pk = this.gameClient.getOutPacket(CmdSendRequestAddCoLeader);

        pk.pack(name);
        this.gameClient.sendPacket(pk);

    },

    sendRemoveCoLeader: function(name) {

        cc.log("REMOVE COLEADER : " + name);
        var pk = this.gameClient.getOutPacket(CmdSendRequestRemoveCoLeader);
        pk.pack(name);
        this.gameClient.sendPacket(pk);

    },

    sendRequestChangeLeader: function(name){

        cc.log("Change LEADER : " + name);
        var pk = this.gameClient.getOutPacket(CmdSendRequestChangeLeader);
        pk.pack(name);
        this.gameClient.sendPacket(pk);

    }

});



