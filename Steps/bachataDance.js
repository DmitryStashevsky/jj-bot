const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataDance extends Step {
    message = i18n.__('bachataDesc');
    command = i18n.__('bachataCommand');
}

module.exports = BachataDance;