const ActionStep = require('./baseSteps/actionStep.js');
const { getTimeString } = require('../calendar.js');
const { Status } = require('../enums.js');

class PrivateLessonAction extends ActionStep {
    constructor(message, command, actionName, condition, getPrivateLessonFunc, participatePrivateLessonFunc) {
        super(message, command, actionName, condition);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.participatePrivateLessonFunc = participatePrivateLessonFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        this.freeSlot = await this.getPrivateLessonFunc(this.context.id);
    }

    async setMessage() {
        this.message =  this.message + `- ${getTimeString(this.freeSlot.time, this.freeSlot.countOfHours)}`;
    }

    async setPrivateMessage() {
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you private class - ${getTimeString(this.freeSlot.time, this.freeSlot.countOfHours)}`;
    }

    async finish() {
        await this.participatePrivateLessonFunc(this.freeSlot.id, 'N/A', this.context.from.username, this.context.chatId, Status.Pending);
    }
}
module.exports = PrivateLessonAction;