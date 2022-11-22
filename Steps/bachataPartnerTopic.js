const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataPartnerTopic extends Step {
    message = i18n.__('bachataPartnerTopicDesc');
    command = i18n.__('bachataPartnerTopicCommand');
}

module.exports = BachataPartnerTopic;