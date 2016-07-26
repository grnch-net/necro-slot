let autoplay = (function () {

    let autoTimer;
    let autoCount;
    let autoEnd;

    function initAutoplay(count) {
        autoCount = count;
        autoEnd = false;
    }

    function startAutoplay() {
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
