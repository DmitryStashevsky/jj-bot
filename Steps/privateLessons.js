const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class PrivateLessons extends Step {
    constructor(message, command, metaData, getFreeSlotsFunc) {
        super();
        this.message = i18n.__(message);
        this.command = i18n.__(command);
        this.metaData = metaData
        this.getFreeSlotsFunc = getFreeSlotsFunc;
    }

    metaField = 'privateDance';

    async getButtons() {
        const lessons = await this.getFreeSlotsFunc();
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

module.exports = PrivateLessons;