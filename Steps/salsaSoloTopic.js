const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaSoloTopic extends Step {
    message = i18n.__('salsaSoloTopicDesc');
    command = i18n.__('salsaSoloTopicCommand');
}

module.exports = SalsaSoloTopic;