/**
 * Created by CPU02326_Local on 7/26/2018.
 */
var BuilderBar = cc.Node.extend({
    _txtFree: null,
    _txtTotal: null,
    _bg: null,
    _icon: null,
    _title: null,
    _offSet: 50,

    _TAG_CURRENT: 3433,
    _TAG_TOTAL: 34345,

    ctor: function()
    {
        this._super();

        this._title = cc.LabelBMFont("Thợ xây", font.soji20);
        this._title.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: 01
        });
        this.addChild(this._title,1);

        this._txtFree = cc.LabelBMFont(cf.user._builderFree, font.soji20);
        this._txtFree.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: - this._offSet / 4,
            y: 0,
            scale: 0.9
        });
        this.addChild(this._txtFree, 1, this._TAG_CURRENT)

        this._txtTotal = cc.LabelBMFont(cf.user._builderTotal, font.soji20);
        this._txtTotal.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: this._offSet / 4,
            y: 0,
            scale: 0.9
        });
        this.addChild(this._txtTotal, 1, this._TAG_TOTAL);

        this._icon = cc.Sprite(mainGUI.builderIcon);
        this._icon.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this._title.x - this._title.width/2,
            y: this._txtTotal.y - this._txtTotal.height * this._txtTotal.scale / 2,
            scale: 1.3
        })
        this.addChild(this._icon, 1);

        var mid = cc.LabelBMFont("/", font.soji20);
        mid.setAnchorPoint(cc.p(0.5, 1));
        mid.setPosition(cc.p(0, this._txtTotal.y));
        mid.scale = this._txtTotal.scale;
        this.addChild(mid, 1);

        this._bg = cc.Sprite(mainGUI.bgBar1);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(0, this._icon.y));
        this._bg.scale = 1.4;
        this.addChild(this._bg, 0);

    },

    updateStatus: function()
    {
        var builderFree = cf.user._builderFree;
        var builderTotal = cf.user._builderTotal;

        this._txtFree.setString(builderFree);
        this._txtTotal.setString(builderTotal);
    }
})