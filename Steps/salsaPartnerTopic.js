const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaPartnerTopic extends Step {
    message = i18n.__('salsaPartnerTopicDesc');
    command = i18n.__('salsaPartnerTopicCommand');
}

module.exports = SalsaPartnerTopic;