let init = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';
    const gameID = 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.

    let wheels;
    let balance;
    let lines;

    function startGame(sessionID) {
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

    function checkBalance(balanceData) {
        if (balanceData.ScoreCents && balanceData.ScoreCoins) {
            console.log('Balance is normal.');
            balance = balanceData;
            return true;
        } else {
            throw new Error('Low money(((');
        }
    }

    function requestWheels(sessionID, gameMode) {
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

    function parseWheels(string) {
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

    function requestLines(sessionID) {
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

    function parseLines(string) {
        let linesMas = string.split('|').map((line, lineNumber) => {
            return line.split('@').map((coords, index) => {
                return coords.split(',');
            });
        });
        return linesMas;
    }

    function getBalance() {
        if (balance) {
            return balance;
        } else {
            throw new Error('We have no balance!');
        }
    }

    function getWheels() {
        if (wheels) {
            return wheels;
        } else {
            throw new Error('Wheels is undefined!');
        }
    }

    function getLines() {
        if (lines) {
            return lines;
        } else {
            throw new Error('We have no lines coords!');
        }
    }

    function initGame(sessionID) {
        startGame(sessionID)
            .then((balanceData) => {
                if (checkBalance(balanceData)) {
                    /* eslint-disable */
                    events.trigger('initBalance', balanceData);
                    /* eslint-enable */
                    return requestWheels(sessionID);
                }
            })
            .then((wheelsString) => {
                console.log('Wheels are downloaded!');
                wheels = parseWheels(wheelsString);
                /* eslint-disable */
                events.trigger('initWheels', wheels);
                /* eslint-enable */
                return requestLines(sessionID);
            })
            .then((linesString) => {
                console.log('Lines are downloaded!');
                lines = parseLines(linesString);
                /* eslint-disable */
                events.trigger('initLines', lines);
                /* eslint-enable */
            })
            .catch(error => console.error(error));
    }

    /* eslint-disable */
    events.on('logged', initGame);
    /* eslint-enable */
    return {
        initGame,
        requestWheels,
        getWheels,
        getBalance,
        getLines
    };
})();
