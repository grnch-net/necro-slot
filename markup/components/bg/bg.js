/* eslint-disable no-undef*/
const bg = (function () {

    const c = createjs;
    const w = utils.width;
    const h = utils.height;

    function drawBG() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');
        const bgSS = loader.getResult('bg');
        const mainBG = new c.Sprite(bgSS, 'mainBG').set({
            name: 'mainBG'
        });
        const gameBG = new c.Sprite(bgSS, 'gameBG').set({
            name: 'gameBG'
        });
        const gameMachine = new c.Sprite(bgSS, 'gameMachine').set({
            name: 'gameMachine'
        });
        const footerBG = new c.Shape().set({
            name: 'footerBG'
        });
        footerBG.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, h - 40, w, 40);
        const bgContainer = new c.Container().set({
            name: 'bgContainer'
        });
        const fgContainer = new c.Container().set({
            name: 'fgContainer'
        });

        bgContainer.addChild(mainBG, gameBG, footerBG);
        fgContainer.addChild(gameMachine);
        stage.addChildAt(bgContainer, fgContainer, 0);
        bgContainer.cache(0, 0, w, h);
        fgContainer.cache(0, 0, w, h);

        storage.changeState('bgDraw', 'main');
        storage.changeState('side', 'left');
    }

    function checkState(state) {
        if (state === 'loaded' && storage.readState('loaded')) {
            drawBG();
        }
    }

    events.on('changeState', checkState);
})();
