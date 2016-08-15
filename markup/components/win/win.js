/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const win = (function () {

    const c = createjs;
    const parameters = {
        font: 'normal 15px Arial',
        color: 'gold',
        1: {
            x: 95,
            y: 336,
            textBaseline: 'middle'
        },
        2: {
            x: 1072,
            y: 187,
            textBaseline: 'middle'
        },
        3: {
            x: 1072,
            y: 516,
            textBaseline: 'middle'
        },
        4: {
            x: 95,
            y: 118,
            textBaseline: 'middle'
        },
        5: {
            x: 95,
            y: 585,
            textBaseline: 'middle'
        },
        6: {
            x: 95,
            y: 152,
            textBaseline: 'middle'
        },
        7: {
            x: 95,
            y: 550,
            textBaseline: 'middle'
        },
        8: {
            x: 1072,
            y: 405,
            textBaseline: 'middle'
        },
        9: {
            x: 95,
            y: 301,
            textBaseline: 'middle'
        },
        10: {
            x: 95,
            y: 481,
            textBaseline: 'middle'
        },
        11: {
            x: 95,
            y: 222,
            textBaseline: 'middle'
        },
        12: {
            x: 1072,
            y: 585,
            textBaseline: 'middle'
        },
        13: {
            x: 1072,
            y: 118,
            textBaseline: 'middle'
        },
        14: {
            x: 1072,
            y: 551,
            textBaseline: 'middle'
        },
        15: {
            x: 1072,
            y: 153,
            textBaseline: 'middle'
        },
        16: {
            x: 1072,
            y: 481,
            textBaseline: 'middle'
        },
        17: {
            x: 1072,
            y: 222,
            textBaseline: 'middle'
        },
        18: {
            x: 95,
            y: 187,
            textBaseline: 'middle'
        },
        19: {
            x: 95,
            y: 516,
            textBaseline: 'middle'
        },
        20: {
            x: 95,
            y: 370,
            textBaseline: 'middle'
        },
        21: {
            x: 1072,
            y: 370,
            textBaseline: 'middle'
        },
        22: {
            x: 1072,
            y: 336,
            textBaseline: 'middle'
        }
    };
    let winData = {};
    let stage;
    let winLinesContainer;
    let winRectsContainer;
    let winElements;
    let lightLinesCounter = 0;
    let lightDoneCounter = 0;

    function initWin() {
        stage = storage.read('stage');
        const gameContainer = stage.getChildByName('gameContainer');
        winLinesContainer = new c.Container().set({
            name: 'winLinesContainer',
            x: gameContainer.x,
            y: gameContainer.y
        });
        winRectsContainer = new c.Container().set({
            name: 'winRectsContainer',
            x: gameContainer.x,
            y: gameContainer.y
        });
        stage.addChildAt(winLinesContainer, 1);
        stage.addChild(winRectsContainer);
        winElements = findWinElements();
        drawWinDiscs();
    }

    function findWinElements() {
        const result = [];
        const columns = [];
        const winLines = storage.read('lines');
        const gameContainer = stage.getChildByName('gameContainer');
        for (let i = 0; i < 5; i++) {
            const column = gameContainer.getChildByName(`gameColumn${i}`);
            columns.push(column);
        }
        winLines.forEach((line, number) => {
            result[number] = [];
            line.forEach((point, position) => {
                const x = +point[0];
                const y = +point[1];
                const element = columns[position].getChildByName(`gameElement${y + 1}`);
                result[number].push(element);
            });
        });
        return result;
    }

    function drawWinDiscs() {

    }

    function drawLineShape(number) {
        const linesCoords = storage.read('linesCoords');
        const lineShape = new c.Shape();
        for (let j = 0; j < 5; j++) {
            const currentCoords = linesCoords[number - 1][j];
            if (j === 0) {
                lineShape.graphics.s('rgba(244, 233, 205, 0.15)').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
            } else {
                lineShape.graphics.lt(currentCoords.x, currentCoords.y);
            }
        }
        lineShape.graphics.es();
        winLinesContainer.addChild(lineShape);
    }

    function drawLineLight(number) {
        let completeCounter = 0;
        const lightMas = [];
        const amount = Math.round(Math.random() * 40) + 10;
        const linesCoords = storage.read('linesCoords');
        const loader = storage.read('loadResult');
        const ss = loader.getResult('linesSprite');
        for (let i = 0; i < amount; i++) {
            const timeout = (Math.random() * 700) / 1000;
            const light = new c.Sprite(ss, 'light').set({
                name: 'winLight',
                x: linesCoords[number - 1][0].x,
                y: linesCoords[number - 1][0].y,
                scaleX: 0.5,
                scaleY: 0.5,
                regX: 25,
                regY: 10
            });
            lightMas.push(light);
            winLinesContainer.addChild(light);
        }
        TweenMax.staggerTo(lightMas, 0.75,
            {bezier: {type: 'soft', values: linesCoords[number - 1], autoRotate: true},
            ease: Power1.easeOut,
            onComplete: function () {
                winLinesContainer.removeChild(this.target);
            }}, 0.025, function () {
                storage.changeState('lineLight', 'done');
            }
        );
    }

    function drawLineText(data) {
        const loader = storage.read('loadResult');
        const linesCoords = storage.read('linesCoords');
        const number = data.lineNumber;
        const amount = data.lineAmount;
        const lineWin = data.lineWin;
        const winText = new c.Container().set({
            name: 'winText',
            y: linesCoords[number - 1][amount - 1].y + 30,
            x: linesCoords[number - 1][amount - 1].x + 32
        });
        const winLineRect = new c.Bitmap(loader.getResult('winLineRect')).set({
            name: 'winLineRect',
            scaleX: 1.8,
            scaleY: 1.8
        });
        const winLineText = new c.Text(lineWin, 'bold 35px Arial', '#f0e194').set({
            x: 30,
            y: 23,
            textAlign: 'center',
            textBaseline: 'middle',
            name: 'winLineText',
            shadow: new c.Shadow('#C19433', 0, 0, 8)
        });
        if ((winLineText.text + '').length > 3) {
            winLineText.font = 'bold 20px Arial';
        } else if ((winLineText.text + '').length > 2) {
            winLineText.font = 'bold 25px Arial';
        } else if ((winLineText.text + '').length > 1) {
            winLineText.font = 'bold 30px Arial';
        }
        winText.addChild(winLineRect, winLineText);
        winRectsContainer.addChild(winText);
    }

    function showTotalWin(totalWinNumber) {
        const loader = storage.read('loadResult');
        const totalWin = new c.Container().set({
            name: 'totalWin',
            x: (utils.gameWidth - 176) / 2 + 3,
            y: (utils.gameHeight - 150) / 2
        });
        const totalWinText = new c.Text(totalWinNumber, 'bold 75px Arial', '#f0e194').set({
            x: 88,
            y: 75,
            name: 'totalWinText',
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new c.Shadow('#C19433', 0, 0, 8)
        });
        const totalWinRect = new c.Bitmap(loader.getResult('winTotalRect')).set({
            name: 'totalWinRect'
        });
        totalWin.addChild(totalWinRect, totalWinText);
        winRectsContainer.addChild(totalWin);
    }

    function fireWinLine(number, amount) {
        for (let i = 0; i < amount; i++) {
            const element = winElements[number - 1][i];
            const animationName = element.currentAnimation;
            const elementIndex = animationName.substr(animationName.indexOf('-') + 1);
            element.gotoAndStop(`win-${elementIndex}`);
        }
        drawLineShape(number);
        drawLineLight(number);
    }

    function drawAnotherLine(index) {
        cleanWin();
        if (index === winData.winLines.length) {
            index = 0;
        }
        const winLine = winData.winLines[index];
        if (+winLine.lineNumber !== -1) {
            fireWinLine(winLine.lineNumber, winLine.lineAmount);
            drawLineText(winLine);
        } else if (+winLine.lineWin !== 0) {
            fireAllScatters();
        } else {
            fireScatterWild();
        }
        storage.changeState('anotherLine', index);
    }

    function fireAllScatters() {
        winElements.forEach((winLine) => {
            winLine.forEach((element) => {
                const animationName = element.currentAnimation;
                const elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                if (+elementIndex === 10 || +elementIndex === 14) {
                    element.gotoAndStop(`win-${elementIndex}`);
                }
            });
        });
    }

    function fireScatterWild() {
        winElements.forEach((winLine) => {
            winLine.forEach((element) => {
                const animationName = element.currentAnimation;
                const elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                if (+elementIndex === 11 || +elementIndex === 12 || +elementIndex === 13) {
                    element.gotoAndStop(`win-${elementIndex}`);
                }
            });
        });
    }

    function drawTotalWin(lines) {
        lines.forEach((line) => {
            const lineNumber = line.lineNumber;
            const lineAmount = line.lineAmount;
            const lineWin = line.lineWin;
            if (+lineNumber !== -1) {
                fireWinLine(lineNumber, lineAmount);
                lightLinesCounter++;
            } else if (+lineWin !== 0) {
                fireAllScatters();
            } else {
                fireScatterWild();
            }
        });
        const totalWin = storage.read('rollResponse').TotalWinCoins;
        showTotalWin(totalWin);
    }

    function parseWinResult(arr) {
        const result = [];
        arr.forEach((line) => {
            const lineAmount = +parseInt(line, 10);
            const lineNumber = +parseInt(line.substr(line.indexOf('#') + 1), 10);
            const lineWin = +parseInt(line.substr(line.indexOf(':') + 1), 10);
            const lineObj = {
                lineAmount,
                lineNumber,
                lineWin
            };
            result.push(lineObj);
        });
        return result;
    }

    function showWin() {
        const rollData = storage.read('rollResponse');
        winData.winCoins = rollData.TotalWinCoins;
        winData.winCents = rollData.TotalWinCents;
        winData.winLines = parseWinResult(rollData.LinesResult);
        if (winData.winLines.length) {
            drawTotalWin(winData.winLines);
        }
    }

    function cleanWin() {
        winLinesContainer.removeAllChildren();
        winRectsContainer.removeAllChildren();
        winElements.forEach((line) => {
            line.forEach((element) => {
                const animationName = element.currentAnimation;
                const elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                element.gotoAndStop(`normal-${elementIndex}`);
                element.set({
                    scaleX: 1,
                    scaleY: 1
                });
            });
        });
        lightLinesCounter = 0;
        lightDoneCounter = 0;
    }

    function checkState(state) {
        if (state === 'roll' && storage.readState(state) === 'ended') {
            showWin();
        }
        if (state === 'roll' && storage.readState(state) === 'started') {
            cleanWin();
            if (storage.read('lineTimeout')) {
                clearTimeout(storage.read('lineTimeout'));
            }
        }
        if (state === 'firstScreen' && storage.readState(state) === 'done') {
            initWin();
        }
        if (state === 'lineLight' && storage.readState(state) === 'done') {
            lightDoneCounter++;
            if (lightDoneCounter === lightLinesCounter && storage.readState('mode') === 'normal') {
                storage.changeState('lineByLine', 'started');
            }
        }
        if (state === 'lineByLine' && storage.readState(state) === 'started') {
            drawAnotherLine(0);
        }
        if (state === 'anotherLine') {
            let lineTimeout = setTimeout(function () {
                drawAnotherLine(storage.readState('anotherLine') + 1);
            }, 1500);
            storage.write('lineTimeout', lineTimeout);
        }
    }

    events.on('changeState', checkState);
})();
