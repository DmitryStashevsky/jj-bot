const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGrooveDance extends Step {
    message = i18n.__('latinoGrooveDesc');
    command = i18n.__('latinoGrooveCommand');
}

module.exports = LatinoGrooveDance;
