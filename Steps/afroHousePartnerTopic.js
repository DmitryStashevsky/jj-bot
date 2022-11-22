const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHousePartnerTopic extends Step {
    message = i18n.__('afroHousePartnerTopicDesc');
    command = i18n.__('afroHousePartnerTopicCommand');
}

module.exports = AfroHousePartnerTopic;