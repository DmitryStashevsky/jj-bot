const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinGroupLesson extends Step {
    constructor(message, command, getLessonsFunc) {
        super(message, command);
        this.getLessonsFunc = getLessonsFunc;
    }

    async init(from, message, text) {
        this.lesson = await this.getLesson(text);
    }

    async setMessage(from, message, text) {
        if(this.lesson) {
            this.message = this.message + `- ${this.lesson}`;
        }
        else {
            this.message = null;
        }
    }

    async setPrivateMessage(from, message, text) {
        this.privateMessage = `Dancer ${from.username} wants to attend you group class - ${this.lesson}`;
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