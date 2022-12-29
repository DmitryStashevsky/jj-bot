const Step = require('./step.js');
const { Status } = require('../enums.js');
const i18n = require('../i18n.config.js');

class AdminEvent extends Step {
    constructor(message, command, getEventParticipationFunc) {
        super(message, command);
        this.getEventParticipationFunc = getEventParticipationFunc;
    }

    async init () {
        const id = this.context.text.match(/(\d+)/)[0];
        const type = this.context.text.match(/\[([^)]+)\]/)[1]
        this.eventParticipation = await this.getEventParticipationFunc(id, type);
    }

    async setMessage() {
        if(this.eventParticipation) {
            this.message = this.message + ` ${this.eventParticipation.name} - ${this.eventParticipation.type} - ${this.eventParticipation.username} - ${this.eventParticipation.status}`;
        }
        else {
            return false;
        }
    }

    async setButtons() {
        const options = [[{
            text: i18n.__('decline'),
            callback_data: `aED - ${this.eventParticipation.id} [${this.eventParticipation.type}]`,
        }]];

        if (this.eventParticipation.status == Status.Pending) {
            options.push([{
                text: i18n.__('approve'),
                callback_data: `aEA - ${this.eventParticipation.id} [${this.eventParticipation.type}]`,
            }])
        }
        this.buttons =  {
            "reply_markup": {
                "inline_keyboard": options
            }
        }
    }
}

module.exports = AdminEvent;