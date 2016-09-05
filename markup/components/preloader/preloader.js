const preloaderManifest = [
    {id: 'preloader', src: 'static/img/content/preloader/preloader.json', type: 'spritesheet'},
    {id: 'preloaderSprite', src: 'static/img/content/preloader/sprite.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg module
    {id: 'newBGLight', src: 'static/img/content/bg/newBGLight.png'},
    {id: 'bg', src: 'static/img/content/bg/bg.json', type: 'spritesheet'},
    {id: 'newGameMachine', src: 'static/img/content/new/gameMachine.png'},
    {id: 'fonar', src: 'static/img/content/bg/fonar.png'},
    {id: 'home', src: 'static/img/content/new/home.png'},

    // buttons module
    {id: 'buttons', src: 'static/img/content/buttons/buttons.json', type: 'spritesheet'},

    // roll module
    {id: 'new_elements', src: 'static/img/content/new/elements_new3.json', type: 'spritesheet'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},

    // win module
    {id: 'newLight', src: 'static/img/content/new/newLight_yellow.png'},
    {id: 'winLineRect', src: 'static/img/content/lines/winLineRect.png'},
    {id: 'winTotalRect', src: 'static/img/content/lines/winTotalRect.png'},
    {id: 'lineFire', src: 'static/img/content/new/newLight.json', type: 'spritesheet'},
    {id: 'lizaWin', src: 'static/img/content/fs/lizaWin.json', type: 'spritesheet'},
    {id: 'cardsForLizaWin', src: 'static/img/content/fs/cardsForLizaWin.json', type: 'spritesheet'},

    // menu module
    {id: 'menu', src: 'static/img/content/menu/menu.json', type: 'spritesheet'},
    {id: 'settings', src: 'static/img/content/menu/settings.json', type: 'spritesheet'},

    // bonuses module
    {id: 'bonusPerehodBG', src: 'static/img/content/new/bonusPerehodBG_new.png'},
    {id: 'youWin', src: 'static/img/content/bg/youWin.png'},
    {id: 'bonusLevel', src: 'static/img/content/new/bonusLevel.png'},
    {id: 'lizaBonusPerehod', src: 'static/img/content/new/lizaBonusPerehod.png'},
    {id: 'But', src: 'static/img/content/bg/But.png'},
    {id: 'bonusBG_1', src: 'static/img/content/bonuses/bonusBG_1.png'},
    {id: 'bonusBG_2', src: 'static/img/content/bonuses/bonusBG_2.png'},
    {id: 'bonusBG_3', src: 'static/img/content/bonuses/bonusBG_3.png'},
    {id: 'bonusBG_4', src: 'static/img/content/bonuses/bonusBG_4.png'},
    {id: 'bonusBG_5', src: 'static/img/content/bonuses/bonusBG_5.png'},
    {id: 'bonusWin_1', src: 'static/img/content/bonuses/bonusWin_1.png'},
    {id: 'bonusWin_2', src: 'static/img/content/bonuses/bonusWin_2.png'},
    {id: 'bonusWin_3', src: 'static/img/content/bonuses/bonusWin_3.png'},
    {id: 'bonusWin_4', src: 'static/img/content/bonuses/bonusWin_4.png'},
    {id: 'bonusFail_1', src: 'static/img/content/bonuses/bonusFail_1.png'},
    {id: 'bonusFail_2', src: 'static/img/content/bonuses/bonusFail_2.png'},
    {id: 'bonusFail_3', src: 'static/img/content/bonuses/bonusFail_3.png'},
    {id: 'bonusFail_4', src: 'static/img/content/bonuses/bonusFail_4.png'},
    {id: 'bonusDoor_1_1', src: 'static/img/content/bonuses/bonusDoor_1_1.png'},
    {id: 'bonusDoor_1_2', src: 'static/img/content/bonuses/bonusDoor_1_2.png'},
    {id: 'bonusDoor_1_3', src: 'static/img/content/bonuses/bonusDoor_1_3.png'},
    {id: 'bonusDoor_1_4', src: 'static/img/content/bonuses/bonusDoor_1_4.png'},
    {id: 'bonusDoor_1_5', src: 'static/img/content/bonuses/bonusDoor_1_5.png'},
    {id: 'doorSprite_2', src: 'static/img/content/bonuses/doorSprite_2.json', type: 'spritesheet'},
    {id: 'doorSprite_3', src: 'static/img/content/bonuses/doorSprite_3.json', type: 'spritesheet'},
    {id: 'doorSprite_4', src: 'static/img/content/bonuses/doorSprite_4.json', type: 'spritesheet'},
    {id: 'doorSprite_5_1', src: 'static/img/content/bonuses/doorSprite_5_1.json', type: 'spritesheet'},
    {id: 'doorSprite_5_3', src: 'static/img/content/bonuses/doorSprite_5_3.json', type: 'spritesheet'},
    {id: 'doorSprite_5_5', src: 'static/img/content/bonuses/doorSprite_5_5.json', type: 'spritesheet'},
    {id: 'numbers', src: 'static/img/content/bonuses/numbers.json', type: 'spritesheet'},
    {id: 'bonusWinBG', src: 'static/img/content/new/bonusWinBG.png'},
    {id: 'totalWin', src: 'static/img/content/new/totalWin.png'},
    {id: 'lizaBonusWin', src: 'static/img/content/new/lizaBonusWin.png'},
    {id: 'bonusCoins', src: 'static/img/content/bonuses/bonusCoins.png'},
    {id: 'bonusLight', src: 'static/img/content/bonuses/bonusLight.png'},

    // fs module
    {id: 'fsMachineBG', src: 'static/img/content/fs/fsMachineBG.png'},
    {id: 'fsTotalTable', src: 'static/img/content/fs/fsTotalTable.png'},
    {id: 'fsText', src: 'static/img/content/fs/fsText.json', type: 'spritesheet'},
    {id: 'fsBG', src: 'static/img/content/bg/fsBG.png'},
    {id: 'pressure', src: 'static/img/content/fs/pressure.png'},
    {id: 'fireToPressure', src: 'static/img/content/fs/fireToPressure.json', type: 'spritesheet'},
    {id: 'pressureDisc', src: 'static/img/content/fs/pressureDisc.png'},
    {id: 'truba', src: 'static/img/content/fs/truba.png'},
    {id: 'chasyFS', src: 'static/img/content/fs/chasyFS.png'},
    {id: 'chasy', src: 'static/img/content/fs/chasy.json', type: 'spritesheet'},
    {id: 'parNaKryshku', src: 'static/img/content/fs/parNaKryshku.json', type: 'spritesheet'},
    {id: 'pressureFire', src: 'static/img/content/fs/pressureFire.png'},
    {id: 'firework', src: 'static/img/content/fs/firework.json', type: 'spritesheet'},
    {id: 'redLight', src: 'static/img/content/fs/redLight.png'},
    {id: 'logoTop', src: 'static/img/content/fs/logoTop.png'},
    {id: 'logoFire', src: 'static/img/content/fs/logoFire.png'},
    {id: 'parPack', src: 'static/img/content/fs/parPack.json', type: 'spritesheet'},
    {id: 'transitionBG', src: 'static/img/content/bg/transitionBG.png'},
    {id: 'freeSpins', src: 'static/img/content/bg/freeSpins.png'},
    {id: 'liza', src: 'static/img/content/bg/liza.png'},
    {id: 'fsTable', src: 'static/img/content/fs/fsTable.png'},
    {id: 'plus3', src: 'static/img/content/fs/plus3.png'},
    {id: 'multiBG', src: 'static/img/content/bg/multiBG.png'},
    {id: 'multiTitle', src: 'static/img/content/bg/multiTitle.png'},
    {id: 'multiCoins', src: 'static/img/content/bg/multiCoins.png'},
    {id: 'popup', src: 'static/img/content/new/popup.png'}




    // {id: 'elements', src: 'static/img/content/elements/elements.json', type: 'spritesheet'},
    // {id: 'win-10', src: 'static/img/content/elements/win-10.json', type: 'spritesheet'},
    // {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    // {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    // {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    // {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    // {id: 'freeSpinsText', src: 'static/img/content/bg/freeSpinsText.png'},
    // {id: 'bigWinText', src: 'static/img/content/bg/bigWinText.png'},
    // {id: 'totalWinText', src: 'static/img/content/bg/totalWinText.png'},
    // {id: 'firstRules', src: 'static/img/content/bg/firstRules.png'},
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
    // {id: 'linesDisc', src: 'static/img/content/lines/linesDisc.json', type: 'spritesheet'},
    // {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    // {id: 'newBG', src: 'static/img/content/new/bg.png'},
    // {id: 'fonarSS', src: 'static/img/content/new/fonar.json', type: 'spritesheet'},
    // {id: 'gear-1', src: 'static/img/content/new/gear-1.png'},
    // {id: 'gear-2', src: 'static/img/content/new/gear-2.png'},

    // fs
    // sounds
    // {id: 'spinSound', src: 'static/img/content/sounds/spin.mp3'},

    // bonuses
    // {id: 'bonusFly', src: 'static/img/content/bonuses/win/bonusFly.json', type: 'spritesheet'},
    // {id: 'bonusBackLight', src: 'static/img/content/bonuses/bonusBackLight.png'}
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
            y: 310
            // shadow: new c.Shadow('#C19433', 0, 0, 20)
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
        loader.installPlugin(createjs.Sound);

        createjs.Sound.registerSounds([
            {id: 'spinSound', src: 'static/img/content/sounds/spin.mp3'},
            {id: 'ambientSound', src: 'static/img/content/sounds/ambient.mp3'},
            {id: 'barabanSound', src: 'static/img/content/sounds/baraban.mp3'},
            {id: 'lineWinSound', src: 'static/img/content/sounds/lineWin.mp3'},
            {id: 'buttonClickSound', src: 'static/img/content/sounds/buttonClick.mp3'},
            {id: 'bonusPerehodSound', src: 'static/img/content/sounds/bonusPerehod.mp3'},
            {id: 'doorsAmbientSound', src: 'static/img/content/sounds/doorsAmbient.mp3'},
            {id: 'fsAmbientSound', src: 'static/img/content/sounds/fsAmbient.mp3'},
            {id: 'door1Sound', src: 'static/img/content/sounds/door1.mp3'},
            {id: 'door2Sound', src: 'static/img/content/sounds/door2.mp3'},
            {id: 'door3Sound', src: 'static/img/content/sounds/door3.mp3'},
            {id: 'door4Sound', src: 'static/img/content/sounds/door4.mp3'},
            {id: 'door5Sound', src: 'static/img/content/sounds/door5.mp3'},
            {id: 'muhaSound', src: 'static/img/content/sounds/muha.mp3'},
            {id: 'fsClockSound', src: 'static/img/content/sounds/fsClock.mp3'},
            {id: 'parSound', src: 'static/img/content/sounds/par.mp3'},
            {id: 'pressureSound', src: 'static/img/content/sounds/pressure.mp3'},
            {id: 'smehSound', src: 'static/img/content/sounds/smeh.mp3'}
        ]);

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
        storage.changeState('fastSpinSetting', false);
        const ambient = createjs.Sound.play('ambientSound', {loop: -1});
        storage.write('ambient', ambient);
        storage.changeState('music', true);
        const container = data.container;
        const game = document.querySelector('#game');
        canvas.fullScreen(game);
        container.cache(0, 0, w, h);
        const tl = new TimelineMax();
        tl.to(container, 1, {alpha: 0, onComplete: function () {
            stage.removeChild(container);
            storage.changeState('preloader', 'done');
        }});
        if ($('html').hasClass('ios') || $('html').hasClass('iphone')) {
            $(document).bind('touchmove', false);
        }
    }

    function checkState(state) {
        if (state === 'stage' && storage.readState('stage')) {
            startPreloader();
        }
    }

    events.on('changeState', checkState);
})();

$(function () {
    if (!$('html').hasClass('ios') || !$('html').hasClass('iphone')) {
        $('h1').hide();
    }
});
