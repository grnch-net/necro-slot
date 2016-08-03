let bonuses = (function () {

    let currentLevel = 1;

    function initBonusLevel() {
        let stage = canvas.getStages().bonusStage;
        stage.nextStage = null;
        console.log('I am here!');
        stage.alpha = 1;
        let loader = preloader.getLoadResult();
        let initContainer = new createjs.Container().set({
            name: 'initContainer',
            alpha: 0
        });
        let initBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'initBG'
        });
        let initText = new createjs.Text('You are starting Bonus Level!!!', '80px bold Arial', '#fff').set({
            name: 'initText',
            x: 1280 / 2,
            y: 720 / 2,
            textAlign: 'center',
            textBaseline: 'middle'
        });
        createjs.Tween.get(initContainer)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    currentLevel = 1;
                    getBonusLevel();
                }
            );
        initBG.on('click', function () {
            createjs.Tween.get(initContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeChild(initContainer);
                });
        });
        initContainer.addChild(initBG, initText);
        stage.addChild(initContainer);
    }

    function drawBonusLevel(level, data) {
        console.log('I am drawing level', level, 'with data:', data);
        let clickCounter = 0;
        let stage = canvas.getStages().bonusStage;
        if (stage.getChildByName('bonusContainer')) {
            stage.removeChild(stage.getChildByName('bonusContainer'));
            stage.removeChild(stage.getChildByName('winText'));
        }
        let loader = preloader.getLoadResult();
        let bonusContainer = new createjs.Container().set({
            name: 'bonusContainer'
        });
        let bonusBG = new createjs.Bitmap(loader.getResult('bonusBG_' + level)).set({
            name: 'bonusBG'
        });
        if (data.BonusEnd) {
            var bonusWall = new createjs.Bitmap(loader.getResult('bonusFail_' + level)).set({
                name: 'bonusWall'
            });
        } else {
            var bonusWall = new createjs.Bitmap(loader.getResult('bonusWin_' + level)).set({
                name: 'bonusWall'
            });
        }
        let doorsContainer = new createjs.Container().set({
            name: 'doorsContainer'
        });
        if (level === 1) {
            let door_1 = new createjs.Bitmap(loader.getResult('bonusDoor_1_1'));
            let door_2 = new createjs.Bitmap(loader.getResult('bonusDoor_1_2'));
            let door_3 = new createjs.Bitmap(loader.getResult('bonusDoor_1_3'));
            let door_4 = new createjs.Bitmap(loader.getResult('bonusDoor_1_4'));
            let door_5 = new createjs.Bitmap(loader.getResult('bonusDoor_1_5'));
            let darkness = new createjs.Shape();
            darkness.graphics.beginFill('#000').drawRect(0, 0, 140, 400);
            door_1.set({
                x: 270,
                y: 225
            });
            let darkness_1 = darkness.clone().set({
                x: 270,
                y: 225
            });
            door_2.set({
                x: 425,
                y: 240
            });
            let darkness_2 = darkness.clone().set({
                x: 425,
                y: 240
            });
            door_3.set({
                x: 565,
                y: 260
            });
            let darkness_3 = darkness.clone().set({
                x: 565,
                y: 260
            });
            door_4.set({
                x: 715,
                y: 240
            });
            let darkness_4 = darkness.clone().set({
                x: 715,
                y: 240
            });
            door_5.set({
                x: 870,
                y: 225
            });
            let darkness_5 = darkness.clone().set({
                x: 870,
                y: 225
            });

            function setClickEvent(door, darkness) {
                door.on('click', function () {
                    if (clickCounter < 1) {
                        clickCounter++;
                        createjs.Tween.get(door)
                        .to({y: door.y - 250}, 400);
                        createjs.Tween.get(darkness)
                        .to({alpha: 0}, 500)
                        .call(
                            function () {
                                if (data.CurrentValue !== 'Exit') {
                                    showBonusWin(data.CurrentValue);
                                } else {
                                    setTimeout(function () {
                                        events.trigger('finishBonusLevel')
                                    }, 750)
                                }
                            }
                        );
                    }
                })
            }

            setClickEvent(door_1, darkness_1);
            setClickEvent(door_2, darkness_2);
            setClickEvent(door_3, darkness_3);
            setClickEvent(door_4, darkness_4);
            setClickEvent(door_5, darkness_5);
            doorsContainer.addChild(darkness_1, door_1, darkness_2, door_2, darkness_3, door_3, darkness_4, door_4, darkness_5, door_5);
        } else if (level === 2) {
            let doorSprite = new createjs.Sprite(loader.getResult('doorSprite_' + level));
            console.log('Doors Sprite is:', loader.getResult('doorSprite_' + level));
            let door_1 = doorSprite.clone().set({
                x: 270,
                y: 225
            });
            door_1.gotoAndStop('door_1');
            let door_2 = doorSprite.clone().set({
                x: 425,
                y: 240
            });
            door_2.gotoAndStop('door_2');
            let door_3 = doorSprite.clone().set({
                x: 565,
                y: 260
            });
            door_3.gotoAndStop('door_3');
            let door_4 = doorSprite.clone().set({
                x: 715,
                y: 240
            });
            door_4.gotoAndStop('door_4');
            let door_5 = doorSprite.clone().set({
                x: 870,
                y: 225
            });
            door_5.gotoAndStop('door_5');

            doorSpriteClick(door_1);
            doorSpriteClick(door_2);
            doorSpriteClick(door_3);
            doorSpriteClick(door_4);
            doorSpriteClick(door_5);

            function doorSpriteClick(door) {
                door.on('click', function () {
                    door.play();
                    door.on('animationend', function functionName() {
                        door.stop();
                    });
                });
            }

            let doorsContainer = new createjs.Container();
            doorsContainer.addChild(door_1, door_2, door_3, door_4, door_5);

        }
        bonusContainer.addChild(bonusWall, doorsContainer, bonusBG);
        stage.addChildAt(bonusContainer, 0);
    }

    function showBonusWin(win) {
        console.log('I must show win:', win);
        let stage = canvas.getStages().bonusStage;
        let winText = new createjs.Text(win, '175px bold Arial', '#fff').set({
            name: 'winText',
            x: 1280 / 2,
            y: 760 / 2,
            textAlign: 'center',
            textBaseline: 'middle',
            scaleX: 0.1,
            scaleY: 0.1
        });
        stage.addChild(winText);
        createjs.Tween.get(winText)
        .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.bounceOut)
        .call(
            setTimeout(function () {
                callNextBonusLevel();
            }, 2500)
        );
    }

    function finishBonusLevel() {
        let stage = canvas.getStages().bonusStage;
        stage.removeAllChildren();
        stage.nextStage = canvas.getStages().gameStage;
        readyAfterBonus();
    }

    function callNextBonusLevel() {
        console.log('I am calling next Level');
        readyAfterBonus();
        let stage = canvas.getStages().bonusStage;
        let darkness = new createjs.Shape();
        darkness.graphics.beginFill('#000').drawRect(0, 0, 1280, 720);
        darkness.alpha = 0;
        stage.addChild(darkness);
        createjs.Tween.get(darkness)
        .to({alpha: 1}, 500)
        .wait(500)
        .call(function () {
            currentLevel++;
            getBonusLevel();
        })
        .to({alpha: 0}, 500)
        .call(function () {
            stage.removeChild(darkness);
        });
    }

    function getBonusLevel() {
        let sessionID = login.getSessionID();
        utils.request('_Roll/', `${sessionID}/1/1`)
        .then((data) => {
            drawBonusLevel(currentLevel, data)
            console.log('This is bonus data:', data);
        });
    }

    function readyAfterBonus() {
        let sessionID = login.getSessionID();
        utils.request('_Ready/', `${sessionID}`).then((data) => {
            console.log('ready data:', data);
        });
    }

    events.on('initBonusLevel', initBonusLevel);
    events.on('drawBonusLevel', drawBonusLevel);
    events.on('finishBonusLevel', finishBonusLevel);

    return {
        getBonusLevel,
        readyAfterBonus
    };
})();
