var LogicPoint = cc.Class.extend
(
    {
        ctor: function (logicRow, logicColumn)
        {
            if (logicRow < 1)
                logicRow = 1;
            else
                if (logicRow > 41)
                    logicRow = 41;
            if (logicColumn < 1)
                logicColumn = 1;
            else
                if (logicColumn > 41)
                    logicColumn = 41;
            this.logicRow = logicRow;
            this.logicColumn = logicColumn;
        },
        toTruePoint: function ()
        {
            if (this.logicRow > 40)
                var overloadRow = 40;
            else
                var overloadRow = this.logicRow;
            if (this.logicColumn > 40)
                var overloadColumn = 40;
            else
                var overloadColumn = this.logicColumn;
            var trueX = cf.tileLocation[overloadRow][overloadColumn].x;
            var trueY = cf.tileLocation[overloadRow][overloadColumn].y;
            if (this.logicRow > 40)
            {
                trueX += cf.tileSize.width / 2;
                trueY -= cf.tileSize.height / 2;
            }
            if (this.logicColumn > 40)
            {
                trueX -= cf.tileSize.width / 2;
                trueY -= cf.tileSize.height / 2;
            }
            return cc.p(trueX,
                        trueY);
        },
        isEqualTo: function (logicPoint)
        {
            return this.logicRow == logicPoint.logicRow && this.logicColumn == logicPoint.logicColumn;
        },
        movedByDirection: function (direction)
        {
            return new LogicPoint(this.logicRow + direction.logicDown, this.logicColumn + direction.logicRight);
        },
        getDirectionTo: function (endLogicPoint)
        {
            var downSide = 0;
            var rightSide = 0;
            if (endLogicPoint.logicRow != this.logicRow)
                downSide = (endLogicPoint.logicRow - this.logicRow) / Math.abs(endLogicPoint.logicRow - this.logicRow);
            if (endLogicPoint.logicColumn != this.logicColumn)
                rightSide = (endLogicPoint.logicColumn - this.logicColumn) / Math.abs(endLogicPoint.logicColumn - this.logicColumn);
            var output = new LogicDirection(0)
            output.logicDown = downSide;
            output.logicRight = rightSide;
            return output;
        }
    }
)