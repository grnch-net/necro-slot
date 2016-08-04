let bonuses = (function () {

    let currentLevel = 1;

    function initBonusLevel() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        stage.nextStage = null;
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
        let loader = preloader.getLoadResult();
        if (stage.getChildByName('bonusContainer')) {
            stage.removeChild(stage.getChildByName('bonusContainer'));
            stage.removeChild(stage.getChildByName('winText'));
        }
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
                x: 274,
                y: 222
            });
            let darkness_1 = darkness.clone().set({
                x: door_1.x,
                y: door_1.y
            });
            door_2.set({
                x: 425,
                y: 236
            });
            let darkness_2 = darkness.clone().set({
                x: door_2.x,
                y: door_2.y
            });
            door_3.set({
                x: 568,
                y: 237
            });
            let darkness_3 = darkness.clone().set({
                x: door_3.x,
                y: door_3.y
            });
            door_4.set({
                x: 718,
                y: 238
            });
            let darkness_4 = darkness.clone().set({
                x: door_4.x,
                y: door_4.y
            });
            door_5.set({
                x: 864,
                y: 220
            });
            let darkness_5 = darkness.clone().set({
                x: door_5.x,
                y: door_5.y
            });

            function setClickEvent(door, darkness) {
                door.on('click', function () {
                    if (clickCounter < 1) {
                        clickCounter++;
                        createjs.Tween.get(door)
                        .to({y: door.y - 250}, 400);
                        createjs.Tween.get(darkness)
                        .to({alpha: 0}, 500);
                        if (data.CurrentValue !== 'Exit') {
                            showBonusWin(data.CurrentValue);
                        } else {
                            setTimeout(function () {
                                events.trigger('finishBonusLevel')
                            }, 750)
                        }
                    }
                })
            }

            setClickEvent(door_1, darkness_1);
            setClickEvent(door_2, darkness_2);
            setClickEvent(door_3, darkness_3);
            setClickEvent(door_4, darkness_4);
            setClickEvent(door_5, darkness_5);
            doorsContainer.addChild(darkness_1, door_1, darkness_2, door_2, darkness_3, door_3, darkness_4, door_4, darkness_5, door_5);

        } else if (level === 2 || level === 3 || level === 4) {

            let ss = loader.getResult('doorSprite_' + level);
            let door_1 = new createjs.Sprite(ss, 'door_1').set({
                x: 270,
                y: 227
            });
            let door_2 = new createjs.Sprite(ss, 'door_2').set({
                x: 422,
                y: 237,
                scaleX: 0.96,
                scaleY: 0.94
            });
            let door_3 = new createjs.Sprite(ss, 'door_3').set({
                x: 572,
                y: 238,
                scaleX: 0.93,
                scaleY: 0.93
            });
            let door_4 = new createjs.Sprite(ss, 'door_4').set({
                x: 716,
                y: 232,
                scaleX: 0.98,
                scaleY: 0.96
            });
            let door_5 = new createjs.Sprite(ss, 'door_5').set({
                x: 858,
                y: 217,
                scaleX: 1.02,
                scaleY: 1.05
            });

            door_1.stop();
            door_2.stop();
            door_3.stop();
            door_4.stop();
            door_5.stop();

            doorSpriteClick(door_1);
            doorSpriteClick(door_2);
            doorSpriteClick(door_3);
            doorSpriteClick(door_4);
            doorSpriteClick(door_5);

            function doorSpriteClick(door) {
                door.on('click', function () {
                    if (clickCounter < 1) {
                        clickCounter++;
                        door.play();
                        if (data.CurrentValue !== 'Exit') {
                            showBonusWin(data.CurrentValue);
                        } else {
                            setTimeout(function () {
                                events.trigger('finishBonusLevel')
                            }, 750)
                        }
                        door.on('animationend', function functionName() {
                            door.stop();
                        });
                    }
                });
            }

            doorsContainer.removeAllChildren();
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
            }, 1000)
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
        .call(function () {
            currentLevel++;
            getBonusLevel();
        })
        .wait(500)
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
