const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGrooveMixTopic extends Step {
    message = i18n.__('latinoGrooveMixTopicDesc');
    command = i18n.__('latinoGrooveMixTopicCommand');
}

module.exports = LatinoGrooveMixTopic;