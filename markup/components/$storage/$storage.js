/* eslint-disable no-undef */
// Управление событиями
const events = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function (eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    trigger: function (eventName, data, ...rest) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data, rest);
            });
        }
    }
};

// Модуль утилит
const utils = (function () {

    const serviceUrl = 'http://gameservice.bossgs.org/testslot/SlotService.svc/';
    const canvasWidth = 1280;
    const canvasHeight = 720;
    const gameWidth = 960;
    const gameHeight = 540;
    const elementHeight = 180;
    const elementWidth = 192;

    createjs.Ticker.on('tick', () => {
        const fps = createjs.Ticker.getMeasuredFPS();
        if (fps < 15) {
            console.warn('Current FPS:', fps);
        }
    });

    function request(name, path) {
        console.log(`Request: ${serviceUrl}${name}${path}`);
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${serviceUrl}${name}${path}`,
                dataType: 'JSONP',
                type: 'GET',
                success: resolve,
                error: reject
            });
        });
    }

    function showPopup(text) {
        const stage = storage.read('stage');
        const loader = storage.read('loadResult');
        const popupContainer = new createjs.Container().set({name: 'popupContainer'});
        const popup = new createjs.Bitmap(loader.getResult('popup')).set({
            name: 'popup',
            x: utils.width / 2,
            y: utils.height / 2
        });
        getCenterPoint(popup);
        const popupText = new createjs.Text(text, '50px Helvetica', '#fff').set({
            x: utils.width / 2,
            y: utils.height / 2,
            textAlign: 'center',
            textBaseline: 'middle'
        });
        popupContainer.addChild(popup, popupText);
        stage.addChild(popupContainer);
        popupContainer.on('click', () => {
            TweenMax.to(popupContainer, 0.5, {alpha: 0, onComplete: () => {
                stage.removeChild(popupContainer);
            }});
        });
    }

    function getCenterPoint(element) {
        const bounds = element.getBounds();
        element.regX = bounds.width / 2;
        element.regY = bounds.height / 2;
    }

    return {
        request,
        showPopup,
        getCenterPoint,
        width: canvasWidth,
        height: canvasHeight,
        gameWidth,
        gameHeight,
        elementWidth,
        elementHeight
    };
})();

// Модуль хранилища данных
const storage = (function () {

    const store = {};
    const state = {};

    function write(key, value) {
        store[key] = value;
    }

    function read(key) {
        if (typeof store[key] !== 'undefined') {
            return store[key];
        } else {
            return false;
        }
    }

    function log() {
        console.log('Store is:', store);
    }

    function changeState(key, value) {
        state[key] = value;
        console.log(`State '${key}' changed to: ${value}`);
        events.trigger('changeState', key);
    }

    function readState(key) {
        if (typeof state[key] !== 'undefined') {
            return state[key];
        } else {
            return false;
        }
    }

    function logState() {
        console.log('State is:', state);
    }

    // API
    return {
        changeState,
        readState,
        logState,
        write,
        read,
        log
    };
})();
