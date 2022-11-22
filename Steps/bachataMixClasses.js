const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataMixClasses extends Step {
    message = i18n.__('bachataMixClassesDesc');
    command = i18n.__('bachataMixClassesCommand');
}

module.exports = BachataMixClasses;