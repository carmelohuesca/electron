class Log {
    static get COLOR() {
        return {
            RESET: '\x1b[0m',
            BRIGHT: '\x1b[1m',
            DIM: '\x1b[2m',
            TRIM: '\x1b[9m',
            UNDERSCORE: '\x1b[4m',
            BLINK: '\x1b[5m',
            REVERSE: '\x1b[7m',
            HIDDEN: '\x1b[8m',
            BLACK: '\x1b[30m',
            RED: '\x1b[31m',
            GREEN: '\x1b[32m',
            YELLOW: '\x1b[33m',
            BLUE: '\x1b[34m',
            MAGENTA: '\x1b[35m',
            CYAN: '\x1b[36m',
            WHITE: '\x1b[37m',
            BG_BLACK: '\x1b[40m',
            BG_RED: '\x1b[41m',
            BG_GREEN: '\x1b[42m',
            BG_YELLOW: '\x1b[43m',
            BG_BLUE: '\x1b[44m',
            BG_MAGENTA: '\x1b[45m',
            BG_CYAN: '\x1b[46m',
            BG_WHITE: '\x1b[47m'
        };
    }

    constructor() {
        return this;
    }

    log() {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(this.color || Log.COLOR.RESET);
        args.push(Log.COLOR.RESET);
        console.log(...args);
        return this;
    }

    reset() {
        delete this.color;
        return this;
    }

    setColor(color) {
        this.color = Log.COLOR[color.toUpperCase()];
        return this;
    }
}

module.exports = Log;