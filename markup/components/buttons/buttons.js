let buttons = (function () {

    let buttonsContainer;

    function drawButtons() {
        /* eslint-disable */
        let loader = preloader.getLoadResult();
        buttonsContainer = new createjs.Container();
        let spinSpriteSheet = loader.getResult('spinButton');
        let spinSprite = new createjs.Sprite(spinSpriteSheet).set({
            x: 1092,
            y: 273,
            name: 'spinSprite'
        });
        let spinHelper = new createjs.ButtonHelper(spinSprite);
        spinSprite.on('click', function(event){
            let spinState = spin.getSpinState();
            if (spinState.inProgress && spinState.fastSpinFlag) {
                console.log('I am trying to do Fast Spin!');
                spin.fastSpin();
            } else if (!spinState.inProgress) {
                spin.spinStart();
            }
        });
        let autoSpriteSheet = loader.getResult('autoButton');
        let autoSprite = new createjs.Sprite(autoSpriteSheet).set({
            x: 1128,
            y: 160,
            name: 'autoSprite'
        });
        let autoHelper = new createjs.ButtonHelper(autoSprite);
        let betSpriteSheet = loader.getResult('betButton');
        let betSprite = new createjs.Sprite(betSpriteSheet).set({
            x: 1128,
            y: 460,
            name: 'betSprite'
        });
        let betHelper = new createjs.ButtonHelper(betSprite);
        let menuSpriteSheet = loader.getResult('menuButton');
        let menuSprite = new createjs.Sprite(menuSpriteSheet).set({
            x: 1140,
            y: 70,
            name: 'menuSprite'
        });
        let menuHelper = new createjs.ButtonHelper(menuSprite);
        let soundSpriteSheet = loader.getResult('soundButton');
        let soundSprite = new createjs.Sprite(soundSpriteSheet).set({
            x: 1140,
            y: 570,
            name: 'soundSprite'
        });
        let soundHelper = new createjs.ButtonHelper(soundSprite);
        buttonsContainer.addChild(spinSprite, autoSprite, betSprite, menuSprite, soundSprite);
        let gameStage = canvas.getStages().gameStage;
        gameStage.enableMouseOver(10);
        gameStage.addChild(buttonsContainer);
    }

    function checkButtonsState() {
        if (buttonsContainer) {
            let spinState = spin.getSpinState();
            let menuSprite = buttonsContainer.getChildByName('menuSprite');
            let autoSprite = buttonsContainer.getChildByName('autoSprite');
            let spinSprite = buttonsContainer.getChildByName('spinSprite');
            let betSprite = buttonsContainer.getChildByName('betSprite');
            let soundSprite = buttonsContainer.getChildByName('soundSprite');
            if (spinState.inProgress && spinState.fastSpinFlag) {
                spinSprite.gotoAndStop('out');
            } else if (spinState.inProgress) {
                menuSprite.gotoAndStop('down');
                autoSprite.gotoAndStop('down');
                spinSprite.gotoAndStop('down');
                betSprite.gotoAndStop('down');
                soundSprite.gotoAndStop('down');
            } else {
                autoSprite.gotoAndStop('out');
                menuSprite.gotoAndStop('out');
                spinSprite.gotoAndStop('out');
                betSprite.gotoAndStop('out');
                soundSprite.gotoAndStop('out');
            }
        }
    }


    createjs.Ticker.on('tick', checkButtonsState);
    events.on('bgDrawEnd', drawButtons);
    /* eslint-enable */
    return {

    };
})();
