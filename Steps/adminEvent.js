const ViewStep = require('./baseSteps/viewStep.js');
const { getCallBackData } = require('../callback-data.handler.js');

class AdminEvent extends ViewStep {
    constructor(message, command, getEventParticipationFunc) {
        super(message, command);
        this.getEventParticipationFunc = getEventParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.entity = await this.getEventParticipationFunc(id, type);
    }

    async setMessage() {
        this.message += ` ${this.entity.name} - ${this.entity.type} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminEvent;