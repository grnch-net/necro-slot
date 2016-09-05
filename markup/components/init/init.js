/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const init = (function () {

    const savedFS = {};
    const savedBonus = {};

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

    // qo2 - двери, qo4 - фри-спины, qo5 - фри-спины всегда заканчиваются, qos - стандартный режим
    function login(userID = 555003, casinoID = 555, gameID = 'qos') {
        if (localStorage.getItem('userID')) {
            userID = localStorage.getItem('userID');
        }
        if (localStorage.getItem('casinoID')) {
            casinoID = localStorage.getItem('casinoID');
        }
        utils.request('_Initialise', `/${userID}/${casinoID}/${gameID}`)
            .then(initData => {

                storage.write('initData', initData);
                storage.write('initState', initData.PlayerState);
                storage.write('sessionID', initData.SessionID);

                const wheelsString = initData.SlotWheels.filter(obj => obj.Mode === 'root')[0].WheelsContent;
                const fsWheelsString = initData.SlotWheels.filter(obj => obj.Mode === 'fsBonus')[0].WheelsContent;
                storage.write('wheels', parseWheels(wheelsString));
                storage.write('fsWheels', parseWheels(fsWheelsString));

                const linesString = initData.Lines;
                const lines = parseLines(linesString);
                const linesCoords = parseLinesCoords(lines);
                const linesPaths = parseLinesPaths(linesCoords);
                storage.write('lines', lines);
                storage.write('linesCoords', linesCoords);
                storage.write('linesPaths', linesPaths);

                storage.changeState('inited', true);

                if (!initData.PlayerState.Saved) {
                    storage.changeState('mode', 'normal');
                } else if (initData.PlayerState.Saved.ResultType === 'Freespin') {
                    // Обработка оборванных фри-спинов
                    savedFS.count = initData.PlayerState.Saved.RemainSpins;
                    savedFS.multi = initData.PlayerState.Saved.Multiplier.MultiplierValue;
                    savedFS.level = initData.PlayerState.Saved.Multiplier.MultiplierStep;
                    // savedFS.totalWin
                } else if (initData.PlayerState.Saved.ResultType === 'MultiplierBonus') {
                    // Обработка оборванных бонусов
                    storage.log();
                    // savedBonus.totalWin
                    // savedBonus.level
                }

                $(window).unload(function () {
                    utils.request('_Logout/', storage.read('sessionID'))
                    .then((response) => {
                        console.log('Logout response:', response);
                    });
                });
            })
            .catch(error => console.error(error));
    }

    function checkState(state) {
        if (state === 'preloader' && storage.readState(state) === 'done') {
            if (typeof savedFS.count !== 'undefined') {
                events.trigger('initFreeSpins', savedFS);
            }
            if (typeof savedBonus.level !== 'undefined') {
                events.trigger('initBonusLevel', savedBonus);
            }
        }
    }

    events.on('changeState', checkState);

    return {
        login
    };
})();

init.login();
