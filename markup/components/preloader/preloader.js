const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/content/preloader/bg.png'},
    {id: 'preloaderPlay', src: 'static/img/content/preloader/play.png'},
    {id: 'preloaderLogo', src: 'static/img/content/preloader/logo.png'},
    {id: 'preloaderSprite', src: 'static/img/content/preloader/sprite.json', type: 'spritesheet'}
    // {id: 'preloaderClockSpriteSheet', src: 'static/img/content/preloader/clock.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg
    {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    {id: 'transitionBG', src: 'static/img/content/bg/transitionBG.png'},
    {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    {id: 'liza', src: 'static/img/content/bg/liza.png'},
    {id: 'freeSpinsText', src: 'static/img/content/bg/freeSpinsText.png'},
    {id: 'bigWinText', src: 'static/img/content/bg/bigWinText.png'},
    {id: 'totalWinText', src: 'static/img/content/bg/totalWinText.png'},
    {id: 'multiBG', src: 'static/img/content/bg/multiBG.png'},
    {id: 'multiTitle', src: 'static/img/content/bg/multiTitle.png'},
    {id: 'multiCoins', src: 'static/img/content/bg/multiCoins.png'},
    // buttons
    {id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet'},
    {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
    {id: 'continueButton', src: 'static/img/content/buttons/continue.json', type: 'spritesheet'},
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
    {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'},
    // bonuses
    {id: 'bonusBG_1', src: 'static/img/content/bonuses/bonusBG_1.png'},
    {id: 'bonusBG_2', src: 'static/img/content/bonuses/bonusBG_2.png'},
    {id: 'bonusWin_1', src: 'static/img/content/bonuses/bonusWin_1.png'},
    {id: 'bonusFail_1', src: 'static/img/content/bonuses/bonusFail_1.png'},
    {id: 'bonusWin_2', src: 'static/img/content/bonuses/bonusWin_2.png'},
    {id: 'bonusFail_2', src: 'static/img/content/bonuses/bonusFail_2.png'},
    {id: 'bonusDoor_1_1', src: 'static/img/content/bonuses/bonusDoor_1_1.png'},
    {id: 'bonusDoor_1_2', src: 'static/img/content/bonuses/bonusDoor_1_2.png'},
    {id: 'bonusDoor_1_3', src: 'static/img/content/bonuses/bonusDoor_1_3.png'},
    {id: 'bonusDoor_1_4', src: 'static/img/content/bonuses/bonusDoor_1_4.png'},
    {id: 'bonusDoor_1_5', src: 'static/img/content/bonuses/bonusDoor_1_5.png'},
    {id: 'doorSprite_2', src: 'static/img/content/bonuses/doorSprite.json', type: 'spritesheet'}
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

    // Stage
    let stage;

    // Data
    let loadResult;

    // Counter
    let filesLoaded = 0;

    function downloadManifest() {
        /* eslint-disable no-undef */
        /* eslint-disable no-use-before-define */
        const loader = new createjs.LoadQueue(true);
        loader.setMaxConnections(4);
        loader.loadManifest(preloaderManifest);
        loader.on('complete', showPreloader);
    }

    function showPreloader(event) {
        stage = canvas.getStages().bonusStage;
        const loader = event.target;

        const preloaderBG = new createjs.Bitmap(loader.getResult('preloaderBG')).set({
            name: 'preloaderBG'
        });
        const preloaderLogo = new createjs.Bitmap(loader.getResult('preloaderLogo')).set({
            x: (1280 - 545) / 2,
            y: 75,
            name: 'preloaderLogo'
        });
        const preloaderPlay = new createjs.Bitmap(loader.getResult('preloaderPlay')).set({
            name: 'preloaderPlay',
            x: (1280 - 220) / 2,
            y: 310,
            shadow: new createjs.Shadow('#C19433', 0, 0, 20)
        });
        const preloaderSprite = new createjs.Sprite(loader.getResult('preloaderSprite'), 'start').set({
            name: 'preloaderSprite',
            x: (1280 - 630) / 2 - 100,
            y: 152,
            framerate: 12
        });
        const preloaderContainer = new createjs.Container().set({
            name: 'preloaderContainer'
        });

        preloaderContainer.addChild(preloaderBG, preloaderLogo, preloaderPlay, preloaderSprite);

        stage.addChild(preloaderContainer);

        mainPreload(preloaderContainer);
    }

    function mainPreload(container) {
        const sprite = container.getChildByName('preloaderSprite');
        const loader = new createjs.LoadQueue(true);

        loader.setMaxConnections(20);
        loader.loadManifest(mainManifest);

        loader.on('fileload', handleFileLoad, loader, false, {
            sprite
        });
        loader.on('complete', handleLoadComplete, loader, true, {
            container
        });
    }

    function handleFileLoad(event, data) {
        // Change counter of downloaded files
        filesLoaded++;

        let sprite = data.sprite;
        let filesNumber = mainManifest.length;
        let framesNumber = sprite.spriteSheet.getNumFrames('start');
        let currentFrame = Math.ceil((filesLoaded / filesNumber) * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function handleLoadComplete(event, data) {
        const container = data.container;
        const sprite = container.getChildByName('preloaderSprite');
        const play = container.getChildByName('preloaderPlay');

        sprite.gotoAndPlay('finish');

        loadResult = event.target;

        events.trigger('preloadComplete', loadResult);

        play.on('click', handlePlayClick, this, true, {
            container
        });
    }

    function handlePlayClick(event, data) {
        const container = data.container;
        const game = document.querySelector('#game');
        canvas.launchFullScreen(game);
        createjs.Tween.get(container)
        .to({alpha: 0}, 1000, createjs.Ease.circIn)
        .call(function () {
            stage.removeAllChildren();
        });
    }

    function getLoadResult() {
        return utils.getData(loadResult);
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */

    return {
        getLoadResult
    };
})();
