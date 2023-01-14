const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const { Status } = require('../enums.js');
const {extractNumber} = require('../regex.handler.js');

class PrivateLessonAction extends Step {
    constructor(message, command, getMetaFunc, getPrivateLessonFunc, participatePrivateLessonFunc) {
        super(message, command);
        this.getMetaFunc = getMetaFunc;
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.participatePrivateLessonFunc = participatePrivateLessonFunc;
        this.readMetaField = 'privateDance';
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        const id = extractNumber(this.context.text);
        this.freeSlot = await this.getPrivateLessonFunc(id);
    }

    async setMessage() {
        if(this.freeSlot) {
            this.message =  this.message + `- ${getTimeString(this.freeSlot.time, this.freeSlot.countOfHours)}`;
        }
        else {
            return false;
        }
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