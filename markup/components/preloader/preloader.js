const preloaderManifest = [
    {id: 'preloaderBG', src: 'static/img/general/preloader/bg.png'},
    {id: 'preloaderButton', src: 'static/img/general/preloader/button.png'},
    {id: 'preloaderPlay', src: 'static/img/general/preloader/play.png'},
    {id: 'preloaderSpriteSheet', src: 'static/img/general/preloader/sprite.json', type: 'spritesheet'}
];

const mainManifest = [
    // bg
    {id: 'mainBG', src: 'static/img/content/bg/mainBG.png'},
    {id: 'gameBG', src: 'static/img/content/bg/gameBG.png'},
    {id: 'topLight', src: 'static/img/content/bg/topLight.png'},
    {id: 'eyeLight', src: 'static/img/content/bg/eyeLight.png'},
    {id: 'bubble', src: 'static/img/content/bg/bubble.png'},
    {id: 'sharkSpriteSheet', src: 'static/img/content/bg/sprites/shark.json', type: 'spritesheet'},
    {id: 'fishSpriteSheet', src: 'static/img/content/bg/sprites/fish.json', type: 'spritesheet'},
    {id: 'labelSpriteSheet', src: 'static/img/content/bg/sprites/label.json', type: 'spritesheet'}
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
        const preloaderButton = new createjs.Bitmap(queue.getResult('preloaderButton'));
        const preloaderPlay = new createjs.Bitmap(queue.getResult('preloaderPlay'))
            .set({name: 'playText'});
        const preloaderSpriteSheet = queue.getResult('preloaderSpriteSheet');

        const playButton = new createjs.Container()
            .set({
                name: 'playButton',
                x: 762,
                y: 700,
                visible: false,
                shadow: new createjs.Shadow('#ffffff', 2, 5, 10)
            });
        const buttonTween = createjs.Tween.get(preloaderPlay, {loop: true, paused: true})
            .to({alpha: 0.7}, 400)
            .to({alpha: 1}, 400);

        const preloaderSprite = new createjs.Sprite(preloaderSpriteSheet)
            .set({
                name: 'preloaderSprite',
                x: 347,
                y: 1000
            });

        bonusStaticStage = canvas.getStages().bonusStaticStage;
        bonusStage = canvas.getStages().bonusStage;

        bonusStaticStage.addChild(preloaderBG);
        bonusStaticStage.update();

        playButton.addChild(preloaderButton, preloaderPlay);
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
            playButton
        });
        /* eslint-enable */
    }

    function _handleFileLoad(event, data) {
        filesLoaded += 1;

        let sprite = data.sprite;
        let filesNumber = mainManifest.length;
        let framesNumber = sprite.spriteSheet.getNumFrames();
        let currentFrame = Math.ceil((filesLoaded / filesNumber) * framesNumber) - 1;

        sprite.gotoAndStop(currentFrame);
    }

    function _handleLoadComplete(event, data) {
        let buttonTween = data.buttonTween;
        let playButton = data.playButton;

        playButton.visible = true;
        buttonTween.setPaused(false);

        /* eslint-disable */
        playButton.on('click', _handlePlayClick, this, true, {
            playButton
        });

        loadResult = event.target;
        events.trigger('preloadComplete', loadResult);
        /* eslint-enable */
    }

    function _handlePlayClick(event, data) {
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
        /* eslint-enable */
    }

    /* eslint-disable */
    events.on('initPreloader', downloadManifest);
    /* eslint-enable */
    return {

    };
})();
