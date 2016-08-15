/* eslint-disable no-undef */
const buttons = (function () {

    const c = createjs;

    const buttonsContainer = new c.Container().set({
        name: 'buttonsContainer',
        x: 1080
    });
    const buttonsCache = new c.Container().set({
        name: 'buttonsCache'
    });

    function handleSpinClick() {
        const rollState = storage.readState('roll');
        const fastRoll = storage.readState('fastRoll');
        const lockedRoll = storage.readState('lockedRoll');
        if (!lockedRoll) {
            if (rollState !== 'started') {
                roll.startRoll();
                spinButton.gotoAndStop('spinOff');
                TweenMax.to(spinButton, 0.5, {rotation: -45});
            }
            if (fastRoll) {
                spinButton.gotoAndStop('spinOff');
                storage.changeState('fastRoll', 'enabled');
                TweenMax.to(spinButton, 0.5, {rotation: 0});
            }
        }
    }

    function handleSoundClick() {
        if (storage.readState('roll') !== 'started') {
            const sound = storage.readState('sound');
            if (sound) {
                soundButton.gotoAndStop('soundOff');
                storage.changeState('sound', false);
            } else {
                soundButton.gotoAndStop('soundOut');
                storage.changeState('sound', true);
            }
            buttonsCache.updateCache();
        }
    }

    function handleMenuClick() {
        if (storage.readState('roll') !== 'started') {
            storage.changeState('menu', 'settings');
        }
    }

    function handleAutoClick() {
        if (storage.readState('roll') !== 'started') {
            storage.changeState('menu', 'auto');
        }
    }

    function handleBetClick() {
        if (storage.readState('roll') !== 'started') {
            storage.changeState('menu', 'bet');
        }
    }

    function drawButtons() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');
        const ss = loader.getResult('buttons');
        spinButton = new c.Sprite(ss, 'spinOut').set({
            name: 'spinButton',
            x: 100,
            y: 360,
            regX: 87,
            regY: 87
        });
        spinButton.on('click', handleSpinClick);
        autoButton = new c.Sprite(ss, 'autoOut').set({
            name: 'autoButton',
            x: 98,
            y: 210,
            regX: 50,
            regY: 50
        });
        autoButton.on('click', handleAutoClick);
        betButton = new c.Sprite(ss, 'betOut').set({
            name: 'betButton',
            x: 98,
            y: 510,
            regX: 50,
            regY: 50
        });
        betButton.on('click', handleBetClick);
        menuButton = new c.Sprite(ss, 'menuOut').set({
            name: 'menuButton',
            x: 60,
            y: 70
        });
        menuButton.on('click', handleMenuClick);
        soundButton = new c.Sprite(ss, 'soundOff').set({
            x: 60,
            y: 570,
            name: 'soundButton'
        });
        soundButton.on('click', handleSoundClick);

        storage.changeState('sound', false);
        buttonsCache.addChild(autoButton, betButton, menuButton, soundButton);
        buttonsContainer.addChild(spinButton, buttonsCache);
        stage.addChildAt(buttonsContainer, 1);
        buttonsCache.cache(0, 0, utils.width, utils.height);
    }

    // function checkButtonsState() {
    //     if (buttonsContainer) {
    //         let spinState = spin.getSpinState();
    //         if (autoMode) {
    //             autoSprite.gotoAndStop('auto');
    //             spinSprite.gotoAndStop('auto');
    //             menuSprite.gotoAndStop('down');
    //             betSprite.gotoAndStop('down');
    //         } else if (fsMode) {
    //             autoSprite.gotoAndStop('fs');
    //             betSprite.gotoAndStop('fs');
    //             spinSprite.gotoAndStop('auto');
    //             menuSprite.gotoAndStop('down');
    //         } else if (spinState.locked) {
    //             spinSprite.gotoAndStop('down');
    //         } else if (spinState.inProgress && spinState.fastSpinFlag) {
    //             handleSpin();
    //             spinSprite.gotoAndStop('over');
    //         } else if (spinState.inProgress) {
    //             menuSprite.gotoAndStop('down');
    //             autoSprite.gotoAndStop('down');
    //             spinSprite.gotoAndStop('down');
    //             betSprite.gotoAndStop('down');
    //             soundSprite.gotoAndStop('down');
    //         } else {
    //             handleSpin();
    //             autoSprite.gotoAndStop('out');
    //             menuSprite.gotoAndStop('out');
    //             spinSprite.gotoAndStop('out');
    //             betSprite.gotoAndStop('out');
    //             if (!soundMuted) {
    //                 soundSprite.gotoAndStop('out');
    //             } else {
    //                 soundSprite.gotoAndStop('down');
    //             }
    //         }
    //     }
    // }
    //
    // function startAutoButtons(count) {
    //     autoMode = true;
    //     autoText = new createjs.Text(count, "bold 75px Arial", "#90fd5a").set({
    //         x: 1180,
    //         y: 360,
    //         name: 'autoText',
    //         textAlign: 'center',
    //         textBaseline: 'middle',
    //         shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
    //     });
    //     buttonsContainer.addChild(autoText);
    //     setTimeout(function () {
    //         events.trigger('startAutoplay');
    //     }, 500);
    // }
    //
    // function stopAutoButtons() {
    //     autoSprite.gotoAndStop('down');
    //     autoMode = false;
    //     buttonsContainer.removeChild(autoText);
    // }
    //
    // function changeAutoText(newText) {
    //     autoText.text = newText;
    // }
    //
    // function startFSButtons(data) {
    //     fsMode = true;
    //     let count = data.fsCount;
    //     let level = data.fsLevel;
    //     let multi = data.fsMulti;
    //     let fsLevel = new createjs.Text(level, "50px bold Arial", "#90fd5a").set({
    //         name: 'fsLevel',
    //         x: autoSprite.x,
    //         y: autoSprite.y + 5,
    //         textAlign: 'center',
    //         textBaseline: 'middle',
    //         shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
    //     });
    //     let fsMulti = new createjs.Text(multi, "50px bold Arial", "#90fd5a").set({
    //         name: 'fsMulti',
    //         x: betSprite.x,
    //         y: betSprite.y + 5,
    //         textAlign: 'center',
    //         textBaseline: 'middle',
    //         shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
    //     });
    //     let fsCount = new createjs.Text(count, "85px bold Arial", "#90fd5a").set({
    //         name: 'fsCount',
    //         x: spinSprite.x,
    //         y: spinSprite.y,
    //         textAlign: 'center',
    //         textBaseline: 'middle',
    //         shadow: new createjs.Shadow('#90fd5a', 0, 0, 8)
    //     });
    //     buttonsContainer.addChild(fsLevel, fsMulti, fsCount);
    // }
    //
    // function updateFSButtons(newData) {
    //     if (buttonsContainer.getChildByName('fsCount')) {
    //         if (typeof newData.fsCount !== 'undefined') {
    //             var newCount = newData.fsCount;
    //             let fsCountText = buttonsContainer.getChildByName('fsCount').text;
    //             if (+fsCountText !== newCount) {
    //                 buttonsContainer.getChildByName('fsCount').text = newCount;
    //             }
    //         } else {
    //             buttonsContainer.getChildByName('fsCount').text = +buttonsContainer.getChildByName('fsCount').text - 1;
    //         }
    //         if (typeof newData.fsLevel !== 'undefined') {
    //             var newLevel = newData.fsLevel;
    //             let fsLevelText = buttonsContainer.getChildByName('fsLevel').text;
    //             if (+fsLevelText !== newLevel) {
    //                 console.warn('Level is Changed!');
    //                 buttonsContainer.getChildByName('fsLevel').text = newLevel;
    //             }
    //         }
    //         if (typeof newData.fsMulti !== 'undefined') {
    //             var newMulti = newData.fsMulti;
    //             let fsMultiText = buttonsContainer.getChildByName('fsMulti').text;
    //             if (+fsMultiText !== newMulti) {
    //                 console.warn('Multi is Changed!');
    //                 buttonsContainer.getChildByName('fsMulti').text = newMulti;
    //             }
    //         }
    //     }
    // }
    //
    // function stopFSButtons() {
    //     fsMode = false;
    //     let fsLevel = buttonsContainer.getChildByName('fsLevel');
    //     let fsMulti = buttonsContainer.getChildByName('fsMulti');
    //     let fsCount = buttonsContainer.getChildByName('fsCount');
    //     buttonsContainer.removeChild(fsLevel, fsMulti, fsCount);
    // }

    // events.on('preloadComplete', drawButtons);
    // events.on('initAutoplay', startAutoButtons);
    // events.on('stopAutoplay', stopAutoButtons);
    // events.on('drawFreeSpins', startFSButtons);
    // events.on('stopFreeSpins', stopFSButtons);
    // // events.on('newFreeSpin', updateFSButtons);
    // events.on('spinEnd', updateFSButtons);
    // events.on('spinStart', updateFSButtons);
    // createjs.Ticker.on('tick', checkButtonsState);

    function changeButtonsPosition(side) {
        const tl = new TimelineMax();
        if (side === 'right') {
            tl
                .to(buttonsContainer, 0.25, {x: 1280})
                .to(buttonsContainer, 0, {x: -300})
                .to(buttonsContainer, 0.25, {x: 14});
        }
        if (side === 'left') {
            tl
                .to(buttonsContainer, 0.25, {x: -300})
                .to(buttonsContainer, 0, {x: 1280})
                .to(buttonsContainer, 0.25, {x: 1080});
        }
        if (side === 'center') {
            const end = (buttonsContainer.x > 1000) ? 1300 : -300;
            tl
                .to(buttonsContainer, 0.25, {x: end});
        }
    }
    /**
     * [checkState checking Global State from storage]
     * @param  {String} state [State for checking]
     */
    function checkState(state) {
        if (state === 'bgDraw' && storage.readState('bgDraw') === 'main') {
            drawButtons();
        }
        if (state === 'side') {
            changeButtonsPosition(storage.readState(state));
        }
        if (state === 'fastRoll' && storage.readState(state) === true) {
            spinButton.gotoAndStop('spinOn');
        }
        if (state === 'roll') {
            if (storage.readState(state) === 'ended') {
                spinButton.gotoAndStop('spinOut');
                menuButton.gotoAndStop('menuOut');
                autoButton.gotoAndStop('autoOut');
                betButton.gotoAndStop('betOut');
                buttonsCache.updateCache();
                TweenMax.to(spinButton, 0.2, {rotation: 0});
            }
            if (storage.readState(state) === 'started') {
                menuButton.gotoAndStop('menuOff');
                autoButton.gotoAndStop('autoOff');
                betButton.gotoAndStop('betOff');
                buttonsCache.updateCache();
            }
        }
    }

    events.on('changeState', checkState);
})();
