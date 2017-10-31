let spreadify = (deepCopy) => {
    return function () {
        // Holds the processed arguments for use by `fn`
        let spreadArgs = {};

        // Caching length
        let length = arguments.length;

        let currentArg;

        for (let i = 0; i < length; i++) {
            currentArg = arguments[i];

            Object.keys(currentArg).map((key) => {
                if (deepCopy &&
                    typeof(spreadArgs[key]) === "object" && spreadArgs[key] !== null &&
                    currentArg[key] !== null

                ) {
                    spreadArgs[key] = spreadify(deepCopy)(spreadArgs[key], currentArg[key]);
                } else {
                    spreadArgs[key] = currentArg[key];
                }
            });
        }
        return spreadArgs;
    };
};

module.exports = spreadify;