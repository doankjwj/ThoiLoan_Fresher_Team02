/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var GUI_ResourceBar = cc.Node.extend({
    /*
        1: Gold
        2: Elixir
        3: Dark Elixir
        4: G
     */
    _type: null,
    _maxCapacity: null,
    _currentCapacity: null,

    _icon: null,
    _bar: null,
    _barBG: null,
    _txtCurrent: null,
    _txtMax: null,
    _lobbyAdd: null,

    ctor: function(type)
    {
        this._type = type;
        this._super();
        this.attr({
            anchorX: 1,
            anchorY: 0,
        })
        this.setAnchorPoint(cc.p(1, 1));
        this.setPosition(cc.p(cc.winSize.width, cc.winSize.height - 50));

        this._currentCapacity = (type == 1) ? cf.user._currentCapacityGold : (type == 2)? cf.user._currentCapacityElixir : (type == 3) ? cf.user._currentCapacityDarkElixir : cf.user._currentCapacityCoin;
        this._maxCapacity = (type == 1) ? cf.user._maxCapacityGold : (type == 2) ? cf.user._maxCapacityElixir : (type == 3) ? cf.user._maxCapacityDarkElixir : 0;

        switch (type)
        {
            case 1:
                this._icon = cc.Sprite(mainGUI.goldIcon);
                this._bar = cc.Sprite(mainGUI.goldBar);
                this._txtCurrent = cc.LabelBMFont(cf.user._currentCapacityGold, font.soji20);
                this._txtMax = cc.LabelBMFont("Max: " + cf.user._maxCapacityGold, font.soji20);
                break;
            case 2:
                this._icon = cc.Sprite(mainGUI.elixirIcon);
                this._bar = cc.Sprite(mainGUI.elixirBar);
                this._txtCurrent = cc.LabelBMFont(cf.user._currentCapacityElixir, font.soji20);
                this._txtMax = cc.LabelBMFont("Max: " + cf.user._maxCapacityElixir, font.soji20);
                break;
            case 3:
                this._icon = cc.Sprite(mainGUI.darkElixirIcon);
                this._bar = cc.Sprite(mainGUI.darkElixirBar);
                this._txtCurrent = cc.LabelBMFont(cf.user._currentCapacityDarkElixir, font.soji20);
                this._txtMax = cc.LabelBMFont("Max: " + cf.user._maxCapacityDarkElixir, font.soji20);
                break;
            case 4:
                this._icon = cc.Sprite(mainGUI.gIcon);
                this._bar = cc.Sprite(mainGUI.gBar);
                this._txtCurrent = cc.LabelBMFont(cf.user._currentCapacityCoin, font.soji20);
                this._txtMax = cc.LabelBMFont(0, font.soji20);
                break;
        };
        this._icon.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this.width,
            y: 5
        });
        this.addChild(this._icon, 0);

        this._barBG = cc.Sprite(mainGUI.bgBar2);
        this._barBG.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this.width - this._icon.width,
            y: 0
        })
        this.addChild(this._barBG, 0);

        this._bar.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this.width - this._icon.width - 9,
            y: 3
        });
        this.addChild(this._bar, 0);

        this._txtCurrent.attr({
            anchorX: 1,
            anchorY: 0.5,
            x: this.width - this._icon.width - 20,
            y: 0,
            scale: 0.8
        });
        this.addChild(this._txtCurrent, 1)

        this._txtMax.attr({
            anchorX: 0,
            anchorY: 0,
            x: - this._icon.width - this._bar.width - 10,
            y: this._bar.height - 10,
            scale: 0.6
        })
        this.addChild(this._txtMax, 1);

        if (type == 4)
        {
            this._txtMax.visible = false;
            this._bar.visible = false;
        }

        this.updateStatus();
    },

    updateStatus: function()
    {
        if(this._type != 4)
        {
            this._bar.setTextureRect(cc.rect(0, 0, this._bar.width * this._currentCapacity / this._maxCapacity, this._bar.height));
            this._txtMax.setString("Max: " + this._maxCapacity);
        }
        this._txtCurrent.setString(this._currentCapacity + "");
    }
})