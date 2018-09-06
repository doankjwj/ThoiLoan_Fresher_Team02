/**
 * Created by CPU02326_Local on 7/31/2018.
 */

/* Building Move */
gv.buildingMove =
{
    currentRow : null,
    currentCol : null,
};
/* Lưu điểm đầu và cuối của lần di chuyển map*/
gv.touchBeganLocation = null;
gv.touchEndedLocation = null;

/* Building chuẩn bị xây */
gv.buildingNextBuild = null;

/*Tài nguyên yêu cầu xây dựng*/
gv.upgradeAble = gv.upgradeAble || {};
gv.upgradeAble.etcToCoin = 0;

gv.reloaded = false;

gv.buildingDescription =
{
    townHall_1 : null,
    armyCamp_1: null,
    barrack_1: null,
    builderHut: null,
    defence_1: null,
    resource_1: null,
    resource_2: null,
    storage_1: null,
    storage_2: null,
    laboratory: null,
    clanCastle: null,
    wall: null,
};


gv.troopInfo =
{
    favoriteTarget: null,
    attackType: null,
    attackArea: null,
    moveSpeed: null,
    timeTraining: null,
    housingSpace: null,
}
gv.troopStr = {
    ARM_1: "ARM_1",
    ARM_2: "ARM_2",
    ARM_3: "ARM_3",
    ARM_4: "ARM_4",
    ARM_5: "ARM_5",
    ARM_6: "ARM_6",
    ARM_7: "ARM_7",
    ARM_8: "ARM_8",
    ARM_9: "ARM_9",
    ARM_10: "ARM_10",
    ARM_16: "ARM_16",
    ARM_17: "ARM_17"
};
gv.troopName = ["Đấu Sĩ", "Pháp Sư", "Ăn Trộm", "Khổng Lồ"];
gv.troopMaxLevel = [4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4];
gv.troopAvaiable = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ,0 , 1 ,1]
gv.clanChatEventManager = {
    chatStatusUpdated: false,
    userOnlineUpdated: false
};

gv.listenerNullForPopUpDonate = null;

// Chat
gv.clanChat={
    jsonChatText: null,             // Data 1 chat Text mới
    jsonChatDonate: null,           // Data 1 request xin quân mới
    jsonDonate: null,               // Data kết quả 1 lượt Donate
    jsonLoadText: null,             // Data load đoạn hội thoại chat Text
    jsonLoadDonate: null,           // Data load đoạn hội thoại chat Donate
    jsonLoadEvent: null,            // Data load đoạn hội thoại chat Event
    itemDonateTag: null,

    type:
        {
            chatText: 0,        // Thành viên nhắn tin trong bang
            donate: 1,          // Thành viên yêu cầu cho quân
            clanEvent: 2        // Sự kiện bang: thêm thành viên, bổ nhiệm, ..
        },

    msgArr: ["trở thành bang chủ",
        "trở thành phó bang chủ",
        "được bổ nhiệm làm bang chủ bởi",
        "được bổ nhiệm làm phó bang chủ bởi",
        "được bổ nhiệm làm thành viên bởi",
        "đã gia nhập bang",
        "đã rời bang",
        "được mời ra khỏi bang bởi",
        "đã thay đổi thông tin bang hội",
        "đã tạo Bang"],
    colorArr: [1, 0, 0, 0, 0, 1, 2, 2, 0, 0],
    colorType:
    {
        chat: 3,
        requestDonate: 4,
    },
    eventType:
    {
        joinClan: 5,
        leaveClan: 6,
        kicked: 7,
    },
};

// Time Offset
gv.timeOffset = {
    userInfo: 0,
    loadClanChatText: 0,
    loadClanChatDonate: 0
};

gv.suggestList = null;

gv.userClanInfo = null;
gv.userClan = null;

gv.clanMemberList = null;

gv.searchResult = {
    byID: null,
    byName: null,
};

/* Hướng lính*/
gv.direction =
{
    down_right: 0,
    down: 1,
    down_left: 2,
    left: 3,
    up_left: 4,
    up: 5,
    up_right: 6,
    right: 7,
};