let spin = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';
    let elementWidth = 192; // Может поменяться от игры к игре
    let elementHeight = 180; // Может поменяться от игры к игре
    let columnsNumber = 5; // Может поменяться от игры к игре
    let rowsNumber = 5; // Может поменяться от игры к игре
    let longRowsNumber = 40; // Может поменяться от игры к игре

    // Flag
    let mode;
    let inProgress;
    let fastSpinFlag;
    let locked;
    let fastSpinTimer;
    let autoSpinFlag;
    let freeSpinFlag;
    let fsCount;
    let fsMulti;
    let fsLevel;

    // Container
    let gameContainer;

    // Data
    let wheels;
    let columns;
    let currentScreen;
    let nextScreen;

    // Balance
    let winCoins;
    let winCents;
    let scoreCoins;
    let scoreCents;
    let indexes;
    let winLines;

    // Bonuses
    let bonusLevelName;
    let bonusEnd;
    let bonusValue;
    let bonusOldValues;
    let bonusWinCoins;
    let bonusWinCents;

    function initWheels(data) {
        wheels = data.wheels;
        let randomArray = [];
        wheels.forEach((column) => {
            let randomNumber = Math.round(Math.random() * (wheels.length - 1));
            randomArray.push(randomNumber);
        });
        /* eslint-disable */
        currentScreen = _getScreenData(randomArray);
        events.on('preloadComplete', initScreen);
        /* eslint-enable */
    }

    function initScreen() {
        /* eslint-disable */
        drawScreen(currentScreen);
        /* eslint-enable */
    }

    function _initGameContainer(x, y) {
        /* eslint-disable */
        gameContainer = new createjs.Container().set({
            x: x, // Смещение gameContainer и маски должны совпадать
            y: y, // Смещение gameContainer и маски должны совпадать
            name: 'gameContainer'
        });
        let stage = canvas.getStages().bgStage;
        let gameMask = new createjs.Shape();
        /* eslint-enable */
        gameMask.graphics.drawRect(x, y, 960, 540); // Смещение gameContainer и маски должны совпадать
        gameContainer.mask = gameMask;
        stage.addChild(gameContainer);
    }

    function _getScreenData(inds, wls) {
        inds = inds || indexes;
        wls = wls || wheels;
        let i, j, screen = [];
        let wheelsLength = +wls[0].length; // Если колеса будут разной длинны поломается
        for (i = 0; i < columnsNumber; i++) {
            screen[i] = [];
            for (j = 0; j < rowsNumber; j++) {
                if (inds[i] === 0 && j === 0) { // Проверка на верхний край
                    screen[i][j] = wls[i][wheelsLength - 1];
                } else if (inds[i] > (wheelsLength - 4)) { // Проверка на нижний край
                    if (wls[i][inds[i] + j - 1]) {
                        screen[i][j] = wls[i][inds[i] + j - 1];
                    } else {
                        screen[i][j] = wls[i][inds[i] + j - 1 - wheelsLength];
                    }
                } else {
                    screen[i][j] = wls[i][inds[i] + j - 1];
                }
            }
        }
        return screen;
    }

    function _createColumn(startArray, endArray) {
        let i;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let spriteSheet = loader.getResult('elements');
        if (endArray) {
            let column = new createjs.SpriteContainer(spriteSheet);
            for (i = 0; i < longRowsNumber; i++) {
                if (i < rowsNumber) {
                    let elementNumber = endArray[i];
                    let element = new createjs.Sprite(spriteSheet, `normal-${elementNumber}`).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    element.snapToPixel = true;
                    column.addChild(element);
                } else if (i >= longRowsNumber - rowsNumber) {
                    let elementNumber = startArray[i - longRowsNumber + rowsNumber];
                    let element = new createjs.Sprite(spriteSheet, `normal-${elementNumber}`).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    element.snapToPixel = true;
                    column.addChild(element);
                } else {
                    let elementNumber = Math.ceil(Math.random() * 10);
                    let element = new createjs.Sprite(spriteSheet, `blur-${elementNumber}`).set({
                        x: 96,
                        y: elementHeight * i + 90,
                        name: 'gameElement' + i,
                        regX: 96,
                        regY: 90
                    });
                    element.snapToPixel = true;
                    column.addChild(element);
                }
                column.set({
                    y: -elementHeight * (longRowsNumber - 4)
                });
            }
            return column;
        } else {
            let column = new createjs.SpriteContainer(spriteSheet);
            for (i = 0; i < rowsNumber; i++) {
                let elementNumber = startArray[i];
                let element = new createjs.Sprite(spriteSheet, `normal-${elementNumber}`).set({
                    y: elementHeight * i
                });
                column.addChild(element);
                column.set({
                    y: -elementHeight
                });
            }
            return column;
        }
        /* eslint-enable */
    }

    function _requestSpin() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            let coinsValue = balance.getBalanceData().coinsValue * 100; // КОСТЫЛЬ coinsValue должен быть адекватным (без точки)
            let betValue = balance.getBalanceData().betValue;
            $.ajax({
                url: `${serviceUrl}_Roll/${login.getSessionID()}/${betValue}/${coinsValue}`,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function _requestReady() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                /* eslint-disable */
                url: `${serviceUrl}_Ready/${login.getSessionID()}`,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function drawScreen(nextScreenData) {
        if (!gameContainer) {
            _initGameContainer(100, 89);
        } else {
            gameContainer.removeAllChildren();
        }
        let i;
        columns = []; // Обнулкние предыдущих колонок
        // nextScreenData = nextScreenData || nextScreen;
        /* eslint-disable */
        let loader = preloader.getLoadResult();

        if (!nextScreenData) {
            for (i = 0; i < columnsNumber; i++) {
                columns[i] = _createColumn(currentScreen[i], nextScreen[i]).set({
                    x: elementWidth * i,
                    name: 'gameColumn' + i
                });
                let shadow = new createjs.Bitmap(loader.getResult('gameShadow')).set({
                    x: (elementWidth + 2) * i,
                    y: 0,
                    alpha: 0,
                    name: 'gameShadow' + i
                });
                gameContainer.addChild(columns[i], shadow);
            }
            animateSpin();
        } else {
            for (i = 0; i < columnsNumber; i++) {
                columns[i] = _createColumn(nextScreenData[i]).set({
                    x: elementWidth * i
                });
                gameContainer.addChild(columns[i]);
            }
        }
        /* eslint-enable */
    }

    function animateSpin() {
        let i, time = 1000;
        /* eslint-disable */
        let gameStage = canvas.getStages().bgStage;
        for (i = 0; i < columns.length; i++) {
            time += 400;
            let shadow = gameStage.getChildByName('gameContainer').getChildByName('gameShadow' + i);
            createjs.Tween.get(columns[i])
                .to({ y: -elementHeight}, time, createjs.Ease.getBackInOut(0.5))
                .call(spinEnd.bind(null, i));
            createjs.Tween.get(shadow)
                .to({ alpha: 1}, time / 5, createjs.Ease.circIn)
                .to({ alpha: 1}, time * 3 / 5)
                .to({ alpha: 0}, time / 5);
            /* eslint-enable */
        }
    }

    function fastSpin() {
        console.log('I am Fast Spin! And I am called!');
        let i, time = 500;
        /* eslint-disable */
        if (!locked) {
            let gameStage = canvas.getStages().bgStage;
            for (i = 0; i < columns.length; i++) {
                let shadow = gameStage.getChildByName('gameContainer').getChildByName('gameShadow' + i);
                createjs.Tween.get(columns[i], {override: true})
                .to({ y: -elementHeight}, time, createjs.Ease.circOut)
                .call(spinEnd.bind(null, i));
                createjs.Tween.get(shadow, {override: true})
                .to({ alpha: 0}, time, createjs.Ease.circOut);
            }
        }
        locked = true;
        /* eslint-enable */
    }

    function spinStart(autoSpin = false, freeSpin = false) {
        autoSpinFlag = autoSpin;
        _requestSpin()
            .then((data) => {
                console.log('Spin data:', data);
                if (data.Type === 'Simple') {
                    /* eslint-disable */
                    events.trigger('spinStart', data); // КОСТЫЛЬ Временно убрать потом
                    /* eslint-enable */
                    mode = data.Mode;
                    scoreCents = data.ScoreCents;
                    scoreCoins = data.ScoreCoins;
                    winCoins = data.TotalWinCoins;
                    winCents = data.TotalWinCents;
                    winLines = data.LinesResult;
                    if (mode === 'fsBonus') {
                        fsLevel = data.Multiplier.MultiplierStep;
                        fsMulti = data.Multiplier.MultiplierValue;
                        fsCount = data.TotalFreeSpins;
                        console.warn('I am in fsBonus Mode', fsMulti, fsLevel);
                        let newFSObj = {
                            fsLevel,
                            fsMulti,
                            fsCount
                        };
                        events.trigger('newFreeSpin', newFSObj);
                    }
                    if (typeof winLines[0] !== 'undefined') {
                        console.log(`You win ${winCoins} coins!`);
                        let spinWinObject = {
                            winLines,
                            winCoins,
                            winCents
                        };
                        /* eslint-disable */
                        events.trigger('spinWin', spinWinObject);
                        /* eslint-enable */
                    } else {
                        console.log('You win nothing.');
                    }
                    bonusLevelName = data.BonusResults[0];
                    if (bonusLevelName === 'StagesSlotBonus') {
                        console.log('You are starting Bonus Level!');
                        /* eslint-disable */
                        events.trigger('startBonus');
                        /* eslint-enable */
                    } else if (bonusLevelName === 'FreeSpinBonus') {
                        console.log('You are starting Free Spins!');
                        fsCount = data.FreeSpins;
                        fsLevel = data.Multiplier.MultiplierStep;
                        fsMulti = data.Multiplier.MultiplierValue;
                        freeSpinFlag = true;
                    }

                    indexes = data.Indexes;
                    if (freeSpin) {
                        nextScreen = _getScreenData(null, freeSpins.getWheels());
                    } else {
                        nextScreen = _getScreenData();
                    }
                    drawScreen();
                    currentScreen = nextScreen;
                    inProgress = true;
                    fastSpinTimer = setTimeout(function () {
                        fastSpinFlag = true;
                        console.log('You could do Fast Spin!');
                    }, 750);
                } else if (data.Type === 'StagesSlotBonus') {
                    bonusEnd = data.BonusEnd;
                    if (bonusEnd) {
                        console.log('Bonus Level is finished!');
                        /* eslint-disable */
                        events.trigger('BonusEnd');
                        events.trigger('spinStart', data); // КОСТЫЛЬ Временно убрать потом
                        /* eslint-enable */
                    }
                    bonusValue = data.CurrentValue;
                    bonusWinCents = data.CurrentWinCents;
                    bonusWinCoins = data.CurrentWinCoins;
                    bonusOldValues = data.OldValues;
                    scoreCents = data.ScoreCents;
                    scoreCoins = data.ScoreCoins;
                } else if (data.ErrorCode !== 0) {
                    console.error(data.ErrorMessage);
                }
            });
    }

    function spinEnd(i) {
        if (i === 4) {
            _requestReady()
            .then((response) => {
                if (response.ErrorCode === 0) {
                    inProgress = false;
                    fastSpinFlag = false;
                    if (winLines[0]) {
                        setTimeout(function () {
                            locked = false;
                        }, 300);
                    } else {
                        locked = false;
                    }
                    console.log('Spin is done!');
                    let winCash = (winCents / 100).toFixed(2);
                    let spinEndObject = {
                        autoSpinFlag,
                        freeSpinFlag,
                        winCash,
                        scoreCoins,
                        scoreCents,
                        fsCount,
                        fsLevel,
                        fsMulti
                    };
                    /* eslint-disable */
                    events.trigger('spinEnd', spinEndObject);
                    /* eslint-enable */
                    if (freeSpinFlag && mode !== 'fsBonus') {
                        setTimeout(function () {
                            console.log('Я словил Фри Спины!');
                            let fsDataObj = {
                                fsCount,
                                fsLevel,
                                fsMulti
                            };
                            /* eslint-disable */
                            events.trigger('initFreeSpins', fsDataObj);
                            /* eslint-enable */
                        }, 500);
                    }
                } else {
                    console.error(response.ErrorMessage);
                }
            });
        }
    }

    function getCurrentScreen() {
        if (typeof currentScreen !== 'undefined') {
            return currentScreen;
        } else {
            console.error('Current screen is not defined!');
        }
    }

    function getNextScreen() {
        if (typeof nextScreen !== 'undefined') {
            return nextScreen;
        } else {
            console.error('I do not know next screen!');
        }
    }

    function getSpinState() {
        return {
            inProgress,
            fastSpinFlag,
            locked
        };
    }

    function getGamePosition() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', function(event){
            /* eslint-enable */
                if (gameContainer) {
                    if (typeof gameContainer.x !== 'undefined') {
                        if (typeof gameContainer.y !== 'undefined') {
                            event.remove();
                            let result = {
                                x: gameContainer.x,
                                y: gameContainer.y
                            };
                            resolve(result);
                        }
                    }
                }
            });
        });
    }

    function logWinLines(lin) {
        console.log(`Win Lines is: ${lin}`);
    }

    /* eslint-disable */
    events.on('dataDownloaded', initWheels);
    events.on('initScreen', drawScreen);

    events.on('spinWin', logWinLines);
    /* eslint-enable */

    return {
        spinStart,
        spinEnd,
        fastSpin,
        getCurrentScreen,
        getNextScreen,
        getSpinState,
        getGamePosition,
        _getScreenData,
        drawScreen
    };
})();
