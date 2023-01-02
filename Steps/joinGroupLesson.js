const Step = require('./step.js');
const { Status } = require('../enums.js');

class JoinGroupLesson extends Step {
    constructor(message, command, getClassesFunc, getClassesParticipantsFunc, participateClassFunc) {
        super(message, command);
        this.getClassesFunc = getClassesFunc;
        this.getClassesParticipantsFunc = getClassesParticipantsFunc;
        this.participateClassFunc = participateClassFunc;
        this.isDynamicStep = true;
    }

    async init() {
        this.classes = await this.getClassesFunc();
        this.class = await this.getClass(this.context.text);
        this.participants = await this.getClassesParticipantsFunc();
    }

    async setMessage() {
        if(this.class) {
            this.message = this.message + `- ${this.class.name}`;
        }
        else {
            this.message = null;
        }
    }

    async setPrivateMessage() {
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you group class - ${this.class.name}`;
    }

    async finish() {
        const rowNumber = this.participants.filter(x => !x.classId)[0].id
        await this.participateClassFunc(rowNumber, this.class.id, this.class.name, this.context.from.username, this.context.chatId, Status.Pending);
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