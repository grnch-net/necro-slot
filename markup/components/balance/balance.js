/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

const balance = (function () {

    const c = createjs;
    const w = utils.width;
    const h = utils.height;
    const balanceContainer = new c.Container().set({
        name: 'balanceContainer'
    });
    let stage;

    const balanceText = {};
    const balanceData = {};

    const parameters = {
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

    function initBalance() {
        stage = storage.read('stage');
        balanceData.linesLength = storage.read('lines').length;
        const data = storage.read('balance');

        balanceData.coinsSteps = data.CoinValue.map((value) => {
            return +(value / 100).toFixed(2);
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

        writeBalance();
    }

    function writeBalance() {
        balanceText.coinsSum = new c.Text(balanceData.coinsSum, parameters.font, parameters.color).set(parameters.coinsSum);
        balanceText.coinsCash = new c.Text(balanceData.coinsCash, parameters.font, parameters.color).set(parameters.coinsCash);
        balanceText.betSum = new c.Text(balanceData.betSum, parameters.font, parameters.color).set(parameters.betSum);
        balanceText.betCash = new c.Text(balanceData.betCash, parameters.font, parameters.color).set(parameters.betCash);
        balanceText.winCash = new c.Text(balanceData.winCash, parameters.font, parameters.color).set(parameters.winCash);

        balanceContainer.addChild(
            balanceText.coinsSum,
            balanceText.coinsCash,
            balanceText.betSum,
            balanceText.betCash,
            balanceText.winCash);

        const fg = stage.getChildByName('fgContainer');
        stage.addChildAt(balanceContainer, stage.getChildIndex(fg) + 1);
        balanceContainer.cache(0, 500, w, h - 500);
        storage.write('currentBalance', balanceData);
    }

    function updateBalance() {
        if (balanceText.coinsSum.text !== balanceData.coinsSum) {
            balanceText.coinsSum.text = balanceData.coinsSum;
        }
        if (balanceText.coinsCash.text !== balanceData.coinsCash) {
            balanceText.coinsCash.text = balanceData.coinsCash;
        }
        if (balanceText.betSum.text !== balanceData.betSum) {
            balanceText.betSum.text = balanceData.betSum;
        }
        if (balanceText.betCash.text !== balanceData.betCash) {
            balanceText.betCash.text = balanceData.betCash;
        }
        if (balanceText.winCash.text !== balanceData.winCash) {
            balanceText.winCash.text = balanceData.winCash;
        }
        balanceContainer.updateCache();
        storage.write('currentBalance', balanceData);
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

    function startRoll() {
        if (storage.readState('mode') === 'normal') {
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

    function endRoll() {
        if (storage.readState('mode') === 'normal') {
            const data = storage.read('rollResponse');
            balanceData.winCash = (+data.TotalWinCents / 100).toFixed(2);
            balanceData.coinsCash = (+data.ScoreCents / 100).toFixed(2);
            balanceData.coinsSum = (+data.ScoreCoins).toFixed(0);
            updateBalance();
        }
    }

    events.on('changeState', checkState);
    events.on('changeBet', changeBet);
    events.on('changeCoins', changeCoins);

    function checkState(state) {
        if (state === 'bgDraw' && storage.readState('bgDraw')) {
            initBalance();
        }
        if (state === 'roll' && storage.readState('roll') === 'started') {
            startRoll();
        }
        if (state === 'roll' && storage.readState('roll') === 'ended') {
            endRoll();
        }
    }

    return {
        changeBet,
        changeCoins
    };
})();
