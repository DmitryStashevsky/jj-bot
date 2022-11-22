const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaDance extends Step {
    message = i18n.__('salsaDesc');
    command = i18n.__('salsaCommand');
}

module.exports = SalsaDance;