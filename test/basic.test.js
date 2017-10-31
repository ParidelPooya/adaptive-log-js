const lab = require("lab").script();
exports.lab = lab;

let Logger = require("../src/index");

lab.experiment("Basic Steps Test", () => {

    let logger = new Logger();

    lab.test("first test", (done) => {

        logger.log(1);

        lab.expect(1).to.equal(1);
        done();

        logger.flush();
    });
});