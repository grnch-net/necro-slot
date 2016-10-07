// import CreateJS
// import TweenMax
import { utils } from 'components/utils/utils';
import { storage } from 'components/storage/storage';
import { events } from 'components/events/events';

export let canvas = (function () {

    let config;
    const defaultConfig = {
        canvas: '#game',
        mouseOver: 10,
        timeToSlide: 0.5
    };
    const c = createjs;

    function start(configObj) {
        config = configObj || defaultConfig;
    }

    function initStage() {

        // Определяем сцену
        const stage = new c.Stage('stage');
        stage.snapToPixelEnabled = true;
        stage.enableMouseOver(config.mouseOver);

        // Включаем heartbeet
        c.Ticker.timingMode = c.Ticker.RAF;
        c.Ticker.on('tick', stage);

        // Запишем холст в Storage
        storage.write('stage', stage);
        // Сцена создана
        storage.changeState('stage', true);
        events.trigger('canvas:stage', stage);

    }

    function fullScreen(e) {
        e = e || document.querySelector(config.canvas);
        /* eslint-disable */
        e.requestFullScreen ? e.requestFullScreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen();
        /* eslint-enable */
        iosFullScreenHack();
    }

    function iosFullScreenHack() {
        if ($('html').hasClass('ios') || $('html').hasClass('iphone')) {
            $(document).bind('touchmove', false);
        }
        $(function () {
            if (!$('html').hasClass('ios') || !$('html').hasClass('iphone')) {
                $('h1').hide();
            }
        });
    }

    function changeSide(side) {
        console.log('I must change side to:', side);

        const stage = storage.read('stage');
        const fg = stage.getChildByName('fgContainer');

        let delta;
        switch (side) {
            case 'right':
                delta = utils.width - fg.regX - 50;
                storage.changeState('side', 'right');
                break;
            case 'left':
                delta = fg.regX;
                storage.changeState('side', 'left');
                break;
            default:
                return;
        }

        TweenMax.to(fg, config.timeToSlide, {x: delta});
    }

    return {
        start,
        initStage,
        changeSide,
        fullScreen,
        iosFullScreenHack
    };
})();
