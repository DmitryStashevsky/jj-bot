const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class GroupLessons extends Step {
    constructor(message, command, getLessonsFunc) {
        super();
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.getLessonsFunc = getLessonsFunc;
    }

    getButtons() {
        const lessons = this.getLessonsFunc();
        if (this.nextSteps.length) {
            const buttons = [];
            for (let i = 0; i < lessons.length; i++) {
                buttons.push([{
                    text: `${i+1} - ${lessons[i]}`,
                    callback_data: `${this.nextSteps[0].command} ${i+1}`,
                }]);
            }
            return {
                "reply_markup": {
                    "inline_keyboard": buttons
                }
            }
        }

        return null;
    }
}

module.exports = GroupLessons;