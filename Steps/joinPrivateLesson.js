const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinPrivateLesson extends Step {
    constructor(message, command, getMetaFunc, getFreeSlotsFunc) {
        super();
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.getMetaFunc = getMetaFunc;
        this.getFreeSlotsFunc = getFreeSlotsFunc;
    }

    readMetaField = 'privateDance';
    isNeedMessageToJj = true;

    async getMessage(from, message, text) {
        const lesson = await this.getFreeSlots(text);
        if(lesson) {
            return this.message + `- ${lesson}`;
        }
        else {
            return false;
        }
    }

    async getPrivateMessage(from, message, text) {
        const lesson = await this.getFreeSlots(text);
        const meta = this.getMetaFunc(from.username, this.readMetaField);
        return `Dancer ${from.username} wants to attend you private class ${meta}- ${lesson}`;
    }

    async getFreeSlots(text) {
        const matches = text.match(/(\d+)/);
        const lessons = await this.getFreeSlotsFunc();
        if (!matches) {
            return false;
        }
        const lesson = lessons[matches[0]-1];
        return lesson;
    }
}
module.exports = JoinPrivateLesson;