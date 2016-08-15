/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const init = (function () {

    function parseWheels(string) {
        const wheelsMas = string.split('|').map((column) => {
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
                    case 'iK':
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
        const linesMas = string.split('|').map((line, lineNumber) => {
            return line.split('@').map((coords, index) => {
                return coords.split(',');
            });
        });
        return linesMas;
    }
    function parseLinesCoords(arr) {
        const result = [];
        arr.forEach((line, number) => {
            result[number] = [];
            line.forEach((point, index) => {
                const x = +point[0];
                const y = +point[1];
                const resultX = 192 * (x + 0.5);
                const resultY = 180 * (y + 0.5);
                const resultCoords = {
                    x: resultX,
                    y: resultY
                };
                result[number][index] = resultCoords;
            });
        });
        return result;
    }
    function parseLinesPaths(arr) {
        const result = [];
        arr.forEach((line, number) => {
            result[number] = [];
            line.forEach((point) => {
                result[number].push(point.x, point.y);
            });
        });
        return result;
    }

    function login(userID, casinoID) {
        userID = userID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        casinoID = casinoID || 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.
        utils.request('_Login', `/${userID}/${casinoID}`)
            .then(sessionID => {
                // Запишем sessionID в Storage
                storage.write('sessionID', sessionID);
                // Запишем изменение состояния в Storage
                storage.changeState('logged', true);
                // Запустим инициализацию
                initGame(sessionID);
            })
            .catch(error => console.error(error));
    }

    function initGame(sessionID) {
        const gameID = 1; // КОСТЫЛЬ! Должен получать от сервера инициализации.

        utils.request('_Play', `/${sessionID}/${gameID}`)
            .then((balanceData) => {
                if (balanceData.SavedResult === 'None') {
                    storage.changeState('mode', 'normal');
                }
                // Запишем balance в Storage
                storage.write('balance', balanceData);
                return utils.request('_GetAllWheels', `/${sessionID}`);
            })
            .then((wheelsString) => {
                // Запишем wheels в Storage
                storage.write('wheels', parseWheels(wheelsString));
                return utils.request('_GetAllWheelsByMode', `/${sessionID}/fsBonus`);
            })
            .then((freeWheelsString) => {
                // Запишем freeWheels в Storage
                storage.write('freeWheels', parseWheels(freeWheelsString));
                return utils.request('_GetLines', `/${sessionID}`);
            })
            .then((linesString) => {
                // Запишем lines в Storage
                const lines = parseLines(linesString);
                const linesCoords = parseLinesCoords(lines);
                const linesPaths = parseLinesPaths(linesCoords);
                storage.write('lines', lines);
                storage.write('linesCoords', linesCoords);
                storage.write('linesPaths', linesPaths);
                // Запишем состояние в Storage
                storage.changeState('inited', true);
            })
            .catch(error => console.error(error));
    }

    return {
        login
    };
})();

init.login();
