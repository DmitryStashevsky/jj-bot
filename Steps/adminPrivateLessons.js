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
            const options = [];
            for (let i = 0; i < this.privateLessons.length; i++) {
                const lesson = this.privateLessons[i];
                options.push([{
                    text: `${i+1} - ${lesson.username} - ${lesson.status} - ${getTimeString(lesson.time, lesson.countOfHours)}`,
                    callback_data: `${this.nextSteps[0].command} ${lesson.id}`,
                }]);
            }
            this.buttons =  {
                "reply_markup": {
                    "inline_keyboard": options
                }
            }
        }
    }
}

module.exports = AdminPrivateLessons;