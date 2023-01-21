const ActionStep = require('./baseSteps/actionStep.js');
const { Status } = require('../enums.js');
const { getCallBackData } = require('../callback-data.handler.js');

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
        const {number: id, string: type} = getCallBackData(this.context.text);
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
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you event - ${this.type}- ${this.event.name}`;
    }

    async finish() {
        const idOfFreePlace = this.participants.filter(x => !x.eventId)[0].id
        await this.participateEventFunc(this.type, idOfFreePlace, this.event.id, this.event.name, this.context.from.username, this.context.chatId, Status.Pending, this.type);
    }
}
module.exports = EventAction;