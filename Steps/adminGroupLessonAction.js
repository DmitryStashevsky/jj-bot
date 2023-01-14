const Step = require('./step.js');
const i18n = require('../i18n.config.js');
const {extractNumber, extractString} = require('../regex.handler.js');

class AdminGroupLessonAction extends Step {
    constructor(message, command, userMessage, getClassParticipationFunc, updateClassParticipationFunc, notifyUserFunc) {
        super(message, command);
        this.userMessage = i18n.__(userMessage);
        this.getClassParticipationFunc = getClassParticipationFunc;
        this.updateClassParticipationFunc = updateClassParticipationFunc;
        this.notifyUserFunc = notifyUserFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init () {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.classParticipation = await this.getClassParticipationFunc(id, type);
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