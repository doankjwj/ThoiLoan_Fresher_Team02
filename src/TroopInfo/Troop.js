var Troop = cc.Node.extend
(
    {
        type: null,
        released: false,

        ctor:function(troopType, startRow, startColumn, armyCampId)
        {
            this._super();
            this.position = new LogicPoint(startRow, startColumn);
            this.targetLogicPointStep = this.position;
            this.facingDirection = new LogicDirection(0);
            this.logicMap = cf.map_array;
            this.type = troopType;
            this.armyCampId = armyCampId;
            this.freeMoveMode = true;
            this.init();
        },
        init:function ()
        {
            this.setLogicPosition(this.position);
            if (this.type === 3)
                this.shadow = new cc.Sprite("res/Art/Map/map_obj_bg/big_shadow_troop.png");
            else
                this.shadow = new cc.Sprite("res/Art/Map/map_obj_bg/small_shadow_troop.png");
            this.shadow.setScale(1.5);
            this.unit = new cc.Sprite();
            this.addChild(this.shadow, 1);
            this.addChild(this.unit, 2);
            this.isMoving = false;
            this.randomMoveArmyCamp();
        },
        getArmyCampPosition: function ()
        {
            for (var row = 1; row <= 40; row += 1)
                for (var column = 1; column <= 40; column += 1)
                    if (this.logicMap[row][column] === this.armyCampId)
                        return new LogicPoint(row, column);
        },
        setLogicPosition: function (logicPosition)
        {
            this.position = logicPosition;
            this.targetLogicPointStep = this.position.movedByDirection(this.facingDirection);
            var truePosition = this.position.toTruePoint();
            this.x = truePosition.x;
            this.y = truePosition.y;
        },
        randomMoveArmyCamp: function ()
        {
            if (gv.plist[this.getTroopNameWithLevel()] !== true)
                fn.loadPlist(this.getTroopNameWithLevel());
            this.isMoving = false;
            var armyCampLogicPosition = this.getArmyCampPosition();
            do
            {
                var offsetRow = Math.floor(Math.random() * 4) + 1;
                var offsetColumn = Math.floor(Math.random() * 4) + 1;
            }
            while ((offsetRow === offsetColumn && [2, 3].indexOf(offsetRow) >= 0) ||
                   (Math.abs(offsetRow - offsetColumn) === 1 && offsetRow + offsetColumn === 5));
            if (armyCampLogicPosition !== undefined)
                this.savedPosition = armyCampLogicPosition;
            this.targetLogicPoint = new LogicPoint(this.savedPosition.logicRow + offsetRow, this.savedPosition.logicColumn + offsetColumn);
            this.facingDirection = this.position.getDirectionTo(this.targetLogicPoint);
            try
            {
                this.stopAllActions();
                this.unit.stopAllActions();
            }
            catch (e)
            {
                this.visualizeOnIdle();
            }
            this.move();
        },
        freeToDonate: function (rơ, col)
        {
            this.targetLogicPoint = new LogicPoint(rơ, col);
            this.facingDirection = this.position.getDirectionTo(this.targetLogicPoint);
            try
            {
                this.stopAllActions();
                this.unit.stopAllActions();
            }
            catch (e)
            {
                this.visualizeOnIdle();
            }
            this.move();
        },
        move: function ()
        {
            if (this.position.isEqualTo(this.targetLogicPoint))
            {
                this.isMoving = false;
                this.visualizeOnIdle();
                this.delayRandomMove();
                return;
            }
            if (this.freeMoveMode)
                this.tryFreeMove();
            else
                this.tryBlockMove();
        },
        delayRandomMove: function ()
        {
            var self = this;
            var actionWait = cc.delayTime(5 + Math.random() * 5);
            var actionEnd = cc.callFunc(function ()
                                        {
                                            self.onEndWaiting()
                                        });
            this.runAction(cc.sequence(actionWait, actionEnd));
        },
        onEndWaiting: function ()
        {
            this.randomMoveArmyCamp();
        },
        tryFreeMove: function ()
        {
            this.bestDirection = this.position.getDirectionTo(this.targetLogicPoint);
            if (this.canMove(this.bestDirection))
            {
                this.step(this.bestDirection);
                return;
            }
            if (this.canMove(this.facingDirection) && this.facingDirection.differenceFrom(this.bestDirection) === 1)
            {
                this.step(this.facingDirection);
                return;
            }
            if ((this.canMove(this.bestDirection.turnedClockwise(1)) && this.canMove(this.bestDirection.turnedClockwise(-1))))
            {
                var randomResult = Math.random() * 2;
                if (randomResult < 2)
                {
                    this.step(this.bestDirection.turnedClockwise(1));
                }
                else
                {
                    this.step(this.bestDirection.turnedClockwise(-1));
                }
                return;
            }
            if (this.canMove(this.bestDirection.turnedClockwise(1)))
            {
                this.step(this.bestDirection.turnedClockwise(1));
                return;
            }
            if (this.canMove(this.bestDirection.turnedClockwise(-1)))
            {
                this.step(this.bestDirection.turnedClockwise(-1));
                return;
            }
            this.freeMoveMode = false;
            this.tryBlockMove();
        },
        tryBlockMove: function ()
        {
            if (this.canMove(this.bestDirection))
            {
                this.freeMoveMode = true;
                this.step(this.bestDirection);
                return;
            }
            if (this.facingDirection.differenceFrom(this.bestDirection) === 2)
            {
                this.step(this.facingDirection);
                return;
            }
            if (this.facingDirection.differenceFrom(this.bestDirection) === 0)
            {
                if (Math.random() * 2 < 1)
                    this.step(this.facingDirection.turnedClockwise(2));
                else
                    this.step(this.facingDirection.turnedClockwise(-2));
                return;
            }
            if (this.canMove(this.facingDirection.turnedClockwise(1)))
                this.step(this.facingDirection.turnedClockwise(1));
            else
                this.step(this.facingDirection.turnedClockwise(-1));
        },
        step: function (direction)
        {
            this.targetLogicPointStep =
                new LogicPoint(this.position.logicRow + direction.logicDown, this.position.logicColumn + direction.logicRight);
            this.stepToLogicPointStep();
        },
        stepToLogicPointStep: function ()
        {
            this.setLocalZOrder(this.position.logicRow + this.position.logicColumn);
            var moveDirection = this.position.getDirectionTo(this.targetLogicPointStep);
            if (this.facingDirection.differenceFrom(moveDirection) !== 0 || !this.isMoving)
            {
                this.facingDirection = moveDirection;
                this.isMoving = true;
                this.visualizeOnMove();
            }
            this.visualizeMoveAction();
        },
        isInsideArmyCamp: function ()
        {
            return this.getNumberAt(this.position) === this.armyCampId;
        },
        visualizeMoveAction: function ()
        {
            var targetTruePointStep = this.targetLogicPointStep.toTruePoint();
            if (this.isInsideArmyCamp())
            {
                targetTruePointStep.x += cf.tileSize.width* (1 - Math.random()*2) / 2;
                targetTruePointStep.y += cf.tileSize.height* (1 - Math.random()*2) / 2;
            }
            var actionMove = cc.MoveTo(cc.pDistance(this.position.toTruePoint(), targetTruePointStep) / gv.json.troopBase[this.getTroopName()]["moveSpeed"] / 3, targetTruePointStep);
            var self = this;
            var actionEnd = cc.callFunc(function ()
                                        {
                                            self.onEndStep()
                                        });
            this.runAction(cc.sequence(actionMove, actionEnd));
        },
        onEndStep: function ()
        {
            this.position = this.targetLogicPointStep;
            this.move();
        },
        getNumberAt: function (target)
        {
            return this.getNumber(target.logicRow, target.logicColumn);
        },
        getNumberLeft: function (target)
        {
            return this.getNumber(target.logicRow, target.logicColumn - 1);
        },
        getNumberUp: function (target)
        {
            return this.getNumber(target.logicRow - 1, target.logicColumn);
        },
        getNumberLeftUp: function (target)
        {
            return this.getNumber(target.logicRow - 1, target.logicColumn - 1);
        },
        getNumber: function (row, column)
        {
            if (row > 40 || column > 40)
                return 0;
            return this.logicMap[row][column];
        },
        canMove: function (direction)
        {
            switch (direction.getDirectionType())
            {
                case 7:
                    if (this.getNumberAt(this.position) !== this.getNumberUp(this.position))
                        return true;
                    return [0, this.armyCampId].indexOf(this.getNumberAt(this.position)) >= 0;
                case 3:
                    if (this.getNumberLeft(this.position) !== this.getNumberLeftUp(this.position))
                        return true;
                    return [0, this.armyCampId].indexOf(this.getNumberLeft(this.position)) >= 0;
                case 1:
                    if (this.getNumberAt(this.position) !== this.getNumberLeft(this.position))
                        return true;
                    return [0, this.armyCampId].indexOf(this.getNumberAt(this.position)) >= 0;
                case 5:
                    if (this.getNumberUp(this.position) !== this.getNumberLeftUp(this.position))
                        return true;
                    return [0, this.armyCampId].indexOf(this.getNumberUp(this.position)) >= 0;
                case 0:
                    return [0, this.armyCampId].indexOf(this.getNumberAt(this.position)) >= 0;
                case 2:
                    return [0, this.armyCampId].indexOf(this.getNumberLeft(this.position)) >= 0;
                case 6:
                    return [0, this.armyCampId].indexOf(this.getNumberUp(this.position)) >= 0;
            }
            return [0, this.armyCampId].indexOf(this.getNumberLeftUp(this.position)) >= 0;
        },
        getTroopName: function ()
        {
            if (this.type >= 12)
                return "DAR_" + (this.type - 12 + 1);
            else
                return "ARM_" + (this.type + 1);
        },
        getTroopNameWithLevel: function ()
        {
            return this.getTroopName() + "_" + cf.user._listTroopLevel[this.type];
        },
        visualizeOnIdle: function ()
        {
            this.setLocalZOrder(this.position.logicRow + this.position.logicColumn);
            this.stopAllActions();
            this.unit.stopAllActions();
            var directionType = this.facingDirection.getDirectionType();
            var framesCount = gv.json.troopAnimation[this.getTroopNameWithLevel()]["frCounts"][0];
            var animationFrames = [];
            switch (directionType)
            {
                case 0:
                case 1:
                case 2:
                case 3:
                    this.setScaleX(-1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = directionType * framesCount + i;
                        if (number < 10)
                            var digits = "000" + number;
                        else
                            var digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame(this.getTroopNameWithLevel() + "/idle/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
                    break;
                default:
                    this.setScaleX(1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = (8 - directionType) * framesCount + i;
                        if (number < 10)
                            var digits = "000" + number;
                        else
                            var digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame(this.getTroopNameWithLevel() + "/idle/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
            }
            var animation = new cc.Animation(animationFrames, 0.2);
            this.unit.runAction(cc.animate(animation).repeatForever());
        },
        visualizeOnMove: function ()
        {
            var framesCount = gv.json.troopAnimation[this.getTroopNameWithLevel()]["frCounts"][1];
            this.stopAllActions();
            this.unit.stopAllActions();
            var directionType = this.facingDirection.getDirectionType();
            var animationFrames = [];
            switch (directionType)
            {
                case 0:
                case 1:
                case 2:
                case 3:
                    this.setScaleX(-1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = directionType * framesCount + i;
                        if (number < 10)
                            var digits = "000" + number;
                        else
                            var digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame(this.getTroopNameWithLevel() + "/run/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
                    break;
                default:
                    this.setScaleX(1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = (8 - directionType) * framesCount + i;
                        if (number < 10)
                            var digits = "000" + number;
                        else
                            var digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame(this.getTroopNameWithLevel() + "/run/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
            }
            var animation = new cc.Animation(animationFrames, 0.1);
            this.unit.runAction(cc.animate(animation).repeatForever());
        }
    }
);