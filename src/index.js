class Logger {

    constructor(options) {
        let defaultOptions = {
            logger: console,
            buffer_level: Logger.level.DEBUG,
            flush_level: Logger.level.DEBUG,
            buffer_size: 100,
            keep_history: false
        };

        if (!options) {
            options = {};
        }

        this._options = {
            logger: options.logger ? options.logger : defaultOptions.logger,
            buffer_level: options.buffer_level ? options.buffer_level : defaultOptions.buffer_level,
            flush_level: options.flush_level ? options.flush_level : defaultOptions.flush_level,
            buffer_size: options.buffer_size ? options.buffer_size : defaultOptions.buffer_size,
            keep_history: options.keep_history ? options.keep_history : defaultOptions.keep_history
        };

        this._buffer = [[], []];
        this.all = [];

        this._selected_buffer = 0;
    }

    flush() {
        this._buffer[1- this._selected_buffer].map((item) => {
            this.sendToUpperLogger(item);
        });

        this._buffer[this._selected_buffer].map((item) => {
            this.sendToUpperLogger(item);
        });

        this._buffer = [[], []];
    }

    sendToUpperLogger(item) {
        switch (item.level) {
            case Logger.level.DEBUG:
                this._options.logger.log(item.logObject);
                break;
            case Logger.level.INFO:
                this._options.logger.info(item.logObject);
                break;
            case Logger.level.WARN:
                this._options.logger.warn(item.logObject);
                break;
            case Logger.level.ERROR:
                this._options.logger.error(item.logObject);
                break;
        }
    }

    writeToBuffer({level, logObject}) {
        if (level >= this._options.buffer_level) {

            if (this._options.keep_history) {
                this.all.push({level: level, logObject: logObject});
            }

            if (this._buffer[this._selected_buffer].length === this._options.buffer_size) {
                this._selected_buffer = 1 - this._selected_buffer;
                this._buffer[this._selected_buffer] = [];
            }

            this._buffer[this._selected_buffer].push({level: level, logObject: logObject});

            if (level >= this._options.flush_level) {
                this.flush();
            }
        }
    }

    logItem(logObject, level, skipBuffer) {
        const item = {
            level,
            logObject,
        };
        skipBuffer ? this.sendToUpperLogger(item) : this.writeToBuffer(item);
    }

    log(logObject, skipBuffer = false) {
        this.logItem(logObject, Logger.level.DEBUG, skipBuffer);
    }

    info(logObject, skipBuffer = false) {
        this.logItem(logObject, Logger.level.INFO, skipBuffer);
    }

    warn(logObject, skipBuffer = false) {
        this.logItem(logObject, Logger.level.WARN, skipBuffer);
    }

    error(logObject, skipBuffer = false) {
        this.logItem(logObject, Logger.level.ERROR, skipBuffer);
    }
}

Logger.level = {
    "DEBUG": 0,
    "INFO": 1,
    "WARN": 2,
    "ERROR": 3
};

module.exports = Logger;