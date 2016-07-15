let spin = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';
    let elementWidth = 192; // Может поменяться от игры к игре
    let elementHeight = 180; // Может поменяться от игры к игре
    let columnsNumber = 5; // Может поменяться от игры к игре
    let rowsNumber = 5; // Может поменяться от игры к игре
    let longRowsNumber = 40; // Может поменяться от игры к игре

    // Flag
    let inProgress;
    let fastSpinFlag;
    let fastSpinTimer;

    // Data
    let wheels;
    let columns;
    let currentScreen;
    let nextScreen;
    let gameContainer;

    // Balance
    let winCoins;
    let winCents;
    let scoreCoins;
    let scoreCents;
    let indexes;
    let linesResult;

    // Bonuses
    let bonusLevelStart;
    let bonusEnd;
    let bonusValue;
    let bonusOldValues;
    let bonusWinCoins;
    let bonusWinCents;

    function getScreenData(inds) {
        inds = inds || indexes;
        let i, j, screen = [];
        let wheelsLength = +wheels[0].length; // Если колеса будут разной длинны поломается
        for (i = 0; i < columnsNumber; i++) {
            screen[i] = [];
            for (j = 0; j < rowsNumber; j++) {
                if (inds[i] === 0 && j === 0) { // Проверка на верхний край
                    screen[i][j] = wheels[i][wheelsLength - 1];
                } else if (inds[i] > (wheelsLength - 4)) { // Проверка на нижний край
                    if (wheels[i][inds[i] + j - 1]) {
                        screen[i][j] = wheels[i][inds[i] + j - 1];
                    } else {
                        screen[i][j] = wheels[i][inds[i] + j - 1 - wheelsLength];
                    }
                } else {
                    screen[i][j] = wheels[i][inds[i] + j - 1];
                }
            }
        }
        return screen;
    }

    function getWheels(wheelsArray) {
        let i, randomArray = [];
        for (i = 0; i < columnsNumber; i++) {
            let randomNumber = Math.round(Math.random() * (wheelsArray.length - 1));
            randomArray.push(randomNumber);
        }
        wheels = wheelsArray;
        console.log('Wheels:', wheels);
        currentScreen = getScreenData(randomArray);
        /* eslint-disable */
        events.on('preloadComplete', initScreen);
        /* eslint-enable */
    }

    function getCurrentScreen() {
        if (currentScreen) {
            return currentScreen;
        } else {
            console.error('Current screen is not defined!');
        }
    }

    function getNextScreen() {
        if (nextScreen) {
            return nextScreen;
        } else {
            console.error('I do not know next screen!');
        }
    }

    function getSpinState() {
        return {
            inProgress,
            fastSpinFlag
        };
    }

    function initGameContainer(x, y) {
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

    function initScreen() {
        /* eslint-disable */
        drawScreen(currentScreen);
        /* eslint-enable */
    }

    function drawScreen(nextScreenData) {
        if (!gameContainer) {
            initGameContainer(100, 89);
        } else {
            gameContainer.removeAllChildren();
        }
        let i;
        columns = []; // Обнулкние предыдущих колонок
        nextScreenData = nextScreenData || nextScreen;
        /* eslint-disable */
        let loader = preloader.getLoadResult();

        if (nextScreen) {
            for (i = 0; i < columnsNumber; i++) {
                columns[i] = createColumn(currentScreen[i], nextScreenData[i]).set({
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
            console.log('I am drawing new screen!');
        } else {
            for (i = 0; i < columnsNumber; i++) {
                columns[i] = createColumn(nextScreenData[i]).set({
                    x: elementWidth * i
                });
                gameContainer.addChild(columns[i]);
            }
            console.log('I am drawing first screen!');
        }
        /* eslint-enable */
    }

    function createColumn(startArray, endArray) {
        let i;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        if (endArray) {
            let column = new createjs.Container();
            for (i = 0; i < longRowsNumber; i++) {
                if (i < rowsNumber) {
                    let elementNumber = endArray[i];
                    let element = new createjs.Sprite(loader.getResult('element' + elementNumber), 'normal').set({
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
                    let element = new createjs.Sprite(loader.getResult('element' + elementNumber), 'normal').set({
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
                    let element = new createjs.Sprite(loader.getResult('element' + elementNumber), 'blur').set({
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
                // column.cache(0, 0, elementWidth, elementHeight * longRowsNumber);
            }
            return column;
        } else {
            let column = new createjs.Container();
            for (i = 0; i < rowsNumber; i++) {
                let elementNumber = startArray[i];
                let element = new createjs.Sprite(loader.getResult('element' + elementNumber), 'normal').set({
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
        let gameStage = canvas.getStages().bgStage;
        for (i = 0; i < columns.length; i++) {
            let shadow = gameStage.getChildByName('gameContainer').getChildByName('gameShadow' + i);
            createjs.Tween.get(columns[i], {override: true})
                .to({ y: -elementHeight}, time, createjs.Ease.circOut)
                .call(spinEnd.bind(null, i));
            createjs.Tween.get(shadow, {override: true})
                .to({ alpha: 0}, time, createjs.Ease.circOut);
        }
        /* eslint-enable */
    }

    function requestSpin() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            let coinsValue = balance.getCoinsValue().toString().replace('.', ','); // КОСТЫЛЬ coinsValue должен быть адекватным (без точки)
            $.ajax({
                url: `${serviceUrl}_Roll/${login.getSessionID()}/${balance.getBetValue()}/${coinsValue}`,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function requestReady() {
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

    function spinStart() {
        requestSpin()
            .then((data) => {
                console.log('Spin data:', data);
                if (data.Type === 'Simple') {
                    /* eslint-disable */
                    events.trigger('spinStart', data); // КОСТЫЛЬ Временно убрать потом
                    /* eslint-enable */
                    scoreCents = data.ScoreCents;
                    scoreCoins = data.ScoreCoins;
                    winCoins = data.TotalWinCoins;
                    winCents = data.TotalWinCents;
                    linesResult = data.LinesResult;
                    if (winCoins !== 0 && winCents !== 0) {
                        console.log(`You win ${winCoins} coins!`);
                        /* eslint-disable */
                        events.trigger('spinWin', linesResult, winCoins, winCents);
                        /* eslint-enable */
                    } else {
                        console.log('You win nothing.');
                    }
                    bonusLevelStart = data.BonusResults[0];
                    if (bonusLevelStart === 'StagesSlotBonus') {
                        console.log('You are starting Bonus Level!');
                        /* eslint-disable */
                        events.trigger('bonusStart');
                        /* eslint-enable */
                    }

                    indexes = data.Indexes;
                    nextScreen = getScreenData();
                    drawScreen();
                    currentScreen = nextScreen;
                    inProgress = true;
                    fastSpinTimer = setTimeout(function () {
                        fastSpinFlag = true;
                        console.log('You could do Fast Spin!');
                    }, 500);
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
            requestReady()
            .then((response) => {
                if (response.ErrorCode === 0) {
                    inProgress = false;
                    fastSpinFlag = false;
                    console.log('Spin is done!');
                    let winCash = (winCents / 100).toFixed(2);
                    /* eslint-disable */
                    events.trigger('spinEnd', winCash, scoreCoins, scoreCents);
                    /* eslint-enable */
                } else {
                    console.error(response.ErrorMessage);
                }
            });
        }
    }

    /* eslint-disable */
    events.on('initWheels', getWheels);
    events.on('initScreen', drawScreen);
    /* eslint-enable */

    return {
        spinStart,
        spinEnd,
        fastSpin,
        getScreenData,
        getCurrentScreen,
        getNextScreen,
        getSpinState
    };
})();
