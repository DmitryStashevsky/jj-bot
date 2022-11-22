const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class BachataSoloClasses extends Step {
    message = i18n.__('bachataSoloClassesDesc');
    command = i18n.__('bachataSoloClassesCommand');
}

module.exports = BachataSoloClasses;