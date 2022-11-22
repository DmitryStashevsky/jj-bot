const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaMixTopic extends Step {
    message = i18n.__('salsaMixTopicDesc');
    command = i18n.__('salsaMixTopicCommand');
}

module.exports = SalsaMixTopic;