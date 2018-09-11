var Builder = cc.Node.extend
(
    {
        builderHut: null,
        target: null,
        position: null,
        shadow: null,
        targetBuilding: null,
        unit: null,
        onWorking: false,
        targetLogicPoint: null,
        targetLogicPointList: null,
        freeMoveMode: true,
        targetCenterPoint: null,
        targetLogicPointStep: null,
        ctor: function (builderHutIndex)
        {
            this._super();
            cc.log(builderHutIndex);
            this.builderHut = cf.user._buildingList[gv.orderInUserBuildingList.builderHut][builderHutIndex];
            cc.log(this.builderHut._id + " ++++");
            this.init();
        },
        init: function ()
        {
            this.setPositionByBuilderHut();
            this.loadPlist();
            this.makeUnit();
        },
        loadPlist: function ()
        {
            if (!gv.plist.builder)
                fn.loadBuilderPlist();
        },
        makeUnit: function ()
        {
            this.shadow = new cc.Sprite("res/Art/Map/map_obj_bg/small_shadow_troop.png");
            this.shadow.setScale(1.5);
            this.unit = new cc.Sprite();
            this.addChild(this.shadow, 1);
            this.addChild(this.unit, 2);
            this.setPosition(this.position.toTruePoint());
            this.facingDirection = new LogicDirection(0);
            this.visible = false;
            this.builderHut.getParent().addChild(this);
        },
        setPositionByBuilderHut: function ()
        {
            this.position = new LogicPoint(this.builderHut._row + 1, this.builderHut._col + 1);
        },
        getTargetLogicPointList: function ()
        {
            this.targetLogicPointList = [];
            let row = this.targetBuilding._row;
            let column = this.targetBuilding._col;
            let size = this.targetBuilding._size;
            this.targetLogicPointList.push(new LogicPoint(row, column));
            this.targetLogicPointList.push(new LogicPoint(row + size, column + size));
            this.targetLogicPointList.push(new LogicPoint(row + size, column));
            this.targetLogicPointList.push(new LogicPoint(row, column + size));
            for (let i = 1; i < size; i += 1)
            {
                this.targetLogicPointList.push(new LogicPoint(row + i, column));
                this.targetLogicPointList.push(new LogicPoint(row + i, column + size));
                this.targetLogicPointList.push(new LogicPoint(row, column + i));
                this.targetLogicPointList.push(new LogicPoint(row + size, column + i));
            }
            this.targetCenterPoint = new LogicPoint(row + size / 2, column + size / 2);
        },
        setRandomTargetLogicPosition: function ()
        {
            this.targetLogicPoint = this.targetLogicPointList[Math.floor(Math.random() * this.targetLogicPointList.length)];
        },
        startWork: function (targetBuilding)
        {
            this.visualizeOnMove();
            this.visible = true;
            this.onWorking = true;
            this.targetBuilding = targetBuilding;
            this.getTargetLogicPointList();
            this.setRandomTargetLogicPosition();
            this.move();
        },
        finishWork:function()
        {
            this.targetLogicPoint = new LogicPoint(this.builderHut._row + 1, this.builderHut._col + 1);
            this.onWorking = false;
            this.move();
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
            this.startWork(this.targetBuilding);
        },
        visualizeWorking: function ()
        {
            this.onWorking = false;
            do
            {
                this.facingDirection = new LogicDirection(Math.floor(Math.random() * 8));
            }
            while (this.facingDirection.differenceFrom(this.position.getDirectionTo(this.targetCenterPoint)) > 1);
            var framesCount = gv.json.builder["frCounts"][2];
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
                        var digits;
                        if (number < 10)
                            digits = "000" + number;
                        else
                            digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame("attack01/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
                    break;
                default:
                    this.setScaleX(1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = (8 - directionType) * framesCount + i;
                        var digits;
                        if (number < 10)
                            digits = "000" + number;
                        else
                            digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame("attack01/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
            }
            var animation = new cc.Animation(animationFrames, 0.1);
            this.unit.runAction(cc.animate(animation).repeatForever());
        },
        move: function ()
        {
            if (this.position.isEqualTo(this.targetLogicPoint))
            {
                if (this.onWorking)
                {
                    this.onWorking = false;
                    this.visualizeWorking();
                    this.delayRandomMove();
                }
                else
                {
                    this.stopAllActions();
                    this.unit.stopAllActions();
                    this.visible = false;
                }
                return;
            }
            if (this.freeMoveMode)
                this.tryFreeMove();
            else
                this.tryBlockMove();
        },
        tryFreeMove: function ()
        {
            this.bestDirection = this.position.getDirectionTo(this.targetLogicPoint);
            if (this.canMove(this.bestDirection))
            {
                this.step(this.bestDirection);
                return;
            }
            if (this.canMove(this.facingDirection) && this.facingDirection.differenceFrom(this.bestDirection) == 1)
            {
                this.step(this.facingDirection);
                return;
            }
            if ((this.canMove(this.bestDirection.turnedClockwise(1)) && this.canMove(this.bestDirection.turnedClockwise(
                -1))))
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
            if (this.facingDirection.differenceFrom(this.bestDirection) == 2)
            {
                this.step(this.facingDirection);
                return;
            }
            if (this.facingDirection.differenceFrom(this.bestDirection) == 0)
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
                new LogicPoint(
                    this.position.logicRow + direction.logicDown,
                    this.position.logicColumn + direction.logicRight
                );
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
        visualizeOnMove: function ()
        {
            var framesCount = gv.json.builder["frCounts"][1];
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
                        var digits;
                        if (number < 10)
                            digits = "000" + number;
                        else
                            digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame("run/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
                    break;
                default:
                    this.setScaleX(1);
                    for (var i = 0; i < framesCount; i += 1)
                    {
                        var number = (8 - directionType) * framesCount + i;
                        var digits;
                        if (number < 10)
                            digits = "000" + number;
                        else
                            digits = "00" + number;
                        var frame = cc.spriteFrameCache.getSpriteFrame("run/image" + digits + ".png");
                        animationFrames.push(frame);
                    }
            }
            var animation = new cc.Animation(animationFrames, 0.1);
            this.unit.runAction(cc.animate(animation).repeatForever());
        },
        visualizeMoveAction: function ()
        {
            var actionMove = cc.MoveTo(cc.pDistance(this.position.toTruePoint(), this.targetLogicPointStep.toTruePoint())
                                       / 50, this.targetLogicPointStep.toTruePoint());
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
        canMove: function (direction)
        {
            switch (direction.getDirectionType())
            {
                case 7:
                    if (this.getNumberAt(this.position) != this.getNumberUp(this.position))
                        return true;
                    return [0, this.builderHut._id].indexOf(this.getNumberAt(this.position)) >= 0;
                case 3:
                    if (this.getNumberLeft(this.position) != this.getNumberLeftUp(this.position))
                        return true;
                    return [0, this.builderHut._id].indexOf(this.getNumberLeft(this.position)) >= 0;
                case 1:
                    if (this.getNumberAt(this.position) != this.getNumberLeft(this.position))
                        return true;
                    return [0, this.builderHut._id].indexOf(this.getNumberAt(this.position)) >= 0;
                case 5:
                    if (this.getNumberUp(this.position) != this.getNumberLeftUp(this.position))
                        return true;
                    return [0, this.builderHut._id].indexOf(this.getNumberUp(this.position)) >= 0;
                case 0:
                    return [0, this.builderHut._id].indexOf(this.getNumberAt(this.position)) >= 0;
                case 2:
                    return [0, this.builderHut._id].indexOf(this.getNumberLeft(this.position)) >= 0;
                case 6:
                    return [0, this.builderHut._id].indexOf(this.getNumberUp(this.position)) >= 0;
            }
            return [0, this.builderHut._id].indexOf(this.getNumberLeftUp(this.position)) >= 0;
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
            return cf.map_array[row][column];
        },
    }
)