/* eslint-disable no-undef*/
const bg = (function () {

    const c = createjs;
    const w = utils.width;
    const h = utils.height;

    function drawBG() {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');

        const bgContainer = new c.Container().set({name: 'bgContainer'});
        const fgContainer = new c.Container().set({name: 'fgContainer'});
        const mainBG = new c.Bitmap(loader.getResult('newBGLight')).set({name: 'mainBG'});
        const gameBG = new c.Sprite(loader.getResult('bg'), 'gameBG').set({name: 'gameBG'});
        const gameMachine = new c.Bitmap(loader.getResult('newGameMachine')).set({
            name: 'gameMachine',
            x: 80,
            y: 5
        });
        const fonar = new c.Bitmap(loader.getResult('fonar')).set({
            name: 'fonar',
            x: 71,
            y: 23,
            regX: 267,
            regY: 0
        });
        const fonarTL = new TimelineMax({repeat: -1, yoyo: true});
        fonarTL.to(fonar, 2, {ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 0.1, points: 10, taper: 'none', randomize: true, clamp: false}), alpha: 0.7});

        const footerBgDown = new c.Shape().set({name: 'footerBgDown'});
        const footerBgUp = new c.Shape().set({name: 'footerBgUp'});
        footerBgDown.graphics.beginFill('rgba(0, 0, 0)').drawRect(0, h - 30, w, 30);
        footerBgUp.graphics.beginFill('rgba(0, 0, 0, 0.6)').drawRect(0, h - 70, w, 40);

        const home = new c.Bitmap(loader.getResult('home')).set({
            name: 'homeButton',
            x: 15,
            y: h - 63
        });
        home.on('click', function () {
            utils.request('_Logout/', storage.read('sessionID'))
            .then((response) => {
                console.log('Logout response:', response);
            });
            window.history.back();
        });


        bgContainer.addChild(mainBG, gameBG, footerBgUp, footerBgDown, home);
        fgContainer.addChild(gameMachine, fonar);
        stage.addChildAt(bgContainer, fgContainer, 0);

        // TODO: Разобраться с кешированием бекграундов
        // TODO: Перенасти отрисовку нижних полосок меню в модуль balance

        storage.changeState('bgDraw', 'main');
        storage.changeState('side', 'left');
    }

    function checkState(state) {
        if (state === 'loaded' && storage.readState('loaded')) {
            drawBG();
        }
        if (state === 'side') {
            const stage = storage.read('stage');
            const fg = stage.getChildByName('fgContainer');
            const fonar = fg.getChildByName('fonar');
            if (storage.readState(state) === 'left') {
                fonar.x = 71;
            } else if (storage.readState(state) === 'right') {
                fonar.x = 71 - 150;
            }
        }
    }

    events.on('changeState', checkState);

})();
