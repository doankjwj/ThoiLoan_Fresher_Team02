/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var Obstacle = BuildingNode.extend({
    _isCleaning: false,
    _timeRemaining: null,
    _timeRequire: null,
    _timeFinish: null,

    ctor: function(id, type, row, col, existed, isActive)
    {
        this._buildingSTR = gv.buildingSTR.obstacle;
        this._size = gv.json.obstacle[type][1]["width"];
        this._orderInUserBuildingList = gv.orderInUserBuildingList.obstacle;
        this._name = gv.buildingName.obstacle;

        this._level = type;
        this._super(id, type, row, col, existed, isActive);
        this._grassShadow.visible = false;
        this._txtName.visible = false;
        this.addCenterBuilding();
    },

    onStartRemove: function(constructionType)
    {
        this._isCleaning = true;
        this.initTimeGUI();
        this._timeRequire = this.getTimeRequire();
        if (constructionType == gv.startConstructType.newConstruct)
        {
            //cf.user._builderFree --;
            this._timeFinish = new Date().getTime() + this._timeRequire;
            testnetwork.connector.sendRemoveObstacle(this._id);
        }

        cf.user.updateBuilder();

        //cf.user.updateSingleBuilder();
        this.updateResource();

        this.schedule(this.onUpdateStatus, 1);
    },
    updateResource: function()
    {
        this._cost.gold = fr.getCurrentScreen()._guibuttonRemove._cost.gold;
        this._cost.elixir = fr.getCurrentScreen()._guibuttonRemove._cost.elixir;

        cf.user._currentCapacityGold -= this._cost.gold;
        cf.user._currentCapacityElixir -= this._cost.elixir;

        if (this._cost.gold != 0)
            cf.user.distributeResource(true, false, false);
        else
            cf.user.distributeResource(false, true, false);
    },

    initTimeGUI: function()
    {
        /* Time Bar */
        this._info_bar = cc.Sprite(res.upgradeBuildingGUI.infoBar, cc.rect(0,0, 0, this._BAR_HEIGHT));
        this._info_bar.scale = 0.5 * cf.SCALE;
        this._info_bar.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar.scale,
            y: cf.tileSize.height * cf.SCALE * 2,
            rect: cc.rect(0, 0, 311, 36),
        });
        this.addChild(this._info_bar, 2);
        this._info_bar_bg = cc.Sprite(res.upgradeBuildingGUI.infoBarBG, cc.rect(0,0, this._BAR_WIDTH, this._BAR_HEIGHT));
        this._info_bar_bg.scale = 0.5 * cf.SCALE;
        this._info_bar_bg.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar_bg.scale,
            y: cf.tileSize.height * cf.SCALE * 2
        });
        this.addChild(this._info_bar_bg, 1);

        ///* Time Text */
        var seconds = this._time_total;
        var days = Math.floor(seconds / (3600*24));
        seconds  -= days*3600*24;
        var hrs   = Math.floor(seconds / 3600);
        seconds  -= hrs*3600;
        var mnts = Math.floor(seconds/ 60);
        seconds  -= mnts*60;
        var timeRemaining = (days !== 0 ? (days.toString() + "d") : "" ) + (hrs !== 0 ? (hrs.toString() + "h") : "") + (mnts !== 0 ? (mnts.toString() + "m") : "") + seconds.toString() + "s";

        this._labelTimeRemaining = cc.LabelBMFont.create(Math.floor(this.getTimeRequire()/1000) + "",  font.soji20);
        this._labelTimeRemaining.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: cf.tileSize.height * cf.SCALE * 2,
        });
        this.addChild(this._labelTimeRemaining, 2);

        /* Update Builder */

    },
    getTimeRequire: function()
    {
        return gv.json.obstacle[this._level]["1"]["buildTime"] * 1000;
    },

    onUpdateStatus: function()
    {
        if (!this._isCleaning) return;
        this._timeRemaining  = this._timeFinish - new Date().getTime();

        if (this._timeRemaining < 0)
        {
            this._isCleaning = false;
            this.onCompleteRemove();
            return;
        }
        this._labelTimeRemaining.setString(cf.secondsToLongTime(Math.floor(this._timeRemaining/1000)));
        this._info_bar.setTextureRect(cc.rect(0, 0, (this._timeRequire - this._timeRemaining)/this._timeRequire * 311, 36 ));

    },
    onCompleteRemove: function()
    {
        //cf.user._builderFree ++;
        this.unlocate_map_array(this._row, this._col, this._size);
        cf.user.updateBuilder();
        this.getParent().removeChild(this);
    }
});