const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class PrivateLessons extends Step {
    message = i18n.__('privateLessonsDesc');
    command = i18n.__('privateLessonsCommand');
}

module.exports = PrivateLessons;