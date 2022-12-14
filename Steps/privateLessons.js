const Step = require('./step.js');
const {getTimeString} = require('../calendar.js');
const i18n = require('../i18n.config.js');

class PrivateLessons extends Step {
    constructor(message, command, metaData, getFreeSlotsFunc) {
        super(message, command);
        this.metaData = metaData
        this.getFreeSlotsFunc = getFreeSlotsFunc;
        this.metaField = 'privateDance';
    }

    async init() {
        this.lessons = await this.getFreeSlotsFunc();
    }

    setAdditionalMessage()  {
        if (this.lessons.length == 0) {
            this.additionalMessage = i18n.__('noFreeSlotsDesc');
        }
    }

    async setButtons() {
        if (this.nextSteps.length) {
            const options = [];
            for (let i = 0; i < this.lessons.length; i++) {
                const lesson = this.lessons[i];
                options.push([{
                    text: `${i+1} - ${getTimeString(lesson.time, lesson.countOfHours)}`,
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

module.exports = PrivateLessons;