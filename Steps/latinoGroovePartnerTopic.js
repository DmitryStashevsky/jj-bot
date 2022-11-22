const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGroovePartnerTopic extends Step {
    message = i18n.__('latinoGroovePartnerTopicDesc');
    command = i18n.__('latinoGroovePartnerTopicCommand');
}

module.exports = LatinoGroovePartnerTopic;