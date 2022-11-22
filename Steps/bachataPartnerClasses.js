const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataPartnerClasses extends Step {
    message = i18n.__('bachataPartnerClassesDesc');
    command = i18n.__('bachataPartnerClassesCommand');
}

module.exports = BachataPartnerClasses;