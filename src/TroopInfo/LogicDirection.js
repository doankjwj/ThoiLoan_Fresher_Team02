var LogicDirection = cc.Class.extend
(
    {
        ctor: function (logicDirectionType)
        {
            logicDirectionType %= 8;
            if (logicDirectionType < 0)
                logicDirectionType += 8;
            if (logicDirectionType < 3)
                this.logicDown = 1;
            else
                if (logicDirectionType == 3 || logicDirectionType == 7)
                    this.logicDown = 0;
                else
                    this.logicDown = -1;
            if (logicDirectionType == 0 || logicDirectionType == 6 || logicDirectionType == 7)
                this.logicRight = 1;
            else
                if (logicDirectionType == 1 || logicDirectionType == 5)
                    this.logicRight = 0;
                else
                    this.logicRight = -1;
        },
        differenceFrom: function (inputDirection)
        {
            if (this.logicDown == inputDirection.logicDown && this.logicRight == inputDirection.logicRight)
                return 0;
            if (this.logicDown == -inputDirection.logicDown && this.logicRight == -inputDirection.logicRight)
                return 4;
            if (this.logicDown == inputDirection.logicRight && this.logicRight == -inputDirection.logicDown)
                return 2;
            if (this.logicDown == -inputDirection.logicRight && this.logicRight == inputDirection.logicDown)
                return 2;
            if (this.logicDown * inputDirection.logicDown == 1)
                return 1;
            if (this.logicRight * inputDirection.logicRight == 1)
                return 1;
            return 3;
        },
        getDirectionType: function ()
        {
            if (this.logicDown == 1)
                switch (this.logicRight)
                {
                    case 1:
                        return 0;
                    case 0:
                        return 1;
                    case -1:
                        return 2;
                }
            if (this.logicDown == -1)
                switch (this.logicRight)
                {
                    case 1:
                        return 6;
                    case 0:
                        return 5;
                    case -1:
                        return 4;
                }
            if (this.logicRight == 1)
                return 7;
            return 3;
        },
        turnedClockwise: function (amount)
        {
            return new LogicDirection(this.getDirectionType() + amount);
        },
        getVectorLength:function()
        {
            return Math.sqrt(this.logicRight*this.logicRight + this.logicDown*this.logicDown);
        }
    }
)