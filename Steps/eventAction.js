const ActionStep = require('./baseSteps/actionStep.js');
const { Status } = require('../enums.js');

class EventAction extends ActionStep {
    constructor(message, command, actionName, condition, getEventFunc, getEventsParticipantsFunc, participateEventFunc) {
        super(message, command, actionName, condition);
        this.getEventFunc = getEventFunc;
        this.getEventsParticipantsFunc = getEventsParticipantsFunc;
        this.participateEventFunc = participateEventFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        this.event = await this.getEventFunc(this.context.id, this.context.type);
        this.participants = await this.getEventsParticipantsFunc(this.context.type);
    }

    async setMessage() {
        this.message += ` - ${this.event.name} - ${getTimeString(this.event.time, this.event.hours)}  - ${this.event.place}`;
    }

    async setPrivateMessage() {
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you event - ${this.context.type}- ${this.event.name}`;
    }

    async finish() {
        const idOfFreePlace = this.participants.filter(x => !x.eventId)[0].id
        await this.participateEventFunc(this.context.type, idOfFreePlace, this.event.id, this.event.name, this.context.from.username, this.context.chatId, Status.Pending, this.type);
    }
}
module.exports = EventAction;