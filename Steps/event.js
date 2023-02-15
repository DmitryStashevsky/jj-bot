const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');

class Event extends ViewStep {
    constructor(message, command, getEventFunc) {
        super(message, command);
        this.getEventFunc = getEventFunc;
        this.isDynamicStep = true;
    }

    async init() {
        this.entity = await this.getEventFunc(this.context.id, this.context.type);
    }

    async setMessage() {
        this.message += ` - ${getTimeString(this.entity.time, this.entity.hours)} - ${this.entity.place}`;
    }
}
module.exports = Event;