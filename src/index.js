class Logger {

    constructor(options) {
        let defaultOptions = {
            logger: console,
            buffer_level: Logger.level.DEBUG,
            flush_level: Logger.level.DEBUG,
            buffer_size: 100
        };

        if (!options) {
            options = {};
        }

        this._options = {
            logger: options.logger ? options.logger : defaultOptions.logger,
            buffer_level: options.buffer_level ? options.buffer_level : defaultOptions.buffer_level,
            flush_level: options.flush_level ? options.flush_level : defaultOptions.flush_level,
            buffer_size: options.buffer_size ? options.buffer_size : defaultOptions.buffer_size
        };


        this._buffer = [[], []];
        this._selected_buffer = 0;
    }

    flush() {
        this._buffer[1- this._selected_buffer].map((item) => {
            this._options.logger.log(item.logObject);
        });

        this._buffer[this._selected_buffer].map((item) => {
            this._options.logger.log(item.logObject);
        });
        this._buffer = [[], []];
    }

    writeToBuffer(level, logObject) {
        if (level >= this._options.buffer_level) {

            if (this._buffer[this._selected_buffer].length === this._options.buffer_size) {
                this._selected_buffer = 1 - this._selected_buffer;
                this._buffer[this._selected_buffer] = [];
            }

            this._buffer[this._selected_buffer].push({level: Logger.level.DEBUG, logObject: logObject});

            if (level >= this._options.flush_level) {
                this.flush();
            }
        }
    }

    log(logObject) {
        this.writeToBuffer(Logger.level.DEBUG, logObject);
    }

    info(logObject) {
        this.writeToBuffer(Logger.level.INFO, logObject);
    }

    warn(logObject) {
        this.writeToBuffer(Logger.level.WARN, logObject);
    }

    error(logObject) {
        this.writeToBuffer(Logger.level.ERROR, logObject);
    }
}

Logger.level = {
    "DEBUG": 0,
    "INFO": 1,
    "WARN": 2,
    "ERROR": 3
};

module.exports = Logger;