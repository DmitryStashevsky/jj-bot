const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');

class AdminPrivateLessons extends Step {
    constructor(message, command, getPrivateLessonsFunc) {
        super(message, command);
        this.getPrivateLessonsFunc = getPrivateLessonsFunc;
    }

    async init () {
        this.privateLessons = await this.getPrivateLessonsFunc();
    }

    async setButtons() {
        if (this.privateLessons.length) {
            for (let i = 0; i < this.privateLessons.length; i++) {
                const lesson = this.privateLessons[i];
                this.buttons.push([{
                    text: `${i+1} - ${lesson.username} - ${lesson.status} - ${getTimeString(lesson.time, lesson.countOfHours)}`,
                    callback_data: `${this.nextSteps[0].command} ${lesson.id}`,
                }]);
            }
        }
    }
}

module.exports = AdminPrivateLessons;