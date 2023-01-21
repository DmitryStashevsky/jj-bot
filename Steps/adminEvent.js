const Step = require('./step.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');
const { getCallBackData, createCallBackData } = require('../callback-data.handler.js');

class AdminEvent extends Step {
    constructor(message, command, getEventParticipationFunc) {
        super(message, command);
        this.getEventParticipationFunc = getEventParticipationFunc;
        this.isDynamicStep = true;
    }

    async init () {
        const {number: id, string: type} = getCallBackData(this.context.text);
        this.eventParticipation = await this.getEventParticipationFunc(id, type);
    }

    async setMessage() {
        if(this.eventParticipation) {
            this.message += ` ${this.eventParticipation.name} - ${this.eventParticipation.type} - ${this.eventParticipation.username} - ${this.eventParticipation.status}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        this,this.buttons.push([{
            text: i18n.__('decline'),
            callback_data: createCallBackData('aED', {number: this.eventParticipation.id, string: this.eventParticipation.type}),
        }]);

        if (this.eventParticipation.status == Status.Pending) {
            this.buttons.push([{
                text: i18n.__('approve'),
                callback_data: createCallBackData('aEA', {number: this.eventParticipation.id, string: this.eventParticipation.type}),
            }])
        }
    }
}

module.exports = AdminEvent;