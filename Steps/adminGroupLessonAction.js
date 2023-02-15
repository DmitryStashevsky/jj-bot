const ActionStep = require('./baseSteps/actionStep.js');
const i18n = require('../i18n.config.js');

class AdminGroupLessonAction extends ActionStep {
    constructor(message, command, actionName, condition, userMessage, getClassParticipationFunc, updateClassParticipationFunc, notifyUserFunc) {
        super(message, command, actionName, condition);
        this.userMessage = i18n.__(userMessage);
        this.getClassParticipationFunc = getClassParticipationFunc;
        this.updateClassParticipationFunc = updateClassParticipationFunc;
        this.notifyUserFunc = notifyUserFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init () {
        this.classParticipation = await this.getClassParticipationFunc(this.context.id, this.context.type);
    }

    setUserMessage() {
        this.userMessage += ` - ${this.classParticipation.className}`;
    }

    async finish() {
        await this.updateClassParticipationFunc(this.classParticipation.id, this.classParticipation.type);
        await this.notifyUserFunc(this.classParticipation.chatId, this.userMessage)
    }
}

module.exports = AdminGroupLessonAction;