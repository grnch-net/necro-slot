const c = createjs;

export const parameters = {
    mobile: {
        font: '18px Helvetica',
        bigFont: '24px Helvetica',
        color: '#dddddd',
        greyColor: '#888888',
        orangeColor: '#e8b075',
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
        coinsCashText: {
            x: 375,
            y: 693
        },
        betCashText: {
            x: 535,
            y: 693
        },
        winCashText: {
            x: 680,
            y: 693
        },
        coinsSumText: {
            name: 'coinsSumText',
            x: 435,
            y: 655
        },
        betSumText: {
            name: 'betSumText',
            x: 625,
            y: 655
        }
    },

    desktop: {
        font: '18px Helvetica',
        bigFont: '24px Helvetica',
        color: '#dddddd',
        greyColor: '#888888',
        orangeColor: '#e8b075',
        lines: {
            x: 302,
            y: 632,
            textAlign: 'center',
            font: 'normal 21px Helvetica'
        },
        betLevel: {
            x: 397,
            y: 632,
            textAlign: 'center',
            font: 'normal 21px Helvetica'
        },
        coinTxt: {
            x: 882,
            y: 631,
            textAlign: 'center',
            font: 'normal 21px Helvetica'
        },
        coinsSum: {
            x: 960,
            y: 580,
            textAlign: 'center',
            font: 'normal 14px Helvetica',
            name: 'coinsSum',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        },
        betSum: {
            x: 360,
            y: 581,
            textAlign: 'center',
            font: 'normal 14px Helvetica',
            name: 'betSum',
            shadow: new c.Shadow('#e8b075', 0, 0, 15)
        },
        coinsCash: {
            x: 540,
            y: 693,
            textAlign: 'center',
            name: 'coinsCash'
        },
        betCash: {
            x: 690,
            y: 693,
            textAlign: 'center',
            name: 'betCash'
        },
        winCash: {
            x: 840,
            y: 693,
            textAlign: 'center',
            name: 'winCash'
        },
        coinsCashText: {
            x: 405,
            y: 693
        },
        betCashText: {
            x: 615,
            y: 693
        },
        winCashText: {
            x: 750,
            y: 693
        }
    }
};
