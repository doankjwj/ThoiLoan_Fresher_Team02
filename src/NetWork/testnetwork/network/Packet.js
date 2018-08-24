/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.MOVE = 2011;
gv.CMD.BUILD = 2001;
gv.CMD.UPGRADE_BUILDING = 2003;
gv.CMD.CHEAT = 2102;
gv.CMD.SEND_INSTANT = 2005;
gv.CMD.SEND_CANCEL = 2006;
gv.CMD.SEND_HARVEST = 2021;
gv.CMD.SEND_RESEARCH = 2031;
gv.CMD.SEND_RESEARCH_FINISH_IMMIDIATELY = 2033;
gv.CMD.RESET_USER = 2101;

gv.CMD.SEND_CREATE_CLAN = 3001;
gv.CMD.SEND_JOIN_CLAN = 3011;

gv.CMD.SEND_CLAN_CHAT_TEXT = 3211;
gv.CMD.RECEIVE_CLAN_CHAT_TEXT = gv.CMD.SEND_CLAN_CHAT_TEXT;
gv.CMD.SEND_CLAN_CHAT_DONATE = 3212;
gv.CMD.RECEIVE_CLAN_CHAT_DONATE = gv.CMD.SEND_CLAN_CHAT_DONATE;
gv.CMD.SEND_DONATE = 3213;
gv.CMD.RECEIVE_DONATE = 3214;

gv.CMD.SEND_LOAD_CLAN_CHAT = 3103;
gv.CMD.RECEIVE_LOAD_CLAN_CHAT = gv.CMD.SEND_LOAD_CLAN_CHAT;
gv.CMD.RECEIVE_LOAD_CLAN_CHAT_TEXT = 2257;//Server chua lam
gv.CMD.RECEIVE_LOAD_CLAN_CHAT_DONATE = 2258;//Server chua lam
gv.CMD.RECEIVE_LOAD_CLAN_CHAT_EVENT = 2259;//Server chua lam

gv.CMD.USER_ERROR = 2999;
gv.CMD.CLAN_ERROR = 3999;


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
);
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
);

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(username, password){
            this.packHeader();
            this.putString(username);
            this.putString(password);
            this.updateSize();
        }
    }
);

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

CmdSendHarvest = fr.OutPacket.extend({
    ctor: function(){
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_HARVEST);
    },
    pack: function(resourceOrder, resourceSlot){
        this.packHeader();
        this.putByte(resourceOrder);
        this.putByte(resourceSlot);
        this.updateSize();
    }
});

CmdSendResearch = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_RESEARCH);
    },
    pack:function(troopType){
        this.packHeader();
        this.putByte(troopType);
        this.updateSize();
    }
});

CmdSendResearchFinishImmidiately = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.SEND_RESEARCH_FINISH_IMMIDIATELY);
    },
    pack:function(){
        this.packHeader();
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
);

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

CmdSendCreateClan = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_CREATE_CLAN);
        },
        pack:function(clanName, flag, description, authentication){
            this.packHeader();
            this.putString(clanName);
            this.putByte(flag);
            this.putString(description);
            this.putByte(authentication);
            this.updateSize();
        }
    }
);

CmdSendJoinClan = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_JOIN_CLAN);
        },
        pack:function(clanId){
            this.packHeader();
            this.putInt(clanId);
            this.updateSize();
        }
    }
);

// Packet Request 1 chat
CmdSendChat = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_CLAN_CHAT_TEXT);
        },
        pack:function(msg){
            this.packHeader();
            this.putString(msg);
            this.updateSize();
        }
    }
);
CmdSendRequestDonate = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_CLAN_CHAT_DONATE);
        },
        pack:function(msg){
            this.packHeader();
            this.putString(msg);
            this.updateSize();
        }
    }
);
// Packet send 1 request donate
CmdSendDonate = fr.OutPacket.extend(
    {
        ctor: function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_DONATE);
        },
        pack: function(tag, troopOrder)
        {
            this.packHeader();
            this.putString(tag);
            this.putByte(troopOrder);
            this.updateSize();
        }
    }
)

// Packet Request Load Lịch sử chat
CmdSendRequestLoadClanChat = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEND_LOAD_CLAN_CHAT);
        },
        pack:function(){
            this.packHeader();
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

            gv.timeOffset.userInfo = this.ServerTimeStamp - new Date().getTime();

            /* Town Hall */
            this.map = {};
            var Amount = this.getByte();
            for (var i = 0; i < Amount; i += 1)
            {
            this.map.TOW_1 = [];
            this.map.TOW_1.push(new Object);
            this.map.TOW_1[i].X = this.getByte() ;
            this.map.TOW_1[i].Y = this.getByte() ;
            this.map.TOW_1[i].level = this.getByte();
            this.map.TOW_1[i].finishBuildOrUpgradeTime = this.getLong();
            if (this.map.TOW_1[i].finishBuildOrUpgradeTime > 0)
                this.map.TOW_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            /* Storage 1 */
            Amount = this.getByte();
            this.map.STO_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.STO_1.push(new Object());
                this.map.STO_1[i].X = this.getByte() ;
                this.map.STO_1[i].Y = this.getByte() ;
                this.map.STO_1[i].level = this.getByte();
                this.map.STO_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.STO_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.STO_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
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
                this.map.STO_2[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.STO_2[i].finishBuildOrUpgradeTime > 0)
                    this.map.STO_2[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
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
                this.map.STO_3[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.STO_3[i].finishBuildOrUpgradeTime > 0)
                    this.map.STO_3[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
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
                this.map.RES_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.RES_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.RES_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
                else this.map.RES_1[i].lastHarvestTime = this.getLong()- gv.timeOffset.userInfo;
            }
            // for (var i = 0; i < Amount; i += 1)
            //{
            //    this.map.RES_1.push(new Object());
            //    this.map.RES_1[i].X = this.getByte() ;
            //    this.map.RES_1[i].Y = this.getByte() ;
            //    this.map.RES_1[i].level = this.getByte();
            //    this.map.RES_1[i].lastHarvestTime = this.getLong() - gv.timeOffset.userInfo;
            //    this.map.RES_1[i].finishBuildOrUpgradeTime = this.getLong();
            //    if (this.map.RES_1[i].finishBuildOrUpgradeTime > 0)
            //        this.map.RES_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            //}
            /* Resource 2 */
            Amount = this.getByte();
            this.map.RES_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.RES_2.push(new Object());
                this.map.RES_2[i].X = this.getByte() ;
                this.map.RES_2[i].Y = this.getByte() ;
                this.map.RES_2[i].level = this.getByte();
                this.map.RES_2[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.RES_2[i].finishBuildOrUpgradeTime > 0)
                    this.map.RES_2[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
                else this.map.RES_2[i].lastHarvestTime = this.getLong()- gv.timeOffset.userInfo;
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
                this.map.RES_3[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.RES_3[i].finishBuildOrUpgradeTime > 0)
                    this.map.RES_3[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
                else this.map.RES_3[i].lastHarvestTime = this.getLong()- gv.timeOffset.userInfo;
            }

            /* Laboratory 1 */
            Amount = this.getByte();
            this.map.LAB_1 = [];
            if (Amount > 0)
            {
                this.map.LAB_1.push(new Object());
                this.map.LAB_1[0].X = this.getByte() ;
                this.map.LAB_1[0].Y = this.getByte() ;
                this.map.LAB_1[0].level = this.getByte();
                this.map.LAB_1[0].finishBuildOrUpgradeTime = this.getLong();
                if(this.map.LAB_1[0].finishBuildOrUpgradeTime == 0)
                {
                    this.map.LAB_1[0].finishResearchingTime = this.getLong();
                    if(this.map.LAB_1[0].finishResearchingTime > 0)
                    {
                        this.map.LAB_1[0].finishResearchingTime -= gv.timeOffset.userInfo;
                        this.map.LAB_1[0].researchingTroop = this.getByte();
                    }
                }
                else
                    this.map.LAB_1[0].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
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
                this.map.AMC_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.AMC_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.AMC_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }

            /* Barrack 1 */
            Amount = this.getByte();//Amount of BAR_1
            this.map.BAR_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.BAR_1.push(new Object());
                this.map.BAR_1[i].X = this.getByte() ;
                this.map.BAR_1[i].Y = this.getByte() ;
                this.map.BAR_1[i].level = this.getByte();
                this.map.BAR_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.BAR_1[i].finishBuildOrUpgradeTime == 0)
                {
                    this.map.BAR_1[i].startTrainingTime = this.getLong();
                    if (this.map.BAR_1[i].startTrainingTime > 0)
                    {
                        this.map.BAR_1[i].startTrainingTime -= gv.timeOffset.userInfo;
                        var QueueSize = this.getByte();
                        this.map.BAR_1[i].trainingTroopTypes = [];
                        this.map.BAR_1[i].trainingQueue = [];
                        for (var j = 0; j < QueueSize; j += 1)
                        {
                            this.map.BAR_1[i].trainingTroopTypes.push(this.getByte());
                            this.map.BAR_1[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
                else
                    this.map.BAR_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }

            /* Barrack 2 */
            Amount = this.getByte();//Amount of BAR_2
            this.map.BAR_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.BAR_2.push(new Object());
                this.map.BAR_2[i].X = this.getByte() ;
                this.map.BAR_2[i].Y = this.getByte() ;
                this.map.BAR_2[i].level = this.getByte();
                this.map.BAR_2[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.BAR_2[i].finishBuildOrUpgradeTime == 0)
                {
                    this.map.BAR_2[i].startTrainingTime = this.getLong();
                    if (this.map.BAR_2[i].startTrainingTime > 0)
                    {
                        this.map.BAR_2[i].startTrainingTime -= gv.timeOffset.userInfo;
                        var QueueSize = this.getByte();
                        this.map.BAR_2[i].trainingTroopTypes = [];
                        this.map.BAR_2[i].trainingQueue = [];
                        for (var j = 0; j < QueueSize; j += 1)
                        {
                            this.map.BAR_2[i].trainingTroopTypes.push(this.getByte());
                            this.map.BAR_2[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
                else
                    this.map.BAR_2[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
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
                this.map.DEF_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_2 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_2.push(new Object());
                this.map.DEF_2[i].X = this.getByte() ;
                this.map.DEF_2[i].Y = this.getByte() ;
                this.map.DEF_2[i].level = this.getByte();
                this.map.DEF_2[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_2[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_2[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_3 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_3.push(new Object());
                this.map.DEF_3[i].X = this.getByte() ;
                this.map.DEF_3[i].Y = this.getByte() ;
                this.map.DEF_3[i].level = this.getByte();
                this.map.DEF_3[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_3[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_3[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_4 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_4.push(new Object());
                this.map.DEF_4[i].X = this.getByte() ;
                this.map.DEF_4[i].Y = this.getByte() ;
                this.map.DEF_4[i].level = this.getByte();
                this.map.DEF_4[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_4[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_4[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_5 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_5.push(new Object());
                this.map.DEF_5[i].X = this.getByte() ;
                this.map.DEF_5[i].Y = this.getByte() ;
                this.map.DEF_5[i].level = this.getByte();
                this.map.DEF_5[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_5[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_5[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_6 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_6.push(new Object());
                this.map.DEF_6[i].X = this.getByte() ;
                this.map.DEF_6[i].Y = this.getByte() ;
                this.map.DEF_6[i].level = this.getByte();
                this.map.DEF_6[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_6[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_6[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_7 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_7.push(new Object());
                this.map.DEF_7[i].X = this.getByte() ;
                this.map.DEF_7[i].Y = this.getByte() ;
                this.map.DEF_7[i].level = this.getByte();
                this.map.DEF_7[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_7[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_7[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_8 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_8.push(new Object());
                this.map.DEF_8[i].X = this.getByte() ;
                this.map.DEF_8[i].Y = this.getByte() ;
                this.map.DEF_8[i].level = this.getByte();
                this.map.DEF_8[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_8[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_8[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_9 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_9.push(new Object());
                this.map.DEF_9[i].X = this.getByte() ;
                this.map.DEF_9[i].Y = this.getByte() ;
                this.map.DEF_9[i].level = this.getByte();
                this.map.DEF_9[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_9[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_9[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_10 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_10.push(new Object());
                this.map.DEF_10[i].X = this.getByte() ;
                this.map.DEF_10[i].Y = this.getByte() ;
                this.map.DEF_10[i].level = this.getByte();
                this.map.DEF_10[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_10[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_10[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_11 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_11.push(new Object());
                this.map.DEF_11[i].X = this.getByte() ;
                this.map.DEF_11[i].Y = this.getByte() ;
                this.map.DEF_11[i].level = this.getByte();
                this.map.DEF_11[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_11[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_11[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_12 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_12.push(new Object());
                this.map.DEF_12[i].X = this.getByte() ;
                this.map.DEF_12[i].Y = this.getByte() ;
                this.map.DEF_12[i].level = this.getByte();
                this.map.DEF_12[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_12[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_12[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }


            Amount = this.getByte();
            this.map.DEF_13 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.DEF_13.push(new Object());
                this.map.DEF_13[i].X = this.getByte() ;
                this.map.DEF_13[i].Y = this.getByte() ;
                this.map.DEF_13[i].level = this.getByte();
                this.map.DEF_13[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.DEF_13[i].finishBuildOrUpgradeTime > 0)
                    this.map.DEF_13[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }

            Amount = this.getByte();
            this.map.WAL_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.WAL_1.push(new Object());
                this.map.WAL_1[i].X = this.getByte() ;
                this.map.WAL_1[i].Y = this.getByte() ;
                this.map.WAL_1[i].level = this.getByte();
                this.map.WAL_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.WAL_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.WAL_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
            }

            cc.log(JSON.stringify(this));
            Amount = this.getByte();
            this.map.CLC_1 = [];
            for (var i = 0; i < Amount; i += 1)
            {
                this.map.CLC_1.push(new Object());
                this.map.CLC_1[i].X = this.getByte() ;
                this.map.CLC_1[i].Y = this.getByte() ;
                this.map.CLC_1[i].level = this.getByte();
                this.map.CLC_1[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.map.CLC_1[i].finishBuildOrUpgradeTime > 0)
                    this.map.CLC_1[i].finishBuildOrUpgradeTime -= gv.timeOffset.userInfo;
                this.map.CLC_1[i].timeDonateAgain = this.getLong();
                if (this.map.CLC_1[i].timeDonateAgain > 0)
                    this.map.CLC_1[i].timeDonateAgain -= gv.timeOffset.userInfo;
                var Amount2 = this.getByte();
                this.map.CLC_1[i].troopArr = [];
                for (var j=0; j<Amount2; j++)
                {
                    this.map.CLC_1[i].troopArr.push(new Object());
                    this.map.CLC_1[i].troopArr[j].troopOrder = this.getByte();
                    this.map.CLC_1[i].troopArr[j].troopLevel = this.getByte();
                    this.map.CLC_1[i].troopArr[j].troopQuantity = this.getByte();
                }
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
                    if (this.map.OBS[i].finishCleaningTime > 0)
                        this.map.OBS[i].finishCleaningTime -= gv.timeOffset.userInfo;
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

            this.player.clanId = this.getInt();
            if (this.player.clanId == -1){
                this.player.timeFinishClanPenalty = this.getLong();
                if (this.player.timeFinishClanPenalty != 0) this.player.timeFinishClanPenalty -= gv.timeOffset.userInfo;
            }
            gv.jsonInfo = this;
            cc.log(JSON.stringify(this));
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_ERROR] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {
        var errorCode = this.getByte();
        cc.log(" /*********/ USER Error: " + errorCode);
        fr.getCurrentScreen().popUpMessage("Dữ liệu không hợp lệ, mã lỗi: " + errorCode + "\nRestart");
        try{
            cc.log("Error: "+ errorCode);
            fr.view(MainLayer);
        } catch(e)
        {
            cc.log(e)
        }
    }}
);

testnetwork.packetMap[gv.CMD.CLAN_ERROR] = fr.InPacket.extend({
    ctor: function()
    {
      this._super();
    },
    readData: function()
    {
      var errorCode = this.getByte();
      cc.log(" /*********/ CLAN Error: " + errorCode);
      fr.getCurrentScreen().popUpMessage("Dữ liệu không hợp lệ, mã lỗi: " + errorCode + "\nRestart");
      try{
          cc.log("Error: "+ errorCode);
          fr.view(MainLayer);
      } catch(e)
      {
          cc.log(e)
      }
    }}
);

// Nhận 1 gói chat
testnetwork.packetMap[gv.CMD.RECEIVE_CLAN_CHAT_TEXT] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {
        this.userName = this.getString();
        this.userLevel = this.getShort();
        this.msg = this.getString();
        gv.clanChat.jsonChatText = this;
        cc.log(JSON.stringify(this));
    }
});
//Nhận 1 gói Donate
testnetwork.packetMap[gv.CMD.RECEIVE_CLAN_CHAT_DONATE] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {
        this.userName = this.getString();
        this.userLevel = this.getShort();
        this.msg = this.getString();
        this.housingSpaceDonated = this.getByte() // Houssing space các user đã donate
        this.maxHousingSpace = this.getByte() // Housing space tối đa
        gv.clanChat.jsonChatDonate = this;
        cc.log(JSON.stringify(this));
    }
})
// Nhận kết quả 1 lượt donate
testnetwork.packetMap[gv.CMD.RECEIVE_DONATE] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {
        // this.userName = this.getString();
        this.userDonate = this.getString();
        this.troopOrder = this.getByte();
        this.troopLevel = this.getByte();
        gv.clanChat.jsonDonate = this;
        cc.log(JSON.stringify(this));
    }
})
//Nhận lịch sử sự kiện (Trần Hoàn sửa)
testnetwork.packetMap[gv.CMD.RECEIVE_LOAD_CLAN_CHAT] = fr.InPacket.extend({
    ctor: function()
    {
       this._super();
    },
    readData: function()
    {
        var amount = this.getByte();
        this.autoSetLeader=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.autoSetLeader.push(new Object());
            this.autoSetLeader[i].userName = this.getString();
            this.autoSetLeader[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.autoSetCoLeader=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.autoSetCoLeader.push(new Object());
            this.autoSetCoLeader[i].userName = this.getString();
            this.autoSetCoLeader[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.setLeader=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.setLeader.push(new Object());
            this.setLeader[i].userName = this.getString();
            this.setLeader[i].target = this.getString();
            this.setLeader[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.setCoLeader=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.setCoLeader.push(new Object());
            this.setCoLeader[i].userName = this.getString();
            this.setCoLeader[i].target = this.getString();
            this.setCoLeader[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.removeCoLeader=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.removeCoLeader.push(new Object());
            this.removeCoLeader[i].userName = this.getString();
            this.removeCoLeader[i].target = this.getString();
            this.removeCoLeader[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.join=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.join.push(new Object());
            this.join[i].userName = this.getString();
            this.join[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.leave=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.leave.push(new Object());
            this.leave[i].userName = this.getString();
            this.leave[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.kicked=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.kicked.push(new Object());
            this.kicked[i].userName = this.getString();
            this.kicked[i].target = this.getString();
            this.kicked[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.chatText=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.chatText.push(new Object());
            this.chatText[i].userName = this.getString();
            this.chatText[i].level = this.getByte();
            this.chatText[i].message = this.getString();
            this.chatText[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.changeClanInfo=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.changeClanInfo.push(new Object());
            this.changeClanInfo[i].userName = this.getString();
            this.changeClanInfo[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
        }

        amount = this.getByte();
        this.donate=new Array();
        for (var i = 0; i < amount; i += 1)
        {
            this.donate.push(new Object());
            this.donate[i].userName = this.getString();
            this.chatText[i].level = this.getByte();
            this.donate[i].message = this.getString();
            this.donate[i].timeCreated = this.getLong() - gv.timeOffset.userInfo;
            this.donate[i].troopCapacity = this.getByte();
            this.donate[i].troopHousingSpace = this.getByte();
            this.donate[i].selfDonatedTroop = new Array();
            var troopDonatedAmount = this.getByte();
            {
                for (var j = 0; j < troopDonatedAmount; j += 1)
                {
                    this.donate[i].selfDonatedTroop.push(new Object());
                    this.donate[i].selfDonatedTroop[j].troopOrder = this.getByte();
                    this.donate[i].selfDonatedTroop[j].troopLevel = this.getByte();
                }
            }
        }
        gv.clanChat.jsonLoad = this;
        gvGUI.layerClanChat.loadChatFromServer();
    }
})
// Nhận lịch sử Chat
testnetwork.packetMap[gv.CMD.RECEIVE_LOAD_CLAN_CHAT_TEXT] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {

        this.serverTime = this.getLong();
        gv.timeOffset.loadClanChatText = this.serverTime - new Date().getTime();
        this.chatQuantity = this.getByte();
        this.detail = [];
        for (var i=0; i<this.chatQuantity; i++)
        {
            this.detail.push(new Object());
            this.detail[i].userName = this.getString();
            this.detail[i].userLevel = this.getInt();
            this.detail[i].msg = this.getString();
            this.detail[i].timeCreated = this.getLong() - gv.timeOffset.loadClanChatText;
        };
        gv.clanChat.jsonLoadText = this;
        cc.log(JSON.stringify(this));

        gvGUI.layerClanChat.loadChatTextFromServer();
        //setTimeout(function(){
        //
        //}, 1);
    }
})
testnetwork.packetMap[gv.CMD.RECEIVE_LOAD_CLAN_CHAT_DONATE] = fr.InPacket.extend({
    ctor: function()
    {
        this._super();
    },
    readData: function()
    {

        this.serverTime = this.getLong();
        gv.timeOffset.loadClanChatDonate = this.serverTime - new Date().getTime();
        this.chatQuantity = this.getByte();
        this.detail = [];
        for (var i=0; i<this.chatQuantity; i++)
        {
            this.detail.push(new Object());
            this.detail[i].userName = this.getString();
            this.detail[i].userLevel = this.getInt();
            this.detail[i].msg = this.getString();
            this.detail[i].timeCreated = this.getLong() - gv.timeOffset.loadClanChatDonate;
            this.detail[i].currentHousingSpace = this.getByte();
            this.detail[i].maxHousingSpace = this.getByte();
            this.detail[i].troopDonated = {};
            this.detail[i].troopDonated.troop_0 = this.getByte();
            this.detail[i].troopDonated.troop_1 = this.getByte();
            this.detail[i].troopDonated.troop_2 = this.getByte();
            this.detail[i].troopDonated.troop_3 = this.getByte();
        };
        gv.clanChat.jsonLoadDonate = this;
        cc.log(JSON.stringify(this));

        gvGUI.layerClanChat.loadChatDonateFromServer();
        //setTimeout(function(){
        //
        //}, 1);
    }
})

