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

    // // Stages
    // let frontStage;
    // let backStage;
    //
    // // Containers
    // let winNumbersContainer;
    //
    // let linesEls = {
    //     linesDiscs: [],
    //     linesNumbers: [],
    //     winLines: [],
    //     winRects: []
    // };
    //
    // let linesData = {};
    //
    // // let winData = [];
    // let winFinishData = [];



    function drawLinesNumbers() {
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        let linesDiscSpriteSheet = loader.getResult('linesDisc');
        for (let i = 0, len = linesData.linesCoords.length; i < len + 1; i++) {
            /* eslint-disable */
            let linesNumber = new createjs.Text(i + 1, parameters.font, parameters.color).set({
                /* eslint-enable */
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesNumber_' + (i + 1),
                textAlign: 'center',
                /* eslint-disable */
                shadow: new createjs.Shadow('#C19433', 0, 0, 8)
                /* eslint-enable */
            });
            if (i === len) {
                linesNumber.text = 1;
            }
            /* eslint-disable */
            let linesDisc = new createjs.Sprite(linesDiscSpriteSheet, 'on').set({
                /* eslint-enable */
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesDisc_' + (i + 1),
                regX: 11,
                regY: 0
            });
            linesEls.linesDiscs.push(linesDisc);
            linesEls.linesNumbers.push(linesNumber);
            winNumbersContainer.addChild(linesNumber, linesDisc);
        }
    }

    function saveWinLines(spinWinObject) {
        winData = parseLinesResult(spinWinObject.winLines);
        winData.winCoins = spinWinObject.winCoins;
        winData.winCents = spinWinObject.winCents;
    }

    function startEventTimer(name, event, time) {
        flags[name] = setTimeout(function () {
            /* eslint-disable */
            events.trigger(event);
            /* eslint-enable */
        }, time);
    }

    // function drawTotalWin(win) {
    //     console.log('I am called with:', win);
    //     /* eslint-disable */
    //     if (win) {
    //         let loader = preloader.getLoadResult();
    //         let totalWin = new createjs.Container().set({
    //             /* eslint-enable */
    //             name: 'totalWin',
    //             x: (960 - 176) / 2 + 3,
    //             y: (540 - 150) / 2
    //         });
    //         /* eslint-disable */
    //         let totalWinText = new createjs.Text(win, 'bold 75px Arial', '#f0e194').set({
    //             /* eslint-enable */
    //             x: 88,
    //             y: 75,
    //             name: 'totalWinText',
    //             textAlign: 'center',
    //             textBaseline: 'middle',
    //             /* eslint-disable */
    //             shadow: new createjs.Shadow('#C19433', 0, 0, 8)
    //             /* eslint-enable */
    //         });
    //         /* eslint-disable */
    //         let totalWinRect = new createjs.Bitmap(loader.getResult('winTotalRect')).set({
    //             /* eslint-enable */
    //             name: 'totalWinRect'
    //         });
    //         totalWin.addChild(totalWinRect, totalWinText);
    //         return totalWin;
    //     } else {
    //         return;
    //     }
    // }

    function drawLineByLine() {
        if (winData.length === 1 && +winData[0].number === -1) {
            console.warn('Only Scatters here!');
            //  В этом случае мы не мигаем между линиями
        } else {
            winData.forEach((data) => {
                winFinishData.push(data);
            });
            let settings = {}; // КОСТЫЛЬ Это нужно получать из настроек
            settings.light = true;
            if (settings.light) {
                /* eslint-disable */
                flags.linesTicker = createjs.Ticker.on('tick', function (event) {
                    /* eslint-enable */
                    // Когда закончится основная анимация
                    if (!winLinesContainer.getChildByName('winLight')) {
                        event.remove();
                        /* eslint-disable */
                        removeWinScreen();
                        drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                        /* eslint-enable */
                    }
                });
            } else {
                flags.linesTimer = setTimeout(function () {
                    /* eslint-disable */
                    removeWinScreen();
                    drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: false, winShape: true });
                    /* eslint-enable */
                }, 1500);
            }
        }
    }

    function removeWinElements() {
        /* eslint-disable */
        let gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */
        for (let i = 0; i < 5; i++) {
            let column = gameContainer.getChildByName('gameColumn' + i);
            for (let j = 0; j < 5; j++) {
                let element = column.getChildByName('gameElement' + j);
                let animationName = element.currentAnimation;
                let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                element.gotoAndStop(`normal-${elementIndex}`);
                element.set({scaleX: 1, scaleY: 1});
            }
        }
    }

    function removeWinScreen() {
        winRectsContainer.removeAllChildren();
        winLinesContainer.removeAllChildren();
        removeWinElements();
        linesEls.linesDiscs.forEach((disc) => {
            disc.gotoAndStop('on');
        });
    }

    function drawWinLines(spinEndObject) {

        flags.autoMode = spinEndObject.autoSpinFlag;
        flags.freeMode = spinEndObject.freeSpinFlag;
        flags.mode = spinEndObject.mode;
        flags.fsCount = spinEndObject.fsCount;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        if (winData[0]) {
            // Нарисовали линии
            winData.forEach((winDataObject) => {
                /* eslint-disable */
                drawWinLine(winDataObject);
                /* eslint-enable */
            });
            // Написали выигрышный текст
            winRectsContainer.addChild(drawTotalWin(winData.winCoins));
            // Если мы в режиме автоплей или фриспин - через 1.5 секунды запустили следующую крутку
            if (flags.autoMode) {
                startEventTimer('autoTimer', 'startAutoplay', 1500);
            } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount) {
                startEventTimer('freeTimer', 'startFreeSpin', 1500);
            } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount === 0) {
                console.error('I stoping Free Spins!');
                events.trigger('finishFreeSpins');
            } else {
                drawLineByLine();
            }
        // Если мы ничего не выиграли - то фриспины и автоспины начнутся раньше - через 200 мс.
        } else if (flags.autoMode) {
            startEventTimer('autoTimer', 'startAutoplay', 200);
        } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount) {
            console.warn('I AM DISPATCH startFreeSpin EVENT!');
            startEventTimer('freeTimer', 'startFreeSpin', 200);
        } else if (flags.freeMode && flags.mode === 'fsBonus' && flags.fsCount === 0) {
            console.error('I stoping Free Spins!');
            events.trigger('finishFreeSpins');
        }
    }

    function drawLinesLight(linePath) {
        let amount = Math.round(Math.random() * 50) + 10;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        /* eslint-enable */
        let lightSpriteSheet = (loader.getResult('linesSprite'));
        for (let i = 0; i < amount; i++) {
            let timeout = Math.random() * 700;
            /* eslint-disable */
            let light = new createjs.Sprite(lightSpriteSheet, 'go').set({
                /* eslint-enable */
                x: linePath[0],
                y: linePath[1],
                regX: 24,
                regY: 19,
                name: 'winLight'
            });
            /* eslint-disable */
            createjs.Tween.get(light)
            .wait(timeout)
            .to({guide: {path: linePath, orient: 'cw'}}, 700)
            .call((tween) => {
                winLinesContainer.removeChild(tween.target);
            });
            /* eslint-enable */
            winLinesContainer.addChild(light);
        }
    }

    function drawLinesText(data) {
        let number = data.number;
        let amount = data.amount;
        let win = data.win;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let winText = new createjs.Container().set({
            /* eslint-enable */
            y: linesData.linesCoords[number - 1][amount - 1].y + 30,
            x: linesData.linesCoords[number - 1][amount - 1].x + 32,
            name: 'winText'
        });
        /* eslint-disable */
        let winLineRect = new createjs.Bitmap(loader.getResult('winLineRect')).set({
            /* eslint-enable */
            name: 'winLineRect',
            scaleX: 1.8,
            scaleY: 1.8
        });
        /* eslint-disable */
        let winLineText = new createjs.Text(win, 'bold 35px Arial', '#f0e194').set({
            /* eslint-enable */
            x: 30,
            y: 23,
            textAlign: 'center',
            textBaseline: 'middle',
            name: 'winLineText',
            /* eslint-disable */
            shadow: new createjs.Shadow('#C19433', 0, 0, 8)
            /* eslint-enable */
        });

        if ((winLineText.text + '').length > 3) {
            winLineText.font = 'bold 20px Arial';
        } else if ((winLineText.text + '').length > 2) {
            winLineText.font = 'bold 25px Arial';
        } else if ((winLineText.text + '').length > 1) {
            winLineText.font = 'bold 30px Arial';
        }

        winText.addChild(winLineRect, winLineText);
        linesEls.winRects.push(winText);
        winRectsContainer.addChild(winText);
    }

    function drawLinesShape(number) {
        let winDisc = linesEls.linesDiscs[number - 1];
        winDisc.gotoAndStop('off');
        /* eslint-disable */
        let winLine = new createjs.Shape();
        /* eslint-enable */
        for (let j = 0; j < 5; j++) {
            let currentCoords = linesData.linesCoords[number - 1][j];
            if (j === 0) {
                winLine.graphics.s('rgba(244, 233, 205, 0.15)').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
            } else {
                winLine.graphics.lt(currentCoords.x, currentCoords.y);
            }
        }
        winLine.graphics.es();
        linesEls.winLines.push(winLine);
        winLinesContainer.addChild(winLine);
    }

    function drawWinLine(data, options) {
        console.log('I called with data:', data);

        let defaultOptions = {
            winText: false,
            winLight: true,
            winShape: true
        };
        if (typeof options === 'undefined') {
            options = defaultOptions;
        }
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        let gameContainer = canvas.getStages().bgStage.getChildByName('gameContainer');
        /* eslint-enable */

        if (data) {

            let number = data.number;
            let amount = data.amount;
            let win = data.win;
            // Если выпавшая линия не скаттер и не тройной скаттер.
            if (number !== -1 && number !== -2) {
                let line = linesData.linesArray[number - 1];
                if (options.winText) {
                    drawLinesText(data);
                }
                if (options.winLight) {
                    drawLinesLight(linesData.linesPaths[number - 1]);
                }
                if (options.winShape) {
                    drawLinesShape(number);
                }
                line.forEach((coords, index) => {
                    let x = +coords[0];
                    let y = +coords[1];
                    if (x < amount) {
                        let column = gameContainer.getChildByName('gameColumn' + index);
                        let element = column.getChildByName('gameElement' + (y + 1));
                        let animationName = element.currentAnimation;
                        let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                        element.gotoAndStop(`win-${elementIndex}`);
                        /* eslint-disable */
                        createjs.Tween.get(element)
                        .to({scaleX: 0.8, scaleY: 0.8}, 200)
                        .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                        /* eslint-enable */
                    }
                });
            // Если выпали скаттеры
            } else if (number === -1) {
                console.warn('I am here! Lines number = -1');
                if (win > 0) {
                    for (let i = 0; i < 5; i++) {
                        let column = gameContainer.getChildByName('gameColumn' + i);
                        for (let j = 0; j < 5; j++) {
                            let element = column.getChildByName('gameElement' + j);
                            let animationName = element.currentAnimation;
                            let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                            if (+elementIndex === 10) {
                                element.gotoAndStop(`win-${elementIndex}`);
                                /* eslint-disable */
                                createjs.Tween.get(element)
                                .to({scaleX: 0.8, scaleY: 0.8}, 200)
                                .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                                /* eslint-enable */
                            }
                        }
                    }
                } else {
                    console.warn('And this is scatter Wild!');
                    for (let i = 0; i < 5; i++) {
                        let column = gameContainer.getChildByName('gameColumn' + i);
                        for (let j = 0; j < 5; j++) {
                            let element = column.getChildByName('gameElement' + j);
                            let animationName = element.currentAnimation;
                            let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                            if (+elementIndex === 11 || +elementIndex === 12 || +elementIndex === 13) {
                                element.gotoAndStop(`win-${elementIndex}`);
                            }
                            if (+elementIndex === 14) {
                                element.gotoAndStop(`win-${elementIndex}`);
                                createjs.Tween.get(element)
                                .to({scaleX: 0.8, scaleY: 0.8}, 200)
                                .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                                winRectsContainer.addChild(drawTotalWin('+3').set({y: 385}));
                            }
                        }
                    }
                }
            }
            // Если в опциях есть индекс, то показываем линию за линией
            if (typeof options !== 'undefined') {
                if (typeof options.index !== 'undefined') {
                    flags.scatterTimer = null;
                    /* eslint-disable */
                    flags.lineTimer = createjs.Ticker.on('tick', (event) => {
                        /* eslint-enable */
                        if (number !== -1) {
                            if (!winLinesContainer.getChildByName('winLight')) {
                                event.remove();
                                removeWinScreen();
                                if (winFinishData[options.index + 1]) {
                                    drawWinLine(winFinishData[options.index + 1], { index: options.index + 1, winText: true, winLight: true, winShape: true });
                                } else {
                                    drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                                }
                            }
                        } else {
                            if (!flags.scatterTimer) {
                                event.remove();
                                flags.scatterTimer = setTimeout(function () {
                                    removeWinScreen();
                                    if (winFinishData[options.index + 1]) {
                                        drawWinLine(winFinishData[options.index + 1], { index: options.index + 1, winText: true, winLight: true, winShape: true });
                                    } else {
                                        drawWinLine(winFinishData[0], { index: 0, winText: true, winLight: true, winShape: true });
                                    }
                                }, 1000);
                            }
                        }
                    });
                }
            }
        }
    }

    function removeWinLines() {
        /* eslint-disable */
        createjs.Ticker.off('tick', flags.lineTimer);
        createjs.Ticker.off('tick', flags.linesTimer);
        /* eslint-enable */
        if (winData[0]) {
            winData = [];
            winFinishData = [];
            linesEls.linesDiscs.forEach((disc) => {
                disc.gotoAndStop('on');
            });
            winLinesContainer.removeAllChildren();
            winRectsContainer.removeAllChildren();
            linesEls.winLines = [];
            linesEls.winRects = [];
        }
    }


    // function clearAutoTimer() {
    //     flags.autoMode = false;
    //     clearTimeout(flags.autoTimer);
    // }

    // /* eslint-disable */
    // events.on('dataDownloaded', initLines);
    // events.on('spinStart', removeWinLines);
    // events.on('spinEnd', drawWinLines);
    // events.on('spinWin', saveWinLines);
    // /* eslint-enable *

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

    function fireWinLine(number, amount) {
        for (let i = 0; i < amount; i++) {
            const element = winElements[number - 1][i];
            const animationName = element.currentAnimation;
            const elementIndex = animationName.substr(animationName.indexOf('-') + 1);
            element.gotoAndStop(`win-${elementIndex}`);
        }
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
            } else if (+lineWin !== 0) {
                fireAllScatters();
            } else {
                fireScatterWild();
            }
        });
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
    }

    function checkState(state) {
        if (state === 'roll' && storage.readState(state) === 'ended') {
            showWin();
        }
        if (state === 'roll' && storage.readState(state) === 'started') {
            cleanWin();
        }
        if (state === 'firstScreen' && storage.readState(state) === 'done') {
            initWin();
        }
    }

    events.on('changeState', checkState);

    return {
        fireWinLine
    };
})();
