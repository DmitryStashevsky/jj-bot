const Step = require('./baseSteps/step.js');

class Dances extends Step {
    constructor(message, command) {
        super(message, command);
        this.isBackAvailable = false;
    }
}

module.exports = Dances;