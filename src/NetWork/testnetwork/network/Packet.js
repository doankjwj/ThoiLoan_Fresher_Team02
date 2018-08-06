/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.MOVE = 2310;
gv.CMD.BUILD = 2010;
gv.CMD.UPGRADE_BUILDING = 2110;
gv.CMD.CHEAT = 2880;
gv.CMD.SEND_INSTANT = 2150;
gv.CMD.SEND_CANCEL = 2210;

gv.CMD.RESET_USER = 2890;

gv.CMD.ERROR = 2999;

testnetwork = testnetwork||{};
testnetwork.packetMap = {};

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
)
CmdSendUserInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
)

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(username){
            this.packHeader();
            this.putString(username);
            this.updateSize();
        }
    }
)

CmdSendBuild = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.BUILD);
        },
        pack:function(id, row, col){
            var _id = Math.floor(id/100) - 1;
            this.packHeader();
            this.putByte(_id);
            this.putByte(row );
            this.putByte(col );
            this.updateSize();
        }
    }
);

CmdSendInstant = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_INSTANT);
    },
    pack:function(id, pos){
        this.packHeader();
        this.putByte(id);
        this.putByte(pos);
        this.updateSize();
    }
});


CmdSendCancel = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_CANCEL);
    },
    pack:function(id, pos){
        this.packHeader();
        this.putByte(id);
        this.putByte(pos);
        this.updateSize();
    }
});

CmdSendMove = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MOVE);
        },
        pack:function(id, row, col){
            this.packHeader();
            var _id = Math.floor(id/100) - 1;
            var _slot = id%100;
            this.putByte(_id);
            this.putByte(_slot);
            this.putByte(row );
            this.putByte(col );
            this.updateSize();
        }
    }
)

CmdSendCheat = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CHEAT);
        },
        pack:function(type, num){
            this.packHeader();
            this.putByte(type);
            this.putInt(num);
            this.updateSize();
        }
    }
);

CmdSendUpgradeBuilding = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UPGRADE_BUILDING);
        },
        pack:function(id){
            this.packHeader();
            this.putByte(Math.floor(id / 100)-1);
            this.putByte(id % 100);
            this.updateSize();
        }
    }
);


CmdSendResetUser = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.RESET_USER);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);


/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function()
        {
            this.ServerTimeStamp = this.getLong();

            gv.time = new Date(this.ServerTimeStamp);

            gv.timeOffset = this.ServerTimeStamp - new Date().getTime();

            /* Town Hall */
            this.map = new Object();
            var Amount = this.getByte();
            this.map.TOW_1 = [];
            this.map.TOW_1.push(new Object);
            this.map.TOW_1[0].X = this.getByte() ;
            this.map.TOW_1[0].Y = this.getByte() ;
            this.map.TOW_1[0].level = this.getByte();
            this.map.TOW_1[0].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;


            /* Storage 1 */
            Amount = this.getByte();
            this.map.STO_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.STO_1.push(new Object());
                this.map.STO_1[i].X = this.getByte() ;
                this.map.STO_1[i].Y = this.getByte() ;
                this.map.STO_1[i].level = this.getByte();
                this.map.STO_1[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }

            /* Storage 2 */
            Amount = this.getByte();
            this.map.STO_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.STO_2.push(new Object());
                this.map.STO_2[i].X = this.getByte() ;
                this.map.STO_2[i].Y = this.getByte() ;
                this.map.STO_2[i].level = this.getByte();
                this.map.STO_2[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }

            /* Storage 3 */
            Amount = this.getByte();
            this.map.STO_3 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.STO_3.push(new Object());
                this.map.STO_3[i].X = this.getByte() ;
                this.map.STO_3[i].Y = this.getByte() ;
                this.map.STO_3[i].level = this.getByte();
                this.map.STO_3[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }

            /* Resource 1 */
            Amount = this.getByte();
            this.map.RES_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.RES_1.push(new Object());
                this.map.RES_1[i].X = this.getByte() ;
                this.map.RES_1[i].Y = this.getByte() ;
                this.map.RES_1[i].level = this.getByte();
                this.map.RES_1[i].lastHarvestTime = this.getLong() - gv.timeOffset;
            }

            /* Resource 2 */
            Amount = this.getByte();
            this.map.RES_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.RES_2.push(new Object());
                this.map.RES_2[i].X = this.getByte() ;
                this.map.RES_2[i].Y = this.getByte() ;
                this.map.RES_2[i].level = this.getByte();
                this.map.RES_2[i].lastHarvestTime = this.getLong() - gv.timeOffset;
            }

            /* Resource 3 */
            Amount = this.getByte();
            this.map.RES_3 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.RES_3.push(new Object());
                this.map.RES_3[i].X = this.getByte() ;
                this.map.RES_3[i].Y = this.getByte() ;
                this.map.RES_3[i].level = this.getByte();
                this.map.RES_3[i].lastHarvestTime = this.getLong() - gv.timeOffset;
            }

            /* Laboratory 1 */
            Amount = this.getByte();
            this.map.LAB_1 = [];
            if (Amount > 0)
            {
                this.map.LAB_1.push(new Object());
                this.map.LAB_1[0].row = this.getByte() ;
                this.map.LAB_1[0].col = this.getByte() ;
                this.map.LAB_1[0].level = this.getByte();
                this.map.LAB_1[0].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
                if(this.map.LAB_1[0].finishBuildOrUpgradeTime <= 0)
                {
                    this.map.LAB_1[0].finishResearchingTime = this.getLong();
                    if(this.map.LAB_1[0].finishResearchingTime > 0)
                        this.map.LAB_1[0].researchingTroop = this.getByte();
                }
            }

            /* Army Camp 1 */
            Amount = this.getByte();
            this.map.AMC_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.AMC_1.push(new Object());
                this.map.AMC_1[i].X = this.getByte() ;
                this.map.AMC_1[i].Y = this.getByte() ;
                this.map.AMC_1[i].level = this.getByte();
                this.map.AMC_1[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }

            /* Barrack 1 */
            Amount = this.getByte();//Amount of BAR_1
            if (Amount > 0)
                this.map.BAR_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.BAR_1.push(new Object());
                this.map.BAR_1[i].X = this.getByte() ;
                this.map.BAR_1[i].Y = this.getByte() ;
                this.map.BAR_1[i].level = this.getByte();
                this.map.BAR_1[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
                if (this.map.BAR_1[i].finishBuildOrUpgradeTime <= 0)
                {
                    this.map.BAR_1[i].startTrainingTime = this.getLong();
                    if (this.map.BAR_1[i].startTrainingTime > 0)
                    {
                        var QueueSize = this.getByte();
                        this.map.BAR_1[i].trainingTroopTypes = []
                        this.map.BAR_1[i].trainingQueue = []
                        for (j = 0; j < QueueSize; j += 1)
                        {
                            this.map.BAR_1[i].trainingTroopTypes.push(this.getByte());
                            this.map.BAR_1[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
            }

            /* Barrack 2 */
            Amount = this.getByte();//Amount of BAR_2
            if (Amount > 0)
                this.map.BAR_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.BAR_2.push(new Object());
                this.map.BAR_2[i].X = this.getByte() ;
                this.map.BAR_2[i].Y = this.getByte() ;
                this.map.BAR_2[i].level = this.getByte();
                this.map.BAR_2[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
                if (this.map.BAR_2[i].finishBuildOrUpgradeTime <= 0)
                {
                    this.map.BAR_2[i].startTrainingTime = this.getLong();
                    if (this.map.BAR_2[i].startTrainingTime > 0)
                    {
                        var QueueSize = this.getByte();
                        this.map.BAR_2[i].trainingTroopTypes = []
                        this.map.BAR_2[i].trainingQueue = []
                        for (j = 0; j < QueueSize; j += 1)
                        {
                            this.map.BAR_2[i].trainingTroopTypes.push(this.getByte());
                            this.map.BAR_2[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
            }

            /* Builder Hut 1 */
            Amount = this.getByte();//Amount of builderHut
            this.map.BDH_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.BDH_1.push(new Object());
                this.map.BDH_1[i].X = this.getByte() ;
                this.map.BDH_1[i].Y = this.getByte() ;
            }

            /* Defence */


            Amount = this.getByte();
            this.map.DEF_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_1.push(new Object());
                this.map.DEF_1[i].X = this.getByte() ;
                this.map.DEF_1[i].Y = this.getByte() ;
                this.map.DEF_1[i].level = this.getByte();
                this.map.DEF_1[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_2.push(new Object());
                this.map.DEF_2[i].X = this.getByte() ;
                this.map.DEF_2[i].Y = this.getByte() ;
                this.map.DEF_2[i].level = this.getByte();
                this.map.DEF_2[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_3 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_3.push(new Object());
                this.map.DEF_3[i].X = this.getByte() ;
                this.map.DEF_3[i].Y = this.getByte() ;
                this.map.DEF_3[i].level = this.getByte();
                this.map.DEF_3[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_4 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_4.push(new Object());
                this.map.DEF_4[i].X = this.getByte() ;
                this.map.DEF_4[i].Y = this.getByte() ;
                this.map.DEF_4[i].level = this.getByte();
                this.map.DEF_4[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_5 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_5.push(new Object());
                this.map.DEF_5[i].X = this.getByte() ;
                this.map.DEF_5[i].Y = this.getByte() ;
                this.map.DEF_5[i].level = this.getByte();
                this.map.DEF_5[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_6 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_6.push(new Object());
                this.map.DEF_6[i].X = this.getByte() ;
                this.map.DEF_6[i].Y = this.getByte() ;
                this.map.DEF_6[i].level = this.getByte();
                this.map.DEF_6[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_7 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_7.push(new Object());
                this.map.DEF_7[i].X = this.getByte() ;
                this.map.DEF_7[i].Y = this.getByte() ;
                this.map.DEF_7[i].level = this.getByte();
                this.map.DEF_7[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_8 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_8.push(new Object());
                this.map.DEF_8[i].X = this.getByte() ;
                this.map.DEF_8[i].Y = this.getByte() ;
                this.map.DEF_8[i].level = this.getByte();
                this.map.DEF_8[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_9 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_9.push(new Object());
                this.map.DEF_9[i].X = this.getByte() ;
                this.map.DEF_9[i].Y = this.getByte() ;
                this.map.DEF_9[i].level = this.getByte();
                this.map.DEF_9[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_10 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_10.push(new Object());
                this.map.DEF_10[i].X = this.getByte() ;
                this.map.DEF_10[i].Y = this.getByte() ;
                this.map.DEF_10[i].level = this.getByte();
                this.map.DEF_10[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_11 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_11.push(new Object());
                this.map.DEF_11[i].X = this.getByte() ;
                this.map.DEF_11[i].Y = this.getByte() ;
                this.map.DEF_11[i].level = this.getByte();
                this.map.DEF_11[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_12 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_12.push(new Object());
                this.map.DEF_12[i].X = this.getByte() ;
                this.map.DEF_12[i].Y = this.getByte() ;
                this.map.DEF_12[i].level = this.getByte();
                this.map.DEF_12[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }


            Amount = this.getByte();
            this.map.DEF_13 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_13.push(new Object());
                this.map.DEF_13[i].X = this.getByte() ;
                this.map.DEF_13[i].Y = this.getByte() ;
                this.map.DEF_13[i].level = this.getByte();
                this.map.DEF_13[i].finishBuildOrUpgradeTime = this.getLong() - gv.timeOffset;
            }

            Amount = this.getByte();
            this.map.OBS = [];
            {
                for (var i = 0; i < Amount; i += 1)
                {
                    this.map.OBS.push(new Object());
                    this.map.OBS[i].type = "OBS_" + this.getByte();
                    this.map.OBS[i].X = this.getByte();
                    this.map.OBS[i].Y = this.getByte();
                    this.map.OBS[i].finishCleaningTime = this.getLong();
                }
            }

            /* Player */
            this.player = new Object();
            this.player.name = this.getString();

            this.player.exp = this.getInt();
            this.player.coin = this.getInt();
            this.player.gold = this.getInt();
            this.player.elixir = this.getInt();
            this.player.darkElixir = this.getInt();

            this.player.troopLevel = [];
            this.player.troopAmount = [];
            for (var i = 0; i < 18; i += 1)
            {
                this.player.troopLevel.push(this.getByte());
                this.player.troopAmount.push(this.getShort());
            }

            cc.log(JSON.stringify(this));
            gv.jsonInfo = this;
        }
    }
);

testnetwork.packetMap[gv.CMD.ERROR] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {
        var errorCode = this.getShort();
        fr.getCurrentScreen().popUpMessage("Dữ liệu không hợp lệ, mã lỗi: " + errorCode + "\nRestart");
        try{
            fr.view(MainLayer);
        } catch(e)
        {
            cc.log(e)
        }
    }
})


