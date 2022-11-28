const i18n = require('../i18n.config.js');
const Step = require('./step.js');

class PrivateLessons extends Step {
    constructor(message, command, metaData, getFreeSlotsFunc) {
        super(message, command);
        this.metaData = metaData
        this.getFreeSlotsFunc = getFreeSlotsFunc;
    }

    metaField = 'privateDance';

    async setButtons() {
        const lessons = await this.getFreeSlotsFunc();
        if (this.nextSteps.length) {
            const options = [];
            for (let i = 0; i < lessons.length; i++) {
                options.push([{
                    text: `${i+1} - ${lessons[i].time}`,
                    callback_data: `${this.nextSteps[0].command} ${lessons[i].id}`,
                }]);
            }
            this.buttons =  {
                "reply_markup": {
                    "inline_keyboard": options
                }
            }
        }

        return null;
    }
}

module.exports = PrivateLessons;