/**
 * Created by CPU02326_Local on 7/31/2018.
 */

/* Building Move */
gv.buildingMove =
{
    currentRow : null,
    currentCol : null,
}
/* Building chuẩn bị xây */
gv.buildingNextBuild = null;

/*Tài nguyên yêu cầu xây dựng*/
gv.upgradeAble = gv.upgradeAble || {};
gv.upgradeAble.etcToCoin = 0;

gv.reloaded = false;

gv.buildingDescription =
{
    townHall_1 : "Nâng cấp nhà chính để mở khóa những công trình mới, trong 1 cuộc xâm lược \nphá hủy nhà chính sẽ đạt được ngay lập tức 1 sao",
    armyCamp_1: "Trại lính là nơi sinh hoạt của quân lính, Nâng cấp trại lính giúp tăng \nsố lượng binh lính của bạn",
    barrack_1: "Nhà lính là nơi huấn luyện những chiến binh tinh nhuệ cho vương quốc của bạn, \ngiúp mở mang bờ cõi",
    builderHut: "Có công trình nào quanh đây không cần bóng dáng người thợ xây ?? \nCâu trả lời là không",
    defence_1: "Pháo là công trình phòng thủ cơ bản của bạn, giá trị của mỗi phát đạn  khiến \n pháo là công trình không thể thiếu của vương quốc",
    resource_1: "Vàng là tài nguyên không thể thiếu để xây dựng các công trình phòng thủ,\n mỏ vàng sục sâu ào lòng đất mang lại nhưng thỏi kim loại óng ánh",
    resource_2: "Những dòng chảy tự nhiên bên dưới vương quốc, mỏ dầu giúp đem chúng lên \nxây dựng quân đội",
    storage_1: "Kho vàng là nơi cất trữ toàn bộ vàng của vương quốc, hãy cất giữ nơi này nghiêm ngặt\n nếu không muốn trắng tay sau 1 đêm thức dậy",
    storage_2: "Cùng với kho vàng, kho dầu là nơi lưu trữ tài nguyên quan trọng của vương quốc, \nhãy nâng cấp kho dầu liên tục đẻ lưu trữ nhiều hơn những dòng dầu óng ánh",
    laboratory: "Nhà nâng cấp lính",
    clanCastle: "Nhà bang hội là nơi giữ lính phòng thủ quan trọng",
};

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


gv.troopMaxLevel = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

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
    colorArr: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
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

gv.searchResult = {
    byID: null,
    byName: null,
};