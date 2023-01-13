const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const i18n = require('../i18n.config.js');

class GroupLesson extends Step {
    constructor(message, command, getGroupLessonFunc) {
        super(message, command);
        this.getGroupLessonFunc = getGroupLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const id = this.context.text.match(/(\d+)/)[0];
        const type = this.context.text.match(/\[([^)]+)\]/)[1]
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