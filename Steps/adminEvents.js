const Step = require('./step.js');
const { createCallBackData } = require('../callback-data.handler.js');

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
            for (let i = 0; i < this.events.length; i++) {
                const event = this.events[i];
                this,this.buttons.push([{
                    text: `${i+1} - ${event.username} - ${event.status} - ${event.name}`,
                    callback_data: createCallBackData(this.nextSteps[0].command, {number: event.id, string: event.type})
                }]);
            }
            this
        }
    }
}

module.exports = AdminEvents;