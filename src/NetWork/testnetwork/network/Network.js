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
        switch (cmd)
        {
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
        pk.pack(this._userName);
        this.gameClient.sendPacket(pk);
    },
    sendBuild: function(id, row, col)
    {
        cc.log("Send Build: " + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendBuild);
        pk.pack(id, row, col);
        this.gameClient.sendPacket(pk);
    },
    sendMove:function(id, row, col){
        cc.log("SendMove:" + id + " row: " + row + " col: " + col);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(id, row, col);
        this.gameClient.sendPacket(pk);
    },

});



