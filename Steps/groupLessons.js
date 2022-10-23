const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class GroupLessons extends Step {
    constructor(repository) {
        super();
        this.repository = repository;
    }

    message = i18n.__('groupDesc');
    command = i18n.__('groupCommand');

    getButtons() {
        const lessons = this.repository.getLessons();
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