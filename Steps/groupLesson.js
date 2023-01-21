const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');

class GroupLesson extends ViewStep {
    constructor(message, command, getGroupLessonFunc) {
        super(message, command);
        this.getGroupLessonFunc = getGroupLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        this.entity = await this.getGroupLessonFunc(this.context.id, this.context.type);
    }

    async setMessage() {
        this.message += ` - ${getTimeString(this.entity.time, this.entity.hours)} - ${this.entity.place}`;
    }
}
module.exports = GroupLesson;