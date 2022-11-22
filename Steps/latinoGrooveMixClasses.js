const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class SalsaMixClasses extends Step {
    message = i18n.__('salsaMixClassesDesc');
    command = i18n.__('salsaMixClassesCommand');
}

module.exports = SalsaMixClasses;