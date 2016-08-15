const preloaderManifest = [
    {id: 'preloader', src: 'static/img/content/preloader/preloader.json', type: 'spritesheet'},
    {id: 'preloaderSprite', src: 'static/img/content/preloader/sprite.json', type: 'spritesheet'}
];

const mainManifest = [
    {id: 'bg', src: 'static/img/content/bg/bg.json', type: 'spritesheet'},
    {id: 'buttons', src: 'static/img/content/buttons/buttons.json', type: 'spritesheet'},
    {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'},
    {id: 'menu', src: 'static/img/content/menu/menu.json', type: 'spritesheet'},
    // {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    // {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    // {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    // {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    // {id: 'transitionBG', src: 'static/img/content/bg/transitionBG.png'},
    // {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    {id: 'liza', src: 'static/img/content/bg/liza.png'},
    {id: 'freeSpinsText', src: 'static/img/content/bg/freeSpinsText.png'},
    {id: 'bigWinText', src: 'static/img/content/bg/bigWinText.png'},
    {id: 'totalWinText', src: 'static/img/content/bg/totalWinText.png'},
    {id: 'multiBG', src: 'static/img/content/bg/multiBG.png'},
    {id: 'multiTitle', src: 'static/img/content/bg/multiTitle.png'},
    {id: 'multiCoins', src: 'static/img/content/bg/multiCoins.png'},
    // buttons
    // {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    // {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    // {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    // {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
    // {id: 'continueButton', src: 'static/img/content/buttons/continue.json', type: 'spritesheet'},
    // menu
    // {id: 'menuBG', src: 'static/img/content/menu/menuBG.png'},
    // {id: 'menuBetTitle', src: 'static/img/content/menu/menuBetTitle.png'},
    // {id: 'menuAutoTitle', src: 'static/img/content/menu/menuAutoTitle.png'},
    // {id: 'menuSettingsTitle', src: 'static/img/content/menu/menuSettingsTitle.png'},
    // {id: 'menuBetLevel', src: 'static/img/content/menu/menuBetLevel.png'},
    // {id: 'menuCoinValue', src: 'static/img/content/menu/menuCoinValue.png'},
    // {id: 'menuDisc', src: 'static/img/content/menu/menuDisc.png'},
    // {id: 'menuDivider', src: 'static/img/content/menu/menuDivider.png'},
    // {id: 'menuMinusPlus', src: 'static/img/content/menu/menuMinusPlus.json', type: 'spritesheet'},
    // {id: 'menuBack', src: 'static/img/content/menu/menuBack.json', type: 'spritesheet'},
    // lines
    {id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet'},
    {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    {id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png'},
    {id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png'},
    // elements
    // bonuses
    {id: 'bonusBG_1', src: 'static/img/content/bonuses/bg/bonusBG_1.png'},
    {id: 'bonusBG_2', src: 'static/img/content/bonuses/bg/bonusBG_2.png'},
    {id: 'bonusBG_3', src: 'static/img/content/bonuses/bg/bonusBG_3.png'},
    {id: 'bonusBG_4', src: 'static/img/content/bonuses/bg/bonusBG_4.png'},
    {id: 'bonusBG_5', src: 'static/img/content/bonuses/bg/bonusBG_5.png'},
    {id: 'bonusWin_1', src: 'static/img/content/bonuses/win/bonusWin_1.png'},
    {id: 'bonusWin_2', src: 'static/img/content/bonuses/win/bonusWin_2.png'},
    {id: 'bonusWin_3', src: 'static/img/content/bonuses/win/bonusWin_3.png'},
    {id: 'bonusWin_4', src: 'static/img/content/bonuses/win/bonusWin_4.png'},
    {id: 'bonusFail_1', src: 'static/img/content/bonuses/fail/bonusFail_1.png'},
    {id: 'bonusFail_2', src: 'static/img/content/bonuses/fail/bonusFail_2.png'},
    {id: 'bonusFail_3', src: 'static/img/content/bonuses/fail/bonusFail_3.png'},
    {id: 'bonusFail_4', src: 'static/img/content/bonuses/fail/bonusFail_4.png'},
    {id: 'bonusDoor_1_1', src: 'static/img/content/bonuses/doors/bonusDoor_1_1.png'},
    {id: 'bonusDoor_1_2', src: 'static/img/content/bonuses/doors/bonusDoor_1_2.png'},
    {id: 'bonusDoor_1_3', src: 'static/img/content/bonuses/doors/bonusDoor_1_3.png'},
    {id: 'bonusDoor_1_4', src: 'static/img/content/bonuses/doors/bonusDoor_1_4.png'},
    {id: 'bonusDoor_1_5', src: 'static/img/content/bonuses/doors/bonusDoor_1_5.png'},
    {id: 'doorSprite_2', src: 'static/img/content/bonuses/doors/doorSprite_2.json', type: 'spritesheet'},
    {id: 'doorSprite_3', src: 'static/img/content/bonuses/doors/doorSprite_3.json', type: 'spritesheet'},
    {id: 'doorSprite_4', src: 'static/img/content/bonuses/doors/doorSprite_4.json', type: 'spritesheet'},
    {id: 'doorSprite_5_1', src: 'static/img/content/bonuses/doors/doorSprite_5_1.json', type: 'spritesheet'},
    {id: 'doorSprite_5_3', src: 'static/img/content/bonuses/doors/doorSprite_5_3.json', type: 'spritesheet'},
    {id: 'doorSprite_5_5', src: 'static/img/content/bonuses/doors/doorSprite_5_5.json', type: 'spritesheet'},
    {id: 'bonusFly', src: 'static/img/content/bonuses/win/bonusFly.json', type: 'spritesheet'},
    {id: 'bonusCoins', src: 'static/img/content/bonuses/win/bonusCoins.png'},
    {id: 'bonusLight', src: 'static/img/content/bonuses/win/bonusLight.png'},
    {id: 'bonusBackLight', src: 'static/img/content/bonuses/win/bonusBackLight.png'}
];

/* eslint-disable no-undef */
const preloader = (function () {

    const c = createjs;
    const w = utils.width;
    const h = utils.height;
    let stage;

    function startPreloader() {
        /* eslint-disable no-use-before-define */
        const loader = new c.LoadQueue(true);
        loader.setMaxConnections(4);
        loader.loadManifest(preloaderManifest);
        loader.on('complete', showPreloader);
    }

    function showPreloader(event) {
        stage = storage.read('stage');
        const loader = event.target;
        const ss = loader.getResult('preloader');
        const clock = loader.getResult('preloaderSprite');

        const preloaderBG = new c.Sprite(ss, 'bg').set({
            name: 'preloaderBG'
        });
        const preloaderLogo = new c.Sprite(ss, 'logo').set({
            name: 'preloaderLogo',
            x: (w - 545) / 2,
            y: 75
        });
        const preloaderPlay = new c.Sprite(ss, 'play').set({
            name: 'preloaderPlay',
            x: (w - 220) / 2,
            y: 310,
            shadow: new c.Shadow('#C19433', 0, 0, 20)
        });
        const preloaderSprite = new c.Sprite(clock, 'start').set({
            name: 'preloaderSprite',
            x: (w - 630) / 2 - 100,
            y: 152,
            framerate: 12
        });
        const preloaderCache = new c.Container().set({
            name: 'preloaderCache'
        });
        const preloaderContainer = new c.Container().set({
            name: 'preloaderContainer'
        });
        preloaderSprite.paused = true;

        preloaderCache.addChild(preloaderBG, preloaderLogo);
        preloaderContainer.addChild(preloaderCache, preloaderPlay, preloaderSprite);
        stage.addChild(preloaderContainer);
        preloaderCache.cache(0, 0, w, h);

        mainPreload(preloaderContainer);
    }

    function mainPreload(container) {
        const sprite = container.getChildByName('preloaderSprite');
        const loader = new c.LoadQueue(true);

        loader.setMaxConnections(20);
        loader.loadManifest(mainManifest);

        loader.on('progress', handleLoadProgress, loader, false, {
            sprite
        });
        loader.on('complete', handleLoadComplete, loader, true, {
            container
        });
    }

    function handleLoadProgress(event, data) {
        const sprite = data.sprite;
        const progress = event.progress;
        const framesNumber = sprite.spriteSheet.getNumFrames('start');
        const currentFrame = Math.ceil(progress * framesNumber) - 1;
        sprite.gotoAndStop(currentFrame);
        if (progress === 1) {
            event.remove();
        }
    }

    function handleLoadComplete(event, data) {
        const container = data.container;
        const sprite = container.getChildByName('preloaderSprite');
        const play = container.getChildByName('preloaderPlay');

        sprite.gotoAndPlay('finish');
        play.on('click', handlePlayClick, play, true, {
            container
        });

        storage.write('loadResult', event.target);
        storage.changeState('loaded', true);
    }

    function handlePlayClick(event, data) {
        const container = data.container;
        const game = document.querySelector('#game');
        canvas.fullScreen(game);
        container.cache(0, 0, w, h);
        animation.fadeOut(container, function () {
            stage.removeChild(container);
        });
    }

    function checkState(state) {
        if (state === 'stage' && storage.readState('stage')) {
            startPreloader();
        }
    }

    events.on('changeState', checkState);
})();
