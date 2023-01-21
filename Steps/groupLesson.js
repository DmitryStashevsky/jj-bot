const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');
const { getCallBackData } = require('../callback-data.handler.js');

class GroupLesson extends ViewStep {
    constructor(message, command, getGroupLessonFunc) {
        super(message, command);
        this.getGroupLessonFunc = getGroupLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.type = type;
        this.entity = await this.getGroupLessonFunc(id, type);
    }

    async setMessage() {
        this.message += ` - ${getTimeString(this.entity.time, this.entity.hours)} - ${this.entity.place}`;
    }
}
module.exports = GroupLesson;