/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
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
        autoCount--;
        if (!autoEnd) {
            if (balance.lowBalance()) {
                autoEnd = true;
                storage.changeState('autoplay', 'ended');
                utils.showPopup('Low balance!');
            }
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
        clearTimeout(storage.read('autoTimeout'));
        if (storage.readState('autoplay') !== 'ended') {
            storage.changeState('autoplay', 'ended');
        }
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
    events.on('initBonusLevel', stopAutoplay);
    events.on('initFreeSpins', stopAutoplay);

    return {
        startAutoplay
    };

})();
