const Step = require('./baseSteps/step.js');
const {getTimeString} = require('../calendar.js');
const i18n = require('../i18n.config.js');
const { addMessageContext } = require('../handlers/context.handler.js');

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
            for (let i = 0; i < this.lessons.length; i++) {
                const lesson = this.lessons[i];
                this.buttons.push([{
                    text: `${i+1} - ${getTimeString(lesson.time, lesson.countOfHours)}`,
                    callback_data: addMessageContext(this.nextSteps[0].command, {number: lesson.id}),
                }]);
            }
        }
    }
}

module.exports = PrivateLessons;