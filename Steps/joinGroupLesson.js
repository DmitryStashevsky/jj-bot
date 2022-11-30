const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class JoinGroupLesson extends Step {
    constructor(message, command, getClassesFunc, getClassesParticipantsFunc, participateClassFunc) {
        super(message, command);
        this.getClassesFunc = getClassesFunc;
        this.getClassesParticipantsFunc = getClassesParticipantsFunc;
        this.participateClassFunc = participateClassFunc;
    }

    async init(from, message, text) {
        this.classes = await this.getClassesFunc();
        this.class = await this.getClass(text);
        this.participants = await this.getClassesParticipantsFunc();
    }

    async setMessage(from, message, text) {
        if(this.class) {
            this.message = this.message + `- ${this.class.name}`;
        }
        else {
            this.message = null;
        }
    }

    async setPrivateMessage(from, message, text) {
        this.privateMessage = `Dancer ${from.username} wants to attend you group class - ${this.class.name}`;
    }

    async finish(from, message, text) {
        const rowNumber = this.participants.filter(x => !x.classId)[0].id
        await this.participateClassFunc(rowNumber, this.class.id, this.class.name, from.username);
    }

    async getClass(text) {
        const classId = this.getClassId(text);
        const lesson = this.classes.filter(x => x.id === classId)[0];
        return lesson;
    }

    getClassId(text) {
        const matches = text.match(/(\d+)/);
        if (!matches) {
            return null;
        }
        return matches[0];
    }
}
module.exports = JoinGroupLesson;