const Step = require('./step.js');

class Event extends Step {
    constructor(message, command, metaData, getEventsFunc) {
        super(message, command);
        this.metaData = metaData;
        this.getEventsFunc = getEventsFunc;
        this.metaField = 'event';
    }

    async init () {
        this.events = await this.getEventsFunc();
    }

    setAdditionalMessage()  {
        if (this.events.length == 0) {
            this.additionalMessage = i18n.__('noEventsCommand');
        }
    }

    async setButtons() {
        if (this.events.length) {
            const options = [];
            for (let i = 0; i < this.events.length; i++) {
                options.push([{
                    text: `${i+1} - ${this.events[i].name}`,
                    callback_data: `${this.nextSteps[0].command} ${this.events[i].id}`,
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

module.exports = Event;