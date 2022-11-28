const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class Dance extends Step {
    constructor(message, command) {
        super(message, command);
    }
}

module.exports = Dance;