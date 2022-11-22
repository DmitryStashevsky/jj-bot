const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class Topic extends Step {
    constructor(message, command) {
        super();
        this.message = i18n.__(message);
        this.command = i18n.__(command);
    }
}

module.exports = Topic;