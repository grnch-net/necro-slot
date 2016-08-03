let balance = (function () {

    let balanceStage;

    /* eslint-disable */
    let balanceContainer = new createjs.Container().set({
        name: 'balanceContainer'
    });
    /* eslint-enable */

    let balanceText = {};

    let balanceData = {};

    let parameters = {
        font: 'bold 20px Arial',
        color: '#dddddd',
        coinsValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'coinsValue'
        },
        coinsSum: {
            x: 295,
            y: 630,
            textAlign: 'center',
            font: 'bold 25px Arial',
            name: 'coinsSum'
        },
        coinsCash: {
            x: 470,
            y: 690,
            textAlign: 'center',
            name: 'coinsCash'
        },
        betValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'betValue'
        },
        betSum: {
            x: 1005,
            y: 630,
            textAlign: 'center',
            font: 'bold 25px Arial',
            name: 'betSum'
        },
        betCash: {
            x: 637,
            y: 690,
            textAlign: 'center',
            name: 'betCash'
        },
        winCash: {
            x: 810,
            y: 690,
            textAlign: 'center',
            name: 'winCash'
        },
        currency: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'currency'
        }
    };

    function initBalance(allData) {
        /* eslint-disable */
        balanceStage = canvas.getStages().gameStaticStage;
        /* eslint-enable */
        balanceData.linesLength = allData.lines.length;
        let data = allData.balance;

        balanceData.coinsSteps = data.CoinValue.map((element) => {
            return +(element / 100).toFixed(2);
        });
        balanceData.betSteps = data.BetLevel;

        balanceData.coinsValue = balanceData.coinsSteps[0];
        balanceData.coinsSum = data.ScoreCoins;
        balanceData.coinsCash = +(data.ScoreCents / 100).toFixed(2);

        balanceData.betValue = balanceData.betSteps[0];
        balanceData.betSum = +(balanceData.betValue * balanceData.linesLength).toFixed(0);
        balanceData.betCash = +(balanceData.betSum * balanceData.coinsValue).toFixed(2);

        balanceData.winCash = (0).toFixed(2);
        balanceData.currency = data.Currency;

        /* eslint-disable */
        writeBalance();
        /* eslint-enable */
    }

    function writeBalance() {
        /* eslint-disable */
        balanceText.coinsSum = new createjs.Text(balanceData.coinsSum, parameters.font, parameters.color).set(parameters.coinsSum);
        balanceText.coinsCash = new createjs.Text(balanceData.coinsCash, parameters.font, parameters.color).set(parameters.coinsCash);
        balanceText.betSum = new createjs.Text(balanceData.betSum, parameters.font, parameters.color).set(parameters.betSum);
        balanceText.betCash = new createjs.Text(balanceData.betCash, parameters.font, parameters.color).set(parameters.betCash);
        balanceText.winCash = new createjs.Text(balanceData.winCash, parameters.font, parameters.color).set(parameters.winCash);

        balanceContainer.addChild(
            balanceText.coinsSum,
            balanceText.coinsCash,
            balanceText.betSum,
            balanceText.betCash,
            balanceText.winCash);

        balanceStage.addChild(balanceContainer);
        balanceStage.update();
        /* eslint-enable */
    }

    function updateBalance() {
        /* eslint-disable */
        if (balanceText.coinsSum.text !== balanceData.coinsSum) balanceText.coinsSum.text = balanceData.coinsSum;
        if (balanceText.coinsCash.text !== balanceData.coinsCash) balanceText.coinsCash.text = balanceData.coinsCash;
        if (balanceText.betSum.text !== balanceData.betSum) balanceText.betSum.text = balanceData.betSum;
        if (balanceText.betCash.text !== balanceData.betCash) balanceText.betCash.text = balanceData.betCash;
        if (balanceText.winCash.text !== balanceData.winCash) balanceText.winCash.text = balanceData.winCash;
        /* eslint-enable */
        balanceStage.update();
    }

    function changeBet(moreOrLess, maxBet) {
        if (maxBet) {
            balanceData.betValue = balanceData.betSteps[balanceData.betSteps.length - 1];
        } else if (moreOrLess === true && balanceData.betValue !== balanceData.betSteps[balanceData.betSteps.length - 1]) {
            let i = balanceData.betSteps.length;
            while (i >= 0) {
                if (balanceData.betSteps[i] === balanceData.betValue) {
                    balanceData.betValue = balanceData.betSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && balanceData.betValue !== balanceData.betSteps[0]) {
            let i = balanceData.betSteps.length;
            while (i >= 0) {
                if (balanceData.betSteps[i] === balanceData.betValue) {
                    balanceData.betValue = balanceData.betSteps[i - 1];
                    i = -1;
                }
                i--;
            }
        } else {
            console.error('Bet change is failed!');
        }
        balanceData.betSum = +(balanceData.betValue * balanceData.linesLength).toFixed(0);
        balanceData.betCash = +(balanceData.betSum * balanceData.coinsValue).toFixed(2);
        updateBalance();
        console.log('Bet is changed:', balanceData.betValue);
        if (balanceData.betValue === balanceData.betSteps[balanceData.betSteps.length - 1]) {
            console.error('This bet value is maximum!');
        } else if (balanceData.betValue === balanceData.betSteps[0]) {
            console.error('This bet value is minimum!');
        }
    }

    function changeCoins(moreOrLess, maxBet) {
        if (maxBet) {
            balanceData.coinsValue = balanceData.coinsSteps[balanceData.coinsSteps.length - 1];
        } else if (moreOrLess === true && balanceData.coinsValue !== balanceData.coinsSteps[balanceData.coinsSteps.length - 1]) {
            let i = balanceData.coinsSteps.length;
            while (i >= 0) {
                if (balanceData.coinsSteps[i] === balanceData.coinsValue) {
                    balanceData.coinsValue = balanceData.coinsSteps[i + 1];
                    i = -1;
                }
                i--;
            }
        } else if (moreOrLess === false && balanceData.coinsValue !== balanceData.coinsSteps[0]) {
            let i = balanceData.coinsSteps.length;
            while (i >= 0) {
                if (balanceData.coinsSteps[i] === balanceData.coinsValue) {
                    balanceData.coinsValue = balanceData.coinsSteps[i - 1];
                    i = -1;
                }
                i--;
            }
        } else {
            console.error('Coins change is failed!');
        }
        balanceData.coinsSum = +Math.floor(balanceData.coinsCash / balanceData.coinsValue).toFixed(0);
        balanceData.betCash = +(balanceData.coinsValue * balanceData.betSum).toFixed(2);
        updateBalance();
        console.log('Coins value is changed:', balanceData.coinsValue);
        if (balanceData.coinsValue === balanceData.coinsSteps[balanceData.coinsSteps.length - 1]) {
            console.error('This coins value is maximum!');
        } else if (balanceData.coinsValue === balanceData.coinsSteps[0]) {
            console.error('This coins value is minimum!');
        }
    }

    function spinStart(data) {
        if (data.Mode !== 'fsBonus') {
            if (balanceData.coinsSum >= balanceData.betSum) {
                balanceData.coinsSum = (balanceData.coinsSum - balanceData.betSum).toFixed(0);
                balanceData.coinsCash = ((balanceData.coinsCash * 100 - balanceData.betCash * 100) / 100).toFixed(2);
                balanceData.winCash = (0).toFixed(2);
                updateBalance();
            } else {
                console.error('Too low cash for spin!');
            }
        }
    }

    function spinEnd(spinEndObject) {
        if (typeof spinEndObject.winCash !== 'undefined') {
            if (spinEndObject.mode === 'fsBonus') {
                balanceData.totalWin = ((+balanceData.totalWin * 100) + (+(+spinEndObject.winCash).toFixed(2) * 100) / 100).toFixed(2);
            }
            balanceData.winCash = (+spinEndObject.winCash).toFixed(2);
            balanceData.coinsCash = (+spinEndObject.scoreCents / 100).toFixed(2);
            balanceData.coinsSum = (+spinEndObject.scoreCoins).toFixed(0);
            updateBalance();
        } else {
            console.error('WinCash is undefined!');
        }
    }

    /* eslint-disable */
    function getBalanceData() {
        return utils.getData(balanceData);
    }
    /* eslint-enable */

    /* eslint-disable */
    events.on('dataDownloaded', initBalance);
    events.on('changeBet', changeBet);
    events.on('changeCoins', changeCoins);
    events.on('spinStart', spinStart);
    events.on('spinEnd', spinEnd);
    /* eslint-enable */

    return {
        getBalanceData,
        changeBet,
        changeCoins
    };
})();
