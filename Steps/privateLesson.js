const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const i18n = require('../i18n.config.js');

class PrivateLesson extends Step {
    constructor(message, command, getPrivateLessonFunc) {
        super(message, command);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const id = this.context.text.match(/(\d+)/)[0];
        this.privateLesson = await this.getPrivateLessonFunc(id);
    }

    async setMessage() {
        if(this.privateLesson) {
            this.message =  this.message + `- ${getTimeString(this.privateLesson.time, this.privateLesson.countOfHours)} - ${this.privateLesson.place}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        const options = [[{
            text: i18n.__('join'),
            callback_data: `JPL - ${this.privateLesson.id}`,
        }]];

        this.buttons =  {
            "reply_markup": {
                "inline_keyboard": options
            }
        }
    }
}
module.exports = PrivateLesson;