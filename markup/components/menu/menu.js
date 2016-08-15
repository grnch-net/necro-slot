/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const menu = (function () {

    const c = createjs;
    const menuWidth = 300;

    let menuContainer = new c.Container().set({
        name: 'menuContainer'
    });
    let delta;
    let tl;

    function showMenu(name) {
        const loader = storage.read('loadResult');
        const stage = storage.read('stage');
        const ss = loader.getResult('menu');
        const overlay = new c.Shape().set({
            name: 'overlay',
            alpha: 0
        });
        overlay.graphics.beginFill('rgba(0, 0, 0, 0.5)').drawRect(0, 0, utils.width, utils.height);
        overlay.on('click', hideMenu);
        menuContainer.on('click', function (e) {
            e.stopPropagation();
        });

        stage.addChild(overlay, menuContainer);

        const menuBG = new createjs.Shape().set({
            name: 'menuBG'
        });
        menuBG.graphics.beginFill('#000').drawRect(0, 0, menuWidth, utils.height);
        const menuBorder = new createjs.Shape().set({
            name: 'menuBorder'
        });
        menuBorder.graphics.beginFill('rgba(255, 255, 255, 0.3)').drawRect(0, 0, 2, utils.height);
        if (storage.readState('side') === 'right') {
            menuBorder.x = menuWidth - 2;
        } else {
            menuBorder.x = 0;
        }
        const menuBack = new c.Sprite(loader.getResult('buttons'), 'backOut').set({
            name: 'menuBack',
            x: (menuWidth - 105) / 2,
            y: 584
        });
        menuBack.on('click', function () {
            hideMenu();
        });
        menuContainer.addChild(menuBG, menuBorder, menuBack);

        tl = new TimelineMax();
        tl
            .to(overlay, 0.5, {alpha: 1})
            .to(menuContainer, 0.5, {x: delta}, 0);

        if (name === 'bet') {
            const menuBetTitle = new c.Sprite(ss, 'setBet').set({
                name: 'menuBetTitle',
                x: (menuWidth - 185) / 2,
                y: 35
            });
            const menuMaxBet = new c.Sprite(ss, 'maxbetOff').set({
                name: 'menuMaxBet',
                x: (menuWidth - 135) / 2,
                y: 100
            });
            const menuBetMinus = new c.Sprite(ss, 'minusOut').set({
                name: 'menuBetMinus',
                x: 40,
                y: 326
            });
            const menuBetPlus = new c.Sprite(ss, 'plusOut').set({
                name: 'menuBetPlus',
                x: 208,
                y: 326
            });
            const betValue = storage.read('currentBalance').betValue;
            const coinsValue = storage.read('currentBalance').coinsValue;
            const menuBetText = new c.Text(betValue, 'bold 60px Arial', '#90fd5a').set({
                name: 'menuBetText',
                textAlign: 'center',
                textBaseline: 'middle',
                x: 152,
                y: 346,
                shadow: new c.Shadow('#90fd5a', 0, 0, 8)
            });
            const menuCoinsText = new c.Text(coinsValue, 'bold 35px Arial', '#90fd5a').set({
                name: 'menuCoinsText',
                textAlign: 'center',
                textBaseline: 'middle',
                x: 152,
                y: 514,
                shadow: new c.Shadow('#90fd5a', 0, 0, 8)
            });
            const menuCoinMinus = new c.Sprite(ss, 'minusOut').set({
                name: 'menuCoinMinus',
                x: 40,
                y: 485
            });
            const menuCoinPlus = new c.Sprite(ss, 'plusOut').set({
                name: 'menuCoinPlus',
                x: 208,
                y: 485
            });
            menuMaxBet.on('click', function () {
                balance.changeBet(true, true);
                balance.changeCoins(true, true);
                menuBetText.text = storage.read('currentBalance').betValue;
                menuCoinsText.text = storage.read('currentBalance').coinsValue;
            });
            menuCoinPlus.on('click', function () {
                balance.changeCoins(true);
                menuCoinsText.text = storage.read('currentBalance').coinsValue;
            });
            menuCoinMinus.on('click', function () {
                balance.changeCoins(false);
                menuCoinsText.text = storage.read('currentBalance').coinsValue;
            });
            menuBetPlus.on('click', function () {
                balance.changeBet(true);
                menuBetText.text = storage.read('currentBalance').betValue;
            });
            menuBetMinus.on('click', function () {
                balance.changeBet(false);
                menuBetText.text = storage.read('currentBalance').betValue;
            });
            const menuBetLevel = new c.Sprite(ss, 'betLevel').set({
                name: 'menuBetLevel',
                x: (menuWidth - 121) / 2,
                y: 264
            });
            const menuBetBG = new c.Sprite(ss, 'button').set({
                name: 'menuBetBG',
                x: (menuWidth - 105) / 2,
                y: 295
            });
            const menuCoinValue = new c.Sprite(ss, 'coinValue').set({
                name: 'menuCoinValue',
                x: (menuWidth - 139) / 2,
                y: 432
            });
            const menuCoinBG = menuBetBG.clone().set({
                name: 'menuCoinBG',
                y: 460
            });
            const menuDivider1 = new c.Sprite(ss, 'divider').set({
                name: 'menuDivider1',
                x: (menuWidth - 47) / 2,
                y: 90
            });
            const menuDivider2 = menuDivider1.clone().set({
                name: 'menuDivider2',
                y: 245
            });
            const menuDivider3 = menuDivider1.clone().set({
                name: 'menuDivider3',
                y: 414
            });
            const menuDivider4 = menuDivider1.clone().set({
                name: 'menuDivider4',
                y: 575
            });
            menuContainer.addChild(menuBetTitle, menuMaxBet, menuBetLevel, menuBetBG, menuBetPlus, menuBetMinus, menuBetText, menuCoinValue, menuCoinBG, menuCoinPlus, menuCoinMinus, menuCoinsText, menuDivider1, menuDivider2, menuDivider3, menuDivider4);
        } else if (name === 'auto') {
            const menuAutoTitle = new c.Sprite(ss, 'autoplay').set({
                name: 'menuAutoTitle',
                x: (305 - 238) / 2,
                y: 35
            });
            const menuAutoCircle = new c.Sprite(ss, 'button').set({
                regX: 52,
                regY: 52
            });
            const menuAutoText = new c.Text('', 'bold 60px Arial', '#90fd5a').set({
                textAlign: 'center',
                textBaseline: 'middle',
                shadow: new c.Shadow('#90fd5a', 0, 0, 8)
            });
            const menuAutoCircle10 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle10'
            });
            const menuAutoText10 = menuAutoText.clone().set({
                text: 10,
                name: 'menuAutoText10'
            });
            const menuAutoButton10 = new c.Container().set({
                amount: 10,
                name: 'menuAutoButton10',
                x: 82,
                y: 190
            });
            menuAutoButton10.addChild(menuAutoCircle10, menuAutoText10);
            const menuAutoCircle25 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle25'
            });
            const menuAutoText25 = menuAutoText.clone().set({
                text: 25,
                name: 'menuAutoText25'
            });
            const menuAutoButton25 = new c.Container().set({
                amount: 25,
                name: 'menuAutoButton25',
                x: 217,
                y: 190
            });
            menuAutoButton25.addChild(menuAutoCircle25, menuAutoText25);
            const menuAutoCircle50 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle50'
            });
            const menuAutoText50 = menuAutoText.clone().set({
                text: 50,
                name: 'menuAutoText50'
            });
            const menuAutoButton50 = new c.Container().set({
                amount: 50,
                name: 'menuAutoButton50',
                x: 82,
                y: 335
            });
            menuAutoButton50.addChild(menuAutoCircle50, menuAutoText50);
            const menuAutoCircle100 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle100'
            });
            const menuAutoText100 = menuAutoText.clone().set({
                text: 100,
                font: 'bold 45px Arial',
                name: 'menuAutoText100'
            });
            const menuAutoButton100 = new c.Container().set({
                amount: 100,
                name: 'menuAutoButton100',
                x: 217,
                y: 335
            });
            menuAutoButton100.addChild(menuAutoCircle100, menuAutoText100);
            const menuAutoCircle250 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle250'
            });
            const menuAutoText250 = menuAutoText.clone().set({
                text: 250,
                font: 'bold 45px Arial',
                name: 'menuAutoText250'
            });
            const menuAutoButton250 = new c.Container().set({
                amount: 250,
                name: 'menuAutoButton250',
                x: 82,
                y: 480
            });
            menuAutoButton250.addChild(menuAutoCircle250, menuAutoText250);
            const menuAutoCircle500 = menuAutoCircle.clone().set({
                name: 'menuAutoCircle500'
            });
            const menuAutoText500 = menuAutoText.clone().set({
                text: 500,
                font: 'bold 45px Arial',
                name: 'menuAutoText500'
            });
            const menuAutoButton500 = new c.Container().set({
                amount: 500,
                name: 'menuAutoButton500',
                x: 217,
                y: 480
            });
            menuAutoButton500.addChild(menuAutoCircle500, menuAutoText500);
            menuContainer.addChild(menuAutoTitle, menuAutoButton10, menuAutoButton25, menuAutoButton50, menuAutoButton100, menuAutoButton250, menuAutoButton500);
            menuAutoButton10.on('click', handleAutoClick);
            menuAutoButton25.on('click', handleAutoClick);
            menuAutoButton50.on('click', handleAutoClick);
            menuAutoButton100.on('click', handleAutoClick);
            menuAutoButton250.on('click', handleAutoClick);
            menuAutoButton500.on('click', handleAutoClick);
        } else if (name === 'settings') {
            const menuSettingsTitle = new c.Sprite(ss, 'settings').set({
                name: 'menuSettingsTitle',
                x: (305 - 219) / 2,
                y: 35
            });
            menuContainer.addChild(menuSettingsTitle);
        }
    }

    function handleAutoClick(e) {
        console.log('AutoClick is Fired:', this.amount);
        hideMenu();
    }

    function hideMenu() {
        tl.reverse();
    }

    function checkState(state) {
        if (state === 'side') {
            if (storage.readState(state) === 'left' || storage.readState(state) === 'center') {
                menuContainer.x = utils.width;
                delta = `-=${menuWidth}`;
            } else {
                menuContainer.x = -menuWidth;
                delta = `+=${menuWidth}`;
            }
        }
        if (state === 'menu') {
            showMenu(storage.readState(state));
        }
    }

    events.on('changeState', checkState);
})();
