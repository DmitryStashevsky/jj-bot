const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class Lessons extends Step {
    message = i18n.__('lessonsDesc');
    command = i18n.__('lessonsCommand');
}

module.exports = Lessons;