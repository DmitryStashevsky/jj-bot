const Step = require('./step.js');

class ActionStep extends Step {
    constructor(message, command, actionName, stepCondition) {
        super(message, command);
        this.actionName = actionName;
        this.stepCondition = stepCondition;
    }
}

module.exports = ActionStep;