const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGroovePartnerClasses extends Step {
    message = i18n.__('latinoGroovePartnerClassesDesc');
    command = i18n.__('latingoGroovePartnerClassesCommand');
}

module.exports = LatinoGroovePartnerClasses;