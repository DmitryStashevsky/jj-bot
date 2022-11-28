const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class GroupLessons extends Step {
    constructor(message, command, getLessonsFunc) {
        super(message, command);
        this.getLessonsFunc = getLessonsFunc;
    }

    async setButtons() {
        const lessons = await this.getLessonsFunc();
        if (this.nextSteps.length) {
            const options = [];
            for (let i = 0; i < lessons.length; i++) {
                options.push([{
                    text: `${i+1} - ${lessons[i]}`,
                    callback_data: `${this.nextSteps[0].command} ${i+1}`,
                }]);
            }
            this.buttons = {
                "reply_markup": {
                    "inline_keyboard": options
                }
            }
        }

        return null;
    }
}

module.exports = GroupLessons;