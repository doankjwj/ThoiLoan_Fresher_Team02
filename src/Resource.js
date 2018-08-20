var mapFolder = "res/Art/Map/";
var buildingsFolder = "res/Art/Buildings/";
var folder_effect = "res/effect/";
var fontFolder = "res/Art/Fonts/";
var guiFolder = "res/Art/GUIs/";
var jsonFolder = "res/ConfigJson/";
var researchTroopFolder = "res/Art/GUIs/research_troop/";
var researchTroopFolderTroopIcon = "res/Art/GUIs/upgrade_troop/icon/";
var researchTroopFolderTroopIconSmall = "res/Art/GUIs/upgrade_troop/small_icon/";
var logInFolder = "res/Art/LoginGui/";
var folderBuildingActionicon = "res/Art/GUIs/Action_Building_Icon/";
var folderUpgradeBuildingGUI = guiFolder + "upgrade_building_gui/";
var troopIconFolder = guiFolder + "train_troop_gui/icon/";
var soundFolder = "res/Sounds/";
var folderClanChat = "res/Art/GUIs/Chat/";
var folderClan = "res/Art/Bang hoi/";

var res = {
    image_postfix_1: "idle/image000",
    image_postfix_2: ".png",

    tilemap_tmx:    mapFolder + "42x42map.tmx",
    bgTopLeft:      mapFolder + "1_0000_Layer-3.png",
    bgBotLeft:      mapFolder + "1_0001_Layer-1.png",
    bgTopRight:     mapFolder + "1_0002_Layer-4.png",
    bgBotRight:     mapFolder + "1_0003_Layer-2.png",
    builderHut:     buildingsFolder + "builderHut/idle/image0000.png",

    armyCampJson: jsonFolder + "ArmyCamp.json",
    barrackJson: jsonFolder + "Barrack.json",
    builderHutJson: jsonFolder + "BuilderHut.json",
    initGameJson: jsonFolder + "InitGame.json",
    laboratoryJson: jsonFolder + "Laboratory.json",
    resourceJson: jsonFolder + "Resource.json",
    storageJson: jsonFolder + "Storage.json",
    townHallJson: jsonFolder + "TownHall.json",
    troopJson: jsonFolder + "Troop.json",
    troopBaseJson: jsonFolder + "TroopBase.json",
    obstacleJson: jsonFolder + "Obstacle.json",
    shopItemList: jsonFolder + "ShopList.json",
    defenceJson: jsonFolder + "Defence.json",

    folder_builder_hut: buildingsFolder + "builderHut/",
    folder_army_camp: buildingsFolder + "armyCamp/",
    folder_barrack: buildingsFolder + "barrack/",
    folder_town_hall: buildingsFolder + "townhall/",
    folder_gold_mine: buildingsFolder + "goldMine/",
    folder_gold_storage: buildingsFolder + "goldStorage/",
    folder_elixir_collector: buildingsFolder + "elixirCollector/",
    folder_elixir_storage: buildingsFolder + "elixirStorage/",
    folder_canon: buildingsFolder + "cannon/canon_",
    folder_defense_base: buildingsFolder + "defense_base/",
    folder_obs: buildingsFolder + "obstacle/",
    folder_laboratory: buildingsFolder + "labratory/",

    folder_gui_action_building: guiFolder + "Action_Building_Icon/",
    folder_gui_build: guiFolder + "/upgrade_building_gui/",
    folder_gui_main: guiFolder + "Main_Gui/",
    folder_gui_collect_res: guiFolder + "collect_res/",

    folder_effect: folder_effect,
    tmp_effect: folder_effect + "tmp_effect.png",

    map_BG: mapFolder + "map_obj_bg/BG/",
    map_obj: mapFolder + "map_obj_bg/",

    folder_troop_animation: "res/Art/Troops/",

    popUp : {
        bg: guiFolder + "upgrade_building_gui/BG.png",
        btnClose: guiFolder + "upgrade_building_gui/close.png",
        btnOk: guiFolder + "upgrade_building_gui/button.png",
    }
};

var font = {

    soji20: fontFolder + "soji_20.fnt"

};

res.buildingOnMoveGUI = function(type, size)
{
    return res.map_BG + type + "_" + (size ) + ".png"
}

res.researchTroopGUI =
{
    button: researchTroopFolder + "button.png",
    iconResource_2: researchTroopFolder + "dau tim.png",
    iconResource_3: researchTroopFolder + "dau den.png",
    spanWhite: researchTroopFolder + "mieng trang.png",
    arrowGreen: researchTroopFolder + "mui ten.png",
    bg: researchTroopFolder + "nen 1.png",
    bgSmall: researchTroopFolder + "nen nho.png",
    bgStar: researchTroopFolder + "nen sao.png",
    bgTransparent: researchTroopFolder + "nen trong.png",
    slost: researchTroopFolder + "slost.png",
    grass: researchTroopFolderTroopIcon + "troop_bg.png",
    iconCoin: guiFolder + "pop_up/G.png",
};
res.clanChatGUI = {
    barDonateTroopBG: folderClanChat + "1_0001_Layer-1.png",
    barDonateTroop: folderClanChat + "1_0000_Layer-2.png",
    buttonGreen: folderClanChat + "button 2.png",
    buttonBlue: folderClanChat + "button 1.png",
    buttonCollapse: folderClanChat + "button chinh 1.png",
    buttonExpand: folderClanChat + "button chinh.png",
    buttonBG: folderClanChat + "c_0002_Layer-85.png",
    lineSeparateChat: folderClanChat + "dong ke.png",
    lineSeparateOnline: folderClanChat + "vc_0002_Layer-3.png",
    buttonChat: folderClanChat + "icon thoai.png",
    buttonInfo: folderClanChat + "Icon_ thong tin.png",
    donateTroopBG: folderClanChat + "nen 2.png",
    buttonTabSelected: folderClanChat + "nen button 2.png",
    buttonTabUnselected: folderClanChat + "nen button 1.png",
    chatBG: folderClanChat + "nen.png",
    buttonClose: folderClanChat + "nut x.png",
    editTextChat: folderClanChat + "s.png",
    iconUserOffline: folderClanChat + "vc_0000_Layer-4.png",
    iconUserOnline: folderClanChat + "vc_0001_Shape-84.png",
    layerUserOnline: folderClanChat + "vc_0004_Layer-80-copy.png",
    layerUserOnlineSeparate: folderClanChat +  "vc_0002_Layer-3.png",
    barUserOnline: folderClanChat + "vc_0003_Layer-2.png",
};
res.clanGUI = {
    iconStarSmall: folderClan + "sao nho.png",
    iconClan: folderClan +  "icon bang hoi.png",
    slotBackground: folderClan + "slost nen 2.png",
    bg: folderClan + "nen 1.png",
    flagOpen: folderClan + "co 1.png",
    flagClose: folderClan + "co 2.png",
    buttonBG: folderClan + "o duoi.png",
    buttonBGClose: folderClan + "o duoi 1.png",
    clanItemBackground: folderClan + "slost.png",
};

var shopGUI = {
    back:               guiFolder + "shop_gui/back.png",
    catalogyBg:         guiFolder + "shop_gui/catalogy_bg.png",
    close:              guiFolder + "shop_gui/close.png",
    elixir:             guiFolder + "shop_gui/elixir.png",
    g:                  guiFolder + "shop_gui/g.png",
    gold:               guiFolder + "shop_gui/gold.png",
    iconDarkElixirBar:  guiFolder + "shop_gui/icon_dElixir_bar.png",
    iconElixirBar:      guiFolder + "shop_gui/icon_elixir_bar.png",
    iconGBar:           guiFolder + "shop_gui/icon_g_bar.png",
    iconGoldBar:        guiFolder + "shop_gui/icon_gold_bar.png",
    info:               guiFolder + "shop_gui/info.png",
    itemBackground:     guiFolder + "shop_gui/item_background.png",
    resBar:             guiFolder + "shop_gui/res_bar.png",
    resInfo:            guiFolder + "shop_gui/res_info.png",
    slot:               guiFolder + "shop_gui/slot.png",
    slotCatalogy:       guiFolder + "shop_gui/slot_catalogy.png",
    time:               guiFolder + "shop_gui/time.png",
    titleBackground:    guiFolder + "shop_gui/title_background.png",
    typeArmy:           guiFolder + "shop_gui/type_army.png",
    typeBuyRes:         guiFolder + "shop_gui/type_buy_res.png",
    typeDC:             guiFolder + "shop_gui/type_dc.png",
    typeDefense:        guiFolder + "shop_gui/type_defense.png",
    typeRes:            guiFolder + "shop_gui/type_res.png",
    typeShield:         guiFolder + "shop_gui/type_shield.png",
    demo:               guiFolder + "shop_gui/Demo.png"
};
var mainGUI = {
    armyIcon:           guiFolder + "Main_Gui/army_icon.png",
    attack:             guiFolder + "Main_Gui/attack.png",
    bgBar1:             guiFolder + "Main_Gui/bg_bar_1.png",
    bgBar2:             guiFolder + "Main_Gui/bg_bar_2.png",
    bgBar3:             guiFolder + "Main_Gui/bg_bar_3.png",
    bgBar4:             guiFolder + "Main_Gui/bg_bar_4.png",
    bgExp:              guiFolder + "Main_Gui/bg_exp.png",
    bgSlider:           guiFolder + "Main_Gui/bg_slider.png",
    builderIcon:        guiFolder + "Main_Gui/builder_icon.png",
    darkElixirBar:      guiFolder + "Main_Gui/darkElixir_bar.png",
    darkElixirIcon:     guiFolder + "Main_Gui/darkElixir_icon.png",
    elixirBar:          guiFolder + "Main_Gui/elixir_bar.png",
    elixirIcon:         guiFolder + "Main_Gui/elixir_icon.png",
    expBar:             guiFolder + "Main_Gui/exp_bar.png",
    expBgBar:           guiFolder + "Main_Gui/exp_bg_bar.png",
    expIcon:            guiFolder + "Main_Gui/exp_icon.png",
    gBar:               guiFolder + "Main_Gui/g_bar.png",
    gIcon:              guiFolder + "Main_Gui/g_icon.png",
    goldBar:            guiFolder + "Main_Gui/gold_bar.png",
    goldIcon:           guiFolder + "Main_Gui/gold_icon.png",
    home:               guiFolder + "Main_Gui/home.png",
    iconExp:            guiFolder + "Main_Gui/ic_exp.png",
    inventory:          guiFolder + "Main_Gui/kho.png",
    lvlUp:              guiFolder + "Main_Gui/level_up.png",
    loading:            guiFolder + "Main_Gui/loading.png",
    ranking:            guiFolder + "Main_Gui/ranking.png",
    setting:            guiFolder + "Main_Gui/setting.png",
    shield:             guiFolder + "Main_Gui/shield.png",
    shop:               guiFolder + "Main_Gui/shop.png",
    trophy:             guiFolder + "Main_Gui/trophy.png",
    trophyBgBar:        guiFolder + "Main_Gui/trophy_bg_bar.png"
};
var buildingGUI = {
    iconInfo : folderBuildingActionicon + "info_icon.png",
    iconUpgrade: folderBuildingActionicon + "upgrade_icon.png",
    iconHarvest_1: folderBuildingActionicon + "harvest_gold.png",
    iconHarvest_2: folderBuildingActionicon + "harvest_elixir.png",
    iconHarvest_3: folderBuildingActionicon + "harvest_dark_elixir.png",
    instant: res.folder_gui_action_building + "quick_finish.png",
    iconResearch: res.folder_gui_action_building + "research_icon.png",
    bg: folderBuildingActionicon + "bg_button.png",

    trainIcon: folderBuildingActionicon + "train_icon.png",

    buildCommit: res.folder_gui_action_building + "accept.png",
    buildCancel: res.folder_gui_action_building + "cancel.png",
    buildCancelIcon: res.folder_gui_action_building + "cancel_icon.png",
    defence: res.map_obj + "upgrading.png"
};

var trainingGUI = {
    previousIcon: guiFolder + "train_troop_gui/previous.png",
    forwardIcon: guiFolder + "train_troop_gui/forward.png",
    trainBar: guiFolder + "train_troop_gui/train_bar.png",
    elixirIcon: guiFolder + "train_troop_gui/icon_elixir.png",
    gIcon: guiFolder + "train_troop_gui/g_icon.png",
    cancelIcon: guiFolder + "train_troop_gui/cancel.png",
    buttonIcon: guiFolder + "train_troop_gui/button.png",
    bgCost: guiFolder + "train_troop_gui/bg_cost.png",
    bgRequired: guiFolder + "train_troop_gui/bg_cost_3.png",
    infoIcon: guiFolder + "train_troop_gui/info.png",
    slotIcon :guiFolder + "train_troop_gui/slot.png",
    queueArrow: guiFolder + "train_troop_gui/queue.png",
    bgTrainBar: guiFolder + "train_troop_gui/bg_train_bar.png",
    bg: guiFolder + "train_troop_gui/background.png"
};

var trainingQueueGUI = {
    ARM_1: guiFolder + "train_troop_gui/small_icon/ARM_1.png",
    ARM_2: guiFolder + "train_troop_gui/small_icon/ARM_2.png",
    ARM_3: guiFolder + "train_troop_gui/small_icon/ARM_3.png",
    ARM_4: guiFolder + "train_troop_gui/small_icon/ARM_4.png",
    ARM_5: guiFolder + "train_troop_gui/small_icon/ARM_5.png",
    ARM_6: guiFolder + "train_troop_gui/small_icon/ARM_6.png",
    ARM_7: guiFolder + "train_troop_gui/small_icon/ARM_7.png",
    ARM_8: guiFolder + "train_troop_gui/small_icon/ARM_8.png",
    ARM_9: guiFolder + "train_troop_gui/small_icon/ARM_9.png",
    ARM_10: guiFolder + "train_troop_gui/small_icon/ARM_10.png",
    ARM_16: guiFolder + "train_troop_gui/small_icon/ARM_16.png",
    ARM_17: guiFolder + "train_troop_gui/small_icon/ARM_17.png",
    slot: guiFolder + "train_troop_gui/small_icon/slot.png",
};

var troopIcon = {
    ARM_1: troopIconFolder + "ARM_1.png",
    ARM_2: troopIconFolder + "ARM_2.png",
    ARM_3: troopIconFolder + "ARM_3.png",
    ARM_4: troopIconFolder + "ARM_4.png",
    ARM_5: troopIconFolder + "ARM_5.png",
    ARM_6: troopIconFolder + "ARM_6.png",
    ARM_7: troopIconFolder + "ARM_7.png",
    ARM_8: troopIconFolder + "ARM_8.png",
    ARM_9: troopIconFolder + "ARM_9.png",
    ARM_10: troopIconFolder + "ARM_10.png",
    ARM_16: troopIconFolder + "ARM_16.png",
    ARM_17: troopIconFolder + "ARM_17.png"
};

var upgradeBuildingGUI_Small = folderUpgradeBuildingGUI + "small/";
res.upgradeBuildingGUI = {
    infoBar: folderUpgradeBuildingGUI + "info_bar_BG.png",
    infoBarBG: folderUpgradeBuildingGUI + "info_bar.png",
    hpIcon: folderUpgradeBuildingGUI + "small/Hitpoints_Icon.png",
    iconGold: folderUpgradeBuildingGUI + "small/BUFF_GOLD.png",
    iconElixir: folderUpgradeBuildingGUI + "small/BUFF_ELIXIR.png",
    iconDarkElixir: folderUpgradeBuildingGUI + "small/BUFF_DARK.png",
    iconCoin: folderUpgradeBuildingGUI + "small/2.png",

    iconCapacityGold: upgradeBuildingGUI_Small + "Gold_Capacity_Icon.png",
    iconCapacityElixir: upgradeBuildingGUI_Small + "Elixir_Capacity_Icon.png",
    iconCapacityDarkElixir: upgradeBuildingGUI_Small + "DarkElixir_Capacity_Icon.png",

    iconProductionRateGold: upgradeBuildingGUI_Small + "Gold_ProductionRate_Icon.png",
    iconProductionRateElixir: upgradeBuildingGUI_Small + "Elixir_ProductionRate_Icon.png",
    iconProductionRateDarkElixir: upgradeBuildingGUI_Small + "DarkElixir_ProductionRate_Icon.png",

    iconTroopCapacity : upgradeBuildingGUI_Small + "TroopCapacity_Icon.png",
    iconDameDef: upgradeBuildingGUI_Small + "DAMA_DEF.png",


};

var logInGUI =
{
    bg:  logInFolder + "loading.jpg",
    btnOk: logInFolder + "okbutton.png",
    logo: logInFolder + "logo.png",
}
res.sound = {
    soundBackgound : soundFolder + "theme.mp3",
    collectGold: soundFolder + "sfx/collect_gold.mp3",
    collectElixir: soundFolder + "sfx/collect_elixir.mp3",
}
var g_preload= [
    res.tilemap_tmx,
    res.bgBotLeft,
    res.bgBotRight,
    res.bgTopLeft,
    res.bgTopRight,
    res.builderHut,
];