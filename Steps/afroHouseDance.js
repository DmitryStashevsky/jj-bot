const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class AfroHouseDance extends Step {
    message = i18n.__('afroHouseDesc');
    command = i18n.__('afroHouseCommand');
}

module.exports = AfroHouseDance;