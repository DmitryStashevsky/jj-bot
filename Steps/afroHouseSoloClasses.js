const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHouseSoloClasses extends Step {
    message = i18n.__('afroHouseSoloClassesDesc');
    command = i18n.__('afroHouseSoloClassesCommand');
}

module.exports = AfroHouseSoloClasses;