const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class InitialStep extends Step {
    message = i18n.__('greeting');
    command = i18n.__('start');
}

module.exports = InitialStep;