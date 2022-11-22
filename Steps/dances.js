const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class Dances extends Step {
    message = i18n.__('dancesDesc');
    command = i18n.__('dancesCommand');
}

module.exports = Dances;