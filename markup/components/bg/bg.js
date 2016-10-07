// import CreateJS
// import TimelineMax
import { utils } from 'components/utils/utils';
import { storage } from 'components/storage/storage';
import { events } from 'components/events/events';

export let bg = (function () {

    let config;
    const defaultConfig = {
        bottomLineHeight: 30,
        topLineHeight: 40
    };

    const c = createjs;
    const w = utils.width;
    const h = utils.height;

    function start(configObj) {
        config = configObj || defaultConfig;
    }

    function drawBG() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');
        const isMobile = storage.read('isMobile');

        const bgContainer = new c.Container().set({name: 'bgContainer'});
        const fgContainer = new c.Container().set({
            name: 'fgContainer'
        });

        const mainBG = new c.Bitmap(loader.getResult('newBGLight')).set({name: 'mainBG'});

        const gameBG = new c.Bitmap(loader.getResult('gameBG')).set({
            name: 'gameBG',
            x: 80,
            y: 90
        });

        // Это нужно перенести в модуль баланса или оставить здесь
        const footerBgDown = new c.Shape().set({name: 'footerBgDown'});
        footerBgDown.graphics.beginFill('rgba(0, 0, 0)').drawRect(0, h - config.bottomLineHeight, w, config.bottomLineHeight);

        // Это нужно перенести в модуль кнопок либо отдельный модуль
        const home = new c.Bitmap(loader.getResult('home')).set({
            name: 'homeButton',
            x: 15 // Magic Numbers
        });
        home.y = (isMobile) ? h - 63 : h - 26;
        home.on('click', function () {
            utils.request('_Logout/', storage.read('sessionID'))
            .then((response) => {
                console.log('Logout response:', response);
            });
            window.history.back();
        });

        const rainContainer = new c.Container().set({name: 'rainContainer'});
        const ssMainScreen = loader.getResult('mainScreen');
        const rainSprite = new c.Sprite(ssMainScreen, 'rain' );
        for (let i = 0; i < 5; i++) {
            const _clone = rainSprite.clone().set({
                name: 'rainSprite' + i,
                x: 284 * i
            });
            _clone.gotoAndPlay('rain');
            rainContainer.addChild(_clone);
        }

        const lightningSprite = new c.Sprite(ssMainScreen, 'lightning0');
        rainContainer.addChild(lightningSprite);

        (function animLightning() {
            lightningSprite.set({
                x: Math.round( Math.random() * utils.width ),
                alpha: 1
            });
            lightningSprite.gotoAndStop('lightning' + Math.round( Math.random() * 3 ) );
            TweenMax.to(lightningSprite, 0.3, {alpha: 0});
            setTimeout(() => {
                animLightning();
            }, Math.round(Math.random() * 2000 + 300) );
        })();

        bgContainer.addChild(mainBG, rainContainer);
        if (isMobile) {
            const footerBgUp = new c.Shape().set({name: 'footerBgUp'});
            footerBgUp.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, h - config.bottomLineHeight - config.topLineHeight, w, config.topLineHeight);
            bgContainer.addChild(footerBgUp);
        }
        bgContainer.addChild(footerBgDown, home);
        fgContainer.addChild(gameBG);
        stage.addChildAt(bgContainer, fgContainer, 0);

        // TODO: Разобраться с кешированием бекграундов
        // TODO: Перенасти отрисовку нижних полосок меню в модуль balance

        storage.changeState('bgDraw', 'main');
        events.trigger('bg:main');
        storage.changeState('side', 'left');
        events.trigger('bg:changeSide', 'left');
    }

    return {
        start,
        drawBG
    };

})();
