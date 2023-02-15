const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');

class AdminPrivateLesson extends ViewStep {
    constructor(message, command, getPrivateLessonFunc) {
        super(message, command);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.isDynamicStep = true;
    }

    async init () {
        this.entity = await this.getPrivateLessonFunc(this.context.id);
    }

    async setMessage() {
        this.message += ` ${getTimeString(this.entity.time, this.entity.countOfHours)} - ${this.entity.username} - ${this.entity.status}`;
    }
}

module.exports = AdminPrivateLesson;