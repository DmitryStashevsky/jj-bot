const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGrooveSoloClasses extends Step {
    message = i18n.__('latinoGrooveSoloClassesDesc');
    command = i18n.__('latinoGrooveSoloClassesCommand');
}

module.exports = LatinoGrooveSoloClasses;