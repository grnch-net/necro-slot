let login = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    let sessionID;

    function _requestSessionID(userID, casinoID) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}_Login/${userID}/${casinoID}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function enter(userID, casinoID) {
        userID = userID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        _requestSessionID(userID, casinoID)
            .then(ID => {
                sessionID = ID;
                console.log(`I am logged! SessionID is ${sessionID}.`);
                /* eslint-disable */
                events.trigger('initGame', sessionID);
                events.trigger('initStages', sessionID);
                events.trigger('initPreloader', sessionID);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    function promiseSessionID() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', (event) => {
                /* eslint-enable */
                if (typeof sessionID !== 'undefined') {
                    event.remove();
                    resolve(sessionID);
                }
            });
        });
    }

    function getSessionID() {
        if (typeof sessionID !== 'undefined') {
            return sessionID;
        } else {
            throw new Error('We have no sessionID!');
        }
    }

    return {
        enter,
        getSessionID,
        promiseSessionID
    };

})();

login.enter();
