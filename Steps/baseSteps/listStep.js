const Step = require('./step.js');

class ListStep extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = ListStep;