const Step = require('./step.js');

class AdminEvents extends Step {
    constructor(message, command, getEventsParticipationsFunc) {
        super(message, command);
        this.getEventsParticipationsFunc = getEventsParticipationsFunc;
    }

    async init () {
        this.events = await this.getEventsParticipationsFunc();
    }

    async setButtons() {
        if (this.events.length) {
            const options = [];
            for (let i = 0; i < this.events.length; i++) {
                const event = this.events[i];
                options.push([{
                    text: `${i+1} - ${event.username} - ${event.status} - ${event.name}`,
                    callback_data: `${this.nextSteps[0].command} ${event.id} [${event.type}]`,
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

module.exports = AdminEvents;