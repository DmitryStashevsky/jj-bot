const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const i18n = require('../i18n.config.js');
const { getCallBackData, createCallBackData } = require('../callback-data.handler.js');

class GroupLesson extends Step {
    constructor(message, command, getGroupLessonFunc) {
        super(message, command);
        this.getGroupLessonFunc = getGroupLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.type = type;
        this.groupLesson = await this.getGroupLessonFunc(id, type);
    }

    async setMessage() {
        if(this.groupLesson) {
            this.message += ` - ${getTimeString(this.groupLesson.time, this.groupLesson.hours)} - ${this.groupLesson.place}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this.buttons = [[{
            text: i18n.__('join'),
            callback_data: createCallBackData(this.nextSteps[0].command, {number: this.groupLesson.id, string: this.type}),
        }]];
    }
}
module.exports = GroupLesson;