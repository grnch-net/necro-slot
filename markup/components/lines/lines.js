let lines = (function () {

    function initLines(linesArray) {
        console.log('Lines are downloaded!');
        /* eslint-disable */
        events.trigger('linesCreated', linesArray);
        /* eslint-enable */
    }

    /* eslint-disable */
    events.on('initLines', initLines);
    /* eslint-enable */

    return {

    };
})();
