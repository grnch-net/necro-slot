let init = (function () {

    let initData = {};

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
                    case 'iJ':
                        element = 2;
                        break;
                    case 'q':
                        element = 3;
                        break;
                    case 'iQ':
                        element = 4;
                        break;
                    case 'k':
                        element = 5;
                        break;
                    case 'ik': // КОСТЫЛЬ! Попросить бек чтобы называли одинаково
                        element = 6;
                        break;
                    case 'a':
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
                    case 'card':
                        element = 14;
                        break;
                    default: console.error('Unknown symbol!');
                }
                column[rowIndex] = element;
            });
        });
        return wheelsMas;
    }
    function parseLines(string) {
        let linesMas = string.split('|').map((line, lineNumber) => {
            return line.split('@').map((coords, index) => {
                return coords.split(',');
            });
        });
        return linesMas;
    }

    function initGame(sessionID) {
        /* eslint-disable */
        const gameID = 6; // КОСТЫЛЬ! Должен получать от сервера инициализации.

        let playPromise = utils.request('_Play', `/${sessionID}/${gameID}`);
            playPromise.then((balanceData) => {
                initData.balance = balanceData;
            })
            .catch(error => console.dir(error));

        Promise.all([playPromise]).then(() => {

            let wheelsPromise = utils.request('_GetAllWheels', `/${sessionID}`)
            .then((wheelsString) => {
                initData.wheels = parseWheels(wheelsString);
            })
            .catch(error => console.dir(error));

             let freeWheelsPromise = utils.request('_GetAllWheelsByMode', `/${sessionID}/fsBonus`)
            .then((freeWheelsString) => {
                initData.freeWheels = parseWheels(freeWheelsString);
            })
            .catch(error => console.dir(error));

            let linesPromise = utils.request('_GetLines', `/${sessionID}`)
            .then((linesString) => {
                initData.lines = parseLines(linesString);
            })
            .catch(error => console.dir(error));

            Promise.all([wheelsPromise, freeWheelsPromise, linesPromise]).then(() => {
                events.trigger('dataDownloaded', initData);
            });

        });
        /* eslint-enable */
    }

    /* eslint-disable */
    function getInitData() {
        return utils.getData(initData);
    }
    /* eslint-enable */

    /* eslint-disable */
    events.on('initGame', initGame);
    /* eslint-enable */

    return {
        getInitData
    };
})();
