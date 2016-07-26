let freeSpins = (function () {

    function drawFreeSpinsBG() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let fsBG = new createjs.Bitmap(loader.getResult('fsBG')).set({
            name: 'fsBG'
        });
        stage.removeChild(stage.getChildByName('mainBG'));
        stage.addChildAt(fsBG, 0);
        stage.update();
    }

    function initFreeSpins(count) {
        drawFreeSpinsBG();
    }

    function stopFreeSpins() {
        let loader = preloader.getLoadResult();
        let stage = canvas.getStages().bgStaticStage;
        let mainBG = new createjs.Bitmap(loader.getResult('mainBG')).set({
            name: 'mainBG'
        });
        stage.removeChild(stage.getChildByName('fsBG'));
        stage.addChildAt(mainBG, 0);
        stage.update();
    }

    events.on('initFreeSpins', initFreeSpins);
    events.on('stopFreeSpins', stopFreeSpins);
    return {
        initFreeSpins,
        stopFreeSpins
    };
})();
