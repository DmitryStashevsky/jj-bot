const Step = require('./step.js');
const { Status } = require('../enums.js');
const { extractNumber } = require('../regex.handler.js');

class JoinEvent extends Step {
    constructor(message, command, getMetaFunc, getEventsFunc, getEventsParticipantsFunc, participateEventFunc) {
        super(message, command);
        this.getMetaFunc = getMetaFunc;
        this.getEventsFunc = getEventsFunc;
        this.getEventsParticipantsFunc = getEventsParticipantsFunc;
        this.participateEventFunc = participateEventFunc;
        this.readMetaField = 'event';
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        this.meta = this.getMetaFunc(this.context.from.username, this.readMetaField);
        const id = extractNumber(this.context.text);
        this.events  = await this.getEventsFunc(this.meta);
        this.event = await this.getEvent(id);
        this.participants = await this.getEventsParticipantsFunc(this.meta);
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
        const rowNumber = this.participants.filter(x => !x.eventId)[0].id
        await this.participateEventFunc(this.meta, rowNumber, this.event.id, this.event.name, this.context.from.username, this.context.chatId, Status.Pending, this.meta);
    }
    
    async getEvent(text) {
        const eventId = this.getEventId(text);
        const event = this.events.filter(x => x.id === eventId)[0];
        return event;
    }

    getEventId(text) {
        const matches = text.match(/(\d+)/);
        if (!matches) {
            return null;
        }
        return matches[0];
    }
}
module.exports = JoinEvent;