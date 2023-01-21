const Step = require('./baseSteps/step.js');

class Topic extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = Topic;