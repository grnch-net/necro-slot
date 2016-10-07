// import CreateJS
// import TweenMax
import { utils } from 'components/utils/utils';
import { storage } from 'components/storage/storage';
import { events } from 'components/events/events';
import { handleInfoClick } from 'components/menu/settings';
import { handleSpinClick,
        handleSoundClick,
        handleMenuClick,
        handleAutoClick,
        handleBetClick } from 'components/buttons/handlers';
import { parameters } from 'components/balance/parameters';

/* eslint-disable curly */
export let buttons = (function () {

    let config;
    const defaultConfig = {
        buttonsX: 1080,
        buttonsLeftX: 14,
        buttonsWidth: 300
    };

    const c = createjs;
    let menuButton;
    let autoButton;
    let spinButton;
    let betButton;
    let soundButton;

    const buttonsContainer = new c.Container().set({
        name: 'buttonsContainer'
    });
    const buttonsCache = new c.Container().set({
        name: 'buttonsCache'
    });

    function start(configObj) {
        config = configObj || defaultConfig;
    }

    function _mobileDrawButtons(stage, loader) {
        const ss = loader.getResult('buttons');

        buttonsContainer.x = config.buttonsX;

        spinButton = new c.Sprite(ss, 'spinOut').set({
            name: 'spinButton',
            x: 100, // Magic Numbers
            y: 360 // Magic Numbers
        });
        utils.getCenterPoint(spinButton);
        spinButton.on('click', handleSpinClick);

        autoButton = new c.Sprite(ss, 'autoOut').set({
            name: 'autoButton',
            x: 98, // Magic Numbers
            y: 210 // Magic Numbers
        });
        utils.getCenterPoint(autoButton);
        autoButton.on('click', handleAutoClick);

        betButton = new c.Sprite(ss, 'betOut').set({
            name: 'betButton',
            x: 98, // Magic Numbers
            y: 510 // Magic Numbers
        });
        utils.getCenterPoint(betButton);
        betButton.on('click', handleBetClick);

        menuButton = new c.Sprite(ss, 'menuOut').set({
            name: 'menuButton',
            x: 98.5, // Magic Numbers
            y: 108.5 // Magic Numbers
        });
        utils.getCenterPoint(menuButton);
        menuButton.on('click', handleMenuClick);

        soundButton = new c.Sprite(ss, 'soundOut').set({
            name: 'soundButton',
            x: 98.5, // Magic Numbers
            y: 608.5 // Magic Numbers
        });
        utils.getCenterPoint(soundButton);
        soundButton.on('click', handleSoundClick);

        storage.changeState('sound', true);

        buttonsCache.addChild(autoButton, betButton, menuButton, soundButton);
        buttonsCache.cache(0, 0, utils.width, utils.height);
        buttonsContainer.addChild(spinButton, buttonsCache);

        stage.addChildAt(buttonsContainer, 1);
    }

    function _desktopDrawButtons(stage, loader) {
        const param = parameters.desktop;

        const ssMainScreen = loader.getResult('mainScreenDesctop');
        const ssOverall = loader.getResult('overall');

        const optionsBg = new c.Sprite(ssMainScreen, 'optionsBg').set({
            x: 197,
            y: 551
        });

        const optionsInterface = new c.Bitmap(loader.getResult('optionsInterface')).set({
            x: 255,
            y: 576
        });

        const minusPrefabBtn = new c.Sprite(ssMainScreen, 'minus');
        const plusPrefabBtn = new c.Sprite(ssMainScreen, 'plus');

        const spinBtn = new c.Sprite(ssMainScreen, 'spinBtn').set({
            name: 'spinBtn',
            x: 639,
            y: 618
        });
        utils.getCenterPoint(spinBtn);
        spinBtn.on('click', handleSpinClick);
        spinBtn.on('mouseover', () => {
            if (spinBtn.currentAnimation === 'spinBtn') {
                spinBtn.gotoAndStop('spinBtnOn');
            }
            if (spinBtn.currentAnimation === 'stopBtn') {
                spinBtn.gotoAndStop('stopBtnOn');
            }
        });
        spinBtn.on('mouseout', () => {
            if (spinBtn.currentAnimation === 'spinBtnOn') {
                spinBtn.gotoAndStop('spinBtn');
            }
            if (spinBtn.currentAnimation === 'stopBtnOn') {
                spinBtn.gotoAndStop('stopBtn');
            }
        });

        let linesTxt = new c.Text('10', param.font, param.color).set(param.lines);

        const coinContainer = new c.Container();
        const coinValue = storage.read('currentBalance').coinsValue;
        let coinTxt = new c.Text(coinValue, param.font, param.color).set(param.coinTxt);
        const minusCoinBtn = minusPrefabBtn.clone().set({
            x: 825,
            y: 628
        });
        minusCoinBtn.on('click', () => {
            createjs.Sound.play('buttonClickSound');
            events.trigger('menu:changeCoins', false);
            coinTxt.text = storage.read('currentBalance').coinsValue;
        });
        const plusCoinBtn = plusPrefabBtn.clone().set({
            x: 910,
            y: 628
        });
        plusCoinBtn.on('click', () => {
            createjs.Sound.play('buttonClickSound');
            events.trigger('menu:changeCoins', true);
            coinTxt.text = storage.read('currentBalance').coinsValue;
        });
        coinContainer.addChild(coinTxt, minusCoinBtn, plusCoinBtn);

        const betLevelContainer = new c.Container();
        const betValue = storage.read('currentBalance').betValue;
        let betLevelTxt = new c.Text(betValue, param.font, param.color).set(param.betLevel);
        const minusBetLevelBtn = minusPrefabBtn.clone().set({
            x: 350,
            y: 629
        });
        minusBetLevelBtn.on('click', () => {
            createjs.Sound.play('buttonClickSound');
            events.trigger('menu:changeBet', false);
            betLevelTxt.text = storage.read('currentBalance').betValue;
        });
        const plusBetLevelBtn = plusPrefabBtn.clone().set({
            x: 419,
            y: 629
        });
        plusBetLevelBtn.on('click', () => {
            createjs.Sound.play('buttonClickSound');
            events.trigger('menu:changeBet', true);
            betLevelTxt.text = storage.read('currentBalance').betValue;
        });
        betLevelContainer.addChild(betLevelTxt, minusBetLevelBtn, plusBetLevelBtn);

        const maxBetBtn = new c.Sprite(ssMainScreen, 'maxBetBtn').set({
            x: 698,
            y: 569
        });
        maxBetBtn.on('click', () => {
            createjs.Sound.play('buttonClickSound');
            events.trigger('menu:maxBet', true);
            betLevelTxt.text = storage.read('currentBalance').betValue;
        });
        maxBetBtn.on('mouseover', () => {
            maxBetBtn.gotoAndStop('maxBetBtnOn');
        });
        maxBetBtn.on('mouseout', () => {
            maxBetBtn.gotoAndStop('maxBetBtn');
        });

        // Auto Spin
        const tlAutoSpin = new TimelineMax();
        const autoSpinContainer = new c.Container().set({
            name: 'autoSpinContainer',
            x: 99
        });
        const autoSpinBtn = new c.Sprite(ssMainScreen, 'autoSpinBtn').set({
            name: 'autoSpinBtn',
            mode: 'idle',
            x: 418, // normal: 519
            y: 569
        });
        autoSpinBtn.on('click', () => {
            switch (autoSpinBtn.mode) {
                case 'idle':
                    tlAutoSpin.to(autoSpinContainer, 0.4, {x: 0});
                    // autoSpinBtn.gotoAndStop('autoSpinBtnOn');
                    autoSpinBtn.mode = 'on';
                    break;
                case 'on':
                    tlAutoSpin.to(autoSpinContainer, 0.4, {x: 99});
                    // autoSpinBtn.gotoAndStop('autoSpinBtn');
                    autoSpinBtn.mode = 'idle';
                    break;
                case 'off':
                    c.Sound.play('buttonClickSound');
                    storage.changeState('autoplay', 'ended');
                    events.trigger('buttons:stopAutoplay');
                    break;
                default:
                    return;
            }
        });
        autoSpinBtn.on('mouseover', () => {
            if (autoSpinBtn.mode !== 'off') autoSpinBtn.gotoAndStop('autoSpinBtnOn');
        });
        autoSpinBtn.on('mouseout', () => {
            if (autoSpinBtn.mode !== 'off') autoSpinBtn.gotoAndStop('autoSpinBtn');
        });
        const currAutoCountTxt = new c.Text('0', 'bold 28px Helvetica', param.orangeColor).set({
            name: 'currAutoCountTxt',
            textAlign: 'center',
            x: 456,
            y: 600,
            visible: false
        });
        const autoSpinArea = new c.Sprite(ssMainScreen, 'autoSpinArea').set({
            x: 481,
            y: 574
        });
        autoSpinContainer.addChild(autoSpinArea);

        const autoCountTxtPrefab = new c.Text('0', 'bold 16px Helvetica', param.orangeColor).set({
            textAlign: 'center'
        });

        const createAutoCountBtn = function (count, rectX, rectY, txtX, txtY) {
            const container = new c.Container();
            const rect = new createjs.Shape();
            rect.graphics.beginFill('orange').drawRect(rectX, rectY, 50, 26);
            rect.alpha = 0.01;
            const autoTxt = autoCountTxtPrefab.clone().set({
                text: count,
                x: txtX,
                y: txtY
            });
            container.addChild(rect, autoTxt);
            container.on('mouseover', () => {
                rect.alpha = 0.4;
            });
            container.on('mouseout', () => {
                rect.alpha = 0.01;
            });
            container.on('click', () => {
                currAutoCountTxt.visible = true;
                tlAutoSpin.to(autoSpinContainer, 0.4, {x: 99});
                autoSpinBtn.gotoAndStop('autoSpinBtnOff');
                autoSpinBtn.mode = 'off';
                createjs.Sound.play('buttonClickSound');
                storage.write('autoCount', count);
                events.trigger('menu:startAutoplay', count);
                storage.changeState('autoplay', 'started');
            });
            autoSpinContainer.addChild(container);
        };
        createAutoCountBtn(10, 484, 578, 508, 581);
        createAutoCountBtn(100, 535, 578, 559, 581);
        createAutoCountBtn(25, 484, 606, 509, 609);
        createAutoCountBtn(250, 535, 606, 560, 609);
        createAutoCountBtn(50, 484, 634, 509, 636);
        createAutoCountBtn(500, 535, 634, 560, 636);
        autoSpinContainer.addChild(autoSpinBtn, currAutoCountTxt);
        // end AutoSpin

        const infoBtn = new c.Sprite(ssOverall, 'infoBtn').set({
            x: 970,
            y: 627
        });
        infoBtn.on('click', handleInfoClick);

        const staticBtnContainer = new c.Container({name: 'staticBtnContainer'});

        const settingsBtn = new c.Sprite(ssOverall, 'settings').set({
            x: 210,
            y: 690
        });
        let isSettings = false;
        settingsBtn.on('click', () => {
            if (isSettings) {
                settingsBtn.gotoAndStop('settings');
            } else {
                settingsBtn.gotoAndStop('settingsOn');
            }
            isSettings = !isSettings;
        });

        const soundBtn = new c.Sprite(ssOverall, 'soundOn').set({
            x: 240,
            y: 690
        });
        let isSound = true;
        storage.changeState('sound', isSound);
        soundBtn.on('click', () => {
            handleSoundClick();
            if (isSound) {
                soundBtn.gotoAndStop('sound');
            } else {
                soundBtn.gotoAndStop('soundOn');
            }
            isSound = !isSound;
        });

        const helpBtn = new c.Sprite(ssOverall, 'help').set({
            x: 270,
            y: 690
        });
        let isHelp = false;
        helpBtn.on('click', () => {
            if (isHelp) {
                helpBtn.gotoAndStop('help');
            } else {
                helpBtn.gotoAndStop('helpOn');
            }
            isHelp = !isHelp;
        });

        const fastSpinBtn = new c.Sprite(ssOverall, 'reload').set({
            x: 300,
            y: 690
        });
        let isFastSpin = storage.readState('fastSpinSetting');
        fastSpinBtn.on('click', () => {
            if (isFastSpin) {
                storage.changeState('fastSpinSetting', false);
                fastSpinBtn.gotoAndStop('reload');
            } else {
                storage.changeState('fastSpinSetting', true);
                fastSpinBtn.gotoAndStop('reloadOn');
            }
            isFastSpin = !isFastSpin;
        });

        staticBtnContainer.addChild(settingsBtn, soundBtn, helpBtn, fastSpinBtn);
        buttonsContainer.addChild(optionsBg, optionsInterface, maxBetBtn, infoBtn, betLevelContainer, coinContainer, linesTxt, autoSpinContainer, spinBtn);
        stage.addChildAt(buttonsContainer, staticBtnContainer, stage.getChildIndex(stage.getChildByName('balanceContainer')));
    }

    function drawButtons() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');

        if ( storage.read('isMobile') ) {
            _mobileDrawButtons(stage, loader);
        } else { // desktop
            _desktopDrawButtons(stage, loader);
        }
    }

    function changeSide(side) {
        const tl = new TimelineMax();
        if (side === 'right') {
            tl
                .to(buttonsContainer, 0.25, {x: utils.width})
                .to(buttonsContainer, 0, {x: -config.buttonsWidth})
                .to(buttonsContainer, 0.25, {x: config.buttonsLeftX});
        }
        if (side === 'left') {
            tl
                .to(buttonsContainer, 0.25, {x: -config.buttonsWidth})
                .to(buttonsContainer, 0, {x: utils.width})
                .to(buttonsContainer, 0.25, {x: config.buttonsX});
        }
    }

    function writeAutoplay() {
        const autoCount = storage.read('autoCount');
        if ( storage.read('isMobile') ) {
            spinButton.gotoAndStop('spinAuto');
            autoButton.gotoAndStop('autoStop');
            buttonsCache.updateCache();
            const autoText = new c.Text(autoCount, '70px Helvetica', '#90fd5a').set({
                name: 'autoText',
                textAlign: 'center',
                textBaseline: 'middle',
                x: spinButton.x,
                y: spinButton.y,
                shadow: new c.Shadow('#90fd5a', 0, 0, 8)
            });
            buttonsContainer.addChild(autoText);
        } else { // desktop
            const autoSpinContainer = buttonsContainer.getChildByName('autoSpinContainer');
            const currAutoCountTxt = autoSpinContainer.getChildByName('currAutoCountTxt');
            currAutoCountTxt.text = autoCount;
        }
    }

    function removeAutoplay() {
        if ( storage.read('isMobile') ) {
            spinButton.gotoAndStop('spinOut');
            autoButton.gotoAndStop('autoOut');
            buttonsCache.updateCache();
            const autoText = buttonsContainer.getChildByName('autoText');
            buttonsContainer.removeChild(autoText);
        } else {
            const autoSpinContainer = buttonsContainer.getChildByName('autoSpinContainer');
            const currAutoCountTxt = autoSpinContainer.getChildByName('currAutoCountTxt');
            const autoSpinBtn = autoSpinContainer.getChildByName('autoSpinBtn');
            currAutoCountTxt.visible = false;
            autoSpinBtn.gotoAndStop('autoSpinBtn');
            autoSpinBtn.mode = 'idle';
        }
    }

    function updateAutoplay() {
        const autoCount = storage.read('autoCount');
        if ( storage.read('isMobile') ) {
            if (buttonsContainer.getChildByName('autoText')) {
                const autoText = buttonsContainer.getChildByName('autoText');
                autoText.text = autoCount;
            }
        } else {
            const autoSpinContainer = buttonsContainer.getChildByName('autoSpinContainer');
            const currAutoCountTxt = autoSpinContainer.getChildByName('currAutoCountTxt');
            currAutoCountTxt.text = autoCount;
        }
    }

    function endRoll() {
        if (storage.readState('autoplay') === 'started') return;
        if ( storage.read('isMobile') ) {
            spinButton.gotoAndStop('spinOut');
            menuButton.gotoAndStop('menuOut');
            autoButton.gotoAndStop('autoOut');
            betButton.gotoAndStop('betOut');
            buttonsCache.updateCache();
            TweenMax.to(spinButton, 0.2, {rotation: 0});
        } else { // desktop
            const spinBtn = buttonsContainer.getChildByName('spinBtn');
            spinBtn.gotoAndStop('spinBtn');
        }
    }

    function fastRoll() {
        if (storage.readState('autoplay') === 'started') return;
        if ( storage.read('isMobile') ) {
            spinButton.gotoAndStop('spinOn');
        }
    }

    function startRoll() {
        if (storage.readState('autoplay') === 'started') return;
        if ( storage.read('isMobile') ) {
            menuButton.gotoAndStop('menuOff');
            autoButton.gotoAndStop('autoOff');
            betButton.gotoAndStop('betOff');
            buttonsCache.updateCache();
        } else {
            const spinBtn = buttonsContainer.getChildByName('spinBtn');
            spinBtn.gotoAndStop('stopBtnOn');
        }
    }

    function changeVisibility() {
        buttonsContainer.visible = !buttonsContainer.visible;
    }

    return {
        start,
        drawButtons,
        changeVisibility,
        changeSide,
        writeAutoplay,
        updateAutoplay,
        removeAutoplay,
        startRoll,
        fastRoll,
        endRoll
    };

})();
