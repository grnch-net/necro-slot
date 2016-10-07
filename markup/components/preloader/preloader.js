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
            scaleX: 0.9,
            scaleY: 0.9,
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

        // const ssAtlas = loader.getResult('atlas');
        // const bookTop = new c.Sprite(ssAtlas, 'book0').set({
        //     name: 'bookTop',
        //     x: utils.width / 2 + 77,
        //     y: utils.height / 2 - 80,
        //     regX: 300,
        //     regY: 300
        // });
        // const bookBot = new c.Sprite(ssAtlas, 'bookBot').set({
        //     name: 'bookBot',
        //     x: utils.width / 2 + 77,
        //     y: utils.height / 2 - 85,
        //     regX: 300,
        //     regY: 300
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
        preloaderContainer.addChild(preloaderCache, fon2, preloaderPlay);
        // preloaderContainer.addChild(bookTop);
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
        events.trigger('preloader:goFullscreen');
        storage.changeState('fastSpinSetting', false);

        // Это стоит вынести в модуль музыки
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
