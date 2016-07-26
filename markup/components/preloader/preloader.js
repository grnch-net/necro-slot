const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/general/preloader/bg.png'},
    {id: 'preloaderPlay', src: 'static/img/general/preloader/play.png'},
    {id: 'preloaderLogo', src: 'static/img/general/preloader/logo.png'},
    {id: 'preloaderSpriteSheet', src: 'static/img/general/preloader/sprite.json', type: 'spritesheet'},
    {id: 'preloaderClockSpriteSheet', src: 'static/img/general/preloader/clock.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg
    {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    // buttons
    {id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet'},
    {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
    // menu
    {id: 'menuBG', src: 'static/img/content/menu/menuBG.png'},
    {id: 'menuBetTitle', src: 'static/img/content/menu/menuBetTitle.png'},
    {id: 'menuAutoTitle', src: 'static/img/content/menu/menuAutoTitle.png'},
    {id: 'menuSettingsTitle', src: 'static/img/content/menu/menuSettingsTitle.png'},
    {id: 'menuBetLevel', src: 'static/img/content/menu/menuBetLevel.png'},
    {id: 'menuCoinValue', src: 'static/img/content/menu/menuCoinValue.png'},
    {id: 'menuDisc', src: 'static/img/content/menu/menuDisc.png'},
    {id: 'menuDivider', src: 'static/img/content/menu/menuDivider.png'},
    {id: 'menuMaxBet', src: 'static/img/content/menu/menuMaxBet.json', type: 'spritesheet'},
    {id: 'menuMinusPlus', src: 'static/img/content/menu/menuMinusPlus.json', type: 'spritesheet'},
    {id: 'menuBack', src: 'static/img/content/menu/menuBack.json', type: 'spritesheet'},
    // lines
    {id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet'},
    {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    {id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png'},
    {id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png'},
    // elements
    {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'}
    // {id: 'element2', src: 'static/img/content/elements/element2.json', type: 'spritesheet'},
    // {id: 'element1', src: 'static/img/content/elements/element1.json', type: 'spritesheet'},
    // {id: 'element3', src: 'static/img/content/elements/element3.json', type: 'spritesheet'},
    // {id: 'element4', src: 'static/img/content/elements/element4.json', type: 'spritesheet'},
    // {id: 'element5', src: 'static/img/content/elements/element5.json', type: 'spritesheet'},
    // {id: 'element6', src: 'static/img/content/elements/element6.json', type: 'spritesheet'},
    // {id: 'element7', src: 'static/img/content/elements/element7.json', type: 'spritesheet'},
    // {id: 'element8', src: 'static/img/content/elements/element8.json', type: 'spritesheet'},
    // {id: 'element9', src: 'static/img/content/elements/element9.json', type: 'spritesheet'},
    // {id: 'element10', src: 'static/img/content/elements/element10.json', type: 'spritesheet'},
    // {id: 'element11', src: 'static/img/content/elements/element11.json', type: 'spritesheet'},
    // {id: 'element12', src: 'static/img/content/elements/element12.json', type: 'spritesheet'},
    // {id: 'element13', src: 'static/img/content/elements/element13.json', type: 'spritesheet'}
];

let preloader = (function () {

    let filesLoaded = 0;
    let loadResult;

    let bonusStaticStage;
    let bonusStage;

    function downloadManifest() {
        /* eslint-disable */
        const queue = new createjs.LoadQueue(true);
        queue.setMaxConnections(4);
        queue.loadManifest(preloaderManifest);
        queue.on('complete', showPreloader);
        /* eslint-enable */
    }

    function showPreloader(event) {
        const queue = event.target;
        /* eslint-disable */
        const preloaderBG = new createjs.Bitmap(queue.getResult('preloaderBG'))
            .set({name: 'preloaderBG'});
        const preloaderLogo = new createjs.Bitmap(queue.getResult('preloaderLogo'))
            .set({
                x: 288,
                y: 40,
                name: 'preloaderLogo'
            });
        const preloaderPlay = new createjs.Bitmap(queue.getResult('preloaderPlay'))
            .set({name: 'preloaderPlay'});

        const preloaderSpriteSheet = queue.getResult('preloaderSpriteSheet');
        const preloaderClockSpriteSheet = queue.getResult('preloaderClockSpriteSheet');

        const playButton = new createjs.Container()
            .set({
                name: 'playButton',
                x: 530,
                y: 310,
                visible: false,
                shadow: new createjs.Shadow('#C19433', 0, 0, 20)
            });
        const buttonTween = createjs.Tween.get(preloaderPlay, {loop: true, paused: true})
            .to({alpha: 0.7}, 400)
            .to({alpha: 1}, 400);
        const preloaderSprite = new createjs.Sprite(preloaderSpriteSheet, "start")
            .set({
                name: 'preloaderSprite',
                x: 485,
                y: 200
            });
        const preloaderClock = new createjs.Sprite(preloaderClockSpriteSheet, "start")
            .set({
                name: 'preloaderClock',
                x: 233,
                y: 150
            });

        bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage = canvas.getStages().bonusStage;

        bonusStaticStage.addChild(preloaderBG, preloaderLogo);
        bonusStaticStage.update();

        playButton.addChild(preloaderPlay);
        bonusStage.addChild(playButton, preloaderClock, preloaderSprite);

        mainPreload(preloaderSprite, preloaderClock, buttonTween, playButton);
        console.log('I am Preloader and I has started loading!');
        /* eslint-enable */
    }

    function mainPreload(sprite, clock, buttonTween, playButton) {
        /* eslint-disable */
        const queue = new createjs.LoadQueue(true);
        queue.setMaxConnections(20);
        queue.loadManifest(mainManifest);
        queue.on('fileload', _handleFileLoad, this, false, {
            sprite
        });
        queue.on('complete', _handleLoadComplete, this, true, {
            buttonTween,
            playButton,
            sprite,
            clock
        });
    }

    function _handleFileLoad(event, data) {
        filesLoaded += 1;

        let sprite = data.sprite;
        sprite.framerate = 12;
        let filesNumber = mainManifest.length;
        let framesNumber = sprite.spriteSheet.getNumFrames();
        let currentFrame = Math.ceil((filesLoaded / filesNumber) * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function _handleLoadComplete(event, data) {
        let buttonTween = data.buttonTween;
        let playButton = data.playButton;
        let sprite = data.sprite;
        let clock = data.clock;
        clock.framerate = 12;

        playButton.visible = true;
        buttonTween.setPaused(false);
        sprite.alpha = 0;
        clock.gotoAndPlay("finish");
        clock.on('animationend', (event) => {
            clock.stop();
            createjs.Tween.get(clock)
                .to({alpha: 0}, 700);
            createjs.Tween.get(sprite)
                .to({alpha: 1}, 700);
            sprite.gotoAndPlay('finish');
        });

        /* eslint-disable */
        playButton.on('click', _handlePlayClick, this, true, {
            playButton
        });

        loadResult = event.target;
        events.trigger('preloadComplete', loadResult);
        /* eslint-enable */
    }

    function _handlePlayClick(event, data) {
        let game = document.querySelector('#game');
        let playButton = data.playButton;
        let preloaderPlay = playButton.getChildByName('preloaderPlay');
        /* eslint-disable */
        createjs.Tween.removeTweens(preloaderPlay);
        createjs.Ticker.on('tick', bonusStaticStage);
        createjs.Tween.get(bonusStage)
            .to({alpha: 0}, 1000, createjs.Ease.circIn)
            .call(function () {
                bonusStage.removeAllChildren();
            });
            // .call(canvas.clearStage, [bonusStage]);
        createjs.Tween.get(bonusStaticStage)
            .to({alpha: 0}, 1000, createjs.Ease.circIn)
            .call(function () {
                bonusStaticStage.removeAllChildren();
            });
            // .call(canvas.clearStage, [bonusStaticStage]);
        canvas.launchFullScreen(game);
        /* eslint-enable */
    }

    function getLoadResult() {
        if (loadResult) {
            return loadResult;
        } else {
            console.error('We have not loaded assets!');
        }
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */
    return {
        getLoadResult
    };
})();
