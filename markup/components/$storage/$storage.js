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
            console.error('There is no such data in store!');
        }
    }

    function log() {
        console.log('Store is:', store);
    }

    function changeState(key, value) {
        state[key] = value;
        console.warn(`State '${key}' changed to: ${value}`);
        events.trigger('changeState', key);
    }

    function readState(key) {
        return state[key];
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
