/**
 * Created by CPU02326_Local on 7/31/2018.
 */
var fn = fn || {};

fn.getRowColFromPos = function(pos)
{
    //cc.log(pos.x + " Click " + pos.y)
    var loc = cc.p(0, 0);
    //var x = pos.x - cf.tileLocation[1][1].x * cf.BIG_MAP_SCALE;
    //var y = - pos.y + (cf.tileLocation[1][1].y * cf.BIG_MAP_SCALE + cf.tileSize.height / 2 * cf.BIG_MAP_SCALE);
    //
    //var pX = Math.floor(Math.abs(x / cf.tileSize.width / cf.BIG_MAP_SCALE * 2) + 1);
    //pX = (x > 0) ? pX : -pX;
    //cc.log("X: " + pX);
    //
    //var pY = Math.floor(Math.abs(y / (cf.tileSize.height * cf.BIG_MAP_SCALE / 2)));
    //cc.log("Y: " + pY);
    //
    //loc.x = (parseInt((-y / cf.tileSize.height * 2).toFixed(0)) + parseInt((x /cf.tileSize.width *2 ).toFixed(0)));
    //loc.y = (parseInt((-y / cf.tileSize.height * 2).toFixed(0)) - parseInt((x /cf.tileSize.width *2 ).toFixed(0)));
    ////loc.y = (parseInt((-y / cf.tileSize.height * 2- x /cf.tileSize.width * 2).toFixed(0)));
    //loc.x ++;
    //loc.y ++;

    var xx = pos.x - cf.tileLocation[40][40].x/2;
    var yy = pos.y - cf.tileLocation[40][40].y/2 + 0.25* cf.tileSize.height;
    var TILE_HEIGHT = cf.tileSize.height/2;
    var TILE_WIDTH = cf.tileSize.width/2;
    loc.x = parseInt(((yy / (TILE_HEIGHT/2) - xx / (TILE_WIDTH/2))/2).toFixed(0)) + 1;
    loc.y = parseInt(((xx / (TILE_WIDTH/2) + yy / (TILE_HEIGHT/2))/2).toFixed(0)) + 1;

    if (!fn.insideMap(loc.x, loc.y))
        return (cc.p(gv.buildingMove.row, gv.buildingMove.col));
    return (cc.p(41 - loc.x, 41 - loc.y));
    //cc.log(loc.x + " " + loc.y);
    /* Boundary */
    loc.x = (loc.x > 40) ? 40 : loc.x;
    loc.x = (loc.x < 1) ? 1 : loc.x;
    loc.y = (loc.y > 40) ? 40 : loc.y;
    loc.y = (loc.y < 1) ? 1 : loc.y;

    //cc.log(loc.x + " " + loc.y);
    return loc;
};

fn.insideMap = function(row, col)
{
    return (0<row && row<41 && 0<col && col<41);
}