const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const i18n = require('../i18n.config.js');
const {extractNumber, extractString} = require('../regex.handler.js');

class GroupLesson extends Step {
    constructor(message, command, getGroupLessonFunc) {
        super(message, command);
        this.getGroupLessonFunc = getGroupLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.type = type;
        this.groupLesson = await this.getGroupLessonFunc(id, type);
    }

    async setMessage() {
        if(this.groupLesson) {
            this.message =  this.message + ` - ${getTimeString(this.groupLesson.time, this.groupLesson.hours)} - ${this.groupLesson.place}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this.buttons = [[{
            text: i18n.__('join'),
            callback_data: `${this.nextSteps[0].command} - ${this.groupLesson.id} [${this.type}]`,
        }]];
    }
}
module.exports = GroupLesson;