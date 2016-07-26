let canvas = (function () {

    let stages;

    function initStages() {
        /* eslint-disable */
        const bgStaticStage = new createjs.Stage('bgStaticCanvas').set({name: 'bgStaticStage'});
        const gameStaticStage = new createjs.Stage('gameStaticCanvas').set({name: 'gameStaticStage'});
        const bonusStaticStage = new createjs.Stage('bonusStaticCanvas').set({name: 'bonusStaticStage'});
        const bgStage = new createjs.Stage('bgCanvas').set({name: 'bgStage'});
        const gameStage = new createjs.Stage('gameCanvas').set({name: 'gameStage'});
        const bonusStage = new createjs.Stage('bonusCanvas').set({name: 'bonusStage'});
        gameStage.snapToPixelEnabled = true;
        bonusStage.nextStage = gameStage;
        bonusStage.enableMouseOver(10);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', bgStage);
        createjs.Ticker.on('tick', gameStage);
        createjs.Ticker.on('tick', bonusStage);

        stages = {
            bgStage,
            bgStaticStage,
            gameStage,
            gameStaticStage,
            bonusStage,
            bonusStaticStage
        };

        events.trigger('stagesCreated', stages);
        /* eslint-enable */
    }

    function launchFullScreen(e) {
        /* eslint-disable */
        e.requestFullScreen ? e.requestFullScreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen && e.webkitRequestFullScreen();
        /* eslint-enable */
    }

    function getStages() {
        if (typeof stages !== 'undefined') {
            return stages;
        } else {
            throw new Error('Stages are not created.');
        }
    }

    function clearStage(stage) {
        /* eslint-disable */
        stage.removeAllChildren();
        stage.off("tick", stage.handleEvent);
        createjs.Tween.removeTweens(stage);
        console.log(`I have cleared ${stage.toString()}!`);
        /* eslint-enable */
    }

    /* eslint-disable */
    events.on('initStages', initStages);
    /* eslint-enable */

    return {
        getStages,
        clearStage,
        launchFullScreen
    };
})();
