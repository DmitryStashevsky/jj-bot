const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatingoGrooveMixClasses extends Step {
    message = i18n.__('latinoGrooveMixClassesDesc');
    command = i18n.__('latinoGrooveMixClassesCommand');
}

module.exports = LatingoGrooveMixClasses;