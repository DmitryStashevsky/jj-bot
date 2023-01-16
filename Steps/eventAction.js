const Step = require('./step.js');
const { Status } = require('../enums.js');
const { extractNumber, extractString } = require('../regex.handler.js');

class EventAction extends Step {
    constructor(message, command, getEventFunc, getEventsParticipantsFunc, participateEventFunc) {
        super(message, command);
        this.getEventFunc = getEventFunc;
        this.getEventsParticipantsFunc = getEventsParticipantsFunc;
        this.participateEventFunc = participateEventFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.type = type;
        this.event = await this.getEventFunc(id, type);
        this.participants = await this.getEventsParticipantsFunc(type);
    }

    async setMessage() {
        if(this.event) {
            this.message =  this.message + `- ${this.event.name} - ${this.event.time} - ${this.event.place}`;
        }
        else {
            return false;
        }
    }

    async setPrivateMessage() {
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you event - ${this.meta}- ${this.event.name}`;
    }

    async finish() {
        await this.participateEventFunc(this.type, this.event.id, this.event.id, this.event.name, this.context.from.username, this.context.chatId, Status.Pending, this.type);
    }
}
module.exports = EventAction;