const ViewStep = require('./baseSteps/viewStep.js');

class AdminGroupsLesson extends ViewStep {
    constructor(message, command, getGroupParticipationFunc) {
        super(message, command);
        this.getGroupParticipationFunc = getGroupParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        this.entity = await this.getGroupParticipationFunc(this.context.id, this.context.type);
    }

    async setMessage() {
        this.message += ` ${this.entity.className} - ${this.entity.type} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminGroupsLesson;