const Step = require('./step.js');

class Events extends Step {
    constructor(message, command, type, getEventsFunc) {
        super(message, command);
        this.type = type;
        this.getEventsFunc = getEventsFunc;
    }

    async init () {
        this.events = await this.getEventsFunc();
    }

    setAdditionalMessage()  {
        if (this.events.length == 0) {
            this.additionalMessage = i18n.__('noEventsDesc');
        }
    }

    async setButtons() {
        if (this.events.length) {
            for (let i = 0; i < this.events.length; i++) {
                this.buttons.push([{
                    text: `${i+1} - ${this.events[i].name}`,
                    callback_data: `${this.nextSteps[0].command} ${this.events[i].id} [${this.type}]`,
                }]);
            }
        }
    }
}

module.exports = Events;