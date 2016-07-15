const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/general/preloader/bg.png'},
    {id: 'preloaderPlay', src: 'static/img/general/preloader/play.png'},
    {id: 'preloaderSpriteSheet', src: 'static/img/general/preloader/sprite.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'footerBG', src: 'static/img/content/bg/footerBG.png'},
    {id: 'gameMachine', src: 'static/img/content/bg/gameMachine.png'},
    {id: 'gameShadow', src: 'static/img/content/bg/gameShadow.png'},
    // buttons
    {id: 'spinButton', src: 'static/img/content/buttons/spin.json', type: 'spritesheet'},
    {id: 'autoButton', src: 'static/img/content/buttons/auto.json', type: 'spritesheet'},
    {id: 'betButton', src: 'static/img/content/buttons/bet.json', type: 'spritesheet'},
    {id: 'menuButton', src: 'static/img/content/buttons/menu.json', type: 'spritesheet'},
    {id: 'soundButton', src: 'static/img/content/buttons/sound.json', type: 'spritesheet'},
    // lines
    {id: 'linesPipka', src: 'static/img/content/lines/linesPipka.json', type: 'spritesheet'},
    {id: 'linesSprite', src: 'static/img/content/lines/linesSprite.json', type: 'spritesheet'},
    {id: 'winLine', src: 'static/img/content/lines/winLine.png'},
    {id: 'winTotal', src: 'static/img/content/lines/winTotal.png'},
    // elements
    {id: 'element1', src: 'static/img/content/elements/element1.json', type: 'spritesheet'},
    {id: 'element2', src: 'static/img/content/elements/element2.json', type: 'spritesheet'},
    {id: 'element3', src: 'static/img/content/elements/element3.json', type: 'spritesheet'},
    {id: 'element4', src: 'static/img/content/elements/element4.json', type: 'spritesheet'},
    {id: 'element5', src: 'static/img/content/elements/element5.json', type: 'spritesheet'},
    {id: 'element6', src: 'static/img/content/elements/element6.json', type: 'spritesheet'},
    {id: 'element7', src: 'static/img/content/elements/element7.json', type: 'spritesheet'},
    {id: 'element8', src: 'static/img/content/elements/element8.json', type: 'spritesheet'},
    {id: 'element9', src: 'static/img/content/elements/element9.json', type: 'spritesheet'},
    {id: 'element10', src: 'static/img/content/elements/element10.json', type: 'spritesheet'},
    {id: 'element11', src: 'static/img/content/elements/element11.json', type: 'spritesheet'},
    {id: 'element12', src: 'static/img/content/elements/element12.json', type: 'spritesheet'},
    {id: 'element13', src: 'static/img/content/elements/element13.json', type: 'spritesheet'}
];

let preloader = (function () {

    let filesLoaded = 0;
    let loadResult;

    let bonusStaticStage;
    let bonusStage;

    function downloadManifest() {
        /* eslint-disable */
        const queue = new createjs.LoadQueue(true);
        queue.setMaxConnections(4);
        queue.loadManifest(preloaderManifest);
        queue.on('complete', showPreloader);
        /* eslint-enable */
    }

    function showPreloader(event) {
        const queue = event.target;
        /* eslint-disable */
        const preloaderBG = new createjs.Bitmap(queue.getResult('preloaderBG'));
        // const preloaderButton = new createjs.Bitmap(queue.getResult('preloaderButton'));
        const preloaderPlay = new createjs.Bitmap(queue.getResult('preloaderPlay'))
            .set({name: 'playText'});
        const preloaderSpriteSheet = queue.getResult('preloaderSpriteSheet');
        const preloaderFinishSpriteSheet = queue.getResult('preloaderFinishSpriteSheet');

        const playButton = new createjs.Container()
            .set({
                name: 'playButton',
                x: 482,
                y: 560,
                visible: false,
                shadow: new createjs.Shadow('#C19433', 0, 0, 20)
            });
        const buttonTween = createjs.Tween.get(preloaderPlay, {loop: true, paused: true})
            .to({alpha: 0.7}, 400)
            .to({alpha: 1}, 400);

        const preloaderSprite = new createjs.Sprite(preloaderSpriteSheet, "start")
            .set({
                name: 'preloaderSprite',
                x: 614,
                y: 232
            });

        bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage = canvas.getStages().bonusStage;

        bonusStaticStage.addChild(preloaderBG);
        bonusStaticStage.update();

        playButton.addChild(/*preloaderButton, */preloaderPlay);
        bonusStage.addChild(playButton, preloaderSprite);

        mainPreload(preloaderSprite, buttonTween, playButton);
        console.log('I am Preloader and I has started loading!');
        /* eslint-enable */
    }

    function mainPreload(sprite, buttonTween, playButton) {
        /* eslint-disable */
        const queue = new createjs.LoadQueue(true);
        queue.setMaxConnections(20);
        queue.loadManifest(mainManifest);
        queue.on('fileload', _handleFileLoad, this, false, {
            sprite
        });
        queue.on('complete', _handleLoadComplete, this, true, {
            buttonTween,
            playButton,
            sprite
        });
    }

    function _handleFileLoad(event, data) {
        filesLoaded += 1;

        let sprite = data.sprite;
        sprite.framerate = 12;
        let filesNumber = mainManifest.length;
        let framesNumber = sprite.spriteSheet.getNumFrames();
        let currentFrame = Math.ceil((filesLoaded / filesNumber) * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function _handleLoadComplete(event, data) {
        let buttonTween = data.buttonTween;
        let playButton = data.playButton;
        let sprite = data.sprite;

        playButton.visible = true;
        buttonTween.setPaused(false);
        sprite.gotoAndPlay("finish");

        /* eslint-disable */
        playButton.on('click', _handlePlayClick, this, true, {
            playButton
        });

        loadResult = event.target;
        events.trigger('preloadComplete', loadResult);
        /* eslint-enable */
    }

    function _handlePlayClick(event, data) {
        let game = document.querySelector('#game');
        let playButton = data.playButton;
        let playText = playButton.getChildByName('playText');
        /* eslint-disable */
        createjs.Tween.removeTweens(playText);
        createjs.Ticker.on('tick', bonusStaticStage);
        createjs.Tween.get(bonusStage)
            .to({alpha: 0}, 1000, createjs.Ease.circIn)
            .call(canvas.clearStage, [bonusStage]);
        createjs.Tween.get(bonusStaticStage)
            .to({alpha: 0}, 1000, createjs.Ease.circIn)
            .call(canvas.clearStage, [bonusStaticStage]);
        canvas.launchFullScreen(game);
        /* eslint-enable */
    }

    function getLoadResult() {
        if (loadResult) {
            return loadResult;
        } else {
            console.error('We have not loaded assets!');
        }
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */
    return {
        getLoadResult
    };
})();
