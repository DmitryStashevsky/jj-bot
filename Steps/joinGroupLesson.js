const Step = require('./step.js');
const { Status } = require('../enums.js');
const {extractNumber, extractString} = require('../regex.handler.js');

class JoinGroupLesson extends Step {
    constructor(message, command, getClassFunc, getClassesParticipantsFunc, participateClassFunc) {
        super(message, command);
        this.getClassFunc = getClassFunc;
        this.getClassesParticipantsFunc = getClassesParticipantsFunc;
        this.participateClassFunc = participateClassFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.type = type;
        this.class = await this.getClassFunc(id, type);
        this.participants = await this.getClassesParticipantsFunc(type);
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
        await this.participateClassFunc(this.type, rowNumber, this.class.id, this.class.name, this.context.from.username, this.context.chatId, Status.Pending);
    }
}
module.exports = JoinGroupLesson;