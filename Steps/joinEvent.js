const Step = require('./step.js');

class JoinEvent extends Step {
    constructor(message, command, getMetaFunc, getEventsFunc, getEventsParticipantsFunc, participateEventFunc) {
        super(message, command);
        this.getMetaFunc = getMetaFunc;
        this.getEventsFunc = getEventsFunc;
        this.getEventsParticipantsFunc = getEventsParticipantsFunc;
        this.participateEventFunc = participateEventFunc;
    }

    readMetaField = 'event';

    async init(from, message, text) {
        this.meta = this.getMetaFunc(from.username, this.readMetaField);
        this.events  = await this.getEventsFunc(this.meta);
        this.event = await this.getEvent(text);
        this.participants = await this.getEventsParticipantsFunc(this.meta);
    }

    async setMessage(from, message, text) {
        if(this.event) {
            this.message =  this.message + `- ${this.event.name}`;
        }
        else {
            return false;
        }
    }

    async setPrivateMessage(from, message, text) {
        this.privateMessage =  `Dancer ${from.username} wants to attend you event - ${this.meta}- ${this.event.name}`;
    }

    async finish(from, message, text) {
        const rowNumber = this.participants.filter(x => !x.eventId)[0].id
        await this.participateEventFunc(this.meta, rowNumber, this.event.id, this.event.name, from.username);
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