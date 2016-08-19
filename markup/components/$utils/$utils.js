const utils = (function () {

    const serviceUrl = 'http://stablegameservice.bossgs.org/slot/SlotService.svc/';
    const canvasWidth = 1280;
    const canvasHeight = 720;
    const gameWidth = 960;
    const gameHeight = 540;
    const elementHeight = 180;
    const elementWidth = 192;

    function request(name, path) {
        console.log(`Request: ${serviceUrl}${name}${path}`);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}${name}${path}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    return {
        request,
        width: canvasWidth,
        height: canvasHeight,
        gameWidth,
        gameHeight,
        elementWidth,
        elementHeight
    };
})();
