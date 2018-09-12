var mapFolder           = "#res/Art/Map/";
var buildingsFolder     = "#res/Art/Buildings/";
var folder_effect       = "res/effect/";
var fontFolder          = "res/Art/Fonts/";
var guiFolder           = "res/Art/GUIs/";
var jsonFolder          = "res/ConfigJson/";
var researchTroopFolder = "res/Art/GUIs/research_troop/";
var researchTroopFolderTroopIcon            = "res/Art/GUIs/upgrade_troop/icon/";
var researchTroopFolderTroopIconSmall       = "res/Art/GUIs/upgrade_troop/small_icon/";
var logInFolder                             = "#res/Art/LoginGui/";
var folderUpgradeBuildingGUI                = guiFolder + "upgrade_building_gui/";
var troopIconFolder         = guiFolder + "train_troop_gui/icon/";
var soundFolder             = "res/Sounds/";
var folderClanChat          = "res/Art/GUIs/Chat/";
var folderClan              = "res/Art/Bang hoi/";
var plistFolder             = "res/res_plist/";
var EffectsFolder           = "#res/Art/Effects/"

var res = {
    image_postfix_1: "idle/image000",
    image_postfix_2: ".png",

    tilemap_tmx:    mapFolder + "42x42map.tmx",
    bgTopLeft:      mapFolder + "1_0000_Layer-3.png",
    bgBotLeft:      mapFolder + "1_0001_Layer-1.png",
    bgTopRight:     mapFolder + "1_0002_Layer-4.png",
    bgBotRight:     mapFolder + "1_0003_Layer-2.png",

    armyCampJson:       jsonFolder + "ArmyCamp.json",
    barrackJson:        jsonFolder + "Barrack.json",
    builderHutJson:     jsonFolder + "BuilderHut.json",
    initGameJson:       jsonFolder + "InitGame.json",
    laboratoryJson:     jsonFolder + "Laboratory.json",
    resourceJson:       jsonFolder + "Resource.json",
    storageJson:        jsonFolder + "Storage.json",
    townHallJson:       jsonFolder + "TownHall.json",
    troopJson:          jsonFolder + "Troop.json",
    troopBaseJson:      jsonFolder + "TroopBase.json",
    obstacleJson:       jsonFolder + "Obstacle.json",
    shopItemList:       jsonFolder + "ShopList.json",
    defenceJson:        jsonFolder + "Defence.json",
    clanCastleJson:     jsonFolder + "ClanCastle.json",
    wallJson:           jsonFolder + "Wall.json",

    builderHut:     buildingsFolder + "builderHut/idle/image0000.png",
    folder_builder_hut:         buildingsFolder + "builderHut/",
    folder_army_camp:           buildingsFolder + "armyCamp/",
    folder_barrack:             buildingsFolder + "barrack/",
    folder_town_hall:           buildingsFolder + "townhall/",
    folder_gold_mine:           buildingsFolder + "goldMine/",
    folder_gold_storage:        buildingsFolder + "goldStorage/",
    folder_elixir_collector:    buildingsFolder + "elixirCollector/",
    folder_elixir_storage:      buildingsFolder + "elixirStorage/",
    folder_dark_elixir_collector:   buildingsFolder + "darkElixirCollector/",
    folder_dark_elixir_storage:     buildingsFolder + "darkElixirStorage/",
    folder_canon:               buildingsFolder + "cannon/canon_",
    folder_defense_base:        buildingsFolder + "defense_base/",
    folder_obs:                 buildingsFolder + "obstacle/",
    folder_laboratory:          buildingsFolder + "labratory/",
    folder_clan_castle:         buildingsFolder + "clan_castle/",
    folder_wall:                buildingsFolder + "wall/",

    folder_gui_action_building:     "res/Art/GUIs/" + "Action_Building_Icon/",
    folder_gui_build:               guiFolder + "/upgrade_building_gui/",
    folder_gui_main:                guiFolder + "Main_Gui/",
    folder_gui_collect_res:         guiFolder + "collect_res/",

    folder_effect:      folder_effect,
    tmp_effect:         folder_effect + "tmp_effect.png",

    map_BG:             mapFolder + "map_obj_bg/BG/",
    map_obj:            mapFolder + "map_obj_bg/",

    folder_troop_animation: "res/Art/Troops/",
    folder_builder_animation: "res/Art/builder_working/",

    popUp : {
        bg:             guiFolder + "upgrade_building_gui/BG.png",
        btnClose:       guiFolder + "upgrade_building_gui/close.png",
        btnOk:          guiFolder + "upgrade_building_gui/button.png",
    }
};

/*Plist Default*/
res.plist=
{
    bang_hoi                            : plistFolder + "bang_hoi.plist",
    building_army_camp                  : plistFolder + "building_army_camp.plist",
    building_barrack                    : plistFolder + "building_barrack.plist",
    building_builder_hut                : plistFolder + "building_builder_hut.plist",
    building_clan_castle                : plistFolder + "building_clan_castle.plist",
    building_dark_elixir_collector      : plistFolder + "building_dark_elixir_collector.plist",
    building_dark_elixir_storage        : plistFolder + "building_dark_elixir_storage.plist",
    building_defence_1                  : plistFolder + "building_defence_1.plist",
    building_defence_base                  : plistFolder + "building_defence_base.plist",
    building_elixir_collector                  : plistFolder + "building_elixir_collector.plist",
    building_elixir_storage                  : plistFolder + "building_elixir_storage.plist",
    building_gold_mine                  : plistFolder + "building_gold_mine.plist",
    building_gold_storage                  : plistFolder + "building_gold_storage.plist",
    building_laboratory                  : plistFolder + "building_laboratory.plist",
    building_obstacle                  : plistFolder + "building_obstacle.plist",
    building_tow_hall                  : plistFolder + "building_tow_hall.plist",
    building_wall                  : plistFolder + "building_wall.plist",
    effects_first_image                  : plistFolder + "effects_first_image.plist",
    gui_action_building_icon                  : plistFolder + "gui_action_building_icon.plist",
    gui_chat                  : plistFolder + "gui_chat.plist",
    gui_collect_res                  : plistFolder + "gui_collect_res.plist",
    gui_icons                  : plistFolder + "gui_icons.plist",
    gui_main_gui                  : plistFolder + "gui_main_gui.plist",
    gui_research_troop                  : plistFolder + "gui_research_troop.plist",
    gui_shop_gui                  : plistFolder + "gui_shop_gui.plist",
    gui_train_troop_gui                  : plistFolder + "gui_train_troop_gui.plist",
    gui_upgrade_building_gui                  : plistFolder + "gui_upgrade_building_gui.plist",
    gui_upgrade_troop_icon_1_3                  : plistFolder + "gui_upgrade_troop_icon_1_3.plist",
    gui_upgrade_troop_icon_4_6                  : plistFolder + "gui_upgrade_troop_icon_4_6.plist",
    gui_upgrade_troop_icon_7_9                  : plistFolder + "gui_upgrade_troop_icon_7_9.plist",
    gui_upgrade_troop_icon_10_16_17                  : plistFolder + "gui_upgrade_troop_icon_10_16_17.plist",
    gui_upgrade_troop_small_icon                  : plistFolder + "gui_upgrade_troop_small_icon.plist",
    log_in_gui                  : plistFolder + "log_in_gui.plist",
    map_corner_1                  : plistFolder + "map_corner_1.plist",
    map_corner_2                  : plistFolder + "map_corner_2.plist",
    map_obj_bg                  : plistFolder + "map_obj_bg.plist",
};

/*GUI cho thu hoạch*/
res.folderCollectResource =
{
    bgButtonEnough:     guiFolder + "collect_res/collect_bg.png",
    bgButtonFull:       guiFolder + "collect_res/full_bg.png",
};

var font = {

    soji20:     fontFolder + "soji_20.fnt",
    soji12:     fontFolder + "soji_12.fnt",
    fista16:    fontFolder + "fista_16_non.fnt",
    fista20:    fontFolder + "fista_20_non.fnt",
    fista24:    fontFolder + "fista_24_non.fnt",
    arial:       fontFolder + "arial.ttf"
};

res.buildingOnMoveGUI = function(type, size)
{
    return res.map_BG + type + "_" + (size ) + ".png"
}

res.researchTroopGUI =
{
    button:             researchTroopFolder + "button.png",
    iconResource_2:     researchTroopFolder + "dau tim.png",
    iconResource_3:     researchTroopFolder + "dau den.png",
    spanWhite:          researchTroopFolder + "mieng trang.png",
    arrowGreen:         researchTroopFolder + "mui ten.png",
    bg:                 researchTroopFolder + "nen 1.png",
    bgSmall:            researchTroopFolder + "nen nho.png",
    bgStar:             researchTroopFolder + "nen sao.png",
    bgTransparent:      researchTroopFolder + "nen trong.png",
    slost:              researchTroopFolder + "slost.png",
    grass:              researchTroopFolderTroopIcon + "troop_bg.png",
    iconCoin:           guiFolder + "Main_Gui/g_icon.png",
};
res.clanChatGUI = {
    barDonateTroopBG:           folderClanChat + "1_0001_Layer-1.png",
    barDonateTroop:             folderClanChat + "1_0000_Layer-2.png",
    buttonGreen:                folderClanChat + "button 2.png",
    buttonBlue:                 folderClanChat + "button 1.png",
    buttonCollapse:             folderClanChat + "button chinh 1.png",
    buttonExpand:               folderClanChat + "button chinh.png",
    buttonBG:                   folderClanChat + "c_0002_Layer-85.png",
    lineSeparateChat:           folderClanChat + "dong ke.png",
    lineSeparateOnline:         folderClanChat + "vc_0002_Layer-3.png",
    buttonChat:                 folderClanChat + "icon thoai.png",
    buttonInfo:                 folderClanChat + "Icon_ thong tin.png",
    donateTroopBG:              folderClanChat + "nen 2.png",
    buttonTabSelected:          folderClanChat + "nen button 2.png",
    buttonTabUnselected:        folderClanChat + "nen button 1.png",
    chatBG:                     folderClanChat + "nen.png",
    buttonClose:                folderClanChat + "nut x.png",
    editTextChat:               folderClanChat + "s.png",
    iconUserOffline:            folderClanChat + "vc_0000_Layer-4.png",
    iconUserOnline:             folderClanChat + "vc_0001_Shape-84.png",
    layerUserOnline:            folderClanChat + "vc_0004_Layer-80-copy.png",
    layerUserOnlineSeparate:    folderClanChat +  "vc_0002_Layer-3.png",
    barUserOnline:              folderClanChat + "vc_0003_Layer-2.png",
};
res.clanGUI = {
    iconStarSmall:                  folderClan + "sao nho.png",
    background:                     folderClan + "nen 1.png",
    tabBar:                         folderClan + "o duoi.png",
    tabBarBG:                       folderClan + "o duoi 1.png",
    flag:                           folderClan + "co 1.png",
    flagBG:                         folderClan + "co 2.png",
    textFieldClanNameBG:            folderClan + "slost nen 1.png",
    textFieldClanDescriptionBG:     folderClan + "slost nen 2.png",
    buttonTraThu:                   folderClan + "button _ tra thu.png",
    buttonXemLai:                   folderClan + "button _xem lai.png",

    iconClan:               folderClan +  "icon bang hoi.png",
    slotBackground:         folderClan + "slost nen 2.png",
    bg:                     folderClan + "nen 1.png",
    flagOpen:               folderClan + "co 1.png",
    flagClose:              folderClan + "co 2.png",
    buttonBG:               folderClan + "o duoi.png",
    buttonBGClose:          folderClan + "o duoi 1.png",
    clanItemBackground:     folderClan + "slost.png",
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
    demo:               guiFolder + "shop_gui/Demo.png",
    iconSale:           guiFolder + "icons/shop_gui/km_2.png",
};
var mainGUI = {
    armyIcon:           guiFolder + "Main_Gui/army_icon.png",
    attack:             guiFolder + "Main_Gui/attack.png",
    bgBar1:             guiFolder + "Main_Gui/bg_bar_1.png",
    bgBar2:             guiFolder + "Main_Gui/bg_bar_2.png",
    bgBar3:             guiFolder + "Main_Gui/bg_bar_3.png",
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
    iconExp:            guiFolder + "Main_Gui/ic_exp.png",
    inventory:          guiFolder + "Main_Gui/kho.png",
    lvlUp:              guiFolder + "Main_Gui/level_up.png",
    loading:            guiFolder + "Main_Gui/loading.png",
    ranking:            guiFolder + "Main_Gui/ranking.png",
    setting:            guiFolder + "Main_Gui/setting.png",
    shield:             guiFolder + "Main_Gui/shield.png",
    shop:               guiFolder + "Main_Gui/shop.png",
    trophy:             guiFolder + "Main_Gui/trophy.png",
    trophyBgBar:        guiFolder + "Main_Gui/trophy_bg_bar.png",
    alert_icon:         guiFolder + "icons/alert_icon.png",
};
var buildingGUI = {
    iconInfo :              res.folder_gui_action_building + "info_icon.png",
    iconUpgrade:            res.folder_gui_action_building + "upgrade_icon.png",
    iconHarvest_1:          res.folder_gui_action_building + "harvest_gold.png",
    iconHarvest_2:          res.folder_gui_action_building + "harvest_elixir.png",
    iconHarvest_3:          res.folder_gui_action_building + "harvest_dark_elixir.png",
    instant:                res.folder_gui_action_building + "quick_finish.png",
    iconResearch:           res.folder_gui_action_building + "research_icon.png",
    iconRequestDonate:      res.folder_gui_action_building + "request_troop_button.png",
    iconClan:               res.folder_gui_action_building + "clan_button.png",
    iconRemove:             res.folder_gui_action_building + "remove_icon.png",
    bg:                     res.folder_gui_action_building + "bg_button.png",
    selectLine:             res.folder_gui_action_building + "select_line.png",

    trainIcon:              res.folder_gui_action_building + "train_icon.png",

    buildCommit:            res.folder_gui_action_building + "accept.png",
    buildCancel:            res.folder_gui_action_building + "cancel.png",
    buildCancelIcon:        res.folder_gui_action_building + "cancel_icon.png",
    defence:                res.map_obj + "upgrading.png"
};

var trainingGUI = {
    previousIcon:       guiFolder + "train_troop_gui/previous.png",
    forwardIcon:        guiFolder + "train_troop_gui/forward.png",
    trainBar:           guiFolder + "train_troop_gui/train_bar.png",
    elixirIcon:         guiFolder + "train_troop_gui/icon_elixir.png",
    gIcon:              guiFolder + "train_troop_gui/g_icon.png",
    cancelIcon:         guiFolder + "train_troop_gui/cancel.png",
    buttonIcon:         guiFolder + "train_troop_gui/button.png",
    bgCost:             guiFolder + "train_troop_gui/bg_cost.png",
    bgRequired:         guiFolder + "train_troop_gui/bg_cost_3.png",
    infoIcon:           guiFolder + "train_troop_gui/info.png",
    slotIcon :          guiFolder + "train_troop_gui/slot.png",
    queueArrow:         guiFolder + "train_troop_gui/queue.png",
    bgTrainBar:         guiFolder + "train_troop_gui/bg_train_bar.png",
    bg:                 guiFolder + "train_troop_gui/background.png"
};

var trainingQueueGUI = {
    ARM_1:  guiFolder + "train_troop_gui/small_icon/ARM_1.png",
    ARM_2:  guiFolder + "train_troop_gui/small_icon/ARM_2.png",
    ARM_3:  guiFolder + "train_troop_gui/small_icon/ARM_3.png",
    ARM_4:  guiFolder + "train_troop_gui/small_icon/ARM_4.png",
    ARM_5:  guiFolder + "train_troop_gui/small_icon/ARM_5.png",
    ARM_6:  guiFolder + "train_troop_gui/small_icon/ARM_6.png",
    ARM_7:  guiFolder + "train_troop_gui/small_icon/ARM_7.png",
    ARM_8:  guiFolder + "train_troop_gui/small_icon/ARM_8.png",
    ARM_9:  guiFolder + "train_troop_gui/small_icon/ARM_9.png",
    ARM_10: guiFolder + "train_troop_gui/small_icon/ARM_10.png",
    ARM_16: guiFolder + "train_troop_gui/small_icon/ARM_16.png",
    ARM_17: guiFolder + "train_troop_gui/small_icon/ARM_17.png",
    slot:   guiFolder + "train_troop_gui/small_icon/slot.png",
};

res.troopIconInPopUpBuilding =
[
    guiFolder + "train_troop_gui/small_icon/ARM_1.png",
    guiFolder + "train_troop_gui/small_icon/ARM_2.png",
    guiFolder + "train_troop_gui/small_icon/ARM_3.png",
    guiFolder + "train_troop_gui/small_icon/ARM_4.png",
]

var troopIcon = {
    ARM_1:  troopIconFolder + "ARM_1.png",
    ARM_2:  troopIconFolder + "ARM_2.png",
    ARM_3:  troopIconFolder + "ARM_3.png",
    ARM_4:  troopIconFolder + "ARM_4.png",
    ARM_5:  troopIconFolder + "ARM_5.png",
    ARM_6:  troopIconFolder + "ARM_6.png",
    ARM_7:  troopIconFolder + "ARM_7.png",
    ARM_8:  troopIconFolder + "ARM_8.png",
    ARM_9:  troopIconFolder + "ARM_9.png",
    ARM_10: troopIconFolder + "ARM_10.png",
    ARM_16: troopIconFolder + "ARM_16.png",
    ARM_17: troopIconFolder + "ARM_17.png"
};

var upgradeBuildingGUI_Small = folderUpgradeBuildingGUI + "small/";
res.upgradeBuildingGUI = {
    infoBar:        folderUpgradeBuildingGUI + "info_bar_BG.png",
    infoBarBG:      folderUpgradeBuildingGUI + "info_bar.png",
    hpIcon:         folderUpgradeBuildingGUI + "small/Hitpoints_Icon.png",
    iconGold:       folderUpgradeBuildingGUI + "small/BUFF_GOLD.png",
    iconElixir:     folderUpgradeBuildingGUI + "small/BUFF_ELIXIR.png",
    iconDarkElixir: folderUpgradeBuildingGUI + "small/BUFF_DARK.png",
    iconCoin:       folderUpgradeBuildingGUI + "small/2.png",
    iconTime:       folderUpgradeBuildingGUI + "small/TIME.png",

    iconCapacityGold:       upgradeBuildingGUI_Small + "Gold_Capacity_Icon.png",
    iconCapacityElixir:     upgradeBuildingGUI_Small + "Elixir_Capacity_Icon.png",
    iconCapacityDarkElixir: upgradeBuildingGUI_Small + "DarkElixir_Capacity_Icon.png",

    iconProductionRateGold:         upgradeBuildingGUI_Small + "Gold_ProductionRate_Icon.png",
    iconProductionRateElixir:       upgradeBuildingGUI_Small + "Elixir_ProductionRate_Icon.png",
    iconProductionRateDarkElixir:   upgradeBuildingGUI_Small + "DarkElixir_ProductionRate_Icon.png",

    iconTroopCapacity :     upgradeBuildingGUI_Small + "TroopCapacity_Icon.png",
    iconDameDef:            upgradeBuildingGUI_Small + "DAMA_DEF.png",

    iconSlot:               folderUpgradeBuildingGUI + "slot.png",

};

var logInGUI =
{
    bg:             logInFolder + "loading.jpg",
    btnOk:          logInFolder + "okbutton.png",
    logo:           logInFolder + "logo.png",
    textFieldBG:    logInFolder + "g_background.png",
};



res.sound = {
    soundBackgound :    soundFolder + "theme.mp3",
    collectGold:        soundFolder + "sfx/collect_gold.mp3",
    collectElixir:      soundFolder + "sfx/collect_elixir.mp3",

    building_contruct:              soundFolder + "sfx/building_contruct.mp3",
    building_destroyed:             soundFolder + "sfx/building_destroyed.mp3",
    building_finish:                soundFolder + "sfx/building_finish.mp3",
    builderhut_pickup:              soundFolder + "sfx/builderhut_pickup.mp3",
    builderhut_place:               soundFolder + "sfx/builderhut_place.mp3",
    camp_pickup:                    soundFolder + "sfx/camp_pickup.mp3",
    camp_place:                     soundFolder + "sfx/camp_place.mp3",
    cannon_pickup:                  soundFolder + "sfx/cannon_pickup.mp3",
    cannon_place:                   soundFolder + "sfx/cannon_place.mp3",
    darkelixirdrill_pickup:         soundFolder + "sfx/darkelixirdrill_pickup.mp3",
    darkelixirdrill_place:          soundFolder + "sfx/darkelixirdrill_place.mp3",
    elixirpump_pickup:              soundFolder + "sfx/elixirpump_pickup.mp3",
    elixirpump_place:               soundFolder + "sfx/elixirpump_place.mp3",
    elixirstorage_pickup:           soundFolder + "sfx/elixirstorage_pickup.mp3",
    elixirstorage_place:            soundFolder + "sfx/elixirstorage_place.mp3",
    goldmine_pickup:                soundFolder + "sfx/goldmine_pickup.mp3",
    goldmine_place:                 soundFolder + "sfx/goldmine_place.mp3",
    goldstorage_pickup:             soundFolder + "sfx/goldstorage_pickup.mp3",
    goldstorage_place:              soundFolder + "sfx/goldstorage_place.mp3",
    townhall_pickup:                soundFolder + "sfx/townhall_pickup.mp3",
    townhall_place:                 soundFolder + "sfx/townhall_place.mp3",
    wall_pickup:                    soundFolder + "sfx/wall_pickup.mp3",
    wall_place:                     soundFolder + "sfx/wall_place.mp3",

    button_click:                   soundFolder + "sfx/button_click.mp3",
    touch_bush:                     soundFolder + "sfx/touch_bush.mp3",

};

res.plist =
{
    effect_armycamp_1:      "res/effect/effect_armycamp_1.plist",
    effect_armycamp_2:      "res/effect/effect_armycamp_2.plist",
    effect_barrack_1_4:     "res/effect/effect_barrack_1_4.plist",
    effect_barrack_1_5:     "res/effect/effect_barrack_1_5.plist",
    effect_barrack_1_6:     "res/effect/effect_barrack_1_6.plist",
    effect_barrack_1_7:     "res/effect/effect_barrack_1_7.plist",
    effect_barrack_1_8:     "res/effect/effect_barrack_1_8.plist",
    effect_barrack_working: "res/effect/effect_barrack_working.plist",
    effect_coindrop_2:      "res/effect/effect_coindrop_2.plist",
    effect_coindrop_3:      "res/effect/effect_coindrop_3.plist",
    effect_construct_levelup: "res/effect/effect_construct_levelup.plist",
    effect_defence_1_1:     "res/effect/effect_defence_1_1.plist",
    effect_defence_1_2:     "res/effect/effect_defence_1_2.plist",
    effect_defence_1_3:     "res/effect/effect_defence_1_3.plist",
    effect_defence_1_4:     "res/effect/effect_defence_1_4.plist",
    effect_defence_1_5:     "res/effect/effect_defence_1_5.plist",
    effect_defence_1_6:     "res/effect/effect_defence_1_6.plist",
    effect_defence_1_7:     "res/effect/effect_defence_1_7.plist",
    effect_defence_1_8:     "res/effect/effect_defence_1_8.plist",
    effect_defence_1_9:     "res/effect/effect_defence_1_9.plist",
    effect_defence_1_10:    "res/effect/effect_defence_1_10.plist",
    effect_lab_1_2:     "res/effect/effect_lab_1_2.plist",
    effect_lab_1_3:     "res/effect/effect_lab_1_3.plist",
    effect_lab_1_4:     "res/effect/effect_lab_1_4.plist",
    effect_lab_1_5:     "res/effect/effect_lab_1_5.plist",
    effect_lap_1_researching: "res/effect/effect_lap_1_researching.plist",
    effect_levelup:     "res/effect/effect_levelup.plist",
    effect_loading:     "res/effect/effect_loading.plist",
    effect_res_1_1:     "res/effect/effect_res_1_1.plist",
    effect_res_1_2:     "res/effect/effect_res_1_2.plist",
    effect_res_1_3:     "res/effect/effect_res_1_3.plist",
    effect_res_1_4:     "res/effect/effect_res_1_4.plist",
    effect_res_1_5:     "res/effect/effect_res_1_5.plist",
    effect_res_1_6:     "res/effect/effect_res_1_6.plist",
    effect_res_1_7:     "res/effect/effect_res_1_7.plist",
    effect_res_1_8:     "res/effect/effect_res_1_8.plist",
    effect_res_1_9:     "res/effect/effect_res_1_9.plist",
    effect_res_1_10:    "res/effect/effect_res_1_10.plist",
    effect_res_1_11:    "res/effect/effect_res_1_11.plist",
    effect_res_2_1:     "res/effect/effect_res_2_1.plist",
    effect_res_2_2:     "res/effect/effect_res_2_2.plist",
    effect_res_2_3:     "res/effect/effect_res_2_3.plist",
    effect_res_2_4:     "res/effect/effect_res_2_4.plist",
    effect_res_2_5:     "res/effect/effect_res_2_5.plist",
    effect_res_2_6:     "res/effect/effect_res_2_6.plist",
    effect_res_2_7:     "res/effect/effect_res_2_7.plist",
    effect_res_2_8:     "res/effect/effect_res_2_8.plist",
    effect_res_2_9:     "res/effect/effect_res_2_9.plist",
    effect_res_2_10:    "res/effect/effect_res_2_10.plist",
    effect_res_2_11:    "res/effect/effect_res_2_11.plist",
    effect_researching: "res/effect/effect_researching.plist",
    effect_townhall_flame: "res/effect/effect_townhall_flame.plist",

    ARM_1_1:    "res/Art/Troops/ARM_1_1/ARM_1_1.plist",
    ARM_1_2:    "res/Art/Troops/ARM_1_2/ARM_1_2.plist",
    ARM_1_3:    "res/Art/Troops/ARM_1_3/ARM_1_3.plist",
    ARM_1_4:    "res/Art/Troops/ARM_1_4/ARM_1_4.plist",
    ARM_2_1:    "res/Art/Troops/ARM_2_1/ARM_2_1.plist",
    ARM_2_2:    "res/Art/Troops/ARM_2_2/ARM_2_2.plist",
    ARM_2_3:    "res/Art/Troops/ARM_2_3/ARM_2_3.plist",
    ARM_2_4:    "res/Art/Troops/ARM_2_4/ARM_2_4.plist",
    ARM_3_1:    "res/Art/Troops/ARM_3_1/ARM_3_1.plist",
    ARM_3_2:    "res/Art/Troops/ARM_3_2/ARM_3_2.plist",
    ARM_3_3:    "res/Art/Troops/ARM_3_3/ARM_3_3.plist",
    ARM_4_1:    "res/Art/Troops/ARM_4_1/ARM_4_1.plist",
    ARM_4_2:    "res/Art/Troops/ARM_4_2/ARM_4_2.plist",
    ARM_4_3:    "res/Art/Troops/ARM_4_3/ARM_4_3.plist",
    ARM_4_4:    "res/Art/Troops/ARM_4_4/ARM_4_4.plist",
};

/* Content công trình mở khóa khi nâng cấp nhà chính*/
res.building_townHall_upgrade_icon =
[
    res.folder_barrack + gv.building_townHall_upgrade_STR[0] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_army_camp + gv.building_townHall_upgrade_STR[1] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_laboratory + gv.building_townHall_upgrade_STR[2] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_defense_base + gv.building_townHall_upgrade_STR[3] + "_1_Shadow.png",
    res.folder_wall + "WAL_1_1/" + gv.building_townHall_upgrade_STR[4] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_gold_mine + gv.building_townHall_upgrade_STR[5] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_elixir_collector + gv.building_townHall_upgrade_STR[6] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_dark_elixir_collector + gv.building_townHall_upgrade_STR[7] + "_1/" + res.image_postfix_1 + "0" + res.image_postfix_2,
    res.folder_gold_storage + gv.building_townHall_upgrade_STR[8] + "_1/" + res.image_postfix_1 + "3" + res.image_postfix_2,
    res.folder_elixir_storage + gv.building_townHall_upgrade_STR[9] + "_1/" + res.image_postfix_1 + "3" + res.image_postfix_2,
    res.folder_dark_elixir_storage + gv.building_townHall_upgrade_STR[10] + "_1/" + res.image_postfix_1 + "3" + res.image_postfix_2,
];
res.building_townHall_upgrade_effect =
[
    EffectsFolder + "BAR_1_4_effect/00.png",
    EffectsFolder + "armycam_1/00.png",
    EffectsFolder + "LAB_1_2_effect/00.png",
    res.folder_canon + "1/idle/image0002.png",
    "none",
    EffectsFolder + "RES_1_1_effect/00.png",
    EffectsFolder + "RES_2_1_effect/00.png",
    "none",
    "none",
    "none",
    "none",
];

var g_preload= [
    res.tilemap_tmx,
    res.bgBotLeft,
    res.bgBotRight,
    res.bgTopLeft,
    res.bgTopRight,
    res.builderHut,
    res.plist,
    "res/Localize/en",
    "res/Localize/en.txt",
    "res/Localize/vi",
    "res/Localize/vi.txt",
    res.plist,
];