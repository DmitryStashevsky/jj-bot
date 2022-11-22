const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaPartnerClasses extends Step {
    message = i18n.__('salsaPartnerClassesDesc');
    command = i18n.__('salsaPartnerClassesCommand');
}

module.exports = SalsaPartnerClasses;