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
        font: 'normal 18px Helvetica',
        color: '#dddddd',
        coinsValue: {
            x: 50,
            y: 50,
            textAlign: 'center',
            name: 'coinsValue'
        },
        coinsSum: {
            x: 550,
            y: 655,
            textAlign: 'center',
            font: 'normal 25px Helvetica',
            name: 'coinsSum',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        },
        coinsCash: {
            x: 460,
            y: 693,
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
            x: 700,
            y: 655,
            textAlign: 'center',
            font: 'normal 25px Helvetica',
            name: 'betSum',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        },
        betCash: {
            x: 610,
            y: 693,
            textAlign: 'center',
            name: 'betCash'
        },
        winCash: {
            x: 760,
            y: 693,
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
        balanceText.coinsSum = new c.Text(balanceData.coinsSum, '18px Helvetica', '#e8b075').set(parameters.coinsSum);
        balanceText.betSum = new c.Text(balanceData.betSum, '18px Helvetica', '#e8b075').set(parameters.betSum);
        balanceText.coinsCash = new c.Text('€ ' + balanceData.coinsCash, '18px Helvetica', parameters.color).set(parameters.coinsCash);
        balanceText.betCash = new c.Text('€ ' + balanceData.betCash, '18px Helvetica', parameters.color).set(parameters.betCash);
        balanceText.winCash = new c.Text('€ ' + balanceData.winCash, '18px Helvetica', parameters.color).set(parameters.winCash);

        balanceText.coinsCashText = new c.Text('Cash:', '18px Helvetica', '#888').set({
            x: 375,
            y: 693
        });
        balanceText.betCashText = new c.Text('Bet:', '18px Helvetica', '#888').set({
            x: 535,
            y: 693
        });
        balanceText.winCashText = new c.Text('Win:', '18px Helvetica', '#888').set({
            x: 680,
            y: 693
        });
        balanceText.coinsSumText = new c.Text('Coins:', '24px Helvetica', parameters.color).set({
            x: 435,
            y: 655
        });
        balanceText.betSumText = new c.Text('Bet:', '24px Helvetica', parameters.color).set({
            x: 625,
            y: 655
        });

        balanceContainer.addChild(
            balanceText.coinsSum,
            balanceText.coinsCash,
            balanceText.betSum,
            balanceText.betCash,
            balanceText.winCash,
            balanceText.coinsCashText,
            balanceText.betCashText,
            balanceText.winCashText,
            balanceText.coinsSumText,
            balanceText.betSumText
        );

        const fg = stage.getChildByName('fgRules');
        stage.addChildAt(balanceContainer, stage.getChildIndex(fg) - 1);
        balanceContainer.cache(0, 500, w, h - 500);
        storage.write('currentBalance', balanceData);
    }

    function updateBalance() {
        if (balanceText.coinsSum.text !== balanceData.coinsSum) {
            balanceText.coinsSum.text = balanceData.coinsSum;
        }
        if (balanceText.coinsCash.text.toString().slice(1) !== balanceData.coinsCash) {
            balanceText.coinsCash.text = '€ ' + balanceData.coinsCash;
        }
        if (balanceText.betSum.text !== balanceData.betSum) {
            balanceText.betSum.text = balanceData.betSum;
        }
        if (balanceText.betCash.text.toString().slice(1) !== balanceData.betCash) {
            balanceText.betCash.text = '€ ' + balanceData.betCash;
        }
        if (balanceText.winCash.text.toString().slice(1) !== balanceData.winCash) {
            balanceText.winCash.text = '€ ' + balanceData.winCash;
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
