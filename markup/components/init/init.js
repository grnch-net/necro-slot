let init = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';
    const gameID = 6; // КОСТЫЛЬ! Должен получать от сервера инициализации.

    let wheels;
    let balance;
    let lines;

    function _startGame(sessionID) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}_Play/${sessionID}/${gameID}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function _checkBalance(balanceData) {
        if (+balanceData.ScoreCents > 0 && +balanceData.ScoreCoins > 0) {
            return true;
        } else {
            throw new Error('Low money(((');
        }
    }

    function _requestWheels(sessionID, gameMode) {
        return new Promise(function (resolve, reject) {
            switch (gameMode) {
                case 'fsMode':
                    $.ajax({
                        url: `${serviceUrl}_GetAllWheelsByMode/${sessionID}/${gameMode}`,
                        dataType: 'JSONP',
                        type: 'GET',
                        success: resolve,
                        error: reject
                    });
                    break;
                default:
                    $.ajax({
                        url: `${serviceUrl}_GetAllWheels/${sessionID}`,
                        dataType: 'JSONP',
                        type: 'GET',
                        success: resolve,
                        error: reject
                    });
            }
        });
    }

    function _parseWheels(string) {
        let wheelsMas = string.split('|').map((column) => {
            return column.split('@');
        });
        wheelsMas.map((column, columnIndex) => {
            return column.map((element, rowIndex) => {
                switch (element) {
                    case 'j':
                        element = 1;
                        break;
                    case 'q':
                        element = 2;
                        break;
                    case 'k':
                        element = 3;
                        break;
                    case 'a':
                        element = 4;
                        break;
                    case 'iJ':
                        element = 5;
                        break;
                    case 'iQ':
                        element = 6;
                        break;
                    case 'ik': // КОСТЫЛЬ! Попросить бек чтобы называли одинаково
                        element = 7;
                        break;
                    case 'iA':
                        element = 8;
                        break;
                    case 'wild':
                        element = 9;
                        break;
                    case 'scatter':
                        element = 10;
                        break;
                    case 'sw1':
                        element = 11;
                        break;
                    case 'sw2':
                        element = 12;
                        break;
                    case 'sw3':
                        element = 13;
                        break;
                    default: console.error('Unknown symbol!');
                }
                column[rowIndex] = element;
            });
        });
        return wheelsMas;
    }

    function _requestLines(sessionID) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}_GetLines/${sessionID}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function _parseLines(string) {
        let linesMas = string.split('|').map((line, lineNumber) => {
            return line.split('@').map((coords, index) => {
                return coords.split(',');
            });
        });
        return linesMas;
    }

    function initGame(sessionID) {
        _startGame(sessionID)
            .then((balanceData) => {
                if (_checkBalance(balanceData)) {
                    console.log('Balance is downloaded!');
                    balance = balanceData;
                    /* eslint-disable */
                    events.trigger('initBalance', balanceData);
                    /* eslint-enable */
                    return _requestWheels(sessionID);
                }
            })
            .then((wheelsString) => {
                console.log('Wheels are downloaded!');
                wheels = _parseWheels(wheelsString);
                /* eslint-disable */
                events.trigger('initWheels', wheels);
                /* eslint-enable */
                return _requestLines(sessionID);
            })
            .then((linesString) => {
                console.log('Lines are downloaded!');
                lines = _parseLines(linesString);
                /* eslint-disable */
                events.trigger('initLines', lines);
                /* eslint-enable */
            })
            .catch(error => console.dir(error));
    }

    function getWheels() {
        if (typeof wheels !== 'undefined') {
            return wheels;
        } else {
            throw new Error('Wheels is undefined!');
        }
    }

    function getBalance() {
        if (typeof balance !== 'undefined') {
            return balance;
        } else {
            throw new Error('We have no balance!');
        }
    }

    function getLines() {
        if (typeof lines !== 'undefined') {
            return lines;
        } else {
            throw new Error('We have no lines coords!');
        }
    }

    function promiseWheels() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', (event) => {
                /* eslint-enable */
                if (typeof wheels !== 'undefined') {
                    event.remove();
                    resolve(wheels);
                }
            });
        });
    }

    function promiseBalance() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', (event) => {
                /* eslint-enable */
                if (typeof balance !== 'undefined') {
                    event.remove();
                    resolve(balance);
                }
            });
        });
    }

    function promiseLines() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            createjs.Ticker.on('tick', (event) => {
                /* eslint-enable */
                if (typeof lines !== 'undefined') {
                    event.remove();
                    resolve(lines);
                }
            });
        });
    }

    /* eslint-disable */
    events.on('initGame', initGame);
    /* eslint-enable */

    return {
        getWheels,
        getBalance,
        getLines,
        promiseWheels,
        promiseBalance,
        promiseLines
    };
})();
