const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');
const { getCallBackData } = require('../callback-data.handler.js');

class AdminPrivateLesson extends ViewStep {
    constructor(message, command, getPrivateLessonFunc) {
        super(message, command);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {number: id} = getCallBackData(this.context.text);
        this.entity = await this.getPrivateLessonFunc(id);
    }

    async setMessage() {
        this.message += ` ${getTimeString(this.entity.time, this.entity.countOfHours)} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminPrivateLesson;