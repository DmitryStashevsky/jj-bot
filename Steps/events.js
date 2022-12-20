const Step = require('./step.js');

class Events extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = Events;