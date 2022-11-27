const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinGroupLesson extends Step {
    constructor(message, command, getLessonsFunc) {
        super();
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.getLessonsFunc = getLessonsFunc;
    }

    isNeedMessageToJj = true;

    async getMessage(from, message, text) {
        const lesson = await this.getLesson(text);
        if(lesson) {
            return this.message + `- ${lesson}`;
        }
        else {
            return false;
        }
    }

    async getPrivateMessage(from, message, text) {
        const lesson = await this.getLesson(text);
        return `Dancer ${from.username} wants to attend you group class - ${lesson}`;
    }

    async getLesson(text) {
        const matches = text.match(/(\d+)/);
        const lessons = await this.getLessonsFunc();
        if (!matches) {
            return false;
        }
        const lesson = lessons[matches[0]-1];
        return lesson;
    }
}
module.exports = JoinGroupLesson;