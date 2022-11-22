const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHouseMixClasses extends Step {
    message = i18n.__('afroHouseMixClassesDesc');
    command = i18n.__('afroHouseMixClassesCommand');
}

module.exports = AfroHouseMixClasses;