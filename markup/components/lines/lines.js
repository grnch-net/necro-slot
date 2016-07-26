let lines = (function () {
    // Motion Plugin For Lines
    /* eslint-disable */
    createjs.MotionGuidePlugin.install(createjs.Tween);
    /* eslint-enable */

    // Containers
    let winNumbersContainer;
    let winLinesContainer;
    let winRectsContainer;

    let autoModeFlag;
    let autoTimer;
    let winCoins;
    let winCents;
    let winData = [];
    let winFinishData = [];
    let lineTrigger;
    let linesTrigger;

    let linesArray;
    let linesCoord;
    let linesPaths;

    let linesDiscs = [];
    let linesNumbers = [];
    let winLines = [];
    let winRects = [];

    let parameters = {
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

    function initLines(arr) {
        linesArray = arr;
        console.log('Lines are downloaded!');
        /* eslint-disable */
        linesCoord = parseLinesCoords(arr);
        linesPaths = parseLinesPaths(linesCoord);
        spin.getGameDelta()
            .then((result) => {
                winLinesContainer = new createjs.Container().set({
                    name: 'winLinesContainer',
                    x: result.x,
                    y: result.y
                });
                winRectsContainer = new createjs.Container().set({
                    name: 'winRectsContainer',
                    x: result.x,
                    y: result.y
                });
                winNumbersContainer = new createjs.Container().set({
                    name: 'winNumbersContainer'
                });
                let bgStage = canvas.getStages().bgStage;
                let gameStage = canvas.getStages().gameStage;
                bgStage.addChildAt(winLinesContainer, 0);
                gameStage.addChildAt(winNumbersContainer, winRectsContainer, 0);
                events.trigger('linesInited', linesCoord);
            });
        /* eslint-enable */
    }

    function parseLinesResult(arr) {
        let i, result = [];
        let len = arr.length;
        for (i = 0; i < len; i++) {
            let amount = +parseInt(arr[i], 10);
            let sharpIndex = arr[i].indexOf('#');
            let number = +parseInt(arr[i].substr(sharpIndex + 1), 10);
            let columnIndex = arr[i].indexOf(':');
            let win = +parseInt(arr[i].substr(columnIndex + 1), 10);
            let lineObj = {
                amount,
                number,
                win
            };
            result.push(lineObj);
        }
        return result;
    }

    function parseLinesCoords(arr) {
        let i, j, len;
        let result = [];
        for (i = 0, len = arr.length; i < len; i++) {
            result[i] = [];
            for (j = 0; j < 5; j++) {
                let x = +arr[i][j][0];
                let y = +arr[i][j][1];
                let resultX = 192 * (x + 0.5);
                let resultY = 180 * (y + 0.5);
                let resultCoords = {
                    x: resultX,
                    y: resultY
                };
                result[i][j] = resultCoords;
            }
        }
        return result;
    }

    function parseLinesPaths(coords) {
        let result = [];
        let linesLength = coords.length;
        coords.forEach((line, number) => {
            result[number] = [];
            line.forEach((point, ind) => {
                let x = point.x;
                let y = point.y;
                result[number].push(x, y);
            });
        });
        return result;
    }

    function saveWinLines(arr, rest) {
        winData = parseLinesResult(arr);
        winCoins = rest[0];
        winCents = rest[1];
    }

    function drawLinesNumbers() {
        let i;
        let linesLength = linesCoord.length;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        // winNumbersContainer.removeAllChildren();
        for (i = 0; i < linesLength + 1; i++) {
            let linesNumber = new createjs.Text(i + 1, parameters.font, parameters.color).set({
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesNumber' + (i + 1),
                textAlign: 'center',
                shadow: new createjs.Shadow('#C19433', 0, 0, 8)
            });
            if (i === linesLength) {
                linesNumber.text = '1';
            }
            let linesDisc = new createjs.Sprite(loader.getResult('linesDisc'), 'on').set({
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesDisc' + (i + 1),
                regX: 11,
                regY: 0
            });
            linesDiscs.push(linesDisc);
            linesNumbers.push(linesNumber);
            winNumbersContainer.addChild(linesNumber, linesDisc);
        }
    }

    function drawLinesLight(linePath) {
        let i;
        // if (winData.length < 4 && typeof index === 'undefined') {
            var amount = Math.round(Math.random() * 50) + 10;
        // } else {
        //     var amount = Math.round(Math.random() * 10) + 10;
        // }
        /* eslint-disable */
        let stage = canvas.getStages().bgStage;
        let loader = preloader.getLoadResult();
        for (i = 0; i < amount; i++) {
            let timeout = Math.random() * 700;
            let light = new createjs.Sprite(loader.getResult('linesSprite'), 'go').set({
                x: linePath[0],
                y: linePath[1],
                regX: 24,
                regY: 19,
                name: 'winLight'
            });
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

    function drawLinesText(num, amt, win) {
        let loader = preloader.getLoadResult();
        let winText = new createjs.Container().set({
            y: linesCoord[num - 1][amt - 1].y + 30,
            x: linesCoord[num - 1][amt - 1].x + 32,
            name: 'winText'
        });
        let winLineRect = new createjs.Bitmap(loader.getResult('winLineRect')).set({
            name: 'winLineRect',
            scaleX: 1.8,
            scaleY: 1.8
        });
        let winLineText = new createjs.Text(win, 'bold 35px Arial', '#f0e194').set({
            x: 30,
            y: 23,
            textAlign: 'center',
            textBaseline: 'middle',
            name: 'winLineText',
            shadow: new createjs.Shadow('#C19433', 0, 0, 8)
        });
        if ((winLineText.text+'').length > 3) {
            winLineText.font = 'bold 20px Arial';
        } else if ((winLineText.text+'').length > 2) {
            winLineText.font = 'bold 25px Arial';
        } else if ((winLineText.text+'').length > 1) {
            winLineText.font = 'bold 30px Arial';
        }
        winText.addChild(winLineRect, winLineText);
        winRects.push(winText);
        winRectsContainer.addChild(winText);
    }

    function drawLinesShape(num) {
        let j;
        if (num !== -1) {
            let winDisc = linesDiscs[num - 1];
            winDisc.gotoAndStop('off');
            /* eslint-disable */
            let winLine = new createjs.Shape();
            /* eslint-enable */
            for (j = 0; j < 5; j++) {
                let currentCoords = linesCoord[num - 1][j];
                if (j === 0) {
                    winLine.graphics.s('rgba(244, 233, 205, 0.15)').setStrokeStyle(2).lt(currentCoords.x, currentCoords.y);
                } else {
                    winLine.graphics.lt(currentCoords.x, currentCoords.y);
                }
            }
            winLine.graphics.es();
            winLines.push(winLine);
            winLinesContainer.addChild(winLine);
        }
    }

    function drawWinLine(data, winFlag = false, lightFlag = true, shapeFlag = true, index) {
        console.log('I called with data:', data);
        let i, j;
        let stage = canvas.getStages().bgStage;
        let loader = preloader.getLoadResult();
        let gameContainer = stage.getChildByName('gameContainer');

        if (data) {
            let number = data.number;
            let amount = data.amount;
            let win = data.win;

            if (number !== -1) {
                if (winFlag) {
                    drawLinesText(number, amount, win);
                }
                if (lightFlag) {
                    let path = linesPaths[number - 1];
                    drawLinesLight(path);
                }
                if (shapeFlag) {
                    drawLinesShape(number);
                }
                let line = linesArray[number - 1];
                for (i = 0; i < amount; i++) {
                    let x = +line[i][0];
                    let y = +line[i][1];
                    let column = gameContainer.getChildByName('gameColumn' + i);
                    let element = column.getChildByName('gameElement' + (y + 1));
                    let animationName = element.currentAnimation;
                    let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                    element.gotoAndStop(`win-${elementIndex}`);
                    createjs.Tween.get(element)
                    .to({scaleX: 0.8, scaleY: 0.8}, 200)
                    .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                }
            } else {
                for (i = 0; i < 5; i++) {
                    let column = gameContainer.getChildByName('gameColumn' + i);
                    for (j = 0; j < 5; j++) {
                        let element = column.getChildByName('gameElement' + j);
                        let animationName = element.currentAnimation;
                        let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                        if (+elementIndex === 10) {
                            element.gotoAndStop(`win-${elementIndex}`);
                            createjs.Tween.get(element)
                            .to({scaleX: 0.8, scaleY: 0.8}, 200)
                            .to({scaleX: 1.1, scaleY: 1.1}, 700, createjs.Ease.bounceOut);
                        }
                    }
                }
            }
            if (typeof index !== 'undefined') {
                let scatterTimer;
                lineTrigger = createjs.Ticker.on('tick', (event) => {
                    if (number !== -1) {
                        if(!winLinesContainer.getChildByName('winLight')) {
                            event.remove();
                            removeWinScreen();
                            if (winFinishData[index + 1]) {
                                drawWinLine(winFinishData[index + 1], true, true, true, index + 1)
                            } else {
                                drawWinLine(winFinishData[0], true, true, true, 0)
                            }
                        }
                    }
                    else {
                        if(!scatterTimer) {
                            scatterTimer = setTimeout(function () {
                                event.remove();
                                removeWinScreen();
                                if (winFinishData[index + 1]) {
                                    drawWinLine(winFinishData[index + 1], true, true, true, index + 1)
                                } else {
                                    drawWinLine(winFinishData[0], true, true, true, 0)
                                }
                            }, 1000);

                        }
                    }
                });
            }
        }
    }

    function drawWinLines(autoMode) {
        autoModeFlag = autoMode;
        let i, j, len;
        let loader = preloader.getLoadResult();
        if (winData[0]) {
            for (i = 0, len = winData.length; i < len; i++) {
                drawWinLine(winData[i], false);
            }
            let totalWin = new createjs.Container().set({
                name: 'totalWin',
                x: (960 - 176) / 2 + 3,
                y: (540 - 150) / 2
            });
            let totalWinText = new createjs.Text(winCoins, 'bold 75px Arial', '#f0e194').set({
                x: 88,
                y: 75,
                name: 'totalWinText',
                textAlign: 'center',
                textBaseline: 'middle',
                shadow: new createjs.Shadow('#C19433', 0, 0, 8)
            });
            let totalWinRect = new createjs.Bitmap(loader.getResult('winTotalRect')).set({
                name: 'totalWinRect'
            })
            totalWin.addChild(totalWinRect, totalWinText);
            winRectsContainer.addChild(totalWin);
            if (!autoModeFlag) {
                if (winData.length === 1 && +winData[0].number === -1) {
                    console.warn('Only Scatters here!');
                } else {
                    linesTrigger = createjs.Ticker.on('tick', (event) => {
                        if(!winLinesContainer.getChildByName('winLight')) {
                            console.warn('Animation finished!');
                            event.remove();
                            removeWinScreen();
                            for (let i = 0, len = winData.length; i < len; i++) {
                                winFinishData[i] = winData[i];
                            }
                            drawWinLine(winFinishData[0], true, true, true, 0);
                        }
                    });
                }
            } else {
                autoTimer = setTimeout(function () {
                    events.trigger('startAutoplay');
                }, 1500);
            }
        } else if (autoModeFlag) {
            autoTimer = setTimeout(function () {
                events.trigger('startAutoplay');
            }, 200);
        }
    }

    function removeWinScreen() {
        let i, j, len;
        let stage = canvas.getStages().bgStage;
        let gameContainer = stage.getChildByName('gameContainer');
        winRectsContainer.removeAllChildren();
        winLinesContainer.removeAllChildren();
        for (i = 0; i < 5; i++) {
            let column = gameContainer.getChildByName('gameColumn' + i);
            for (j = 0; j < 5; j++) {
                let element = column.getChildByName('gameElement' + j);
                let animationName = element.currentAnimation;
                let elementIndex = animationName.substr(animationName.indexOf('-') + 1);
                element.gotoAndStop(`normal-${elementIndex}`);
                element.set({scaleX: 1, scaleY: 1});
            }
        }
        for (i = 0, len = linesCoord.length; i < len; i++) {
            let lineDisc = linesDiscs[i];
            lineDisc.gotoAndStop('on');
        }
    }

    function removeWinLines() {
        let i, len;
        createjs.Ticker.off('tick', lineTrigger);
        createjs.Ticker.off('tick', linesTrigger);
        if (winData[0]) {
            winData = [];
            winFinishData = [];
            for (i = 0, len = linesDiscs.length; i < len; i++) {
                let winDisc = linesDiscs[i];
                winDisc.gotoAndStop('on');
            }
            winLinesContainer.removeAllChildren();
            winRectsContainer.removeAllChildren();
            winLines = [];
            winRects = [];
        }
    }

    function clearAutoTimer() {
        clearTimeout(autoTimer);
        autoModeFlag = false;
        console.warn('I try to clear Timer!', autoTimer);
    }

    /* eslint-disable */
    events.on('initLines', initLines);
    events.on('linesInited', drawLinesNumbers);
    events.on('spinStart', removeWinLines);
    events.on('spinEnd', drawWinLines);
    events.on('spinWin', saveWinLines);
    /* eslint-enable */

    return {
        drawLinesNumbers,
        drawWinLine,
        clearAutoTimer
    };
})();
