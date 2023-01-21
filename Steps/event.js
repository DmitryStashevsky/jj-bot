const ViewStep = require('./baseSteps/viewStep.js');
const { getTimeString } = require('../calendar.js');
const { getCallBackData } = require('../callback-data.handler.js');

class Event extends ViewStep {
    constructor(message, command, getEventFunc) {
        super(message, command);
        this.getEventFunc = getEventFunc;
        this.isDynamicStep = true;
    }

    async init() {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.type = type;
        this.entity = await this.getEventFunc(id, type);
    }

    async setMessage() {
        this.message += ` - ${getTimeString(this.entity.time, this.entity.hours)} - ${this.entity.place}`;
    }
}
module.exports = Event;