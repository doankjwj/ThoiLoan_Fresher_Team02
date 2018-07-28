/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.MOVE = 2001;
gv.CMD.BUILD = 2010;

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
        pack:function(user){
            this.packHeader();
            this.putString(user);
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
            cc.log(id + " " + row + " " + col)
            this.packHeader();
            this.putShort(id);
            this.putShort(row);
            this.putShort(col);
            this.updateSize();
        }
    }
);

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
            this.putShort(id);
            this.putShort(row);
            this.putShort(col);
            this.updateSize();
        }
    }
)

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


testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend
(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function()
        {
            /* Town Hall */
            this.map = new Object();
            this.map.TOW_1 = [];
            this.map.TOW_1.push(new Object);
            this.map.TOW_1[0].X = this.getByte();
            this.map.TOW_1[0].Y = this.getByte();
            this.map.TOW_1[0].level = this.getByte();
            this.map.TOW_1[0].finishBuildOrUpgradeTime = this.getLong();

            /* Storage 1 */
            var Amount = this.getByte();
            this.map.STO_1 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.STO_1.push(new Object());
                this.map.STO_1[i].X = this.getByte();
                this.map.STO_1[i].Y = this.getByte();
                this.map.STO_1[i].level = this.getByte();
                this.map.STO_1[i].finishBuildOrUpgradeTime = this.getLong();
            }

            /* Storage 2 */
            Amount = this.getByte();
            this.map.STO_2 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.STO_2.push(new Object());
                this.map.STO_2[i].X = this.getByte();
                this.map.STO_2[i].Y = this.getByte();
                this.map.STO_2[i].level = this.getByte();
                this.map.STO_2[i].finishBuildOrUpgradeTime = this.getLong();
            }

            /* Storage 3 */
            Amount = this.getByte();
            this.map.STO_3 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.STO_3.push(new Object());
                this.map.STO_3[i].X = this.getByte();
                this.map.STO_3[i].Y = this.getByte();
                this.map.STO_3[i].level = this.getByte();
                this.map.STO_3[i].finishBuildOrUpgradeTime = this.getLong();
            }

            /* Resource 1 */
            Amount = this.getByte();
            this.map.RES_1 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.RES_1.push(new Object());
                this.map.RES_1[i].X = this.getByte();
                this.map.RES_1[i].Y = this.getByte();
                this.map.RES_1[i].level = this.getByte();
                this.map.RES_1[i].lastHarvestTime = this.getLong();
            }

            /* Resource 2 */
            Amount = this.getByte();
            this.map.RES_2 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.RES_2.push(new Object());
                this.map.RES_2[i].X = this.getByte();
                this.map.RES_2[i].Y = this.getByte();
                this.map.RES_2[i].level = this.getByte();
                this.map.RES_2[i].lastHarvestTime = this.getLong();
            }

            /* Resource 3 */
            Amount = this.getByte();
            this.map.RES_3 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.RES_3.push(new Object());
                this.map.RES_3[i].X = this.getByte();
                this.map.RES_3[i].Y = this.getByte();
                this.map.RES_3[i].level = this.getByte();
                this.map.RES_3[i].lastHarvestTime = this.getLong();
            }

            /* Laboratory 1 */
            Amount = this.getByte();
            this.map.LAB_1 = [];
            if (Amount > 0)
            {
                this.map.LAB_1.push(new Object());
                this.map.LAB_1[0].row = this.getByte();
                this.map.LAB_1[0].col = this.getByte();
                this.map.LAB_1[0].level = this.getByte();
                this.map.LAB_1[0].finishBuildOrUpgradeTime = this.getLong();
                if(this.map.LAB_1[0].finishBuildOrUpgradeTime == 0)
                {
                    this.map.LAB_1[0].finishResearchingTime = this.getLong();
                    if(this.map.LAB_1[0].finishResearchingTime > 0)
                        this.map.LAB_1[0].researchingTroop = this.getByte();
                }
            }

            /* Army Camp 1 */
            Amount = this.getByte();
            this.map.AMC_1 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.AMC_1.push(new Object());
                this.map.AMC_1[i].X = this.getByte();
                this.map.AMC_1[i].Y = this.getByte();
                this.map.AMC_1[i].level = this.getByte();
                this.map.AMC_1[i].finishBuildOrUpgradeTime = this.getLong();
            }

            /* Barrack 1 */
            Amount = this.getByte();//Amount of BAR_1
            if (Amount > 0)
                this.map.BAR_1 = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.map.BAR_1.push(new Object());
                this.map.BAR_1[i].X = this.getByte();
                this.map.BAR_1[i].Y = this.getByte();
                this.map.BAR_1[i].level = this.getByte();
                this.map.BAR_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.BAR_1[i].finishBuildOrUpgradeTime == 0)
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
            for (i = 0; i < Amount; i += 1)
            {
                this.map.BAR_2.push(new Object());
                this.map.BAR_2[i].X = this.getByte();
                this.map.BAR_2[i].Y = this.getByte();
                this.map.BAR_2[i].level = this.getByte();
                this.map.BAR_2[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.BAR_2[i].finishBuildOrUpgradeTime == 0)
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
            for (i = 0; i < Amount; i += 1)
            {
                this.map.BDH_1.push(new Object());
                this.map.BDH_1[i].X = this.getByte();
                this.map.BDH_1[i].Y = this.getByte();
            }

            /* Player */
            this.player = new Object();
            this.player.name = this.getString();
            this.player.exp = this.getInt();
            this.player.vipPoint = this.getInt();

            this.player.coin = this.getInt();
            this.player.gold = this.getInt();
            this.player.elixir = this.getInt();
            this.player.darkElixir = this.getInt();

            this.player.troopLevel = [];
            this.player.troopAmount = [];
            for (i = 0; i < 18; i += 1)
            {
                this.player.troopLevel.push(this.getByte());
                this.player.troopAmount.push(this.getShort());
            }

            // cc.log(JSON.stringify(this));
            gv.jsonInfo = this;
            //cc.log(gv.jsonInfo["map"]["TOW_1"][0]["X"]);
            //cc.log(gv.jsonInfo["map"]["TOW_1"].length);
            //cc.log(gv.jsonInfo["map"]["BDH_1"].length);
            //cc.log(gv.jsonInfo["map"]["STO_1"].length);
        }
    }
);


testnetwork.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);




