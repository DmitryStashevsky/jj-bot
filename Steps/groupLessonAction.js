const ActionStep = require('./baseSteps/actionStep.js');
const { Status } = require('../enums.js');

class GroupLessonAction extends ActionStep {
    constructor(message, command, actionName, condition, getClassFunc, getClassesParticipantsFunc, participateClassFunc) {
        super(message, command, actionName, condition);
        this.getClassFunc = getClassFunc;
        this.getClassesParticipantsFunc = getClassesParticipantsFunc;
        this.participateClassFunc = participateClassFunc;
        this.isDynamicStep = true;
        this.isBackAvailable = false;
    }

    async init() {
        this.class = await this.getClassFunc(this.context.id,this.context.type);
        this.participants = await this.getClassesParticipantsFunc(this.context.type);
    }

    async setMessage() {
        this.message += `- ${this.class.name}`;
    }

    async setPrivateMessage() {
        this.privateMessage = `Dancer ${this.context.from.username} wants to attend you group class - ${this.class.name}`;
    }

    async finish() {
        const rowNumber = this.participants.filter(x => !x.classId)[0].id
        await this.participateClassFunc(this.context.type, rowNumber, this.class.id, this.class.name, this.context.from.username, this.context.chatId, Status.Pending);
    }
}
module.exports = GroupLessonAction;