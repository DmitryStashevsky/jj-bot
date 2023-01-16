const Step = require('./step.js');
const { getTimeString } = require('../calendar.js');
const i18n = require('../i18n.config.js');
const {extractNumber, extractString} = require('../regex.handler.js');

class Event extends Step {
    constructor(message, command, getEventFunc) {
        super(message, command);
        this.getEventFunc = getEventFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const id = extractNumber(this.context.text);
        const type = extractString(this.context.text);
        this.type = type;
        this.event = await this.getEventFunc(id, type);
    }

    async setMessage() {
        if(this.event) {
            this.message =  this.message + ` - ${getTimeString(this.event.time, this.event.hours)} - ${this.event.place}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this.buttons = [[{
            text: i18n.__('join'),
            callback_data: `${this.nextSteps[0].command} - ${this.event.id} [${this.type}]`,
        }]];
    }
}
module.exports = Event;