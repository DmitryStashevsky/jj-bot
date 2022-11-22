const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHouseMixTopic extends Step {
    message = i18n.__('afroHouseMixTopicDesc');
    command = i18n.__('afroHouseMixTopicCommand');
}

module.exports = AfroHouseMixTopic;