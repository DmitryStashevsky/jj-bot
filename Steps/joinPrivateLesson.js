const Step = require('./step.js');

class JoinPrivateLesson extends Step {
    constructor(message, command, getMetaFunc, getFreeSlotsFunc, participatePrivateLessonFunc) {
        super(message, command);
        this.getMetaFunc = getMetaFunc;
        this.getFreeSlotsFunc = getFreeSlotsFunc;
        this.participatePrivateLessonFunc = participatePrivateLessonFunc;
        this.readMetaField = 'privateDance';
    }

    async init(from, message, text) {
        this.freeSlot = await this.getFreeSlot(text);
    }

    async setMessage(from, message, text) {
        if(this.freeSlot) {
            this.message =  this.message + `- ${this.freeSlot.time}`;
        }
        else {
            return false;
        }
    }

    async setPrivateMessage(from, message, text) {
        const meta = this.getMetaFunc(from.username, this.readMetaField);
        this.privateMessage =  `Dancer ${from.username} wants to attend you private class ${meta}- ${this.freeSlot.time}`;
    }

    async finish(from, message, text) {
        const meta = this.getMetaFunc(from.username, this.readMetaField);
        await this.participatePrivateLessonFunc(this.freeSlot.id, meta, from.username);
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