const ViewStep = require('./baseSteps/viewStep.js');

class AdminEvent extends ViewStep {
    constructor(message, command, getEventParticipationFunc) {
        super(message, command);
        this.getEventParticipationFunc = getEventParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        this.entity = await this.getEventParticipationFunc(this.context.id, this.context.type);
    }

    async setMessage() {
        this.message += ` ${this.entity.name} - ${this.entity.type} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminEvent;