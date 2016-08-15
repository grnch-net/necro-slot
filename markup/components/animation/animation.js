/* eslint-disable no-undef */
const animation = (function () {

    function fadeOut(target, callback) {
        const tl = new TimelineMax();
        tl
            .to(target, 1, {alpha: 0, onComplete: callback});
        return tl;
    }

    function roll(columns, shadows, onEnd) {
        const tl = new TimelineMax();
        tl
            .staggerTo(columns, 2, {y: -utils.elementHeight, ease: Back.easeInOut.config(0.75)}, 0.1, '+=0', onEnd)
            .staggerTo(shadows, 1, {alpha: 1, ease: Power1.easeOut}, 0.1, 0)
            .staggerTo(shadows, 1, {alpha: 0, ease: Power1.easeIn}, 0.1, '-=1');
        return tl;
    }

    return {
        fadeOut,
        roll
    };
})();
