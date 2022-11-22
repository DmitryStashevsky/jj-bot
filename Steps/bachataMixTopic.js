const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataMixTopic extends Step {
    message = i18n.__('bachataMixTopicDesc');
    command = i18n.__('bachataMixTopicCommand');
}

module.exports = BachataMixTopic;