let autoplay = (function () {

    let autoTimer;
    let autoCount;
    let autoEnd;

    /* eslint-disable no-undef */
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

    return {
        initAutoplay,
        startAutoplay,
        stopAutoplay
    };
})();
