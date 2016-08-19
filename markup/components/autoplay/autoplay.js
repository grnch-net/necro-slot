/* eslint-disable no-undef */
const autoplay = (function () {

    let autoCount;
    let autoTimer;
    let autoEnd;

    function initAutoplay() {
        autoCount = storage.read('autoCount');
        autoEnd = false;
        startAutoplay();
    }

    function startAutoplay() {
        console.log('AutoCount', autoCount);
        autoCount--;
        if (!autoEnd) {
            roll.startRoll();
        }
        if (autoCount > 0) {
            storage.write('autoCount', autoCount);
            storage.changeState('autoCount', autoCount);
        } else {
            storage.changeState('autoplay', 'ended');
        }
    }

    function stopAutoplay() {
        autoEnd = true;
        const autoTimeout = storage.read('autoTimeout');
        clearTimeout(autoTimeout);
    }

    function checkState(state) {
        if (state === 'autoplay' && storage.readState(state) === 'started') {
            initAutoplay();
        }
        if (state === 'autoplay' && storage.readState(state) === 'ended') {
            stopAutoplay();
        }
    }

    events.on('changeState', checkState);

    return {
        startAutoplay
    };
})();
