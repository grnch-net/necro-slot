/* eslint-disable */
let bonuses = (function () {

    let currentLevel = 1;
    let bonusData;
    const c = createjs;
    function initBonusLevel() {
        const loader = storage.read('loadResult');
        const stage = storage.read('stage');
        let initContainer = new c.Container().set({
            name: 'initContainer',
            alpha: 0
        });
        let initBG = new c.Bitmap(loader.getResult('multiBG')).set({
            name: 'initBG'
        });
        let initText = new c.Text('You starting Bonus Level!!!', '80px bold Arial', '#fff').set({
            name: 'initText',
            x: 1280 / 2,
            y: 720 / 2,
            textAlign: 'center',
            textBaseline: 'middle'
        });

        c.Tween.get(initContainer)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    currentLevel = 1;
                    win.cleanWin();
                    getBonusLevel();
                }
            );
        initContainer.on('click', function () {
            c.Tween.get(initContainer)
                .to({alpha: 0}, 300)
                .call(function () {
                    stage.removeChild(initContainer);
                });
        });
        initContainer.addChild(initBG, initText);

        stage.addChild(initContainer);
    }

    function drawBonusLevel(level, data) {
        let clickCounter = 0;
        const loader = storage.read('loadResult');
        const stage = storage.read('stage');
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
            bonusContainer.addChild(bonusWall, doorsContainer, bonusBG);

        } else if (level === 2 || level === 3 || level === 4) {
            console.log('Я пытаюсь нарисовать второй уровень!', bonusBG);

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
            bonusContainer.addChild(bonusWall, doorsContainer, bonusBG);
            stage.addChild(bonusContainer);

        } else if ( level === 5 ) {
            let ss1 = loader.getResult('doorSprite_5_1');
            let ss3 = loader.getResult('doorSprite_5_3');
            let ss5 = loader.getResult('doorSprite_5_5');
            let door_1 = new createjs.Sprite(ss1, 'open').set({
                x: 270,
                y: 355
            });
            let door_2 = new createjs.Sprite(ss1).set({
                x: 415,
                y: 355
            });
            let door_3 = new createjs.Sprite(ss3).set({
                x: 564,
                y: 355
            });
            let door_4 = new createjs.Sprite(ss5).set({
                x: 715,
                y: 355
            });
            let door_5 = new createjs.Sprite(ss5).set({
                x: 865,
                y: 355
            });

            door_1.stop();
            door_2.stop();
            door_3.stop();
            door_4.stop();
            door_5.stop();

            handleLastDoor(door_1);
            handleLastDoor(door_2);
            handleLastDoor(door_3);
            handleLastDoor(door_4);
            handleLastDoor(door_5);

            function handleLastDoor(door) {
                door.on('click', function () {
                    if (clickCounter < 1) {
                        clickCounter++;
                        door.play();
                        if (data.CurrentValue) {
                            let light = new createjs.Bitmap(loader.getResult('bonusLight')).set({
                                x: door.x,
                                y: door.y,
                                regX: 0,
                                regY: 550,
                                alpha: 0
                            });
                            let coins = new createjs.Bitmap(loader.getResult('bonusCoins')).set({
                                x: door.x,
                                y: door.y,
                                regX: -20,
                                regY: 592,
                                alpha: 0
                            });
                            bonusContainer.addChild(light, coins);
                            door.on('animationend', function () {
                                door.gotoAndStop(4);
                                door.paused = true;
                                createjs.Tween.get(light)
                                .to({alpha: 1}, 400);
                                createjs.Tween.get(coins)
                                .to({alpha: 1}, 400);
                            });
                            showBonusWin(data.CurrentValue, true, 3000)
                        } else {
                            setTimeout(function () {
                                events.trigger('finishBonusLevel')
                            }, 1000);
                            // let fly = new createjs.Sprite(loader.getResult('bonusFly')).set({
                            //     x: door.x,
                            //     y: door.y
                            // });
                            // fly.on('animationend', function () {
                            //     createjs.Tween.get(fly)
                            //     .to({alpha: 0}, 100);
                            // })
                            // bonusContainer.addChild(fly);
                            // door.on('animationend', function () {
                            //     door.gotoAndStop(4);
                            //     door.paused = true;
                            // });
                        }
                    }
                });
            }

            doorsContainer.removeAllChildren();
            doorsContainer.addChild(door_1, door_2, door_3, door_4, door_5);
            bonusContainer.addChild(bonusBG, doorsContainer);
            stage.addChild(bonusContainer);
        }
        if (stage.getChildIndex(stage.getChildByName('initContainer'))) {
            stage.addChildAt(bonusContainer, stage.getChildIndex(stage.getChildByName('initContainer')));
        } else {
            stage.addChild(bonusContainer);
        }
    }

    function showBonusWin(win, last, timer) {
        const loader = storage.read('loadResult');
        const numberSS = loader.getResult('numbers');
        let time = timer || 1000;
        console.log('I must show win:', win);
        let stage = storage.read('stage');
        let winText = new createjs.BitmapText(win, numberSS).set({
            name: 'winText',
            // x: 1280 / 2,
            // y: 760 / 2,
            // textAlign: 'center',
            // textBaseline: 'middle',
            scaleX: 0.1,
            scaleY: 0.1
        });
        var bounds = winText.getBounds();
			winText.x = stage.canvas.width - bounds.width >> 1;
			winText.y = stage.canvas.height - bounds.height >> 1;
        let bonusContainer = stage.getChildByName('bonusContainer');
        bonusContainer.addChild(winText);
        createjs.Tween.get(winText)
        .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.bounceOut)
        .call(
            setTimeout(function () {
                if (!last) {
                    callNextBonusLevel();
                } else {
                    events.trigger('finishBonusLevel');
                }
            }, time)
        );
    }

    function finishBonusLevel() {
        let stage = storage.read('stage');
        let loader = storage.read('loadResult');
        console.warn('I am finishing Bonuses!');
        let finishContainer = new createjs.Container().set({
            name: 'finishContainer',
            alpha: 0
        });
        let finishBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'finishBG'
        });
        let finishText = new createjs.Text(`You win ${bonusData.CurrentWinCoins} coins!!!`, '80px bold Arial', '#fff').set({
            name: 'finishText',
            x: 1280 / 2,
            y: 720 / 2,
            textAlign: 'center',
            textBaseline: 'middle'
        });
        createjs.Tween.get(finishContainer)
            .to({alpha: 1}, 500)
            .call(
                function () {
                    stage.removeChild(stage.getChildByName('bonusContainer'));
                }
            );
        finishBG.on('click', function () {
            createjs.Tween.get(finishContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeChild(stage.getChildByName('bonusContainer'));
                    readyAfterBonus();
                });
        });
        finishContainer.addChild(finishBG, finishText);

        stage.addChild(finishContainer);

    }

    function callNextBonusLevel() {
        console.log('I am calling next Level');
        readyAfterBonus();
        const stage = storage.read('stage');
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
        const sessionID = storage.read('sessionID');
        const currentBalance = storage.read('currentBalance');
        const betValue = currentBalance.betValue;
        const coinsValue = currentBalance.coinsValue * 100;
        utils.request('_Roll/', `${sessionID}/${betValue}/${coinsValue}`)
            .then((data) => {
                bonusData = data;
                drawBonusLevel(currentLevel, data)
            });
    }

    function readyAfterBonus() {
        const sessionID = storage.read('sessionID');
        utils.request('_Ready/', `${sessionID}`).then((data) => {
            console.log('Ready data:', data);
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
