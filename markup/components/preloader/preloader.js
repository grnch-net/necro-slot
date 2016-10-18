import { utils } from 'components/utils/utils';
import { storage } from 'components/storage/storage';
import { events } from 'components/events/events';
import { preloaderManifest, mainManifest } from 'components/preloader/manifests';

export let preloader = (function () {

    let config;
    const defaultConfig = {
        fadingTime: 1
    };

    const c = createjs;
    const w = utils.width;
    const h = utils.height;
    let stage;

    function start(configObj) {
        config = configObj || defaultConfig;
    }

    function startPreloader() {
        const loader = new c.LoadQueue(true);
        loader.setMaxConnections(4);
        loader.loadManifest(preloaderManifest);
        loader.on('complete', showPreloader);
    }

    function showPreloader(event) {
        stage = storage.read('stage');
        const loader = event.target;

        const newPreloaderContainer = new c.Container().set({ name: 'newPreloaderContainer' });
        const lineSS = loader.getResult('line');
        const coinSS = loader.getResult('coin');
        const line = new c.Sprite(lineSS).set({
            name: 'preloaderLine',
            y: 450
        });
        const coin = new c.Sprite(coinSS, 'coin').set({
            name: 'preloaderCoin',
            y: 200,
            scaleX: 0.5,
            scaleY: 0.5,
            framerate: 24
        });
        utils.getCenterPoint(line);
        utils.setInCenterOf(line, utils.width);
        line.paused = true;
        utils.getCenterPoint(coin);
        utils.setInCenterOf(coin, utils.width);
        coin.play();
        const darkBG = new c.Shape();
        darkBG.graphics.beginFill('#000').drawRect(0, 0, utils.width, utils.height);
        newPreloaderContainer.addChild(darkBG, line, coin);

        stage.addChild(newPreloaderContainer);

        mainPreload(newPreloaderContainer);
    }

    function drawInitScreen() {
        const loader = storage.read('loadResult');

        createjs.Sound.play('initBookSound', {loop: -1});
        const preloaderContainer = new c.Container().set({ name: 'preloaderContainer' });
        const preloaderCache = new c.Container().set({ name: 'preloaderCache' });
        const preloaderBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });

        const fon2 = new createjs.Bitmap(loader.getResult('fsFonTest2')).set({
            x: utils.width / 2,
            y: utils.height / 2,
            regX: 684 / 2,
            regY: 684 / 2,
            scaleX: 1.9,
            scaleY: 1.9,
            alpha: 0.5
        });
        let tlFon = new TimelineMax({ repeat: -1 });
        tlFon.to(fon2, 300, { rotation: 360 });

        const bookTop = new createjs.Bitmap(loader.getResult('bookTopPreload')).set({
            name: 'bookTopPreload',
            x: utils.width / 2 + 35,
            y: utils.height / 2 - 80,
            scaleX: 0.66,
            scaleY: 0.66,
            regX: 500,
            regY: 650
        });
        const bookBackPreload = new createjs.Bitmap(loader.getResult('bookBackPreload')).set({
            name: 'bookTopPreload',
            x: utils.width / 2 + 35,
            y: utils.height / 2 - 80,
            scaleX: 0.66,
            scaleY: 0.66,
            regX: 500,
            regY: 650
        });
        const logoPreload = new createjs.Bitmap(loader.getResult('logoPreload')).set({
            name: 'logoPreload',
            x: utils.width / 2,
            y: utils.height / 2 - 80,
            scaleX: 0.66,
            scaleY: 0.66,
            regX: 250,
            regY: 60
        });

        const ssNewElements = loader.getResult('new_elements');
        const elem1 = new c.Sprite(ssNewElements, '6-n').set({
            name: 'elem1',
            x: utils.width / 2 - 100,
            y: utils.height / 2 - 320
        });
        const elem2 = new c.Sprite(ssNewElements, '4-n').set({
            name: 'elem2',
            x: utils.width / 2 - 100,
            y: utils.height / 2 - 125
        });
        const elem3 = new c.Sprite(ssNewElements, '8-n').set({
            name: 'elem3',
            x: utils.width / 2 - 240,
            y: utils.height / 2 - 125
        });
        const elem4 = new c.Sprite(ssNewElements, '2-n').set({
            name: 'elem4',
            x: utils.width / 2 - 240,
            y: utils.height / 2 - 325
        });

        // const ssfsScreen = loader.getResult('fsScreen');
        // const bookBot = new c.Sprite(ssfsScreen, 'bookBot').set({
        //     name: 'bookBot',
        //     x: utils.width / 2 - 220,
        //     y: utils.height / 2 - 430,
        //     scaleX: 2.6,
        //     scaleY: 2.6
        // });

        const preloaderPlay = new createjs.Bitmap(loader.getResult('play'));
        preloaderPlay.set({
            name: 'preloaderPlay',
            x: w / 2,
            y: h / 2 + 250,
            regX: preloaderPlay.getBounds().width / 2,
            regY: preloaderPlay.getBounds().height / 2,
            scaleX: 0.8,
            scaleY: 0.8
        });

        preloaderCache.addChild(preloaderBG);
        preloaderCache.cache(0, 0, w, h);
        preloaderContainer.addChild(preloaderCache, fon2, preloaderPlay, bookBackPreload, bookTop, elem1, elem2, elem3, elem4, logoPreload);
        preloaderContainer.on('click', function (e) {
            e.stopPropagation();
        });
        stage.addChild(preloaderContainer);

    }

    function mainPreload(container) {
        const sprite = container.getChildByName('preloaderLine');
        const loader = new c.LoadQueue(true);
        loader.installPlugin(c.Sound);
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
        const currentFrame = Math.floor(progress * framesNumber) - 1;
        sprite.gotoAndStop(currentFrame);
        if (progress === 1) {
            sprite.gotoAndStop(framesNumber - 1);
            event.remove();
        }
    }

    function handleLoadComplete(event, data) {
        storage.write('loadResult', event.target);
        drawInitScreen();
        setTimeout(clearPreloader, 100);
    }

    function clearPreloader() {
        let preloaderContainer = stage.getChildByName('preloaderContainer');
        let play = preloaderContainer.getChildByName('preloaderPlay');
        play.on('click', handlePlayClick, play, true);

        let tl = new TimelineMax({repeat: -1});
        tl.to(play, 0.1, {rotation: -5, ease: Power0.easeNone, delay: 2})
            .to(play, 0.1, {rotation: 5, ease: Power0.easeNone})
            .to(play, 0.1, {rotation: -5, ease: Power0.easeNone})
            .to(play, 0.1, {rotation: 5, ease: Power0.easeNone})
            .to(play, 0.1, {rotation: 0, ease: Power0.easeNone});

        let newPreloaderContainer = stage.getChildByName('newPreloaderContainer');
        newPreloaderContainer.cache(0, 0, utils.width, utils.height);
        TweenMax.to(newPreloaderContainer, 0.5, {alpha: 0, onComplete: function () {
            storage.changeState('loaded', true);
            events.trigger('preloader:loaded');
            stage.removeChild(newPreloaderContainer);
        }});
    }

    function handlePlayClick(event, data) {
        let isMobile = storage.read('isMobile');
        if (isMobile) {
            const loader = storage.read('loadResult');

            document.getElementById('game').addEventListener('click', () => {
                events.trigger('preloader:goFullscreen');
            });

            const portratContainer = new c.Container().set({
                name: 'portratContainer'
            });
            const bgBlack = new c.Shape();
            bgBlack.graphics.beginFill('rgba(0, 0, 0)').drawRect(0, 0, w, h);
            const portrat = new c.Bitmap(loader.getResult('portrat'));
            portrat.set({
                x: w / 2,
                y: h / 2,
                regX: 360,
                regY: 242
            });
            portratContainer.addChild(bgBlack, portrat);
            stage.addChild(portratContainer);

            if (screen.orientation.type.indexOf('landscape') === -1) {
                portratContainer.visible = true;
            } else {
                portratContainer.visible = false;
            }

            window.addEventListener('orientationchange', () => {
                if (screen.orientation.type.indexOf('landscape') === -1 ) {
                    portratContainer.visible = true;
                } else {
                    portratContainer.visible = false;
                }
            });
        }

        events.trigger('preloader:goFullscreen');
        storage.changeState('fastSpinSetting', false);

        // Это стоит вынести в модуль музыки
        createjs.Sound.stop('initBookSound');
        const ambient = c.Sound.play('ambientSound', {loop: -1});
        storage.write('ambient', ambient);
        storage.changeState('music', true);
        // Конец фрагмента

        const loader = storage.read('loadResult');
        const container = storage.read('stage').getChildByName('preloaderContainer');
        container.cache(0, 0, w, h);

        const tl = new TimelineMax();
        tl.to(container, config.fadingTime, {alpha: 0, onComplete: function () {
            stage.removeChild(container);
            storage.changeState('preloader', 'done');
            events.trigger('preloader:done');
        }});

    }

    return {
        start,
        startPreloader
    };

})();
