/* eslint-disable no-undef */
const autoplay = (function () {

    let autoTimer;
    let autoCount;
    let autoEnd;

    function initAutoplay(count) {
        autoCount = count;
        autoEnd = false;
    }

    function startAutoplay() {
        console.log('I am starting autoplay!');
        autoCount--;
        if (!autoEnd) {
            spin.spinStart(true);
        }
        if (autoCount > 0) {
            buttons.changeAutoText(autoCount);
        } else {
            events.trigger('stopAutoplay');
        }
    }

    function stopAutoplay() {
        console.log('I am stoping autoplay!');
        autoEnd = true;
        lines.clearAutoTimer();
    }

    events.on('initAutoplay', initAutoplay);
    events.on('startAutoplay', startAutoplay);
    events.on('stopAutoplay', stopAutoplay);


    function checkState(state) {
        if (state === 'autoplay' && storage.readState(state) === 'started') {
            startAutoplay();
        }
    }

    events.on('changeState', checkState);

    return {
        initAutoplay,
        startAutoplay,
        stopAutoplay
    };
})();
