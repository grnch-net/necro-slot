let login = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    let logged = false;
    let sessionID;

    function requestSessionID(userID, casinoID) {
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

    function tryToLogin(userID, casinoID) {
        userID = userID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        return requestSessionID(userID, casinoID)
            .then((ID) => {
                logged = true;
                sessionID = ID;
                console.log(`I am logged! SessionID is ${sessionID}.`);
                /* eslint-disable */
                events.trigger('logged', sessionID);
                events.trigger('initCanvas', sessionID);
                events.trigger('initPreloader', sessionID);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    function getSessionID() {
        /* eslint-disable */
        if (sessionID !== undefined) {
        /* eslint-enable */
            return sessionID;
        } else {
            throw new Error('You are not logged.');
        }
    }

    return {
        tryToLogin,
        getSessionID
    };

})();
login.tryToLogin();
