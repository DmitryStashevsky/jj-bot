const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaSoloClasses extends Step {
    message = i18n.__('salsaSoloClassesDesc');
    command = i18n.__('salsaSoloClassesCommand');
}

module.exports = SalsaSoloClasses;