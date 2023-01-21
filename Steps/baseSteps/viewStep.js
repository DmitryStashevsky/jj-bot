const Step = require('./step.js');
const i18n = require('../../i18n.config.js');

class ViewStep extends Step {
    constructor(message, command) {
        super(message, command);
    }

    async setButtons() {
        for(let step of this.nextSteps) {
            if (!step.condition || step.condition(this.entity)) {
                this.buttons.push([{
                    text: i18n.__(step.actionName),
                    callback_data: createCallBackData(step.command, {number: this.entity.id, string: this.entity.type || this.type})
                }]);
            }   
        }
    }
}

module.exports = ViewStep;