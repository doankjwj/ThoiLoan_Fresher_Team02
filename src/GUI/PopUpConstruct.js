var PopUpConstruct = cc.Node.extend({
    _constructType: null,
    _buildingId: null,

    _bg: null,
    _titleBar: null,
    _txtTitle: null,
    _btnClose: null,
    _btnOk: null,

    _swallowTouch: null,

    _uprgradeAble: null,

    _icon: null,
    _grass: null,
    _effect: null,
    _hpBar: null,
    _hpBarBG: null,
    _hpTXT: null,
    _hpIcon: null,
    _timeRequireTXT: null,

    _cost: {
        gold: 0,
        elixir: 0,
        darkElixir: 0,
        coin: 0
    },

    _bgScale: 2,

    _colorBG: null,

    _TAG_ICON: 1122,
    _TAG_GRASS: 3331,
    _TAG_EFFECT: 4512,
    _TAG_TITLE: 9471,
    _TAG_HP_TXT: 2323,
    _TAG_HP_BAR: 9342,
    _TAG_HP_BAR_BG: 8273,
    _TAG_TXT_CONTENT: 4221,
    _TAG_TXT_TIME_REQUIRE: 9966,
    _TAG_CONTENT_REQUIRE: 8766,

    ctor: function()
    {
        this._super();
        var self = this;

        /* Background */
        this._bg = cc.Sprite(res.popUp.bg);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, 0));
        this._bg.scale = this._bgScale;
        this.addChild(this._bg, 0);

        this._colorBG = cc.LayerColor(cc.color(127.5,127.5,127.5,0));
        this._colorBG.width = cc.winSize.width;
        this._colorBG.height = cc.winSize.height;
        this._colorBG.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._colorBG, -1);
        this.addTouchListener();

        /* Text Title */
        this._txtTitle = cc.LabelBMFont("Building Title", font.soji20);
        this._txtTitle.setAnchorPoint(cc.p(0.5, 0.5));
        this._txtTitle.setPosition(cc.p(0, this._bg.height / 2 * this._bgScale - this._txtTitle.height));
        this.addChild(this._txtTitle, 1, this._TAG_TITLE);

        /* Button Close */
        this._btnClose = ccui.Button(res.popUp.btnClose, res.popUp.btnClose);
        this._btnClose.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnClose.scale = this._bgScale * 0.75;
        this._btnClose.setPosition(cc.p(this._bg.width*this._bgScale/2 - this._btnClose.width*this._btnClose.scale/1.5, this._bg.height*this._bgScale/2 - this._btnClose.height  *this._btnClose.scale/1.5));
        this.addChild(this._btnClose, 1);
        this._btnClose.addClickEventListener(function(){
            self.setPosition(cc.p(0, - cc.winSize.height));
            self.onDisappear();
        });

        /* Button Ok */
        this._btnOk = ccui.Button(res.popUp.btnOk, res.popUp.btnOk);
        this._btnOk.setAnchorPoint(cc.p(0.5, 0.5));
        this._btnOk.scale = this._bgScale * 0.75;
        this._btnOk.setPosition(cc.p(0, -this._bg.height*this._bgScale/2 + this._btnOk.height  *this._btnOk.scale / 2));
        // this._btnOk.setTextureName("Ok");
        this.addChild(this._btnOk, 1);
        this._btnOk.addClickEventListener(function(){
            self.setPosition(cc.p(0, - cc.winSize.height));
            if (!gv.upgradeAble)
            {
                self.getParent().popUpMessage("Chưa đủ tài nguyên");
                return;
            };
            if (cf.user._builderFree <= 0)
            {
                self.getParent().popUpMessage("Tất cả thợ đang bận");
                return;
            }

            cc.log("Upgrade");
            self.onDisappear();
            cf.user._buildingList[Math.floor(gv.building_selected/100)-1][Math.floor(gv.building_selected % 100)].onStartBuild(gv.startConstructType.newConstruct);
            /* Request */
            testnetwork.connector.sendUpgradeBuilding(gv.building_selected);

            /* Update User Infor + Resource Bar */
            cf.user._currentCapacityGold -= self._cost.gold;
            cf.user._currentCapacityElixir -= self._cost.elixir;
            cf.user._currentCapacityDarkElixir -= self._cost.darkElixir;
            cf.user._currentCapacityCoin -= self._cost.coin;

            self.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_GOLD).updateStatus();
            self.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_ELIXIR).updateStatus();
            self.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_DARK_ELIXIR).updateStatus();
            self.getParent().getChildByTag(gv.tag.TAG_RESOURCE_BAR_COIN).updateStatus();
        });

        /* Building Icon */
        this._icon = cc.Sprite(res.tmp_effect);
        this._icon.setAnchorPoint(cc.p(0.5, 0.5));
        this._icon.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._icon, 2, this._TAG_ICON);

        /* Time Require */
        this._timeRequireTXT = cc.LabelBMFont("10d23h", font.soji20);
        this._timeRequireTXT.setAnchorPoint(cc.p(0.5, 1));
        this._timeRequireTXT.setPosition(cc.p(this._icon.x, this._icon.y - this._timeRequireTXT.height * 4));
        this._timeRequireTXT.visible = false;
        this.addChild(this._timeRequireTXT, 2, this._TAG_TXT_TIME_REQUIRE);

        /* Building Grass */
        this._grass = cc.Sprite(res.tmp_effect);
        this._grass.setAnchorPoint(cc.p(0.5, 0.5));
        this._grass.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._grass, 1, this._TAG_GRASS);

        /* Builing Effect */
        this._effect = cc.Sprite(res.tmp_effect);
        this._effect.setAnchorPoint(cc.p(0.5, 0.5));
        this._effect.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._effect, 3, this._TAG_EFFECT);

        /* HP Bar BG */
        this._hpBarBG = cc.Sprite(upgradeBuildingGUI.infoBarBG);
        this._hpBarBG.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height * this._bgScale / 10,
            y: 0.5 * this._bg.height * this._bgScale / 2
        });
        this.addChild(this._hpBarBG, 2, this._TAG_HP_BAR_BG);

        /* Hp Bar */
        this._hpBar = cc.Sprite(upgradeBuildingGUI.infoBar);
        this._hpBar.attr({
            anchorX: 0,
            anchorY: 0.5,
            x: 0.5 * this._bg.height * this._bgScale / 10,
            y: 0.5 * this._bg.height * this._bgScale / 2
        });
        this.addChild(this._hpBar, 2, this._TAG_HP_BAR);

        /* Hp Icon */
        this._hpIcon = cc.Sprite(upgradeBuildingGUI.hpIcon);
        this._hpIcon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: 0.5 * this._bg.height * this._bgScale / 10,
            y: 0.5 * this._bg.height * this._bgScale / 2
        });
        this.addChild(this._hpIcon, 2);

        /* Hp TXT */
        this._hpTXT = cc.LabelBMFont("HP / HP Total", font.soji20);
        this._hpTXT.attr({
            anchorX:0.5,
            anchorY: 0,
            x: this._hpBarBG.x + this._hpBar.width/2,
            y: this._hpBarBG.y
        });
        this.addChild(this._hpTXT, 2, this._TAG_HP_TXT);
    },

    addTouchListener: function () {
        var self = this;
        this._swallowTouch = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event){
                return true;
            }
        });
        this._swallowTouch.setEnabled(false);
        cc.eventManager.addListener(this._swallowTouch, this._colorBG);
    },

    onAppear: function() {
        this._swallowTouch.setEnabled(true);
    },

    onDisappear: function() {
        this._swallowTouch.setEnabled(false);
    },

    showPopUpMessage: function(msg)
    {
        // if (gv.building_selected == undefined) return;
        // if (!this.getParent().getChildByTag(gv.tag.TAG_POPUP_MESSAGE))
        // {
        //     var popUp = PopUPMessage.getOrCreate();
        //     this.getParent().addChild(popUp, 1, gv.tag.TAG_POPUP_MESSAGE);
        // }
        // this.getParent().getChildByTag(gv.tag.TAG_POPUP_MESSAGE).setPosition(cc.winSize.width/2, cc.winSize.height/2);
        // // this.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).visible = true;
        // this.getParent().getChildByTag(gv.tag.TAG_POPUP_MESSAGE).setMessage(msg);
        // this.getParent().getChildByTag(gv.tag.TAG_POPUP_MESSAGE).show();
        // self.getChildByTag(gv.tag.TAG_POPUP_MESSAGE).updateContent(gv.building_selected, gv.constructType.info);
    },


    // onEnter:function()
    // {
    //     cc.registerTargetedDelegate(-100, true, this);
    //     this._super();
    // },
    // onExit:function()
    // {
    //     cc.unregisterTouchDelegate(this);
    //     this._super();
    // },

    updateContent: function(id, constructType)
    {

        this._buildingId = id;
        this._constructType = constructType;
        gv.upgradeAble = true;
        if (constructType == gv.constructType.info)
        {
            this._btnOk.visible = false;
        }
        else
        {
            this._btnOk.visible = true;
        }
        var b = cf.user._buildingList[Math.floor(id/100) - 1][Math.floor(id%100)];
        var level = b._level;
        if (constructType == gv.constructType.upgrade)
            level++;
        this.updateIcon(b._buildingSTR, level, b._size, b._name, b._is_active);
    },

    updateIcon: function(str, level, size, name, status)
    {
        if(this.getChildByTag(this._TAG_ICON))
            this.removeChildByTag(this._TAG_ICON);
        if (this.getChildByTag(this._TAG_GRASS))
            this.removeChildByTag(this._TAG_GRASS);
        if (this.getChildByTag(this._TAG_EFFECT))
            this.removeChildByTag(this._TAG_EFFECT);

        if (!status) level--;

        /* Title Bar */
        this._txtTitle.setString(((this._constructType == gv.constructType.upgrade) ? "Nâng lên " : "") + name + " cấp " + level);

        /* Require*/
        var gold = null;
        var elixir = null;
        var darkElixir = null;
        var coin = null;
        var time = null;
        /* Hp Bar */
        var hp = null;
        var hpMax = null;
        switch(str)
        {
            case gv.buildingSTR.townHall:
                hp = gv.json.townHall[str][level]["hitpoints"];
                hpMax = gv.json.townHall[str][gv.buildingMaxLevel.townHall]["hitpoints"];
                time = gv.json.townHall[str][level]["buildTime"];
                gold = gv.json.townHall[str][level]["gold"];
                elixir = 0;
                darkElixir = 0;
                coin = 0;
                break;
            case gv.buildingSTR.builderHut:
                hp = gv.json.builderHut[str][level]["hitpoints"];
                hpMax = gv.json.builderHut[str][gv.buildingMaxLevel.builderHut]["hitpoints"];
                time = 0;
                gold = 0;
                elixir = 0;
                darkElixir = 0;
                coin = gv.json.builderHut[str][level]["coin"];
                break;
            case gv.buildingSTR.armyCamp_1:
                hp = gv.json.armyCamp[str][level]["hitpoints"];
                hpMax = gv.json.armyCamp[str][gv.buildingMaxLevel.armyCamp_1]["hitpoints"];
                time = gv.json.armyCamp[str][level]["buildTime"];
                gold = 0;
                elixir = gv.json.armyCamp[str][level]["elixir"];
                darkElixir = gv.json.armyCamp[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.barrack_1:
                hp = gv.json.barrack[str][level]["hitpoints"];
                hpMax = gv.json.barrack[str][gv.buildingMaxLevel.barrack_1]["hitpoints"];
                time = gv.json.barrack[str][level]["buildTime"];
                gold = 0;
                elixir = gv.json.barrack[str][level]["elixir"];
                darkElixir = gv.json.barrack[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.resource_1:
                hp = gv.json.resource[str][level]["hitpoints"];
                hpMax = gv.json.resource[str][gv.buildingMaxLevel.resource_1]["hitpoints"];
                time = gv.json.resource[str][level]["buildTime"];
                gold = gv.json.resource[str][level]["gold"];
                elixir = gv.json.resource[str][level]["elixir"];
                darkElixir = gv.json.resource[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.resource_2:
                hp = gv.json.resource[str][level]["hitpoints"];
                hpMax = gv.json.resource[str][gv.buildingMaxLevel.resource_2]["hitpoints"];
                time = gv.json.resource[str][level]["buildTime"];
                gold = gv.json.resource[str][level]["gold"];
                elixir = gv.json.resource[str][level]["elixir"];
                darkElixir = gv.json.resource[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.storage_1:
                hp = gv.json.storage[str][level]["hitpoints"];
                hpMax = gv.json.storage[str][gv.buildingMaxLevel.storage_1]["hitpoints"];
                time = gv.json.storage[str][level]["buildTime"];
                gold = gv.json.storage[str][level]["gold"];
                elixir = gv.json.storage[str][level]["elixir"];
                darkElixir = gv.json.storage[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.storage_2:
                hp = gv.json.storage[str][level]["hitpoints"];
                hpMax = gv.json.storage[str][gv.buildingMaxLevel.storage_2]["hitpoints"];
                time = gv.json.storage[str][level]["buildTime"];
                gold = gv.json.storage[str][level]["gold"];
                elixir = gv.json.storage[str][level]["elixir"];
                darkElixir = gv.json.storage[str][level]["darkElixir"];
                coin = 0;
                break;
            case gv.buildingSTR.canon:
                hp = gv.json.canon[str][level]["hitpoints"];
                hpMax = gv.json.canon[str][gv.buildingMaxLevel.canon]["hitpoints"];
                time = gv.json.canon[str][level]["buildTime"];
                break;
            case gv.buildingSTR.obstacle:
                hp = gv.json.obstacle[str][level]["hitpoints"];
                hpMax = gv.json.obstacle[str][gv.buildingMaxLevel.obstacle]["hitpoints"];
                time = gv.json.obstacle[str][level]["buildTime"];
                break;
            default:
                break;
        };
        // cc.log(hp + " " + hpMax + " " + time);
        // cc.log(gold + " " + elixir + " " + darkElixir + " " + coin);
        this._cost.gold = gold;
        this._cost.elixir = elixir;
        this._cost.darkElixir = darkElixir;
        this._cost.coin = coin;

        this._hpTXT.setString("Máu: " + hp + "/" + hpMax);
        this._hpBar.setTextureRect(cc.rect(0,0, hp/hpMax * 311, 36));

        /* Time Require */
        if (this._constructType == gv.constructType.upgrade)
        {
            this._timeRequireTXT.setString(cf.secondsToLongTime(time));
            this._timeRequireTXT.visible = true;
        }
        else
            this._timeRequireTXT.visible = false;

        /* Resource Require */
        if (this.getChildByTag(this._TAG_CONTENT_REQUIRE))
            this.removeChildByTag(this._TAG_CONTENT_REQUIRE);
        if (this._constructType == gv.constructType.upgrade)
        {
            var tmp = new PopUpConstruct.getNodeResourceRequire(gold, elixir, darkElixir, coin);
            tmp.attr({
                anchorX: 0.5,
                anchorY: 0.5,
                x: this._btnOk.x,
                y: this._btnOk.y
            })
            this.addChild(tmp, 5, this._TAG_CONTENT_REQUIRE);
        }

        /* Center Icon */
        switch(str)
        {
            case gv.buildingSTR.townHall:
                this._icon = cc.Sprite(res.folder_town_hall + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.builderHut:
                this._icon = cc.Sprite(res.folder_builder_hut + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.armyCamp_1:
                this._icon = cc.Sprite(res.folder_army_camp + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);;
                break;
            case gv.buildingSTR.barrack_1:
                this._icon = cc.Sprite(res.folder_barrack + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_1:
                this._icon = cc.Sprite(res.folder_gold_mine + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.resource_2:
                this._icon = cc.Sprite(res.folder_elixir_collector + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_1:
                this._icon = cc.Sprite(res.folder_gold_storage + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.storage_2:
                this._icon = cc.Sprite(res.folder_elixir_storage + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.canon:
                this._icon = cc.Sprite(res.folder_canon + str + "_" + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case gv.buildingSTR.obstacle:
                this._icon = cc.Sprite(res.folder_obs + level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            default:
                break;
        }
        this._icon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0.75
        });
        this._icon.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._icon, 2, this._TAG_ICON);

        /* Grass */
        this._grass = new grass(size);
        this._grass.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 1.5,
        })
        this._grass.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._grass, 1, this._TAG_GRASS);

        /* Effect */
        //if ((str == gv.buildingSTR.barrack_1 && level <4) || str == gv.buildingSTR.builderHut || str == gv.buildingSTR.storage_1 || str == gv.buildingSTR.storage_2) return;
        var arrNoEffect = [gv.buildingSTR.builderHut, gv.buildingSTR.storage_1, gv.buildingSTR.storage_2, gv.buildingSTR.storage_3, gv.buildingSTR.defence_1];
        if ((str == gv.buildingSTR.barrack_1 && level <4) || arrNoEffect.indexOf(str) >= 0) return;
        if (str != "AMC_1" && str != "TOW_1")
            this._effect = cc.Sprite("res/Art/Effects/" + str + "_" + level + "_effect/00.png");
        if (str == "AMC_1")
            this._effect = cc.Sprite("res/Art/Effects/armycam_1/00.png");
        if (str == "TOW_1")
            this._effect = cc.Sprite("res/Art/Effects/towhall_flame/00.png")
        this._effect.attr({
            anchorX: 0.5,
            anchorY: (str == "AMC_1") ? 0 : 0.5,
            scale: 1
        });
        this._effect.setPosition(- this._bg.width * this._bgScale / 4, this._bg.height * this._bgScale / 8);
        this.addChild(this._effect, 2, this._TAG_EFFECT);
    }
})

PopUpConstruct.getOrCreate = function()
{
    if (!gv.PopUpConstruct)
    {
        gv.PopUpConstruct = new PopUpConstruct();
    }
    return gv.PopUpConstruct;
}

PopUpConstruct.getNodeResourceRequire = cc.Node.extend({
    txtGold: null,
    txtElixir: null,
    txtDarkElixir: null,
    txtCoin: null,

    iconGold: null,
    iconElixir: null,
    iconDarkElixir: null,
    iconCoin: null,

    ctor: function(gold, elixir, darkElixir, coin)
    {
        var sum = 0;
        sum += (gold != 0) ? 1 : 0;
        sum += (elixir != 0) ? 1 : 0;
        sum += (darkElixir != 0) ? 1 : 0;
        sum += (coin != 0) ? 1 : 0;
        this._super();
        if (gold != 0)
        {
            this.txtGold = cc.LabelBMFont(gold, font.soji20);
            this.txtGold.setColor(cc.color(255, 255, 255, 255));
            this.txtGold.setAnchorPoint(1, 0.5);
            this.txtGold.setPosition(cc.p(0, sum / 2 * this.txtGold.height));
            if (gold >= cf.user._currentCapacityGold)
            {
                this.txtGold.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
            }
            this.addChild(this.txtGold, 0);

            this.iconGold = cc.Sprite(upgradeBuildingGUI.iconGold);
            this.iconGold.setAnchorPoint(cc.p(1, 0.5));
            this.iconGold.setPosition(cc.p(40, this.txtGold.y));
            this.addChild(this.iconGold, 0);
        };
        if (elixir != 0)
        {
            this.txtElixir = cc.LabelBMFont(elixir, font.soji20);
            this.txtElixir.setColor(cc.color(255, 255, 255, 255));
            this.txtElixir.setAnchorPoint(1, 0.5);
            this.txtElixir.setPosition(cc.p(0, (sum-1) / 2 * this.txtElixir.height));
            if (elixir >= cf.user._currentCapacityElixir)
            {
                this.txtElixir.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
            }
            this.addChild(this.txtElixir, 0);

            this.iconElixir = cc.Sprite(upgradeBuildingGUI.iconElixir);
            this.iconElixir.setAnchorPoint(cc.p(1, 0.5));
            this.iconElixir.setPosition(cc.p(40, this.txtElixir.y));
            this.addChild(this.iconElixir, 0);
        };
        if (darkElixir != 0)
        {
            this.txtDarkElixir = cc.LabelBMFont(darkElixir, font.soji20);
            this.txtDarkElixir.setColor(cc.color(255, 255, 255, 255));
            this.txtDarkElixir.setAnchorPoint(1, 0.5);
            this.txtDarkElixir.setPosition(cc.p(0, -(sum-1) / 2 * this.txtDarkElixir.height));
            if (darkElixir >= cf.user._currentCapacityDarkElixir)
            {
                this.txtDarkElixir.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
            }
            this.addChild(this.txtDarkElixir, 0);

            this.iconDarkElixir = cc.Sprite(upgradeBuildingGUI.iconDarkElixir);
            this.iconDarkElixir.setAnchorPoint(cc.p(1, 0.5));
            this.iconDarkElixir.setPosition(cc.p(40, this.txtDarkElixir.y));
            this.addChild(this.iconDarkElixir, 0);
        };
        if (coin != 0)
        {
            this.txtCoin = cc.LabelBMFont(coin, font.soji20);
            this.txtCoin.setColor(cc.color(255, 255, 255, 255));
            this.txtCoin.setAnchorPoint(1, 0.5);
            this.txtCoin.setPosition(cc.p(0, -sum / 2 * this.txtCoin.height));
            if (coin >= cf.user._currentCapacityCoin)
            {
                this.txtCoin.setColor(cc.color(255, 0, 0, 255));
                gv.upgradeAble = false;
            }
            this.addChild(this.txtCoin, 0);

            this.iconCoin = cc.Sprite(upgradeBuildingGUI.iconCoin);
            this.iconCoin.setAnchorPoint(cc.p(1, 0.5));
            this.iconCoin.setPosition(cc.p(40, this.txtCoin.y));
            this.addChild(this.iconCoin, 0);
        };

    }
})

// var PopUpBG = cc.Layer.extend({
//     ctor:function() {
//         this._super();
//         cc.associateWithNative( this, cc.Layer );
//         // this.init();
//     },
//
//     init:function (cb, cb_parent) {
//
//         //////////////////////////////
//         // 1. super init first
//         this._super();
//
//         //navi enabling touch
//         if( 'touches' in sys.capabilities ) {
//             this.setTouchEnabled(true);
//         }
//         // if( 'mouse' in sys.capabilities ) {
//         //     this.setMouseEnabled(true);
//         // }
//
//
//         /////////////////////////////
//         var size = cc.Director.getInstance().getWinSize();
//
//         var centerPos = cc.p( size.width/2, size.height/2 );
//
//         var spriteBackground = cc.Sprite.create(res.popUp.bg);
//
//
//         spriteBackground.setPosition(size.width/2, size.height/2);
//         this.addChild(spriteBackground, 0);
//
//         var label1 = cc.LabelTTF.create("Some text", "Arial", 32);
//         label1.setColor(cc.color(0, 0, 0));
//         label1.setPosition(size.width/2, size.height/2);
//         this.addChild(label1);
//
//         this.addMainMenu(cb, cb_parent);
//
//
//         return true;
//     },
//
//     addMainMenu: function(cb, cb_parent) {
//
//         var size = cc.Director.getInstance().getWinSize();
//
//         // add start button
//         var okItem = cc.MenuItemImage.create(
//             buildingGUI.buildCancel,
//             buildingGUI.buildCancel,
//             cb,
//             cb_parent);
//         okItem.setAnchorPoint(cc.p(0.5, 0.5));
//         okItem.setPosition(size.width/2, size.height * 1/4);
//
//
//         var menu = cc.Menu.create(okItem);
//         menu.setPosition(cc.p(0, 0));
//         this.addChild(menu, 1);
//
//
//     },
// });