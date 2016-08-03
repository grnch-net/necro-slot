let freeSpins = (function () {

    let currentFreeSpins;
    let fsWheels;
    let fsStartData;
    let fsTotalWin;
    let stage;

    function drawFreeSpinsBG() {
        /* eslint-disable no-undef */
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let fsBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });
        stage.removeChild(stage.getChildByName('mainBG'));
        stage.addChildAt(fsBG, 0);
        stage.update();
    }

    function initFreeSpins(data) {
        fsTotalWin = 0;
        drawFreeSpinsBG();
        fsWheels = init.getInitData().freeWheels;
        console.warn('FS WHEELS IS:', fsWheels);
        let wheelsLength = fsWheels.length;
        let i, randomArray = [];
        for (i = 0; i < 5; i++) {
            let randomNumber = Math.round(Math.random() * (wheelsLength - 1));
            randomArray.push(randomNumber);
        }
        let firstScreen = spin._getScreenData(randomArray, fsWheels);
        // spin.drawScreen(firstScreen);
    }

    function transitionFreeSpins(data) {
        fsStartData = data;
        let loader = preloader.getLoadResult();
        stage = canvas.getStages().bonusStage;
        stage.alpha = 1;
        console.warn('I am transitionning FS Mode!');

        let transitionContainer = new createjs.Container().set({
            name: 'transitionContainer',
            alpha: 0
        });
        let transitionBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'transitionBG'
        });
        let transitionText = new createjs.Bitmap(loader.getResult('freeSpinsText')).set({
            name: 'transitionText',
            x: (1280 - 968) / 2,
            y: 20
        });
        let transitionPerson = new createjs.Bitmap(loader.getResult('liza')).set({
            name: 'transitionPerson',
            x: (1280 - 566 * 0.75) / 2,
            y: 200,
            scaleX: 0.75,
            scaleY: 0.75
        });
        let transitionButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'transitionButton',
            x: (1280 - 396) / 2,
            y: 560
        });

        createjs.Tween.get(transitionContainer)
            .to({alpha: 1}, 500)
            .call(function () {
                events.trigger('drawFreeSpins', fsStartData);
            });
        transitionButton.on('mousedown', function () {
            transitionButton.gotoAndStop('over');
        });
        transitionButton.on('click', function () {
            setTimeout(function () {
                events.trigger('startFreeSpin');
            }, 1000);
            createjs.Tween.get(transitionContainer)
                .to({alpha: 0}, 500);
        });

        transitionContainer.addChild(transitionBG, transitionText, transitionPerson, transitionButton);
        stage.addChild(transitionContainer);
    }

    function startFreeSpin() {
        console.warn('I am free spin and I am called!');
        spin.spinStart(false, true);
        // buttons.update
    }

    function stopFreeSpins() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let mainBG = new createjs.Bitmap(loader.getResult('mainBG')).set({
            name: 'mainBG'
        });
        stage.removeChild(stage.getChildByName('fsBG'));
        stage.addChildAt(mainBG, 0);
        stage.update();
        let bonusStage = canvas.getStages().bonusStage;
        bonusStage.removeChild(bonusStage.getChildByName('fsTotalContainer'));
    }

    function getWheels() {
        return fsWheels;
    }

    function countTotalWin(data) {
        if (data.mode === 'fsBonus') {
            if (stage.getChildByName('fsTotalContainer')) {
                fsTotalWin = fsTotalWin + data.winCoins;
                stage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;
            } else {
                fsTotalWin = fsTotalWin + data.winCoins;
                let fsTotalContainer = new createjs.Container().set({
                    name: 'fsTotalContainer',
                    x: 650,
                    y: 55
                });
                let fsTotalWinTitle = new createjs.Text('Total Free Win:', '35px bold Arial', '#fff').set({
                    name: 'fsTotalWinTitle',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    shadow: new createjs.Shadow('#fff', 0, 0, 10)
                });
                let fsTotalWinText = new createjs.Text(fsTotalWin, '50px bold Arial', '#fff').set({
                    name: 'fsTotalWinText',
                    x: 260,
                    y: 0,
                    textAlign: 'center',
                    textBaseline: 'middle',
                    shadow: new createjs.Shadow('#fff', 0, 0, 10)
                });
                fsTotalContainer.addChild(fsTotalWinTitle, fsTotalWinText);
                stage.addChild(fsTotalContainer);
            }
        }
    }

    function finishFreeSpins() {
        let loader = preloader.getLoadResult();
        let finishContainer = new createjs.Container().set({
            name: 'finishContainer',
            alpha: 0
        });
        let finishBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'finishBG'
        });
        let finishText = new createjs.Bitmap(loader.getResult('totalWinText')).set({
            name: 'finishText',
            x: (1280 - 820) / 2,
            y: 20
        });
        let finishPerson = new createjs.Bitmap(loader.getResult('liza')).set({
            name: 'finishPerson',
            x: (1280 - 566 * 0.75) / 2 + 350,
            y: 200,
            scaleX: 0.75,
            scaleY: 0.75
        });
        let finishWinText = new createjs.Text(fsTotalWin, '150px bold Arial', '#fff').set({
            x: 1280 / 2,
            y: 720 / 2,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#fff', 0, 0, 10)
        });
        let finishButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'finishButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        finishContainer.addChild(finishBG, finishText, finishPerson, finishWinText, finishButton);
        createjs.Tween.get(finishContainer)
            .to({alpha: 1}, 500)
            .call(function () {
                events.trigger('stopFreeSpins');
            });
        finishButton.on('mousedown', function () {
            finishButton.gotoAndStop('over');
        });
        finishButton.on('click', function () {
            createjs.Tween.get(finishContainer)
                .to({alpha: 0}, 500)
                .call(function () {
                    stage.removeAllChildren();
                });
        });
        let stage = canvas.getStages().bonusStage;
        stage.addChild(finishContainer);
    }

    function addMultiBonus(data) {
        let multiStage = canvas.getStages().bonusStage;
        // fsTotalWin = fsTotalWin + data.coins;
        // multiStage.getChildByName('fsTotalContainer').getChildByName('fsTotalWinText').text = fsTotalWin;


        let loader = preloader.getLoadResult();
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
        let multiWinText = new createjs.Text(data.coins, '150px bold Arial', '#fff').set({
            x: 1280 / 2,
            y: 680 / 2,
            textAlign: 'center',
            textBaseline: 'middle',
            shadow: new createjs.Shadow('#fff', 0, 0, 10)
        });
        let multiButton = new createjs.Sprite(loader.getResult('continueButton'), 'out').set({
            name: 'multiButton',
            x: (1280 - 396) / 2,
            y: 560
        });
        multiContainer.addChild(multiBG, multiTitle, multiCoins, multiWinText, multiButton);
        createjs.Tween.get(multiContainer)
            .to({alpha: 1}, 500);
        multiButton.on('mousedown', function () {
            multiButton.gotoAndStop('over');
        });
        multiButton.on('click', function () {
            utils.request('_Ready/', login.getSessionID())
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

    events.on('initFreeSpins', transitionFreeSpins);
    events.on('drawFreeSpins', initFreeSpins);
    // events.on('initFreeSpins', initFreeSpins);
    events.on('stopFreeSpins', stopFreeSpins);
    events.on('finishFreeSpins', finishFreeSpins);
    events.on('startFreeSpin', startFreeSpin);
    events.on('spinEnd', countTotalWin);
    events.on('multiplierBonus', addMultiBonus);
    return {
        initFreeSpins,
        stopFreeSpins,
        startFreeSpin,
        getWheels,
        drawFreeSpinsBG
    };
})();
