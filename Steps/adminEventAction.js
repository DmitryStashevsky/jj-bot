const Step = require('./step.js');
const i18n = require('../i18n.config.js');

class AdminEventAction extends Step {
    constructor(message, command, userMessage, getEventParticipationFunc, updateEventParticipationFunc, notifyUserFunc) {
        super(message, command);
        this.userMessage = i18n.__(userMessage);
        this.getEventParticipationFunc = getEventParticipationFunc;
        this.updateEventParticipationFunc = updateEventParticipationFunc;
        this.notifyUserFunc = notifyUserFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init () {
        const id = this.context.text.match(/(\d+)/)[0];
        const type = this.context.text.match(/\[([^)]+)\]/)[1]
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