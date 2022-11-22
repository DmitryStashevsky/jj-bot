const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class LatinoGrooveSoloTopic extends Step {
    message = i18n.__('latinoGrooveSoloTopicDesc');
    command = i18n.__('latinoGrooveSoloTopicCommand');
}

module.exports = LatinoGrooveSoloTopic;