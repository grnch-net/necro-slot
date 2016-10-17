import { utils } from 'components/utils/utils';
import { storage } from 'components/storage/storage';
import { events } from 'components/events/events';

import { balance } from 'components/balance/balance';
import { roll } from 'components/roll/roll';
import { handleInfoClick } from 'components/menu/settings';

// /* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable no-use-before-define */
export let freeSpin = (function () {
    const c = createjs;
    let stage;
    let pressureDiscs;

    let currentFreeSpins;
    // let config.currentMulti = 2;
    // let config.currentLevel = 0;
    // let config.currentCount = 15;
    // let config.currentWinCoins = 0;
    // let config.currentWinCents = 0;
    let fsWheels;
    let fsStartData;
    let fsTotalWin;
    let fireTimer;
    let fsTotalCount;
    let fsLastWin;
    let currCultistCount = 0;
    let currMultiplier = 2;
    let fsMulti;
    let culstistsStack;
    let barabanSound;

    let isClawMode;
    let isMobile;

    let config;
    const defaultConfig = {
        currentMulti: 2,
        currentLevel: 0,
        currentCount: 15,
        currentWinCoins: 0,
        currentWinCents: 0
    };

    function start(configObj) {
        config = configObj || defaultConfig;
        isClawMode = storage.read('isClawMode');
        isMobile = storage.read('isMobile');
    }

    function hideBalance() {
        const balanceContainer = stage.getChildByName('balanceContainer');
        const coinsSum = balanceContainer.getChildByName('coinsSum');
        const betSum = balanceContainer.getChildByName('betSum');
        if (isMobile) {
            const coinsSumText = balanceContainer.getChildByName('coinsSumText');
            const betSumText = balanceContainer.getChildByName('betSumText');
            betSum.visible = coinsSum.visible = betSumText.visible = coinsSumText.visible = false;
        } else { // desktop
            coinsSum.set({
                x: 1006,
                y: 642
            });
            betSum.set({
                x: 349,
                y: 579
            });
        }
    }

    function showFsBalance() {
        const balanceContainer = stage.getChildByName('balanceContainer');

        if (config.currentWinCents) {
            storage.read('currentBalance').winCash = (config.currentWinCents / 100).toFixed(2);
        }

        let totalWinSum;
        if (isMobile) {
            const totalWinText = new createjs.Text('Total Win:', '24px Helvetica', '#dddddd').set({
                name: 'totalWinText',
                y: 658,
                textAlign: 'center'
            });
            totalWinSum = new createjs.Text(config.currentWinCoins + '', '24px Helvetica', '#e8b075').set({
                name: 'totalWinSum',
                y: 658,
                textAlign: 'center',
                shadow: new c.Shadow('#e8b075', 0, 0, 15)
            });
            totalWinText.x = utils.width / 2 - 10 - totalWinText.getMeasuredWidth();
            totalWinSum.x = totalWinText.x + 20 + totalWinText.getMeasuredWidth() / 2 + totalWinSum.getMeasuredWidth() / 2;
            balanceContainer.addChild(totalWinText);
        } else { // desktop
            totalWinSum = new createjs.Text(config.currentWinCoins + '', 'normal 14px Helvetica', '#dddddd').set({
                name: 'totalWinSum',
                x: 1007,
                y: 610,
                textAlign: 'center',
                shadow: new c.Shadow('#e8b075', 0, 0, 15)
            });
        }
        balanceContainer.addChild(totalWinSum);
        balanceContainer.updateCache();
    }

    function moveClock(clockContainer) {
        const tl = new TimelineMax({repeat: -1});
        tl.to(clockContainer, 1.5, { y: 5 })
        .to(clockContainer, 1, { y: -8 })
        .to(clockContainer, 1.5, { y: 7 })
        .to(clockContainer, 1, { y: 0 });
    }

    function _createParticleS(container, count) {
        const loader = storage.read('loadResult');
        const ssFSScreen = loader.getResult('fsScreen');

        for (let i = 0; i < count; i++) {
            let random = Math.random() * 0.7 + 0.3;
            let localPos = container.globalToLocal(utils.width / 2, utils.height / 2 - 40 - Math.round( random * 200 ) );
            let _clone = new c.Sprite(ssFSScreen, 'bloha' + (i % 13) ).set({
                x: localPos.x,
                y: localPos.y,
                scaleX: random,
                scaleY: random,
                alpha: 1 - random,
                rotation: Math.round( Math.random() * 360 )
            });
            container.addChild(_clone);
            container.set({
                rotation: 360 / count * i
            });
        }

        container.set({
            rotation: 0
        });
    }

    function _createContainers(parent, count = 13, clockwise = 1) {
        let course = ( clockwise % 2 ) ? 1 : -1;

        let container = new createjs.Container().set({
            x: 0,
            y: 0
        });

        parent.addChild(container);
        _createParticleS(container, count);

        let tl = new TimelineMax({ repeat: -1});
        tl.to(container, 20 + Math.round( Math.random() * 30 ), { rotation: 360 * course, ease: Linear.easeNone});
    }

    function _drawFsBgMobile(loader) {
        const ssFSScreen = loader.getResult('fsScreen');
        // Balance data invisible
        const bgContainer = stage.getChildByName('bgContainer');
        const fgContainer = stage.getChildByName('fgContainer');

        const gameBG = fgContainer.getChildByName('gameBG');
        gameBG.visible = false;

        const fsTableContainer = new createjs.Container().set({
            name: 'fsTableContainer',
            x: 230,
            y: 75
        });
        const fsTotalTable = new c.Sprite(ssFSScreen, 'fsTotalTable').set({
            name: 'fsTotalTable',
            regX: 125,
            regY: 125,
            scaleX: 0.65,
            scaleY: 0.65
        });
        fsTotalCount = new createjs.BitmapText(config.currentCount + '', loader.getResult('numbers')).set({
            name: 'fsTotalCount',
            x: 5,
            scaleX: 0.3,
            scaleY: 0.3
        });
        let bounds = fsTotalCount.getBounds();
        fsTotalCount.regX = bounds.width / 2;
        fsTotalCount.regY = bounds.height / 2;

        utils.getCenterPoint(fsTotalCount);
        fsTableContainer.addChild(fsTotalTable, fsTotalCount);
        stage.addChildAt(fsTableContainer, stage.getChildIndex(stage.getChildByName('fgContainer')) + 1);

        const fsLeftContainer = new createjs.Container().set({
            name: 'fsLeftContainer'
        });
        const cultistBlack1 = new c.Sprite(ssFSScreen, 'cultistBlack1').set({
            name: 'cultistBlack1',
            x: 30,
            y: 0,
            scaleX: 0.6,
            scaleY: 0.6
        });
        const cultistBlack2 = new c.Sprite(ssFSScreen, 'cultistBlack2').set({
            name: 'cultistBlack2',
            x: 30,
            y: 120,
            scaleX: 0.6,
            scaleY: 0.6
        });
        const cultistBlack3 = new c.Sprite(ssFSScreen, 'cultistBlack3').set({
            name: 'cultistBlack3',
            x: 30,
            y: 250,
            scaleX: 0.6,
            scaleY: 0.6
        });

        const ssCustisti = loader.getResult('new_elements');
        let cultists1 = new createjs.Sprite(ssCustisti, '15-n').set({
            name: 'cultists',
            x: -15,
            y: 94,
            scaleX: 0.7,
            scaleY: 0.7,
            regX: 120,
            regY: 115,
            visible: false
        });
        let cultists2 = new createjs.Sprite(ssCustisti, '14-n').set({
            name: 'cultists',
            x: -10,
            y: -27,
            scaleX: 0.7,
            scaleY: 0.7,
            regX: 120,
            regY: 115,
            visible: false
        });
        let cultists3 = new createjs.Sprite(ssCustisti, '16-n').set({
            name: 'cultists',
            x: 52,
            y: 217,
            scaleX: 0.7,
            scaleY: 0.7,
            regX: 120,
            regY: 115,
            skewY: 180,
            visible: false
        });
        culstistsStack = [
            cultists2,
            cultists1,
            cultists3
        ];
        const cultContainer = new createjs.Container().set({
            x: 77,
            y: 73
        });
        cultContainer.addChild(cultists3, cultists2, cultists1);
        fsLeftContainer.addChild(cultistBlack1, cultistBlack2, cultistBlack3, cultContainer);


        fgContainer.uncache();

        const fonContainer = new c.Container().set({
            name: 'fsBG'
        });
        const fon0 = new createjs.Bitmap(loader.getResult('fsBG'));
        const fon2 = new createjs.Bitmap(loader.getResult('fsFonTest2')).set({
            x: utils.width / 2,
            y: utils.height / 2,
            regX: 684 / 2,
            regY: 684 / 2,
            scaleX: 1.7,
            scaleY: 1.7,
            alpha: 0.5
        });
        let tlFon = new TimelineMax({ repeat: -1 });
        tlFon.to(fon2, 300, { rotation: 360 });

        fonContainer.addChild(fon0, fon2);
        bgContainer.addChildAt(fonContainer, 2);

        const clockContainer = new c.Container().set({
            name: 'clockContainer'
        });
        const particleContainer = new c.Container().set({
            name: 'particleContainerRight',
            x: utils.width / 2,
            y: utils.height / 2
        });
        let containerCount = 4;
        let particlesInContainer = 13;
        for (let i = 0; i < containerCount; i++) {
            _createContainers(particleContainer, particlesInContainer, i);
        }
        particleContainer.set({
            x: 90,
            y: utils.height - 200
        });

        let _mask = new createjs.Shape();
        _mask.graphics.beginFill( 'rgba(0, 0, 0, 1)' ).drawRect(0, 190, utils.width, 500);
        particleContainer.mask = _mask;

        const bookTextContainer = new c.Container().set({
            name: 'bookTextContainer',
            x: 81,
            y: utils.height - 195,
            rotation: -20
        });
        const fsX = new createjs.BitmapText('+', loader.getResult('numbers')).set({
            name: 'fsX',
            scaleX: 0.14,
            scaleY: 0.14
        });
        let fsXBounds = fsTotalCount.getBounds();
        fsX.set({
            regX: fsXBounds.width / 2,
            regY: fsXBounds.height / 2
        });
        fsMulti = new createjs.BitmapText(currMultiplier + '', loader.getResult('numbers')).set({
            name: 'fsMulti',
            x: 24,
            y: -8,
            scaleX: 0.2,
            scaleY: 0.2
        });
        let multiBounds = fsTotalCount.getBounds();
        fsMulti.set({
            regX: multiBounds.width / 2,
            regY: multiBounds.height / 2
        });
        bookTextContainer.addChild(fsX, fsMulti);

        const bookTop = new c.Sprite(ssFSScreen, 'book1').set({
            name: 'bookTop',
            x: 117,
            y: utils.height - 227,
            regX: 120,
            regY: 120,
            rotation: -20
        });
        const bookBot = new c.Sprite(ssFSScreen, 'bookBot').set({
            name: 'bookBot',
            x: 123,
            y: utils.height - 229,
            regX: 120,
            regY: 120,
            rotation: -20
        });
        clockContainer.addChild(bookBot, bookTop, bookTextContainer, particleContainer);

        stage.addChild(fsLeftContainer, clockContainer);
        moveClock(clockContainer);
    }

    function _drawFsBgDesktop(loader) {
        const ssFSScreen = loader.getResult('fsScreen');
        const ssOverall = loader.getResult('overall');
        // Balance data invisible
        const bgContainer = stage.getChildByName('bgContainer');
        const fgContainer = stage.getChildByName('fgContainer');

        const gameBG = fgContainer.getChildByName('gameBG');
        gameBG.visible = false;

        const fonContainer = new c.Container().set({
            name: 'fsBG'
        });
        const fon0 = new createjs.Bitmap(loader.getResult('fsBG'));
        const fon2 = new createjs.Bitmap(loader.getResult('fsFonTest2')).set({
            x: utils.width / 2,
            y: utils.height / 2,
            regX: 684 / 2,
            regY: 684 / 2,
            scaleX: 1.7,
            scaleY: 1.7,
            alpha: 0.5
        });
        let tlFon = new TimelineMax({ repeat: -1 });
        tlFon.to(fon2, 300, { rotation: 360 });
        fonContainer.addChild(fon0, fon2);
        bgContainer.addChildAt(fonContainer, 2);

        const fsInterfaceContainer = new c.Container().set({
            name: 'fsInterfaceContainer'
        });

        const fsInterfaceBg = new c.Bitmap(loader.getResult('fsInterfaceBg')).set({
            x: 197,
            y: 551,
            scaleX: 0.67,
            scaleY: 0.67
        });
        const fsInterface = new c.Bitmap(loader.getResult('fsInterface')).set({
            x: 199,
            y: 559,
            alpha: 1
        });

        const infoBtn = new c.Sprite(ssOverall, 'infoBtn').set({
            x: 224,
            y: 573
        });
        infoBtn.on('click', handleInfoClick);

        const fsTableContainer = new createjs.Container().set({
            name: 'fsTableContainer',
            x: 772,
            y: 605
        });
        const fsTotalTable = new c.Sprite(ssFSScreen, 'fsTotalTable').set({
            name: 'fsTotalTable',
            regX: 125,
            regY: 125,
            scaleX: 0.65,
            scaleY: 0.65
        });
        fsTotalCount = new createjs.BitmapText(config.currentCount + '', loader.getResult('numbers')).set({
            name: 'fsTotalCount',
            x: 5,
            scaleX: 0.3,
            scaleY: 0.3
        });
        let bounds = fsTotalCount.getBounds();
        fsTotalCount.regX = bounds.width / 2;
        fsTotalCount.regY = bounds.height / 2;

        fsLastWin = new createjs.Text('0', 'normal 14px Helvetica', '#dddddd').set({
            name: 'totalWinSum',
            x: 1007,
            y: 579,
            textAlign: 'center',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        });

        const linesTxt = new createjs.Text( 10, 'normal 14px Helvetica', '#dddddd').set({
            name: 'totalWinSum',
            x: 242,
            y: 634,
            textAlign: 'center',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        });

        const betLevelTxt = new createjs.Text( storage.read('currentBalance').betValue, 'normal 14px Helvetica', '#dddddd').set({
            name: 'totalWinSum',
            x: 298,
            y: 634,
            textAlign: 'center',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        });

        const countValueTxt = new createjs.Text( storage.read('currentBalance').coinsValue, 'normal 14px Helvetica', '#dddddd').set({
            name: 'totalWinSum',
            x: 362,
            y: 634,
            textAlign: 'center',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        });

        utils.getCenterPoint(fsTotalCount);
        fsTableContainer.addChild(fsTotalTable, fsTotalCount);

        const cultistBlack1 = new c.Sprite(ssFSScreen, 'cultistBlack1').set({
            name: 'cultistBlack1',
            x: 393,
            y: 540,
            scaleX: 0.7,
            scaleY: 0.7
        });
        const cultistBlack2 = new c.Sprite(ssFSScreen, 'cultistBlack2').set({
            name: 'cultistBlack2',
            x: 470,
            y: 530,
            scaleX: 0.7,
            scaleY: 0.7
        });
        const cultistBlack3 = new c.Sprite(ssFSScreen, 'cultistBlack3').set({
            name: 'cultistBlack3',
            x: 550,
            y: 541,
            scaleX: 0.7,
            scaleY: 0.7
        });

        const ssCustisti = loader.getResult('new_elements');
        let cultists1 = new createjs.Sprite(ssCustisti, '11-n').set({
            name: 'cultists',
            x: 395,
            y: 480,
            scaleX: 0.9,
            scaleY: 0.9,
            visible: false
        });
        let cultists2 = new createjs.Sprite(ssCustisti, '12-n').set({
            name: 'cultists',
            x: 335,
            y: 505,
            scaleX: 0.8,
            scaleY: 0.8,
            visible: false
        });
        let cultists3 = new createjs.Sprite(ssCustisti, '13-n').set({
            name: 'cultists',
            x: 762,
            y: 498,
            scaleX: 0.8,
            scaleY: 0.8,
            skewY: 180,
            visible: false
        });

        culstistsStack = [
            cultists2,
            cultists1,
            cultists3
        ];

        const clockContainer = new c.Container().set({
            name: 'clockContainer'
        });
        const particleContainer = new c.Container().set({
            name: 'particleContainerRight',
            x: utils.width / 2,
            y: utils.height / 2
        });
        let containerCount = 4;
        let particlesInContainer = 13;
        for (let i = 0; i < containerCount; i++) {
            _createContainers(particleContainer, particlesInContainer, i);
        }
        particleContainer.set({
            x: 110,
            y: utils.height - 225
        });

        let _mask = new createjs.Shape();
        _mask.graphics.beginFill( 'rgba(0, 0, 0, 1)' ).drawRect(0, 190, utils.width, 500);
        particleContainer.mask = _mask;

        const bookTextContainer = new c.Container().set({
            name: 'bookTextContainer',
            x: 89,
            y: utils.height - 215,
            rotation: -20
        });
        const fsX = new createjs.BitmapText('+', loader.getResult('numbers')).set({
            name: 'fsX',
            scaleX: 0.2,
            scaleY: 0.2
        });
        let fsXBounds = fsTotalCount.getBounds();
        fsX.set({
            regX: fsXBounds.width / 2,
            regY: fsXBounds.height / 2
        });
        fsMulti = new createjs.BitmapText(currMultiplier + '', loader.getResult('numbers')).set({
            name: 'fsMulti',
            x: 34,
            y: -15,
            scaleX: 0.3,
            scaleY: 0.3
        });
        let multiBounds = fsTotalCount.getBounds();
        fsMulti.set({
            regX: multiBounds.width / 2,
            regY: multiBounds.height / 2
        });
        bookTextContainer.addChild(fsX, fsMulti);

        const bookTop = new c.Sprite(ssFSScreen, 'book1').set({
            name: 'bookTop',
            x: 140,
            y: utils.height - 267,
            regX: 120,
            regY: 120,
            scaleX: 1.4,
            scaleY: 1.4,
            rotation: -20
        });
        const bookBot = new c.Sprite(ssFSScreen, 'bookBot').set({
            name: 'bookBot',
            x: 146,
            y: utils.height - 269,
            regX: 120,
            regY: 120,
            scaleX: 1.4,
            scaleY: 1.4,
            rotation: -20
        });
        clockContainer.addChild(bookBot, bookTop, bookTextContainer, particleContainer);
        moveClock(clockContainer);

        fsInterfaceContainer.addChild(fsInterfaceBg, fsInterface, fsTableContainer, infoBtn, fsLastWin, cultistBlack1, cultistBlack3, cultistBlack2, cultists2, cultists3, cultists1, linesTxt, betLevelTxt, countValueTxt);
        stage.addChildAt(fsInterfaceContainer, clockContainer, stage.getChildIndex(stage.getChildByName('fgContainer')) + 1);
    }

    function drawFreeSpinsBG() {
        pressureDiscs = [];
        stage = storage.read('stage');
        const loader = storage.read('loadResult');

        hideBalance();
        showFsBalance();

        if (isMobile) {
            _drawFsBgMobile(loader);
        } else { // desktop
            _drawFsBgDesktop(loader);
        }

    }

    function getFirework() {
        if (stage.getChildByName('fsLogoContainer')) {
            const loader = storage.read('loadResult');
            const fsLogoContainer = stage.getChildByName('fsLogoContainer');
            const amount = Math.round(Math.random() * 5 + 3);
            for (let i = 0; i < amount; i++) {
                const firework = new c.Sprite(loader.getResult('firework'), 'fire').set({
                    x: fsLogoContainer.x + Math.random() * 400 - 250 - 300,
                    y: fsLogoContainer.y + Math.random() * 200 - 100 - 100
                });
                firework.on('animationend', function () {
                    fsLogoContainer.removeChild(firework);
                });
                fsLogoContainer.addChildAt(firework, 0);
            }
        }
    }

    function getMultiLight() {
        const loader = storage.read('loadResult');
        const fgContainer = stage.getChildByName('fgContainer');
        const pressureContainer = fgContainer.getChildByName('pressureContainer');
        const light = new c.Bitmap(loader.getResult('redLight'));
        const lightArray = [];
        const lightX = 244;
        const lightY = 598;
        for (let i = 0; i < pressureDiscs.length; i++) {
            const newLight = light.clone(true);
            newLight.x = lightX + i * 132 - 24;
            newLight.y = lightY - 28;
            newLight.alpha = 0;
            pressureContainer.addChild(newLight);
            lightArray.push(newLight);
        }
        const tl = new TimelineMax();
        tl.staggerTo(lightArray, 0.15, {alpha: 1}, 0.05)
                .staggerTo(lightArray, 0.15, {alpha: 0, onComplete: function () {
                    pressureContainer.removeChild(this.target);
                }}, 0.05, '+=0.3');
        const time = Math.round(Math.random() * 5000 + 3000);
        fireTimer = setTimeout(getMultiLight, time);
    }

    function getFireLogo() {
        const loader = storage.read('loadResult');
        const logoTop = new createjs.Bitmap(loader.getResult('logoTop')).set({
            name: 'logoTop'
        });
        const logoFire = new createjs.Bitmap(loader.getResult('logoFire')).set({
            name: 'logoFire'
        });
        const fsLogoContainer = new createjs.Container().set({
            name: 'fsLogoContainer',
            x: 507,
            y: -8,
            alpha: 0
        });
        TweenMax.to(fsLogoContainer, 0.3, {alpha: 1});
        let tl = new TimelineMax({repeat: -1, yoyo: true});
        tl.to(logoFire, 0.8, {alpha: 0.7});
        fsLogoContainer.addChild(logoTop, logoFire);
        const fgContainer = stage.getChildByName('fgContainer');
        stage.addChildAt(fsLogoContainer, stage.getChildIndex(fgContainer) + 1);
    }

    function initFreeSpins(data) {
        currCultistCount = 0;
        currMultiplier = 2;
        storage.write('lastCultist', 0);

        const buttonsContainer = stage.getChildByName('buttonsContainer');
        buttonsContainer.visible = false;
        fsTotalWin = 0;
        drawFreeSpinsBG();
        if (isMobile) {
            events.trigger('menu:changeSide', 'right');
        }
    }

    function transitionFreeSpins(data) {
        createjs.Sound.stop('ambientSound');
        createjs.Sound.play('bonusPerehodSound');

        fsStartData = data;
        if (data) {
            config.currentLevel = data.level - 1;
            config.currentMulti = data.multi;
            config.currentCount = data.count;
            config.currentWinCoins = data.currentWinCoins;
            config.currentWinCents = data.currentWinCents;
        } else {
            config.currentCount = storage.read('rollResponse').TotalFreeSpins;
        }
        const loader = storage.read('loadResult');
        stage = storage.read('stage');

        let transitionContainer = new createjs.Container().set({
            name: 'transitionContainer'
        });
        let transitionBG = new createjs.Shape().set({
            name: 'transitionBG',
            alpha: 0.8
        });
        transitionBG.graphics.beginFill('#000').drawRect(0, 0, utils.width, utils.height);
        let transitionPopup = new createjs.Bitmap(loader.getResult('transitionPopup')).set({
            name: 'transitionPopup',
            x: utils.width / 2,
            y: utils.height / 2 - 50,
            regX: 350,
            regY: 200,
            alpha: 1
        });
        let transitionLuchi = new createjs.Bitmap(loader.getResult('luchi')).set({
            name: 'transitionLuchi',
            x: utils.width / 2,
            y: utils.height / 2 - 50,
            regX: 410,
            regY: 403,
            alpha: 0.5
        });

        let transitionWinText = new createjs.BitmapText(config.currentCount + '', loader.getResult('numbers')).set({
            name: 'transitionWinText',
            scaleX: 0.9,
            scaleY: 0.9,
            alpha: 1
        });
        let bounds = transitionWinText.getBounds();
        transitionWinText.x = utils.width / 2 - 27;
        transitionWinText.y = utils.height / 2 - 90;
        transitionWinText.regX = bounds.width / 2;
        transitionWinText.regY = bounds.height / 2;
        const ssOther = loader.getResult('other');
        let transitionButton = new c.Sprite(ssOther, 'But').set({
            name: 'transitionButton',
            x: utils.width / 2,
            y: utils.height / 2 + 150,
            regX: 118,
            regY: 47.5,
            alpha: 1
        });

        let tl0 = new TimelineMax({repeat: -1});
        tl0.from(transitionLuchi, 15, {rotation: -360, ease: Power0.easeNone});

        transitionContainer.on('click', function () {
            setTimeout(() => {
                createjs.Sound.stop('bonusPerehodSound');
                createjs.Sound.play('fsAmbientSound', {loop: -1});
            }, 100);

            let tl = new TimelineMax();
            tl.to(transitionBG, 0.4, {alpha: 1})
                .call(function () {
                    events.trigger('drawFreeSpins', fsStartData);
                    setTimeout(function () {
                        events.trigger('startFreeSpin');
                    }, 1000);
                    createjs.Tween.get(transitionContainer)
                        .to({alpha: 0}, 500);
                });
        }, transitionContainer, true);

        transitionContainer.addChild(transitionBG, transitionPopup, transitionLuchi, transitionWinText, transitionButton);
        stage.addChild(transitionContainer);
        let tl = new TimelineMax();
        tl.from(transitionBG, 0.4, {alpha: 0})
            .from(transitionPopup, 0.4, {y: 0, alpha: 0}, '-=0.2')
            .from(transitionLuchi, 0.4, {alpha: 0}, '-=0.2')
            .from(transitionWinText, 1.2, {scaleX: 0.1, scaleY: 0.1, alpha: 0, ease: Elastic.easeOut.config(1, 0.3)}, '-=0.2')
            .from(transitionButton, 0.4, {alpha: 0}, '-=0.2');
    }

    function countFreeSpins(number) {
        const _lastWinCount = storage.read('rollResponse').TotalWinCoins;
        if (!isMobile) fsLastWin.text = (_lastWinCount) ? _lastWinCount + '' : '';
        fsTotalCount.text = number + '';
        const countBounds = fsTotalCount.getBounds();
        fsTotalCount.regX = countBounds.width / 2;
        fsTotalCount.regY = countBounds.height / 2;
        console.log('I must change fsCount', number);
    }

    function startFreeSpin() {
        roll.startRoll();
    }

    function stopFreeSpins() {
        clearTimeout(fireTimer);
        storage.changeState('lockedMenu', false);
        const bgContainer = stage.getChildByName('bgContainer');
        const fgContainer = stage.getChildByName('fgContainer');
        const buttonsContainer = stage.getChildByName('buttonsContainer');
        buttonsContainer.visible = true;
        const fsBG = bgContainer.getChildByName('fsBG');

        const gameBG = fgContainer.getChildByName('gameBG');
        gameBG.visible = true;

        const balanceContainer = stage.getChildByName('balanceContainer');
        const totalWinText = balanceContainer.getChildByName('totalWinText');
        const totalWinSum = balanceContainer.getChildByName('totalWinSum');

        const betSum = balanceContainer.getChildByName('betSum');
        const coinsSum = balanceContainer.getChildByName('coinsSum');

        if (isMobile) {
            balanceContainer.removeChild(totalWinText, totalWinSum);

            const coinsSumText = balanceContainer.getChildByName('coinsSumText');
            const betSumText = balanceContainer.getChildByName('betSumText');
            betSum.visible = coinsSum.visible = betSumText.visible = coinsSumText.visible = true;
        } else {
            balanceContainer.removeChild(totalWinSum);

            coinsSum.set({
                x: 960,
                y: 580
            });
            betSum.set({
                x: 360,
                y: 581
            });

            stage.removeChild(stage.getChildByName('fsInterfaceContainer'));
        }
        balanceContainer.updateCache();

        bgContainer.removeChild(fsBG);
        bgContainer.uncache();
        fgContainer.uncache();
        stage.removeChild(stage.getChildByName('fsLogoContainer'));
        stage.removeChild(stage.getChildByName('fsTableContainer'));
        stage.removeChild(stage.getChildByName('clockContainer'));
        stage.removeChild(stage.getChildByName('fsLeftContainer'));

        if (isMobile) {
            storage.changeState('side', 'left');
            events.trigger('menu:changeSide', 'left');
        }

    }

    function countTotalWin(data) {
        if (data.Mode === 'fsBonus') {
            const balanceContainer = stage.getChildByName('balanceContainer');
            const totalWinSum = balanceContainer.getChildByName('totalWinSum');
            const totalWinText = balanceContainer.getChildByName('totalWinText');
            totalWinSum.text = +totalWinSum.text + data.TotalWinCoins;
            fsTotalWin = totalWinSum.text;
            if (isMobile) {
                totalWinSum.x = totalWinText.x + 20 + totalWinText.getMeasuredWidth() / 2 + totalWinSum.getMeasuredWidth() / 2;
            }
            balanceContainer.updateCache();
        }
    }

    function finishFreeSpins() {
        let loader = storage.read('loadResult');
        const response = storage.read('freeRollResponse');
        const ssOther = loader.getResult('other');
        storage.read('currentBalance').coinsCash = ((+storage.read('currentBalance').coinsCash * 100 + +storage.read('currentBalance').winCash * 100) / 100).toFixed(2);
        storage.read('currentBalance').coinsSum = +storage.read('currentBalance').coinsSum + response.CoinsWinCounter + response.TotalWinCoins;
        balance.updateBalance();

        setTimeout(() => {
            console.warn('I am remove ambient!');
            createjs.Sound.stop('fsAmbientSound');
            createjs.Sound.play('bonusPerehodSound');
        }, 100);

        let finishContainer = new createjs.Container().set({
            name: 'finishContainer'
        });
        let finishBG = new createjs.Shape().set({
            name: 'finishBG',
            alpha: 0
        });
        finishBG.graphics.beginFill('#000').drawRect(0, 0, utils.width, utils.height);
        finishContainer.addChild(finishBG);

        let tl2 = new TimelineMax();
        tl2.to(finishBG, 0.5, {alpha: 1, onComplete: () => {
            events.trigger('stopFreeSpins');

            let finishText = new createjs.Sprite(ssOther, 'totalWin').set({
                name: 'finishText',
                x: utils.width / 2,
                y: utils.height / 2 - 250,
                regX: 500,
                regY: 150,
                scaleX: 0.1, scaleY: 0.1, alpha: 0
            });

            const ssCustisti = loader.getResult('cultisti');
            let cultists1 = new createjs.Sprite(ssCustisti, '12-w').set({
                name: 'cultists',
                x: utils.width / 2 - 390,
                y: utils.height / 2 - 20,
                scaleX: 1,
                scaleY: 1
            });
            let cultists2 = new createjs.Sprite(ssCustisti, '11-w').set({
                name: 'cultists',
                x: utils.width / 2 - 300,
                y: utils.height / 2 - 90,
                scaleX: 1.2,
                scaleY: 1.2
            });
            let cultists3 = new createjs.Sprite(ssCustisti, '13-w').set({
                name: 'cultists',
                x: utils.width / 2 + 380,
                y: utils.height / 2 - 25,
                scaleX: 1,
                scaleY: 1,
                skewY: 180
            });
            let finishWinText = new createjs.BitmapText(fsTotalWin + '', loader.getResult('numbers')).set({
                name: 'transitionWinText',
                x: utils.width / 2 - 40,
                y: utils.height / 2 - 110,
                scaleX: 0.1, scaleY: 0.1, alpha: 0
            });
            let bounds = finishWinText.getBounds();
            finishWinText.regX = bounds.width / 2;
            finishWinText.regY = bounds.height / 2;

            let luchi = new createjs.Bitmap(loader.getResult('luchi')).set({
                name: 'transitionLuchi',
                x: utils.width / 2,
                y: utils.height / 2 - 50,
                regX: 410,
                regY: 403,
                alpha: 0.5
            });
            let tl4 = new TimelineMax({repeat: -1});
            tl4.from(luchi, 15, {rotation: -360, ease: Power0.easeNone});

            let finishButton = new createjs.Sprite(ssOther, 'But').set({
                name: 'finishButton',
                x: utils.width / 2,
                y: utils.height / 2 + 255,
                regX: 118,
                regY: 47.5,
                alpha: 1
            });

            finishButton.on('click', function () {
                createjs.Sound.stop('bonusPerehodSound');
                createjs.Sound.play('ambientSound', {loop: -1});
                createjs.Tween.get(finishContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeChild(finishContainer);
                });
            });

            let cultistConteiner = new createjs.Container().set({ alpha: 0 });
            cultistConteiner.addChild(luchi, cultists1, cultists3, cultists2, finishButton);

            finishContainer.addChild(cultistConteiner, finishText, finishWinText);

            let tl1 = new TimelineMax();
            tl1.to(finishBG, 0.5, {alpha: 0.8});

            let tl = new TimelineMax();
            tl.to(cultistConteiner, 1, {alpha: 1})
                .to(finishText, 1, {scaleX: 0.7, scaleY: 0.7, alpha: 1, ease: Elastic.easeOut.config(1, 0.3)}, '-=0.2')
                .to(finishWinText, 1, {scaleX: 1.1, scaleY: 1.1, alpha: 1, ease: Elastic.easeOut.config(1, 0.3)}, '-=0.2');
        }});

        stage.addChild(finishContainer);
    }

    function showTotalFreeSpins(num) {
        const loader = storage.read('loadResult');
        const fsTable = new createjs.Bitmap(loader.getResult('fsTable')).set({
            x: 730,
            y: 180
        });
        let tableBounds = fsTable.getBounds();
        fsTable.regX = tableBounds.width / 2;
        fsTable.regY = tableBounds.height / 2;
        const fsTableText = new createjs.Bitmap(loader.getResult('plus3')).set({
            x: fsTable.x,
            y: fsTable.y + 35
        });
        let textBounds = fsTableText.getBounds();
        fsTableText.regX = textBounds.width / 2;
        fsTableText.regY = textBounds.height / 2;
        const fsTableContainer = new createjs.Container().set({
            name: 'fsTableContainer'
        });
        const tableMask = new createjs.Shape();
        tableMask.graphics.beginFill('#fff').drawRect(0, 88, utils.width, utils.height);
        fsTableContainer.mask = tableMask;
        fsTableContainer.addChild(fsTable, fsTableText);
        stage.addChild(fsTableContainer);
        let tl = new TimelineMax();
        tl.from(fsTableContainer, 0.3, {y: -200, alpha: 0})
            .to(fsTableContainer, 0.3, {y: -200, alpha: 0, onComplete: function () {
                stage.removeChild(fsTableContainer);
            }}, '+=1.5');
    }

    function addMultiBonus(data) {
        let multiStage = storage.read('stage');
        let loader = storage.read('loadResult');

        let multiContainer = new createjs.Container().set({
            name: 'multiContainer',
            alpha: 0
        });
        let multiBG = new createjs.Bitmap(loader.getResult('multiBG')).set({
            name: 'multiBG'
        });
        let multiTitle = new createjs.Bitmap(loader.getResult('multiTitle')).set({
            name: 'multiTitle',
            x: (1280 - 868) / 2,
            y: 100
        });
        let multiCoins = new createjs.Bitmap(loader.getResult('multiCoins')).set({
            name: 'multiCoins',
            x: (1280 - 192) / 2,
            y: 440
        });
        let multiWinText = new createjs.BitmapText('1000', loader.getResult('fsText')).set({
            x: 1280 / 2,
            y: 680 / 2
        });
        let multiBounds = multiWinText.getBounds();
        multiWinText.regX = multiBounds.width / 2;
        multiWinText.regY = multiBounds.height / 2;
        let multiButton = new createjs.Bitmap(loader.getResult('But')).set({
            name: 'multiButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        multiContainer.addChild(multiBG, multiTitle, multiCoins, multiWinText, multiButton);
        createjs.Tween.get(multiContainer)
            .to({alpha: 1}, 500);

        multiButton.on('click', function () {
            utils.request('_Ready/', storage.read('sessionID'))
                .then((response) => {
                    if (response.ErrorCode === 0) {
                        events.trigger('startFreeSpin');
                    }
                });
            createjs.Tween.get(multiContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    multiStage.removeChild(multiContainer);
                });
        });
        multiStage.addChild(multiContainer);
    }

    function countMoney(response) {
        storage.read('currentBalance').winCash = ((response.CentsWinCounter + response.TotalWinCents) / 100).toFixed(2);
        balance.updateBalance();
    }

    function checkState(state) {
        if (state === 'roll' && storage.readState(state) === 'ended') {
            if (storage.readState('mode') === 'fsBonus') {
                barabanSound.stop();
                countTotalWin(storage.read('rollResponse'));
                countFreeSpins(storage.read('freeRollResponse').TotalFreeSpins);
                countMoney(storage.read('freeRollResponse'));

                if (storage.read('rollResponse').LinesResult.length && storage.readState('fsMulti') == 7) {
                    getFirework();
                }
            }
        }
        if (state === 'roll' && storage.readState(state) === 'started') {
            if (storage.readState('mode') === 'fsBonus') {
                barabanSound = createjs.Sound.play('barabanSound');
                countTotalWin(storage.read('rollResponse').TotalFreeSpins - 1);
            }
        }
    }

    function eatCultist() {
        if (currCultistCount > 2) {
            setTimeout(() => {
                let cult = culstistsStack[currCultistCount % 3];
                cult.visible = true;
                cult.gotoAndStop((14 + currCultistCount) + '-n');
            }, (currCultistCount - 2) * 100 + 500);
        } else {
            let cult = culstistsStack[currCultistCount];
            cult.visible = true;
            cult.gotoAndStop((14 + currCultistCount) + '-n');
        }

        if (++currCultistCount === 3) {
            setTimeout(() => {
                fsMulti.text = ++currMultiplier + '';
                currCultistCount = 0;
                culstistsStack[0].set({
                    scaleX: 0.8,
                    scaleY: 0.8
                });
                culstistsStack[0].gotoAndPlay('14-h');
                culstistsStack[1].set({
                    scaleX: 0.8,
                    scaleY: 0.8
                });
                culstistsStack[1].gotoAndPlay('15-h');
                culstistsStack[2].set({
                    scaleX: 0.8,
                    scaleY: 0.8
                });
                culstistsStack[2].gotoAndPlay('16-h');

                // let tl0 = new TimelineMax({repeat: -1});
                // tl0.to(culstistsStack[0], 0.3, {scaleX: 1.2, scaleY: 1.2});
                // let tl1 = new TimelineMax({repeat: -1});
                // tl1.to(culstistsStack[1], 0.3, {scaleX: 1.2, scaleY: 1.2});
                // let tl2 = new TimelineMax({repeat: -1});
                // tl2.to(culstistsStack[2], 0.3, {scaleX: 1.2, scaleY: 1.2});

                setTimeout(() => {
                    culstistsStack[0].visible = false;
                    culstistsStack[1].visible = false;
                    culstistsStack[2].visible = false;
                }, 300);
            }, 500);
        }
        storage.write('lastCultist', currCultistCount % 3);
    }

    events.on('initFreeSpins', transitionFreeSpins);
    events.on('drawFreeSpins', initFreeSpins);
    events.on('stopFreeSpins', stopFreeSpins);
    events.on('finishFreeSpins', finishFreeSpins);
    events.on('startFreeSpin', startFreeSpin);
    events.on('spinEnd', countTotalWin);
    events.on('multiplierBonus', addMultiBonus);
    events.on('changeState', checkState);
    return {
        start,
        initFreeSpins,
        stopFreeSpins,
        startFreeSpin,
        drawFreeSpinsBG,
        getMultiLight,
        showTotalFreeSpins,
        eatCultist
    };
})();
