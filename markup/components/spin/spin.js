let spin = (function () {

    // Consts
    const serviceUrl = 'http://gameservice.bossgs.org/slot/SlotService.svc/';

    let wheels;

    let winCoins;
    let winCents;
    let scoreCoins;
    let scoreCents;
    let indexes;
    let linesResult;

    let bonusLevelStart;
    let bonusEnd;
    let bonusValue;
    let bonusOldValues;
    let bonusWinCoins;
    let bonusWinCents;

    function getWheels(wheelsArray) {
        wheels = wheelsArray;
        console.log('Wheels:', wheels);
    }

    function requestSpin() {
        return new Promise(function (resolve, reject) {
            /* eslint-disable */
            let coinsValue = balance.getCoinsValue().toString().replace('.', ','); // КОСТЫЛЬ coinsValue должен быть адекватным (без точки)
            $.ajax({
                url: `${serviceUrl}_Roll/${login.getSessionID()}/${balance.getBetValue()}/${coinsValue}`,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function requestReady() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                /* eslint-disable */
                url: `${serviceUrl}_Ready/${login.getSessionID()}`,
                /* eslint-enable */
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function spinStart() {
        requestSpin()
            .then((data) => {
                console.log('Spin data:', data);
                if (data.Type === 'Simple') {
                    winCoins = data.TotalWinCoins;
                    winCents = data.TotalWinCents;
                    if (winCoins !== 0 && winCents !== 0) {
                        console.log(`You win ${winCoins} coins!`);
                        /* eslint-disable */
                        events.trigger('spinWin', winCoins, winCents, linesResult);
                        /* eslint-enable */
                    } else {
                        console.log('You win nothing.');
                    }
                    bonusLevelStart = data.BonusResults[0];
                    if (bonusLevelStart === 'StagesSlotBonus') {
                        console.log('You are starting Bonus Level!');
                        /* eslint-disable */
                        events.trigger('bonusStart');
                        /* eslint-enable */
                    }
                    indexes = data.Indexes;
                    linesResult = data.LinesResult;
                    scoreCents = data.ScoreCents;
                    scoreCoins = data.ScoreCoins;
                    /* eslint-disable */
                    events.trigger('spinStart', data);
                    /* eslint-enable */
                } else if (data.Type === 'StagesSlotBonus') {
                    bonusEnd = data.BonusEnd;
                    if (bonusEnd) {
                        console.log('Bonus Level is finished!');
                        /* eslint-disable */
                        events.trigger('BonusEnd');
                        /* eslint-enable */
                    }
                    bonusValue = data.CurrentValue;
                    bonusWinCents = data.CurrentWinCents;
                    bonusWinCoins = data.CurrentWinCoins;
                    bonusOldValues = data.OldValues;
                    scoreCents = data.ScoreCents;
                    scoreCoins = data.ScoreCoins;
                } else if (data.ErrorCode !== 0) {
                    console.error(data.ErrorMessage);
                }
            });
    }

    function spinEnd() {
        requestReady()
            .then((response) => {
                if (response.ErrorCode === 0) {
                    console.log('Spin is done!');
                    let winCash = (winCents / 100).toFixed(2);
                    /* eslint-disable */
                    events.trigger('spinEnd', winCash, scoreCoins, scoreCents);
                    /* eslint-enable */
                } else {
                    console.error(response.ErrorMessage);
                }
            });
    }

    /* eslint-disable */
    events.on('initWheels', getWheels);
    /* eslint-enable */

    return {
        spinStart,
        spinEnd
    };
})();
