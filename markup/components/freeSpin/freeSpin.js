let freeSpins = (function () {

    let currentFreeSpins;
    let fsWheels;
    let fsStartData;
    let fsTotalWin;
    let stage;

    function drawFreeSpinsBG() {
        /* eslint-disable no-undef */
        const loader = storage.read('loadResult');
        stage = storage.read('stage');
        const bgContainer = stage.getChildByName('bgContainer');
        const fsBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });
        bgContainer.addChildAt(fsBG, 1);
    }

    function initFreeSpins(data) {
        fsTotalWin = 0;
        drawFreeSpinsBG();
        canvas.changeGamePosition('right');
        // fsWheels = init.getInitData().freeWheels;
        // console.warn('FS WHEELS IS:', fsWheels);
        // let wheelsLength = fsWheels.length;
        // let i, randomArray = [];
        // for (i = 0; i < 5; i++) {
        //     let randomNumber = Math.round(Math.random() * (wheelsLength - 1));
        //     randomArray.push(randomNumber);
        // }
        // let firstScreen = spin._getScreenData(randomArray, fsWheels);
        // spin.drawScreen(firstScreen);
    }

    function transitionFreeSpins(data) {
        fsStartData = data;
        const loader = storage.read('loadResult');
        stage = storage.read('stage');
        console.warn('I am transitionning FS Mode!');

        let transitionContainer = new createjs.Container().set({
            name: 'transitionContainer'
        });
        let transitionBG = new createjs.Bitmap(loader.getResult('transitionBG')).set({
            name: 'transitionBG',
            alpha: 0
        });
        let transitionYouWin = new createjs.Bitmap(loader.getResult('youWin')).set({
            name: 'transitionYouWin',
            x: (1280 - 1277 * 0.7) / 2,
            y: 20,
            scaleX: 0.7,
            scaleY: 0.7
        });
        let transitionFSText = new createjs.Bitmap(loader.getResult('freeSpins')).set({
            name: 'transitionFSText',
            x: (1280 - 825 * 0.7) / 2,
            y: 420,
            scaleX: 0.7,
            scaleY: 0.7
        });
        let transitionWinText = new createjs.BitmapText(15 + '', loader.getResult('numbers')).set({
            name: 'transitionWinText',
            scaleX: 0.1,
            scaleY: 0.1,
            alpha: 0
        });
        console.log('Transition Text:', transitionWinText);
        let bounds = transitionWinText.getBounds();
        transitionWinText.x = 1280 - bounds.width * 0.7 >> 1;
        transitionWinText.y = (720 - bounds.height * 0.7 >> 1) - 50;
        let transitionPerson = new createjs.Bitmap(loader.getResult('liza')).set({
            name: 'transitionPerson',
            x: (1280 - 566 * 0.65) / 2 + 380,
            y: 215,
            scaleX: 0.65,
            scaleY: 0.65
        });
        let transitionButton = new createjs.Bitmap(loader.getResult('But')).set({
            name: 'transitionButton',
            x: (1280 - 396) / 2,
            y: 575
        });

        // createjs.Tween.get(transitionContainer)
        //     .to({alpha: 1}, 500)
        //     .call(function () {
        //         events.trigger('drawFreeSpins', fsStartData);
        //     });
        // transitionButton.on('mousedown', function () {
        //     transitionButton.gotoAndStop('over');
        // });
        transitionContainer.on('click', function () {
            setTimeout(function () {
                // events.trigger('startFreeSpin');
            }, 1000);
            createjs.Tween.get(transitionContainer)
                .to({alpha: 0}, 500);
        });

        transitionContainer.addChild(transitionBG, transitionYouWin, transitionWinText, transitionPerson, transitionFSText, transitionButton);
        stage.addChild(transitionContainer);
        let tl = new TimelineMax();
        tl.to(transitionBG, 0.4, {alpha: 1})
            .from(transitionYouWin, 0.4, {y: -400, alpha: 0}, '-=0.2')
            .from(transitionFSText, 0.4, {y: 900, alpha: 0}, '-=0.2')
            .to(transitionWinText, 0.4, {scaleX: 0.7, scaleY: 0.7, alpha: 1}, '-=0.2')
            .from(transitionPerson, 0.4, {x: 1400, alpha: 0}, '-=0.2')
            .from(transitionButton, 0.4, {alpha: 0}, '-=0.2');
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
