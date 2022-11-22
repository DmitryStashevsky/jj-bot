const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class Events extends Step {
    message = i18n.__('eventsDesc');
    command = i18n.__('eventsCommand');
}

module.exports = Events;