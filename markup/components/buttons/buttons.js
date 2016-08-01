let buttons = (function () {

    let buttonsContainer;
    let menuSprite;
    let autoSprite;
    let spinSprite;
    let betSprite;
    let soundSprite;
    let soundMuted = true;
    let autoMode;
    let autoText;
    let fsMode;

    function handleSpin() {
        /* eslint-disable */
        let spinClicked = 0;
        spinSprite.on('mousedown', function(event) {
            spinClicked++;
            if (spinClicked === 1) {
                event.remove();
                if (spinSprite.currentAnimation !== 'down' && spinSprite.currentAnimation !== 'auto') {
                    spinSprite.gotoAndStop('down');
                    let spinState = spin.getSpinState();
                    if (!spinState.locked) {
                        createjs.Tween.get(spinSprite)
                        .to({scaleX: 0.95, scaleY: 0.95}, 75)
                        .to({scaleX: 1, scaleY: 1}, 75);
                        if (spinState.inProgress && spinState.fastSpinFlag && !spinState.locked) {
                            spin.fastSpin();
                        } else if (!spinState.inProgress && !spinState.locked) {
                            spin.spinStart();
                        }
                    }
                }
            }
        }, null, true);
    }

    function drawButtons(loader) {
        buttonsContainer = new createjs.Container();
        spinSprite = new createjs.Sprite(loader.getResult('spinButton')).set({
            x: 1180,
            y: 360,
            regX: 87,
            regY: 87,
            name: 'spinSprite'
        });
        spinSprite.gotoAndStop('out');
        // let spinHelper = new createjs.ButtonHelper(spinSprite);
        handleSpin();

        autoSprite = new createjs.Sprite(loader.getResult('autoButton')).set({
            x: 1128 + 50,
            y: 160 + 50,
            regX: 50,
            regY: 50,
            name: 'autoSprite'
        });
        autoSprite.gotoAndStop('out');
        autoSprite.on('click', function() {
            if (autoSprite.currentAnimation === 'out') {
                menu.showMenu('auto');
            } else if (autoSprite.currentAnimation === 'auto') {
                stopAutoButtons();
                autoplay.stopAutoplay();
            }
        });
        // let autoHelper = new createjs.ButtonHelper(autoSprite);
        betSprite = new createjs.Sprite(loader.getResult('betButton')).set({
            x: 1128 + 50,
            y: 460 + 50,
            regX: 50,
            regY: 50,
            name: 'betSprite'
        });
        betSprite.gotoAndStop('out');
        betSprite.on('click', function() {
            if (betSprite.currentAnimation === 'out') {
                menu.showMenu('bet');
            }
        });
        // let betHelper = new createjs.ButtonHelper(betSprite);
        menuSprite = new createjs.Sprite(loader.getResult('menuButton')).set({
            x: 1140,
            y: 70,
            name: 'menuSprite'
        });
        menuSprite.gotoAndStop('out');
        menuSprite.on('click', function() {
            if (menuSprite.currentAnimation === 'out') {
                menu.showMenu('settings');
            }
        });
        // let menuHelper = new createjs.ButtonHelper(menuSprite);
        soundSprite = new createjs.Sprite(loader.getResult('soundButton')).set({
            x: 1140,
            y: 570,
            name: 'soundSprite'
        });
        if (soundMuted) {
            soundSprite.gotoAndStop('down');
        }
        soundSprite.on('click', function() {
            soundMuted = !soundMuted;
            if (soundMuted) {
                soundSprite.gotoAndStop('down');
            } else {
                soundSprite.gotoAndStop('out');
            }
        });
        // let soundHelper = new createjs.ButtonHelper(soundSprite);
        buttonsContainer.addChild(spinSprite, autoSprite, betSprite, menuSprite, soundSprite);
        let stage = canvas.getStages().gameStage;
        stage.enableMouseOver(10);
        stage.addChild(buttonsContainer);
    }

    function checkButtonsState() {
        if (buttonsContainer) {
            let spinState = spin.getSpinState();
            if (autoMode) {
                autoSprite.gotoAndStop('auto');
                spinSprite.gotoAndStop('auto');
                menuSprite.gotoAndStop('down');
                betSprite.gotoAndStop('down');
            } else if (fsMode) {
                autoSprite.gotoAndStop('fs');
                betSprite.gotoAndStop('fs');
                spinSprite.gotoAndStop('auto');
                menuSprite.gotoAndStop('down');
            } else if (spinState.locked) {
                spinSprite.gotoAndStop('down');
            } else if (spinState.inProgress && spinState.fastSpinFlag) {
                handleSpin();
                spinSprite.gotoAndStop('over');
            } else if (spinState.inProgress) {
                menuSprite.gotoAndStop('down');
                autoSprite.gotoAndStop('down');
                spinSprite.gotoAndStop('down');
                betSprite.gotoAndStop('down');
                soundSprite.gotoAndStop('down');
            } else {
                handleSpin();
                autoSprite.gotoAndStop('out');
                menuSprite.gotoAndStop('out');
                spinSprite.gotoAndStop('out');
                betSprite.gotoAndStop('out');
                if (!soundMuted) {
                    soundSprite.gotoAndStop('out');
                } else {
                    soundSprite.gotoAndStop('down');
                }
            }
        }
    }

    function startAutoButtons(count) {
        autoMode = true;
        autoText = new createjs.Text(count, "bold 75px Arial", "#90fd5a").set({
            x: 1180,
            y: 360,
            name: 'autoText',
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
        });
        buttonsContainer.addChild(autoText);
        setTimeout(function () {
            events.trigger('startAutoplay');
        }, 500);
    }

    function stopAutoButtons() {
        autoSprite.gotoAndStop('down');
        autoMode = false;
        buttonsContainer.removeChild(autoText);
    }

    function changeAutoText(newText) {
        autoText.text = newText;
    }

    function startFSButtons(data) {
        fsMode = true;
        let count = data.fsCount;
        let level = data.fsLevel;
        let multi = data.fsMulti;
        let fsLevel = new createjs.Text(level, "50px bold Arial", "#90fd5a").set({
            name: 'fsLevel',
            x: autoSprite.x,
            y: autoSprite.y + 5,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
        });
        let fsMulti = new createjs.Text(multi, "50px bold Arial", "#90fd5a").set({
            name: 'fsMulti',
            x: betSprite.x,
            y: betSprite.y + 5,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
        });
        let fsCount = new createjs.Text(count, "85px bold Arial", "#90fd5a").set({
            name: 'fsCount',
            x: spinSprite.x,
            y: spinSprite.y,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
        });
        buttonsContainer.addChild(fsLevel, fsMulti, fsCount);
    }

    function updateFSButtons(newData) {
        if (buttonsContainer.getChildByName('fsCount')) {
            if (typeof newData.fsCount !== 'undefined') {
                var newCount = newData.fsCount;
                let fsCountText = buttonsContainer.getChildByName('fsCount').text;
                if (+fsCountText !== newCount) {
                    buttonsContainer.getChildByName('fsCount').text = newCount;
                }
            } else {
                buttonsContainer.getChildByName('fsCount').text = +buttonsContainer.getChildByName('fsCount').text - 1;
            }
            if (typeof newData.fsLevel !== 'undefined') {
                var newLevel = newData.fsLevel;
                let fsLevelText = buttonsContainer.getChildByName('fsLevel').text;
                if (+fsLevelText !== newLevel) {
                    console.warn('Level is Changed!');
                    buttonsContainer.getChildByName('fsLevel').text = newLevel;
                }
            }
            if (typeof newData.fsMulti !== 'undefined') {
                var newMulti = newData.fsMulti;
                let fsMultiText = buttonsContainer.getChildByName('fsMulti').text;
                if (+fsMultiText !== newMulti) {
                    console.warn('Multi is Changed!');
                    buttonsContainer.getChildByName('fsMulti').text = newMulti;
                }
            }
        }
    }

    function stopFSButtons() {
        fsMode = false;
        let fsLevel = buttonsContainer.getChildByName('fsLevel');
        let fsMulti = buttonsContainer.getChildByName('fsMulti');
        let fsCount = buttonsContainer.getChildByName('fsCount');
        buttonsContainer.removeChild(fsLevel, fsMulti, fsCount);
    }

    events.on('preloadComplete', drawButtons);
    events.on('initAutoplay', startAutoButtons);
    events.on('stopAutoplay', stopAutoButtons);
    events.on('drawFreeSpins', startFSButtons);
    events.on('stopFreeSpins', stopFSButtons);
    // events.on('newFreeSpin', updateFSButtons);
    events.on('spinEnd', updateFSButtons);
    events.on('spinStart', updateFSButtons);
    createjs.Ticker.on('tick', checkButtonsState);
    /* eslint-enable */
    return {
        changeAutoText,
        stopAutoButtons
    };
})();
