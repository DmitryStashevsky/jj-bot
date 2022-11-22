const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHouseSoloTopic extends Step {
    message = i18n.__('afroHouseSoloTopicDesc');
    command = i18n.__('afroHouseSoloTopicCommand');
}

module.exports = AfroHouseSoloTopic;