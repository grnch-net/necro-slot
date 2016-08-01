let login = (function () {

    let sessionID;

    function enter(userID, casinoID) {
        userID = userID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        /* eslint-disable */
        utils.request('_Login', `/${userID}/${casinoID}`)
        /* eslint-enable */
            .then(ID => {
                sessionID = ID;
                /* eslint-disable */
                events.trigger('initGame', sessionID);
                events.trigger('initStages', sessionID);
                events.trigger('initPreloader', sessionID);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    /* eslint-disable */
    function getSessionID() {
        return utils.getData(sessionID);
    }
    /* eslint-enable */

    return {
        enter,
        getSessionID
    };

})();

login.enter();
