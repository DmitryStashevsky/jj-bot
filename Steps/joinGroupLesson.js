const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinGroupLesson extends Step {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    message = i18n.__('joinGroupDesc');
    command = i18n.__('joinGroupCommand');
    isNeedMessageToJj = true;

    getMessage(from, message, text) {
        const lesson = this.getLesson(text);
        if(lesson) {
            return this.message + `- ${lesson}`;
        }
        else {
            return false;
        }
    }

    getPrivateMessage(from, message, text) {
        const lesson = this.getLesson(text);
        return `Dancer ${from.username} wants to attend you group class - ${lesson}`;
    }

    getLesson(text) {
        const matches = text.match(/(\d+)/);
        const lessons = this.repository.getLessons();
        if (!matches) {
            return false;
        }
        const lesson = lessons[matches[0]-1];
        return lesson;
    }
}
module.exports = JoinGroupLesson;