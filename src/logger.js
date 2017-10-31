let spreadify = require("./spreadify");

class logger {

    constructor(options) {
        let defaultOption = {
            logger: console,
            buffer_level: logger.level.INFO,
            flush_level: logger.level.INFO
        };

        this._options = spreadify()(defaultOption, options || {});

        this._buffer = [];
    }

    flush() {
        this._buffer.map((item) => {
            this.logger.log(item.logObject);
        });
        this._buffer = [];
    }

    writeToBuffer(level, logObject) {
        if (this._options.level >= level) {
            this._buffer.push({level: logger.buffer_level.DEBUG, logObject: logObject});

            if (this._options.flush_level >= level) {
                this.flush();
            }
        }
    }

    log(logObject) {
        this.writeToBuffer({level: logger.buffer_level.DEBUG, logObject: logObject});
    }

    info(logObject) {
        this.writeToBuffer({level: logger.buffer_level.INFO, logObject: logObject});
    }

    warn(logObject) {
        this.writeToBuffer({level: logger.buffer_level.WARN, logObject: logObject});
    }

    error(logObject) {
        this.writeToBuffer({level: logger.buffer_level.ERROR, logObject: logObject});
    }
}

logger.level = {
    "DEBUG": 0,
    "INFO": 1,
    "WARN": 2,
    "ERROR": 3
};

module.exports = logger;