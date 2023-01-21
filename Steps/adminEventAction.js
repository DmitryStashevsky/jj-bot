const ActionStep = require('./baseSteps/actionStep.js');
const i18n = require('../i18n.config.js');
const { getCallBackData } = require('../callback-data.handler.js');

class AdminEventAction extends ActionStep {
    constructor(message, command, actionName, condition, userMessage, getEventParticipationFunc, updateEventParticipationFunc, notifyUserFunc) {
        super(message, command, actionName, condition);
        this.userMessage = i18n.__(userMessage);
        this.getEventParticipationFunc = getEventParticipationFunc;
        this.updateEventParticipationFunc = updateEventParticipationFunc;
        this.notifyUserFunc = notifyUserFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init () {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.eventParticipation = await this.getEventParticipationFunc(id, type);
    }

    setUserMessage() {
        this.userMessage += ` - ${this.eventParticipation.name}`;
    }

    async finish() {
        await this.updateEventParticipationFunc(this.eventParticipation.id, this.eventParticipation.type);
        await this.notifyUserFunc(this.eventParticipation.chatId, this.userMessage)
    }
}

module.exports = AdminEventAction;