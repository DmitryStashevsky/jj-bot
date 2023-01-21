const ViewStep = require('./baseSteps/viewStep.js');
const { getCallBackData } = require('../callback-data.handler.js');

class AdminGroupsLesson extends ViewStep {
    constructor(message, command, getGroupParticipationFunc) {
        super(message, command);
        this.getGroupParticipationFunc = getGroupParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.entity = await this.getGroupParticipationFunc(id, type);
    }

    async setMessage() {
        this.message += ` ${this.entity.className} - ${this.entity.type} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminGroupsLesson;