/* eslint-disable no-undef */
const canvas = (function () {

    function initStage() {
        const stage = new createjs.Stage('stage');
        stage.snapToPixelEnabled = true;
        stage.enableMouseOver(10);
        // При использовании Green Sock будет по другому.
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', stage);
        // Запишем холст в Storage
        storage.write('stage', stage);
        storage.changeState('stage', true);
    }

    function fullScreen(e) {
        /* eslint-disable no-nested-ternary */
        /* eslint-disable no-unused-expressions */
        e.requestFullScreen ? e.requestFullScreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen();
    }

    function changeGamePosition(side) {
        const stage = storage.read('stage');
        const fg = stage.getChildByName('fgContainer');
        const bg = stage.getChildByName('bgContainer');
        const gameBG = bg.getChildByName('gameBG');
        const game = stage.getChildByName('gameContainer');
        const gameMask = game.mask;
        const balance = stage.getChildByName('balanceContainer');
        let delta;
        if (side === 'right' && storage.readState('side') !== 'right') {
            if (storage.readState('side') === 'left') {
                delta = '+=150';
            } else if (storage.readState('side') === 'center') {
                delta = '+=75';
            }
            storage.changeState('side', 'right');
        } else if (side === 'left' && storage.readState('side') !== 'left') {
            if (storage.readState('side') === 'right') {
                delta = '-=150';
            } else if (storage.readState('side') === 'center') {
                delta = '-=75';
            }
            storage.changeState('side', 'left');
        } else if (side === 'center' && storage.readState('side') !== 'center') {
            if (storage.readState('side') === 'left') {
                delta = '+=75';
            } else if (storage.readState('side') === 'right') {
                delta = '-=75';
            }
            storage.changeState('side', 'center');
        } else {
            return;
        }
        TweenMax.to([fg, game, gameMask, gameBG, balance], 0.5, {x: delta,
        onStart: function () {
            bg.uncache();
        },
        onComplete: function () {
            bg.cache(0, 0, utils.width, utils.height);
        }});
    }

    function checkState(state) {
        if (state === 'logged' && storage.readState('logged')) {
            initStage();
        }
    }

    events.on('changeState', checkState);

    return {
        fullScreen,
        changeGamePosition
    };
})();
