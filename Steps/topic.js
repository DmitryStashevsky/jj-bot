const Step = require('./step.js');

class Topic extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = Topic;