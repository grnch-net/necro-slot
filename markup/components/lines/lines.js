let lines = (function () {

    // Flags
    let linesIsParsed;

    let linesResult;
    let winCoins;
    let winCents;
    let winData = [];

    let linesArray;
    let linesCoord;
    let linesPipkas = [];
    let linesNumbers = [];
    let winLines = [];
    let linesContainer;
    let winLinesContainer;

    createjs.MotionGuidePlugin.install(createjs.Tween);
    function guideBall(linePath) {
        let i;
        let amount = Math.round(Math.random() * 50) + 10;
        let rotation = Math.random() * 360;
        let stage = canvas.getStages().bgStage;
        let loader = preloader.getLoadResult();
        for (i = 0; i < amount; i++) {
            let timeout = Math.random() * 1500;
            let ball = new createjs.Sprite(loader.getResult('linesSprite'), 'go').set({
                x: linePath[0],
                y: linePath[1],
                regX: 24,
                regY: 19,
                rotation: 0
            });
            let ballTween = createjs.Tween.get(ball)
                .wait(timeout)
                .to({rotation: rotation, guide: {path: linePath, orient: 'cw'}}, 700)
                .call(function (tween) {
                    winLinesContainer.removeChild(tween.target);
                });
            winLinesContainer.addChild(ball);
        }
    }

    let parameters = {
        font: 'normal 15px Arial',
        color: '#dddddd',
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

    function initLines(linesArr) {
        linesArray = linesArr;
        console.log('Lines are downloaded!');
        /* eslint-disable */
        linesCoord = parseLinesCoords(linesArr);
        linesContainer = new createjs.Container().set({
            name: 'linesContainer'
        });
        winLinesContainer = new createjs.Container().set({
            name: 'winLinesContainer'
        });
        let bgStage = canvas.getStages().bgStage;
        bgStage.addChildAt(winLinesContainer, 0);
        let gameStage = canvas.getStages().gameStage;
        gameStage.addChild(linesContainer);
        events.trigger('linesCreated', linesCoord);
        /* eslint-enable */
        linesIsParsed = true;
    }

    function drawLinesNumbers() {
        let i;
        let linesLength = linesCoord.length;
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        linesContainer.removeAllChildren();
        for (i = 0; i < linesLength; i++) {
            let linesNumber = new createjs.Text(i + 1, parameters.font, parameters.color).set({
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesNumber' + (i + 1),
                textAlign: 'center'
            });
            let linesPipka = new createjs.Sprite(loader.getResult('linesPipka'), 'on').set({
                x: parameters[i + 1].x,
                y: parameters[i + 1].y,
                name: 'linesPipka' + (i + 1),
                regX: 11,
                regY: 0
            });
            linesPipkas.push(linesPipka);
            linesNumbers.push(linesNumber);
            linesContainer.addChild(linesNumber, linesPipka);
        }
        let linesNumber = new createjs.Text(1, parameters.font, parameters.color).set({
            x: parameters[22].x,
            y: parameters[22].y,
            name: 'linesNumber22',
            textAlign: 'center'
        });
        let linesPipka = new createjs.Sprite(loader.getResult('linesPipka'), 'on').set({
            x: parameters[22].x,
            y: parameters[22].y,
            name: 'linesPipka22',
            regX: 11,
            regY: 0
        });
        /* eslint-enable */
        linesPipkas.push(linesPipka);
        linesNumbers.push(linesNumber);
        linesContainer.addChild(linesNumber, linesPipka);
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

    function parseLinesCoords(linesArray) {
        let i, j, len;
        let result = [];
        for (i = 0, len = linesArray.length; i < len; i++) {
            result[i] = [];
            for (j = 0; j < 5; j++) {
                let x = +linesArray[i][j][0];
                let y = +linesArray[i][j][1];
                let resultX = 192 * (x + 0.5);
                let resultY = 192 * (y + 0.5);
                let resultCoords = {
                    x: resultX,
                    y: resultY
                };
                result[i][j] = resultCoords;
            }
        }
        return result;
    }

    function saveWinLines(arr, rest) {
        linesResult = arr;
        winCoins = rest[0];
        winCents = rest[1];
        winData = parseLinesResult(linesResult);
    }

    function drawWinLine(data, winFlag) {
        let i;
        let stage = canvas.getStages().bgStage;
        let gameContainer = stage.getChildByName('gameContainer');
        let loader = preloader.getLoadResult();
        console.log('Win Line Data is:', data);
        let amount = data.amount;
        let win = data.win;
        let number = data.number;
        gameContainer.removeChild(gameContainer.getChildByName('winText'));
        gameContainer.removeChild(gameContainer.getChildByName('winLine'));
        if (winFlag) {
            let winLine = new createjs.Bitmap(loader.getResult('winLine')).set({
                x: linesCoord[number - 1][amount - 1].x + 60,
                y: linesCoord[number - 1][amount - 1].y + 40,
                name: 'winLine'
            });
            let winText = new createjs.Text(win, 'bold 40px Arial', '#f0e194').set({
                x: linesCoord[number - 1][amount - 1].x + 60,
                y: linesCoord[number - 1][amount - 1].y + 40,
                textAlign: 'center',
                textBaseline: 'middle',
                name: 'winText'
            });
            gameContainer.addChild(winLine, winText);
        }
        let line = linesArray[number - 1];
        for (i = 0; i < amount; i++) {
            let x = +line[i][0];
            let y = +line[i][1];
            let column = gameContainer.getChildByName('gameColumn' + i);
            let element = column.getChildByName('gameElement' + (y + 1));
            console.log('I find win Element:', element);
            element.gotoAndStop('win');
            let firstTween = createjs.Tween.get(element)
                .to({scaleX: 0.8, scaleY: 0.8}, 200)
                .to({scaleX: 1.15, scaleY: 1.15}, 700, createjs.Ease.bounceOut);
            // let scaleTween = createjs.Tween.get(element, {loop: true})
            //     .to({scaleX: 1, scaleY: 1}, 500)
            //     .to({scaleX: 1.1, scaleY: 1.1}, 500);
        }
    }

    function drawWinLines() {
        let i, j, len;
        if (winData[0]) {
            for (i = 0, len = winData.length; i < len; i++) {
                drawWinLine(winData[i], true);
                let winNumber = winData[i].number;
                let winPath = [];
                if (+winNumber !== -1) {
                    let winPipka = linesPipkas[winNumber - 1];
                    winPipka.gotoAndStop('off');
                    /* eslint-disable */
                    let winLine = new createjs.Shape();
                    /* eslint-enable */
                    for (j = 0; j < 5; j++) {
                        let currentCoords = linesCoord[winNumber - 1][j];
                        console.log(currentCoords);
                        winPath.push(currentCoords.x + 100, currentCoords.y + 75);
                        if (j === 0) {
                            winLine.graphics.s('rgba(244, 233, 205, 0.15)').setStrokeStyle(2).lt(currentCoords.x + 100, currentCoords.y + 75);
                        } else {
                            winLine.graphics.lt(currentCoords.x + 100, currentCoords.y + 75);
                        }
                    }
                    winLine.graphics.es();
                    winLines.push(winLine);
                    guideBall(winPath);
                    winLinesContainer.addChild(winLine);
                }
            }
        }
    }

    function removeWinLines() {
        let i, len;
        if (winData[0]) {
            for (i = 0, len = linesPipkas.length; i < len; i++) {
                let winPipka = linesPipkas[i];
                winPipka.gotoAndStop('on');
                if (winLines[i]) {
                    winLinesContainer.removeChild(winLines[i]);
                    // winLinesContainer.removeAllChildren();
                }
            }
            winData = [];
            winLines = [];
        }
    }

    function checkLines() {
        if (linesIsParsed) {
            /* eslint-disable */
            events.trigger('linesParsed');
            /* eslint-enable */
        }
    }

    /* eslint-disable */
    events.on('initLines', initLines);
    events.on('preloadComplete', checkLines);
    events.on('linesParsed', drawLinesNumbers);
    events.on('spinStart', removeWinLines);
    events.on('spinEnd', drawWinLines);
    events.on('spinWin', saveWinLines);
    /* eslint-enable */

    return {
        drawLinesNumbers,
        guideBall,
        drawWinLine
    };
})();
