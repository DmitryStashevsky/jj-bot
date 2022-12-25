const Step = require('./step.js');
const i18n = require('../i18n.config.js');

class AdminPrivateLessonAction extends Step {
    constructor(message, command, userMessage, getPrivateLessonFunc, updatePrivateLessonFunc, notifyUserFunc) {
        super(message, command);
        this.userMessage = i18n.__(userMessage);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.updatePrivateLessonFunc = updatePrivateLessonFunc;
        this.notifyUserFunc = notifyUserFunc;
    }

    async init () {
        const matches = this.context.text.match(/(\d+)/);
        this.privateLesson  = await this.getPrivateLessonFunc(matches[0]);
    }

    setUserMessage() {
        this.userMessage += ` - ${this.privateLesson.time} - ${this.privateLesson.dance}`;
    }

    async finish() {
        await this.updatePrivateLessonFunc(this.privateLesson.id);
        await this.notifyUserFunc(this.privateLesson.chatId, this.userMessage)
    }
}

module.exports = AdminPrivateLessonAction;