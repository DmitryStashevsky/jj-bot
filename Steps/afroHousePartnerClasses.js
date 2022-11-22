const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHousePartnerClasses extends Step {
    message = i18n.__('afroHousePartnerClassesDesc');
    command = i18n.__('afroHousePartnerClassesCommand');
}

module.exports = AfroHousePartnerClasses;