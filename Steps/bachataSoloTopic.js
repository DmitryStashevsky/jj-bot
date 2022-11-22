const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataSoloTopic extends Step {
    message = i18n.__('bachataSoloTopicDesc');
    command = i18n.__('bachataSoloTopicCommand');
}

module.exports = BachataSoloTopic;