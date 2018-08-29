const LogicDirection = cc.Class.extend
(
    {
        ctor: function (logicDirectionType)
        {
            logicDirectionType %= 8;
            if (logicDirectionType < 0)
                logicDirectionType += 8;
            if (logicDirectionType < gv.direction.left)
                this.logicDown = 1;
            else
                if (logicDirectionType === gv.direction.left || logicDirectionType === gv.direction.right)
                    this.logicDown = 0;
                else
                    this.logicDown = -1;
            if (logicDirectionType === gv.direction.down_right || logicDirectionType === gv.direction.up_right || logicDirectionType
                === gv.direction.right)
                this.logicRight = 1;
            else
                if (logicDirectionType === gv.direction.down || logicDirectionType === gv.direction.up)
                    this.logicRight = 0;
                else
                    this.logicRight = -1;
        }
        ,
        differenceFrom: function (inputDirection)
        {
            if (this.logicDown === inputDirection.logicDown && this.logicRight === inputDirection.logicRight)
                return 0;
            if (this.logicDown === -inputDirection.logicDown && this.logicRight === -inputDirection.logicRight)
                return 4;
            if (this.logicDown === inputDirection.logicRight && this.logicRight === -inputDirection.logicDown)
                return 2;
            if (this.logicDown === -inputDirection.logicRight && this.logicRight === inputDirection.logicDown)
                return 2;
            if (this.logicDown * inputDirection.logicDown === 1)
                return 1;
            if (this.logicRight * inputDirection.logicRight === 1)
                return 1;
            return 3;
        }
        ,
        getDirectionType: function ()
        {
            if (this.logicDown === 1)
                switch (this.logicRight)
                {
                    case 1:
                        return gv.direction.down_right;
                    case 0:
                        return gv.direction.down;
                    case -1:
                        return gv.direction.down_left;
                }
            if (this.logicDown === -1)
                switch (this.logicRight)
                {
                    case 1:
                        return gv.direction.up_right;
                    case 0:
                        return gv.direction.up;
                    case -1:
                        return gv.direction.up_left;
                }
            if (this.logicRight === 1)
                return gv.direction.right;
            return gv.direction.left;
        }
        ,
        turnedClockwise: function (amount)
        {
            return new LogicDirection(this.getDirectionType() + amount);
        }
        ,
        getVectorLength: function ()
        {
            return Math.sqrt(this.logicRight * this.logicRight + this.logicDown * this.logicDown);
        }
    }
)