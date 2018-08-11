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
            case gv.CMD.ERROR:
                //try
                //{
                //    fr.view(MainLayer);
                //}
                //catch(e)
                //{
                //}
                //break;

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
        pk.pack(gv.usernameSendToServer);
        this.gameClient.sendPacket(pk);
    },
    sendBuild: function(id, row, col)
    {
        cc.log("Send Build: " + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendBuild);
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
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendResearch: function(troopType)
    {
        cc.log("SEND RESEARCH ID: " + troopType);
        var pk = this.gameClient.getOutPacket(CmdSendResearch);
        pk.pack(troopType);
        this.gameClient.sendPacket(pk);
    }

});



