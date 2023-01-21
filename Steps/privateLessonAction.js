const ActionStep = require('./baseSteps/actionStep.js');
const { getTimeString } = require('../calendar.js');
const { Status } = require('../enums.js');

class PrivateLessonAction extends ActionStep {
    constructor(message, command, actionName, condition, getMetaFunc, getPrivateLessonFunc, participatePrivateLessonFunc) {
        super(message, command, actionName, condition);
        this.getMetaFunc = getMetaFunc;
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.participatePrivateLessonFunc = participatePrivateLessonFunc;
        this.readMetaField = 'privateDance';
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
        const meta = this.getMetaFunc(this.context.from.username, this.readMetaField);
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you private class ${meta}- ${getTimeString(this.freeSlot.time, this.freeSlot.countOfHours)}`;
    }

    async finish() {
        const meta = this.getMetaFunc(this.context.from.username, this.readMetaField);
        await this.participatePrivateLessonFunc(this.freeSlot.id, meta, this.context.from.username, this.context.chatId, Status.Pending);
    }
}
module.exports = PrivateLessonAction;