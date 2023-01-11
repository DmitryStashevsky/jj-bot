const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');

class AdminPrivateLesson extends Step {
    constructor(message, command, getPrivateLessonFunc) {
        super(message, command);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const matches = this.context.text.match(/(\d+)/);
        this.privateLesson = await this.getPrivateLessonFunc(matches[0]);
    }

    async setMessage() {
        if(this.privateLesson) {
            this.message =  this.message + ` ${getTimeString(this.privateLesson.time, this.privateLesson.countOfHours)} - ${this.privateLesson.username} - ${this.privateLesson.status}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        if (this.privateLesson.status == Status.Pending || this.privateLesson.status == Status.Approved) {
            this.buttons.push([{
                text: i18n.__('decline'),
                callback_data: `aPLD - ${this.privateLesson.id}`,
            }]);
        }
        
        if (this.privateLesson.status == Status.Pending) {
            this.buttons.push([{
                text: i18n.__('approve'),
                callback_data: `aPLA - ${this.privateLesson.id}`,
            }])
        }
    }
}

module.exports = AdminPrivateLesson;