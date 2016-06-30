let login = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    // Flag
    let logged = false;

    function getSessionID(userID, casinoID) {
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
        return getSessionID(userID, casinoID)
            .then(sessionID => {
                logged = true;
                console.log(`I am logged! SessionID is ${sessionID}`);
                /* eslint-disable */
                events.trigger('logged', sessionID);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    function isLogged() {
        if (logged) {
            console.log('You are logged.');
        } else {
            console.log('I don\'t know you.');
        }
    }

    return {
        tryToLogin: tryToLogin,
        isLogged: isLogged
    };

})();
