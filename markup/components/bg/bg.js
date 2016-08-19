/* eslint-disable no-undef*/
const bg = (function () {

    const c = createjs;
    const w = utils.width;
    const h = utils.height;

    function drawBG() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');
        const bgSS = loader.getResult('bg');
        // const mainBG = new c.Sprite(bgSS, 'mainBG').set({
        //     name: 'mainBG'
        // });
        const mainBG = new c.Bitmap(loader.getResult('newBGLight')).set({
            name: 'mainBG'
        });
        const gameBG = new c.Sprite(bgSS, 'gameBG').set({
            name: 'gameBG'
        });
        const fonar = new c.Bitmap(loader.getResult('fonar')).set({
            name: 'fonar',
            x: 51,
            y: 9,
            regX: 248,
            regY: 18
        });
        let fpsMeter = new createjs.Text("", 'Arial 30px', '#fff').set({
            x: 800,
            y: 10
        });
        createjs.Ticker.on('tick', function () {
            let fps = createjs.Ticker.getMeasuredFPS();
            fpsMeter.text = fps;
        });
        let tl = new TimelineMax({repeat: -1, yoyo: true});
        tl.to(fonar, 4, {rotation: 30})
            .to(fonar, 4, {rotation: -30});
        // createjs.Tween.get(fonar)
        //     .to({rotation: 5}, 2000)
        //     .to({rotation: -5}, 2000)
        //     .to({rotation: 5}, 2000)
        //     .to({rotation: -5}, 2000)
        //     .to({rotation: 5}, 2000)
        //     .to({rotation: -5}, 2000);
        // const gameMachine = new c.Sprite(bgSS, 'gameMachine').set({
        //     name: 'gameMachine'
        // });
        const gameMachine = new c.Bitmap(loader.getResult('newGameMachine')).set({
            name: 'gameMachine',
            x: 80,
            y: 5
        });
        const gear1 = new c.Bitmap(loader.getResult('gear-1')).set({
            name: 'gear1',
            x: 412,
            y: 38,
            regX: 24,
            regY: 24
        });
        const gear2 = gear1.clone().set({
            name: 'gear2',
            x: 520,
            y: 42,
            scaleX: 1.4,
            scaleY: 1.4
        });
        const footerBgDown = new c.Shape().set({
            name: 'footerBgDown'
        });
        const footerBgUp = new c.Shape().set({
            name: 'footerBgUp'
        });
        const home = new c.Bitmap(loader.getResult('home')).set({
            name: 'homeButton',
            x: 15,
            y: h - 63
        });
        footerBgDown.graphics.beginFill('rgba(0, 0, 0)').drawRect(0, h - 30, w, 30);
        footerBgUp.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, h - 70, w, 40);
        const bgContainer = new c.Container().set({
            name: 'bgContainer'
        });
        const fgContainer = new c.Container().set({
            name: 'fgContainer'
        });
        const fgRules = new c.Bitmap(loader.getResult('firstRules')).set({
            name: 'fgRules'
        });
        fgRules.on('click', function () {
            createjs.Tween.get(fgRules)
            .to({alpha: 0}, 500)
            .call(function () {
                stage.removeChild(fgRules);
            });
        });

        const bgTL = new TimelineMax();
        bgTL.to([gear1, gear2], 15, {rotation: 360, ease: Linear.easeNone});

        bgContainer.addChild(mainBG, gameBG, footerBgUp, footerBgDown, home, fpsMeter);
        fgContainer.addChild(gameMachine);
        stage.addChildAt(bgContainer, fgContainer, fonar, fgRules, 0);
        // bgContainer.cache(0, 0, w, h);
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
