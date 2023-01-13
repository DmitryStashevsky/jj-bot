const Step = require('./step.js');

class Admin extends Step {
    constructor(message, command) {
        super(message, command);
        this.isBackAvailable = false;
    }
}

module.exports = Admin;