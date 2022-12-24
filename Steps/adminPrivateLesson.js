const Step = require('./step.js');

class AdminPrivateLesson extends Step {
    constructor(message, command, getPrivateLessonFunc) {
        super(message, command);
        this.getPrivateLessonFunc = getPrivateLessonFunc;
    }

    async init () {
        const matches = this.context.text.match(/(\d+)/);
        this.privateLesson  = await this.getPrivateLessonFunc(matches[0]);
    }

    async setMessage() {
        if(this.privateLesson) {
            this.message =  this.message + ` ${this.privateLesson.time} - ${this.privateLesson.username}`;
        }
        else {
            return false;
        }
    }
}

module.exports = AdminPrivateLesson;