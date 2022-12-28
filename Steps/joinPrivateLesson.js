const Step = require('./step.js');
const { Status } = require('../enums.js');

class JoinPrivateLesson extends Step {
    constructor(message, command, getMetaFunc, getFreeSlotsFunc, participatePrivateLessonFunc) {
        super(message, command);
        this.getMetaFunc = getMetaFunc;
        this.getFreeSlotsFunc = getFreeSlotsFunc;
        this.participatePrivateLessonFunc = participatePrivateLessonFunc;
        this.readMetaField = 'privateDance';
    }

    async init() {
        this.freeSlot = await this.getFreeSlot(this.context.text);
    }

    async setMessage() {
        if(this.freeSlot) {
            this.message =  this.message + `- ${this.freeSlot.time}`;
        }
        else {
            return false;
        }
    }

    async setPrivateMessage() {
        const meta = this.getMetaFunc(this.context.from.username, this.readMetaField);
        this.privateMessage =  `Dancer ${this.context.from.username} wants to attend you private class ${meta}- ${this.freeSlot.time}`;
    }

    async finish() {
        const meta = this.getMetaFunc(this.context.from.username, this.readMetaField);
        await this.participatePrivateLessonFunc(this.freeSlot.id, meta, this.context.from.username, this.context.chatId, Status.Pending);
    }
    
    async getFreeSlot(text) {
        const slotId = this.getSlotId(text);
        const slots  = await this.getFreeSlotsFunc();
        const slot = slots.filter(x => x.id === slotId)[0];
        return slot;
    }

    getSlotId(text) {
        const matches = text.match(/(\d+)/);
        if (!matches) {
            return null;
        }
        return matches[0];
    }
}
module.exports = JoinPrivateLesson;