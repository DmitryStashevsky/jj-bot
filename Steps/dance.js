const Step = require('./baseSteps/step.js');

class Dance extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = Dance;